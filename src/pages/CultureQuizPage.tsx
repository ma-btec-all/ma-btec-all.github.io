import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Landmark, PenTool, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuizEngine from "@/components/QuizEngine";
import { cultureSubjects } from "@/data/cultureQuizzes";

const iconMap: Record<string, typeof BookOpen> = {
  BookOpen, Landmark, PenTool, Globe,
};

const CultureQuizPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const subject = cultureSubjects.find((s) => s.id === selectedSubject);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      <div className="page-safe-top pb-16 px-4 max-w-5xl mx-auto">
        {!selectedSubject ? (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-black mb-4">
                <span className="gradient-text">اختبارات الثقافات</span> جيل 2008/2009
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">اختر المادة وابدأ الاختبار - 20 سؤال عشوائي من 40 سؤال</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {cultureSubjects.map((subj, i) => {
                const Icon = iconMap[subj.icon] || BookOpen;
                return (
                  <motion.div
                    key={subj.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card group p-6 flex flex-col"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ background: `hsl(${subj.color} / 0.15)` }}
                      >
                        <Icon className="w-7 h-7" style={{ color: `hsl(${subj.color})` }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{subj.name}</h3>
                        <p className="text-xs text-muted-foreground">{subj.nameEn}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{subj.questions.length} سؤال متاح</p>
                    <button
                      onClick={() => setSelectedSubject(subj.id)}
                      className="mt-auto w-full py-2.5 rounded-lg font-bold text-white transition-all hover:brightness-110 active:scale-[0.98]"
                      style={{ background: `hsl(${subj.color})` }}
                    >
                      عرض الاختبار
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </>
        ) : subject ? (
          <QuizEngine
            questions={subject.questions}
            title={subject.name}
            onBack={() => setSelectedSubject(null)}
            quizCount={20}
            timerMinutes={30}
          />
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default CultureQuizPage;
