import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SplashScreenProps = {
  onDone: () => void;
};

const SplashScreen = ({ onDone }: SplashScreenProps) => {
  const [visible, setVisible] = useState(true);

  const timings = useMemo(
    () => ({
      visibleMs: 3200,
      fadeMs: 650,
    }),
    [],
  );

  useEffect(() => {
    const t1 = window.setTimeout(() => setVisible(false), timings.visibleMs);
    return () => {
      window.clearTimeout(t1);
    };
  }, [timings.visibleMs]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[200]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: timings.fadeMs / 1000, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:
              "radial-gradient(circle at 18% 18%, rgba(245, 197, 120, 0.16), transparent 42%), radial-gradient(circle at 82% 12%, rgba(168, 85, 247, 0.18), transparent 44%), radial-gradient(circle at 50% 92%, rgba(34, 211, 238, 0.12), transparent 46%), linear-gradient(135deg, #05060a 0%, #070a12 45%, #05060a 100%)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "url('/mylogo.png')" }} />

          <div className="relative h-full w-full flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-3xl text-center"
            >
              <div className="mx-auto mb-8 flex items-center justify-center">
                <div className="relative">
                  <div
                    className="absolute -inset-6 rounded-full blur-2xl"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(245, 197, 120, 0.55), rgba(245, 197, 120, 0.12), transparent 62%)",
                    }}
                  />
                  <div
                    className="relative rounded-full p-[2px]"
                    style={{
                      background:
                        "conic-gradient(from 180deg, rgba(245,197,120,0.95), rgba(212,175,55,0.55), rgba(245,197,120,0.95))",
                      boxShadow:
                        "0 0 0 1px rgba(245,197,120,0.35), 0 0 40px rgba(245,197,120,0.22), 0 0 90px rgba(168,85,247,0.12)",
                    }}
                  >
                    <div className="rounded-full bg-black/55 backdrop-blur-xl p-3">
                      <img src="/mylogo.png" alt="MA | BTEC" className="h-16 w-16 sm:h-20 sm:w-20 object-contain" />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="text-[clamp(1.15rem,3.6vw,2.05rem)] font-black leading-snug tracking-[0.01em]"
                style={{
                  fontFamily: "Tajawal, Cairo, system-ui, sans-serif",
                  color: "#F8FAFC",
                  textShadow:
                    "0 0 18px rgba(245,197,120,0.35), 0 0 42px rgba(245,197,120,0.12), 0 0 70px rgba(168,85,247,0.10)",
                }}
              >
                <span style={{ color: "rgba(245,197,120,0.95)" }}>أهلاً بك في</span>{" "}
                <span style={{ color: "#F8FAFC" }}>MA | BTEC - المنصة التعليمية الشاملة</span>
              </div>

              <div
                className="mt-4 text-sm sm:text-base font-semibold"
                style={{
                  fontFamily: "Tajawal, Cairo, system-ui, sans-serif",
                  color: "rgba(245,197,120,0.92)",
                  textShadow: "0 0 18px rgba(245,197,120,0.22)",
                }}
              >
                تم التطوير بواسطة محمد عطالله
              </div>

              <div className="mx-auto mt-10 max-w-md">
                <div className="h-[2px] w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: "42%",
                      background: "linear-gradient(90deg, rgba(245,197,120,0.95), rgba(34,211,238,0.85), rgba(168,85,247,0.85))",
                      boxShadow: "0 0 18px rgba(245,197,120,0.35)",
                    }}
                    initial={{ x: "-120%" }}
                    animate={{ x: "320%" }}
                    transition={{ duration: 1.35, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="mt-2 text-[11px] text-slate-300/70" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
                  Loading…
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
