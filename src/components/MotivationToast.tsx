import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { MOTIVATION_QUOTES } from "@/data/motivationQuotes";
import { useMotivation } from "@/hooks/useMotivation";

const INTERVAL_MS = 60_000; // 60s
const VISIBLE_MS = 7_000;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const MotivationToast = () => {
  const { enabled } = useMotivation();
  const [quote, setQuote] = useState<string | null>(null);
  const queueRef = useRef<string[]>(shuffle(MOTIVATION_QUOTES));
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const hideRef = useRef<ReturnType<typeof setTimeout>>();

  const dismiss = useCallback(() => setQuote(null), []);

  useEffect(() => {
    if (!enabled) {
      setQuote(null);
      clearInterval(intervalRef.current);
      clearTimeout(hideRef.current);
      return;
    }

    const showNext = () => {
      if (queueRef.current.length === 0) {
        queueRef.current = shuffle(MOTIVATION_QUOTES);
      }
      const next = queueRef.current.shift()!;
      setQuote(next);
      clearTimeout(hideRef.current);
      hideRef.current = setTimeout(() => setQuote(null), VISIBLE_MS);
    };

    intervalRef.current = setInterval(showNext, INTERVAL_MS);
    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(hideRef.current);
    };
  }, [enabled]);

  return (
    <AnimatePresence>
      {enabled && quote && (
        <motion.div
          key={quote}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 22, stiffness: 240 }}
          className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-md px-2 sm:px-0 transform-gpu -translate-x-1/2 will-change-transform"
          style={{
            fontFamily: "Cairo, sans-serif",
          }}
          dir="rtl"
        >
          <div
            className="relative flex flex-row items-center justify-center gap-3 p-4 rounded-2xl border border-primary/30 bg-card/70 backdrop-blur-2xl shadow-2xl text-center"
            style={{ boxShadow: "0 10px 40px -10px hsl(var(--primary) / 0.45), 0 0 30px hsl(var(--primary) / 0.18)" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <p
              className="flex-1 min-w-0 text-center text-[13px] sm:text-[15px] leading-relaxed text-foreground font-medium break-words whitespace-normal"
              style={{ whiteSpace: "normal", wordBreak: "break-word", overflowWrap: "break-word" }}
            >
              {quote}
            </p>
            <button
              onClick={dismiss}
              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(MotivationToast);
