import {
  BookOpenCheck,
  ClipboardCheck,
  Clock3,
  Target,
  BrainCircuit,
  NotebookTabs,
  MessageSquareMore,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface AdviceCardItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: LucideIcon;
}

export const adviceGuideItems: AdviceCardItem[] = [
  {
    id: "study-tips",
    titleAr: "نصائح للدراسة",
    titleEn: "Study Tips",
    descriptionAr: "خطوات عملية لتحسين الفهم، تثبيت المعلومات، وبناء روتين دراسة فعال.",
    descriptionEn: "Practical guidance for stronger understanding, retention, and study habits.",
    icon: BookOpenCheck,
  },
  {
    id: "exam-instructions",
    titleAr: "إرشادات الاختبارات",
    titleEn: "Exam Instructions",
    descriptionAr: "تعليمات مهمة قبل الاختبار وأثناءه لتقليل التوتر وتحسين الأداء.",
    descriptionEn: "Clear instructions before and during exams to reduce stress and improve performance.",
    icon: ClipboardCheck,
  },
  {
    id: "time-management",
    titleAr: "تنظيم الوقت",
    titleEn: "Time Management",
    descriptionAr: "أساليب ذكية لتوزيع الوقت بين الدراسة، المراجعة، والواجبات اليومية.",
    descriptionEn: "Smart ways to balance study time, revision, and daily responsibilities.",
    icon: Clock3,
  },
  {
    id: "goal-setting",
    titleAr: "تحديد الأهداف",
    titleEn: "Goal Setting",
    descriptionAr: "حوّل أهدافك الدراسية إلى خطوات واضحة قابلة للقياس والمتابعة.",
    descriptionEn: "Turn academic goals into clear, measurable steps you can track.",
    icon: Target,
  },
  {
    id: "focus-skills",
    titleAr: "مهارات التركيز",
    titleEn: "Focus Skills",
    descriptionAr: "تعلم كيف تقلل المشتتات وتحافظ على تركيز عالٍ أثناء الدراسة.",
    descriptionEn: "Learn how to reduce distractions and stay focused while studying.",
    icon: BrainCircuit,
  },
  {
    id: "assignment-guidance",
    titleAr: "إرشادات المهمات",
    titleEn: "Assignment Guidance",
    descriptionAr: "نصائح تساعدك على فهم المطلوب وتنظيم إنجاز المهمات بجودة أعلى.",
    descriptionEn: "Helpful advice for understanding requirements and completing assignments better.",
    icon: NotebookTabs,
  },
  {
    id: "communication",
    titleAr: "التواصل مع المعلم",
    titleEn: "Teacher Communication",
    descriptionAr: "أفضل الممارسات لطرح الأسئلة وطلب المساعدة والمتابعة الأكاديمية.",
    descriptionEn: "Best practices for asking questions, requesting help, and staying connected academically.",
    icon: MessageSquareMore,
  },
  {
    id: "academic-integrity",
    titleAr: "النزاهة الأكاديمية",
    titleEn: "Academic Integrity",
    descriptionAr: "إرشادات لتجنب الغش والسرقة الأدبية والمحافظة على أصالة العمل.",
    descriptionEn: "Guidelines to avoid cheating and plagiarism while keeping work authentic.",
    icon: ShieldCheck,
  },
  {
    id: "motivation",
    titleAr: "التحفيز والاستمرارية",
    titleEn: "Motivation & Consistency",
    descriptionAr: "حافظ على دافعك الدراسي بخطوات صغيرة ثابتة تبني نتائج كبيرة.",
    descriptionEn: "Stay motivated with small, consistent steps that lead to bigger results.",
    icon: Sparkles,
  },
];
