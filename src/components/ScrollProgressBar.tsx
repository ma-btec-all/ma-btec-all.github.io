import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.25 });

  return (
    <motion.div
      className="fixed top-[88px] left-0 right-0 z-[60] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, rgba(34,211,238,0.9), rgba(168,85,247,0.85), rgba(234,179,8,0.85))",
        boxShadow: "0 0 18px rgba(34,211,238,0.35)",
      }}
    />
  );
};

export default ScrollProgressBar;

