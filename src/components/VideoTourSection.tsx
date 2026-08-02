import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

const VideoTourSection = () => {
  return (
    <section className="relative py-12 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Subtitle badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass-card px-5 py-2.5 mb-6"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            شاهد كيف يعمل الموقع 🚀
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black mb-10"
          style={{
            fontFamily: "Cairo, Tajawal, sans-serif",
            color: "rgba(255, 248, 237, 0.96)",
            textShadow: "0 0 24px rgba(216,166,96,0.12)",
          }}
        >
          <span className="gradient-text">جولة سريعة</span>{" "}
          <span className="text-foreground">في منصة MA BTEC</span>
        </motion.h2>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full max-w-4xl mx-auto"
        >
          {/* Ambient glow behind the card */}
          <div
            className="absolute -inset-1 rounded-[2rem] opacity-40 blur-xl"
            style={{
              background:
                "linear-gradient(135deg, hsl(264 70% 60% / 0.35), hsl(174 72% 50% / 0.25))",
            }}
          />

          {/* Glassmorphism card */}
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-1.5 sm:p-2"
            style={{
              background:
                "linear-gradient(145deg, hsl(220 18% 14% / 0.85), hsl(220 18% 10% / 0.9))",
              border: "1px solid hsl(264 70% 60% / 0.25)",
              boxShadow:
                "0 0 40px -10px hsl(264 70% 60% / 0.25), 0 20px 50px -10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Inner gradient border effect */}
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, hsl(264 70% 60% / 0.15), transparent 40%, transparent 60%, hsl(174 72% 50% / 0.12))",
              }}
            />

            {/* Video iframe wrapper with aspect ratio */}
            <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black/40">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/wr7eGVh_umM?rel=0&modestbranding=1"
                title="جولة سريعة في منصة MA BTEC"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Decorative play hint */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-5 text-sm text-muted-foreground/70"
          >
            <Play className="w-3.5 h-3.5" />
            <span>اضغط لتشغيل الفيديو</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoTourSection;
