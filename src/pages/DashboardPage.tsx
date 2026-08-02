import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  TrendingUp,
  Calendar,
  Timer,
  LogOut,
  Eye,
  Bookmark,
  Users,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeepSpaceBackground from "@/components/DeepSpaceBackground";
import ProgressOverview from "@/components/ProgressOverview";
import ProgressTracking from "@/components/ProgressTracking";
import StudySchedule from "@/components/StudySchedule";
import PomodoroTimer from "@/components/PomodoroTimer";

const TABS = [
  { id: "overview", label: "نظرة عامة", icon: LayoutDashboard },
  { id: "progress", label: "تتبع التقدم", icon: TrendingUp },
  { id: "schedule", label: "الجدول الدراسي", icon: Calendar },
  { id: "pomodoro", label: "مؤقت الدراسة", icon: Timer },
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState<{ display_name: string | null; avatar_url?: string | null } | null>(null);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // During an OAuth return, Supabase appends the session to the URL
    // (#access_token=... or ?code=...). The client needs a tick to parse it
    // and fire onAuthStateChange, so don't bounce to /auth while it's pending.
    const hash = window.location.hash || "";
    const search = window.location.search || "";
    const oauthReturnPending =
      hash.includes("access_token") ||
      hash.includes("error") ||
      search.includes("code=");

    if (!loading && !user && !oauthReturnPending) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);


  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("display_name, avatar_url")
          .eq("user_id", user.id)
          .maybeSingle();
        if (error) throw error;

        if (data) {
          if (!cancelled) setProfile(data as any);
          return;
        }

        // No profile row yet (common right after a fresh Sign Up before the
        // backend trigger runs / on external projects without it). Provision
        // one from the session metadata so the user isn't trapped loading.
        const fallbackName =
          (user.user_metadata?.full_name as string) ||
          (user.user_metadata?.display_name as string) ||
          (user.user_metadata?.name as string) ||
          user.email?.split("@")[0] ||
          "المستخدم";

        const { data: created } = await supabase
          .from("profiles")
          .upsert(
            { user_id: user.id, display_name: fallbackName },
            { onConflict: "user_id" },
          )
          .select("display_name, avatar_url")
          .maybeSingle();

        if (!cancelled) setProfile((created as any) ?? { display_name: fallbackName });
      } catch (e) {
        // Never block the dashboard on profile provisioning — render with a
        // graceful default instead of staying on the spinner forever.
        console.error("profile fetch/provision failed:", e);
        if (!cancelled) {
          const fallbackName = user.email?.split("@")[0] || "المستخدم";
          setProfile({ display_name: fallbackName });
        }
      }

    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  // While the auth session is still initializing (e.g. right after an OAuth
  // redirect back to /dashboard), show a visible spinner instead of a blank
  // black screen.
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div
          className="w-12 h-12 rounded-full border-4 border-white/15 border-t-teal-300 animate-spin"
          aria-label="جارٍ التحميل"
        />
        <p className="text-sm text-muted-foreground" style={{ fontFamily: "Cairo, sans-serif" }}>
          جارٍ تحميل لوحة التحكم...
        </p>
      </div>
    );
  }

  const displayName = profile?.display_name || user.email?.split("@")[0] || "المستخدم";
  const initials = displayName.slice(0, 2).toUpperCase();
  const joinDate = new Date(user.created_at).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* === Profile Banner === */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-white/10"
            style={{ boxShadow: "0 30px 80px -30px rgba(0,0,0,0.7)" }}
          >
            {/* Deep gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(110deg, hsl(225 55% 8%) 0%, hsl(245 70% 22%) 35%, hsl(265 75% 35%) 65%, hsl(225 60% 12%) 100%)",
              }}
            />
            <div className="absolute inset-0">
              <DeepSpaceBackground className="absolute inset-0 opacity-40" density={50} />
            </div>
            <div
              className="absolute -top-24 right-1/3 w-[420px] h-[420px] rounded-full opacity-50 blur-3xl"
              style={{ background: "radial-gradient(circle, hsl(264 90% 65%), transparent 70%)" }}
            />
            <div
              className="absolute -bottom-24 -left-10 w-[380px] h-[380px] rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, hsl(220 95% 60%), transparent 70%)" }}
            />
            <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-br from-white/[0.03] via-transparent to-black/20" />

            <div
              className="relative p-5 sm:p-8 flex flex-col md:flex-row-reverse items-stretch gap-6 md:gap-8"
              style={{ direction: "rtl", fontFamily: "Cairo, sans-serif" }}
            >
              {/* Avatar (far right in RTL) */}
              <div className="relative shrink-0 self-center">
                <div
                  className="absolute inset-0 rounded-full blur-2xl animate-pulse"
                  style={{
                    background: "radial-gradient(circle, hsl(264 90% 65% / 0.7), transparent 70%)",
                  }}
                />
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2.5px] bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-300">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 flex items-center justify-center text-3xl font-bold text-white ring-2 ring-black/40">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      initials
                    )}
                  </div>
                </div>
              </div>

              {/* Identity + actions stack */}
              <div className="flex-1 flex flex-col justify-between gap-5 min-w-0">
                <div className="flex flex-col items-end text-right gap-2.5">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                    {displayName}
                  </h1>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-white/75">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span dir="ltr">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap justify-end mt-1">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] sm:text-xs font-bold"
                      style={{
                        background:
                          "linear-gradient(135deg, #f5d76e 0%, #d4a017 45%, #b8860b 100%)",
                        color: "#3b2a05",
                        border: "1px solid rgba(255, 220, 130, 0.6)",
                        boxShadow:
                          "0 4px 14px rgba(212, 160, 23, 0.45), inset 0 1px 0 rgba(255,255,255,0.6)",
                      }}
                    >
                      <BadgeCheck className="w-3.5 h-3.5" />
                      عضو مميز
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] sm:text-xs text-white/85 border border-white/15 bg-white/[0.06] backdrop-blur-md">
                      <CalendarDays className="w-3.5 h-3.5 text-cyan-200" />
                      انضم في {joinDate}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={signOut}
                    aria-label="تسجيل الخروج"
                    className="group inline-flex items-center justify-center w-10 h-10 rounded-xl text-rose-300 border border-rose-400/30 bg-rose-500/10 backdrop-blur-xl transition-all duration-300 hover:bg-rose-500/20 hover:border-rose-300/60 hover:text-rose-200 hover:shadow-[0_0_24px_-4px_rgba(244,63,94,0.55)]"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2.5 flex-wrap justify-end">
                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/85 border border-white/15 bg-white/[0.06] backdrop-blur-xl transition-all duration-300 hover:border-white/35 hover:bg-white/[0.1]">
                      <Bookmark className="w-4 h-4" />
                      المفضلة
                    </button>
                    <button
                      onClick={() => navigate("/about-me")}
                      className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/90 border border-white/15 bg-white/[0.06] backdrop-blur-xl transition-all duration-300 hover:border-teal-300/70 hover:bg-white/[0.1] hover:shadow-[0_0_28px_-4px_hsl(174_80%_55%/0.5)]"
                    >
                      <Eye className="w-4 h-4 text-teal-300" />
                      مشاهدة البروفايل
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-5 pt-3 border-t border-white/10 text-sm text-white/70">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-white/55" />
                    ٠ متابعين
                  </span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap backdrop-blur-xl border ${
                  activeTab === tab.id
                    ? "bg-white/10 border-teal-300/40 text-white shadow-[0_0_24px_-8px_hsl(174_80%_55%/0.5)]"
                    : "bg-white/[0.03] border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {activeTab === "overview" && <ProgressOverview />}
            {activeTab === "progress" && <ProgressTracking />}
            {activeTab === "schedule" && <StudySchedule />}
            {activeTab === "pomodoro" && <PomodoroTimer />}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;
