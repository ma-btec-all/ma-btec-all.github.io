import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, ArrowDown, Download, Share } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const { canInstall, isInstalled, isIOS, promptInstall } = usePWAInstall();
  const { toast } = useToast();
  const [showIOSHint, setShowIOSHint] = useState(false);

  const handleInstallClick = async () => {
    if (isInstalled) return;
    if (canInstall) {
      const res = await promptInstall();
      if (res.outcome === "accepted") {
        toast({ title: "تم تثبيت التطبيق بنجاح ✨", description: "ستجده الآن على شاشتك الرئيسية" });
      }
      return;
    }
    if (isIOS) {
      setShowIOSHint((s) => !s);
      return;
    }
    toast({
      title: "تثبيت التطبيق",
      description:
        "افتح قائمة المتصفح ثم اختر «تثبيت التطبيق» أو «Add to Home Screen». قد تحتاج لزيارة الموقع لبضع ثوانٍ أولاً.",
    });
  };
  return (
    <section className="relative min-h-screen pt-32 md:pt-36 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "hsl(174, 72%, 50%)" }} />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl" style={{ background: "hsl(264, 70%, 60%)" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-5 blur-3xl" style={{ background: "hsl(35, 90%, 55%)" }} />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(174, 72%, 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(174, 72%, 50%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 glass-card px-6 py-3 mb-8">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">منصة BTEC التعليمية الشاملة</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-7 leading-[1.08]"
        >
          <span className="gradient-text">BTEC</span>
          <br />
          <span className="text-foreground">مستقبلك يبدأ هنا</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-14 leading-relaxed"
        >
          اكتشف جميع تخصصات BTEC في مكان واحد. شروحات، ملفات، ومصادر تعليمية لمساعدتك على التفوق في مسيرتك الأكاديمية
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#main-sections"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-primary-foreground transition-all duration-300 hover:scale-105"
            style={{ background: "var(--gradient-primary)" }}
          >
            الأقسام الرئيسية
            <ArrowDown className="w-5 h-5" />
          </a>
          <a
            href="#main-sections"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold border border-border text-foreground transition-all duration-300 hover:bg-secondary"
          >
            تصفح المنصة
          </a>

          {/* PWA Install — always rendered unless already installed */}
          {!isInstalled && (
            <div className="relative">
              <motion.button
                type="button"
                onClick={handleInstallClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-foreground transition-all duration-300 backdrop-blur-xl"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(225 35% 12% / 0.7), hsl(260 40% 14% / 0.7))",
                  border: `1px solid ${canInstall ? "hsl(174 80% 55% / 0.6)" : "hsl(var(--border))"}`,
                  boxShadow: canInstall
                    ? "0 0 24px hsl(174 80% 55% / 0.35), inset 0 1px 0 rgba(255,255,255,0.05)"
                    : "0 4px 18px rgba(0,0,0,0.35)",
                }}
                aria-label="تثبيت التطبيق"
              >
                <Download className="w-5 h-5" />
                <span>تثبيت التطبيق</span>
              </motion.button>

              {showIOSHint && isIOS && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-30 top-full mt-3 left-1/2 -translate-x-1/2 w-72 p-3 rounded-xl text-xs text-right backdrop-blur-xl"
                  style={{
                    background: "hsl(225 35% 10% / 0.95)",
                    border: "1px solid hsl(var(--primary) / 0.35)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.55)",
                    direction: "rtl",
                    fontFamily: "Cairo, sans-serif",
                  }}
                >
                  <div className="flex items-center gap-2 font-bold text-white mb-1.5">
                    <Share className="w-4 h-4 text-cyan-300" />
                    تثبيت على iOS
                  </div>
                  <p className="text-white/75 leading-relaxed">
                    اضغط على زر المشاركة في Safari ثم اختر «إضافة إلى الشاشة الرئيسية».
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "16", label: "قسمًا رئيسيًا" },
            { value: "BTEC", label: "مسار مهني" },
            { value: "∞", label: "مصادر ودعم" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black gradient-text">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
