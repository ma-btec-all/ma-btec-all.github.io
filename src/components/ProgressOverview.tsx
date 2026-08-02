import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BookOpen, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { departments } from "@/data/departments";

interface ProgressEntry {
  department_id: string;
  specialty_name: string;
  progress_percentage: number;
  completed_lessons: number;
  total_lessons: number;
}

const CircularProgress = ({
  value,
  max = 100,
  color,
  label,
}: {
  value: number;
  max?: number;
  color: string;
  label: string;
}) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(100, max === 0 ? 0 : (value / max) * 100);
  const offset = circumference - (pct / 100) * circumference;
  return (
    <div className="relative w-20 h-20 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease", filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-base font-semibold text-white/90">
        {label}
      </div>
    </div>
  );
};

const ProgressOverview = () => {
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchProgress();
  }, [user]);

  const fetchProgress = async () => {
    const { data } = await supabase.from("progress_tracking").select("*");
    if (data) setProgress(data as unknown as ProgressEntry[]);
  };

  const getDeptColor = (deptId: string) => {
    const dept = departments.find((d) => d.id === deptId);
    return dept?.color || "174 72% 50%";
  };

  const getDeptName = (deptId: string) => {
    const dept = departments.find((d) => d.id === deptId);
    return dept?.name || deptId;
  };

  const overallProgress = progress.length > 0
    ? Math.round(progress.reduce((sum, p) => sum + p.progress_percentage, 0) / progress.length)
    : 0;
  const completedLessons = progress.reduce((s, p) => s + p.completed_lessons, 0);
  const totalLessons = progress.reduce((s, p) => s + p.total_lessons, 0);

  const stats = [
    {
      icon: TrendingUp,
      label: "التقدم العام",
      value: overallProgress,
      max: 100,
      display: `${overallProgress}%`,
      color: "hsl(174 80% 55%)",
    },
    {
      icon: BookOpen,
      label: "التخصصات النشطة",
      value: progress.length,
      max: Math.max(progress.length, 5),
      display: `${progress.length}`,
      color: "hsl(264 75% 65%)",
    },
    {
      icon: Target,
      label: "الدروس المكتملة",
      value: completedLessons,
      max: Math.max(totalLessons, 1),
      display: `${completedLessons}`,
      color: "hsl(190 85% 55%)",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
          >
            <div
              className="absolute -top-10 -left-10 w-32 h-32 rounded-full opacity-20 blur-2xl"
              style={{ background: stat.color }}
            />
            <div className="relative flex items-center gap-4">
              <CircularProgress value={stat.value} max={stat.max} color={stat.color} label={stat.display} />
              <div className="flex-1 text-right">
                <p className="text-sm font-medium text-white/85">{stat.label}</p>
                <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-white/50">
                  <stat.icon className="w-3.5 h-3.5" />
                  <span>تحديث مباشر</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress list */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white/90">تقدمك في التخصصات</h3>
        {progress.length > 0 ? (
          <div className="space-y-4">
            {progress.map((p) => (
              <div key={`${p.department_id}-${p.specialty_name}`} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-foreground">{p.specialty_name}</span>
                    <span className="text-xs text-muted-foreground mr-2">({getDeptName(p.department_id)})</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: `hsl(${getDeptColor(p.department_id)})` }}>
                    {p.progress_percentage}%
                  </span>
                </div>
                <Progress value={p.progress_percentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {p.completed_lessons} / {p.total_lessons} درس مكتمل
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/70">لم تبدأ أي تخصص بعد</p>
            <p className="text-xs text-white/50 mt-1">ابدأ بزيارة أحد الأقسام واختر تخصصاً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressOverview;
