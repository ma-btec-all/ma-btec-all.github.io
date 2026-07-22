import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen, ArrowRight, ChevronLeft, Download, ExternalLink,
  GraduationCap, Calendar, FileText, FolderClosed, BookOpen,
  ClipboardList, FileQuestion, Users, File, BarChart2, Wrench, Car, Zap,
} from "lucide-react";
import { departments } from "@/data/departments";
import {
  resourcesData, gradeLabels, semesterLabels, categoryLabels,
  type ResourceFile, type SemesterData, type GradeData, type DepartmentResources,
} from "@/data/assistanceResources";
import { ENGINEERING_TRACK_LABELS } from "@/data/engineeringResources";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Level = "department" | "grade" | "track" | "semester" | "category" | "files";

const extractDownloadUrl = (url: string, type: ResourceFile["type"]): string | null => {
  if (type === "folder") return null;

  const match = url.match(/\/d\/([^/]+)/);
  if (!match) return null;

  const fileId = match[1];

  if (url.includes("docs.google.com/document/")) {
    return `https://docs.google.com/document/d/${fileId}/export?format=docx`;
  }

  if (url.includes("docs.google.com/presentation/")) {
    return `https://docs.google.com/presentation/d/${fileId}/export/pptx`;
  }

  return `https://drive.google.com/uc?export=download&id=${fileId}`;
};

/* ─── Animated Grid Background ─── */
const GridBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById("grid-bg") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let time = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const step = 60;
      ctx.strokeStyle = "rgba(45,212,191,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      // Floating dots
      for (let i = 0; i < 25; i++) {
        const x = ((Math.sin(time + i * 1.3) + 1) / 2) * canvas.width;
        const y = ((Math.cos(time + i * 0.9) + 1) / 2) * canvas.height;
        const alpha = 0.08 + Math.sin(time + i) * 0.04;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(45,212,191,${alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas id="grid-bg" className="fixed inset-0 pointer-events-none z-0" />;
};

/* ─── Magnetic Tilt Card Wrapper ─── */
const TiltCard = ({ children, className, style, onClick, accentColor }: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  accentColor: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const px = ((e.clientX - cx) / (rect.width / 2));
    const py = ((e.clientY - cy) / (rect.height / 2));
    setTilt({ x: py * -8, y: px * 8 });
    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: hovering ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : "perspective(800px) rotateX(0) rotateY(0)",
        transition: hovering ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
        background: hovering
          ? `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, hsl(${accentColor} / 0.08), transparent 60%), rgba(15,15,25,0.6)`
          : "rgba(15,15,25,0.6)",
        border: `1px solid ${hovering ? `hsl(${accentColor} / 0.5)` : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovering ? `0 0 30px hsl(${accentColor} / 0.15), inset 0 0 30px hsl(${accentColor} / 0.03)` : "none",
      }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => { setHovering(false); setTilt({ x: 0, y: 0 }); }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

/* ─── File Type Icon Component ─── */
const FileTypeIcon = ({ type }: { type: ResourceFile["type"] }) => {
  if (type === "folder") return <FolderClosed className="w-8 h-8 text-amber-400" />;
  if (type === "doc") return <FileText className="w-8 h-8 text-blue-400" />;
  if (type === "presentation") return <File className="w-8 h-8 text-orange-400" />;
  return <FileText className="w-8 h-8 text-red-400" />;
};

/* ─── Category Icon & Emoji Map ─── */
const categoryIconComponents: Record<string, typeof BookOpen> = {
  assignments: ClipboardList,
  teacherGuide: Users,
  explanations: FileQuestion,
  books: BookOpen,
  specs: BarChart2,
};

const categoryEmojis: Record<string, string> = {
  assignments: "📋",
  teacherGuide: "👨‍🏫",
  explanations: "💡",
  books: "📚",
  specs: "📊",
};

/* ─── Main Page ─── */
const AssistancePage = () => {
  const [level, setLevel] = useState<Level>("department");
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const deptData = selectedDept ? departments.find((d) => d.id === selectedDept) : null;
  const accentColor = deptData?.color || "174 72% 50%";

  const needsGrade12Track =
    selectedDept === "engineering" && selectedGrade === "grade12";

  const getActiveGradeData = useCallback((): GradeData | null => {
    if (!selectedDept || !selectedGrade) return null;
    const dept = resourcesData[selectedDept] as DepartmentResources;
    if (!dept) return null;
    if (needsGrade12Track && selectedTrack && dept.grade12ByTrack?.[selectedTrack]) {
      return dept.grade12ByTrack[selectedTrack];
    }
    if (selectedGrade === "grade10") return dept.grade10;
    if (selectedGrade === "grade11") return dept.grade11;
    return dept.grade12;
  }, [selectedDept, selectedGrade, selectedTrack, needsGrade12Track]);

  const goTo = useCallback((target: Level) => {
    switch (target) {
      case "department":
        setSelectedDept(null);
        setSelectedGrade(null);
        setSelectedTrack(null);
        setSelectedSemester(null);
        setSelectedCategory(null);
        setLevel("department");
        break;
      case "grade":
        setSelectedGrade(null);
        setSelectedTrack(null);
        setSelectedSemester(null);
        setSelectedCategory(null);
        setLevel("grade");
        break;
      case "track":
        setSelectedTrack(null);
        setSelectedSemester(null);
        setSelectedCategory(null);
        setLevel("track");
        break;
      case "semester":
        setSelectedSemester(null);
        setSelectedCategory(null);
        setLevel("semester");
        break;
      case "category":
        setSelectedCategory(null);
        setLevel("category");
        break;
      case "files":
        setLevel("files");
        break;
    }
  }, []);

  const goBack = () => {
    if (level === "grade") goTo("department");
    else if (level === "track") goTo("grade");
    else if (level === "semester") {
      if (needsGrade12Track) goTo("track");
      else goTo("grade");
    } else if (level === "category") goTo("semester");
    else if (level === "files") {
      setSelectedCategory(null);
      setLevel("category");
    }
  };

  type Crumb = { label: string; onNavigate: () => void };
  const breadcrumbs: Crumb[] = [{ label: "التخصصات", onNavigate: () => goTo("department") }];
  if (selectedDept && deptData) {
    breadcrumbs.push({ label: deptData.name, onNavigate: () => goTo("grade") });
  }
  if (selectedGrade) {
    breadcrumbs.push({
      label: gradeLabels[selectedGrade],
      onNavigate: () => {
        if (needsGrade12Track && selectedTrack) {
          setSelectedTrack(null);
          setSelectedSemester(null);
          setSelectedCategory(null);
          setLevel("track");
        } else {
          goTo("grade");
        }
      },
    });
  }
  if (needsGrade12Track && selectedTrack) {
    breadcrumbs.push({
      label: ENGINEERING_TRACK_LABELS[selectedTrack] ?? selectedTrack,
      onNavigate: () => {
        setSelectedSemester(null);
        setSelectedCategory(null);
        setLevel("semester");
      },
    });
  }
  if (selectedSemester) {
    breadcrumbs.push({
      label: semesterLabels[selectedSemester],
      onNavigate: () => {
        setSelectedCategory(null);
        setLevel("category");
      },
    });
  }
  if (selectedCategory) {
    breadcrumbs.push({
      label: categoryLabels[selectedCategory],
      onNavigate: () => setLevel("files"),
    });
  }

  const getCurrentFiles = (): ResourceFile[] => {
    if (!selectedDept || !selectedGrade || !selectedSemester || !selectedCategory) return [];
    if (needsGrade12Track && !selectedTrack) return [];
    const grade = getActiveGradeData();
    if (!grade) return [];
    const sem = grade[selectedSemester as keyof typeof grade] as SemesterData | undefined;
    if (!sem) return [];
    const cat = sem[selectedCategory as keyof SemesterData];
    return cat?.files || [];
  };

  const getCategoryFileCount = (catKey: string): number => {
    if (!selectedDept || !selectedGrade || !selectedSemester) return 0;
    if (needsGrade12Track && !selectedTrack) return 0;
    const grade = getActiveGradeData();
    if (!grade) return 0;
    const sem = grade[selectedSemester as keyof typeof grade] as SemesterData | undefined;
    if (!sem) return 0;
    const cat = sem[catKey as keyof SemesterData];
    return cat?.files?.length || 0;
  };

  const transition = {
    initial: { opacity: 0, scale: 0.88, y: 28, filter: "blur(6px)" },
    animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.9, y: -16, filter: "blur(4px)" },
    transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] as const },
  };

  return (
    <div className="min-h-screen bg-background relative" dir="rtl">
      <GridBackground />
      <Navbar />

      {/* Header */}
      <section className="relative z-10 pt-28 pb-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-6"
              style={{ background: `hsl(${accentColor} / 0.12)`, color: `hsl(${accentColor})` }}>
              <FolderOpen className="w-4 h-4" />
              مكتبة الموارد التعليمية
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-3" style={{ fontFamily: "Cairo, sans-serif" }}>
              مساعدات بالمهمات
            </h1>
            {/* Glowing underline */}
            <div className="mx-auto w-48 h-0.5 rounded-full mb-5"
              style={{
                background: `linear-gradient(90deg, transparent, hsl(${accentColor}), transparent)`,
                boxShadow: `0 0 15px hsl(${accentColor} / 0.5)`,
              }}
            />
            <p className="text-muted-foreground text-base max-w-2xl mx-auto mb-6">
              اختر تخصصك وتنقل بين المستويات للوصول إلى جميع الملفات والموارد التعليمية
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumbs & Back */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 mb-8">
        <div className="flex items-center gap-2 flex-wrap text-sm rounded-2xl px-4 py-3"
          style={{ background: "rgba(15,15,25,0.5)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.06)" }}>
          {level !== "department" && (
            <button onClick={goBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-muted-foreground hover:text-foreground transition-all ml-3"
              style={{ background: "rgba(255,255,255,0.05)" }}>
              <ArrowRight className="w-4 h-4" />
              رجوع
            </button>
          )}
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronLeft className="w-3 h-3 text-muted-foreground/40" />}
              <button
                type="button"
                onClick={b.onNavigate}
                className={`px-2 py-1 rounded-lg transition-colors text-sm ${
                  i === breadcrumbs.length - 1 ? "font-bold" : "text-muted-foreground hover:text-foreground"
                }`}
                style={i === breadcrumbs.length - 1 ? { color: `hsl(${accentColor})`, textShadow: `0 0 10px hsl(${accentColor} / 0.4)` } : {}}
              >
                {b.label}
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <section className="relative z-10 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">

            {/* ─── Level 1: Departments ─── */}
            {level === "department" && (
              <motion.div key="dept" {...transition} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {departments.map((dept, i) => {
                  const Icon = dept.icon;
                  return (
                    <motion.div
                      key={dept.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <TiltCard
                        accentColor={dept.color}
                        onClick={() => {
                          setSelectedDept(dept.id);
                          setSelectedGrade(null);
                          setSelectedTrack(null);
                          setSelectedSemester(null);
                          setSelectedCategory(null);
                          setLevel("grade");
                        }}
                        className="cursor-pointer text-right p-6 rounded-2xl backdrop-blur-xl"
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `hsl(${dept.color} / 0.12)`, boxShadow: `0 0 20px hsl(${dept.color} / 0.15)` }}>
                            <Icon className="w-7 h-7" style={{ color: `hsl(${dept.color})`, filter: `drop-shadow(0 0 6px hsl(${dept.color} / 0.6))` }} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-foreground">{dept.name}</h3>
                            <p className="text-xs text-muted-foreground">{dept.nameEn}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{dept.description}</p>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* ─── Level 2: Grades ─── */}
            {level === "grade" && (
              <motion.div key="grade" {...transition} className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {(["grade10", "grade11", "grade12"] as const).map((g, i) => (
                  <motion.div key={g} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <TiltCard
                      accentColor={accentColor}
                      onClick={() => {
                        setSelectedGrade(g);
                        setSelectedTrack(null);
                        setSelectedSemester(null);
                        setSelectedCategory(null);
                        if (selectedDept === "engineering" && g === "grade12") setLevel("track");
                        else setLevel("semester");
                      }}
                      className="cursor-pointer p-8 rounded-2xl backdrop-blur-xl text-center"
                    >
                      <div className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
                        style={{ background: `hsl(${accentColor} / 0.12)`, boxShadow: `0 0 25px hsl(${accentColor} / 0.15)` }}>
                        <GraduationCap className="w-8 h-8" style={{ color: `hsl(${accentColor})`, filter: `drop-shadow(0 0 8px hsl(${accentColor} / 0.6))` }} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{gradeLabels[g]}</h3>
                    </TiltCard>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* ─── Level 2b: مسارات هندسة الصف الثاني ثانوي ─── */}
            {level === "track" && (
              <motion.div key="track" {...transition} className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {(["vehicle", "mechanics", "electrical"] as const).map((tk, i) => {
                  const meta: Record<typeof tk, { icon: typeof Wrench; hint: string }> = {
                    vehicle: { icon: Car, hint: "مركبات" },
                    mechanics: { icon: Wrench, hint: "ميكانيك" },
                    electrical: { icon: Zap, hint: "كهرباء" },
                  };
                  const Icon = meta[tk].icon;
                  return (
                    <motion.div key={tk} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                      <TiltCard
                        accentColor={accentColor}
                        onClick={() => {
                          setSelectedTrack(tk);
                          setSelectedSemester(null);
                          setSelectedCategory(null);
                          setLevel("semester");
                        }}
                        className="cursor-pointer p-8 rounded-2xl backdrop-blur-xl text-center"
                      >
                        <div className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
                          style={{ background: `hsl(${accentColor} / 0.12)`, boxShadow: `0 0 25px hsl(${accentColor} / 0.15)` }}>
                          <Icon className="w-8 h-8" style={{ color: `hsl(${accentColor})`, filter: `drop-shadow(0 0 8px hsl(${accentColor} / 0.6))` }} />
                        </div>
                        <h3 className="text-lg font-bold text-foreground leading-snug px-1">
                          {ENGINEERING_TRACK_LABELS[tk]}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-2">{meta[tk].hint}</p>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* ─── Level 3: Semesters ─── */}
            {level === "semester" && (
              <motion.div key="sem" {...transition} className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {(["semester1", "semester2", "semester3"] as const).map((s, i) => (
                  <motion.div key={s} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <TiltCard
                      accentColor={accentColor}
                      onClick={() => { setSelectedSemester(s); setLevel("category"); }}
                      className="cursor-pointer p-8 rounded-2xl backdrop-blur-xl text-center"
                    >
                      <div className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center"
                        style={{ background: `hsl(${accentColor} / 0.12)`, boxShadow: `0 0 25px hsl(${accentColor} / 0.15)` }}>
                        <Calendar className="w-8 h-8" style={{ color: `hsl(${accentColor})`, filter: `drop-shadow(0 0 8px hsl(${accentColor} / 0.6))` }} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{semesterLabels[s]}</h3>
                    </TiltCard>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* ─── Level 4: Categories (Horizontal Folders) ─── */}
            {level === "category" && (
              <motion.div key="cat" {...transition} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
                {(["books", "specs", "explanations", "teacherGuide", "assignments"] as const).map((c, i) => {
                  const CatIcon = categoryIconComponents[c];
                  const count = getCategoryFileCount(c);
                  return (
                    <motion.div key={c} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                      <TiltCard
                        accentColor={accentColor}
                        onClick={() => { setSelectedCategory(c); setLevel("files"); }}
                        className="cursor-pointer p-6 rounded-2xl backdrop-blur-xl text-center"
                      >
                        <div className="text-4xl mb-3">{categoryEmojis[c]}</div>
                        <div className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center"
                          style={{ background: `hsl(${accentColor} / 0.12)`, boxShadow: `0 0 20px hsl(${accentColor} / 0.12)` }}>
                          <CatIcon className="w-7 h-7" style={{ color: `hsl(${accentColor})`, filter: `drop-shadow(0 0 6px hsl(${accentColor} / 0.5))` }} />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{categoryLabels[c]}</h3>
                        <span className="text-xs font-medium px-3 py-1 rounded-full"
                          style={{ background: `hsl(${accentColor} / 0.1)`, color: `hsl(${accentColor})`, textShadow: `0 0 8px hsl(${accentColor} / 0.4)` }}>
                          {count > 0 ? `${count} ملفات` : "قريباً"}
                        </span>
                      </TiltCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* ─── Level 5: Files ─── */}
            {level === "files" && (
              <motion.div key="files" {...transition}>
                {(() => {
                  const files = getCurrentFiles();
                  if (files.length === 0) {
                    return (
                      <div className="flex justify-center">
                        <TiltCard accentColor={accentColor}
                          className="p-12 rounded-2xl backdrop-blur-xl text-center max-w-md">
                          <div className="text-6xl mb-4">🔜</div>
                          <h3 className="text-2xl font-bold text-foreground mb-2"
                            style={{ textShadow: `0 0 15px hsl(${accentColor} / 0.3)` }}>
                            قريباً...
                          </h3>
                          <p className="text-muted-foreground">سيتم إضافة الملفات لهذا القسم قريباً</p>
                        </TiltCard>
                      </div>
                    );
                  }
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                      {files.map((file, i) => {
                        const dlUrl = extractDownloadUrl(file.url, file.type);
                        return (
                          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                            <TiltCard
                              accentColor={accentColor}
                              onClick={() => window.open(file.url, "_blank")}
                              className="rounded-2xl backdrop-blur-xl p-5 flex flex-col h-full cursor-pointer"
                            >
                              <div className="flex items-start gap-3 mb-4 flex-1 pointer-events-none">
                                <div className="flex-shrink-0 mt-0.5 w-12 h-12 rounded-xl flex items-center justify-center"
                                  style={{ background: `hsl(${accentColor} / 0.08)` }}>
                                  <FileTypeIcon type={file.type} />
                                </div>
                                <h4 className="text-sm font-semibold text-foreground leading-relaxed">{file.name}</h4>
                              </div>
                              <div className="grid grid-cols-2 gap-2 mt-auto" onClick={(e) => e.stopPropagation()}>
                                <div className="flex flex-col items-stretch gap-1">
                                  <a href={file.url} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
                                    style={{
                                      background: `hsl(${accentColor} / 0.15)`,
                                      color: `hsl(${accentColor})`,
                                      border: `1px solid hsl(${accentColor} / 0.2)`,
                                      textShadow: `0 0 8px hsl(${accentColor} / 0.3)`,
                                    }}
                                    onMouseEnter={(e) => {
                                      (e.currentTarget as HTMLElement).style.background = `hsl(${accentColor} / 0.25)`;
                                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px hsl(${accentColor} / 0.2)`;
                                    }}
                                    onMouseLeave={(e) => {
                                      (e.currentTarget as HTMLElement).style.background = `hsl(${accentColor} / 0.15)`;
                                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                    }}
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span>فتح الملف</span>
                                  </a>
                                  <span className="text-[10px] text-center text-muted-foreground leading-tight">عرض مباشر</span>
                                </div>
                                <div className="flex flex-col items-stretch gap-1">
                                  {dlUrl ? (
                                    <>
                                      <a href={dlUrl} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
                                        style={{
                                          background: "rgba(59,130,246,0.12)",
                                          color: "rgb(96,165,250)",
                                          border: "1px solid rgba(59,130,246,0.2)",
                                          textShadow: "0 0 8px rgba(59,130,246,0.3)",
                                        }}
                                        onMouseEnter={(e) => {
                                          (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.22)";
                                          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 15px rgba(59,130,246,0.2)";
                                        }}
                                        onMouseLeave={(e) => {
                                          (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.12)";
                                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                        }}
                                      >
                                        <Download className="w-3.5 h-3.5" />
                                        <span>تنزيل الملف</span>
                                      </a>
                                      <span className="text-[10px] text-center text-muted-foreground leading-tight">نسخة قابلة للحفظ</span>
                                    </>
                                  ) : (
                                    <>
                                      <div className="flex items-center justify-center gap-2 px-2 py-2.5 rounded-xl text-xs font-medium text-muted-foreground border border-white/10">
                                        —
                                      </div>
                                      <span className="text-[10px] text-center text-muted-foreground leading-tight">تنزيل غير متاح</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </TiltCard>
                          </motion.div>
                        );
                      })}
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer Quote */}
      <div className="relative z-10 text-center pb-12 px-4">
        <p className="text-sm md:text-base text-muted-foreground italic"
          style={{ fontFamily: "Cairo, sans-serif", textShadow: `0 0 20px hsl(${accentColor} / 0.3)` }}>
          'طريقك نحو التميز يبدأ بمنظم صحيح لمصادرك التعليمية.'
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default AssistancePage;
