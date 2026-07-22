import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import { departments } from "@/data/departments";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DepartmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const dept = departments.find((d) => d.id === id);

  if (!dept) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">القسم غير موجود</h1>
          <Link to="/" className="text-primary hover:underline">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  const Icon = dept.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: `hsl(${dept.color})` }}
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-5 mb-6"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: `hsl(${dept.color} / 0.15)` }}
            >
              <Icon className="w-8 h-8" style={{ color: `hsl(${dept.color})` }} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-foreground">{dept.name}</h1>
              <p className="text-muted-foreground">{dept.nameEn}</p>
            </div>
          </motion.div>

          <p className="text-lg text-muted-foreground max-w-2xl">{dept.description}</p>
        </div>
      </section>

      {/* Sub-specialties */}
      <section className="pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">التخصصات الفرعية</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dept.subSpecialties.map((sub, i) => (
              <motion.div
                key={sub.nameEn}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card hover-lift p-6 group cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `hsl(${dept.color} / 0.1)` }}
                  >
                    <BookOpen className="w-5 h-5" style={{ color: `hsl(${dept.color})` }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">{sub.nameEn}</p>
                    <p className="text-sm text-muted-foreground">{sub.description}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>المحتوى قريباً...</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DepartmentPage;
