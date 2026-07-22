import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoTourSection from "@/components/VideoTourSection";
import MainSectionsGrid from "@/components/MainSectionsGrid";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import DeepSpaceBackground from "@/components/DeepSpaceBackground";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <DeepSpaceBackground className="absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 700px at 50% 0%, rgba(216, 166, 96, 0.07), transparent 55%), radial-gradient(800px 600px at 20% 100%, rgba(15, 118, 110, 0.08), transparent 50%)",
          }}
        />
      </div>

      <Navbar />
      <ScrollProgressBar />

      <div className="relative z-10">
        <HeroSection />

        <VideoTourSection />

        <section id="main-sections" className="relative py-16 sm:py-20 px-4 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-14"
          >
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-black"
              style={{
                fontFamily: "Cairo, Tajawal, sans-serif",
                color: "rgba(255, 248, 237, 0.96)",
                textShadow: "0 0 24px rgba(216,166,96,0.12)",
              }}
            >
              الأقسام الرئيسية
            </h2>
            <p className="mt-3 text-sm sm:text-base font-medium" style={{ color: "rgba(216, 190, 140, 0.78)" }}>
              اختر القسم للانتقال مباشرة إلى المحتوى
            </p>
          </motion.div>

          <MainSectionsGrid />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
