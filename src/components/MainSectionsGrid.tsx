import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Sparkles,
  BookOpen,
  GraduationCap,
  ClipboardList,
  Lightbulb,
  Timer,
  Calendar,
  FileQuestion,
  BookCheck,
  Bot,
  Trophy,
  Library,
  MessagesSquare,
  User,
  MessageSquareText,
  Calculator,
} from "lucide-react";

type SectionCard = {
  to: string;
  label: string;
  icon: typeof Home;
};

const SECTIONS: SectionCard[] = [
  { to: "/", label: "الرئيسية", icon: Home },
  { to: "/btec-about", label: "تعريف بنظام BTEC", icon: Sparkles },
  { to: "/btec-glossary", label: "دليل مصطلحات BTEC", icon: Library },
  { to: "/grade-calculator", label: "حاسبة المعدل", icon: Calculator },
  { to: "/schedule", label: "الجدول الدراسي", icon: Calendar },
  { to: "/pomodoro", label: "مؤقت الدراسة", icon: Timer },
  { to: "/ai-chat", label: "مساعد ذكاء اصطناعي", icon: Bot },
  { to: "/assistance", label: "مساعدة بالمهمات", icon: ClipboardList },
  { to: "/advice-guide", label: "نصائح وإرشادات", icon: Lightbulb },
  { to: "/btec-quiz", label: "اختبارات BTEC", icon: FileQuestion },
  { to: "/cultures", label: "المواد الثقافية", icon: BookOpen },
  { to: "/culture-quiz", label: "اختبارات الثقافات جيل 2008/2009", icon: BookCheck },
  { to: "/courses", label: "الدورات", icon: GraduationCap },
  { to: "/achievements", label: "معرض الإنجازات", icon: Trophy },
  { to: "/about", label: "عني", icon: User },
  { to: "/contact", label: "التواصل", icon: MessagesSquare },
  { to: "/comments", label: "التعليقات", icon: MessageSquareText },
];

const MotionLink = motion(Link);

export default function MainSectionsGrid() {
  const items = useMemo(() => SECTIONS, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
      {items.map((item, index) => {
        const Icon = item.icon;
        const isLastOdd = index === items.length - 1 && items.length % 3 === 1;
        return (
          <div key={item.to + item.label} className={isLastOdd ? "lg:col-span-3 flex justify-center" : ""}>
            <MotionLink
              to={item.to}
              className={`group relative block w-full overflow-hidden rounded-2xl border px-5 py-6 text-right transition-all duration-300 ease-out hover:-translate-y-1 ${
                isLastOdd ? "max-w-md" : ""
              }`}
              style={{
                borderColor: "rgba(255, 225, 170, 0.14)",
                background: "rgba(12, 18, 28, 0.48)",
                boxShadow: "0 18px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.36) }}
              whileHover={{
                boxShadow:
                  "0 22px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(216,166,96,0.22), 0 0 32px rgba(216,166,96,0.14)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(420px 200px at 80% 0%, rgba(216,166,96,0.12), transparent 60%), radial-gradient(360px 180px at 0% 100%, rgba(45,212,191,0.08), transparent 55%)",
                }}
              />
              <div className="relative flex items-start gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-[1.04]"
                  style={{
                    borderColor: "rgba(255, 225, 170, 0.18)",
                    background: "rgba(255,255,255,0.05)",
                    boxShadow: "0 0 20px rgba(216,166,96,0.10)",
                  }}
                >
                  <Icon className="h-6 w-6" style={{ color: "rgba(255, 236, 210, 0.92)" }} strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <div
                    className="text-[15px] sm:text-base font-black leading-snug"
                    style={{ color: "rgba(255, 248, 237, 0.96)" }}
                  >
                    {item.label}
                  </div>
                  <div className="mt-2 text-[11px] font-medium" style={{ color: "rgba(148, 163, 184, 0.85)" }}>
                    انتقال سريع
                  </div>
                </div>
              </div>
            </MotionLink>
          </div>
        );
      })}
    </div>
  );
}
