import { FormEvent, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Copy, Loader2, MessageSquareText, Share2, Sparkles, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import DeepSpaceBackground from "@/components/DeepSpaceBackground";
import { Button } from "@/components/ui/button";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqardabd";
const SHARE_URL = "https://ma-btec-all.netlify.app/";
const SHARE_TEXT = "انصحكم بزيارة منصة MA | BTEC الشاملة لجميع تخصصات البيتك: https://ma-btec-all.netlify.app/";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function CommentsPage() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [light, setLight] = useState({ x: 50, y: 30 });
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setLight({ x: clamp(x, 0, 100), y: clamp(y, 0, 100) });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = comment.trim();
    if (!trimmed) {
      setStatus("error");
      setErrorDetail("يرجى كتابة التعليق قبل الإرسال.");
      toast.error("التعليق مطلوب");
      return;
    }

    setStatus("loading");
    setErrorDetail(null);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim() || undefined,
          message: trimmed,
          _subject: `تعليق من منصة MA BTEC${name.trim() ? ` — ${name.trim()}` : ""}`,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string; errors?: Array<{ message: string }> };

      if (res.ok) {
        setStatus("success");
        setName("");
        setComment("");
        toast.success("تم إرسال تعليقك بنجاح. شكرًا لك!");
      } else {
        setStatus("error");
        const msg =
          data.errors?.map((x) => x.message).join(" ") ||
          data.error ||
          "تعذر إرسال التعليق. حاول مرة أخرى لاحقًا.";
        setErrorDetail(msg);
        toast.error("فشل الإرسال");
      }
    } catch {
      setStatus("error");
      setErrorDetail("حدث خطأ في الاتصال. تحقق من الشبكة وحاول مجددًا.");
      toast.error("خطأ في الاتصال");
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      <ScrollProgressBar />

      <div className="fixed inset-0 pointer-events-none z-0">
        <DeepSpaceBackground className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 700px at 50% 0%, rgba(15, 118, 110, 0.12), transparent 55%), radial-gradient(800px 600px at 80% 100%, rgba(51, 65, 85, 0.22), transparent 50%)",
          }}
        />
      </div>

      <main className="relative z-10 pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>

          <div className="text-center mb-8 max-w-2xl mx-auto">
            <h1
              className="text-3xl sm:text-4xl font-black tracking-tight"
              style={{
                fontFamily: "Cairo, Tajawal, sans-serif",
                color: "rgba(255, 248, 237, 0.96)",
                textShadow: "0 0 28px rgba(216,166,96,0.12)",
              }}
            >
              التعليقات
            </h1>
            <p
              className="mt-3 text-[13px] sm:text-sm font-medium leading-relaxed"
              style={{ color: "rgba(216, 190, 140, 0.78)" }}
            >
              شارك رأيك واقتراحاتك مع منصة MA BTEC
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex justify-center"
          >
            <Tilt
              tiltMaxAngleX={2}
              tiltMaxAngleY={2.5}
              perspective={1200}
              transitionSpeed={2400}
              scale={1.003}
              glareEnable
              glareMaxOpacity={0.1}
              glareColor="rgba(45, 212, 191, 0.35)"
              glarePosition="all"
              trackOnWindow
              className="w-full max-w-lg"
            >
              <div
                ref={cardRef}
                onMouseMove={onMouseMove}
                className="relative rounded-[28px] border overflow-hidden"
                style={{
                  background: "rgba(12, 18, 28, 0.52)",
                  borderColor: "rgba(255, 225, 170, 0.14)",
                  boxShadow:
                    "0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05), 0 0 40px rgba(45,212,191,0.08)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                }}
              >
                <div
                  className="pointer-events-none absolute -inset-24 opacity-[0.88]"
                  style={{
                    background: `radial-gradient(560px 440px at ${light.x}% ${light.y}%, rgba(45,212,191,0.10), rgba(216,166,96,0.06) 40%, rgba(0,0,0,0) 72%)`,
                    transition: "background 160ms ease-out",
                  }}
                />

                <motion.div
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0.45 }}
                  whileHover={{ opacity: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(45,212,191,0.12), 0 0 24px rgba(45,212,191,0.10), 0 0 60px rgba(216,166,96,0.06)",
                  }}
                />

                <div className="relative p-6 sm:p-8">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div
                      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-black"
                      style={{
                        borderColor: "rgba(45,212,191,0.22)",
                        background: "rgba(45,212,191,0.08)",
                        color: "rgba(224, 242, 242, 0.92)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <Sparkles className="h-4 w-4" style={{ color: "rgba(165, 243, 252, 0.9)" }} />
                      <MessageSquareText className="h-4 w-4 opacity-90" />
                      نموذج التعليقات
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div
                      className="group rounded-2xl border px-4 py-3 transition-all duration-300 ease-out hover:-translate-y-0.5 focus-within:-translate-y-0.5"
                      style={{
                        borderColor: "rgba(255, 225, 170, 0.12)",
                        background: "rgba(255,255,255,0.03)",
                        boxShadow: "0 0 0 rgba(0,0,0,0)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 0 0 1px rgba(45,212,191,0.12), 0 10px 32px rgba(0,0,0,0.18), 0 0 22px rgba(45,212,191,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
                      }}
                    >
                      <label htmlFor="comment-name" className="block text-[12px] font-bold mb-2" style={{ color: "rgba(255, 236, 210, 0.88)" }}>
                        الاسم <span style={{ color: "rgba(148,163,184,0.85)" }}>(اختياري)</span>
                      </label>
                      <input
                        id="comment-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(ev) => {
                          setName(ev.target.value);
                          if (status !== "loading") {
                            setStatus("idle");
                            setErrorDetail(null);
                          }
                        }}
                        disabled={status === "loading"}
                        placeholder="اسمك إن رغبت"
                        className="w-full rounded-xl border-0 bg-transparent px-0 py-1 text-[13px] outline-none ring-0 placeholder:text-slate-500/70"
                        style={{ color: "rgba(241,245,249,0.92)" }}
                      />
                    </div>

                    <div
                      className="group rounded-2xl border px-4 py-3 transition-all duration-300 ease-out hover:-translate-y-0.5 focus-within:-translate-y-0.5"
                      style={{
                        borderColor: "rgba(255, 225, 170, 0.12)",
                        background: "rgba(255,255,255,0.03)",
                        boxShadow: "0 0 0 rgba(0,0,0,0)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          "0 0 0 1px rgba(216,166,96,0.14), 0 10px 32px rgba(0,0,0,0.18), 0 0 22px rgba(216,166,96,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
                      }}
                    >
                      <label htmlFor="comment-body" className="block text-[12px] font-bold mb-2" style={{ color: "rgba(255, 236, 210, 0.88)" }}>
                        التعليق <span style={{ color: "rgba(250, 204, 21, 0.75)" }}>*</span>
                      </label>
                      <textarea
                        id="comment-body"
                        name="message"
                        required
                        rows={5}
                        value={comment}
                        onChange={(ev) => {
                          setComment(ev.target.value);
                          if (status !== "loading") {
                            setStatus("idle");
                            setErrorDetail(null);
                          }
                        }}
                        disabled={status === "loading"}
                        placeholder="اكتب رأيك أو اقتراحك هنا…"
                        className="w-full resize-y min-h-[120px] rounded-xl border-0 bg-transparent px-0 py-1 text-[13px] leading-6 outline-none ring-0 placeholder:text-slate-500/70"
                        style={{ color: "rgba(241,245,249,0.92)" }}
                      />
                    </div>

                    {status === "success" ? (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 rounded-2xl border px-4 py-3 text-[13px]"
                        style={{
                          borderColor: "rgba(34,197,94,0.28)",
                          background: "rgba(34,197,94,0.10)",
                          color: "rgba(220,252,231,0.95)",
                        }}
                        role="status"
                      >
                        <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-emerald-300" />
                        <span>تم إرسال تعليقك بنجاح. شكرًا لمشاركتك!</span>
                      </motion.div>
                    ) : null}

                    {status === "error" && errorDetail ? (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 rounded-2xl border px-4 py-3 text-[13px]"
                        style={{
                          borderColor: "rgba(248,113,113,0.28)",
                          background: "rgba(248,113,113,0.10)",
                          color: "rgba(254,226,226,0.95)",
                        }}
                        role="alert"
                      >
                        <XCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-300" />
                        <span>{errorDetail}</span>
                      </motion.div>
                    ) : null}

                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full h-11 text-[13px] font-bold rounded-xl transition-all duration-300"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--primary) / 0.85), hsl(190 70% 38% / 0.75))",
                        color: "hsl(var(--primary-foreground))",
                        border: "1px solid hsl(var(--primary) / 0.35)",
                        boxShadow: "0 0 22px hsl(var(--primary) / 0.22)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 32px hsl(var(--primary) / 0.38)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 22px hsl(var(--primary) / 0.22)";
                      }}
                    >
                      {status === "loading" ? (
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          جاري الإرسال…
                        </span>
                      ) : (
                        "إرسال التعليق"
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </Tilt>
          </motion.div>

          <SharePlatformSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SharePlatformSection() {
  const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
  );

  const TelegramIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
    </svg>
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      toast.success("تم النسخ بنجاح");
    } catch {
      toast.error("تعذر النسخ، حاول مجددًا");
    }
  };

  const shareWhatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`, "_blank", "noopener,noreferrer");
  };

  const shareTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "MA | BTEC", text: SHARE_TEXT, url: SHARE_URL });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(SHARE_URL).catch(() => {});
      toast.success("تم نسخ الرابط — يمكنك مشاركته الآن");
    }
  };

  const cards: Array<{
    key: string;
    label: string;
    sub: string;
    icon: JSX.Element;
    onClick: () => void;
    accent: string;
    glow: string;
  }> = [
    {
      key: "copy",
      label: "نسخ الرابط",
      sub: "ma-btec-all.netlify.app",
      icon: <Copy className="h-6 w-6" />,
      onClick: copyLink,
      accent: "rgba(216, 166, 96, 0.9)",
      glow: "rgba(216, 166, 96, 0.28)",
    },
    {
      key: "wa",
      label: "واتساب",
      sub: "شارك على المحادثات والحالة",
      icon: <WhatsAppIcon className="h-6 w-6" />,
      onClick: shareWhatsapp,
      accent: "rgba(74, 222, 128, 0.95)",
      glow: "rgba(74, 222, 128, 0.28)",
    },
    {
      key: "tg",
      label: "تيليجرام",
      sub: "شارك في القنوات والمجموعات",
      icon: <TelegramIcon className="h-6 w-6" />,
      onClick: shareTelegram,
      accent: "rgba(96, 165, 250, 0.95)",
      glow: "rgba(96, 165, 250, 0.28)",
    },
    {
      key: "native",
      label: "مشاركة سريعة",
      sub: "عبر أي تطبيق على جهازك",
      icon: <Share2 className="h-6 w-6" />,
      onClick: nativeShare,
      accent: "rgba(94, 234, 212, 0.95)",
      glow: "rgba(45, 212, 191, 0.32)",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      dir="rtl"
      className="relative mt-14 max-w-5xl mx-auto"
    >
      {/* Bleeding multi-color glow behind cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 h-[320px] -z-0 blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(280px 180px at 88% 60%, rgba(216,166,96,0.30), transparent 70%)," +
            "radial-gradient(280px 180px at 62% 60%, rgba(74,222,128,0.22), transparent 70%)," +
            "radial-gradient(280px 180px at 38% 60%, rgba(96,165,250,0.22), transparent 70%)," +
            "radial-gradient(280px 180px at 12% 60%, rgba(45,212,191,0.28), transparent 70%)",
        }}
      />

      <div className="text-center mb-8">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-black mb-4"
          style={{
            borderColor: "rgba(216, 166, 96, 0.28)",
            background: "rgba(216, 166, 96, 0.08)",
            color: "rgba(255, 236, 200, 0.92)",
            backdropFilter: "blur(12px)",
          }}
        >
          MA | BTEC
          <Share2 className="h-3.5 w-3.5" />
        </div>
        <h2
          className="text-2xl sm:text-3xl font-black tracking-tight"
          style={{
            fontFamily: "Cairo, Tajawal, sans-serif",
            color: "rgba(255, 248, 237, 0.96)",
            textShadow: "0 0 28px rgba(216,166,96,0.18)",
          }}
        >
          نشر المنصة على جميع مواقع التواصل
        </h2>
        <p
          className="mt-3 text-[13px] sm:text-sm font-medium leading-relaxed"
          style={{ color: "rgba(216, 190, 140, 0.78)" }}
        >
          ساهم في نشر المنصة لتصل لجميع طلبة البيتك — اختر طريقة المشاركة التي تناسبك.
        </p>
      </div>

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={c.onClick}
            className="group relative overflow-hidden rounded-2xl border p-4 sm:p-5 text-right transition-transform duration-300 ease-out will-change-transform hover:-translate-y-1 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300/50"
            style={{
              background: "rgba(12, 18, 28, 0.55)",
              borderColor: "rgba(255, 225, 170, 0.14)",
              boxShadow: "0 18px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(420px 220px at 50% 0%, ${c.glow}, transparent 70%)`,
              }}
            />
            <div className="relative flex flex-col items-center text-center gap-3">
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,225,170,0.14)",
                  color: c.accent,
                  boxShadow: `0 0 24px ${c.glow}`,
                }}
              >
                {c.icon}
              </div>
              <div>
                <div
                  className="text-[14px] sm:text-[15px] font-black"
                  style={{ color: "rgba(255, 248, 237, 0.95)", fontFamily: "Cairo, Tajawal, sans-serif" }}
                >
                  {c.label}
                </div>
                <div className="mt-1 text-[11px] sm:text-[12px]" style={{ color: "rgba(216, 190, 140, 0.7)" }}>
                  {c.sub}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.section>
  );
}
