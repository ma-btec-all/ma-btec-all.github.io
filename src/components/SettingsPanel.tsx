import { useState, ReactNode } from "react";
import {
  Settings,
  X,
  Globe,
  Sparkles,
  Sun,
  Moon,
  Type,
  Eye,
  Zap,
  BookOpen,
  Languages,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccentColor, ACCENT_COLORS } from "@/hooks/useAccentColor";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { useMotivation } from "@/hooks/useMotivation";
import { useA11y, FontSize } from "@/hooks/useA11y";
import { Switch } from "@/components/ui/switch";

interface ToggleRowProps {
  icon: ReactNode;
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

const ToggleRow = ({ icon, label, hint, checked, onChange }: ToggleRowProps) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 border border-border/40">
    <div className="flex items-center gap-3 min-w-0">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "hsl(var(--primary) / 0.15)" }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{label}</p>
        <p className="text-[11px] text-muted-foreground truncate">{hint}</p>
      </div>
    </div>
    <Switch checked={checked} onCheckedChange={onChange} />
  </div>
);

const SettingsPanel = () => {
  const [open, setOpen] = useState(false);
  const { accent, setAccent } = useAccentColor();
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { enabled: motivationEnabled, setEnabled: setMotivationEnabled } = useMotivation();
  const a11y = useA11y();

  const fontOptions: { id: FontSize; key: string }[] = [
    { id: "small", key: "settings.fontSmall" },
    { id: "normal", key: "settings.fontNormal" },
    { id: "large", key: "settings.fontLarge" },
  ];

  return (
    <>
      {/* Floating cogwheel */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-[60] w-12 h-12 rounded-full flex items-center justify-center bg-card/80 backdrop-blur-xl border border-border/50 shadow-lg"
        whileHover={{ scale: 1.15, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: "var(--shadow-glow)" }}
        aria-label={t("settings.title")}
      >
        <Settings className="w-5 h-5 text-primary" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: lang === "ar" ? -340 : 340, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: lang === "ar" ? -340 : 340, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 bottom-0 z-[80] w-[320px] bg-card/70 backdrop-blur-2xl border-border/50 p-6 flex flex-col gap-7 overflow-y-auto"
              style={{
                [lang === "ar" ? "left" : "right"]: 0,
                borderRight: lang === "ar" ? "1px solid hsl(var(--border))" : "none",
                borderLeft: lang === "ar" ? "none" : "1px solid hsl(var(--border))",
                boxShadow: "var(--shadow-glow)",
              }}
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">{t("settings.title")}</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Theme Color */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4">{t("settings.theme")}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {ACCENT_COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setAccent(color.name)}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div
                        className="relative w-10 h-10 rounded-full transition-all duration-300"
                        style={{
                          background: `hsl(${color.hsl})`,
                          boxShadow:
                            accent === color.name
                              ? `0 0 0 3px hsl(var(--background)), 0 0 0 5px hsl(${color.hsl}), 0 0 20px hsl(${color.glow} / 0.5)`
                              : "none",
                        }}
                      >
                        {accent === color.name && (
                          <motion.div
                            layoutId="accent-ring"
                            className="absolute inset-0 rounded-full"
                            style={{ boxShadow: `0 0 15px hsl(${color.glow} / 0.6)` }}
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                        {lang === "ar" ? color.label : color.labelEn}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dark/Light Mode */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4">{t("settings.mode")}</h3>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 w-full p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
                  <span className="text-sm text-foreground">
                    {theme === "dark"
                      ? lang === "ar" ? "الوضع الفاتح" : "Light Mode"
                      : lang === "ar" ? "الوضع المظلم" : "Dark Mode"}
                  </span>
                </button>
              </div>

              {/* Font Size */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
                  <Type className="w-4 h-4 text-primary" />
                  {t("settings.fontSize")}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {fontOptions.map((opt) => {
                    const active = a11y.fontSize === opt.id;
                    const sizeClass =
                      opt.id === "small" ? "text-xs" : opt.id === "large" ? "text-base" : "text-sm";
                    return (
                      <button
                        key={opt.id}
                        onClick={() => a11y.setFontSize(opt.id)}
                        className={`p-3 rounded-xl transition-all duration-300 font-semibold ${sizeClass}`}
                        style={{
                          background: active ? "hsl(var(--primary) / 0.15)" : "hsl(var(--secondary) / 0.5)",
                          border: active ? "1px solid hsl(var(--primary) / 0.5)" : "1px solid transparent",
                          boxShadow: active ? "var(--shadow-glow)" : "none",
                          color: active ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                        }}
                      >
                        {t(opt.key)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accessibility */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  {t("settings.a11y")}
                </h3>
                <div className="space-y-2.5">
                  <ToggleRow
                    icon={<Eye className="w-4 h-4 text-primary" />}
                    label={t("settings.highContrast")}
                    hint={t("settings.highContrastHint")}
                    checked={a11y.highContrast}
                    onChange={() => a11y.toggle("highContrast")}
                  />
                  <ToggleRow
                    icon={<Zap className="w-4 h-4 text-primary" />}
                    label={t("settings.reduceMotion")}
                    hint={t("settings.reduceMotionHint")}
                    checked={a11y.reduceMotion}
                    onChange={() => a11y.toggle("reduceMotion")}
                  />
                  <ToggleRow
                    icon={<BookOpen className="w-4 h-4 text-primary" />}
                    label={t("settings.readingMode")}
                    hint={t("settings.readingModeHint")}
                    checked={a11y.readingMode}
                    onChange={() => a11y.toggle("readingMode")}
                  />
                  <ToggleRow
                    icon={<Languages className="w-4 h-4 text-primary" />}
                    label={t("settings.dyslexia")}
                    hint={t("settings.dyslexiaHint")}
                    checked={a11y.dyslexiaFont}
                    onChange={() => a11y.toggle("dyslexiaFont")}
                  />
                </div>
              </div>

              {/* Language */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4">{t("settings.language")}</h3>
                <div className="flex gap-3">
                  {(["ar", "en"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl transition-all duration-300"
                      style={{
                        background: lang === l ? "hsl(var(--primary) / 0.15)" : "hsl(var(--secondary) / 0.5)",
                        border: lang === l ? "1px solid hsl(var(--primary) / 0.5)" : "1px solid transparent",
                        boxShadow: lang === l ? "var(--shadow-glow)" : "none",
                      }}
                    >
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">
                        {l === "ar" ? "عربي" : "EN"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Motivation Toggle */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4">{t("settings.motivation")}</h3>
                <ToggleRow
                  icon={<Sparkles className="w-4 h-4 text-primary" />}
                  label={
                    motivationEnabled
                      ? lang === "ar" ? "مفعلة" : "On"
                      : lang === "ar" ? "متوقفة" : "Off"
                  }
                  hint={t("settings.motivationHint")}
                  checked={motivationEnabled}
                  onChange={setMotivationEnabled}
                />
              </div>

              {/* Reset */}
              <div className="mt-auto pt-4 border-t border-border/40">
                <button
                  onClick={a11y.reset}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 border border-destructive/40 text-destructive font-semibold text-sm transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  {t("settings.reset")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsPanel;
