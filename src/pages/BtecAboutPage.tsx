import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Clock3,
  BadgeCheck,
  UsersRound,
  CheckCircle2,
  Building2,
  ArrowUpRight,
  X,
  Maximize2,
  ChevronDown,
  BookOpen,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import PathwayDetailModal from "@/components/PathwayDetailModal";
import type { BtecPathway } from "@/data/btecPortal";
import {
  afterNinthTracks,
  btecQuickFacts,
  btecCertificates,
  btecHours,
  gradingSystem,
  assessmentTeam,
  btecPathways,
  btecWeeklyPlan,
  g10CoreSubjects,
  g10HospitalityExtra,
} from "@/data/btecPortal";

const Glass = ({ children }: { children: React.ReactNode }) => (
  <div
    className="rounded-[28px] border p-6 backdrop-blur-2xl"
    style={{
      background: "rgba(10, 14, 28, 0.52)",
      borderColor: "rgba(255,255,255,0.10)",
      boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
    }}
  >
    {children}
  </div>
);

type DocSection = { title: string; content: string };

const officialDocSections: DocSection[] = [
  {
    title: "التقييم والتقدير (Grading) مقابل العلامات (Marking)",
    content:
      'على الرغم من استخدام مصطلحات "التقدير" و"العلامات" بشكل متبادل، إلا أن لديهما معانٍ مختلفة؛ حيث إن العلامات تشمل تقدير الأداء باستخدام أرقام والإشارة إلى مستويات الإنجاز في المهام الفردية. أما التقدير، فيستخدم مجموعة من الإنجازات مثل النجاح (Pass)، درجة التفوق (Merit)، ودرجة التميز (Distinction) للإشارة إلى دلائل التعلم فيما يتعلق بهدف تعلم أو بوحدات كاملة أو مؤهلات، ويتم تحويل نتائج التقدير غالبًا من العلامات إلى درجات.\n\nفي البرامج المهنية BTEC، يتم استخدام التقدير عبر مستويات التقييم حيث يُمنح الطلبة درجة النجاح (Pass)، درجة التفوق (Merit)، ودرجة التميز (Distinction) لنتائج التعلم الفردية، ووحدات التعلم بأكملها، والمؤهلات الكلية. هذا النهج يعزز توحيد التقييم، متوافقًا مع مستويات الإنجاز المحددة بوضوح في مواصفات البرنامج.\n\n• سيتم حساب معدلات الطلبة في نهاية السنة الدراسية للمستوى الثاني على أن: P=60, M=80, D=100.\n• أما بالنسبة لطلاب المستوى الثالث، فسيتم الإعلان عن آلية حساب معدلات الطلبة لاحقًا.',
  },
  {
    title: "التقييم ونتائج التعلم (Assessment & Learning Aims)",
    content:
      "• نتائج التعلم (Learning Outcomes): تحدد نتائج التعلم أهداف الطلبة في الوحدة أو النشاط، مما يعزز تركيزهم على إنجاز محدد وتحديد أسس واضحة للتقييم. تصف نتائج التعلم المهارات والمعارف التقنية التي يجب أن يظهرها الطلبة بعد الانتهاء من تعلم برنامج معين.\n\n• الأهداف التعليمية (Learning Objective): تحتوي كل وحدة في نظام BTEC على 2-4 أهداف تعليمية (بالاعتماد على مستوى المؤهل) توفر مؤشرات واضحة على القدرات ومجالات المعرفة والمهارات المستهدفة.\n\n• معايير التقييم (Assessment Criteria): تهدف إلى تحديد مستوى تحقيق الأهداف التعليمية. بالنسبة لكل هدف تعليمي في البرامج المهنية BTEC، تحدد معايير التقييم متطلبات النجاح (Pass)، درجة التفوق (Merit)، ودرجة التميز (Distinction)، ويساعد هذا على توحيد التقييم.",
  },
  {
    title: "المهارات المستهدفة في التقييم (CAP Skills)",
    content:
      "تركز برامج BTEC على تطوير مهارات على مستوى عالٍ تشمل المهارات التقنية والمهارات القابلة للنقل والتوظيف المستقبلي. تُركز برامج BTEC على مهارات CAP التي تشمل المجالات التالية:\n\n• المعرفية (Cognitive) - الفهم والتحليل: تنطوي على إظهار الفهم، والتحليل، والتقييم، والتطبيق، والتوليف للموضوع المعني. تشمل هذه المهارات القدرة على فهم المفاهيم وتحليلها، وتقييم الأفكار والمعلومات، وتطبيقها في سياقات مختلفة وتجميعها لإنتاج فهم شامل وجديد.\n\n• العاطفيّة (Affective) - السلوكيات: تحفّز التفكير في الآراء الشخصية والمجتمعية، مما يشجع على نمو السلوكيات ذات الصلة سواء في الأمور الأكاديمية أو في مجال العمل. تعمل هذه المهارات على تطوير الوعي بالذات، وتعزيز القدرة على التعامل مع الآخرين بشكل إيجابي، وتطوير التواصل الفعّال والعمل الجماعي.\n\n• الحركية (Psychomotor) - التعامل مع الأدوات والاتصال: تتجاوز التعامل مع الأدوات لتشمل القدرة على التواصل الفعّال للموضوعات المعقدة. يقدّم الطلاب دليلاً على ذلك من خلال أنشطة مثل إعداد التقارير أو تقديم العروض المرئية والسمعية.",
  },
  {
    title: "خصائص التقييم والتقييم الشامل (Holistic Assessment)",
    content:
      "خصائص التقييم الأساسية:\n• الصلاحية (Validity): الأدلة ترتبط مباشرة بنتائج التعلم وتظهر المهارات والمعرفة المطلوبة.\n• الكفاية (Sufficiency): الحرص على تدريس محتوى كافٍ للحصول على تقييم واضح وشامل لأداء الطالب.\n• الموثوقية (Authenticity): الحرص على التأكد من أن العمل المقدّم هو من العمل والفهم الشخصي للطالب.\n\nالتقييم الشامل – Holistic Assessment:\nتهدف برامج BTEC إلى إعداد الطلاب للانخراط في سوق العمل مباشرة عبر نهج شامل يعزّز التعلم والتدريس والتقييم الشامل ككل وليس في أجزاء معزولة. يشجع التقييم الشامل الطلاب على التعرف على كيفية ترابط مختلف النظريات والمفاهيم والمهارات المرتبطة بموضوع معين، مما يعزّز الفهم العميق المترابط للتطبيق العملي.\n\nأشكال التقييم الشامل (Forms of Holistic Assessment):\n1. التقييم لوحدة واحدة (Single Unit): يقوم بتقييم جميع نتائج التعلم للوحدة معًا، مما يعزز الفهم لكيفية تداخل جوانب التعلم المختلفة.\n2. تقييم الوحدة المتدرج (Staged): يقوم بتقييم نتائج التعلم لوحدة واحدة من خلال مهام متعددة بتسلسل معين (التوقيت السليم والانسجام مع تقديم المنهج مهمان للنجاح).\n3. التقييم المتكامل (Integrated): يشمل التقييم عبر وحدات متعددة، ويشجع على التفكير الشامل وربط المعرفة والمهارات من تجارب متنوعة.",
  },
  {
    title: "خطة التقييم (Assessment Plan) وتخطيط التقييم الفعّال",
    content:
      "تعد خطة التقييم وثيقة مهمة تضمن التخطيط الفعال لبرنامج BTEC. يجب إعدادها في بداية كل سنة دراسية واستخدامها من قبل فريق التنفيذ والتحقق الداخلي. توضح خطة التقييم الوحدات/المكونات التي سيتم تقييمها، وتحدد مواعيد إجراء التقييم والتحقق الداخلي. يجب على ضابط الجودة التعاون مع المقيمين والمدققين الداخليين للاتفاق على مواعيد التقييم والتحقق لجميع الوحدات المطروحة، وهو مسؤول عن ضمان ملاءمة الخطة للغرض المراد منها واستيفائها للمتطلبات التنظيمية قبل اعتمادها.\n\nركائز تخطيط التقييم الفعّال:\n• يجب أن يتماشى تخطيط التقييم مع أهداف البرنامج والوحدات الكلية ومخرجات الوحدة.\n• التعاون بين المعلمين في تصميم وجدولة الواجبات والمهام التقييمية.\n• توفير جدول تقييم واضح للطلاب بهدف مساعدتهم في إدارة وقتهم بفعالية.",
  },
  {
    title: "التدقيق الداخلي (Internal Verification) ومراحله",
    content:
      "يعد التحقق الداخلي جزءًا أساسيًا من عملية ضمان جودة في البرنامج الدولي التقني المهني لضمان تقييم الطلبة بدقة وفقًا للمعايير الوطنية. (لا يستطيع المعلمون القيام بتدقيق موجزات المهام أو قرارات التقييم خاصتهم). وهو نظام يضمن: دقة وصحة موجزات المهمة، دقة وفعالية عملية التقييم والتغذية الراجعة، تحديد مجالات التطوير للمقيم، وتحسين جودة عمليات التدريب.\n\nمراحل عملية التدقيق الداخلي الأساسية:\n• المرحلة الأولى: تدقيق موجز المهمة (Assignment Brief Internal Verification): يتم من خلالها تدقيق موجز المهمة والتأكد من صحتها والامتثال والتوجيه، ويتم الانتهاء منه قبل تقديم الواجبات للطلاب. (في حال استخدام موجزات المهام المصرح بها مباشرة دون تعديل، يتم التحقق داخلياً لضبط التواريخ والمواعيد وتعبئة النموذج. وإذا تم تعديل السيناريو أو المهام، يلزم التحقق منها داخلياً بالكامل).\n• المرحلة الثانية: التحقق من قرارات التقييم (Assessment Decision Internal Verification): يتم بعد التقييم عبر أخذ عينات من نتائج التقييم والتغذية الراجعة لضمان الجودة والاتساق، ويتم الانتهاء منه قبل نشر نتائج التقييم للطلاب.\n\nضوابط ومعايير التدقيق الداخلي:\n• يتم تنفيذه من قبل المتخصصين في المركز (المعلم والمدقق الداخلي، وليس الطلبة) لدعم الامتثال والتحسين المستمر.\n• يجب أن يتوافق مع سياسات المركز ويتم تخطيطه وإدارته بشكل منهجي.\n• الاحتفاظ بجميع النماذج والسجلات والسجلات المؤرشفة لمدة 3 سنوات بعد تاريخ الشهادة (ورقيًا وإلكترونيًا).\n• الحفاظ على الموضوعية والعدالة عند تقييم جميع الطلبة وألا تؤخذ الملاحظات بشكل شخصي.",
  },
  {
    title: "أسس نجاح التدقيق الداخلي والتوحيد القياسي (Standardization)",
    content:
      "بما أن المهام والتقييم يتم تسليمها من قبل أكثر من شخص في المركز (المعلم والمدقق الداخلي)، يجب إجراء التوحيد لجميع المقاييس والمعايير قبل إجراء أي تقييم رسمي والتدقيق الداخلي.\n\nتتمثل عملية التوحيد المعياري والقياسي (Assessment Standardization) لعمل الطلبة من خلال مناقشة عينة من عمل الطلبة وتقييمها بشكل متبادل للوصول إلى توافق في الآراء بالرجوع إلى معايير وإرشادات التقييم المقدمة من بيرسون، بعد ذلك يتمكن المقيم من تقييم عمل الطلبة بشكل فردي ثم إجراء التدقيق الداخلي.\n\nأسس نجاح عملية التدقيق الداخلي في المركز:\n• وجود مدير برنامج للإشراف على ضمان الجودة لهذا الموضوع.\n• فريق معترف به من المدققين الداخليين يجتمعون بانتظام لضمان توحيد الإجراءات.\n• سياسة تدقيق داخلية تعزز الالتزام الصارم بتحسين الجودة.\n• اتباع نهج قائم على المخاطر (مقيم جديد أو مركز جديد) لتخطيط التدقيق الداخلي.\n• فهم واضح لعمليات التدقيق من قبل جميع الموظفين الذين يقومون بتسليم وتقييم البرنامج.\n• مراقبة العمليات على مستوى المركز من قبل قسم الجودة ومدير البرنامج.\n• قيام المركز بأخذ عينات عشوائية من مهام الطلبة لضمان مطابقة التصحيح للمعايير بعدالة.",
  },
  {
    title: "التدقيق الخارجي (External Standard Verified) وضوابطه",
    content:
      "تتحقق بيرسون من أن المراكز تعمل ضمن معايير ضمان الجودة المناسبة المتوافقة مع المعايير الوطنية لضمان موثوقية التقييم في جميع مراكز BTEC وتحقيق مراجعة شاملة، والتشجيع على تقديم أفضل الممارسات.\n\nالغرض من التدقيق الخارجي:\n• يأذن باستمرار إعطاء البرنامج وبشهادة المتعلمين ويقدم الدعم للمراكز.\n• يضمن تقييم برامج BTEC وفقًا للمعايير الدولية المطلوبة لضمان حصول المتعلمين على الدرجات التي يستحقونها.\n• يقوم المفتشون الخارجيون (EE or SV) بمراجعة الوثائق المتعلقة بالتحقق الداخلي للتأكد من تطبيق السياسات، ويزورون المراكز بشكل منتظم للتأكد من سير العمل ومستوى جودة التعليم.",
  },
  {
    title: "قوانين مجلد التخزين (Storage Folder) والتوثيق الرقمي",
    content:
      "• يجب أن تكون ملفات الطلبة مدرجة في الملف الخاص لكل طالب/ة حسب الدليل المطلوب في الواجب (بصيغة Word أو PowerPoint – وليس PDF نهائياً)، ما عدا مستند توقيع الطلبة الممسوح ضوئياً.\n• يجب تنظيم مجلّد التخزين (storage folder) بدقة حسب الطريقة الموجودة بالفيديو التعليمي الذي تم إرساله لضابط الجودة، ومنح صلاحية الوصول الكاملة للمدقق الخارجي في حال طلبها.\n• يجب تسمية الملفات بمسمياتها المعتمدة باللغة الإنجليزية كاملة وبشكل رسمي كما وردت من الوزارة عند توزيع الواجبات ومرفقاتها، والامتناع تماماً عن تغيير أو اختصار هذه المسميات.\n• الالتزام التام بمواعيد خطة التقييم (Assessment Plan) للفترتين الأولى والثانية مع تعبئة بيانات المقيم والمدقق الداخلي عليها كاملة عدداً ورقمًا، وإدراجها على جميع المستندات الخاصة بجميع الوحدات الدراسية.",
  },
  {
    title: "مسؤوليات ضابط الجودة الإضافية في المدرسة",
    content:
      "إلى جانب المهام التنظيمية العامة، يتولى ضابط الجودة في المدرسة المسؤوليات الصارمة التالية:\n\n• تنظيم مجلّد التخزين (Storage Folder) بالكامل وتهيئته للمدقق الخارجي.\n• الالتزام بتسمية الملفات المعتمدة باللغة الإنجليزية دون أي تعديل أو تغيير.\n• ضرورة متابعة العمل والتقيد التام بالمواعيد المحددة عند توزيع المهام والوحدات.\n• متابعة تنفيذ الواجبات من قبل المعلمين مع الطلبة، والتشديد الصارم على عدم غياب الطلبة من خلال التواصل المباشر مع أولياء الأمور وإبلاغهم بمواعيد تسليم الواجبات النهائية.\n• متابعة وتنسيق تحديد مواعيد الزيارات الرسمية مع المدقق الخارجي (SV).",
  },
];

const OfficialDocsAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mb-10">
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold mb-3"
          style={{
            borderColor: "rgba(216,166,96,0.32)",
            background: "rgba(216,166,96,0.08)",
            color: "rgba(245,222,179,0.95)",
            boxShadow: "0 0 22px rgba(216,166,96,0.14)",
          }}
        >
          <BookOpen className="h-4 w-4" />
          الدليل الرسمي الشامل — التقييم وضمان الجودة
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-foreground">
          توثيق <span className="gradient-text">BTEC</span> التفصيلي
        </h2>
        <p className="mt-2 text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          اضغط على «قراءة التفاصيل» في أي بند لعرض المحتوى الكامل من الوثيقة الرسمية.
        </p>
      </div>

      <div className="space-y-3">
        {officialDocSections.map((sec, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={sec.title}
              className="rounded-[22px] border backdrop-blur-2xl overflow-hidden transition-colors"
              style={{
                background: isOpen ? "rgba(10, 14, 28, 0.62)" : "rgba(10, 14, 28, 0.45)",
                borderColor: isOpen ? "rgba(216,166,96,0.38)" : "rgba(255,255,255,0.10)",
                boxShadow: isOpen
                  ? "0 18px 60px rgba(0,0,0,0.4), 0 0 22px rgba(216,166,96,0.14)"
                  : "0 12px 40px rgba(0,0,0,0.3)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center gap-2 sm:gap-3 p-4 sm:p-5 text-right"
                aria-expanded={isOpen}
              >
                <div
                  className="h-10 w-10 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(216,166,96,0.12)",
                    border: "1px solid rgba(216,166,96,0.28)",
                  }}
                >
                  <FileText className="h-5 w-5" style={{ color: "rgba(245,222,179,0.95)" }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm md:text-base font-black text-foreground leading-6 sm:leading-7 break-words">
                    <span
                      className="inline-flex items-center justify-center text-[11px] font-black rounded-md px-2 py-0.5 ml-2 align-middle"
                      style={{
                        background: "rgba(45,212,191,0.14)",
                        color: "rgba(153,246,228,0.95)",
                        border: "1px solid rgba(45,212,191,0.28)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {sec.title}
                  </div>
                </div>

                <div
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-black shrink-0 transition-all"
                  style={{
                    background: isOpen ? "rgba(216,166,96,0.18)" : "rgba(216,166,96,0.10)",
                    color: "rgba(245,222,179,0.98)",
                    border: "1px solid rgba(216,166,96,0.38)",
                  }}
                >
                  {isOpen ? "إخفاء التفاصيل" : "قراءة التفاصيل"}
                </div>

                <ChevronDown
                  className="h-5 w-5 shrink-0 transition-transform duration-300"
                  style={{
                    color: "rgba(245,222,179,0.9)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-5 pb-5 pt-1 text-sm text-muted-foreground leading-8 whitespace-pre-line"
                      style={{
                        borderTop: "1px dashed rgba(255,255,255,0.10)",
                      }}
                    >
                      <div className="pt-4">{sec.content}</div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BtecAboutPage = () => {
  const [activeImage, setActiveImage] = useState<null | { src: string; alt: string }>(null);
  const [activePathway, setActivePathway] = useState<BtecPathway | null>(null);

  const hoursImages = useMemo(
    () => [
      { src: "/images/btec/1.jpeg", alt: "تخصص تكنولوجيا المعلومات — توزيع الساعات" },
      { src: "/images/btec/2.jpeg", alt: "تخصص الهندسة — توزيع الساعات (1)" },
      { src: "/images/btec/3.jpeg", alt: "تخصص الهندسة — توزيع الساعات (2)" },
      { src: "/images/btec/4.jpeg", alt: "تخصص التجميل — توزيع الساعات (1)" },
      { src: "/images/btec/5.jpeg", alt: "تخصص التجميل — توزيع الساعات (2)" },
      { src: "/images/btec/6.jpeg", alt: "تخصص إدارة الأعمال — توزيع الساعات (1)" },
      { src: "/images/btec/7.jpeg", alt: "تخصص إدارة الأعمال — توزيع الساعات (2)" },
    ],
    [],
  );

  const btecBenefits = [
    "يطوّر مهارات التعليم الذاتي والمهارات التي يتطلبها سوق العمل.",
    "يعزز التعليم القائم على الكفايات.",
    "ساعات تطبيقية أكبر من المعتاد.",
    "التقييمات القائمة على الإنجاز والمهمات.",
    "يعزز الفهم المستدام لدى الطلبة.",
    "يهيئ الطلبة لمهن المستقبل.",
    "يطور المهارات العلمية والعملية والشخصية المطلوبة لسوق العمل.",
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <ScrollProgressBar />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "hsl(220 30% 7%)",
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(45,212,191,0.12), transparent 40%), radial-gradient(circle at 80% 10%, rgba(168,85,247,0.14), transparent 42%), radial-gradient(circle at 50% 100%, rgba(234,179,8,0.10), transparent 46%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
      </div>

      <main className="relative z-10 pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold mb-5"
              style={{
                borderColor: "rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(248,250,252,0.85)",
                backdropFilter: "blur(14px)",
              }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
              تعريف بنظام BTEC
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-3">
              <span className="gradient-text">BTEC</span> (Pearson)
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              نظام تعليمي مهني وتقني قائم على المهارات والكفايات عبر مشاريع ومهمات عملية لمدة 3 سنوات تبدأ من الصف العاشر.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2">
              <Glass>
                <div className="text-xl md:text-2xl font-black text-foreground mb-3">
                  ما هو نظام <span className="gradient-text">PEARSON | BTEC</span> ؟
                </div>
                <p className="text-sm text-muted-foreground leading-7">
                  نظام BTEC (اختصار لـ Business and Technology Education Council) هو مؤهل رسمي من قبل مؤتمر معتمد من إيرلندا،
                  يُقدَّم بالشراكة بين وزارة التربية والتعليم الأردنية وشركة بيرسون العالمية. يهدف إلى تطوير التعليم المهني والتقني
                  في المدارس الحكومية، ومن الصف العاشر، من خلال دمج المعرفة بالتدريب العملي.
                </p>
              </Glass>
            </div>
            <Glass>
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="h-5 w-5 text-primary" />
                <div className="text-lg font-black text-foreground">معلومة مهمة</div>
              </div>
              <p className="text-sm text-muted-foreground leading-7">
                التعليم الثانوي المهني يعتبر من الركائز الأساسية لوزارة التربية والتعليم لبناء الاقتصاد الوطني ودعمه بالعمالة
                الماهرة والمدربة والمنتجة والمسلحة بثقافة الابتكار وريادة الأعمال.
              </p>
            </Glass>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {afterNinthTracks.map((track) => (
              <Glass key={track.id}>
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                    {track.id === "academic" ? (
                      <GraduationCap className="h-6 w-6 text-primary" />
                    ) : (
                      <BadgeCheck className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <div className="text-xl font-black text-foreground mb-2">{track.title}</div>
                    <p className="text-sm text-muted-foreground leading-7">{track.description}</p>
                  </div>
                </div>
              </Glass>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <Glass>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <div className="text-lg font-black text-foreground">لمحة سريعة</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {btecQuickFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-2xl border p-4"
                    style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)" }}
                  >
                    <div className="text-xs text-muted-foreground mb-1">{fact.label}</div>
                    <div className="text-sm font-black text-foreground">{fact.value}</div>
                  </div>
                ))}
              </div>
            </Glass>

            <Glass>
              <div className="flex items-center gap-3 mb-4">
                <BadgeCheck className="h-5 w-5 text-primary" />
                <div className="text-lg font-black text-foreground">الشهادات</div>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground leading-7">
                {btecCertificates.map((x) => (
                  <li key={x}>- {x}</li>
                ))}
              </ul>
            </Glass>

            <Glass>
              <div className="flex items-center gap-3 mb-4">
                <Clock3 className="h-5 w-5 text-primary" />
                <div className="text-lg font-black text-foreground">الساعات المعتمدة</div>
              </div>
              <div className="space-y-3">
                {btecHours.map((row) => (
                  <div key={row.grade} className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)" }}>
                    <div className="text-sm font-black text-foreground">{row.grade}</div>
                    <div className="text-xs text-muted-foreground mt-1">{row.total}</div>
                    <div className="text-[11px] text-muted-foreground mt-1">{row.level}</div>
                  </div>
                ))}
              </div>
            </Glass>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <Glass>
              <div className="text-xl font-black text-foreground mb-4">الثقافة العامة المشتركة (العاشر)</div>
              <div className="flex flex-wrap gap-2">
                {g10CoreSubjects.map((subj) => (
                  <span
                    key={subj}
                    className="rounded-full border px-3 py-1.5 text-xs font-bold"
                    style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "rgba(248,250,252,0.86)" }}
                  >
                    {subj}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-xs text-muted-foreground leading-6">
                في تخصص الضيافة تُضاف:
                <div className="mt-2 flex flex-wrap gap-2">
                  {g10HospitalityExtra.map((x) => (
                    <span
                      key={x}
                      className="rounded-full border px-3 py-1.5 text-xs font-bold"
                      style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", color: "rgba(248,250,252,0.86)" }}
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </Glass>

            <Glass>
              <div className="text-xl font-black text-foreground mb-4">الخطة الدراسية (توزيع الحصص الأسبوعية)</div>
              <div className="space-y-3">
                {Object.values(btecWeeklyPlan).map((plan) => (
                  <div key={plan.title} className="rounded-2xl border p-4" style={{ borderColor: "rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.03)" }}>
                    <div className="text-sm font-black text-foreground mb-2">{plan.title}</div>
                    <div className="flex flex-wrap gap-2">
                      {plan.items.map((it) => (
                        <span
                          key={`${plan.title}-${it.name}`}
                          className="text-[11px] rounded-full border px-2.5 py-1 font-bold"
                          style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)", color: "rgba(248,250,252,0.82)" }}
                        >
                          {it.name} ({it.count})
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs text-muted-foreground leading-6">
                ملاحظة: يتقدم الطالب لامتحان وزاري في مواد الثقافة العامة المشتركة التي درسها في الصفين الحادي عشر والثاني عشر وهي
                (اللغة العربية والتربية الإسلامية واللغة الإنجليزية وتاريخ الأردن) بعد النجاح مدرسياً.
              </div>
            </Glass>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <Glass>
              <div className="text-xl font-black text-foreground mb-4">مزايا المسار المهني والتقني (BTEC)</div>
              <ul className="space-y-2 text-sm text-muted-foreground leading-7">
                {btecBenefits.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-[3px] text-primary" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </Glass>

            <Glass>
              <div className="text-xl font-black text-foreground mb-4">بعد التخرج</div>
              <div className="space-y-4 text-sm text-muted-foreground leading-7">
                <div>
                  <div className="font-black text-foreground mb-1">هل يمكن الالتحاق بسوق العمل مباشرة؟</div>
                  <p>
                    نعم، بعد إنهاء مرحلة الدراسة الثانوية وإنهاء متطلبات برنامج تطوير التعليم المهني للحصول على مزاولة مهنة معتمدة من
                    هيئة تنمية وتطوير المهارات المهنية والتقنية وتسكين المؤهل ضمن الإطار الوطني للمؤهلات.
                  </p>
                </div>

                <div>
                  <div className="font-black text-foreground mb-1">الالتحاق بمؤسسات التعليم العالي</div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowUpRight className="h-4 w-4 mt-[3px] text-primary" />
                      <span>
                        إنهاء متطلبات برنامج BTEC والالتحاق بجامعات وكليات تقنية معتمدة لهذا البرنامج.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowUpRight className="h-4 w-4 mt-[3px] text-primary" />
                      <span>
                        إنهاء متطلبات امتحان الثانوية العامة (الامتحان الوطني) والالتحاق بالجامعات والكليات المختلفة وفق أسس القبول.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Glass>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <Glass>
              <div className="text-xl font-black text-foreground mb-4">نظام التقييم (Pearson)</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {gradingSystem.map((g) => (
                  <div key={g.code} className="rounded-[24px] border p-5" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-2xl font-black gradient-text">{g.code}</div>
                      <div className="text-sm font-black text-foreground">{g.weight}</div>
                    </div>
                    <div className="text-sm font-bold text-foreground">{g.label}</div>
                    <p className="text-xs text-muted-foreground mt-2 leading-6">{g.description}</p>
                  </div>
                ))}
              </div>
            </Glass>

            <Glass>
              <div className="flex items-center gap-3 mb-4">
                <UsersRound className="h-5 w-5 text-primary" />
                <div className="text-xl font-black text-foreground">فريق التقييم</div>
              </div>
              <div className="space-y-3">
                {assessmentTeam.map((role) => (
                  <div key={role.code} className="rounded-[24px] border p-5" style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }}>
                    <div className="text-sm font-black text-foreground">{role.code}</div>
                    <div className="text-xs font-bold text-primary mt-1">{role.title}</div>
                    <p className="text-xs text-muted-foreground mt-2 leading-6">{role.summary}</p>
                  </div>
                ))}
              </div>
            </Glass>
          </div>

          <OfficialDocsAccordion />

          <Glass>
            <div className="text-xl font-black text-foreground mb-4">التخصصات المتاحة</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {btecPathways.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.id} className="rounded-[26px] border p-4 flex flex-col" style={{ borderColor: `hsl(${p.accentHsl} / 0.22)`, background: "rgba(255,255,255,0.03)" }}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-black text-foreground">{p.titleAr}</div>
                        <div className="text-[11px] text-muted-foreground mt-1">{p.titleEn}</div>
                      </div>
                      <div className="h-10 w-10 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `hsl(${p.accentHsl} / 0.14)` }}>
                        <Icon className="h-5 w-5" style={{ color: `hsl(${p.accentHsl})` }} />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActivePathway(p)}
                      className="mt-4 w-full rounded-xl border px-3 py-2 text-xs font-black transition-all hover:scale-[1.02]"
                      style={{
                        borderColor: `hsl(${p.accentHsl} / 0.35)`,
                        background: `hsl(${p.accentHsl} / 0.10)`,
                        color: `hsl(${p.accentHsl})`,
                      }}
                    >
                      عرض التفاصيل
                    </button>
                  </div>
                );
              })}
            </div>
          </Glass>

          <div className="mt-8">
            <div
              className="rounded-[28px] border p-6 backdrop-blur-2xl"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                borderColor: "rgba(255,255,255,0.10)",
                boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
              }}
            >
              <div className="text-center mb-6">
                <div
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold mb-3"
                  style={{
                    borderColor: "rgba(34,211,238,0.28)",
                    background: "rgba(34,211,238,0.08)",
                    color: "rgba(165,243,252,0.95)",
                    boxShadow: "0 0 22px rgba(34,211,238,0.18)",
                  }}
                >
                  <Maximize2 className="h-4 w-4" />
                  توزيع الساعات المحددة لمواد الـ BTEC لجميع التخصصات
                </div>
                <p className="text-xs md:text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  جدول يوضح توزيع ساعات التعلم الموجهة (GLH) لكل وحدة دراسية حسب تخصصات BTEC المعتمدة.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {hoursImages.map((img, index) => (
                  <motion.button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03, duration: 0.35 }}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-[22px] border text-right"
                    style={{
                      borderColor: "rgba(255,255,255,0.12)",
                      background: "rgba(10, 14, 28, 0.35)",
                      backdropFilter: "blur(18px)",
                      boxShadow: "0 14px 44px rgba(0,0,0,0.35)",
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-[320px] w-full object-contain bg-black/20 transition-transform duration-300 group-hover:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div
                        className="absolute inset-0"
                        style={{
                          boxShadow: "inset 0 0 0 1px rgba(34,211,238,0.55), 0 0 24px rgba(34,211,238,0.28)",
                        }}
                      />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-xs font-black text-slate-50">View Details</span>
                        <Maximize2 className="h-4 w-4 text-cyan-200" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(45,212,191,0.16), transparent 45%), radial-gradient(circle at 80% 10%, rgba(168,85,247,0.18), transparent 45%), rgba(0,0,0,0.72)",
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="w-full max-w-6xl"
            >
              <div
                className="rounded-[28px] border overflow-hidden backdrop-blur-2xl"
                style={{
                  background: "rgba(10, 14, 28, 0.62)",
                  borderColor: "rgba(34,211,238,0.25)",
                  boxShadow: "0 24px 80px rgba(0,0,0,0.55), 0 0 34px rgba(34,211,238,0.16)",
                }}
              >
                <div className="flex items-center justify-between gap-3 p-4 border-b" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                  <div className="text-sm font-black text-slate-50">{activeImage.alt}</div>
                  <button
                    type="button"
                    onClick={() => setActiveImage(null)}
                    className="h-10 w-10 rounded-xl border flex items-center justify-center transition-all hover:scale-[1.03]"
                    style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)" }}
                    aria-label="إغلاق"
                  >
                    <X className="h-5 w-5 text-slate-100/90" />
                  </button>
                </div>
                <div className="p-4 bg-black/20">
                  <img src={activeImage.src} alt={activeImage.alt} className="w-full max-h-[78vh] object-contain" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <PathwayDetailModal
        open={!!activePathway}
        onClose={() => setActivePathway(null)}
        pathway={activePathway}
      />
    </div>
  );
};

export default BtecAboutPage;

