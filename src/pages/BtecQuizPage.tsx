import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, ArrowLeft, AlertTriangle } from "lucide-react";
import { departments } from "@/data/departments";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuizEngine from "@/components/QuizEngine";
import { Button } from "@/components/ui/button";
import { getBtecQuestions } from "@/data/btecQuizzes";

const QUIZ_COUNT = 40;
const TIMER_MINUTES = 15;

const BtecQuizPage = () => {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const dept = departments.find((d) => d.id === selectedDept);
  const questions = useMemo(
    () => (selectedDept ? getBtecQuestions(selectedDept) : []),
    [selectedDept],
  );

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      <div className="page-safe-top pb-16 px-4 max-w-7xl mx-auto" style={{ fontFamily: "Cairo, sans-serif" }}>
        {!selectedDept ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-5xl font-black mb-4">
                <span className="gradient-text">اختبارات</span> BTEC
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                اختر تخصصك لبدء اختبار من {QUIZ_COUNT} سؤال خلال {TIMER_MINUTES} دقيقة
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {departments.map((d, i) => {
                const Icon = d.icon;
                const total = getBtecQuestions(d.id).length;
                const available = total > 0;
                return (
                  <motion.div
                    key={d.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative rounded-2xl border border-border/50 bg-card/60 backdrop-blur-md p-6 flex flex-col transition-all hover:border-primary/50 hover:-translate-y-1"
                    style={{
                      boxShadow: `0 0 0 0 hsl(${d.color} / 0)`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 10px 40px -10px hsl(${d.color} / 0.45)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                        style={{
                          background: `hsl(${d.color} / 0.15)`,
                          boxShadow: `0 0 20px hsl(${d.color} / 0.2)`,
                        }}
                      >
                        <Icon className="w-7 h-7" style={{ color: `hsl(${d.color})` }} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-foreground truncate">{d.name}</h3>
                        <p className="text-xs text-muted-foreground truncate">{d.nameEn}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                      {d.description}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{available ? `${QUIZ_COUNT} سؤال` : "غير متوفر"}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{TIMER_MINUTES} دقيقة</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => available && setSelectedDept(d.id)}
                        disabled={!available}
                        className="w-full font-bold text-white border-0 disabled:opacity-50"
                        style={
                          available
                            ? {
                                background: `linear-gradient(135deg, hsl(${d.color}), hsl(${d.color} / 0.7))`,
                              }
                            : {}
                        }
                      >
                        {available ? "ابدأ الاختبار" : "قريباً"}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        ) : dept ? (
          questions.length === 0 ? (
            <div className="max-w-xl mx-auto glass-card p-8 text-center">
              <AlertTriangle className="w-12 h-12 mx-auto text-amber-400 mb-4" />
              <h2 className="text-xl font-bold mb-2">لا توجد أسئلة لهذا التخصص حالياً</h2>
              <p className="text-muted-foreground mb-6">سيتم إضافة بنك أسئلة {dept.name} قريباً.</p>
              <Button onClick={() => setSelectedDept(null)} variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> العودة للتخصصات
              </Button>
            </div>
          ) : (
            <QuizEngine
              questions={questions}
              title={`اختبار ${dept.name}`}
              onBack={() => setSelectedDept(null)}
              quizCount={Math.min(QUIZ_COUNT, questions.length)}
              timerMinutes={TIMER_MINUTES}
              departmentId={dept.id}
              specialtyName={dept.name}
            />
          )
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default BtecQuizPage;
