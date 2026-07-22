import { useEffect, useState, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import { AccentColorProvider } from "@/hooks/useAccentColor";
import { LanguageProvider } from "@/hooks/useLanguage";
import SettingsPanel from "@/components/SettingsPanel";
import BackgroundAudioProvider from "@/components/BackgroundAudioProvider";
import SplashScreen from "@/components/SplashScreen";
import MotivationToast from "@/components/MotivationToast";
import { MotivationProvider } from "@/hooks/useMotivation";
import { A11yProvider } from "@/hooks/useA11y";
import HomePage from "./pages/HomePage.tsx";
const DepartmentPage = lazy(() => import("./pages/DepartmentPage.tsx"));
const CulturesPage = lazy(() => import("./pages/CulturesPage.tsx"));
const AuthPage = lazy(() => import("./pages/AuthPage.tsx"));
const DashboardPage = lazy(() => import("./pages/DashboardPage.tsx"));
const PomodoroPage = lazy(() => import("./pages/PomodoroPage.tsx"));
const SchedulePage = lazy(() => import("./pages/SchedulePage.tsx"));
const AssistancePage = lazy(() => import("./pages/AssistancePage.tsx"));
const AdviceGuidePage = lazy(() => import("./pages/AdviceGuidePage.tsx"));
const BtecQuizPage = lazy(() => import("./pages/BtecQuizPage.tsx"));
const CultureQuizPage = lazy(() => import("./pages/CultureQuizPage.tsx"));
const AiChatPage = lazy(() => import("./pages/AiChatPage.tsx"));
const AchievementGalleryPage = lazy(() => import("./pages/AchievementGalleryPage.tsx"));
const BtecGlossaryPage = lazy(() => import("./pages/BtecGlossaryPage.tsx"));
const CoursesPage = lazy(() => import("./pages/CoursesPage.tsx"));
const BtecAboutPage = lazy(() => import("./pages/BtecAboutPage.tsx"));
const AboutMePage = lazy(() => import("./pages/AboutMePage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const CommentsPage = lazy(() => import("./pages/CommentsPage.tsx"));
const GradeCalculatorPage = lazy(() => import("./pages/GradeCalculatorPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    return sessionStorage.getItem("ma-splash-dismissed") !== "1";
  });

  useEffect(() => {
    if (!showSplash) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showSplash]);

  const handleSplashDone = () => {
    sessionStorage.setItem("ma-splash-dismissed", "1");
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <A11yProvider>
      <ThemeProvider>
        <AccentColorProvider>
          <LanguageProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AuthProvider>
                  <MotivationProvider>
                  <BackgroundAudioProvider>
                    <Suspense fallback={null}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/department/:id" element={<DepartmentPage />} />
                      <Route path="/btec-about" element={<BtecAboutPage />} />
                      <Route path="/cultures" element={<CulturesPage />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/pomodoro" element={<PomodoroPage />} />
                      <Route path="/schedule" element={<SchedulePage />} />
                      <Route path="/assistance" element={<AssistancePage />} />
                      <Route path="/advice-guide" element={<AdviceGuidePage />} />
                      <Route path="/btec-quiz" element={<BtecQuizPage />} />
                      <Route path="/culture-quiz" element={<CultureQuizPage />} />
                      <Route path="/ai-chat" element={<AiChatPage />} />
                      <Route path="/achievements" element={<AchievementGalleryPage />} />
                      <Route path="/btec-glossary" element={<BtecGlossaryPage />} />
                      <Route path="/glossary" element={<BtecGlossaryPage />} />
                      <Route path="/courses" element={<CoursesPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/about" element={<AboutMePage />} />
                      <Route path="/comments" element={<CommentsPage />} />
                      <Route path="/grade-calculator" element={<GradeCalculatorPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    </Suspense>
                    <SettingsPanel />
                    <MotivationToast />
                  </BackgroundAudioProvider>
                  </MotivationProvider>
                </AuthProvider>
              </BrowserRouter>
              {showSplash ? <SplashScreen onDone={handleSplashDone} /> : null}
            </TooltipProvider>
          </LanguageProvider>
        </AccentColorProvider>
      </ThemeProvider>
      </A11yProvider>
    </QueryClientProvider>
  );
};

export default App;
