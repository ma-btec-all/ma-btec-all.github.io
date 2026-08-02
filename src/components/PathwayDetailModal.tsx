import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  BookOpen,
  ExternalLink,
  HelpCircle,
  FileText,
  Table as TableIcon,
  Wrench,
  Award,
  Info,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { btecPathwayDetails, MOHE_PDF_URL } from "@/data/btecPathwayDetails";

interface Props {
  open: boolean;
  onClose: () => void;
  pathway: {
    id: string;
    titleAr: string;
    titleEn: string;
    accentHsl: string;
    icon: LucideIcon;
  } | null;
}

const SectionTitle = ({
  icon: Icon,
  children,
  accent,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
  accent: string;
}) => (
  <div className="flex items-center gap-2 mb-4">
    <div
      className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: `hsl(${accent} / 0.16)` }}
    >
      <Icon className="h-5 w-5" style={{ color: `hsl(${accent})` }} />
    </div>
    <h3
      className="text-lg sm:text-xl font-black text-foreground"
      style={{ fontFamily: "Cairo, sans-serif" }}
    >
      {children}
    </h3>
  </div>
);

const CurriculumTableView = ({
  table,
  accent,
}: {
  table: { title: string; rows: { code: string; name: string; ghl: string; type: string }[] };
  accent: string;
}) => (
  <div
    className="rounded-2xl border overflow-hidden mb-6"
    style={{
      borderColor: `hsl(${accent} / 0.28)`,
      background: "rgba(255,255,255,0.03)",
      boxShadow: `0 0 0 1px hsl(${accent} / 0.05), 0 8px 24px hsl(${accent} / 0.08)`,
    }}
  >
    <div
      className="px-4 py-3 text-sm sm:text-base font-black text-foreground border-b"
      style={{
        background: `linear-gradient(90deg, hsl(${accent} / 0.18), hsl(${accent} / 0.04))`,
        borderColor: `hsl(${accent} / 0.22)`,
      }}
    >
      {table.title}
    </div>

    {/* Mobile: stacked cards */}
    <div className="md:hidden divide-y" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      {table.rows.map((r, i) => (
        <div key={i} className="p-3 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-[11px] font-bold rounded-md px-2 py-0.5"
              style={{
                background: `hsl(${accent} / 0.18)`,
                color: `hsl(${accent})`,
              }}
            >
              وحدة #{r.code}
            </span>
            <span
              className="text-[11px] font-bold rounded-md px-2 py-0.5 border"
              style={{
                borderColor: "rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {r.type}
            </span>
          </div>
          <div className="text-sm font-bold text-foreground leading-7">{r.name}</div>
          <div className="text-[11px] text-muted-foreground">
            ساعات التعلم الموجه (GHL): <span className="font-black text-foreground">{r.ghl}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Desktop: table */}
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-sm" dir="rtl">
        <thead>
          <tr
            className="text-right"
            style={{
              background: `hsl(${accent} / 0.08)`,
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <th className="px-3 py-2 font-black w-20">رقم الوحدة</th>
            <th className="px-3 py-2 font-black">اسم الوحدة</th>
            <th className="px-3 py-2 font-black w-32 text-center">ساعات (GHL)</th>
            <th className="px-3 py-2 font-black w-40">نوع الواجب</th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r, i) => (
            <tr
              key={i}
              className="border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <td className="px-3 py-2 align-top">
                <span
                  className="inline-block text-xs font-black rounded-md px-2 py-0.5"
                  style={{
                    background: `hsl(${accent} / 0.16)`,
                    color: `hsl(${accent})`,
                  }}
                >
                  {r.code}
                </span>
              </td>
              <td className="px-3 py-2 text-foreground leading-7">{r.name}</td>
              <td className="px-3 py-2 text-center font-black text-foreground">{r.ghl}</td>
              <td className="px-3 py-2 text-muted-foreground text-xs">{r.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PathwayDetailModal = ({ open, onClose, pathway }: Props) => {
  if (!pathway) return null;
  const detail = btecPathwayDetails[pathway.id];
  const accent = pathway.accentHsl;
  const Icon = pathway.icon;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          dir="rtl"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            background: `radial-gradient(circle at 20% 20%, hsl(${accent} / 0.18), transparent 45%), rgba(0,0,0,0.78)`,
            backdropFilter: "blur(12px)",
            fontFamily: "Cairo, sans-serif",
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-[28px] border backdrop-blur-2xl flex flex-col"
            style={{
              background: "rgba(10, 14, 28, 0.72)",
              borderColor: `hsl(${accent} / 0.32)`,
              boxShadow: `0 24px 80px rgba(0,0,0,0.55), 0 0 40px hsl(${accent} / 0.18)`,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between gap-3 p-4 sm:p-5 border-b shrink-0"
              style={{ borderColor: "rgba(255,255,255,0.10)" }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: `hsl(${accent} / 0.18)` }}
                >
                  <Icon className="h-6 w-6" style={{ color: `hsl(${accent})` }} />
                </div>
                <div className="min-w-0">
                  <div className="text-base sm:text-xl font-black text-foreground truncate">
                    تخصص {pathway.titleAr}
                  </div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground truncate">
                    {pathway.titleEn}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق"
                className="h-10 w-10 rounded-xl border flex items-center justify-center transition-all hover:scale-105 shrink-0"
                style={{
                  borderColor: "rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <X className="h-5 w-5 text-slate-100/90" />
              </button>
            </div>

            {/* Body — single continuous scroll */}
            <div
              className="overflow-y-auto p-4 sm:p-6 space-y-10"
              style={{ WebkitOverflowScrolling: "touch", scrollBehavior: "smooth" }}
            >
              {detail ? (
                <>
                  {/* Why choose */}
                  <section>
                    <SectionTitle icon={Sparkles} accent={accent}>
                      لماذا أختار هذا التخصص؟
                    </SectionTitle>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {detail.whyChoose.map((item) => (
                        <div
                          key={item.title}
                          className="rounded-2xl border p-4"
                          style={{
                            borderColor: `hsl(${accent} / 0.20)`,
                            background: "rgba(255,255,255,0.03)",
                          }}
                        >
                          <div className="text-sm font-black text-foreground mb-1">
                            {item.title}
                          </div>
                          <p className="text-xs text-muted-foreground leading-6">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Self-assessment */}
                  <section>
                    <SectionTitle icon={HelpCircle} accent={accent}>
                      كيف أعرف أنه يناسبني؟
                    </SectionTitle>
                    <ul className="space-y-2">
                      {detail.selfAssessment.map((q) => (
                        <li
                          key={q}
                          className="flex items-start gap-3 rounded-xl border p-3"
                          style={{
                            borderColor: "rgba(255,255,255,0.10)",
                            background: "rgba(255,255,255,0.03)",
                          }}
                        >
                          <CheckCircle2
                            className="h-5 w-5 mt-0.5 shrink-0"
                            style={{ color: `hsl(${accent})` }}
                          />
                          <span className="text-sm text-foreground/90 leading-7">{q}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Intro paragraphs */}
                  {detail.intro && detail.intro.length > 0 && (
                    <section>
                      <SectionTitle icon={FileText} accent={accent}>
                        مقدمة عن المسار
                      </SectionTitle>
                      <div
                        className="rounded-2xl border p-4 sm:p-5 space-y-4"
                        style={{
                          borderColor: `hsl(${accent} / 0.22)`,
                          background: "rgba(255,255,255,0.03)",
                        }}
                      >
                        {detail.intro.map((p, i) => (
                          <p
                            key={i}
                            className="text-sm text-foreground/90 leading-8"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Curriculum tables */}
                  {detail.curriculum && (detail.curriculum.level2 || detail.curriculum.level3) && (
                    <section>
                      <SectionTitle icon={TableIcon} accent={accent}>
                        المناهج والجداول الدراسية
                      </SectionTitle>
                      {detail.curriculum.level2 && (
                        <CurriculumTableView table={detail.curriculum.level2} accent={accent} />
                      )}
                      {detail.curriculum.level3 && (
                        <CurriculumTableView table={detail.curriculum.level3} accent={accent} />
                      )}
                    </section>
                  )}

                  {/* Acquired skills */}
                  {(detail.skillsGroups && detail.skillsGroups.length > 0) || detail.learn.length > 0 ? (
                    <section>
                      <SectionTitle icon={Wrench} accent={accent}>
                        المهارات التقنية والمهنية المكتسبة
                      </SectionTitle>
                      {detail.skillsGroups && detail.skillsGroups.length > 0 ? (
                        <div className="space-y-5">
                          {detail.skillsGroups.map((g, gi) => (
                            <div key={gi}>
                              {g.title && (
                                <div
                                  className="text-sm font-black mb-2"
                                  style={{ color: `hsl(${accent})` }}
                                >
                                  {g.title}
                                </div>
                              )}
                              <div className="flex flex-wrap gap-2">
                                {g.items.map((t) => (
                                  <span
                                    key={t}
                                    className="rounded-full border px-3 py-1.5 text-xs font-bold"
                                    style={{
                                      borderColor: `hsl(${accent} / 0.32)`,
                                      background: `hsl(${accent} / 0.10)`,
                                      color: `hsl(${accent})`,
                                    }}
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {detail.learn.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border px-3 py-1.5 text-xs font-bold"
                              style={{
                                borderColor: `hsl(${accent} / 0.32)`,
                                background: `hsl(${accent} / 0.10)`,
                                color: `hsl(${accent})`,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </section>
                  ) : null}

                  {/* Career opportunities */}
                  {(detail.careersGroups && detail.careersGroups.length > 0) || detail.careers.length > 0 ? (
                    <section>
                      <SectionTitle icon={Briefcase} accent={accent}>
                        مجالات العمل في السوق المحلية والعالمية
                      </SectionTitle>
                      {detail.careersIntro && (
                        <p className="text-sm text-foreground/85 leading-8 mb-4">
                          {detail.careersIntro}
                        </p>
                      )}
                      {detail.careersGroups && detail.careersGroups.length > 0 ? (
                        <div className="space-y-5">
                          {detail.careersGroups.map((g, gi) => (
                            <div key={gi}>
                              {g.title && (
                                <div
                                  className="text-sm font-black mb-2"
                                  style={{ color: `hsl(${accent})` }}
                                >
                                  {g.title}
                                </div>
                              )}
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                {g.items.map((c) => (
                                  <div
                                    key={c}
                                    className="rounded-xl border p-3 text-sm text-foreground/90 leading-7"
                                    style={{
                                      borderColor: "rgba(255,255,255,0.10)",
                                      background: "rgba(255,255,255,0.03)",
                                    }}
                                  >
                                    • {c}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {detail.careers.map((c) => (
                            <div
                              key={c}
                              className="rounded-xl border p-3 text-sm text-foreground/90"
                              style={{
                                borderColor: "rgba(255,255,255,0.10)",
                                background: "rgba(255,255,255,0.03)",
                              }}
                            >
                              • {c}
                            </div>
                          ))}
                        </div>
                      )}
                      {detail.careersOutro && (
                        <p className="text-sm text-foreground/85 leading-8 mt-4">
                          {detail.careersOutro}
                        </p>
                      )}
                    </section>
                  ) : null}

                  {/* Certificates */}
                  {detail.certificates && detail.certificates.length > 0 && (
                    <section>
                      <SectionTitle icon={Award} accent={accent}>
                        الشهادات المعتمدة المحلية والعالمية
                      </SectionTitle>
                      <ul className="space-y-2">
                        {detail.certificates.map((c) => (
                          <li
                            key={c}
                            className="flex items-start gap-3 rounded-xl border p-3"
                            style={{
                              borderColor: `hsl(${accent} / 0.18)`,
                              background: "rgba(255,255,255,0.03)",
                            }}
                          >
                            <CheckCircle2
                              className="h-5 w-5 mt-0.5 shrink-0"
                              style={{ color: `hsl(${accent})` }}
                            />
                            <span className="text-sm text-foreground/90 leading-7">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* MOHE centered CTA */}
                  {(detail.intro || detail.curriculum || detail.importantInfo) && (
                    <section>
                      <SectionTitle icon={GraduationCap} accent={accent}>
                        مجالات الدراسة المحلية والعالمية
                      </SectionTitle>
                      <div className="flex justify-center">
                        <motion.a
                          whileHover={{ scale: 1.04, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          href={MOHE_PDF_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-black border"
                          style={{
                            background: `linear-gradient(135deg, hsl(${accent} / 0.18), hsl(${accent} / 0.06))`,
                            borderColor: `hsl(${accent} / 0.45)`,
                            color: `hsl(${accent})`,
                            boxShadow: `0 0 24px hsl(${accent} / 0.28)`,
                          }}
                        >
                          رابط إلكتروني من وزارة التعليم العالي
                          <ExternalLink className="h-4 w-4" />
                        </motion.a>
                      </div>
                    </section>
                  )}

                  {/* Important info */}
                  {detail.importantInfo && detail.importantInfo.length > 0 ? (
                    <section>
                      <SectionTitle icon={Info} accent={accent}>
                        معلومات مهمة
                      </SectionTitle>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {detail.importantInfo.map((info) => (
                          <div
                            key={info.title}
                            className="rounded-2xl border p-4"
                            style={{
                              borderColor: `hsl(${accent} / 0.25)`,
                              background: `linear-gradient(180deg, hsl(${accent} / 0.08), rgba(255,255,255,0.02))`,
                              boxShadow: `0 0 0 1px hsl(${accent} / 0.05)`,
                            }}
                          >
                            <div className="text-sm font-black text-foreground mb-2">
                              {info.title}
                            </div>
                            <p className="text-xs text-muted-foreground leading-7">
                              {info.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : (detail.academic.withExam || detail.academic.withoutExam) ? (
                    <section>
                      <SectionTitle icon={GraduationCap} accent={accent}>
                        الدراسة الجامعية
                      </SectionTitle>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div
                          className="rounded-2xl border p-4"
                          style={{
                            borderColor: `hsl(${accent} / 0.25)`,
                            background: `hsl(${accent} / 0.06)`,
                          }}
                        >
                          <div className="text-sm font-black text-foreground mb-2">
                            مع الامتحان الوزاري
                          </div>
                          <p className="text-xs text-muted-foreground leading-6">
                            {detail.academic.withExam}
                          </p>
                        </div>
                        <div
                          className="rounded-2xl border p-4"
                          style={{
                            borderColor: "rgba(255,255,255,0.12)",
                            background: "rgba(255,255,255,0.03)",
                          }}
                        >
                          <div className="text-sm font-black text-foreground mb-2">
                            بدون الامتحان الوزاري
                          </div>
                          <p className="text-xs text-muted-foreground leading-6">
                            {detail.academic.withoutExam}
                          </p>
                        </div>
                      </div>
                    </section>
                  ) : null}
                </>
              ) : (
                <div
                  className="rounded-2xl border p-8 text-center"
                  style={{
                    borderColor: `hsl(${accent} / 0.25)`,
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <Sparkles
                    className="h-10 w-10 mx-auto mb-3"
                    style={{ color: `hsl(${accent})` }}
                  />
                  <div className="text-lg font-black text-foreground mb-2">
                    التفاصيل الكاملة قيد التحديث
                  </div>
                  <p className="text-sm text-muted-foreground leading-7 max-w-md mx-auto">
                    نعمل على توفير محتوى تفصيلي لهذا التخصص قريبًا. في غضون ذلك، يمكنك الاطلاع على
                    قائمة التخصصات الرسمية المعتمدة من وزارة التعليم العالي.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="p-4 sm:p-5 border-t shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
              style={{ borderColor: "rgba(255,255,255,0.10)" }}
            >
              <div className="text-xs text-muted-foreground">
                المصدر: وزارة التعليم العالي والبحث العلمي — الأردن
              </div>
              <motion.a
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                href={MOHE_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black"
                style={{
                  background: `linear-gradient(135deg, hsl(${accent} / 0.95), hsl(${accent} / 0.65))`,
                  color: "#0a0e1c",
                  boxShadow: `0 10px 30px hsl(${accent} / 0.35)`,
                }}
              >
                عرض التخصصات المتاحة
                <ExternalLink className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PathwayDetailModal;
