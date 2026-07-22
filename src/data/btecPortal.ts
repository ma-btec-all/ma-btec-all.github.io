import type { LucideIcon } from "lucide-react";
import {
  Laptop,
  Cog,
  HardHat,
  Clapperboard,
  Plane,
  Sparkles,
  Sprout,
  UtensilsCrossed,
  Briefcase,
  Palette,
} from "lucide-react";

export type BtecPathwayId =
  | "it"
  | "engineering"
  | "construction"
  | "creative-media"
  | "tourism"
  | "beauty"
  | "agriculture"
  | "hospitality"
  | "business"
  | "art";

export type BtecGradeId = "g10" | "g11" | "g12";

export interface BtecPathway {
  id: BtecPathwayId;
  titleAr: string;
  titleEn: string;
  icon: LucideIcon;
  accentHsl: string;
  glhLabel?: string;
  focus: string[];
  studyFields: string[];
  careerOpportunities: string[];
  studyPlan: {
    g10: string[];
    g11: string[];
    g12: string[];
  };
}

export const afterNinthTracks = [
  {
    id: "academic",
    title: "المسار الأكاديمي",
    description:
      "يُركز على التخصصات النظرية والعلمية والتقدم لامتحان الثانوية العامة (الوطني) وفق الخطة المعتمدة.",
  },
  {
    id: "vocational",
    title: "المسار المهني والتقني (BTEC)",
    description:
      "تعليم قائم على المهارات والكفايات عبر مشاريع ومهمات عملية لمدة 3 سنوات تبدأ من الصف العاشر، مع مسارات تخصصية متعددة.",
  },
];

export const btecQuickFacts = [
  { label: "نظام عالمي", value: "معتمد في 70 دولة" },
  { label: "مدة البرنامج", value: "3 سنوات (10-12)" },
  { label: "الطريقة", value: "مشاريع ومهمات (Competency-based)" },
  { label: "الشهادات", value: "مدرسية + BTEC + وطني (اختياري)" },
];

export const btecCertificates = [
  "شهادة مدرسية",
  "شهادة بعد استكمال متطلبات برنامج التعليم المهني (BTEC)",
  "شهادة الثانوية العامة (الوطني) لمن استكمل متطلبات دراستها وتقدم للامتحان",
];

export const btecHours = [
  { grade: "الصف العاشر", total: "480 ساعة دراسية وتدريبية", level: "المستوى حسب المؤهلات: الثاني" },
  { grade: "الصف الحادي عشر", total: "360 ساعة تدريبية", level: "المستوى حسب المؤهلات: الثالث" },
  { grade: "الصف الثاني عشر", total: "360 ساعة تدريبية", level: "المستوى حسب المؤهلات: الثالث" },
];

export const g10CoreSubjects = [
  "تربية إسلامية",
  "لغة عربية",
  "لغة إنجليزية",
  "لغة إنجليزية وظيفية",
  "تربية وطنية",
  "مهارات رقمية",
  "تربية رياضية",
];

export const g10HospitalityExtra = ["لغة فرنسية للفندقي"];

export const btecWeeklyPlan = {
  g10: {
    title: "الصف العاشر (إجمالي 35 حصة)",
    items: [
      { name: "عملي BTEC", count: 20 },
      { name: "تربية إسلامية", count: 2 },
      { name: "لغة عربية", count: 2 },
      { name: "لغة إنجليزية", count: 2 },
      { name: "تربية وطنية", count: 1 },
      { name: "لغة إنجليزية وظيفية", count: 2 },
      { name: "لغة فرنسية للفندقي", count: 3 },
      { name: "مهارات رقمية", count: 2 },
      { name: "تربية رياضية", count: 1 },
    ],
  },
  g11: {
    title: "الصف الحادي عشر (إجمالي 34 حصة)",
    items: [
      { name: "عملي BTEC", count: 15 },
      { name: "تربية إسلامية", count: 3 },
      { name: "لغة عربية", count: 3 },
      { name: "لغة إنجليزية", count: 3 },
      { name: "تاريخ الأردن", count: 2 },
      { name: "مهارات رقمية", count: 2 },
      { name: "لغة إنجليزية وظيفية", count: 2 },
      { name: "تربية رياضية", count: 1 },
      { name: "لغة فرنسية للفندقي", count: 3 },
    ],
  },
  g12: {
    title: "الصف الثاني عشر (إجمالي 34 حصة)",
    items: [
      { name: "عملي BTEC", count: 15 },
      { name: "تربية إسلامية", count: 3 },
      { name: "لغة عربية", count: 3 },
      { name: "لغة إنجليزية", count: 3 },
      { name: "تاريخ الأردن", count: 2 },
      { name: "مهارات رقمية", count: 2 },
      { name: "لغة إنجليزية وظيفية", count: 2 },
      { name: "تربية رياضية", count: 1 },
      { name: "لغة فرنسية للفندقي", count: 3 },
    ],
  },
} as const;

export const gradingSystem = [
  {
    code: "P",
    label: "Pass (ناجح)",
    weight: "60%",
    description: "تحقيق معايير النجاح الأساسية (غالباً الأصعب).",
  },
  {
    code: "M",
    label: "Merit (متفوق)",
    weight: "80%",
    description: "تحليل ومقارنة وتوسيع ما تم في معيار النجاح.",
  },
  {
    code: "D",
    label: "Distinction (متميز)",
    weight: "100%",
    description: "تقييم معمّق وشروط محددة بعد إتقان P وM.",
  },
];

export const assessmentTeam = [
  {
    code: "Assessor",
    title: "المعلم/المدرب",
    summary:
      "يوزع المهام ويستلمها، يصحح أولياً ويقدم تغذية راجعة، وينسق فرص إعادة التقديم قبل رفع العلامات.",
  },
  {
    code: "IV",
    title: "Internal Verifier (المدقق الداخلي)",
    summary: "يدقق قرارات التصحيح ويتأكد من تطبيق المعايير ويشارك نموذج التدقيق مع المدرس.",
  },
  {
    code: "QN",
    title: "QUALITY Nominee (ضابط الجودة)",
    summary: "يتأكد من مطابقة شروط ومعايير ضبط الجودة داخل المدرسة لعملية التدقيق والتصحيح.",
  },
  {
    code: "SV",
    title: "Standard Verifier (المدقق الخارجي)",
    summary:
      "مدقق من Pearson يزور المدارس للتأكد من المعايير واعتماد التقييم تمهيداً لإصدار الشهادة.",
  },
];

export const btecPathways: BtecPathway[] = [
  {
    id: "it",
    titleAr: "تكنولوجيا المعلومات",
    titleEn: "Information Technology",
    icon: Laptop,
    accentHsl: "174 72% 50%",
    glhLabel: "480 GLH (G10)",
    focus: ["Software", "Cybersecurity", "AI"],
    studyFields: [
      "هندسة البرمجيات",
      "الأمن السيبراني",
      "الذكاء الاصطناعي والروبوتات",
      "تكنولوجيا المعلومات",
      "نظم المعلومات",
      "علم البيانات",
    ],
    careerOpportunities: ["مطور برمجيات", "فني دعم تقني", "محلل بيانات", "مختص أمن سيبراني (مستقبلاً)"],
    studyPlan: {
      g10: ["أساسيات البرمجة", "شبكات الحاسوب", "مشاريع رقمية عملية (GLH 480)"],
      g11: ["تطوير الويب/التطبيقات", "أنظمة المعلومات", "مهارات توثيق وتقارير"],
      g12: ["مشروع تخرج/حلول", "سيبراني/ذكاء اصطناعي", "إدارة مشروع تقني"],
    },
  },
  {
    id: "engineering",
    titleAr: "الهندسة",
    titleEn: "Engineering",
    icon: Cog,
    accentHsl: "200 70% 50%",
    focus: ["Safety", "Math", "Python", "Mechanical Science"],
    studyFields: [
      "الهندسة الكهربائية والإلكترونية",
      "الهندسة الميكانيكية",
      "الميكاترونيكس",
      "هندسة التحكم والأتمتة",
      "هندسة التصنيع",
    ],
    careerOpportunities: ["فني صيانة", "مساعد مهندس", "تشغيل معدات/ورش", "تصنيع وإنتاج"],
    studyPlan: {
      g10: ["السلامة والعمل في الورش", "الرياضيات للفني", "البرمجة العامة (Python)"],
      g11: ["المبادئ الميكانيكية", "المبادئ الكهربائية والإلكترونية", "تقديم العمليات بأمان كفريق"],
      g12: ["مسارات فرعية (كهرباء/ميكانيك/مركبات)", "تصميم وتصنيع", "مشاريع تطبيقية متقدمة"],
    },
  },
  {
    id: "construction",
    titleAr: "البناء والإنشاءات",
    titleEn: "Construction",
    icon: HardHat,
    accentHsl: "25 80% 50%",
    focus: ["Architecture", "Civil", "HVAC", "Surveying"],
    studyFields: ["هندسة مدنية", "تقنيات العمارة", "خدمات المباني (HVAC/كهرباء)", "المساحة", "إدارة البناء"],
    careerOpportunities: ["مسّاح", "فني مواقع", "مساعد مهندس مدني", "مراقب جودة/سلامة"],
    studyPlan: {
      g10: ["مبادئ الرسم والقراءة الهندسية", "مواد البناء", "سلامة مواقع العمل"],
      g11: ["تقنيات العمارة", "أساسيات هندسة مدنية", "مشروع تخطيط/تنفيذ"],
      g12: ["HVAC وخدمات المباني", "مساحة متقدمة", "مشروع تطبيقي (Site)"],
    },
  },
  {
    id: "creative-media",
    titleAr: "الوسائط الإبداعية",
    titleEn: "Creative Media",
    icon: Clapperboard,
    accentHsl: "264 70% 60%",
    focus: ["Audio", "Film", "VFX", "Game Dev", "Web"],
    studyFields: ["إنتاج صوتي", "أفلام وتلفاز", "صحافة رقمية", "تطوير الويب/التطبيقات", "رسوم متحركة وتأثيرات"],
    careerOpportunities: ["مونتير", "مصمم موشن", "منتج محتوى", "مطور ألعاب (مستقبلاً)"],
    studyPlan: {
      g10: ["أساسيات السرد البصري", "إنتاج صوتي/فيديو", "مشروع محتوى قصير"],
      g11: ["تصوير وإضاءة", "مونتاج", "موشن/جرافيك"],
      g12: ["VFX", "تطوير ألعاب/تجربة تفاعلية", "مشروع تخرج (Portfolio)"],
    },
  },
  {
    id: "tourism",
    titleAr: "السياحة والسفر",
    titleEn: "Travel & Tourism",
    icon: Plane,
    accentHsl: "190 80% 42%",
    focus: ["Flight booking", "Heritage", "Events"],
    studyFields: [
      "حجوزات وخدمات المسافرين",
      "تنظيم الرحلات",
      "الثقافة والتراث",
      "الندوات والمعارض والمهرجانات",
      "إدارة الاستدامة",
    ],
    careerOpportunities: ["موظف حجوزات", "منظم رحلات", "مرشد سياحي (مستقبلاً)", "تنظيم فعاليات"],
    studyPlan: {
      g10: ["مقدمة في قطاع السياحة", "مهارات خدمة العملاء", "مشروع تنظيم رحلة"],
      g11: ["إدارة مناسبات", "عمليات الجولات", "تراث وثقافة"],
      g12: ["ابتكار سياحي", "استدامة", "مشروع تخرج (Event/Travel)"],
    },
  },
  {
    id: "beauty",
    titleAr: "الشعر والتجميل",
    titleEn: "Hair & Beauty",
    icon: Sparkles,
    accentHsl: "340 75% 60%",
    focus: ["Skin science", "Hair", "Business projects"],
    studyFields: ["علوم البشرة", "تصفيف الشعر", "مستحضرات التجميل", "مشاريع أعمال وإدارة صالون"],
    careerOpportunities: ["مصفف/ة شعر", "خبير/ة عناية بالبشرة", "إدارة صالون", "استشارات تجميل"],
    studyPlan: {
      g10: ["أساسيات العناية", "سلامة ونظافة", "مشروع خدمات"],
      g11: ["تقنيات متقدمة", "خدمة العملاء", "بناء Portfolio"],
      g12: ["مشروع أعمال", "إدارة وتشغيل", "تخصص دقيق حسب الاهتمام"],
    },
  },
  {
    id: "agriculture",
    titleAr: "الزراعي",
    titleEn: "Agriculture",
    icon: Sprout,
    accentHsl: "142 70% 45%",
    focus: ["Animal/Plant Biology", "Crops", "Sustainability"],
    studyFields: ["الإنتاج النباتي", "الإنتاج الحيواني", "إدارة الأعمال الزراعية", "استدامة", "وقاية النبات"],
    careerOpportunities: ["فني زراعة", "مشرف مزرعة", "إنتاج محاصيل", "مشاريع زراعة ذكية"],
    studyPlan: {
      g10: ["أحياء نبات/حيوان", "تربة ومياه", "مشروع محاصيل"],
      g11: ["إنتاج محاصيل", "إنتاج حيواني", "ممارسات زراعة مستدامة"],
      g12: ["إدارة أعمال زراعية", "زراعة ذكية", "مشروع تخرج (Sustainability)"],
    },
  },
  {
    id: "hospitality",
    titleAr: "الضيافة",
    titleEn: "Hospitality",
    icon: UtensilsCrossed,
    accentHsl: "35 90% 55%",
    focus: ["Culinary", "Hotel", "Barista"],
    studyFields: ["إدارة الفنادق", "فنون الطهي", "الطعام والشراب", "الإقامة والإيرادات", "مناسبات وتسويق"],
    careerOpportunities: ["فني مطبخ", "موظف استقبال", "مشرف أغذية ومشروبات", "بارستا"],
    studyPlan: {
      g10: ["التعريف بقطاع الضيافة", "خدمة العملاء", "إعداد الطعام"],
      g11: ["الإشراف على الأغذية", "مكاتب الاستقبال", "استدامة"],
      g12: ["قيادة وإشراف", "سلامة الغذاء", "مراقبة تكاليف"],
    },
  },
  {
    id: "business",
    titleAr: "الأعمال",
    titleEn: "Business",
    icon: Briefcase,
    accentHsl: "220 70% 55%",
    focus: ["Marketing", "HR", "Finance"],
    studyFields: ["إدارة الأعمال", "التسويق", "الموارد البشرية", "المحاسبة والتمويل", "الريادة"],
    careerOpportunities: ["مساعد إداري", "مساعد محاسب", "تسويق/مبيعات", "ريادة أعمال"],
    studyPlan: {
      g10: ["أساسيات الأعمال", "تسويق", "مهارات فريق"],
      g11: ["استكشاف الأعمال", "تمويل", "خدمة العملاء"],
      g12: ["إدارة", "قرارات أعمال", "أخلاقيات/مشروع"],
    },
  },
  {
    id: "art",
    titleAr: "الفن والتصميم",
    titleEn: "Art & Design",
    icon: Palette,
    accentHsl: "320 70% 55%",
    focus: ["Graphic", "Fashion", "3D", "Digital"],
    studyFields: ["التصميم الجرافيكي", "التصميم الرقمي", "الأزياء", "تصميم ثلاثي الأبعاد", "التصوير"],
    careerOpportunities: ["مصمم جرافيك", "مصمم محتوى", "مصور", "موشن/ديجيتال"],
    studyPlan: {
      g10: ["مبادئ الفن والتصميم", "التواصل البصري", "مشروع موجز"],
      g11: ["بناء Portfolio", "أزياء/منسوجات", "بحث عملي"],
      g12: ["مشروع تخرج", "هوية بصرية", "تخصص دقيق"],
    },
  },
];

