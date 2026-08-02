import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

// Gemini chat edge function.
//
// Primary path: read the GEMINI_API_KEY project secret and call Google's
// Generative Language API directly, server-side (the key is never exposed to
// the browser). If GEMINI_API_KEY is not configured, fall back to the Lovable
// AI Gateway (managed LOVABLE_API_KEY), so the chat keeps working either way.
const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent`;

const LOVABLE_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const LOVABLE_MODEL = "google/gemini-2.5-flash";

type GeminiPart = { text?: string; inlineData?: { mimeType: string; data: string } };
type GeminiContent = { role: "user" | "model"; parts: GeminiPart[] };

// Convert the Gemini-style { contents } payload into OpenAI-compatible messages
// for the Lovable AI Gateway fallback.
function toOpenAiMessages(contents: GeminiContent[], system?: string) {
  const messages: Array<Record<string, unknown>> = [];
  if (system) messages.push({ role: "system", content: system });

  for (const c of contents) {
    const role = c.role === "model" ? "assistant" : "user";
    const textParts = (c.parts || [])
      .filter((p) => typeof p.text === "string" && p.text.length > 0)
      .map((p) => p.text as string);
    const imageParts = (c.parts || []).filter((p) => p.inlineData);

    if (imageParts.length > 0 && role === "user") {
      const content: Array<Record<string, unknown>> = [];
      if (textParts.length) content.push({ type: "text", text: textParts.join("\n\n") });
      for (const p of imageParts) {
        const { mimeType, data } = p.inlineData!;
        content.push({ type: "image_url", image_url: { url: `data:${mimeType};base64,${data}` } });
      }
      messages.push({ role, content });
    } else {
      messages.push({ role, content: textParts.join("\n\n") });
    }
  }
  return messages;
}

// Stream directly from Google's Generative Language API using GEMINI_API_KEY.
async function streamFromGemini(apiKey: string, contents: GeminiContent[], system?: string) {
  const body: Record<string, unknown> = { contents };
  if (system) body.systemInstruction = { parts: [{ text: system }] };

  const upstream = await fetch(`${GEMINI_URL}?alt=sse&key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => "");
    let detail = errText;
    try {
      detail = JSON.parse(errText)?.error?.message || errText;
    } catch { /* keep raw */ }
    throw { status: upstream.status || 500, message: detail || `Gemini request failed (${upstream.status})` };
  }

  return new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const parts = json?.candidates?.[0]?.content?.parts ?? [];
              const text = parts.map((p: GeminiPart) => p?.text ?? "").join("");
              if (text) controller.enqueue(encoder.encode(text));
            } catch { /* ignore keepalive / partial JSON */ }
          }
        }
      } catch (e) {
        controller.error(e);
        return;
      }
      controller.close();
    },
  });
}

// Stream from the Lovable AI Gateway (OpenAI-compatible SSE → plain text).
async function streamFromLovable(apiKey: string, contents: GeminiContent[], system?: string) {
  const messages = toOpenAiMessages(contents, system);
  const upstream = await fetch(LOVABLE_GATEWAY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: LOVABLE_MODEL, messages, stream: true }),
  });

  if (upstream.status === 429) {
    throw { status: 429, message: "تم تجاوز حد الطلبات، يرجى المحاولة بعد قليل." };
  }
  if (upstream.status === 402) {
    throw { status: 402, message: "انتهى رصيد الذكاء الاصطناعي، يرجى إضافة رصيد." };
  }
  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => "");
    throw { status: upstream.status || 500, message: errText || `AI request failed (${upstream.status})` };
  }

  return new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const text = json?.choices?.[0]?.delta?.content ?? "";
              if (text) controller.enqueue(encoder.encode(text));
            } catch { /* ignore keepalive / non-JSON */ }
          }
        }
      } catch (e) {
        controller.error(e);
        return;
      }
      controller.close();
    },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { contents, system } = await req.json();
    if (!Array.isArray(contents)) {
      return new Response(
        JSON.stringify({ error: "Invalid request: 'contents' must be an array" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    let stream: ReadableStream<Uint8Array>;
    if (GEMINI_API_KEY) {
      // Primary: direct Google Gemini using the GEMINI_API_KEY project secret.
      try {
        stream = await streamFromGemini(GEMINI_API_KEY, contents as GeminiContent[], system);
      } catch (geminiErr: any) {
        // If the Gemini key is rate-limited / out of quota / unavailable,
        // gracefully fall back to the managed gateway so the chat keeps working.
        if (LOVABLE_API_KEY) {
          console.error("Gemini direct failed, falling back to gateway:", geminiErr?.message || geminiErr);
          stream = await streamFromLovable(LOVABLE_API_KEY, contents as GeminiContent[], system);
        } else {
          throw geminiErr;
        }
      }
    } else if (LOVABLE_API_KEY) {
      stream = await streamFromLovable(LOVABLE_API_KEY, contents as GeminiContent[], system);
    } else {
      return new Response(
        JSON.stringify({ error: "Missing GEMINI_API_KEY (and no LOVABLE_API_KEY fallback)." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }


    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (e: any) {
    const status = typeof e?.status === "number" ? e.status : 500;
    const message = e?.message ? String(e.message) : (e instanceof Error ? e.message : String(e));
    return new Response(
      JSON.stringify({ error: message }),
      { status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
