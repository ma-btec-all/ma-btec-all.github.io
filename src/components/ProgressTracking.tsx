import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Target, Award, Clock, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { departments } from "@/data/departments";
import { getBtecQuestionCount } from "@/data/btecQuizzes";

interface Attempt {
  id: string;
  department_id: string;
  specialty_name: string;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  duration_seconds: number;
  created_at: string;
}

const HEATMAP_DAYS = 84; // 12 weeks

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

const ProgressTracking = () => {
  const { user } = useAuth();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("quiz_attempts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(500)
      .then(({ data }) => {
        setAttempts((data as Attempt[]) || []);
        setLoading(false);
      });
  }, [user]);

  const stats = useMemo(() => {
    const totalQ = attempts.reduce((s, a) => s + a.total_questions, 0);
    const avg = attempts.length
      ? Math.round(attempts.reduce((s, a) => s + a.score_percentage, 0) / attempts.length)
      : 0;
    const totalSec = attempts.reduce((s, a) => s + a.duration_seconds, 0);
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    return {
      totalQ,
      avg,
      timeStr: hours > 0 ? `${hours}س ${mins}د` : `${mins} دقيقة`,
    };
  }, [attempts]);

  // Per-department aggregation
  const deptStats = useMemo(() => {
    const map = new Map<string, { attempts: number; correct: number; total: number; best: number }>();
    for (const a of attempts) {
      const cur = map.get(a.department_id) || { attempts: 0, correct: 0, total: 0, best: 0 };
      cur.attempts += 1;
      cur.correct += a.correct_answers;
      cur.total += a.total_questions;
      cur.best = Math.max(cur.best, a.score_percentage);
      map.set(a.department_id, cur);
    }
    return departments.map((d) => {
      const s = map.get(d.id);
      const bankSize = getBtecQuestionCount(d.id);
      const coveragePct = s && bankSize > 0
        ? Math.min(100, Math.round((s.total / bankSize) * 100))
        : 0;
      return {
        dept: d,
        attempts: s?.attempts || 0,
        avg: s && s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
        best: s?.best || 0,
        coveragePct,
        bankSize,
      };
    });
  }, [attempts]);

  // Heatmap data
  const heatmap = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of attempts) {
      const k = dayKey(new Date(a.created_at));
      counts.set(k, (counts.get(k) || 0) + 1);
    }
    const days: { key: string; date: Date; count: number }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = HEATMAP_DAYS - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const k = dayKey(d);
      days.push({ key: k, date: d, count: counts.get(k) || 0 });
    }
    return days;
  }, [attempts]);

  const heatColor = (c: number) => {
    if (c === 0) return "hsl(var(--secondary) / 0.4)";
    if (c === 1) return "hsl(var(--primary) / 0.35)";
    if (c === 2) return "hsl(var(--primary) / 0.6)";
    if (c <= 4) return "hsl(var(--primary) / 0.8)";
    return "hsl(var(--primary))";
  };

  return (
    <div className="space-y-6" dir="rtl" style={{ fontFamily: "Cairo, sans-serif" }}>
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Target, label: "الأسئلة المحلولة", value: stats.totalQ.toString(), bg: "var(--gradient-primary)" },
          { icon: Award, label: "متوسط الدرجات", value: `${stats.avg}%`, bg: "var(--gradient-accent)" },
          { icon: Clock, label: "وقت الدراسة", value: stats.timeStr, bg: "var(--gradient-warm)" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: s.bg }}
              >
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-black text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="text-lg font-bold">نشاط الدراسة (آخر 12 أسبوع)</h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>أقل</span>
            {[0, 1, 2, 4, 6].map((c) => (
              <span
                key={c}
                className="w-3 h-3 rounded-sm"
                style={{ background: heatColor(c) }}
              />
            ))}
            <span>أكثر</span>
          </div>
        </div>
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))", direction: "ltr" }}
        >
          {/* Render columns of 7 days = weeks */}
          {Array.from({ length: 12 }).map((_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {heatmap.slice(weekIdx * 7, weekIdx * 7 + 7).map((d) => (
                <div
                  key={d.key}
                  title={`${d.key} — ${d.count} اختبار`}
                  className="aspect-square rounded-sm transition-transform hover:scale-125"
                  style={{ background: heatColor(d.count) }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Per-track progress */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold mb-4">تقدمك في تخصصات BTEC</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {deptStats.map(({ dept, attempts: at, avg, best, coveragePct, bankSize }) => (
            <div key={dept.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ background: `hsl(${dept.color})` }}
                  />
                  <span className="text-sm font-semibold text-foreground truncate">{dept.name}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: `hsl(${dept.color})` }}>
                  {coveragePct}%
                </span>
              </div>
              <Progress value={coveragePct} className="h-2" />
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{at} اختبار · أفضل: {best}%</span>
                <span>{bankSize > 0 ? `بنك ${bankSize} سؤال` : "غير متوفر"}</span>
              </div>
            </div>
          ))}
        </div>
        {!loading && attempts.length === 0 && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            لم تكمل أي اختبار بعد — ابدأ الآن من قسم اختبارات BTEC.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgressTracking;
