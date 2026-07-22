import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import DeepSpaceBackground from "@/components/DeepSpaceBackground";
import PomodoroTimer from "@/components/PomodoroTimer";

const PomodoroPage = () => (
  <div className="min-h-screen bg-background relative overflow-hidden">
    <Navbar />
    <ScrollProgressBar />

    <div className="fixed inset-0 pointer-events-none z-0">
      <DeepSpaceBackground className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 700px at 50% 0%, rgba(216, 166, 96, 0.08), transparent 55%), radial-gradient(800px 600px at 80% 100%, rgba(15, 118, 110, 0.10), transparent 50%)",
        }}
      />
    </div>

    <main className="relative z-10 pt-28 pb-16 px-4 max-w-2xl mx-auto">
      <h1
        className="text-center text-3xl sm:text-4xl font-black mb-10"
        style={{
          fontFamily: "Cairo, Tajawal, sans-serif",
          color: "rgba(255, 248, 237, 0.96)",
          textShadow: "0 0 28px rgba(216,166,96,0.12)",
        }}
      >
        مؤقت الدراسة
      </h1>
      <PomodoroTimer />
    </main>

    <Footer />
  </div>
);

export default PomodoroPage;
