import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Coffee, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

type ModeDurations = { hours: number; minutes: number };

const MODE_META = [
  { label: "دراسة", icon: BookOpen, ring: "rgba(216, 166, 96, 0.95)", glow: "rgba(216,166,96,0.22)" },
  { label: "استراحة قصيرة", icon: Coffee, ring: "rgba(45, 212, 191, 0.9)", glow: "rgba(45,212,191,0.20)" },
  { label: "استراحة طويلة", icon: Coffee, ring: "rgba(88, 169, 255, 0.92)", glow: "rgba(88,169,255,0.20)" },
] as const;

const DEFAULT_DURATIONS: ModeDurations[] = [
  { hours: 0, minutes: 25 },
  { hours: 0, minutes: 5 },
  { hours: 0, minutes: 15 },
];

function clampHours(n: number) {
  return Math.max(0, Math.min(99, Math.floor(Number.isFinite(n) ? n : 0)));
}

function clampMinutes(n: number) {
  return Math.max(0, Math.min(59, Math.floor(Number.isFinite(n) ? n : 0)));
}

function toTotalSeconds(d: ModeDurations) {
  const h = clampHours(d.hours);
  const m = clampMinutes(d.minutes);
  return h * 3600 + m * 60;
}

function formatHMS(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function useAlarm() {
  const ctxRef = useRef<AudioContext | null>(null);
  const unlockedRef = useRef(false);

  const unlock = useCallback(async () => {
    if (unlockedRef.current && ctxRef.current) return;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    ctxRef.current = ctx;
    await ctx.resume();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    g.gain.value = 0.0001;
    osc.connect(g).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.02);
    unlockedRef.current = true;
  }, []);

  const playAlarm = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    void ctx.resume();
    const start = ctx.currentTime;
    const steps = 10;
    for (let i = 0; i < steps; i++) {
      const t0 = start + i * 0.22;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = i % 2 === 0 ? 880 : 660;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.14, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
      osc.connect(g).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.2);
    }
  }, []);

  return { unlock, playAlarm };
}

const PomodoroTimer = () => {
  const [modeIndex, setModeIndex] = useState(0);
  const [durations, setDurations] = useState<ModeDurations[]>(() => [...DEFAULT_DURATIONS]);
  const initialSec = toTotalSeconds(DEFAULT_DURATIONS[0]);
  const [timeLeft, setTimeLeft] = useState(() => Math.max(1, initialSec));
  const [progressTotal, setProgressTotal] = useState(() => Math.max(1, initialSec));
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const alarmFiredRef = useRef(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { unlock, playAlarm } = useAlarm();

  const currentDuration = durations[modeIndex];
  const totalForMode = useMemo(() => Math.max(1, toTotalSeconds(currentDuration)), [currentDuration]);
  const meta = MODE_META[modeIndex];
  const progress = Math.min(100, Math.max(0, ((progressTotal - timeLeft) / progressTotal) * 100));

  const saveSession = useCallback(async () => {
    if (!user) return;
    const minutes = Math.max(1, Math.round(totalForMode / 60));
    await supabase.from("pomodoro_sessions").insert({
      user_id: user.id,
      duration_minutes: minutes,
      completed: true,
    });
  }, [user, totalForMode]);

  const applyDurationToTimer = useCallback(
    (idx: number) => {
      const raw = toTotalSeconds(durations[idx]);
      const den = Math.max(1, raw);
      setProgressTotal(den);
      setTimeLeft(raw);
    },
    [durations],
  );

  useEffect(() => {
    if (isRunning) return;
    applyDurationToTimer(modeIndex);
  }, [modeIndex, durations, isRunning, applyDurationToTimer]);

  useEffect(() => {
    if (!isRunning) return;
    alarmFiredRef.current = false;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) return 0;
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft !== 0 || !isRunning) return;
    if (alarmFiredRef.current) return;
    alarmFiredRef.current = true;

    setIsRunning(false);
    playAlarm();

    if (modeIndex === 0) {
      setSessions((s) => s + 1);
      void saveSession();
      toast({ title: "انتهت جلسة الدراسة", description: "يمكنك أخذ استراحة أو ضبط مؤقت جديد." });
    } else {
      toast({ title: "انتهت الاستراحة", description: "حان وقت العودة للدراسة عندما تكون جاهزًا." });
    }

    const rawFull = toTotalSeconds(durations[modeIndex]);
    const full = Math.max(1, rawFull);
    setTimeLeft(full);
    setProgressTotal(full);
  }, [timeLeft, isRunning, modeIndex, durations, playAlarm, saveSession, toast]);

  const setHours = (idx: number, hours: number) => {
    setDurations((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], hours: clampHours(hours) };
      return next;
    });
  };

  const setMinutes = (idx: number, minutes: number) => {
    setDurations((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], minutes: clampMinutes(minutes) };
      return next;
    });
  };

  const handleStartPause = async () => {
    if (isRunning) {
      setIsRunning(false);
      return;
    }
    const raw = toTotalSeconds(durations[modeIndex]);
    if (raw < 1) {
      toast({ title: "مدة غير صالحة", description: "حدد ساعة أو دقيقة واحدة على الأقل.", variant: "destructive" });
      return;
    }
    const sec = raw;
    await unlock();

    if (timeLeft <= 0 || timeLeft > sec) {
      setTimeLeft(sec);
      setProgressTotal(sec);
    }
    // else: resume — keep progressTotal و timeLeft

    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    alarmFiredRef.current = false;
    const raw = toTotalSeconds(durations[modeIndex]);
    const sec = Math.max(1, raw);
    setProgressTotal(sec);
    setTimeLeft(sec);
  };

  const handleModeChange = (i: number) => {
    setModeIndex(i);
    setIsRunning(false);
    alarmFiredRef.current = false;
  };

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const hms = formatHMS(timeLeft);

  return (
    <div
      className="relative overflow-hidden rounded-[26px] border p-6 sm:p-8 text-center transition-shadow duration-500"
      style={{
        background: "rgba(12, 18, 28, 0.52)",
        borderColor: "rgba(255, 225, 170, 0.14)",
        boxShadow:
          "0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05), 0 0 40px rgba(216,166,96,0.08)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 hover:opacity-90"
        style={{
          background:
            "radial-gradient(700px 420px at 50% 0%, rgba(216,166,96,0.10), transparent 55%), radial-gradient(600px 500px at 100% 100%, rgba(45,212,191,0.06), transparent 50%)",
        }}
      />

      <div className="relative">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {MODE_META.map((m, i) => {
            const Icon = m.icon;
            const active = i === modeIndex;
            return (
              <button
                key={m.label}
                type="button"
                onClick={() => handleModeChange(i)}
                className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-[12px] sm:text-sm font-bold transition-all duration-300"
                style={{
                  borderColor: active ? "rgba(216,166,96,0.35)" : "rgba(255,255,255,0.10)",
                  background: active ? "rgba(216,166,96,0.12)" : "rgba(255,255,255,0.04)",
                  color: active ? "rgba(255, 248, 237, 0.96)" : "rgba(226, 232, 240, 0.75)",
                  boxShadow: active ? `0 0 22px ${m.glow}` : "none",
                }}
              >
                <Icon className="h-4 w-4 shrink-0 opacity-90" />
                {m.label}
              </button>
            );
          })}
        </div>

        <div
          className="mx-auto mb-6 max-w-md rounded-2xl border px-4 py-4 transition-all duration-300 hover:shadow-[0_0_28px_rgba(216,166,96,0.12)]"
          style={{
            borderColor: "rgba(255, 225, 170, 0.12)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="text-right">
              <label htmlFor={`hours-${modeIndex}`} className="block text-[11px] font-bold mb-1.5" style={{ color: "rgba(255, 236, 210, 0.85)" }}>
                الساعات
              </label>
              <Input
                id={`hours-${modeIndex}`}
                type="number"
                min={0}
                max={99}
                disabled={isRunning}
                value={currentDuration.hours}
                onChange={(e) => setHours(modeIndex, parseInt(e.target.value, 10) || 0)}
                className="h-11 text-center text-[15px] font-mono font-semibold rounded-xl border transition-all duration-300 focus-visible:ring-2"
                style={{
                  borderColor: "rgba(255,225,170,0.16)",
                  background: "rgba(10,14,28,0.45)",
                  color: "rgba(248,250,252,0.95)",
                }}
              />
            </div>
            <div className="text-right">
              <label htmlFor={`minutes-${modeIndex}`} className="block text-[11px] font-bold mb-1.5" style={{ color: "rgba(255, 236, 210, 0.85)" }}>
                الدقائق
              </label>
              <Input
                id={`minutes-${modeIndex}`}
                type="number"
                min={0}
                max={59}
                disabled={isRunning}
                value={currentDuration.minutes}
                onChange={(e) => setMinutes(modeIndex, parseInt(e.target.value, 10) || 0)}
                className="h-11 text-center text-[15px] font-mono font-semibold rounded-xl border transition-all duration-300 focus-visible:ring-2"
                style={{
                  borderColor: "rgba(255,225,170,0.16)",
                  background: "rgba(10,14,28,0.45)",
                  color: "rgba(248,250,252,0.95)",
                }}
              />
            </div>
          </div>
          {isRunning ? (
            <p className="mt-3 text-[11px]" style={{ color: "rgba(148,163,184,0.85)" }}>
              أوقف المؤقت لتعديل المدة.
            </p>
          ) : null}
        </div>

        <div className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto mb-8">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <motion.circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={meta.ring}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transition={{ duration: 0.45 }}
              style={{ filter: `drop-shadow(0 0 10px ${meta.glow})` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
            <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight" style={{ color: "rgba(255, 248, 237, 0.96)" }}>
              {hms}
            </span>
            <span className="text-[12px] font-semibold mt-1" style={{ color: "rgba(216, 190, 140, 0.78)" }}>
              {meta.label}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            type="button"
            onClick={() => void handleStartPause()}
            size="lg"
            className="gap-2 min-w-[140px] rounded-xl font-bold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(216,166,96,0.85), rgba(180,130,70,0.75))",
              color: "rgba(15, 15, 18, 0.95)",
              border: "1px solid rgba(255,225,170,0.35)",
              boxShadow: "0 0 24px rgba(216,166,96,0.22)",
            }}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? "إيقاف مؤقت" : "ابدأ"}
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            size="lg"
            variant="outline"
            className="gap-2 rounded-xl font-bold border transition-all duration-300"
            style={{
              borderColor: "rgba(255,225,170,0.22)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(248,250,252,0.9)",
            }}
          >
            <RotateCcw className="w-5 h-5" />
            إعادة
          </Button>
        </div>

        <p className="text-[12px] mt-6" style={{ color: "rgba(148, 163, 184, 0.88)" }}>
          جلسات دراسة مكتملة: <span style={{ color: "rgba(216, 166, 96, 0.95)" }} className="font-black">{sessions}</span>
        </p>
      </div>
    </div>
  );
};

export default PomodoroTimer;
