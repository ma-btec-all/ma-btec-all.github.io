import { useState } from "react";
import { Link } from "react-router-dom";
import { Award, MessageSquareHeart, TrendingUp, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

type GalleryTab = "certificates" | "feedback" | "results";

const certificateLabels = [
  "الذكاء الاصطناعي (AI)",
  "Introduction to IT",
  "Linux",
  "Career Path in Cybersecurity",
  "ICDL",
  "Information in AI",
  "Information to Cybersecurity",
  "Java Programming",
  "ChatGPT من الفكرة إلى التطبيق",
  "Cybersecurity",
  "أساسيات استخدام الكمبيوتر",
  "أساسيات تعليم Canva",
  "أساسيات CTF",
  "تصميم لعبة على Unity",
  "شهادة تفوق",
  "أدوات Google الذكية",
  "UX Design Matters",
  "شهادة تطوير الخلفية البرمجية (.Net Backend)",
  "شهادة تطوير الواجهات الأمامية (Angular Frontend)",
  "شهادة مقدمة في الأمن السيبراني (Cyber Security)",
  "شهادة أساسيات الحاسوب (Computer Essentials)",
  "شهادة إدارة المشاريع (Project Management)",
  "شهادة مهارات التحدث باللغة الإنجليزية",
  "شهادة إتقان تقديم الذات باللغة الإنجليزية",
  "شهادة مقدمة تطوير الألعاب (Unreal Engine)",
  "شهادة استخدام أدوات الذكاء الاصطناعي في التعليم",
  "شهادة التسويق الرقمي عبر التواصل الاجتماعي بالذكاء الاصطناعي",
  "شهادة تعزيز الإنتاجية باستخدام أدوات Google الذكية",
];

const certExtensions = ["jpg","jpeg","jpeg","jpeg","jpeg","png","jpeg","jpeg","jpeg","png","jpeg","png","jpeg","jpeg","jpeg","png","jpeg","png","png","png","png","png","png","jpeg","png","png","png","png"];

const feedbackImages = Array.from({ length: 25 }, (_, i) => i + 1);
const resultImages = Array.from({ length: 28 }, (_, i) => i + 1);

const tabs: { key: GalleryTab; label: string; icon: typeof Award; count: number }[] = [
  { key: "certificates", label: "شهاداتي", icon: Award, count: 28 },
  { key: "feedback", label: "آراء الطلاب عن الموقع", icon: MessageSquareHeart, count: 25 },
  { key: "results", label: "نتائج الطلاب", icon: TrendingUp, count: 28 },
];

const AchievementGalleryPage = () => {
  const [activeTab, setActiveTab] = useState<GalleryTab>("certificates");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const getImages = () => {
    if (activeTab === "certificates") {
      return Array.from({ length: 28 }, (_, i) => ({
        src: `/gallery/certificates/${i + 1}.${certExtensions[i]}`,
        label: certificateLabels[i],
      }));
    }
    if (activeTab === "feedback") {
      return feedbackImages.map((n) => ({
        src: `/gallery/feedback/${n}.jpeg`,
        label: `رأي طالب ${n}`,
      }));
    }
    return resultImages.map((n) => ({
      src: `/gallery/results/${n}.jpeg`,
      label: `نتيجة ${n}`,
    }));
  };

  const images = getImages();

  const openLightbox = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const navigate = (dir: number) => {
    setLightboxIndex((prev) => (prev + dir + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 page-safe-top pb-16 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="gradient-text">معرض الإنجازات</span>
          </h1>
          <div className="mx-auto w-48 h-1 rounded-full animate-pulse-glow" style={{ background: "var(--gradient-primary)" }} />
          <p className="text-muted-foreground mt-4 text-lg">شهادات، آراء، ونتائج تروي قصة النجاح</p>
        </div>

        {/* Tab Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`group relative p-6 rounded-xl border text-center transition-all duration-300 backdrop-blur-xl ${
                  isActive
                    ? "bg-primary/10 border-primary/60 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)]"
                    : "bg-card/40 border-border/50 hover:border-primary/30 hover:bg-card/60"
                }`}
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? "bg-primary/20" : "bg-secondary/50 group-hover:bg-primary/10"
                }`}>
                  <Icon className={`w-7 h-7 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                </div>
                <h3 className={`text-lg font-bold mb-1 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{tab.label}</h3>
                <span className="text-sm text-muted-foreground">{tab.count} صورة</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-fade-in" key={activeTab}>
          {images.map((img, idx) => (
            <button
              key={img.src}
              onClick={() => openLightbox(idx)}
              className="group relative aspect-square rounded-xl overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
            >
              <img
                src={img.src}
                alt={img.label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-xs font-medium line-clamp-2">{img.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Quote */}
        <div className="text-center mt-16 mb-8">
          <p className="text-lg md:text-xl font-medium gradient-text leading-relaxed">
            كل صورة تروي قصة نجاح، وكل لحظة تعكس شغفي بالاستمرارية.
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10" onClick={() => setLightboxOpen(false)}>
            <X className="w-5 h-5" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <img
            src={images[lightboxIndex].src}
            alt={images[lightboxIndex].label}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {images.length} — {images[lightboxIndex].label}
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementGalleryPage;
