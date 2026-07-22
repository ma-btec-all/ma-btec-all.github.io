import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Save, Trash2, Clock, BookMarked } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const STORAGE_KEY = "ma-study-schedule-v1";

const DAYS_AR = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"] as const;

const PALETTE = [
  "#6366f1",
  "#14b8a6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#22c55e",
  "#38bdf8",
  "#d4a574",
  "#94a3b8",
] as const;

export type ScheduleEntry = {
  id: string;
  title: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  color: string;
};

function newId() {
  return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadFromStorage(): ScheduleEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is ScheduleEntry =>
        x &&
        typeof x === "object" &&
        typeof (x as ScheduleEntry).id === "string" &&
        typeof (x as ScheduleEntry).title === "string" &&
        typeof (x as ScheduleEntry).day_of_week === "number",
    ) as ScheduleEntry[];
  } catch {
    return [];
  }
}

function sortEntries(list: ScheduleEntry[]) {
  return [...list].sort((a, b) => {
    if (a.day_of_week !== b.day_of_week) return a.day_of_week - b.day_of_week;
    return a.start_time.localeCompare(b.start_time);
  });
}

const glassPanel = "relative rounded-[22px] border overflow-hidden transition-[box-shadow,transform] duration-300";
const glassStyle: CSSProperties = {
  background: "rgba(12, 18, 28, 0.52)",
  borderColor: "rgba(255, 225, 170, 0.14)",
  boxShadow: "0 22px 70px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
};

const StudySchedule = () => {
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("0");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [color, setColor] = useState<string>(PALETTE[0]);

  useEffect(() => {
    setEntries(sortEntries(loadFromStorage()));
  }, []);

  const persist = useCallback((list: ScheduleEntry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, []);

  const handleAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) {
      toast.error("يرجى إدخال عنوان المادة");
      return;
    }
    const d = Number(day);
    if (d < 0 || d > 6) return;

    const next: ScheduleEntry = {
      id: newId(),
      title: trimmed,
      day_of_week: d,
      start_time: startTime,
      end_time: endTime,
      color,
    };
    setEntries((prev) => sortEntries([...prev, next]));
    setTitle("");
    toast.message("تمت إضافة المادة إلى القائمة", { description: "اضغط «حفظ» لحفظ الجدول نهائيًا في المتصفح." });
  };

  const handleSave = () => {
    persist(entries);
    toast.success("تم حفظ الجدول بنجاح", { description: "سيبقى محفوظًا بعد التحديث أو مغادرة الموقع." });
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    toast.message("تم الحذف من القائمة", { description: "اضغط «حفظ» لتحديث التخزين المحلي." });
  };

  const grouped = useMemo(() => {
    const map = new Map<number, ScheduleEntry[]>();
    for (let i = 0; i < 7; i++) map.set(i, []);
    sortEntries(entries).forEach((e) => {
      map.get(e.day_of_week)?.push(e);
    });
    return map;
  }, [entries]);

  const inputShell =
    "rounded-xl border text-right h-11 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-teal-400/30";
  const inputStyle: CSSProperties = {
    borderColor: "rgba(255, 225, 170, 0.14)",
    background: "rgba(10, 14, 28, 0.42)",
    color: "rgba(248, 250, 252, 0.95)",
  };

  return (
    <div className="space-y-8">
      <div className={`${glassPanel}`} style={glassStyle}>
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(600px 280px at 20% 0%, rgba(216,166,96,0.10), transparent 55%), radial-gradient(500px 320px at 100% 100%, rgba(45,212,191,0.08), transparent 50%)",
          }}
        />
        <div className="relative p-5 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl border shrink-0"
                style={{
                  borderColor: "rgba(255,225,170,0.18)",
                  background: "rgba(255,255,255,0.05)",
                  boxShadow: "0 0 18px rgba(216,166,96,0.12)",
                }}
              >
                <BookMarked className="h-5 w-5" style={{ color: "rgba(255, 236, 210, 0.9)" }} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black" style={{ color: "rgba(255, 248, 237, 0.96)" }}>
                  إضافة حصة للجدول
                </h3>
                <p className="text-[12px] sm:text-sm mt-0.5" style={{ color: "rgba(148, 163, 184, 0.9)" }}>
                  املأ الحقول ثم «إضافة» — ثم «حفظ» لتخزين الجدول في المتصفح
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sch-title" className="text-[12px] font-bold" style={{ color: "rgba(255, 236, 210, 0.88)" }}>
                عنوان المادة
              </Label>
              <Input
                id="sch-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثال: رياضيات — الوحدة الثالثة"
                className={inputShell}
                style={inputStyle}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[12px] font-bold" style={{ color: "rgba(255, 236, 210, 0.88)" }}>
                اليوم
              </Label>
              <Select value={day} onValueChange={setDay}>
                <SelectTrigger
                  className={`${inputShell} h-11`}
                  style={inputStyle}
                  dir="rtl"
                >
                  <SelectValue placeholder="اختر اليوم" />
                </SelectTrigger>
                <SelectContent
                  dir="rtl"
                  className="max-h-72 border border-[rgba(255,225,170,0.14)] bg-[rgba(10,14,22,0.96)] text-slate-100 backdrop-blur-xl"
                >
                  {DAYS_AR.map((label, i) => (
                    <SelectItem key={label} value={String(i)}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sch-from" className="text-[12px] font-bold" style={{ color: "rgba(255, 236, 210, 0.88)" }}>
                  من
                </Label>
                <Input
                  id="sch-from"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className={inputShell}
                  style={inputStyle}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sch-to" className="text-[12px] font-bold" style={{ color: "rgba(255, 236, 210, 0.88)" }}>
                  إلى
                </Label>
                <Input
                  id="sch-to"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className={inputShell}
                  style={inputStyle}
                />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[12px] font-bold block" style={{ color: "rgba(255, 236, 210, 0.88)" }}>
                لون الجدول
              </span>
              <div className="flex flex-wrap gap-2.5 justify-start sm:justify-end">
                {PALETTE.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className="h-9 w-9 rounded-full border-2 transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-amber-200/60"
                    style={{
                      background: c,
                      borderColor: color === c ? "rgba(255, 248, 237, 0.95)" : "rgba(255,255,255,0.2)",
                      boxShadow: color === c ? `0 0 18px ${c}99` : "0 0 0 rgba(0,0,0,0)",
                    }}
                    aria-label={`لون ${c}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={handleSave}
              className="gap-2 rounded-xl font-bold h-11 border transition-all duration-300"
              style={{
                borderColor: "rgba(45,212,191,0.35)",
                background: "rgba(45,212,191,0.08)",
                color: "rgba(224, 242, 242, 0.95)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 28px rgba(45,212,191,0.28)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Save className="h-4 w-4" />
              حفظ
            </Button>
            <Button
              type="button"
              onClick={handleAdd}
              className="gap-2 rounded-xl font-bold h-11 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(216,166,96,0.88), rgba(180,130,70,0.78))",
                color: "rgba(15, 15, 18, 0.95)",
                border: "1px solid rgba(255,225,170,0.35)",
                boxShadow: "0 0 22px rgba(216,166,96,0.22)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 32px rgba(216,166,96,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 22px rgba(216,166,96,0.22)";
              }}
            >
              <Plus className="h-4 w-4" />
              إضافة
            </Button>
          </div>
        </div>
      </div>

      <div className={glassPanel} style={glassStyle}>
        <div className="relative p-5 sm:p-7">
          <h4 className="text-base sm:text-lg font-black mb-5" style={{ color: "rgba(255, 248, 237, 0.96)" }}>
            جدولك الحالي
          </h4>

          {entries.length === 0 ? (
            <p className="text-center py-10 text-sm" style={{ color: "rgba(148, 163, 184, 0.92)" }}>
              لا توجد مواد بعد. أضف حصصًا ثم اضغط «حفظ» لتثبيتها في المتصفح.
            </p>
          ) : (
            <div className="space-y-8">
              {DAYS_AR.map((dayName, dayIndex) => {
                const list = grouped.get(dayIndex) ?? [];
                if (list.length === 0) return null;
                return (
                  <div key={dayName}>
                    <p className="text-[12px] font-black mb-3 tracking-wide" style={{ color: "rgba(216, 190, 140, 0.85)" }}>
                      {dayName}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <AnimatePresence initial={false} mode="popLayout">
                        {list.map((s) => (
                          <motion.div
                            key={s.id}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                            className="group relative rounded-xl border p-4 text-right transition-all duration-300 hover:-translate-y-0.5"
                            style={{
                              borderColor: "rgba(255, 225, 170, 0.12)",
                              background: "rgba(255,255,255,0.04)",
                              boxShadow: "0 0 0 rgba(0,0,0,0)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.25), 0 0 22px rgba(216,166,96,0.10)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            <div className="flex gap-3 items-start">
                              <div className="w-1.5 shrink-0 self-stretch min-h-[48px] rounded-full" style={{ background: s.color || PALETTE[0] }} />
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-[15px] leading-snug" style={{ color: "rgba(248,250,252,0.96)" }}>
                                  {s.title}
                                </p>
                                <p className="text-[12px] mt-2 flex items-center gap-1.5 justify-end flex-wrap" style={{ color: "rgba(148,163,184,0.95)" }}>
                                  <Clock className="h-3.5 w-3.5 shrink-0" />
                                  <span className="font-mono tabular-nums">{s.start_time}</span>
                                  <span>—</span>
                                  <span className="font-mono tabular-nums">{s.end_time}</span>
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleDelete(s.id)}
                                className="shrink-0 rounded-lg border p-2 opacity-80 transition-all duration-300 hover:opacity-100 hover:bg-red-500/10"
                                style={{ borderColor: "rgba(248,113,113,0.25)" }}
                                aria-label="حذف"
                              >
                                <Trash2 className="h-4 w-4 text-red-300" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudySchedule;
