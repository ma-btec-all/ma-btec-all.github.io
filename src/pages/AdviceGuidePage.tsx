import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search, Lightbulb, Grid3X3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { adviceGuideItems, type AdviceCardItem } from "@/data/adviceGuide";
import { useAccentColor } from "@/hooks/useAccentColor";
import { useLanguage } from "@/hooks/useLanguage";

const MeshBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const render = () => {
      time += 0.004;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        canvas.width * (0.25 + Math.sin(time) * 0.08),
        canvas.height * 0.3,
        0,
        canvas.width * 0.3,
        canvas.height * 0.4,
        canvas.width * 0.65,
      );

      gradient.addColorStop(0, "rgba(34, 211, 238, 0.1)");
      gradient.addColorStop(0.35, "rgba(14, 165, 233, 0.06)");
      gradient.addColorStop(1, "rgba(2, 6, 23, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradientTwo = ctx.createRadialGradient(
        canvas.width * 0.75,
        canvas.height * (0.65 + Math.cos(time * 0.8) * 0.06),
        0,
        canvas.width * 0.75,
        canvas.height * 0.65,
        canvas.width * 0.55,
      );
      gradientTwo.addColorStop(0, "rgba(168, 85, 247, 0.08)");
      gradientTwo.addColorStop(0.4, "rgba(59, 130, 246, 0.05)");
      gradientTwo.addColorStop(1, "rgba(2, 6, 23, 0)");
      ctx.fillStyle = gradientTwo;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(255,255,255,0.035)";
      ctx.lineWidth = 1;
      const step = 64;

      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      animationId = window.requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />;
};

const AdviceCard = ({ item, index }: { item: AdviceCardItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const { currentColor } = useAccentColor();
  const { lang } = useLanguage();
  const Icon = item.icon;

  const handleMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setTilt({ x: (y - 0.5) * -12, y: (x - 0.5) * 12 });
    setGlow({ x: x * 100, y: y * 100 });
  }, []);

  const resetTilt = useCallback(() => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlow({ x: 50, y: 50 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      whileHover={{ scale: 1.05 }}
      className="h-full"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={resetTilt}
        className="relative h-full overflow-hidden rounded-[28px]"
        style={{
          transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.16s ease-out",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, hsl(${currentColor.hsl} / 0.22), transparent 58%)`,
          }}
        />

        <div
          className="relative z-20 flex h-full min-h-[280px] flex-col rounded-[28px] border bg-slate-950/35 p-6 backdrop-blur-2xl"
          style={{
            borderColor: hovered ? `hsl(${currentColor.hsl} / 0.5)` : "rgba(255,255,255,0.08)",
            boxShadow: hovered
              ? `0 0 32px hsl(${currentColor.hsl} / 0.22), inset 0 0 24px hsl(${currentColor.hsl} / 0.06)`
              : "0 16px 40px rgba(0,0,0,0.18)",
          }}
        >
          <div
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background: `linear-gradient(135deg, hsl(${currentColor.hsl} / 0.22), rgba(255,255,255,0.05))`,
              boxShadow: `0 0 24px hsl(${currentColor.hsl} / 0.18)`,
            }}
          >
            <Icon
              className="h-8 w-8"
              style={{
                color: `hsl(${currentColor.hsl})`,
                filter: `drop-shadow(0 0 10px hsl(${currentColor.hsl} / 0.55))`,
              }}
            />
          </div>

          <h3 className="mb-3 text-xl font-black text-foreground" style={{ fontFamily: "Cairo, sans-serif" }}>
            {lang === "ar" ? item.titleAr : item.titleEn}
          </h3>

          <p className="mt-auto text-sm leading-7 text-muted-foreground">
            {lang === "ar" ? item.descriptionAr : item.descriptionEn}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const AdviceGuidePage = () => {
  const { currentColor } = useAccentColor();
  const { lang, dir, t } = useLanguage();
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return adviceGuideItems;

    return adviceGuideItems.filter((item) =>
      [
        item.titleAr,
        item.titleEn,
        item.descriptionAr,
        item.descriptionEn,
      ].some((value) => value.toLowerCase().includes(query)),
    );
  }, [search]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background" dir={dir}>
      <MeshBackground />
      <Navbar />

      <section className="relative z-10 px-4 pb-16 pt-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold"
              style={{
                color: `hsl(${currentColor.hsl})`,
                borderColor: `hsl(${currentColor.hsl} / 0.28)`,
                background: `hsl(${currentColor.hsl} / 0.08)`,
                boxShadow: `0 0 16px hsl(${currentColor.hsl} / 0.14)`,
              }}
            >
              <Lightbulb className="h-4 w-4" />
              {lang === "ar" ? "Educational Guide" : "Educational Guide"}
            </div>

            <h1 className="mb-3 text-4xl font-black text-foreground md:text-5xl" style={{ fontFamily: "Cairo, sans-serif" }}>
              {lang === "ar" ? "نصائح وارشادات" : "Advice & Guidance"}
            </h1>

            <p className="mx-auto max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
              {lang === "ar"
                ? "مجموعة بطاقات إرشادية بتصميم زجاجي حديث تساعدك على تحسين الدراسة، تنظيم الوقت، والاستعداد الأفضل للاختبارات والمهمات."
                : "A premium glass-style guide page with practical cards to improve studying, time management, exams, and assignments."}
            </p>

            <div
              className="mx-auto mt-5 h-px w-52 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, hsl(${currentColor.hsl}), transparent)`,
                boxShadow: `0 0 18px hsl(${currentColor.hsl} / 0.35)`,
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mx-auto mb-10 max-w-2xl"
          >
            <div
              className="flex items-center gap-3 rounded-[24px] border px-4 py-3 backdrop-blur-2xl"
              style={{
                background: "rgba(15, 23, 42, 0.42)",
                borderColor: `hsl(${currentColor.hsl} / 0.2)`,
                boxShadow: `0 0 24px hsl(${currentColor.hsl} / 0.1)`,
              }}
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={lang === "ar" ? "ابحث داخل النصائح والإرشادات..." : "Search advice cards..."}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/55"
                dir={dir}
              />
            </div>
          </motion.div>

          <div className="mb-6 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Grid3X3 className="h-4 w-4" />
              <span>
                {lang === "ar" ? `${filteredItems.length} بطاقة` : `${filteredItems.length} cards`}
              </span>
            </div>

            <div className="text-xs text-muted-foreground">
              {t("settings.language")} / {t("settings.mode")}
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item, index) => (
                <AdviceCard key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl rounded-[28px] border border-border/20 bg-slate-950/35 px-6 py-12 text-center backdrop-blur-2xl">
              <p className="text-lg font-bold text-foreground" style={{ fontFamily: "Cairo, sans-serif" }}>
                {lang === "ar" ? "لا توجد نتائج مطابقة" : "No matching results"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {lang === "ar"
                  ? "جرّب كلمة بحث مختلفة أو امسح النص لإظهار جميع البطاقات."
                  : "Try a different keyword or clear the search to show all cards."}
              </p>
            </div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center text-lg font-bold text-primary/80 md:text-xl"
            style={{
              fontFamily: "Cairo, sans-serif",
              textShadow: `0 0 22px hsl(${currentColor.hsl} / 0.25)`,
            }}
          >
            {lang === "ar"
              ? "نصيحة اليوم هي استثمار الغد.. اتبع الإرشادات لتصل لقمة الإنجاز."
              : "Today's advice is tomorrow's investment. Follow the guidance to reach the peak of achievement."}
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdviceGuidePage;
