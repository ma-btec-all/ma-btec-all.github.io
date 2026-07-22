import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarClock, ExternalLink, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courseSectors, type CourseItem } from "@/data/coursesData";

const MIN_CARDS = 8;

const GridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: "hsl(220 30% 7%)",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.14),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(234,179,8,0.12),transparent_38%)]" />
  </div>
);

const makeComingSoonCard = (sectorName: string, index: number): CourseItem => ({
  title: "قيد التجهيز",
  description: `سيتم إضافة دورات ${sectorName} قريبًا. تابعنا للحصول على أحدث المحتوى.`,
  image: `https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80&ixid=${index + 1}`,
});

const CoursesPage = () => {
  const [activeSectorId, setActiveSectorId] = useState(courseSectors[0].id);
  const activeSector = courseSectors.find((s) => s.id === activeSectorId) ?? courseSectors[0];

  const visibleCards = useMemo(() => {
    const cards = [...activeSector.courses];
    while (cards.length < MIN_CARDS) {
      cards.push(makeComingSoonCard(activeSector.name, cards.length));
    }
    return cards;
  }, [activeSector]);

  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <GridBackground />
      <Navbar />

      <main className="relative z-10 pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5"
              style={{
                background: `hsl(${activeSector.accent} / 0.14)`,
                color: `hsl(${activeSector.accent})`,
              }}
            >
              <Sparkles className="w-4 h-4" />
              منصة الدورات
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-3">الدورات</h1>
            <p className="text-muted-foreground max-w-3xl">
              اختر القطاع المناسب، واستكشف الدورات المتاحة بصيغة احترافية سهلة التصفح.
            </p>
          </motion.div>

          <div className="mt-7 overflow-x-auto pb-2">
            <div className="inline-flex items-center gap-2 min-w-max">
              {courseSectors.map((sector) => {
                const isActive = activeSectorId === sector.id;
                return (
                  <button
                    key={sector.id}
                    type="button"
                    onClick={() => setActiveSectorId(sector.id)}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border"
                    style={{
                      color: isActive ? "#F8F9FA" : "rgba(248,249,250,0.72)",
                      background: isActive
                        ? `linear-gradient(135deg, hsl(${sector.accent} / 0.35), rgba(15,18,30,0.9))`
                        : "rgba(12,16,30,0.58)",
                      borderColor: isActive
                        ? `hsl(${sector.accent} / 0.55)`
                        : "rgba(255,255,255,0.12)",
                      boxShadow: isActive
                        ? `0 0 20px hsl(${sector.accent} / 0.35)`
                        : "none",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {sector.name}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div
            key={activeSector.id}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {visibleCards.map((course, index) => {
              const isComingSoon = !course.url;
              return (
                <motion.article
                  key={`${activeSector.id}-${course.title}-${index}`}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="rounded-2xl overflow-hidden border flex flex-col h-full"
                  style={{
                    background: "rgba(8,12,24,0.6)",
                    borderColor: `hsl(${activeSector.accent} / 0.3)`,
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                  }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[#F8F9FA] leading-snug mb-2">{course.title}</h3>
                    <p className="text-sm text-slate-300/90 leading-relaxed flex-1">{course.description}</p>

                    {isComingSoon ? (
                      <div
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold border"
                        style={{
                          color: "#FDE68A",
                          background: "rgba(113,63,18,0.28)",
                          borderColor: "rgba(250,204,21,0.4)",
                        }}
                      >
                        <CalendarClock className="w-4 h-4" />
                        قريباً
                      </div>
                    ) : (
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-300"
                        style={{
                          color: "#1F2937",
                          background: "linear-gradient(135deg, #FDE68A, #F59E0B)",
                          boxShadow: "0 0 20px rgba(245,158,11,0.3)",
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        عرض الدورة
                      </a>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoursesPage;
