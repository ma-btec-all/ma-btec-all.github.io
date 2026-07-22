export type CourseSectorId =
  | "it"
  | "agriculture"
  | "hospitality"
  | "business"
  | "art"
  | "construction"
  | "engineering"
  | "sports"
  | "beauty"
  | "healthcare";

export interface CourseItem {
  title: string;
  description: string;
  url?: string;
  image: string;
}

export interface CourseSector {
  id: CourseSectorId;
  name: string;
  accent: string;
  courses: CourseItem[];
}

const defaultThumb = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=900&q=80`;

export const courseSectors: CourseSector[] = [
  {
    id: "it",
    name: "تكنولوجيا المعلومات",
    accent: "174 72% 50%",
    courses: [
      {
        title: "أساسيات تكنولوجيا المعلومات",
        description: "مفاهيم الحاسوب والأنظمة والشبكات الأساسية لبناء قاعدة تقنية قوية.",
        url: "https://www.netacad.com/ar/courses/it-essentials-7?courseLang=ar-SA",
        image: defaultThumb("photo-1518770660439-4636190af475"),
      },
      {
        title: "مهارات متقدمة في Excel",
        description: "تعلم أدوات متقدمة في إكسل للتحليل والتنظيم وبناء التقارير الاحترافية.",
        url: "https://www.edraak.org/programs/course/ae101-vsp-2019/",
        image: defaultThumb("photo-1461749280684-dccba630e2f6"),
      },
      {
        title: "تحليل البيانات باستخدام Excel",
        description: "مهارات تحليل البيانات، التصور، واستخلاص المؤشرات لدعم القرار.",
        url: "https://www.edraak.org/programs/course/dae101-vt1-2021/",
        image: defaultThumb("photo-1551281044-8b77f3f0cda5"),
      },
      {
        title: "أساسيات الحاسوب (ISDL)",
        description: "مقدمة عملية في مهارات الحاسوب الأساسية والإنتاجية الرقمية.",
        url: "https://www.edraak.org/programs/course/icdl1-v2019sp/",
        image: defaultThumb("photo-1484417894907-623942c8ee29"),
      },
      {
        title: "مقدمة في SQL Server",
        description: "تعلم أساسيات قواعد البيانات العلائقية والاستعلامات في SQL Server.",
        url: "https://www.edraak.org/programs/course/sql1-v1/",
        image: defaultThumb("photo-1544383835-bda2bc66a55d"),
      },
      {
        title: "تحليل ونمذجة قواعد البيانات SQL Server",
        description: "تصميم الجداول والعلاقات وتحليل المتطلبات لبناء قواعد بيانات فعالة.",
        url: "https://www.edraak.org/programs/course/sql2-v1/",
        image: defaultThumb("photo-1518186285589-2f7649de83e0"),
      },
      {
        title: "مقدمة في الأمن السيبراني",
        description: "أساسيات حماية الأنظمة، التهديدات السيبرانية، وممارسات الأمان.",
        url: "https://www.netacad.com/courses/introduction-to-cybersecurity?courseLang=en-US",
        image: defaultThumb("photo-1550751827-4bd374c3f58b"),
      },
      {
        title: "مقدمة في الشبكات (CCNA)",
        description: "فهم بنية الشبكات، العنونة، والاتصال في مسار CCNA الأساسي.",
        url: "https://www.netacad.com/ar/courses/ccna-introduction-networks?courseLang=ar-SA",
        image: defaultThumb("photo-1510511459019-5dda7724fd87"),
      },
      {
        title: "اللغة الإنجليزية لتكنولوجيا المعلومات",
        description: "مصطلحات ومهارات لغة إنجليزية مهنية مخصصة لبيئات العمل التقنية.",
        url: "https://www.netacad.com/courses/english-for-it1?courseLang=en-US",
        image: defaultThumb("photo-1454165804606-c3d57bc86b40"),
      },
    ],
  },
  {
    id: "agriculture",
    name: "الزراعي",
    accent: "142 70% 45%",
    courses: [],
  },
  {
    id: "hospitality",
    name: "الضيافة",
    accent: "35 90% 55%",
    courses: [],
  },
  {
    id: "business",
    name: "إدارة الأعمال",
    accent: "220 70% 55%",
    courses: [
      {
        title: "تخطيط المشروع",
        description: "اكتشف مرحلة التخطيط، تحديد الموارد، وبناء الجدول الزمني للمشروع.",
        url: "https://www.edraak.org/programs/course/pm102-v1/",
        image: defaultThumb("photo-1454165804606-c3d57bc86b40"),
      },
      {
        title: "أساسيات إدارة المشروع",
        description: "ابدأ رحلتك في إدارة المشاريع عبر أدوات ومهارات أساسية عملية.",
        url: "https://www.edraak.org/programs/course/pm101-v1/",
        image: defaultThumb("photo-1522202176988-66273c2fd55f"),
      },
      {
        title: "إدارة المشروع: من التنفيذ إلى الإغلاق",
        description: "راقب الأداء والكلف والجدول الزمني وتعلم إغلاق المشروع بشكل سليم.",
        url: "https://www.edraak.org/programs/course/pm103-v1/",
        image: defaultThumb("photo-1552664730-d307ca884978"),
      },
      {
        title: "أساسيات المحاسبة لغير المحاسبين",
        description: "فهم عملي للقوائم المالية وتحليلها وفق معايير IFRS.",
        url: "https://www.edraak.org/programs/course/afna102-v2026-t3/",
        image: defaultThumb("photo-1554224155-8d04cb21cd6c"),
      },
      {
        title: "نموذج تجارة الأعمال للأعمال (B2B)",
        description: "فهم نموذج B2B وتطبيقاته في إدارة العمليات الرقمية وتكامل الأنظمة.",
        url: "https://www.edraak.org/programs/course/business_model-v1/",
        image: defaultThumb("photo-1460925895917-afdab827c52f"),
      },
      {
        title: "إدارة علاقات العملاء (CRM)",
        description: "طوّر علاقات قوية مع العملاء وارفع الكفاءة التشغيلية للمؤسسة.",
        url: "https://www.edraak.org/programs/course/crm-v1/",
        image: defaultThumb("photo-1551434678-e076c223a692"),
      },
      {
        title: "المهارات المالية الأساسية",
        description: "وعي مالي واستراتيجيات استثمار لإدارة المال وتحقيق الاستقرار المالي.",
        url: "https://www.edraak.org/programs/specialization/capitalbank-spec-v1/",
        image: defaultThumb("photo-1463320726281-696a485928c7"),
      },
      {
        title: "خطة العمل ودراسة الجدوى المالية",
        description: "اكتب خطة عمل احترافية وابنِ دراسة جدوى مالية متكاملة.",
        url: "https://www.edraak.org/programs/specialization/bp-vv2/",
        image: defaultThumb("photo-1450101499163-c8848c66ca85"),
      },
    ],
  },
  {
    id: "art",
    name: "الفن والتصميم",
    accent: "320 70% 55%",
    courses: [
      {
        title: "مقدمة في فن التصوير الفوتوغرافي",
        description: "أساسيات التصوير، الإضاءة، التكوين، والتركيز لإنتاج صور احترافية.",
        url: "https://www.edraak.org/programs/course/ip-vt3_2020/",
        image: defaultThumb("photo-1495121605193-b116b5b09a6b"),
      },
      {
        title: "تصميم الأزياء",
        description: "من مبادئ تصميم الأزياء حتى بناء ملف أعمال إبداعي قوي.",
        url: "https://www.edraak.org/programs/course/fs101-v2018-sp/",
        image: defaultThumb("photo-1490481651871-ab68de25d43d"),
      },
      {
        title: "الإنفوجرافيك المتحرك",
        description: "انتج موشن إنفوجرافيك من الفكرة حتى التنفيذ باستخدام أدوات احترافية.",
        url: "https://www.edraak.org/programs/course/mg101-v2018_t3/",
        image: defaultThumb("photo-1460661419201-fd4cecdf8a8b"),
      },
      {
        title: "تصميم المنتجات في الحرف التقليدية",
        description: "تعرف كيف تُطوّر المنتجات الحرفية وتحافظ على استدامة الحِرف.",
        url: "https://www.edraak.org/programs/course/tcpd-v1/",
        image: defaultThumb("photo-1513364776144-60967b0f800f"),
      },
      {
        title: "مقدمة في الفن الإسلامي",
        description: "استكشف مفاهيم الفن الإسلامي وعناصره الزخرفية والهندسية والخطية.",
        url: "https://www.edraak.org/programs/course/iis-vt3_2020/",
        image: defaultThumb("photo-1455390582262-044cdead277a"),
      },
      {
        title: "فن طي الورق الياباني",
        description: "الأوريغامي والكويلينغ لتصاميم ورقية مبتكرة وأنشطة عملية ممتعة.",
        url: "https://www.edraak.org/programs/course/pa-v2018_t2/",
        image: defaultThumb("photo-1456324504439-367cee3b3c32"),
      },
    ],
  },
  {
    id: "construction",
    name: "البناء والإنشاء",
    accent: "25 80% 50%",
    courses: [],
  },
  {
    id: "engineering",
    name: "الهندسة",
    accent: "200 70% 50%",
    courses: [
      {
        title: "الرسم الهندسي باستخدام AutoCAD",
        description: "تعلم أساسيات الرسم الهندسي ثنائي وثلاثي الأبعاد على AutoCAD.",
        url: "https://www.m3aarf.com/lesson/5954-video",
        image: defaultThumb("photo-1503387762-592deb58ef4e"),
      },
      {
        title: "التصميم الميكانيكي SolidWorks",
        description: "تصميم القطع والتجميعات الميكانيكية باستخدام SolidWorks.",
        url: "https://www.m3aarf.com/lesson/3227-video",
        image: defaultThumb("photo-1581093804475-577d72e13f0d"),
      },
      {
        title: "هندسة كهربائية",
        description: "مفاهيم أساسية في الدوائر والأنظمة الكهربائية.",
        url: "https://www.m3aarf.com/lesson/4364-video",
        image: defaultThumb("photo-1473341304170-971dccb5ac1e"),
      },
      {
        title: "ميكانيكا السيارات من البداية",
        description: "مدخل عملي لفهم الأنظمة الأساسية في المركبات وصيانتها.",
        url: "https://www.m3aarf.com/lesson/132938-video",
        image: defaultThumb("photo-1487754180451-c456f719a1fc"),
      },
      {
        title: "التصميم المعماري SketchUp",
        description: "نمذجة تصميمات معمارية بشكل سريع واحترافي باستخدام SketchUp.",
        url: "https://www.m3aarf.com/lesson/3210-video",
        image: defaultThumb("photo-1501594907352-04cda38ebc29"),
      },
      {
        title: "Programmable Logic Controller (PLC)",
        description: "أساسيات التحكم الصناعي المنطقي القابل للبرمجة.",
        url: "https://www.m3aarf.com/lesson/43395-video",
        image: defaultThumb("photo-1563770660941-20978e870e26"),
      },
      {
        title: "تقنيات الأنظمة المدمجة",
        description: "مقدمة في تصميم الأنظمة المدمجة وتطبيقاتها الصناعية.",
        url: "https://www.m3aarf.com/lesson/3268-video",
        image: defaultThumb("photo-1518773553398-650c184e0bb3"),
      },
      {
        title: "نظام التحكم الآلي",
        description: "تعلم مفاهيم التحكم الآلي وسلوك الأنظمة الديناميكية.",
        url: "https://www.m3aarf.com/lesson/43538-video",
        image: defaultThumb("photo-1581092921461-eab62e97a780"),
      },
    ],
  },
  {
    id: "sports",
    name: "الرياضة",
    accent: "0 75% 55%",
    courses: [
      {
        title: "أساسيات ممارسة الرياضة في المنزل والنادي",
        description: "لياقة، تغذية، وتمارين عملية لبناء نمط حياة صحي مستدام.",
        url: "https://www.edraak.org/programs/course/fitness-v2018sp/",
        image: defaultThumb("photo-1517836357463-d25dfeac3438"),
      },
    ],
  },
  {
    id: "beauty",
    name: "التجميل",
    accent: "340 75% 60%",
    courses: [],
  },
  {
    id: "healthcare",
    name: "الرعاية الصحية",
    accent: "155 70% 48%",
    courses: [],
  },
];
