import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "ar" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const translations: Record<string, Record<Language, string>> = {
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.btecAbout": { ar: "تعريف بنظام BTEC", en: "What is BTEC?" },
  "nav.cultures": { ar: "مواد الثقافات", en: "Cultures" },
  "nav.courses": { ar: "الدورات", en: "Courses" },
  "nav.assistance": { ar: "مساعدات بالمهمات", en: "Task Assistance" },
  "nav.advice": { ar: "نصائح وارشادات", en: "Advice & Guidance" },
  "nav.pomodoro": { ar: "مؤقت الدراسة", en: "Study Timer" },
  "nav.schedule": { ar: "الجدول الدراسي", en: "Study Schedule" },
  "nav.btecQuiz": { ar: "اختبارات BTEC", en: "BTEC Quizzes" },
  "nav.cultureQuiz": { ar: "اختبارات الثقافات جيل 2008/2009", en: "Culture Quizzes 2008/2009" },
  "nav.aiChat": { ar: "مساعد ذكاء اصطناعي", en: "AI Assistant" },
  "nav.achievements": { ar: "معرض الإنجازات", en: "Achievements" },
  "nav.glossary": { ar: "دليل مصطلحات BTEC", en: "BTEC Glossary" },
  "nav.contact": { ar: "التواصل", en: "Contact" },
  "nav.about": { ar: "عني", en: "About Me" },
  "nav.comments": { ar: "التعليقات", en: "Comments" },
  "nav.dashboard": { ar: "لوحة التحكم", en: "Dashboard" },
  "nav.login": { ar: "تسجيل الدخول", en: "Sign In" },
  "settings.title": { ar: "الإعدادات", en: "Settings" },
  "settings.theme": { ar: "لون السمة", en: "Theme Color" },
  "settings.language": { ar: "اللغة", en: "Language" },
  "settings.mode": { ar: "الوضع", en: "Mode" },
  "settings.motivation": { ar: "تفعيل الجمل التحفيزية", en: "Enable motivational quotes" },
  "settings.motivationHint": { ar: "تظهر رسالة تحفيز كل دقيقة", en: "A quote appears every minute" },
  "settings.fontSize": { ar: "حجم الخط", en: "Font size" },
  "settings.fontSmall": { ar: "صغير", en: "Small" },
  "settings.fontNormal": { ar: "عادي", en: "Normal" },
  "settings.fontLarge": { ar: "كبير", en: "Large" },
  "settings.a11y": { ar: "إمكانية الوصول", en: "Accessibility" },
  "settings.highContrast": { ar: "تباين عالي", en: "High contrast" },
  "settings.highContrastHint": { ar: "زيادة التباين بين النص والخلفية", en: "Boost text/background contrast" },
  "settings.reduceMotion": { ar: "تقليل الحركة", en: "Reduce motion" },
  "settings.reduceMotionHint": { ar: "تعطيل الرسوم المتحركة", en: "Disable animations" },
  "settings.readingMode": { ar: "وضع القراءة", en: "Reading mode" },
  "settings.readingModeHint": { ar: "تخطيط مريح للنصوص الطويلة", en: "Optimized for long-form text" },
  "settings.dyslexia": { ar: "خط عسر القراءة", en: "Dyslexia font" },
  "settings.dyslexiaHint": { ar: "خط متخصص أسهل في القراءة", en: "Specialized readable font" },
  "settings.reset": { ar: "إعادة تعيين الإعدادات", en: "Reset settings" },
  "nav.stage": { ar: "المرحلة", en: "Stage" },
  "nav.grades": { ar: "التقديرات", en: "Grades" },
  "nav.results": { ar: "النتائج", en: "Results" },
  "nav.calculator": { ar: "حاسبة المعدل", en: "Grade Calculator" },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "ar",
  setLang: () => {},
  t: (k) => k,
  dir: "rtl",
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem("btec-lang") as Language) || "ar";
  });

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("btec-lang", l);
  };

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
