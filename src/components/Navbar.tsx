import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Sparkles as SparklesIcon,
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
  Calculator,
  MessagesSquare,
  MessageSquareMore,
  User,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/UserMenu";
import maLogo from "@/assets/ma-btec-logo.png";

const Navbar = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = useMemo(
    () => ([
      { to: "/", label: t("nav.home"), icon: Home },
      { to: "/btec-about", label: t("nav.btecAbout"), icon: SparklesIcon },
      { to: "/btec-glossary", label: t("nav.glossary"), icon: Library },
      { to: "/grade-calculator", label: t("nav.calculator"), icon: Calculator },
      { to: "/schedule", label: t("nav.schedule"), icon: Calendar },
      { to: "/pomodoro", label: t("nav.pomodoro"), icon: Timer },
      { to: "/ai-chat", label: t("nav.aiChat"), icon: Bot },
      { to: "/assistance", label: t("nav.assistance"), icon: ClipboardList },
      { to: "/advice-guide", label: t("nav.advice"), icon: Lightbulb },
      { to: "/btec-quiz", label: t("nav.btecQuiz"), icon: FileQuestion },
      { to: "/cultures", label: t("nav.cultures"), icon: BookOpen },
      { to: "/culture-quiz", label: t("nav.cultureQuiz"), icon: BookCheck },
      { to: "/courses", label: t("nav.courses"), icon: GraduationCap },
      { to: "/achievements", label: t("nav.achievements"), icon: Trophy },
      { to: "/about", label: t("nav.about"), icon: User },
      { to: "/contact", label: t("nav.contact"), icon: MessagesSquare },
      { to: "/comments", label: t("nav.comments"), icon: MessageSquareMore },
    ] as Array<{ to: string; label: string; icon: typeof Home; isHash?: boolean }>),
    [t]
  );

  const isPathActive = (to: string, isHash?: boolean) => {
    if (isHash) return location.pathname === "/";
    return location.pathname === to;
  };

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const MotionRouterLink = motion(Link);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b"
      style={{
        borderColor: "hsl(var(--primary) / 0.3)",
        boxShadow: "0 1px 0 hsl(var(--primary) / 0.25), 0 0 24px hsl(var(--primary) / 0.14)",
      }}
    >
      <div
        className="max-w-7xl mx-auto px-3 py-2 flex items-center gap-2"
        style={{ direction: "ltr" }}
      >
        {/* Left cluster: auth / user (desktop) + hamburger (mobile) */}
        <div
          className="shrink-0 flex items-center gap-2"
          style={{ direction: "rtl", fontFamily: "Cairo, sans-serif" }}
        >
          {/* Hamburger — visible below lg */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="فتح القائمة"
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border transition-colors"
            style={{
              borderColor: "hsl(var(--primary) / 0.35)",
              background: "rgba(255,255,255,0.04)",
              color: "#F8F9FA",
            }}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Auth area — desktop only */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? <UserMenu /> : null}
          </div>
        </div>


        {/* Desktop nav links */}
        <div className="hidden lg:block flex-1" style={{ direction: "rtl" }}>
          <div className="flex flex-wrap items-center justify-center gap-1.5 pr-1">
            {navLinks.map((item) => {
              const ItemIcon = item.icon;
              const active = isPathActive(item.to, item.isHash);
              const commonClass =
                "group relative inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] sm:text-xs font-semibold transition-all duration-300 ease-in-out hover:scale-[1.02]";

              const activeStyle = {
                color: "hsl(var(--primary))",
                background: "hsl(var(--primary) / 0.1)",
                textShadow: "0 0 10px hsl(var(--primary) / 0.45)",
              };

              const idleStyle = {
                color: "#E5E7EB",
                background: "rgba(255,255,255,0.03)",
              };

              return (
                <MotionRouterLink
                  key={item.label}
                  to={item.to}
                  className={commonClass}
                  style={{ fontFamily: "Cairo, sans-serif", ...(active ? activeStyle : idleStyle) }}
                  whileHover={{
                    scale: 1.03,
                    backgroundColor: "hsl(var(--primary) / 0.12)",
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <ItemIcon
                    className="w-3.5 h-3.5 shrink-0 transition-all duration-300 ease-in-out group-hover:text-cyan-300"
                    style={{ filter: active ? "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))" : undefined }}
                  />
                  <span className="transition-all duration-300 ease-in-out group-hover:text-cyan-300 group-hover:[text-shadow:0_0_8px_hsl(var(--primary)_/_0.45)]">
                    {item.label}
                  </span>
                  <span
                    className="absolute -bottom-[4px] left-2 right-2 h-[2px] rounded-full transition-opacity duration-300"
                    style={{
                      opacity: active ? 1 : 0,
                      background: "hsl(var(--primary))",
                      boxShadow: "0 0 10px hsl(var(--primary) / 0.8)",
                    }}
                  />
                </MotionRouterLink>
              );
            })}
          </div>
        </div>

        {/* Mobile spacer (pushes logo to far side) */}
        <div className="flex-1 lg:hidden" />

        {/* Logo */}
        <Link to="/" className="group shrink-0 relative z-20" style={{ marginInlineStart: "0.35rem" }}>
          <motion.div
            className="flex items-center gap-2 sm:gap-4 md:gap-5 max-w-[calc(100vw-5rem)]"
            style={{ direction: "ltr" }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <span
              className="hidden sm:inline text-[11px] sm:text-sm md:text-base font-bold whitespace-nowrap leading-tight transition-all duration-300"
              style={{
                fontFamily: "Inter, Montserrat, Poppins, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 700,
                letterSpacing: "0.02em",
                color: "#F8F9FA",
                textShadow:
                  "0 0 7px hsl(var(--primary) / 0.48), 0 0 14px hsl(var(--primary) / 0.28), 0 0 24px hsl(var(--primary) / 0.14)",
              }}
            >
              Mohammad Atallah | BTEC
            </span>

            <motion.div
              className="relative flex items-center shrink-0"
              whileHover={{ rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{
                filter:
                  "drop-shadow(0 0 10px rgba(255, 195, 160, 0.55)) drop-shadow(0 0 22px rgba(244, 151, 122, 0.26))",
              }}
            >
              <img
                src={maLogo}
                alt="Mohammad Atallah | BTEC"
                className="h-[54px] sm:h-[78px] md:h-[90px] w-auto rounded-md object-contain"
                style={{
                  imageRendering: "auto",
                  filter: "brightness(1.08) contrast(1.12) saturate(1.08)",
                }}
              />
            </motion.div>
          </motion.div>
        </Link>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[60] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
            />
            <motion.aside
              key="drawer"
              className="fixed top-0 bottom-0 right-0 z-[70] w-[86%] max-w-[340px] lg:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(120% 80% at 100% 0%, rgba(20,40,55,0.65), rgba(6,10,18,0.96))",
                borderInlineStart: "1px solid hsl(var(--primary) / 0.3)",
                boxShadow: "0 0 60px rgba(0,0,0,0.6), 0 0 30px hsl(var(--primary) / 0.18)",
                direction: "rtl",
                fontFamily: "Cairo, sans-serif",
                maxHeight: "100vh",
                height: "100dvh",
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-3 border-b shrink-0"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="إغلاق القائمة"
                  className="inline-flex items-center justify-center h-9 w-9 rounded-lg border"
                  style={{
                    borderColor: "rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.04)",
                    color: "#F8F9FA",
                  }}
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white/90">القائمة</span>
                  <img src={maLogo} alt="" className="h-9 w-auto rounded-md" />
                </div>
              </div>

              <div
                className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3"
                style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
              >
                <ul className="space-y-2">
                  {navLinks.map((item) => {
                    const ItemIcon = item.icon;
                    const active = isPathActive(item.to, item.isHash);
                    return (
                      <li key={item.label}>
                        <Link
                          to={item.to}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors"
                          style={{
                            color: active ? "hsl(180 90% 70%)" : "#E5E7EB",
                            background: active
                              ? "rgba(34, 211, 238, 0.08)"
                              : "rgba(15, 30, 40, 0.55)",
                            border: "1.5px solid",
                            borderColor: active
                              ? "hsl(180 90% 65%)"
                              : "rgba(255,255,255,0.05)",
                            boxShadow: active
                              ? "0 0 14px hsl(180 90% 60% / 0.35), inset 0 0 0 1px hsl(180 90% 65% / 0.25)"
                              : "inset 0 1px 0 rgba(255,255,255,0.02)",
                            textShadow: active ? "0 0 10px hsl(180 90% 60% / 0.5)" : undefined,
                          }}
                        >
                          <span className="flex-1 text-left">{item.label}</span>
                          <ItemIcon
                            className="h-4 w-4 shrink-0"
                            style={{
                              filter: active
                                ? "drop-shadow(0 0 6px hsl(180 90% 60% / 0.7))"
                                : undefined,
                            }}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {user ? (
                <div
                  className="px-4 py-3 border-t flex items-center gap-2"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="w-full">
                    <UserMenu />
                  </div>
                </div>
              ) : null}

            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
