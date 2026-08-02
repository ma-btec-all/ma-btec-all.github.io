import { useState, useEffect, useMemo, useCallback, CSSProperties } from "react";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/hooks/useTheme";

/* ================================================================== *
 * Mohammad Atallah | BTEC — حاسبة معدل BTEC
 * تم التطوير بواسطة الأستاذ أحمد دومي
 * إعادة بناء كاملة حسب المواصفات المُرسَلة
 * (نظام نسب: U=0, P=60, M=80, D=100 — ثلاثة أنماط حساب — مواد مشتركة)
 * ================================================================== */

/* ============== Types ============== */
type Grade = "U" | "P" | "M" | "D";
type Theme = "light" | "dark";

interface Subject { name: string; hours: number; }
interface SubSpec { id: string; name: string; subjects: Subject[]; }
interface Specialization {
  id: string; name: string; subjects: Subject[]; subSpecs?: SubSpec[];
}
interface Stage {
  id: "first" | "tawjihi";
  name: string; icon: string; description: string;
  specializations: Specialization[];
}
interface SpecialtyResult {
  totalPoints: number; totalHours: number;
  average100: number; average35: number;
  subjectBreakdown: { name: string; hours: number; grade: Grade | null; points: number }[];
}
interface SharedResult {
  arabicWeighted: number; englishWeighted: number;
  islamicWeighted: number; historyWeighted: number;
  total30: number;
}

/* ============== Data ============== */
const STAGES: Stage[] = [
  {
    id: "first",
    name: "الأول ثانوي",
    icon: "🎓",
    description: "المرحلة الأولى من الدراسة الثانوية",
    specializations: [
      {
        id: "first-it",
        name: "تكنولوجيا المعلومات",
        subjects: [
          { name: "أنظمة التكنولوجيا", hours: 120 },
          { name: "ألعاب المتقدم", hours: 60 },
          { name: "تطبيقات المتقدم", hours: 60 },
          { name: "ويب المتقدم", hours: 60 },
          { name: "الدعم الفني", hours: 60 },
        ],
      },
      {
        id: "first-business",
        name: "إدارة الأعمال",
        subjects: [
          { name: "استكشاف الأعمال", hours: 90 },
          { name: "البحث والتخطيط لحملة تسويقية", hours: 90 },
          { name: "تمويل الأعمال", hours: 90 },
          { name: "إدارة الفعاليات", hours: 90 },
        ],
      },
      {
        id: "first-beauty",
        name: "التجميل",
        subjects: [
          { name: "تدريب صالون التجميل المهني", hours: 60 },
          { name: "الصحة والتغذية", hours: 60 },
          { name: "الأساليب المتقدمة للعناية بالأظافر وتجميلها", hours: 60 },
          { name: "علاجات البشرة المتقدمة", hours: 60 },
          { name: "المكياج الإبداعي وفن الحناء", hours: 60 },
          { name: "تلوين وتفتيح الشعر وتقنيات التمليسات", hours: 60 },
          { name: "نظرة عامة على البلوثيربي", hours: 90 },
        ],
      },
      {
        id: "first-engineering",
        name: "الهندسة",
        subjects: [
          { name: "تصميم وتصنيع المنتجات في الهندسة", hours: 120 },
          { name: "المبادئ الميكانيكية", hours: 60 },
          { name: "المبادئ الكهربائية والإلكترونية", hours: 60 },
          { name: "مبادئ التجارة والجودة التطبيقية في الهندسة", hours: 60 },
          { name: "تقديم العمليات بأمان كفريق في الهندسة", hours: 60 },
        ],
      },
    ],
  },
  {
    id: "tawjihi",
    name: "التوجيهي",
    icon: "🏆",
    description: "المرحلة التوجيهية النهائية",
    specializations: [
      {
        id: "tawjihi-it",
        name: "تكنولوجيا المعلومات",
        subjects: [
          { name: "الأمن السيبراني", hours: 120 },
          { name: "البرمجة", hours: 90 },
          { name: "إدارة المشاريع", hours: 90 },
          { name: "ذكاء اصطناعي", hours: 60 },
        ],
      },
      {
        id: "tawjihi-business",
        name: "إدارة الأعمال",
        subjects: [
          { name: "مبادئ الإدارة", hours: 60 },
          { name: "اتخاذ قرارات الأعمال", hours: 120 },
          { name: "الموارد البشرية", hours: 60 },
          { name: "دراسة خدمة العملاء", hours: 60 },
          { name: "أخلاقيات الأعمال", hours: 60 },
        ],
      },
      {
        id: "tawjihi-beauty",
        name: "التجميل",
        subjects: [
          { name: "قص الشعر والتجميل والمشورة", hours: 90 },
          { name: "التدليك والعلاج بالروائح", hours: 90 },
          { name: "بدء مشروع وإدارته", hours: 90 },
        ],
      },
      {
        id: "tawjihi-engineering",
        name: "الهندسة",
        subjects: [],
        subSpecs: [
          {
            id: "tawjihi-electrical",
            name: "الكهرباء",
            subjects: [
              { name: "الأجهزة والدوائر الإلكترونية", hours: 60 },
              { name: "القياس والاختبار الإلكتروني للدوائر", hours: 60 },
              { name: "الدوائر الإلكترونية للمواد", hours: 60 },
              { name: "الأنظمة الإلكترونية التناظرية والرقمية", hours: 60 },
              { name: "المتحكمات المنطقية القابلة للبرمجة PLC", hours: 60 },
              { name: "الروبوتات الصناعية", hours: 60 },
            ],
          },
          {
            id: "tawjihi-mech",
            name: "الميكانيك",
            subjects: [
              { name: "السلوك الميكانيكي للمواد المعدنية", hours: 60 },
              { name: "السلوك الميكانيكي للمواد غير المعدنية", hours: 60 },
              { name: "صيانة الآلات الميكانيكية", hours: 60 },
              { name: "تقنية اللحام", hours: 60 },
              { name: "المعالجة الثانوية بالتصنيع", hours: 60 },
              { name: "عمليات التشغيل باستخدام التحكم الرقمي بالحاسوب CNC", hours: 60 },
            ],
          },
          {
            id: "tawjihi-auto",
            name: "تكنولوجيا السيارات",
            subjects: [
              { name: "أنظمة التعليق والتوجيه والبدء في المركبات الخفيفة", hours: 60 },
              { name: "تشغيل أنظمة نقل الحركة في المركبات الخفيفة وصيانتها", hours: 60 },
              { name: "محركات المركبات الكهربائية والهجينة", hours: 60 },
              { name: "تشغيل أنظمة الاتصال الإلكترونية في المركبات واختبارها", hours: 60 },
              { name: "أنظمة نقل الحركة الكهربائية", hours: 60 },
              { name: "النقل الكهربائي", hours: 60 },
            ],
          },
        ],
      },
    ],
  },
];

const GRADE_POINTS: Record<Grade, number> = { U: 0, P: 60, M: 80, D: 100 };

const SHARED_SUBJECTS = [
  { id: "arabic" as const, name: "اللغة العربية", maxMark: 100, weight: 10 },
  { id: "english" as const, name: "اللغة الإنجليزية", maxMark: 100, weight: 10 },
  { id: "islamic" as const, name: "التربية الإسلامية", maxMark: 60, weight: 6 },
  { id: "history" as const, name: "تاريخ الأردن", maxMark: 40, weight: 4 },
];
type SharedKey = typeof SHARED_SUBJECTS[number]["id"];

const SPEC_ICONS: Record<string, string> = {
  "تكنولوجيا المعلومات": "💻",
  "إدارة الأعمال": "📊",
  "التجميل": "💄",
  "الهندسة": "🔧",
  "الكهرباء": "⚡",
  "الميكانيك": "⚙️",
  "تكنولوجيا السيارات": "🚗",
};

const STAGE_COLOR: Record<string, string> = {
  first: "var(--info)",
  tawjihi: "var(--gold)",
};

/* ============== Calc ============== */
function calcSpecialty(subjects: Subject[], grades: Record<string, Grade | null>): SpecialtyResult {
  let totalPoints = 0;
  let totalHours = 0;
  const breakdown: SpecialtyResult["subjectBreakdown"] = [];
  for (const s of subjects) {
    const g = grades[s.name] ?? null;
    const pts = (g ? GRADE_POINTS[g] : 0) * s.hours;
    totalPoints += pts;
    totalHours += s.hours;
    breakdown.push({ name: s.name, hours: s.hours, grade: g, points: pts });
  }
  const average100 = totalHours > 0 ? totalPoints / totalHours : 0;
  return {
    totalPoints,
    totalHours,
    average100,
    average35: (average100 / 100) * 35,
    subjectBreakdown: breakdown,
  };
}

function calcShared(g: Record<SharedKey, string>): SharedResult {
  const a = ((parseFloat(g.arabic) || 0) / 100) * 10;
  const e = ((parseFloat(g.english) || 0) / 100) * 10;
  const i = ((parseFloat(g.islamic) || 0) / 60) * 6;
  const h = ((parseFloat(g.history) || 0) / 40) * 4;
  return { arabicWeighted: a, englishWeighted: e, islamicWeighted: i, historyWeighted: h, total30: a + e + i + h };
}

function gradeStatus(percent: number) {
  if (percent >= 90) return { label: "ممتاز", color: "#6366f1" };
  if (percent >= 80) return { label: "جيد جداً", color: "#22c55e" };
  if (percent >= 70) return { label: "جيد", color: "#10b981" };
  if (percent >= 60) return { label: "مقبول", color: "#f59e0b" };
  return { label: "دون المعدل", color: "#ef4444" };
}

const isValidNum = (v: string, max: number) => {
  const n = parseFloat(v);
  return !isNaN(n) && n >= 0 && n <= max;
};

/* ============== Steps ============== */
type Step =
  | "splash"
  | "stage"
  | "tawjihi-mode"
  | "specialization"
  | "engineering-sub"
  | "grades"
  | "shared-question"
  | "shared"
  | "results"
  | "tawjihi-shared-only"
  | "tawjihi-shared-results"
  | "full-first-spec"
  | "full-first-grades"
  | "full-tawjihi-spec"
  | "full-tawjihi-sub"
  | "full-tawjihi-grades"
  | "full-shared"
  | "full-results";

type Mode = "spec-only" | "shared-only" | "full-calc";

const STEP_LABELS: Record<string, string> = {
  stage: "المرحلة",
  "tawjihi-mode": "نوع الحساب",
  specialization: "التخصص",
  "engineering-sub": "تخصص الهندسة",
  grades: "التقديرات",
  "shared-question": "المشترك؟",
  shared: "المواد المشتركة",
  results: "النتائج",
  "tawjihi-shared-only": "المواد المشتركة",
  "tawjihi-shared-results": "النتائج",
  "full-first-spec": "الأول ثانوي / التخصص",
  "full-first-grades": "الأول ثانوي / التقديرات",
  "full-tawjihi-spec": "التوجيهي / التخصص",
  "full-tawjihi-sub": "التوجيهي / الهندسة",
  "full-tawjihi-grades": "التوجيهي / التقديرات",
  "full-shared": "المواد المشتركة",
  "full-results": "النتائج",
};

const FIRST_FLOW: Step[] = ["stage", "specialization", "grades", "results"];
const TAWJIHI_FLOW: Step[] = ["stage", "tawjihi-mode", "specialization", "grades", "results"];
const SHARED_ONLY_FLOW: Step[] = ["stage", "tawjihi-mode", "tawjihi-shared-only", "tawjihi-shared-results"];
const FULL_FLOW: Step[] = [
  "stage", "tawjihi-mode",
  "full-first-spec", "full-first-grades",
  "full-tawjihi-spec", "full-tawjihi-grades",
  "full-shared", "full-results",
];

function getFlow(step: Step): Step[] {
  if (["full-first-spec", "full-first-grades", "full-tawjihi-spec", "full-tawjihi-sub", "full-tawjihi-grades", "full-shared", "full-results"].includes(step)) return FULL_FLOW;
  if (["tawjihi-shared-only", "tawjihi-shared-results"].includes(step)) return SHARED_ONLY_FLOW;
  if (step === "tawjihi-mode") return TAWJIHI_FLOW;
  if (["specialization", "engineering-sub", "grades", "shared-question", "shared", "results"].includes(step)) {
    // Could be first or tawjihi spec-only — both share shape
    return TAWJIHI_FLOW;
  }
  return [];
}

/* ============== Splash (in-page, once per session) ============== */
function Splash({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setProgress((p) => {
        const np = p + 2;
        if (np >= 100) {
          window.clearInterval(id);
          setExiting(true);
          window.setTimeout(onDone, 450);
          return 100;
        }
        return np;
      });
    }, 50);
    return () => window.clearInterval(id);
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "var(--bg-deep)",
        display: "grid", placeItems: "center",
        opacity: exiting ? 0 : 1,
        transition: "opacity .45s ease",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 560, padding: 24 }}>
        <div style={{
          width: 120, height: 120, margin: "0 auto 24px", borderRadius: "50%",
          border: "3px solid var(--gold)",
          boxShadow: "0 0 0 6px var(--gold-dim), 0 0 50px var(--gold-glow)",
          display: "grid", placeItems: "center", fontSize: 56,
          animation: "asasPulse 1.6s ease-in-out infinite",
        }}>🎓</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "var(--text-primary)", marginBottom: 8 }}>
          أهلاً بك في منصة Mohammad Atallah | BTEC
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 16, marginBottom: 6 }}>حاسبة معدل BTEC الاحترافية</p>
        <div style={{ color: "var(--gold)", fontWeight: 700, fontSize: 13, marginBottom: 28 }}>
          ✦ تم التطوير بواسطة الأستاذ أحمد دومي ✦
        </div>
        <div style={{
          width: "100%", height: 6, borderRadius: 999,
          background: "var(--bg-subtle)", overflow: "hidden", border: "1px solid var(--border-subtle)",
        }}>
          <div style={{
            width: `${progress}%`, height: "100%",
            background: "linear-gradient(90deg, var(--gold), var(--gold-light))",
            transition: "width .12s linear",
            boxShadow: "0 0 16px var(--gold-glow)",
          }} />
        </div>
        <div style={{ marginTop: 12, color: "var(--text-muted)", fontSize: 12 }}>
          {progress < 100 ? `جارٍ التحميل... ${Math.ceil((100 - progress) / 20)} ث` : "جاهز!"}
        </div>
        <button
          onClick={() => { setExiting(true); setTimeout(onDone, 300); }}
          style={{
            marginTop: 22, background: "transparent",
            border: "1px solid var(--gold-border)", color: "var(--text-muted)",
            padding: "8px 20px", borderRadius: 999, cursor: "pointer",
            fontFamily: "inherit", fontSize: 13,
          }}
        >تخطي الشاشة ←</button>
      </div>
    </div>
  );
}

/* ============== Header (site navbar + breadcrumb) ============== */
function Header({ step, onReset }: {
  step: Step; theme?: Theme; onToggleTheme?: () => void; onReset: () => void;
}) {
  const flow = getFlow(step);
  const idx = flow.indexOf(step);
  return (
    <>
      <Navbar />
      <div className="asas-subheader no-print" style={{ marginTop: 110 }}>
        <div className="asas-header-inner">
          <div className="asas-brand">
            <div className="asas-logo">🎓</div>
            <div>
              <h1>MA BTEC</h1>
              <p>حاسبة معدل BTEC</p>
            </div>
          </div>

          {flow.length > 0 && (
            <div className="asas-breadcrumb">
              {flow.map((s, i) => {
                const done = i < idx;
                const active = s === step
                  || (step === "engineering-sub" && s === "specialization")
                  || (step === "shared-question" && s === "grades")
                  || (step === "shared" && s === "grades")
                  || (step === "full-tawjihi-sub" && s === "full-tawjihi-spec");
                return (
                  <span key={`${s}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {i > 0 && <span style={{ color: "var(--text-muted)", fontSize: 9 }}>◀</span>}
                    <span className={`asas-crumb ${done ? "done" : ""} ${active ? "active" : ""}`}>
                      {done ? "✓ " : ""}{STEP_LABELS[s] || ""}
                    </span>
                  </span>
                );
              })}
            </div>
          )}

          <div className="asas-header-actions">
            {step !== "stage" && step !== "splash" && (
              <button className="asas-reset" onClick={onReset}>↺ بدء جديد</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ============== Stage Step ============== */
function StageStep({ onSelect }: { onSelect: (id: "first" | "tawjihi") => void }) {
  return (
    <div className="asas-page-enter">
      <SectionHeader eyebrow="الخطوة الأولى" titleStart="اختر" titleAccent="المرحلة الدراسية"
        subtitle="حدد مرحلتك الدراسية لعرض التخصصات المتاحة" />
      <div className="asas-stage-grid">
        {STAGES.map((s) => (
          <button key={s.id} className="asas-stage-card" onClick={() => onSelect(s.id)}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: `radial-gradient(circle, ${STAGE_COLOR[s.id]}22, transparent)`,
              border: `2px solid ${STAGE_COLOR[s.id]}44`,
              display: "grid", placeItems: "center", fontSize: 40, marginBottom: 8,
            }}>{s.icon}</div>
            <div className="asas-stage-name">{s.name}</div>
            <div className="asas-stage-desc">{s.description}</div>
            <div style={{ marginTop: 4, fontSize: 12, color: STAGE_COLOR[s.id], fontWeight: 600 }}>
              {s.specializations.length} تخصصات متاحة
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============== Tawjihi Mode ============== */
const MODE_OPTIONS = [
  { id: "spec-only" as Mode, icon: "🎯", title: "حساب معدل التوجيهي — تخصص فقط",
    desc: "يختار الطالب تخصصه ويدخل تقديرات المواد، والنتيجة من 35 فقط", color: "#6366f1" },
  { id: "shared-only" as Mode, icon: "📚", title: "حساب معدل المواد المشتركة فقط",
    desc: "يدخل الطالب علامات العربي والإنجليزي والدين والتاريخ، والنتيجة من 30", color: "#22c55e" },
  { id: "full-calc" as Mode, icon: "🏆", title: "حساب المعدل الكامل",
    desc: "الأول ثانوي (35) + التوجيهي (35) + المشترك (30) = المعدل النهائي من 100", color: "#c9a227" },
];

function TawjihiModeStep({ onSelect, onBack }: { onSelect: (m: Mode) => void; onBack: () => void }) {
  return (
    <div className="asas-page-enter">
      <SectionHeader eyebrow="التوجيهي — اختر نوع الحساب" titleStart="ماذا تريد" titleAccent="أن تحسب؟"
        subtitle="اختر المسار المناسب لاحتياجك" />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 640, margin: "0 auto" }}>
        {MODE_OPTIONS.map((m) => (
          <button key={m.id} onClick={() => onSelect(m.id)} className="asas-mode-card"
            style={{ borderColor: `${m.color}55` } as CSSProperties}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: `${m.color}18`, border: `2px solid ${m.color}44`,
              display: "grid", placeItems: "center", fontSize: 30, flexShrink: 0,
            }}>{m.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>{m.title}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{m.desc}</div>
            </div>
            <div style={{ color: m.color, fontSize: 22, flexShrink: 0 }}>←</div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <button className="asas-back" onClick={onBack} style={{ minWidth: 160 }}>← العودة لاختيار المرحلة</button>
      </div>
    </div>
  );
}

/* ============== Specialization step ============== */
function SpecStep({ stageName, specializations, onSelect, onBack, eyebrowExtra }: {
  stageName: string; specializations: Specialization[];
  onSelect: (id: string) => void; onBack: () => void; eyebrowExtra?: string;
}) {
  return (
    <div className="asas-page-enter">
      <SectionHeader eyebrow={`${stageName}${eyebrowExtra ? ` — ${eyebrowExtra}` : ""}`}
        titleStart="اختر" titleAccent="التخصص"
        subtitle="اختر تخصصك لعرض المواد الدراسية الخاصة به" />
      <div className="asas-spec-grid">
        {specializations.map((s) => {
          const stats = s.subSpecs?.length
            ? {
              subjects: s.subSpecs.reduce((a, x) => a + x.subjects.length, 0),
              hours: s.subSpecs.reduce((a, x) => a + x.subjects.reduce((b, y) => b + y.hours, 0), 0),
            }
            : { subjects: s.subjects.length, hours: s.subjects.reduce((a, x) => a + x.hours, 0) };
          const hasSub = !!s.subSpecs?.length;
          return (
            <button key={s.id} className="asas-spec-card" onClick={() => onSelect(s.id)}>
              <span className="asas-spec-icon">{SPEC_ICONS[s.name] || "📚"}</span>
              <div className="asas-spec-name">{s.name}</div>
              {hasSub ? (
                <div className="asas-spec-count">
                  <span style={{ color: "var(--gold)", fontWeight: 700 }}>{s.subSpecs!.length} تخصصات فرعية</span><br />
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{stats.subjects} مواد · {stats.hours} ساعة إجمالاً</span>
                </div>
              ) : (
                <div className="asas-spec-count">{stats.subjects} مواد · {stats.hours} ساعة</div>
              )}
              {hasSub && (
                <div style={{
                  marginTop: 8, fontSize: 11, color: "var(--gold)",
                  background: "var(--gold-dim)", padding: "2px 10px",
                  borderRadius: 999, border: "1px solid var(--gold-border)",
                }}>اختر التخصص الفرعي ←</div>
              )}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <button className="asas-back" onClick={onBack} style={{ minWidth: 160 }}>← العودة</button>
      </div>
    </div>
  );
}

/* ============== Engineering sub ============== */
function EngSubStep({ subSpecs, onSelect, onBack, contextLabel }: {
  subSpecs: SubSpec[]; onSelect: (id: string) => void; onBack: () => void; contextLabel?: string;
}) {
  return (
    <div className="asas-page-enter">
      <SectionHeader eyebrow={contextLabel || "التوجيهي — الهندسة"} titleStart="اختر" titleAccent="تخصص الهندسة"
        subtitle="حدد التخصص الهندسي الخاص بك" />
      <div className="asas-spec-grid" style={{ maxWidth: 640, margin: "0 auto" }}>
        {subSpecs.map((s) => {
          const hours = s.subjects.reduce((a, x) => a + x.hours, 0);
          return (
            <button key={s.id} className="asas-spec-card" onClick={() => onSelect(s.id)}>
              <span className="asas-spec-icon">{SPEC_ICONS[s.name] || "🔧"}</span>
              <div className="asas-spec-name">{s.name}</div>
              <div className="asas-spec-count">{s.subjects.length} مواد · {hours} ساعة</div>
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 24, textAlign: "center" }}>
        <button className="asas-back" onClick={onBack}>← العودة لاختيار التخصص</button>
      </div>
    </div>
  );
}

/* ============== Grades step ============== */
const GRADE_OPTIONS: { value: Grade; desc: string; pts: string }[] = [
  { value: "U", desc: "غير ناجح", pts: "0" },
  { value: "P", desc: "مقبول", pts: "60" },
  { value: "M", desc: "جيد", pts: "80" },
  { value: "D", desc: "مميز", pts: "100" },
];

function GradesStep({ specName, stageName, subjects, grades, onGradeChange, onCalculate, onBack, calcButtonLabel }: {
  specName: string; stageName: string; subjects: Subject[];
  grades: Record<string, Grade | null>;
  onGradeChange: (name: string, g: Grade) => void;
  onCalculate: () => void; onBack: () => void; calcButtonLabel?: string;
}) {
  const filled = subjects.filter((s) => grades[s.name] != null).length;
  const all = filled === subjects.length;
  const totalHours = subjects.reduce((a, s) => a + s.hours, 0);
  return (
    <div className="asas-page-enter">
      <SectionHeader eyebrow={`${stageName} — ${specName}`} titleStart="أدخل" titleAccent="التقديرات"
        subtitle="اختر تقدير كل مادة — يُعرض عدد الساعات بجانب كل مادة للمرجع" />

      <div className="asas-legend">
        {GRADE_OPTIONS.map((g) => (
          <div key={g.value} className="asas-legend-item">
            <div className="asas-legend-dot" style={{ background: `var(--grade-${g.value.toLowerCase()})` }} />
            <span style={{ fontWeight: 700, color: "var(--text-secondary)" }}>{g.value}</span>
            <span>= {g.desc}</span>
            <span style={{ color: "var(--gold)", fontSize: 11 }}>({g.pts})</span>
          </div>
        ))}
      </div>

      <div className="asas-subjects-header">
        <div style={{ fontSize: 14, color: "var(--text-secondary)", fontWeight: 600 }}>
          مواد {specName}
          <span style={{ color: "var(--text-muted)", fontWeight: 400, marginInlineStart: 8 }}>({totalHours} ساعة إجمالاً)</span>
        </div>
        <div className="asas-subjects-progress">
          <span>{filled}/{subjects.length} مادة</span>
          <div className="asas-dots">
            {subjects.map((_, i) => <div key={i} className={`asas-dot ${i < filled ? "filled" : ""}`} />)}
          </div>
        </div>
      </div>

      <div className="asas-subject-list">
        {subjects.map((s, i) => {
          const cur = grades[s.name];
          return (
            <div key={s.name} className={`asas-subject-row ${cur ? "graded" : ""}`}
              style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="asas-subject-info">
                <div className="asas-subject-name">{s.name}</div>
                <div><span className="asas-hours-badge">{s.hours} ساعة</span></div>
              </div>
              <div className="asas-grade-buttons">
                {GRADE_OPTIONS.map((g) => (
                  <button key={g.value} title={g.desc}
                    className={`asas-grade-btn asas-g-${g.value.toLowerCase()} ${cur === g.value ? "active" : ""}`}
                    onClick={() => onGradeChange(s.name, g.value)}>
                    {g.value}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {!all && (
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-muted)", marginTop: 12 }}>
          يرجى إدخال تقدير لجميع المواد ({subjects.length - filled} متبقية)
        </p>
      )}

      <button className="asas-calc-btn" onClick={onCalculate} disabled={!all}>
        {all ? (calcButtonLabel ?? "✓ احسب معدل التخصص") : `أدخل تقديرات ${subjects.length - filled} مادة متبقية`}
      </button>

      <div style={{ marginTop: 12, textAlign: "center" }}>
        <button className="asas-back" onClick={onBack}>← العودة لاختيار التخصص</button>
      </div>
    </div>
  );
}

/* ============== Shared Question ============== */
function SharedQuestionStep({ specialtyAvg35, onAnswer }: { specialtyAvg35: number; onAnswer: (yes: boolean) => void }) {
  return (
    <div className="asas-page-enter" style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 32 }}>
      <SectionHeader eyebrow="الخطوة التالية" titleStart="معدل التخصص:" titleAccent={`${specialtyAvg35.toFixed(2)} / 35`} />
      <div className="asas-q-card">
        <div style={{ fontSize: 56, marginBottom: 8 }}>📚</div>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", marginBottom: 12 }}>المواد المشتركة</h3>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>
          هل ترغب في إضافة علامات المواد المشتركة؟<br />
          <strong style={{ color: "var(--gold)" }}>(العربي + الإنجليزي + الدين + التاريخ)</strong><br />
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>لحساب المعدل النهائي الكلي من 65</span>
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="asas-btn-yes" onClick={() => onAnswer(true)}>✓ نعم، أضف المواد</button>
          <button className="asas-btn-no" onClick={() => onAnswer(false)}>تخطي — اعرض من 35</button>
        </div>
      </div>
    </div>
  );
}

/* ============== Shared Step ============== */
function SharedStep({ grades, onChange, onCalculate, onBack, submitLabel }: {
  grades: Record<SharedKey, string>;
  onChange: (k: SharedKey, v: string) => void;
  onCalculate: () => void; onBack: () => void; submitLabel?: string;
}) {
  const allValid = SHARED_SUBJECTS.every((s) => isValidNum(grades[s.id], s.maxMark));
  return (
    <div className="asas-page-enter">
      <SectionHeader eyebrow="المواد المشتركة" titleStart="أدخل" titleAccent="العلامات الرقمية"
        subtitle="أدخل العلامة الفعلية لكل مادة مشتركة" />
      <div className="asas-shared-grid">
        {SHARED_SUBJECTS.map((s) => {
          const v = grades[s.id];
          const valid = v === "" ? null : isValidNum(v, s.maxMark);
          return (
            <div key={s.id} className="asas-shared-card">
              <div className="asas-shared-name">{s.name}</div>
              <div className="asas-shared-max">من {s.maxMark} · وزن {s.weight}</div>
              <input type="number" min={0} max={s.maxMark} step={0.5}
                value={v} onChange={(e) => onChange(s.id, e.target.value)}
                placeholder={`0 - ${s.maxMark}`}
                className={`asas-shared-input ${valid === false ? "invalid" : valid ? "valid" : ""}`} />
              {valid === false && <div className="asas-shared-err">القيمة يجب أن تكون بين 0 و {s.maxMark}</div>}
            </div>
          );
        })}
      </div>
      <button className="asas-calc-btn" onClick={onCalculate} disabled={!allValid}>
        {allValid ? (submitLabel ?? "✓ احسب المعدل النهائي") : "أكمل العلامات بشكل صحيح"}
      </button>
      <div style={{ marginTop: 12, textAlign: "center" }}>
        <button className="asas-back" onClick={onBack}>← العودة</button>
      </div>
    </div>
  );
}

/* ============== Section Header ============== */
function SectionHeader({ eyebrow, titleStart, titleAccent, subtitle }: {
  eyebrow: string; titleStart: string; titleAccent: string; subtitle?: string;
}) {
  return (
    <div className="asas-section-header">
      <span className="asas-eyebrow">{eyebrow}</span>
      <h2 className="asas-title">{titleStart} <span>{titleAccent}</span></h2>
      {subtitle && <p className="asas-subtitle">{subtitle}</p>}
    </div>
  );
}

/* ============== Results Cards ============== */
function StatusPill({ percent }: { percent: number }) {
  const s = gradeStatus(percent);
  return (
    <span style={{
      display: "inline-block", padding: "6px 18px", borderRadius: 999,
      background: `${s.color}22`, border: `1px solid ${s.color}66`,
      color: s.color, fontWeight: 800, fontSize: 14,
    }}>{s.label}</span>
  );
}

function ResultsSpec({ specRes, hasShared, shared, finalGrade, finalPercent, denom, onRestart, onBack, onAddShared, stageName, specName }: {
  specRes: SpecialtyResult; hasShared: boolean; shared?: SharedResult;
  finalGrade: number; finalPercent: number; denom: number;
  onRestart: () => void; onBack: () => void; onAddShared?: () => void;
  stageName: string; specName: string;
}) {
  return (
    <div className="asas-page-enter">
      <SectionHeader eyebrow={`${stageName} — ${specName}`} titleStart="🎉 نتيجتك" titleAccent="النهائية" />
      <div className="asas-result-card">
        <div className="asas-result-big">{specRes.average35.toFixed(2)} <span>/ 35</span></div>
        <div className="asas-result-percent">{specRes.average100.toFixed(1)}%</div>
        <StatusPill percent={specRes.average100} />
        <div className="asas-result-grid">
          <Stat label="إجمالي نقاط التخصص" value={`${specRes.totalPoints.toLocaleString()}`} />
          <Stat label="معدل التخصص من 100" value={`${specRes.average100.toFixed(2)}`} />
          <Stat label="معدل التخصص من 35" value={`${specRes.average35.toFixed(2)}`} />
        </div>
        {hasShared && shared && (
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px dashed var(--border-subtle)" }}>
            <div className="asas-result-grid">
              <Stat label="المواد المشتركة" value={`${shared.total30.toFixed(2)} / 30`} />
              <Stat label="المعدل النهائي" value={`${finalGrade.toFixed(2)} / ${denom}`} />
              <Stat label="النسبة المئوية النهائية" value={`${finalPercent.toFixed(1)}%`} />
            </div>
          </div>
        )}
      </div>

      <Breakdown title="تفصيل مواد التخصص" rows={specRes.subjectBreakdown} showValue />
      {hasShared && shared && <SharedBreakdown shared={shared} />}

      <FormulaBox hasShared={!!(hasShared && shared)} />

      <Actions onRestart={onRestart} onBack={onBack} onAddShared={!hasShared ? onAddShared : undefined} />
    </div>
  );
}

function FormulaBox({ hasShared }: { hasShared: boolean }) {
  return (
    <div className="asas-formula">
      <h3>📐 المعادلة المستخدمة</h3>
      <div className="asas-formula-body">
        <div className="asas-formula-line">
          <span className="asas-formula-label">قيمة كل تقدير:</span>
          <span>U = 0 &nbsp;·&nbsp; P = 60 &nbsp;·&nbsp; M = 80 &nbsp;·&nbsp; D = 100</span>
        </div>
        <div className="asas-formula-line">
          <span className="asas-formula-label">نقاط المادة:</span>
          <span>قيمة التقدير × عدد الساعات</span>
        </div>
        <div className="asas-formula-line">
          <span className="asas-formula-label">معدل التخصص من 100:</span>
          <span>مجموع النقاط ÷ مجموع الساعات</span>
        </div>
        <div className="asas-formula-line">
          <span className="asas-formula-label">معدل التخصص من 35:</span>
          <span>(معدل التخصص من 100 ÷ 100) × 35</span>
        </div>
        {hasShared && (
          <div className="asas-formula-line">
            <span className="asas-formula-label">المعدل النهائي:</span>
            <span>معدل التخصص من 35 + مجموع المواد المشتركة من 30</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultsSharedOnly({ shared, onRestart, onBack }: { shared: SharedResult; onRestart: () => void; onBack: () => void }) {
  const percent = (shared.total30 / 30) * 100;
  return (
    <div className="asas-page-enter">
      <SectionHeader eyebrow="المواد المشتركة" titleStart="🎉 معدل" titleAccent="المواد المشتركة" />
      <div className="asas-result-card">
        <div className="asas-result-big">{shared.total30.toFixed(2)} <span>/ 30</span></div>
        <div className="asas-result-percent">{percent.toFixed(1)}%</div>
        <StatusPill percent={percent} />
      </div>
      <SharedBreakdown shared={shared} />
      <Actions onRestart={onRestart} onBack={onBack} />
    </div>
  );
}

function ResultsFull({ first, firstSpec, taw, tawSpec, shared, onRestart, onBack }: {
  first: SpecialtyResult; firstSpec: string;
  taw: SpecialtyResult; tawSpec: string;
  shared: SharedResult; onRestart: () => void; onBack: () => void;
}) {
  const final = first.average35 + taw.average35 + shared.total30;
  const percent = final;
  return (
    <div className="asas-page-enter">
      <SectionHeader eyebrow="الحساب الكامل" titleStart="🏆 المعدل" titleAccent="النهائي" />
      <div className="asas-result-card">
        <div className="asas-result-big">{final.toFixed(2)} <span>/ 100</span></div>
        <div className="asas-result-percent">{percent.toFixed(1)}%</div>
        <StatusPill percent={percent} />
        <div className="asas-result-grid">
          <Stat label={`الأول ثانوي — ${firstSpec}`} value={`${first.average35.toFixed(2)} / 35`} />
          <Stat label={`التوجيهي — ${tawSpec}`} value={`${taw.average35.toFixed(2)} / 35`} />
          <Stat label="المواد المشتركة" value={`${shared.total30.toFixed(2)} / 30`} />
          <Stat label="مجموع الساعات" value={`${first.totalHours + taw.totalHours}`} />
        </div>
      </div>
      <Breakdown title={`تفاصيل الأول ثانوي — ${firstSpec}`} rows={first.subjectBreakdown} />
      <Breakdown title={`تفاصيل التوجيهي — ${tawSpec}`} rows={taw.subjectBreakdown} />
      <SharedBreakdown shared={shared} />
      <Actions onRestart={onRestart} onBack={onBack} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="asas-stat">
      <div className="asas-stat-label">{label}</div>
      <div className="asas-stat-value">{value}</div>
    </div>
  );
}

function Breakdown({ rows, title = "تفاصيل المواد", showValue = false }: { rows: SpecialtyResult["subjectBreakdown"]; title?: string; showValue?: boolean }) {
  return (
    <div className="asas-breakdown">
      <h3>{title}</h3>
      <div className="asas-table-wrap">
        <table>
          <thead>
            <tr>
              <th>المادة</th><th>الساعات</th><th>التقدير</th>
              {showValue && <th>القيمة</th>}
              <th>النقاط</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td>{r.name}</td>
                <td>{r.hours}</td>
                <td>
                  {r.grade ? (
                    <span className={`asas-chip asas-g-${r.grade.toLowerCase()}`}>{r.grade}</span>
                  ) : "-"}
                </td>
                {showValue && <td style={{ fontWeight: 700 }}>{r.grade ? GRADE_POINTS[r.grade] : 0}</td>}
                <td style={{ fontWeight: 700, color: "var(--gold)" }}>{r.points.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SharedBreakdown({ shared }: { shared: SharedResult }) {
  return (
    <div className="asas-breakdown">
      <h3>تفاصيل المواد المشتركة</h3>
      <div className="asas-table-wrap">
        <table>
          <thead><tr><th>المادة</th><th>الوزن</th><th>المحتسب</th></tr></thead>
          <tbody>
            <tr><td>اللغة العربية</td><td>10</td><td>{shared.arabicWeighted.toFixed(2)}</td></tr>
            <tr><td>اللغة الإنجليزية</td><td>10</td><td>{shared.englishWeighted.toFixed(2)}</td></tr>
            <tr><td>التربية الإسلامية</td><td>6</td><td>{shared.islamicWeighted.toFixed(2)}</td></tr>
            <tr><td>تاريخ الأردن</td><td>4</td><td>{shared.historyWeighted.toFixed(2)}</td></tr>
            <tr><td colSpan={2} style={{ fontWeight: 800, textAlign: "end" }}>الإجمالي</td>
              <td style={{ fontWeight: 800, color: "var(--gold)" }}>{shared.total30.toFixed(2)} / 30</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Actions({ onRestart, onBack, onAddShared }: { onRestart: () => void; onBack: () => void; onAddShared?: () => void }) {
  return (
    <div className="asas-actions no-print">
      <button className="asas-restart" onClick={onRestart}>↺ حساب جديد</button>
      {onAddShared && (
        <button className="asas-add-shared" onClick={onAddShared}>📚 إضافة المواد المشتركة</button>
      )}
      <button className="asas-print" onClick={() => window.print()}>🖨️ طباعة النتائج</button>
      <button className="asas-back" onClick={onBack}>← السابق</button>
    </div>
  );
}

/* ============== Main Page ============== */
export default function GradeCalculatorPage() {
  // Sync with global site theme (Dark/Light from SettingsPanel)
  const { theme: siteTheme } = useTheme();
  const theme: Theme = siteTheme === "light" ? "light" : "dark";
  const [step, setStep] = useState<Step>("stage");

  // Selections
  const [stageId, setStageId] = useState<"first" | "tawjihi" | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);
  const [specId, setSpecId] = useState<string | null>(null);
  const [subSpecId, setSubSpecId] = useState<string | null>(null);
  const [grades, setGrades] = useState<Record<string, Grade | null>>({});
  const [sharedGrades, setSharedGrades] = useState<Record<SharedKey, string>>({
    arabic: "", english: "", islamic: "", history: "",
  });

  // Full-calc selections
  const [firstSpecId, setFirstSpecId] = useState<string | null>(null);
  const [firstGrades, setFirstGrades] = useState<Record<string, Grade | null>>({});
  const [tawSpecId, setTawSpecId] = useState<string | null>(null);
  const [tawSubId, setTawSubId] = useState<string | null>(null);
  const [tawGrades, setTawGrades] = useState<Record<string, Grade | null>>({});

  // Inject scoped CSS
  useEffect(() => { injectAsasStyles(); }, []);

  const stage = useMemo(() => STAGES.find((s) => s.id === stageId) || null, [stageId]);
  const spec = useMemo(() => stage?.specializations.find((s) => s.id === specId) || null, [stage, specId]);
  const subSpec = useMemo(() => spec?.subSpecs?.find((s) => s.id === subSpecId) || null, [spec, subSpecId]);
  const activeSubjects = subSpec ? subSpec.subjects : (spec?.subjects ?? []);

  const firstStage = STAGES[0];
  const tawStage = STAGES[1];
  const firstSpec = useMemo(() => firstStage.specializations.find((s) => s.id === firstSpecId) || null, [firstSpecId]);
  const tawSpec = useMemo(() => tawStage.specializations.find((s) => s.id === tawSpecId) || null, [tawSpecId]);
  const tawSub = useMemo(() => tawSpec?.subSpecs?.find((s) => s.id === tawSubId) || null, [tawSpec, tawSubId]);
  const tawSubjects = tawSub ? tawSub.subjects : (tawSpec?.subjects ?? []);

  // Reset
  const reset = useCallback(() => {
    setStageId(null); setMode(null); setSpecId(null); setSubSpecId(null);
    setGrades({}); setSharedGrades({ arabic: "", english: "", islamic: "", history: "" });
    setFirstSpecId(null); setFirstGrades({});
    setTawSpecId(null); setTawSubId(null); setTawGrades({});
    setStep("stage");
  }, []);

  // ===== Render =====
  return (
    <div className="asas-root" data-theme={theme}>
      <Header step={step} onReset={reset} />
      <main className="asas-main">
        {step === "stage" && (
          <StageStep onSelect={(id) => {
            setStageId(id);
            setStep(id === "tawjihi" ? "tawjihi-mode" : "specialization");
          }} />
        )}

        {step === "tawjihi-mode" && (
          <TawjihiModeStep
            onBack={() => setStep("stage")}
            onSelect={(m) => {
              setMode(m);
              if (m === "spec-only") setStep("specialization");
              else if (m === "shared-only") setStep("tawjihi-shared-only");
              else setStep("full-first-spec");
            }} />
        )}

        {/* ---- Single specialty flow (first or tawjihi spec-only) ---- */}
        {step === "specialization" && stage && (
          <SpecStep stageName={stage.name} specializations={stage.specializations}
            onBack={() => setStep(stageId === "tawjihi" ? "tawjihi-mode" : "stage")}
            onSelect={(id) => {
              setSpecId(id);
              const sp = stage.specializations.find((s) => s.id === id);
              if (sp?.subSpecs?.length) setStep("engineering-sub");
              else setStep("grades");
            }} />
        )}

        {step === "engineering-sub" && spec?.subSpecs && (
          <EngSubStep subSpecs={spec.subSpecs}
            contextLabel={`${stage?.name} — الهندسة`}
            onBack={() => setStep("specialization")}
            onSelect={(id) => { setSubSpecId(id); setStep("grades"); }} />
        )}

        {step === "grades" && spec && (
          <GradesStep stageName={stage!.name} specName={subSpec?.name || spec.name}
            subjects={activeSubjects} grades={grades}
            onGradeChange={(name, g) => setGrades((p) => ({ ...p, [name]: g }))}
            onBack={() => setStep(spec.subSpecs?.length ? "engineering-sub" : "specialization")}
            onCalculate={() => setStep("results")}
            calcButtonLabel="✓ احسب معدل التخصص"
          />
        )}

        {step === "shared-question" && spec && (
          <SharedQuestionStep
            specialtyAvg35={calcSpecialty(activeSubjects, grades).average35}
            onAnswer={(yes) => setStep(yes ? "shared" : "results")} />
        )}

        {step === "shared" && (
          <SharedStep grades={sharedGrades}
            onChange={(k, v) => setSharedGrades((p) => ({ ...p, [k]: v }))}
            onBack={() => setStep("results")}
            onCalculate={() => setStep("results")}
            submitLabel="✓ احسب المعدل النهائي (من 65)" />
        )}

        {step === "results" && spec && (() => {
          const specRes = calcSpecialty(activeSubjects, grades);
          const hasShared = SHARED_SUBJECTS.every((s) => isValidNum(sharedGrades[s.id], s.maxMark));
          const sharedRes = hasShared ? calcShared(sharedGrades) : undefined;
          // Unified for both first & tawjihi spec-only: spec out of 35 (+ shared 30 → 65)
          const finalGrade = sharedRes ? specRes.average35 + sharedRes.total30 : specRes.average35;
          const denom = sharedRes ? 65 : 35;
          const percent = denom > 0 ? (finalGrade / denom) * 100 : 0;
          return <ResultsSpec
            specRes={specRes} hasShared={!!sharedRes} shared={sharedRes}
            finalGrade={finalGrade} finalPercent={percent} denom={denom}
            stageName={stage!.name} specName={subSpec?.name || spec.name}
            onRestart={reset}
            onBack={() => setStep("grades")}
            onAddShared={() => setStep("shared")} />;
        })()}

        {/* ---- Shared-only flow ---- */}
        {step === "tawjihi-shared-only" && (
          <SharedStep grades={sharedGrades}
            onChange={(k, v) => setSharedGrades((p) => ({ ...p, [k]: v }))}
            onBack={() => setStep("tawjihi-mode")}
            onCalculate={() => setStep("tawjihi-shared-results")}
            submitLabel="✓ احسب معدل المواد المشتركة" />
        )}

        {step === "tawjihi-shared-results" && (
          <ResultsSharedOnly shared={calcShared(sharedGrades)}
            onRestart={reset} onBack={() => setStep("tawjihi-shared-only")} />
        )}

        {/* ---- Full calc flow ---- */}
        {step === "full-first-spec" && (
          <SpecStep stageName={firstStage.name} specializations={firstStage.specializations}
            eyebrowExtra="الخطوة 1 من 4"
            onBack={() => setStep("tawjihi-mode")}
            onSelect={(id) => { setFirstSpecId(id); setStep("full-first-grades"); }} />
        )}

        {step === "full-first-grades" && firstSpec && (
          <GradesStep stageName={firstStage.name} specName={firstSpec.name}
            subjects={firstSpec.subjects} grades={firstGrades}
            onGradeChange={(name, g) => setFirstGrades((p) => ({ ...p, [name]: g }))}
            onBack={() => setStep("full-first-spec")}
            onCalculate={() => setStep("full-tawjihi-spec")}
            calcButtonLabel="التالي ← التوجيهي" />
        )}

        {step === "full-tawjihi-spec" && (
          <SpecStep stageName={tawStage.name} specializations={tawStage.specializations}
            eyebrowExtra="الخطوة 2 من 4"
            onBack={() => setStep("full-first-grades")}
            onSelect={(id) => {
              setTawSpecId(id);
              const sp = tawStage.specializations.find((s) => s.id === id);
              if (sp?.subSpecs?.length) setStep("full-tawjihi-sub");
              else setStep("full-tawjihi-grades");
            }} />
        )}

        {step === "full-tawjihi-sub" && tawSpec?.subSpecs && (
          <EngSubStep subSpecs={tawSpec.subSpecs}
            contextLabel="التوجيهي — الهندسة"
            onBack={() => setStep("full-tawjihi-spec")}
            onSelect={(id) => { setTawSubId(id); setStep("full-tawjihi-grades"); }} />
        )}

        {step === "full-tawjihi-grades" && tawSpec && (
          <GradesStep stageName={tawStage.name} specName={tawSub?.name || tawSpec.name}
            subjects={tawSubjects} grades={tawGrades}
            onGradeChange={(name, g) => setTawGrades((p) => ({ ...p, [name]: g }))}
            onBack={() => setStep(tawSpec.subSpecs?.length ? "full-tawjihi-sub" : "full-tawjihi-spec")}
            onCalculate={() => setStep("full-shared")}
            calcButtonLabel="التالي ← المواد المشتركة" />
        )}

        {step === "full-shared" && (
          <SharedStep grades={sharedGrades}
            onChange={(k, v) => setSharedGrades((p) => ({ ...p, [k]: v }))}
            onBack={() => setStep("full-tawjihi-grades")}
            onCalculate={() => setStep("full-results")}
            submitLabel="✓ احسب المعدل الكامل (من 100)" />
        )}

        {step === "full-results" && firstSpec && tawSpec && (
          <ResultsFull
            first={calcSpecialty(firstSpec.subjects, firstGrades)} firstSpec={firstSpec.name}
            taw={calcSpecialty(tawSubjects, tawGrades)} tawSpec={tawSub?.name || tawSpec.name}
            shared={calcShared(sharedGrades)}
            onRestart={reset} onBack={() => setStep("full-shared")} />
        )}
      </main>
    </div>
  );
}

/* ============== Page-scoped CSS injection ============== */
function injectAsasStyles() {
  if (document.getElementById("asas-styles")) return;
  const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap');

  .asas-root {
    --bg-deep:#EEF3F7; --bg-card:rgba(255,255,255,.95); --bg-card-hover:#FFFFFF;
    --header-bg:rgba(238,243,247,.94); --bg-subtle:rgba(47,86,115,.04);
    --border-subtle:rgba(47,86,115,.1); --bg-input:rgba(255,255,255,.92);
    --gold:#2F5673; --gold-light:#3D6A8A; --gold-pale:#5B8FAD;
    --gold-dim:rgba(47,86,115,.1); --gold-border:rgba(47,86,115,.2); --gold-glow:rgba(47,86,115,.28);
    --accent2:#7B2D5A; --text-primary:#1A2D3E; --text-secondary:#4A6170; --text-muted:#7A95A6;
    --grade-u:#D63031; --grade-p:#E17B00; --grade-m:#00897B; --grade-d:#4A4FBF;
    --info:#2F5673;
    --r-md:12px; --r-lg:16px; --r-xl:20px; --r-2xl:28px;
    --shadow-soft:0 8px 32px rgba(47,86,115,.08);
    font-family: 'Cairo','Segoe UI',Tahoma,Arial,sans-serif;
    color: var(--text-primary);
    background:
      radial-gradient(circle at 12% 8%, rgba(47,86,115,.08), transparent 45%),
      radial-gradient(circle at 88% 12%, rgba(123,45,90,.06), transparent 50%),
      linear-gradient(180deg, var(--bg-deep), #FFFFFF);
    min-height: 100vh;
    direction: rtl;
  }
  .asas-root[data-theme="dark"] {
    --bg-deep:#06101C; --bg-card:rgba(11,22,40,.92); --bg-card-hover:rgba(15,28,52,.97);
    --header-bg:rgba(6,16,28,.92); --bg-subtle:rgba(255,255,255,.03);
    --border-subtle:rgba(255,255,255,.06); --bg-input:rgba(255,255,255,.06);
    --gold:#C2951F; --gold-light:#D9AE38; --gold-pale:#EDCE72;
    --gold-dim:rgba(194,149,31,.12); --gold-border:rgba(194,149,31,.22); --gold-glow:rgba(194,149,31,.35);
    --accent2:#8B3568; --text-primary:#EDF3F8; --text-secondary:#8BA8BC; --text-muted:#58788E;
    --grade-u:#F56565; --grade-p:#F6AD55; --grade-m:#48BB78; --grade-d:#818CF8;
    --info:#63B3ED;
    background:
      radial-gradient(circle at 12% 8%, rgba(194,149,31,.08), transparent 45%),
      radial-gradient(circle at 88% 12%, rgba(139,53,104,.08), transparent 50%),
      linear-gradient(180deg, #06101C, #0C1928);
  }

  @keyframes asasPulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 6px var(--gold-dim),0 0 50px var(--gold-glow)} 50%{transform:scale(1.06);box-shadow:0 0 0 12px var(--gold-dim),0 0 70px var(--gold-glow)} }
  @keyframes asasEnter { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  .asas-page-enter { animation: asasEnter .45s ease both; }

  .asas-header { position: sticky; top:0; z-index:30; background: var(--header-bg); backdrop-filter: blur(14px); border-bottom:1px solid var(--border-subtle); }
  .asas-subheader { background: var(--header-bg); backdrop-filter: blur(14px); border-bottom:1px solid var(--border-subtle); }
  .asas-header-inner { max-width:1200px; margin:0 auto; padding:14px 20px; display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
  .asas-brand { display:flex; align-items:center; gap:12px; }
  .asas-logo { width:42px;height:42px;border-radius:50%;background:var(--gold-dim);border:1px solid var(--gold-border);display:grid;place-items:center;font-size:22px; }
  .asas-brand h1 { font-size:18px; font-weight:900; color:var(--text-primary); margin:0; }
  .asas-brand p { font-size:11px; color:var(--text-muted); margin:0; }
  .asas-breadcrumb { display:flex; align-items:center; gap:6px; flex:1; min-width:0; flex-wrap:wrap; font-size:12px; color: var(--text-secondary); }
  .asas-crumb { padding:4px 10px; border-radius:999px; background:var(--bg-subtle); border:1px solid var(--border-subtle); white-space:nowrap; }
  .asas-crumb.done { color:var(--grade-m); border-color:rgba(0,137,123,.3); background:rgba(0,137,123,.08); }
  .asas-crumb.active { color:var(--gold); border-color:var(--gold-border); background:var(--gold-dim); font-weight:700; }
  .asas-header-actions { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
  .asas-pill { display:inline-flex; align-items:center; gap:5px; padding:6px 13px; border-radius:999px; font-size:12px; font-weight:700; text-decoration:none; transition: all .2s; white-space: nowrap; }
  .asas-ig { background: rgba(225,48,108,.08); border:1px solid rgba(225,48,108,.25); color:#e1306c; }
  .asas-ig:hover { background: rgba(225,48,108,.18); border-color: rgba(225,48,108,.55); }
  .asas-wa { background: rgba(37,211,102,.08); border:1px solid rgba(37,211,102,.25); color:#25d366; }
  .asas-wa:hover { background: rgba(37,211,102,.18); border-color: rgba(37,211,102,.55); }
  .asas-theme, .asas-reset { background: var(--bg-card); border:1px solid var(--border-subtle); color:var(--text-primary); padding:7px 14px; border-radius:999px; cursor:pointer; font-family:inherit; font-size:13px; font-weight:700; transition: all .2s; }
  .asas-theme:hover, .asas-reset:hover { border-color: var(--gold-border); color: var(--gold); }

  .asas-main { max-width: 1100px; margin:0 auto; padding: 32px 20px 80px; }

  .asas-section-header { text-align:center; margin-bottom:28px; }
  .asas-eyebrow { display:inline-block; padding:5px 14px; border-radius:999px; background: var(--gold-dim); border:1px solid var(--gold-border); color:var(--gold); font-size:12px; font-weight:700; margin-bottom:12px; }
  .asas-title { font-size: clamp(22px, 4vw, 34px); font-weight: 900; color: var(--text-primary); margin: 0 0 8px; }
  .asas-title span { background: linear-gradient(90deg, var(--gold), var(--accent2)); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .asas-subtitle { color: var(--text-secondary); font-size: 14px; margin: 0; }

  .asas-stage-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:20px; max-width:780px; margin:0 auto; }
  .asas-stage-card { background: var(--bg-card); border:1px solid var(--border-subtle); border-radius: var(--r-2xl); padding: 28px 22px; text-align:center; cursor:pointer; transition: all .25s; box-shadow: var(--shadow-soft); display:flex; flex-direction:column; align-items:center; font-family:inherit; }
  .asas-stage-card:hover { transform: translateY(-4px); border-color: var(--gold-border); box-shadow: 0 16px 40px rgba(47,86,115,.14); }
  .asas-stage-name { font-size:20px; font-weight:800; color:var(--text-primary); margin-top:4px; }
  .asas-stage-desc { font-size:13px; color:var(--text-muted); margin-top:4px; }

  .asas-mode-card { display:flex; align-items:center; gap:20px; background: var(--bg-card); border:2px solid var(--border-subtle); border-radius: var(--r-xl); padding: 22px 26px; cursor:pointer; text-align:right; width:100%; transition: all .25s; font-family:inherit; }
  .asas-mode-card:hover { transform: translateY(-3px); }

  .asas-spec-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px; }
  .asas-spec-card { background: var(--bg-card); border:1px solid var(--border-subtle); border-radius: var(--r-xl); padding: 22px 18px; text-align:center; cursor:pointer; transition: all .25s; box-shadow: var(--shadow-soft); font-family:inherit; }
  .asas-spec-card:hover { transform: translateY(-3px); border-color: var(--gold-border); }
  .asas-spec-icon { font-size: 36px; display:block; margin-bottom: 8px; }
  .asas-spec-name { font-size:16px; font-weight:800; color:var(--text-primary); }
  .asas-spec-count { font-size:12px; color:var(--text-muted); margin-top:6px; line-height:1.6; }

  .asas-legend { display:flex; gap:14px; flex-wrap:wrap; justify-content:center; margin-bottom:18px; padding:12px; background:var(--bg-subtle); border-radius:var(--r-md); border:1px solid var(--border-subtle); font-size:12px; color: var(--text-muted); }
  .asas-legend-item { display:inline-flex; align-items:center; gap:6px; }
  .asas-legend-dot { width:10px; height:10px; border-radius:50%; }

  .asas-subjects-header { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:12px; }
  .asas-subjects-progress { display:flex; align-items:center; gap:10px; font-size:12px; color: var(--text-muted); }
  .asas-dots { display:inline-flex; gap:3px; }
  .asas-dot { width:7px; height:7px; border-radius:50%; background: var(--border-subtle); }
  .asas-dot.filled { background: var(--gold); box-shadow: 0 0 6px var(--gold-glow); }

  .asas-subject-list { display:flex; flex-direction:column; gap:10px; }
  .asas-subject-row { display:flex; align-items:center; justify-content:space-between; gap:14px; flex-wrap:wrap; padding: 14px 18px; background: var(--bg-card); border:1px solid var(--border-subtle); border-radius: var(--r-lg); transition: all .2s; animation: asasEnter .3s ease both; }
  .asas-subject-row.graded { border-color: var(--gold-border); }
  .asas-subject-info { flex:1; min-width: 220px; }
  .asas-subject-name { font-weight:700; color: var(--text-primary); font-size:14px; }
  .asas-hours-badge { display:inline-block; margin-top:4px; padding:2px 9px; font-size:11px; border-radius: 999px; background: var(--gold-dim); color: var(--gold); border:1px solid var(--gold-border); }
  .asas-grade-buttons { display:inline-flex; gap:6px; }
  .asas-grade-btn { width:42px; height:42px; border-radius: 12px; border:1.5px solid var(--border-subtle); background: var(--bg-subtle); font-weight:800; font-size:15px; cursor:pointer; color: var(--text-secondary); font-family:inherit; transition: all .2s; }
  .asas-grade-btn:hover { transform: translateY(-2px); }
  .asas-g-u.active, .asas-grade-btn.asas-g-u.active { background: var(--grade-u); color:#fff; border-color: var(--grade-u); box-shadow: 0 6px 16px rgba(214,48,49,.3); }
  .asas-g-p.active, .asas-grade-btn.asas-g-p.active { background: var(--grade-p); color:#fff; border-color: var(--grade-p); box-shadow: 0 6px 16px rgba(225,123,0,.3); }
  .asas-g-m.active, .asas-grade-btn.asas-g-m.active { background: var(--grade-m); color:#fff; border-color: var(--grade-m); box-shadow: 0 6px 16px rgba(0,137,123,.3); }
  .asas-g-d.active, .asas-grade-btn.asas-g-d.active { background: var(--grade-d); color:#fff; border-color: var(--grade-d); box-shadow: 0 6px 16px rgba(74,79,191,.3); }

  .asas-calc-btn { display:block; margin: 22px auto 0; padding: 14px 36px; min-width: 280px; border:none; border-radius: 999px; background: linear-gradient(90deg, var(--gold), var(--gold-light)); color: #fff; font-weight: 800; font-size: 15px; cursor:pointer; font-family:inherit; box-shadow: 0 10px 28px var(--gold-glow); transition: all .2s; }
  .asas-calc-btn:hover:not(:disabled) { transform: translateY(-2px); }
  .asas-calc-btn:disabled { opacity:.55; cursor:not-allowed; box-shadow:none; background: var(--bg-subtle); color: var(--text-muted); }

  .asas-back, .asas-restart, .asas-print { background: var(--bg-card); border:1px solid var(--border-subtle); color: var(--text-primary); padding: 10px 22px; border-radius: 999px; font-family:inherit; font-weight:700; font-size:13px; cursor:pointer; transition: all .2s; }
  .asas-back:hover { border-color: var(--gold-border); color: var(--gold); transform: translateY(-2px); }
  .asas-restart { background: linear-gradient(90deg, var(--gold), var(--gold-light)); color:#fff; border:none; box-shadow: 0 6px 18px var(--gold-glow); }
  .asas-restart:hover { transform: translateY(-2px); }
  .asas-print { }

  .asas-q-card { background: var(--bg-card); border:1px solid var(--border-subtle); border-radius: var(--r-2xl); padding: 32px; max-width: 560px; text-align:center; box-shadow: var(--shadow-soft); }
  .asas-btn-yes { background: linear-gradient(90deg, var(--grade-m), #38a89c); color:#fff; border:none; padding: 12px 26px; border-radius:999px; font-weight:800; cursor:pointer; font-family:inherit; }
  .asas-btn-no { background: var(--bg-subtle); border:1px solid var(--border-subtle); color: var(--text-secondary); padding: 12px 26px; border-radius:999px; font-weight:700; cursor:pointer; font-family:inherit; }

  .asas-shared-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px; }
  .asas-shared-card { background: var(--bg-card); border:1px solid var(--border-subtle); border-radius: var(--r-lg); padding: 18px; }
  .asas-shared-name { font-weight:800; color: var(--text-primary); margin-bottom:4px; }
  .asas-shared-max { font-size:12px; color: var(--text-muted); margin-bottom:10px; }
  .asas-shared-input { width:100%; padding:10px 14px; border-radius: 12px; border:1.5px solid var(--border-subtle); background: var(--bg-input); color: var(--text-primary); font-family: inherit; font-size: 16px; font-weight:700; text-align:center; }
  .asas-shared-input:focus { outline:none; border-color: var(--gold); box-shadow: 0 0 0 3px var(--gold-dim); }
  .asas-shared-input.valid { border-color: var(--grade-m); }
  .asas-shared-input.invalid { border-color: var(--grade-u); }
  .asas-shared-err { font-size:11px; color: var(--grade-u); margin-top: 6px; }

  .asas-result-card { background: var(--bg-card); border:2px solid var(--gold-border); border-radius: var(--r-2xl); padding: 36px 28px; text-align:center; box-shadow: 0 16px 50px var(--gold-glow); margin-bottom: 24px; }
  .asas-result-big { font-size: clamp(40px, 8vw, 64px); font-weight: 900; color: var(--gold); line-height:1; }
  .asas-result-big span { font-size: .45em; color: var(--text-muted); font-weight:700; }
  .asas-result-percent { font-size: 22px; color: var(--text-secondary); font-weight:800; margin: 6px 0 14px; }
  .asas-result-grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px; margin-top: 22px; }
  .asas-stat { background: var(--bg-subtle); border:1px solid var(--border-subtle); border-radius: var(--r-md); padding: 12px; }
  .asas-stat-label { font-size: 11px; color: var(--text-muted); margin-bottom: 4px; }
  .asas-stat-value { font-size: 16px; font-weight: 800; color: var(--text-primary); }

  .asas-breakdown { background: var(--bg-card); border:1px solid var(--border-subtle); border-radius: var(--r-xl); padding: 22px; margin-bottom: 18px; box-shadow: var(--shadow-soft); }
  .asas-breakdown h3 { font-size: 16px; font-weight: 800; color: var(--text-primary); margin: 0 0 14px; }
  .asas-table-wrap { overflow-x: auto; }
  .asas-breakdown table { width:100%; border-collapse: collapse; font-size: 13px; }
  .asas-breakdown th, .asas-breakdown td { padding: 10px 12px; text-align: start; border-bottom: 1px solid var(--border-subtle); color: var(--text-primary); }
  .asas-breakdown th { color: var(--text-muted); font-weight:700; background: var(--bg-subtle); font-size:12px; }
  .asas-chip { display:inline-block; min-width:30px; padding: 2px 10px; border-radius: 999px; font-weight: 800; font-size: 12px; color:#fff; }
  .asas-chip.asas-g-u { background: var(--grade-u); }
  .asas-chip.asas-g-p { background: var(--grade-p); }
  .asas-chip.asas-g-m { background: var(--grade-m); }
  .asas-chip.asas-g-d { background: var(--grade-d); }

  .asas-actions { display:flex; gap:12px; justify-content:center; margin-top: 24px; flex-wrap:wrap; }
  .asas-add-shared { background: linear-gradient(90deg, var(--grade-m), #38a89c); color:#fff; border:none; padding: 10px 22px; border-radius: 999px; font-family:inherit; font-weight:800; font-size:13px; cursor:pointer; box-shadow: 0 6px 18px rgba(0,137,123,.3); transition: all .2s; }
  .asas-add-shared:hover { transform: translateY(-2px); }

  .asas-formula { background: var(--bg-card); border:1px dashed var(--gold-border); border-radius: var(--r-xl); padding: 22px; margin-bottom: 18px; box-shadow: var(--shadow-soft); }
  .asas-formula h3 { font-size: 16px; font-weight: 800; color: var(--gold); margin: 0 0 14px; }
  .asas-formula-body { display:flex; flex-direction:column; gap:10px; }
  .asas-formula-line { display:flex; gap:10px; flex-wrap:wrap; align-items:center; padding: 8px 12px; background: var(--bg-subtle); border-radius: var(--r-md); font-size: 13px; color: var(--text-primary); }
  .asas-formula-label { font-weight: 800; color: var(--gold); min-width: 160px; }

  @media (max-width: 560px) {
    .asas-stage-grid, .asas-spec-grid, .asas-result-grid, .asas-shared-grid { grid-template-columns: 1fr !important; }
    .asas-header-inner { padding: 12px; }
    .asas-breadcrumb { order: 3; width: 100%; }
  }

  @media print {
    .asas-header, .asas-actions, .no-print { display:none !important; }
    .asas-root { background: #fff !important; }
    .asas-main { padding: 0; }
    .asas-result-card { box-shadow: none; border:1px solid #999; }
    .asas-breakdown { box-shadow:none; border:1px solid #ccc; page-break-inside: avoid; }
  }
  `;
  const tag = document.createElement("style");
  tag.id = "asas-styles";
  tag.textContent = css;
  document.head.appendChild(tag);
}
