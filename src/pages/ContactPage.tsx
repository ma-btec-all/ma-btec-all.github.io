import { useMemo, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
  ArrowRight,
  AtSign,
  ExternalLink,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  MessageCircle,
  Send,
  Sparkles,
  Youtube,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import DeepSpaceBackground from "@/components/DeepSpaceBackground";

type BrandHover = {
  bg: string;
  glow: string;
  icon: string;
};

type ContactItem = {
  id: string;
  label: string;
  href: string;
  hint?: string;
  icon: React.ReactNode;
  brand: BrandHover;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function ContactTile({
  item,
  hovered,
  onEnter,
  onLeave,
}: {
  item: ContactItem;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="group relative overflow-hidden rounded-2xl border px-4 py-3 transition-[transform,box-shadow,background] duration-500 ease-out hover:scale-[1.01]"
      style={{
        borderColor: hovered ? "rgba(255,255,255,0.16)" : "rgba(255, 225, 170, 0.14)",
        background: hovered ? item.brand.bg : "rgba(255,255,255,0.035)",
        boxShadow: hovered ? item.brand.glow : "0 0 0 rgba(0,0,0,0)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(520px 220px at 25% 10%, rgba(255,255,255,0.22), transparent 60%), radial-gradient(520px 220px at 95% 0%, rgba(0,0,0,0.22), transparent 60%)",
        }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-500"
            style={{
              borderColor: hovered ? "rgba(255,255,255,0.22)" : "rgba(255, 225, 170, 0.18)",
              background: hovered ? "rgba(255,255,255,0.10)" : "rgba(10, 14, 28, 0.35)",
              boxShadow: hovered ? "0 0 26px rgba(255,255,255,0.16)" : "0 0 22px rgba(216,166,96,0.10)",
              color: item.brand.icon,
            }}
            aria-hidden
          >
            {item.icon}
          </div>

          <div className="min-w-0">
            <div className="text-[13px] font-black truncate" style={{ color: "rgba(255, 248, 237, 0.93)" }}>
              {item.label}
            </div>
            {item.hint ? (
              <div className="text-[11px] truncate" style={{ color: "rgba(241,245,249,0.70)" }}>
                {item.hint}
              </div>
            ) : null}
          </div>
        </div>

        <ExternalLink className="h-4 w-4 shrink-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100" style={{ color: "rgba(255, 236, 210, 0.92)" }} />
      </div>
    </a>
  );
}

export default function ContactPage() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [light, setLight] = useState({ x: 50, y: 26 });
  const [hoverId, setHoverId] = useState<string | null>(null);

  const items: ContactItem[] = useMemo(
    () => [
      {
        id: "whatsapp",
        label: "الواتساب",
        href: "https://wa.me/962779538251",
        hint: "(0779538251)",
        icon: <MessageCircle className="h-5 w-5" />,
        brand: {
          bg: "linear-gradient(135deg, rgba(22, 163, 74, 0.40), rgba(4, 120, 87, 0.28))",
          glow: "0 0 0 1px rgba(34,197,94,0.22), 0 18px 56px rgba(0,0,0,0.35), 0 0 34px rgba(34,197,94,0.22)",
          icon: "rgba(187, 247, 208, 0.95)",
        },
      },
      {
        id: "insta-personal",
        label: "الأنستقرام (Personal)",
        href: "https://www.instagram.com/mohammaed_atallah",
        icon: <Instagram className="h-5 w-5" />,
        brand: {
          bg: "linear-gradient(135deg, rgba(236, 72, 153, 0.38), rgba(168, 85, 247, 0.26))",
          glow: "0 0 0 1px rgba(236,72,153,0.22), 0 18px 56px rgba(0,0,0,0.35), 0 0 40px rgba(236,72,153,0.18)",
          icon: "rgba(255, 228, 244, 0.95)",
        },
      },
      {
        id: "insta-btec",
        label: "الأنستقرام (BTEC IT)",
        href: "https://www.instagram.com/its.btec.it",
        icon: <Instagram className="h-5 w-5" />,
        brand: {
          bg: "linear-gradient(135deg, rgba(236, 72, 153, 0.34), rgba(59, 130, 246, 0.22))",
          glow: "0 0 0 1px rgba(59,130,246,0.20), 0 18px 56px rgba(0,0,0,0.35), 0 0 40px rgba(59,130,246,0.18)",
          icon: "rgba(219, 234, 254, 0.95)",
        },
      },
      {
        id: "facebook",
        label: "الفيسبوك",
        href: "https://www.facebook.com/share/173Lm6oHHR/",
        icon: <Facebook className="h-5 w-5" />,
        brand: {
          bg: "linear-gradient(135deg, rgba(37, 99, 235, 0.36), rgba(30, 64, 175, 0.26))",
          glow: "0 0 0 1px rgba(59,130,246,0.22), 0 18px 56px rgba(0,0,0,0.35), 0 0 36px rgba(59,130,246,0.18)",
          icon: "rgba(219, 234, 254, 0.95)",
        },
      },
      {
        id: "youtube",
        label: "YouTube",
        href: "https://www.youtube.com/@Mohammad-Atallah",
        icon: <Youtube className="h-5 w-5" />,
        brand: {
          bg: "linear-gradient(135deg, rgba(239, 68, 68, 0.34), rgba(185, 28, 28, 0.26))",
          glow: "0 0 0 1px rgba(239,68,68,0.22), 0 18px 56px rgba(0,0,0,0.35), 0 0 36px rgba(239,68,68,0.18)",
          icon: "rgba(254, 226, 226, 0.95)",
        },
      },
      {
        id: "snap",
        label: "سناب",
        href: "https://www.snapchat.com/@mohammaed_2008",
        icon: <Send className="h-5 w-5" />,
        brand: {
          bg: "linear-gradient(135deg, rgba(250, 204, 21, 0.34), rgba(234, 179, 8, 0.22))",
          glow: "0 0 0 1px rgba(250,204,21,0.18), 0 18px 56px rgba(0,0,0,0.35), 0 0 34px rgba(250,204,21,0.16)",
          icon: "rgba(255, 251, 235, 0.95)",
        },
      },
      {
        id: "site",
        label: "الموقع",
        href: "https://mohammaed-atallah.netlify.app/",
        icon: <Globe className="h-5 w-5" />,
        brand: {
          bg: "linear-gradient(135deg, rgba(56, 189, 248, 0.30), rgba(59, 130, 246, 0.18))",
          glow: "0 0 0 1px rgba(56,189,248,0.18), 0 18px 56px rgba(0,0,0,0.35), 0 0 34px rgba(56,189,248,0.16)",
          icon: "rgba(224, 242, 254, 0.95)",
        },
      },
      {
        id: "linkedin",
        label: "لينكد إن",
        href: "https://www.linkedin.com/in/mohammad-atallah-756907377",
        hint: "Mohammad-Atallah@",
        icon: <Linkedin className="h-5 w-5" />,
        brand: {
          bg: "linear-gradient(135deg, rgba(10, 102, 194, 0.36), rgba(2, 62, 138, 0.24))",
          glow: "0 0 0 1px rgba(10,102,194,0.24), 0 18px 56px rgba(0,0,0,0.35), 0 0 36px rgba(10,102,194,0.20)",
          icon: "rgba(219, 234, 254, 0.95)",
        },
      },
      {
        id: "email",
        label: "الأيميل",
        href: "mailto:atallahmohammad07@gmail.com",
        hint: "atallahmohammad07@gmail.com",
        icon: <AtSign className="h-5 w-5" />,
        brand: {
          bg: "linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(148, 163, 184, 0.14))",
          glow: "0 0 0 1px rgba(255,255,255,0.18), 0 18px 56px rgba(0,0,0,0.35), 0 0 34px rgba(255,255,255,0.12)",
          icon: "rgba(255, 248, 237, 0.95)",
        },
      },

    ],
    [],
  );

  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setLight({ x: clamp(x, 0, 100), y: clamp(y, 0, 100) });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      <ScrollProgressBar />

      <div className="fixed inset-0 pointer-events-none z-0">
        <DeepSpaceBackground className="absolute inset-0" />
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

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex justify-center"
          >
            <Tilt
              tiltMaxAngleX={3}
              tiltMaxAngleY={4}
              perspective={1100}
              transitionSpeed={2200}
              scale={1.005}
              glareEnable
              glareMaxOpacity={0.14}
              glareColor="rgba(255, 220, 170, 0.92)"
              glarePosition="all"
              trackOnWindow
              className="w-full max-w-3xl"
            >
              <div
                ref={cardRef}
                onMouseMove={onMouseMove}
                className="relative rounded-[26px] border overflow-hidden"
                style={{
                  background: "rgba(10, 14, 28, 0.58)",
                  borderColor: "rgba(255, 225, 170, 0.16)",
                  boxShadow:
                    "0 26px 90px rgba(0,0,0,0.60), 0 0 0 1px rgba(255,255,255,0.06), 0 0 44px rgba(216,166,96,0.14)",
                  backdropFilter: "blur(22px)",
                  WebkitBackdropFilter: "blur(22px)",
                }}
              >
                <div
                  className="pointer-events-none absolute -inset-24 opacity-[0.92]"
                  style={{
                    background: `radial-gradient(680px 520px at ${light.x}% ${light.y}%, rgba(255,220,170,0.18), rgba(88,169,255,0.08) 35%, rgba(0,0,0,0) 70%)`,
                    transition: "background 140ms ease-out, opacity 300ms ease",
                  }}
                />

                <motion.div
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0.52 }}
                  whileHover={{ opacity: 0.98 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(255,225,170,0.22), 0 0 28px rgba(216,166,96,0.18), 0 0 70px rgba(88,169,255,0.10)",
                  }}
                />

                <div className="relative p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div
                      className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-black"
                      style={{
                        borderColor: "rgba(216,166,96,0.26)",
                        background: "rgba(216,166,96,0.08)",
                        color: "rgba(255, 236, 210, 0.92)",
                        boxShadow: "0 0 26px rgba(216,166,96,0.12)",
                        backdropFilter: "blur(14px)",
                      }}
                    >
                      <Sparkles className="h-4 w-4" style={{ color: "rgba(216, 166, 96, 0.95)" }} />
                      التواصل
                    </div>

                    <div
                      className="hidden sm:block text-[11px] font-semibold tracking-wide"
                      style={{ color: "rgba(241,245,249,0.62)" }}
                    >
                      Mohammad Atallah
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="relative h-[62px] w-[62px] sm:h-[68px] sm:w-[68px] rounded-full overflow-hidden border shrink-0"
                      style={{
                        borderColor: "rgba(255, 225, 170, 0.22)",
                        boxShadow:
                          "0 0 0 1px rgba(255,255,255,0.08), 0 0 30px rgba(216,166,96,0.18), 0 0 50px rgba(88,169,255,0.10)",
                      }}
                    >
                      <img
                        src="/your_image.png"
                        alt="محمد عطالله"
                        onError={(e) => {
                          e.currentTarget.src = "/me.jpeg";
                        }}
                        className="h-full w-full object-cover object-center"
                        style={{ filter: "contrast(1.06) saturate(1.07) brightness(1.03)" }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.22), transparent 55%)",
                          mixBlendMode: "screen",
                        }}
                      />
                    </div>

                    <div className="min-w-0">
                      <div
                        className="text-[22px] sm:text-[24px] font-black leading-tight"
                        style={{
                          color: "rgba(255, 248, 237, 0.96)",
                          textShadow: "0 0 22px rgba(216,166,96,0.14)",
                        }}
                      >
                        تواصل مع محمد عطالله
                      </div>
                      <div className="mt-1 text-[12px] sm:text-[13px] font-semibold" style={{ color: "rgba(241,245,249,0.62)" }}>
                        روابط رسمية — تفاعل بالألوان عند المرور
                      </div>
                    </div>
                  </div>

                  <div
                    className="h-px w-full mb-5"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,225,170,0.16), transparent)" }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {items.map((it) => (
                      <ContactTile
                        key={it.id}
                        item={it}
                        hovered={hoverId === it.id}
                        onEnter={() => setHoverId(it.id)}
                        onLeave={() => setHoverId((x) => (x === it.id ? null : x))}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

