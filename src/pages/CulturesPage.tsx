import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  Languages,
  BookOpen,
  Moon,
  Landmark,
  FolderOpen,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type GenerationId = "2008" | "2009" | "2010";

interface Generation {
  id: GenerationId;
  title: string;
  subtitle: string;
  gradient: string;
  ring: string;
  glow: string;
}

const GENERATIONS: Generation[] = [
  {
    id: "2008",
    title: "جميع ملفات المواد المشتركة",
    subtitle: "جيل 2008",
    gradient: "from-cyan-500/20 via-sky-500/10 to-blue-600/20",
    ring: "ring-cyan-400/30",
    glow: "shadow-[0_0_60px_-15px_rgba(34,211,238,0.45)]",
  },
  {
    id: "2009",
    title: "جميع ملفات المواد المشتركة",
    subtitle: "جيل 2009",
    gradient: "from-fuchsia-500/20 via-purple-500/10 to-violet-600/20",
    ring: "ring-fuchsia-400/30",
    glow: "shadow-[0_0_60px_-15px_rgba(217,70,239,0.45)]",
  },
  {
    id: "2010",
    title: "جميع ملفات المواد المشتركة",
    subtitle: "جيل 2010",
    gradient: "from-amber-500/20 via-orange-500/10 to-rose-600/20",
    ring: "ring-amber-400/30",
    glow: "shadow-[0_0_60px_-15px_rgba(245,158,11,0.45)]",
  },
];

const LINKS: Record<GenerationId, Record<"english" | "islamic" | "arabic" | "history", string>> = {
  "2008": {
    english: "https://drive.google.com/drive/folders/1Wwfk8dnTClfGQerq9mQvoCqoou_seLy8?usp=sharing",
    islamic: "https://drive.google.com/drive/folders/1bg4ElSdEjxvEz0NNDdP6TlrUTbHZM_Eg?usp=sharing",
    arabic: "https://drive.google.com/drive/folders/1LkDrvFzN5zB8ZmzgSHeeEVpBBLAWIniw?usp=sharing",
    history: "https://drive.google.com/drive/folders/1FeirwMpzIKXf0yFfpXOZ50gJa-QmmKdJ?usp=drive_link",
  },
  "2009": {
    english: "https://drive.google.com/drive/folders/18mcZMXKw8cUSG6dilOfvf69FVdy-2u5Z?usp=sharing",
    islamic: "https://drive.google.com/drive/folders/1NYzcPYvpfo1m9sNndKiibY-YchJESsL5?usp=sharing",
    arabic: "https://drive.google.com/drive/folders/1gEeKRwmfK9CKE_vkcDafMO4uY2VWevq8?usp=sharing",
    history: "https://drive.google.com/drive/folders/1Fm_xo8p88GtJLUhybh1LSiJ1_AE4S5Xu?usp=sharing",
  },
  "2010": {
    english: "https://drive.google.com/drive/folders/1tS0yfPwhdZEiEBq6WeBtRL7KgISrV-4b?usp=sharing",
    islamic: "https://drive.google.com/drive/folders/1XDtto-AiZZaPxvJLU4mjrEnYCiifNaxy?usp=sharing",
    arabic: "https://drive.google.com/drive/folders/1uXNRVvCd7mg-Jx8jVMt_WNqj_kQOiZ-J?usp=sharing",
    history: "https://drive.google.com/drive/folders/1cwsRHnmYbg3Fcq-P409Ewhd6xV5EsLKV?usp=sharing",
  },
};

const SUBJECTS = [
  { key: "english" as const, name: "اللغة الإنجليزية", icon: Languages, accent: "text-cyan-300", bg: "from-cyan-500/15 to-blue-600/10" },
  { key: "islamic" as const, name: "التربية الإسلامية", icon: Moon, accent: "text-emerald-300", bg: "from-emerald-500/15 to-teal-600/10" },
  { key: "arabic" as const, name: "اللغة العربية", icon: BookOpen, accent: "text-amber-300", bg: "from-amber-500/15 to-orange-600/10" },
  { key: "history" as const, name: "تاريخ الأردن", icon: Landmark, accent: "text-rose-300", bg: "from-rose-500/15 to-fuchsia-600/10" },
];

const CulturesPage = () => {
  const [selected, setSelected] = useState<GenerationId | null>(null);
  const activeGen = GENERATIONS.find((g) => g.id === selected);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6 text-muted-foreground" aria-label="breadcrumb">
            <button
              onClick={() => setSelected(null)}
              className={`transition-colors hover:text-foreground ${selected ? "" : "text-foreground font-semibold"}`}
            >
              مواد الثقافات
            </button>
            {activeGen && (
              <>
                <ChevronLeft className="w-4 h-4 opacity-60" />
                <span className="text-foreground font-semibold">{activeGen.subtitle}</span>
              </>
            )}
          </nav>

          <motion.div
            key={selected ?? "root"}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-3">
              <span className="gradient-text">
                {activeGen ? `${activeGen.subtitle} — اختر المادة` : "مواد الثقافات"}
              </span>
            </h1>
            <p className="text-muted-foreground">
              {activeGen
                ? "اضغط على المادة لفتح مجلد Google Drive في نافذة جديدة"
                : "اختر الجيل لعرض ملفات المواد المشتركة"}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div
                key="generations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {GENERATIONS.map((gen, i) => (
                  <motion.button
                    key={gen.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => setSelected(gen.id)}
                    className={`group relative text-right rounded-2xl p-8 border border-white/10 ring-1 ${gen.ring} bg-gradient-to-br ${gen.gradient} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:${gen.glow} hover:border-white/20`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center backdrop-blur-md">
                        <FolderOpen className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-xs font-bold tracking-wider text-white/70 px-3 py-1 rounded-full border border-white/15 bg-white/5">
                        {gen.subtitle}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight mb-2">
                      {gen.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      4 مواد · إنجليزي، إسلامية، عربي، تاريخ
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/90 group-hover:text-white transition-colors">
                      عرض المواد
                      <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`subjects-${selected}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {SUBJECTS.map((sub, i) => {
                    const Icon = sub.icon;
                    const url = LINKS[selected][sub.key];
                    return (
                      <motion.a
                        key={sub.key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className={`group relative rounded-2xl p-6 border border-white/10 bg-gradient-to-br ${sub.bg} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl block`}
                      >
                        <div className="flex items-center justify-between mb-5">
                          <div className={`w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center ${sub.accent}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{sub.name}</h3>
                        <p className="text-xs text-muted-foreground">Google Drive · جيل {selected}</p>
                      </motion.a>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => setSelected(null)}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    العودة لاختيار الجيل
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CulturesPage;
