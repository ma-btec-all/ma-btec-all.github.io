import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Home, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { QuizQuestion } from "@/data/cultureQuizzes";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface QuizEngineProps {
  questions: QuizQuestion[];
  title: string;
  onBack: () => void;
  quizCount?: number;
  timerMinutes?: number;
  departmentId?: string;
  specialtyName?: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QuizEngine = ({ questions, title, onBack, quizCount = 20, timerMinutes = 30, departmentId, specialtyName }: QuizEngineProps) => {
  const [quizQuestions] = useState(() => shuffleArray(questions).slice(0, quizCount));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(() => new Array(quizCount).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerMinutes * 60);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const startTimeRef = useRef<number>(Date.now());
  const loggedRef = useRef(false);
  const { user } = useAuth();

  const current = quizQuestions[currentIndex];
  const progress = ((currentIndex + 1) / quizQuestions.length) * 100;

  useEffect(() => {
    if (!showResult && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && !showResult) {
      setShowResult(true);
    }
    return () => clearInterval(intervalRef.current);
  }, [showResult, timeLeft]);

  const handleSelect = useCallback((option: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = option;
      return next;
    });
  }, [currentIndex]);

  const handleFinish = () => {
    clearInterval(intervalRef.current);
    setShowResult(true);
  };

  const score = quizQuestions.reduce((acc, q, i) => acc + (answers[i] === q.answer ? 1 : 0), 0);
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const now = new Date();
  const dateStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;

  // Persist quiz attempt once when results are shown
  useEffect(() => {
    if (!showResult || loggedRef.current || !user || !departmentId) return;
    loggedRef.current = true;
    const total = quizQuestions.length;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const duration = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
    supabase
      .from("quiz_attempts")
      .insert({
        user_id: user.id,
        department_id: departmentId,
        specialty_name: specialtyName || title,
        total_questions: total,
        correct_answers: score,
        score_percentage: pct,
        duration_seconds: duration,
      })
      .then(() => {});
  }, [showResult, user, departmentId, specialtyName, title, score, quizQuestions.length]);

  if (showResult) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: percentage >= 50 ? "hsl(142 70% 45% / 0.15)" : "hsl(0 75% 55% / 0.15)" }}>
          {percentage >= 50 ? <CheckCircle2 className="w-12 h-12 text-green-500" /> : <XCircle className="w-12 h-12 text-destructive" />}
        </div>
        <h2 className="text-2xl font-black mb-2">{percentage >= 50 ? "أحسنت! 🎉" : "حاول مرة أخرى 💪"}</h2>
        <p className="text-muted-foreground mb-6">{title} - {dateStr}</p>
        <div className="text-5xl font-black gradient-text mb-2">{score}/{quizQuestions.length}</div>
        <p className="text-lg text-muted-foreground mb-8">{percentage}%</p>

        <div className="space-y-3 mb-8 text-right max-h-[28rem] overflow-y-auto pr-2">
          {quizQuestions.map((q, i) => {
            const userAns = answers[i];
            const correct = userAns === q.answer;
            return (
              <div
                key={i}
                className={`p-4 rounded-lg border ${
                  correct ? "border-green-500/40 bg-green-500/10" : "border-destructive/40 bg-destructive/10"
                }`}
              >
                <p className="text-sm font-bold mb-2 leading-relaxed">
                  {i + 1}. {q.question}
                </p>
                <p className="text-xs mb-1">
                  إجابتك:{" "}
                  <span className={correct ? "text-green-500 font-semibold" : "text-destructive font-semibold"}>
                    {userAns || "لم تُجب"}
                  </span>
                </p>
                {!correct && (
                  <p className="text-xs">
                    الإجابة الصحيحة: <span className="text-green-500 font-semibold">{q.answer}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-3">
          <Button onClick={onBack} className="gap-2" style={{ background: "var(--gradient-primary)" }}>
            <Home className="w-4 h-4" /> العودة
          </Button>
          <Button onClick={() => window.location.reload()} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" /> إعادة الاختبار
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="glass-card p-4 mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold truncate">{title}</h3>
        <div className="flex items-center gap-2 text-sm font-mono shrink-0">
          <Clock className="w-4 h-4 text-primary" />
          <span className={timeLeft < 60 ? "text-destructive animate-pulse" : "text-foreground"}>
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>السؤال {currentIndex + 1} من {quizQuestions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="glass-card p-6 mb-4"
        >
          <p className="text-lg font-bold mb-6 leading-relaxed">{current.question}</p>
          <div className="space-y-3">
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                className={`w-full text-right p-4 rounded-xl border transition-all text-sm font-medium ${
                  answers[currentIndex] === opt
                    ? "border-primary bg-primary/10 text-primary glow-border"
                    : "border-border/50 bg-secondary/30 hover:bg-secondary/60 text-foreground"
                }`}
              >
                <span className="inline-flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    answers[currentIndex] === opt ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}>
                    {String.fromCharCode(1571 + i)}
                  </span>
                  {opt}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setCurrentIndex((i) => i - 1)}
          disabled={currentIndex === 0}
          className="gap-2"
        >
          السابق <ChevronRight className="w-4 h-4" />
        </Button>

        {currentIndex === quizQuestions.length - 1 ? (
          <Button onClick={handleFinish} className="gap-2" style={{ background: "var(--gradient-primary)" }}>
            إنهاء الاختبار
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="gap-2"
            style={{ background: "var(--gradient-primary)" }}
          >
            <ChevronLeft className="w-4 h-4" /> التالي
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizEngine;
