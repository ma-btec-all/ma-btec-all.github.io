import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import DeepSpaceBackground from "@/components/DeepSpaceBackground";
import StudySchedule from "@/components/StudySchedule";
import { motion } from "framer-motion";

const SchedulePage = () => (
  <div className="min-h-screen bg-background relative overflow-hidden">
    <Navbar />
    <ScrollProgressBar />

    <div className="fixed inset-0 pointer-events-none z-0">
      <DeepSpaceBackground className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 700px at 50% 0%, rgba(216, 166, 96, 0.07), transparent 55%), radial-gradient(800px 600px at 20% 100%, rgba(15, 118, 110, 0.10), transparent 50%)",
        }}
      />
    </div>

    <main className="relative z-10 pt-28 pb-16 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center mb-10"
      >
        <h1
          className="text-3xl sm:text-4xl font-black"
          style={{
            fontFamily: "Cairo, Tajawal, sans-serif",
            color: "rgba(255, 248, 237, 0.96)",
            textShadow: "0 0 24px rgba(216,166,96,0.12)",
          }}
        >
          الجدول الدراسي
        </h1>
        <p className="mt-2 text-sm sm:text-base font-medium" style={{ color: "rgba(216, 190, 140, 0.78)" }}>
          نظّم حصصك واحفظها محليًا في المتصفح
        </p>
      </motion.div>

      <StudySchedule />
    </main>

    <Footer />
  </div>
);

export default SchedulePage;
