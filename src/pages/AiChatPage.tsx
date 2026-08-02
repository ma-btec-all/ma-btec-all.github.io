import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bot, Send, Square, Trash2, User, Copy, Check, Sparkles,
  Plus, Search, MessageSquare, Pencil, RefreshCw, Paperclip,
  X, FileText, ImageIcon, PanelLeftClose, PanelLeftOpen, Menu,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

// ----------------------------- Types -----------------------------
type ImagePart = { type: "image"; dataUrl: string; name: string };
type FilePart = { type: "file"; name: string; mime: string; text: string };
type Attachment = ImagePart | FilePart;

type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
  attachments?: Attachment[];
  createdAt: number;
};

type Conversation = {
  id: string;
  title: string;
  messages: Msg[];
  createdAt: number;
  updatedAt: number;
};

type Suggestion = { title: string; body: string };

// --------------------------- Constants ---------------------------
const STORAGE_KEY = "ma-btec-conversations-v1";
const ACTIVE_KEY = "ma-btec-active-conversation-v1";

const SYSTEM_PROMPT =
  "أنت مساعد ذكي متخصص في نظام BTEC التعليمي. أجب دائماً باللغة العربية الفصحى بأسلوب واضح ومنظم. قدّم إجابات دقيقة ومفيدة للطلاب والمعلمين حول المناهج، التقييمات (Pass/Merit/Distinction)، كتابة الـ Assignments، والخطط الدراسية.";
const MOCK_STREAM_DELAY_MS = 18;

// Pool of academic / BTEC suggestion cards. A random subset of 4 is shown
// every time the user opens a brand-new (empty) chat session.
const SUGGESTION_POOL: Suggestion[] = [
  { title: "اشرح نظام BTEC", body: "اشرح لي الفرق بين Pass و Merit و Distinction" },
  { title: "كتابة Assignment", body: "كيف أكتب assignment احترافي في BTEC؟" },
  { title: "خطة دراسية", body: "أعطني خطة دراسية أسبوعية لطالب توجيهي" },
  { title: "تحليل ملف", body: "ارفع ملفًا وسأقوم بقراءته وتلخيصه لك" },
  { title: "معايير التقييم", body: "ما هي معايير التقييم (Assessment Criteria) في وحدات BTEC؟" },
  { title: "إدارة الوقت", body: "كيف أنظم وقتي لإنهاء جميع المهام قبل الموعد النهائي؟" },
  { title: "اختيار التخصص", body: "ساعدني في اختيار التخصص المناسب لي ضمن مسارات BTEC" },
  { title: "مراجعة قبل الامتحان", body: "أعطني خطة مراجعة مكثفة قبل امتحان BTEC بأسبوع" },
  { title: "تحسين الدرجة", body: "ما الخطوات للارتقاء من Pass إلى Merit ثم Distinction؟" },
  { title: "البحث والمراجع", body: "كيف أوثّق المصادر والمراجع في تقرير BTEC؟" },
  { title: "العرض التقديمي", body: "ساعدني في إعداد عرض تقديمي احترافي لمشروع BTEC" },
  { title: "مهارات التفكير الناقد", body: "كيف أُظهر التحليل والتقييم في إجاباتي لرفع تقديري؟" },
  { title: "كتابة مقدمة قوية", body: "اكتب لي مقدمة احترافية لـ Assignment في إدارة الأعمال" },
  { title: "أمثلة عملية", body: "أعطني أمثلة واقعية لتدعيم نقاط Distinction في وحدتي" },
];

// --------------------------- Utilities ---------------------------
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const fmtDate = (ts: number) => {
  const d = new Date(ts);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const timer = window.setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        window.clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });

const clipText = (value: string, max = 900) => {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max).trim()}…` : clean;
};

const includesAny = (text: string, words: string[]) => words.some((word) => text.includes(word));

// Pick `count` random unique suggestions from the pool.
const pickSuggestions = (count: number): Suggestion[] => {
  const arr = [...SUGGESTION_POOL];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
};

const groupConversations = (convs: Conversation[]) => {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const today: Conversation[] = [];
  const yesterday: Conversation[] = [];
  const last7: Conversation[] = [];
  const older: Conversation[] = [];
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startToday = startOfToday.getTime();

  for (const c of convs) {
    const t = c.updatedAt;
    if (t >= startToday) today.push(c);
    else if (t >= startToday - day) yesterday.push(c);
    else if (t >= now - 7 * day) last7.push(c);
    else older.push(c);
  }
  return { today, yesterday, last7, older };
};

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

async function extractTextFromFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".txt") || name.endsWith(".md") || name.endsWith(".csv") || file.type.startsWith("text/")) {
    return await file.text();
  }
  if (name.endsWith(".pdf")) {
    const pdfjs: any = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const version = pdfjs.version || "4.7.76";
    const workerCandidates = [
      `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/legacy/build/pdf.worker.min.mjs`,
      `https://unpkg.com/pdfjs-dist@${version}/legacy/build/pdf.worker.min.mjs`,
      `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.mjs`,
    ];
    let workerOk = false;
    for (const url of workerCandidates) {
      try {
        const r = await fetch(url, { method: "HEAD" });
        if (r.ok) {
          pdfjs.GlobalWorkerOptions.workerSrc = url;
          workerOk = true;
          break;
        }
      } catch { /* try next */ }
    }
    const buf = await file.arrayBuffer();
    const loadingTask = workerOk
      ? pdfjs.getDocument({ data: buf })
      : pdfjs.getDocument({ data: buf, disableWorker: true, isEvalSupported: false });
    const doc = await loadingTask.promise;
    let out = "";
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      out += content.items.map((it: any) => it.str).join(" ") + "\n\n";
    }
    return out.trim();
  }
  if (name.endsWith(".docx")) {
    const mammoth = await import("mammoth");
    const buf = await file.arrayBuffer();
    const r = await (mammoth as any).extractRawText({ arrayBuffer: buf });
    return r.value as string;
  }
  if (name.endsWith(".xlsx") || name.endsWith(".xls") || name.endsWith(".csv")) {
    const XLSX = await import("xlsx");
    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: "array" });
    let out = "";
    for (const sn of wb.SheetNames) {
      out += `### ${sn}\n`;
      out += XLSX.utils.sheet_to_csv(wb.Sheets[sn]) + "\n\n";
    }
    return out.trim();
  }
  throw new Error("نوع الملف غير مدعوم. الأنواع المدعومة: PDF, DOCX, XLSX, TXT, CSV, MD");
}

// --------------------------- Subcomponents ---------------------------
const TypingDots = () => (
  <div className="flex gap-1.5 items-center px-1">
    <span className="h-2 w-2 rounded-full bg-[#C2951F] animate-bounce" />
    <span className="h-2 w-2 rounded-full bg-[#C2951F] animate-bounce [animation-delay:0.15s]" />
    <span className="h-2 w-2 rounded-full bg-[#C2951F] animate-bounce [animation-delay:0.3s]" />
  </div>
);

const CopyBtn = ({ text }: { text: string }) => {
  const [c, setC] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setC(true);
        setTimeout(() => setC(false), 1500);
      }}
      title="نسخ"
      className="p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition"
    >
      {c ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
};

// --------------------------- Main Page ---------------------------
const AiChatPage = () => {
  // Conversations state
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  });
  const [activeId, setActiveId] = useState<string | null>(() => {
    return localStorage.getItem(ACTIVE_KEY);
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [editingTitleVal, setEditingTitleVal] = useState("");

  // Dynamic suggestion cards — refreshed every new chat session.
  const [suggestions, setSuggestions] = useState<Suggestion[]>(() => pickSuggestions(4));

  // Composer state
  const [input, setInput] = useState("");
  const [pending, setPending] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [editingMsgId, setEditingMsgId] = useState<string | null>(null);
  const [editingMsgVal, setEditingMsgVal] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const active = useMemo(
    () => conversations.find((c) => c.id === activeId) || null,
    [conversations, activeId],
  );
  const messages = active?.messages ?? [];

  // Persistence
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations)); } catch {}
  }, [conversations]);
  useEffect(() => {
    if (activeId) localStorage.setItem(ACTIVE_KEY, activeId);
  }, [activeId]);

  // Refresh suggestions whenever an empty chat session is shown.
  useEffect(() => {
    if (messages.length === 0) setSuggestions(pickSuggestions(4));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  // Mobile: collapse sidebar by default
  useEffect(() => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, []);

  // ------------ Conversation ops ------------
  const createConversation = (): Conversation => {
    const c: Conversation = {
      id: uid(),
      title: "محادثة جديدة",
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setConversations((prev) => [c, ...prev]);
    setActiveId(c.id);
    setSuggestions(pickSuggestions(4)); // fresh cards for the new session
    return c;
  };

  const deleteConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const renameConversation = (id: string, title: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: title || "محادثة جديدة" } : c)),
    );
    setEditingTitleId(null);
  };

  const updateActive = (mut: (c: Conversation) => Conversation) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === activeId ? mut({ ...c, updatedAt: Date.now() }) : c)),
    );
  };

  // ------------ Attachments ------------
  const handleFiles = async (files: FileList | File[]) => {
    const arr = Array.from(files).slice(0, 10);
    for (const f of arr) {
      try {
        if (f.type.startsWith("image/")) {
          const dataUrl = await fileToDataUrl(f);
          setPending((p) => [...p, { type: "image", dataUrl, name: f.name }]);
        } else {
          const text = await extractTextFromFile(f);
          setPending((p) => [
            ...p,
            { type: "file", name: f.name, mime: f.type || "text/plain", text },
          ]);
        }
      } catch (e: any) {
        toast({ title: "تعذّر قراءة الملف", description: e?.message || f.name, variant: "destructive" });
      }
    }
  };

  // ------------ Streaming send ------------
  const stop = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
  };

  const buildMockResponse = (prompt: string, attachments: Attachment[], history: Msg[]) => {
    const normalized = prompt.toLowerCase();
    const fileParts = attachments.filter((a): a is FilePart => a.type === "file");
    const imageParts = attachments.filter((a): a is ImagePart => a.type === "image");
    const attachmentIntro = [
      fileParts.length ? `📎 قرأت ${fileParts.length} ملف/ملفات مرفقة.` : "",
      imageParts.length ? `🖼️ استلمت ${imageParts.length} صورة/صور مرفقة.` : "",
    ].filter(Boolean).join("\n");
    const filePreview = fileParts
      .slice(0, 2)
      .map((file) => `**${file.name}:** ${clipText(file.text, 420)}`)
      .join("\n\n");
    const recentContext = history
      .filter((message) => message.role === "user" && message.content.trim())
      .slice(-3)
      .map((message) => message.content.trim())
      .join("، ");

    let body = "";

    if (fileParts.length && includesAny(normalized, ["لخص", "تلخيص", "summary", "حلل", "تحليل", "اقرأ", "راجع"])) {
      body = `بالتأكيد. هذا تلخيص أولي مبني على الملف المرفق:\n\n${filePreview || "تم استلام الملف، لكن لم يظهر نص كافٍ لاستخراج تفاصيل دقيقة."}\n\n**اقتراح عملي:**\n1. حدّد الفكرة الرئيسية في بداية التقرير.\n2. اربط كل نقطة بمعيار تقييم واضح.\n3. أضف أمثلة أو أدلة قصيرة لدعم الاستنتاج.\n4. اختم بتقييم نقدي يوضح نقاط القوة والتحسين.`;
    } else if (includesAny(normalized, ["assignment", "اسايمنت", "أسايمنت", "تقرير", "واجب", "مهمة" ])) {
      body = `لإعداد Assignment قوي في BTEC، استخدم هذا الهيكل:\n\n**1. المقدمة**\nعرّف الموضوع والهدف من المهمة، واذكر الوحدة أو المعيار المطلوب.\n\n**2. الشرح والتحليل**\nقسّم الإجابة إلى عناوين قصيرة، واربط كل فقرة بمعيار التقييم المطلوب.\n\n**3. الأدلة والأمثلة**\nاستخدم أمثلة واقعية، جداول بسيطة، أو مصادر موثوقة بدل الكلام العام.\n\n**4. التقييم النقدي**\nللوصول إلى Merit أو Distinction، لا تكتفِ بالوصف؛ قارن، حلّل، واذكر لماذا اخترت رأياً معيناً.\n\n**5. الخاتمة والمراجع**\nاختم بنتيجة واضحة، ثم أضف قائمة مراجع منظمة.`;
    } else if (includesAny(normalized, ["pass", "merit", "distinction", "معايير", "تقييم", "درجة", "درجات"])) {
      body = `في BTEC غالباً يكون الفرق كالتالي:\n\n**Pass**: يثبت أنك فهمت الأساسيات وغطّيت المتطلبات المطلوبة.\n\n**Merit**: يضيف تحليلاً ومقارنة وتنظيماً أقوى للأفكار.\n\n**Distinction**: يحتاج تقييماً نقدياً، تبريراً للقرارات، ربطاً واضحاً بالأدلة، واستنتاجات ناضجة.\n\nلرفع إجابتك: ابدأ بوصف الفكرة، ثم حلّل أثرها، ثم قيّم قوتها وضعفها، ثم اختم برأي مدعوم بدليل.`;
    } else if (includesAny(normalized, ["خطة", "جدول", "دراسة", "مراجعة", "وقت", "تنظيم"])) {
      body = `هذه خطة دراسية خفيفة وفعّالة:\n\n**اليوم 1:** اقرأ المطلوب وحدّد معايير التقييم.\n**اليوم 2:** اجمع المصادر والأمثلة.\n**اليوم 3:** اكتب المسودة الأولى دون التوقف كثيراً.\n**اليوم 4:** حسّن التحليل وأضف المقارنات.\n**اليوم 5:** راجع اللغة، التنسيق، والمراجع.\n**اليوم 6:** اختبر نفسك بأسئلة قصيرة.\n**اليوم 7:** مراجعة نهائية وتسليم.\n\nاجعل كل جلسة 25–40 دقيقة، ثم خذ استراحة قصيرة حتى تحافظ على التركيز.`;
    } else if (includesAny(normalized, ["تخصص", "مسار", "اختار", "اختيار", "مناسب", "btec"])) {
      body = `لاختيار تخصص BTEC مناسب، قيّم نفسك في أربع نقاط:\n\n**1. الميول:** هل تفضّل التقنية، الأعمال، الرعاية الصحية، التصميم، السياحة، أم الهندسة؟\n**2. المهارات:** هل أنت أقوى في التحليل، التواصل، الإبداع، أو العمل العملي؟\n**3. المستقبل:** اختر مساراً له علاقة بالتخصص الجامعي أو الوظيفة التي تريدها.\n**4. طبيعة التقييم:** بعض المسارات تعتمد أكثر على المشاريع والتقارير، وبعضها يحتاج تطبيقاً عملياً مكثفاً.\n\nإذا أخبرتني بميولك والمواد التي تحبها، أستطيع مساعدتك بخيار أقرب لك.`;
    } else if (includesAny(normalized, ["مقدمة", "اكتب", "صياغة", "نص", "فقرة"])) {
      body = `يمكنك استخدام هذه الصياغة كبداية وتعديلها حسب وحدتك:\n\n> يهدف هذا التقرير إلى دراسة الموضوع من منظور تطبيقي يرتبط بمتطلبات وحدة BTEC، مع تحليل الجوانب الأساسية وتقييم أثرها على الأداء أو القرار النهائي. وسيتم دعم النقاط المطروحة بأمثلة عملية ومراجع مناسبة لضمان تحقيق معايير التقييم المطلوبة.\n\nلجعلها أقوى، أضف اسم الوحدة، الموضوع المحدد، والمعيار المطلوب.`;
    } else if (attachments.length > 0) {
      body = `تم استلام المرفقات بنجاح.\n\n${filePreview || "يمكنني مساعدتك في تلخيصها، استخراج النقاط المهمة، تحويلها إلى خطة دراسة، أو صياغة إجابة BTEC بناءً عليها."}\n\nاكتب لي بالضبط ماذا تريد أن أفعل بالمرفق: تلخيص، مراجعة، شرح، أو إعداد إجابة.`;
    } else {
      body = `فهمت سؤالك: **${clipText(prompt || recentContext || "موضوع BTEC", 220)}**\n\nإجابة منظمة:\n\n1. ابدأ بتحديد المطلوب بدقة: هل السؤال يطلب شرحاً، تحليلاً، مقارنة، أم تقييماً؟\n2. قسّم الإجابة إلى نقاط قصيرة وواضحة.\n3. اربط كل نقطة بمثال عملي أو دليل.\n4. إذا كان الهدف درجة أعلى، أضف رأيك المدعوم واذكر سبب قوته أو حدوده.\n\nإذا أردت، أستطيع تحويل هذا السؤال إلى خطة إجابة كاملة أو نموذج Assignment جاهز للتعديل.`;
    }

    return [attachmentIntro, body].filter(Boolean).join("\n\n");
  };

  const send = async (textOverride?: string, attachOverride?: Attachment[], replaceLastAssistant = false) => {
    const text = (textOverride ?? input).trim();
    const attachments = attachOverride ?? pending;
    if (!text && attachments.length === 0) return;
    if (isLoading) return;

    let conv = active ?? createConversation();
    const userMsg: Msg = {
      id: uid(),
      role: "user",
      content: text,
      attachments: attachments.length ? attachments : undefined,
      createdAt: Date.now(),
    };

    let workingMsgs: Msg[];
    if (replaceLastAssistant) {
      workingMsgs = [...conv.messages];
      while (workingMsgs.length && workingMsgs[workingMsgs.length - 1].role === "assistant") {
        workingMsgs.pop();
      }
    } else {
      workingMsgs = [...conv.messages, userMsg];
    }

    const isFirstMsg = conv.messages.length === 0;
    conv = {
      ...conv,
      messages: workingMsgs,
      title: isFirstMsg && text ? text.slice(0, 40) : conv.title,
      updatedAt: Date.now(),
    };
    setConversations((prev) => {
      const exists = prev.find((c) => c.id === conv.id);
      return exists ? prev.map((c) => (c.id === conv.id ? conv : c)) : [conv, ...prev];
    });
    setActiveId(conv.id);
    setInput("");
    setPending([]);
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    // Add empty assistant placeholder
    const assistantId = uid();
    const placeholder: Msg = { id: assistantId, role: "assistant", content: "", createdAt: Date.now() };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conv.id ? { ...c, messages: [...c.messages, placeholder], updatedAt: Date.now() } : c,
      ),
    );

    let soFar = "";
    let rafScheduled = false;
    const flush = () => {
      rafScheduled = false;
      const snapshot = soFar;
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conv.id
            ? {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === assistantId ? { ...m, content: snapshot } : m,
                ),
              }
            : c,
        ),
      );
    };
    const appendChunk = (chunk: string) => {
      soFar += chunk;
      if (!rafScheduled) {
        rafScheduled = true;
        requestAnimationFrame(flush);
      }
    };

    try {
      const response = buildMockResponse(text, attachments, workingMsgs);
      const chunks = response.match(/[\s\S]{1,5}/g) ?? [response];
      for (const chunk of chunks) {
        if (controller.signal.aborted) throw new DOMException("Aborted", "AbortError");
        appendChunk(chunk);
        await sleep(MOCK_STREAM_DELAY_MS, controller.signal);
      }
      if (!soFar) {
        soFar = "أنا جاهز لمساعدتك. أعد إرسال سؤالك بصيغة أوضح وسأرتّب لك الإجابة.";
        flush();
      }
    } catch (err: any) {
      if (err?.name === "AbortError") {
        if (!soFar) {
          soFar = "تم إيقاف الرد.";
          flush();
        }
      } else {
        console.error("local chat response error:", err);
        soFar = "تم تجهيز رد محلي آمن. اكتب سؤالك مرة أخرى وسأساعدك فوراً.";
        flush();
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  };

  // Edit user message → truncate + resend
  const submitEditedUser = (msgId: string) => {
    if (!active) return;
    const idx = active.messages.findIndex((m) => m.id === msgId);
    if (idx < 0) return;
    const target = active.messages[idx];
    const newText = editingMsgVal.trim();
    setEditingMsgId(null);
    setEditingMsgVal("");
    if (!newText) return;
    updateActive((c) => ({ ...c, messages: c.messages.slice(0, idx) }));
    setTimeout(() => send(newText, target.attachments || []), 0);
  };

  const regenerate = () => {
    if (!active) return;
    let lastUserIdx = -1;
    for (let i = active.messages.length - 1; i >= 0; i--) {
      if (active.messages[i].role === "user") { lastUserIdx = i; break; }
    }
    if (lastUserIdx < 0) return;
    const lastUser = active.messages[lastUserIdx];
    updateActive((c) => ({ ...c, messages: c.messages.slice(0, lastUserIdx + 1) }));
    setTimeout(() => send(lastUser.content, lastUser.attachments || [], true), 0);
  };

  // Drag & drop
  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      await handleFiles(e.dataTransfer.files);
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.messages.some((m) => m.content.toLowerCase().includes(q)),
    );
  }, [conversations, search]);

  const groups = useMemo(() => groupConversations(filtered), [filtered]);

  const renderGroup = (label: string, list: Conversation[]) => {
    if (!list.length) return null;
    return (
      <div className="mb-3">
        <div className="px-3 mb-1.5 text-[11px] font-semibold text-white/40 uppercase tracking-wider">{label}</div>
        <div className="space-y-1">
          {list.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setActiveId(c.id);
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
              className={`group relative cursor-pointer rounded-xl px-3 py-2 transition border ${
                c.id === activeId
                  ? "bg-[#C2951F]/15 border-[#C2951F]/40 text-white"
                  : "bg-white/5 border-transparent hover:bg-white/10 text-white/80"
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5 shrink-0 opacity-70" />
                {editingTitleId === c.id ? (
                  <Input
                    autoFocus
                    value={editingTitleVal}
                    onChange={(e) => setEditingTitleVal(e.target.value)}
                    onBlur={() => renameConversation(c.id, editingTitleVal)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") renameConversation(c.id, editingTitleVal);
                      if (e.key === "Escape") setEditingTitleId(null);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="h-6 text-xs bg-black/30 border-white/20 text-white"
                  />
                ) : (
                  <span className="truncate text-sm flex-1">{c.title}</span>
                )}
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingTitleId(c.id);
                      setEditingTitleVal(c.title);
                    }}
                    className="p-1 rounded hover:bg-white/15"
                    title="إعادة تسمية"
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(c.id);
                    }}
                    className="p-1 rounded hover:bg-red-500/30 text-red-300"
                    title="حذف"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="text-[10px] text-white/40 mt-0.5 pr-5">{fmtDate(c.updatedAt)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#06101C] text-foreground">
      <Navbar />
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-[#2F5673]/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#C2951F]/15 blur-3xl" />
      </div>

      <main className="page-safe-top px-3 pb-4">
        <div className="mx-auto max-w-5xl flex gap-3 h-[calc(100vh-var(--navbar-clearance)-1rem)] px-2 sm:px-3 relative">
          {/* Mobile overlay backdrop */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />
          )}
          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col shrink-0 rounded-[28px] border border-white/10 bg-[#0a1828]/95 md:bg-white/5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] overflow-hidden fixed md:static z-50 md:z-auto top-[calc(var(--navbar-clearance)+0.5rem)] bottom-4 right-2 md:right-auto w-[85vw] max-w-[300px] md:w-[280px] h-auto md:h-full"
              >
                <div className="p-3 border-b border-white/10 space-y-2">
                  <Button
                    onClick={() => createConversation()}
                    className="w-full bg-gradient-to-br from-[#C2951F] to-[#8a6a14] hover:from-[#d4a52a] hover:to-[#a07e1a] text-white rounded-xl"
                  >
                    <Plus className="h-4 w-4 ml-1" /> محادثة جديدة
                  </Button>
                  <div className="relative">
                    <Search className="h-3.5 w-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="ابحث في المحادثات..."
                      className="pr-9 h-9 bg-white/5 border-white/10 text-white placeholder:text-white/40 text-sm"
                    />
                  </div>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-2">
                    {conversations.length === 0 ? (
                      <div className="text-center text-white/40 text-xs py-8 px-4">
                        لا توجد محادثات بعد. ابدأ محادثة جديدة!
                      </div>
                    ) : (
                      <>
                        {renderGroup("اليوم", groups.today)}
                        {renderGroup("أمس", groups.yesterday)}
                        {renderGroup("آخر 7 أيام", groups.last7)}
                        {renderGroup("أقدم", groups.older)}
                      </>
                    )}
                  </div>
                </ScrollArea>
                <div className="p-3 border-t border-white/10 text-[10px] text-white/40 text-center">
                  MA BTEC
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Chat panel */}
          <section
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className="relative flex-1 w-full min-w-0 flex flex-col rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)] overflow-hidden"
          >
            {isDragging && (
              <div className="absolute inset-0 z-30 grid place-items-center bg-[#06101C]/80 backdrop-blur-md border-2 border-dashed border-[#C2951F] rounded-[28px]">
                <div className="text-center">
                  <Paperclip className="h-10 w-10 text-[#C2951F] mx-auto mb-2" />
                  <p className="text-white text-lg font-semibold">أفلت الملفات هنا</p>
                  <p className="text-white/60 text-sm mt-1">PDF, Word, Excel, TXT, صور</p>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-black/10">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen((s) => !s)}
                  className="text-white/70 hover:text-white hover:bg-white/10 h-9 w-9"
                  title={sidebarOpen ? "إخفاء" : "إظهار"}
                >
                  <span className="hidden md:flex">
                    {sidebarOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
                  </span>
                  <span className="md:hidden">
                    <Menu className="h-4 w-4" />
                  </span>
                </Button>
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#2F5673] to-[#06101C] border border-[#C2951F]/40">
                    <Sparkles className="h-4 w-4 text-[#C2951F]" />
                  </div>
                  <div>
                    <h1 className="text-sm font-bold text-white leading-tight">مساعد ذكاء اصطناعي</h1>
                    <p className="text-[10px] text-white/50">MA BTEC</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-[#2F5673] to-[#06101C] border border-[#C2951F]/40 mb-5 shadow-2xl"
                  >
                    <Bot className="h-10 w-10 text-[#C2951F]" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-2">كيف يمكنني مساعدتك اليوم؟</h2>
                  <p className="text-sm text-white/60 mb-7">اسأل أي شيء، أو ارفع ملفًا/صورة لتحليلها</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                    {suggestions.map((s) => (
                      <motion.button
                        key={s.title}
                        whileHover={{ y: -2 }}
                        onClick={() => send(s.body, [])}
                        className="text-right rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#C2951F]/40 transition p-4"
                      >
                        <div className="text-sm font-semibold text-white mb-1">{s.title}</div>
                        <div className="text-xs text-white/60">{s.body}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m, i) => {
                  const isUser = m.role === "user";
                  const isLast = i === messages.length - 1;
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`shrink-0 grid h-9 w-9 place-items-center rounded-xl border ${
                          isUser
                            ? "bg-[#C2951F]/15 border-[#C2951F]/40 text-[#C2951F]"
                            : "bg-[#2F5673]/30 border-white/10 text-white"
                        }`}
                      >
                        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`max-w-[85%] flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
                        {/* Attachments preview */}
                        {m.attachments && m.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {m.attachments.map((a, idx) =>
                              a.type === "image" ? (
                                <img
                                  key={idx}
                                  src={a.dataUrl}
                                  alt={a.name}
                                  className="h-32 w-32 object-cover rounded-xl border border-white/15"
                                />
                              ) : (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/85"
                                >
                                  <FileText className="h-4 w-4 text-[#C2951F]" />
                                  <span className="max-w-[160px] truncate">{a.name}</span>
                                </div>
                              ),
                            )}
                          </div>
                        )}

                        {/* Message bubble */}
                        {editingMsgId === m.id ? (
                          <div className="w-full">
                            <Textarea
                              value={editingMsgVal}
                              onChange={(e) => setEditingMsgVal(e.target.value)}
                              autoFocus
                              className="bg-white/10 border-white/20 text-white min-h-[80px]"
                            />
                            <div className="flex gap-2 mt-2 justify-end">
                              <Button size="sm" variant="ghost" className="text-white/70" onClick={() => setEditingMsgId(null)}>
                                إلغاء
                              </Button>
                              <Button size="sm" className="bg-[#C2951F] hover:bg-[#d4a52a] text-white" onClick={() => submitEditedUser(m.id)}>
                                إرسال
                              </Button>
                            </div>
                          </div>
                        ) : (
                          (m.content || (!isUser && isLoading && isLast)) && (
                            <div
                              className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                isUser
                                  ? "bg-[#C2951F]/15 border border-[#C2951F]/30 text-white"
                                  : "bg-white/5 border border-white/10 text-white/90"
                              }`}
                            >
                              {!isUser ? (
                                m.content ? (
                                  <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-code:text-[#C2951F] prose-headings:text-white prose-strong:text-white prose-a:text-[#C2951F]">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                                  </div>
                                ) : (
                                  <TypingDots />
                                )
                              ) : (
                                <p className="whitespace-pre-wrap">{m.content}</p>
                              )}
                            </div>
                          )
                        )}

                        {/* Actions */}
                        {m.content && editingMsgId !== m.id && (
                          <div className={`flex items-center gap-0.5 ${isUser ? "flex-row-reverse" : ""}`}>
                            <CopyBtn text={m.content} />
                            {isUser && (
                              <button
                                onClick={() => {
                                  setEditingMsgId(m.id);
                                  setEditingMsgVal(m.content);
                                }}
                                title="تعديل"
                                className="p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {!isUser && isLast && !isLoading && (
                              <button
                                onClick={regenerate}
                                title="إعادة التوليد"
                                className="p-1.5 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition"
                              >
                                <RefreshCw className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-white/10 bg-black/20 p-3">
              {/* Pending attachments */}
              {pending.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {pending.map((a, idx) => (
                    <div
                      key={idx}
                      className="relative group flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90"
                    >
                      {a.type === "image" ? (
                        <img src={a.dataUrl} alt={a.name} className="h-8 w-8 rounded object-cover" />
                      ) : (
                        <FileText className="h-4 w-4 text-[#C2951F]" />
                      )}
                      <span className="max-w-[140px] truncate">{a.name}</span>
                      <button
                        onClick={() => setPending((p) => p.filter((_, i) => i !== idx))}
                        className="opacity-60 hover:opacity-100 text-red-300"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-end gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  multiple
                  accept=".pdf,.docx,.xlsx,.xls,.csv,.txt,.md"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />
                <input
                  ref={imageInputRef}
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />
                <div className="flex flex-col gap-1.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    className="h-9 w-9 rounded-xl text-white/70 hover:text-white hover:bg-white/10"
                    title="إرفاق ملف"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => imageInputRef.current?.click()}
                    className="h-9 w-9 rounded-xl text-white/70 hover:text-white hover:bg-white/10"
                    title="إرفاق صورة"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="اكتب سؤالك هنا… (Shift + Enter لسطر جديد)"
                  className="min-h-[58px] max-h-40 resize-none bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-[#C2951F]/40 rounded-2xl"
                  disabled={isLoading}
                />
                {isLoading ? (
                  <Button
                    onClick={stop}
                    size="icon"
                    className="h-[58px] w-[58px] rounded-2xl bg-red-500/80 hover:bg-red-500 text-white"
                    title="إيقاف"
                  >
                    <Square className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => send()}
                    disabled={!input.trim() && pending.length === 0}
                    size="icon"
                    className="h-[58px] w-[58px] rounded-2xl bg-gradient-to-br from-[#C2951F] to-[#8a6a14] hover:from-[#d4a52a] hover:to-[#a07e1a] text-white disabled:opacity-50"
                    title="إرسال"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <p className="mt-2 text-[10px] text-white/40 text-center">
                قد يقدم المساعد معلومات غير دقيقة. تحقق من المعلومات المهمة. — اسحب وأفلت الملفات في أي مكان للرفع.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AiChatPage;
