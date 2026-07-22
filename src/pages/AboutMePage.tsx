import { useMemo, useRef, useState } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import DeepSpaceBackground from "@/components/DeepSpaceBackground";
import { SOCIAL_LINKS, type SocialLink } from "@/data/socialLinks";

const SECTION = {
  title: {
    color: "rgba(255, 238, 210, 0.92)",
    accent: "rgba(216, 166, 96, 0.95)",
  },
  body: {
    color: "rgba(241, 245, 249, 0.82)",
  },
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-[13px] leading-6" style={{ color: SECTION.body.color }}>
      {items.map((x) => (
        <li key={x} className="flex items-start gap-3">
          <span
            className="mt-[7px] h-[7px] w-[7px] rounded-full shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(216,166,96,0.95), rgba(255,223,160,0.65))",
              boxShadow: "0 0 14px rgba(216,166,96,0.35)",
            }}
          />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

function SocialButton({ link }: { link: SocialLink }) {
  const [hovered, setHovered] = useState(false);
  const Icon = link.Icon;
  const iconColor = hovered
    ? link.lightHover
      ? "#1a1a1a"
      : link.brand
    : "rgba(255, 248, 237, 0.92)";

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={link.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group relative overflow-hidden rounded-2xl px-4 py-3 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: hovered
          ? link.lightHover
            ? `${link.brand}26`
            : `${link.brand}1a`
          : "rgba(255,255,255,0.035)",
        border: `1px solid ${hovered ? link.brand : "rgba(255, 225, 170, 0.14)"}`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: hovered
          ? `0 0 0 1px ${link.brand}55, 0 12px 36px ${link.brand}33, 0 0 26px ${link.brand}33`
          : "0 1px 2px rgba(0,0,0,0.2)",
      }}
    >
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
            style={{
              border: `1px solid ${hovered ? `${link.brand}80` : "rgba(255, 225, 170, 0.18)"}`,
              background: hovered
                ? link.lightHover
                  ? link.brand
                  : `${link.brand}26`
                : "rgba(10, 14, 28, 0.35)",
              boxShadow: hovered
                ? `0 0 18px ${link.brand}66`
                : "0 0 22px rgba(216,166,96,0.10)",
            }}
            aria-hidden
          >
            <Icon className="h-5 w-5 transition-colors duration-300" style={{ color: iconColor }} />
          </div>

          <div className="min-w-0">
            <div
              className="text-[13px] font-black truncate"
              style={{ color: "rgba(255, 248, 237, 0.93)" }}
            >
              {link.label}
            </div>
            {link.hint ? (
              <div className="text-[11px] truncate" style={{ color: "rgba(241,245,249,0.62)" }}>
                {link.hint}
              </div>
            ) : null}
          </div>
        </div>

        <ExternalLink
          className="h-4 w-4 shrink-0 transition-all duration-300"
          style={{
            color: hovered ? link.brand : "rgba(255, 236, 210, 0.7)",
            opacity: hovered ? 1 : 0.7,
          }}
        />
      </div>
    </a>
  );
}

function SocialGrid({ items }: { items: SocialLink[] }) {
  return (
    <div className="mt-6">
      <div
        className="text-[13px] font-black tracking-tight"
        style={{ color: "rgba(255, 238, 210, 0.92)" }}
      >
        الروابط
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((it) => (
          <SocialButton key={it.id} link={it} />
        ))}
      </div>
    </div>
  );
}

export default function AboutMePage() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [light, setLight] = useState({ x: 50, y: 28 });

  const workStyleBullets = useMemo(
    () => ["تحليل المشاكل بطريقة منهجية", "الاهتمام بالتفاصيل الدقيقة", "التعلم السريع والتطوير المستمر", "الإبداع في إيجاد الحلول"],
    [],
  );

  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setLight({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const socialItems = useMemo(() => SOCIAL_LINKS, []);

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
            initial={{ opacity: 0, y: 16 }}
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
              glareMaxOpacity={0.16}
              glareColor="rgba(255, 220, 170, 0.95)"
              glarePosition="all"
              trackOnWindow
              className="w-full max-w-3xl"
            >
              <div
                ref={cardRef}
                onMouseMove={onMouseMove}
                className="relative rounded-[26px] border overflow-hidden transition-shadow duration-500"
                style={{
                  background: "rgba(10, 14, 28, 0.58)",
                  borderColor: "rgba(255, 225, 170, 0.16)",
                  boxShadow:
                    "0 26px 90px rgba(0,0,0,0.60), 0 0 0 1px rgba(255,255,255,0.06), 0 0 44px rgba(216,166,96,0.14)",
                  backdropFilter: "blur(22px)",
                  WebkitBackdropFilter: "blur(22px)",
                }}
              >
                {/* Cursor-driven internal light */}
                <div
                  className="pointer-events-none absolute -inset-24 opacity-[0.92]"
                  style={{
                    background: `radial-gradient(680px 520px at ${light.x}% ${light.y}%, rgba(255,220,170,0.18), rgba(88,169,255,0.08) 35%, rgba(0,0,0,0) 70%)`,
                    transition: "background 140ms ease-out, opacity 300ms ease",
                  }}
                />

                {/* Animated glowing border */}
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
                      <Sparkles className="h-4 w-4" style={{ color: SECTION.title.accent }} />
                      About Me
                    </div>

                    <div
                      className="hidden sm:block text-[11px] font-semibold tracking-wide"
                      style={{ color: "rgba(241,245,249,0.62)" }}
                    >
                      محمد عطالله
                    </div>
                  </div>

                  {/* Header layout: image next to text */}
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
                        src="/me.jpeg"
                        alt="محمد عطالله"
                        className="h-full w-full object-cover object-center"
                        style={{ filter: "contrast(1.06) saturate(1.07) brightness(1.03)" }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.22), transparent 55%)",
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
                        عن محمد عطالله
                      </div>
                      <div className="mt-1 text-[12px] sm:text-[13px] font-semibold" style={{ color: "rgba(241,245,249,0.62)" }}>
                        مطور — شغوف بتكنولوجيا المعلومات وتطوير الويب
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <section>
                      <div className="text-[15px] font-black" style={{ color: SECTION.title.color }}>
                        ✨ <span style={{ color: SECTION.title.accent }}>عني</span>
                      </div>
                      <p className="mt-2.5 text-[13px] leading-6" style={{ color: SECTION.body.color }}>
                        مرحبًا، أنا محمد عطالله، مطور ومهتم بمجال تكنولوجيا المعلومات. أمتلك شغفًا كبيرًا بالتعلم المستمر واستكشاف
                        كل ما هو جديد في عالم التقنية، مع تركيز أساسي على تطوير مواقع الويب والبرمجة. كما أهتم بمجالات متعددة مثل
                        الشبكات، تطوير التطبيقات والألعاب، الأمن السيبراني، الذكاء الاصطناعي، وإدارة المشاريع التقنية.
                      </p>
                    </section>

                    <div
                      className="h-px w-full"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,225,170,0.16), transparent)" }}
                    />

                    <section>
                      <div className="text-[15px] font-black" style={{ color: SECTION.title.color }}>
                        💭 <span style={{ color: SECTION.title.accent }}>قصتي</span>
                      </div>
                      <p className="mt-2.5 text-[13px] leading-6" style={{ color: SECTION.body.color }}>
                        بدأت رحلتي في مجال تكنولوجيا المعلومات بدافع الشغف وحب التعلم. منذ البداية، انجذبت إلى الجانب العملي من
                        التقنية، مثل تطوير المواقع والبرمجة وصناعة الألعاب. لم يكن الأمر مجرد فضول، بل تحول إلى اهتمام حقيقي دفعني
                        للتعمق في هذا المجال واستكشاف مختلف تخصصاته.
                      </p>
                    </section>

                    <section>
                      <div className="text-[15px] font-black" style={{ color: SECTION.title.color }}>
                        🚀 <span style={{ color: SECTION.title.accent }}>أنا اليوم</span>
                      </div>
                      <p className="mt-2.5 text-[13px] leading-6" style={{ color: SECTION.body.color }}>
                        أعمل حاليًا على تطوير مهاراتي في عدة مجالات داخل عالم تكنولوجيا المعلومات، وأحرص على تطبيق ما أتعلمه من
                        خلال مشاريع عملية. أسعى دائمًا لتحويل المعرفة النظرية إلى خبرة حقيقية من خلال التجربة والتطبيق المستمر.
                      </p>
                    </section>

                    <section>
                      <div className="text-[15px] font-black" style={{ color: SECTION.title.color }}>
                        💡 <span style={{ color: SECTION.title.accent }}>أسلوبي في العمل</span>
                      </div>
                      <p className="mt-2.5 text-[13px] leading-6" style={{ color: SECTION.body.color }}>
                        أؤمن أن التميز في المجال التقني يعتمد على التطبيق العملي إلى جانب الفهم النظري، لذلك أركز على:
                      </p>
                      <BulletList items={workStyleBullets} />
                    </section>

                    <section>
                      <div className="text-[15px] font-black" style={{ color: SECTION.title.color }}>
                        🔥 <span style={{ color: SECTION.title.accent }}>نقطة التحول</span>
                      </div>
                      <p className="mt-2.5 text-[13px] leading-6" style={{ color: SECTION.body.color }}>
                        من خلال المشاريع والدورات التي خضتها، طورت طريقة تفكيري بشكل ملحوظ، وأصبحت أركز على بناء حلول عملية وفعالة.
                        هذه التجارب ساهمت في تعزيز مهاراتي وتسريع تقدمي في المجال.
                      </p>
                    </section>

                    <section>
                      <div className="text-[15px] font-black" style={{ color: SECTION.title.color }}>
                        🎯 <span style={{ color: SECTION.title.accent }}>هدفي</span>
                      </div>
                      <p className="mt-2.5 text-[13px] leading-6" style={{ color: SECTION.body.color }}>
                        أسعى إلى بناء مشاريع تقنية ذات قيمة حقيقية، وتطوير نفسي للوصول إلى مستوى احترافي في تطوير الويب والبرمجة،
                        مع التوسع في مختلف مجالات تكنولوجيا المعلومات.
                      </p>

                      <SocialGrid items={socialItems} />
                    </section>
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

