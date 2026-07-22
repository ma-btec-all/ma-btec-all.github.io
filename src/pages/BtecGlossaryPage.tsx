import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { glossaryTerms, gradeConfig, type GradeLevel } from "@/data/btecGlossary";

/* ── Particles Background ── */
const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5, alpha: Math.random() * 0.25 + 0.05,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45, 212, 191, ${p.alpha})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(45, 212, 191, ${0.03 * (1 - dist / 120)})`; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

/* ── Glossary Card ── */
const GlossaryCard = ({ term, index }: { term: typeof glossaryTerms[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const grade = gradeConfig[term.grade];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -8, y: (x - 0.5) * 8 });
    setGlowPos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 }); setGlowPos({ x: 50, y: 50 }); setHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.03, duration: 0.45 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative group rounded-xl overflow-hidden h-full"
        style={{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* Dynamic glow */}
        <div
          className="absolute inset-0 rounded-xl z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${grade.glow} 0%, transparent 60%)` }}
        />

        <div
          className={`relative z-20 h-full bg-[#1e1e2e]/70 backdrop-blur-xl border rounded-xl transition-all duration-300 overflow-hidden flex flex-col ${
            hovered ? grade.border : "border-border/20"
          }`}
          style={hovered ? { boxShadow: `0 0 30px -5px ${grade.glow}` } : {}}
        >
          {/* Grade badge */}
          <div className="px-5 pt-5 pb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-widest ${grade.bg} ${grade.text} ${grade.border} border`}>
              {grade.label}
            </span>
          </div>

          {/* Verb title */}
          <div className="px-5 pb-3 border-b border-border/10">
            <h3 className={`text-xl font-bold ${grade.text} transition-all ${hovered ? "drop-shadow-[0_0_8px_currentColor]" : ""}`}>
              {term.verb}
              <span className="text-foreground/60 mx-2">|</span>
              <span className="font-cairo text-foreground/90">{term.verbAr}</span>
            </h3>
          </div>

          {/* English definition */}
          <div className="px-5 pt-3 pb-2 flex-1">
            <p className="text-xs uppercase tracking-wider text-muted-foreground/50 mb-1.5 font-mono">Definition</p>
            <p className="text-sm text-foreground/80 leading-relaxed">{term.definition}</p>
          </div>

          {/* Arabic definition */}
          <div className="px-5 pb-5 pt-2">
            <div className={`rounded-lg p-3 ${grade.bg} border ${grade.border}`} dir="rtl">
              <p className="text-xs uppercase tracking-wider text-muted-foreground/60 mb-1.5 font-cairo">بالعربي</p>
              <p className="text-sm text-foreground/90 leading-relaxed font-cairo">{term.definitionAr}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Filter Button ── */
const FilterBtn = ({
  active, onClick, children, color,
}: {
  active: boolean; onClick: () => void; children: React.ReactNode; color?: string;
}) => {
  const colorMap: Record<string, string> = {
    emerald: active ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "text-emerald-400/60 border-border/20 hover:border-emerald-500/30",
    cyan: active ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/40" : "text-cyan-400/60 border-border/20 hover:border-cyan-500/30",
    amber: active ? "bg-amber-500/20 text-amber-400 border-amber-500/40" : "text-amber-400/60 border-border/20 hover:border-amber-500/30",
  };
  const base = color
    ? colorMap[color]
    : active
      ? "bg-primary/20 text-primary border-primary/40"
      : "text-muted-foreground border-border/20 hover:border-primary/30";

  return (
    <button onClick={onClick} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${base}`}>
      {children}
    </button>
  );
};

/* ── Main Page ── */
const BtecGlossaryPage = () => {
  const [filter, setFilter] = useState<GradeLevel | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = glossaryTerms
    .filter((t) => filter === "all" || t.grade === filter)
    .filter((t) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return t.verb.toLowerCase().includes(q) || t.verbAr.includes(q) || t.definition.toLowerCase().includes(q) || t.definitionAr.includes(q);
    });

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Particles />
      <Navbar />

      <div className="relative z-10 page-safe-top pb-16 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            BTEC Command Terms Glossary
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-3 font-cairo">
            <span className="gradient-text">دليل مصطلحات</span> BTEC
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-4 font-cairo">
            دليل شامل لجميع مصطلحات الأوامر المستخدمة في مهمات BTEC مع الشرح بالعربي
          </p>
          <div className="mx-auto w-48 h-0.5 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
        </motion.div>

        {/* Search bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
            <input
              type="text"
              placeholder="ابحث عن مصطلح..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1e1e2e]/60 backdrop-blur border border-border/20 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 transition-colors text-sm font-cairo"
              dir="rtl"
            />
          </div>
        </motion.div>

        {/* Filter buttons */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-2 mb-10">
          <FilterBtn active={filter === "all"} onClick={() => setFilter("all")}>
            <Filter className="w-3.5 h-3.5" /> الكل ({glossaryTerms.length})
          </FilterBtn>
          <FilterBtn active={filter === "pass"} onClick={() => setFilter("pass")} color="emerald">
            Pass
          </FilterBtn>
          <FilterBtn active={filter === "merit"} onClick={() => setFilter("merit")} color="cyan">
            Merit
          </FilterBtn>
          <FilterBtn active={filter === "distinction"} onClick={() => setFilter("distinction")} color="amber">
            Distinction
          </FilterBtn>
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((term, i) => (
              <GlossaryCard key={term.verb} term={term} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground/60 font-cairo">
            لا توجد نتائج مطابقة للبحث
          </div>
        )}

        {/* Footer quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 text-lg md:text-xl font-bold text-primary/80 font-cairo"
          style={{ textShadow: "0 0 20px rgba(45,212,191,0.3)" }}
        >
          فهم كلمات الأمر هو أول خطوة نحو تحقيق التميز في BTEC.
        </motion.p>
      </div>

      <Footer />
    </div>
  );
};

export default BtecGlossaryPage;
