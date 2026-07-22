import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type AccentColorName = "cyan" | "blue" | "orange" | "purple" | "green" | "pink";

interface AccentColorDef {
  name: AccentColorName;
  label: string;
  labelEn: string;
  hsl: string;
  glow: string;
  hex: string;
}

export const ACCENT_COLORS: AccentColorDef[] = [
  { name: "cyan", label: "سماوي", labelEn: "Cyan", hsl: "174 72% 50%", glow: "174 72% 50%", hex: "#22d3ee" },
  { name: "blue", label: "أزرق", labelEn: "Blue", hsl: "217 91% 60%", glow: "217 91% 60%", hex: "#3b82f6" },
  { name: "orange", label: "برتقالي", labelEn: "Orange", hsl: "25 95% 53%", glow: "25 95% 53%", hex: "#f97316" },
  { name: "purple", label: "بنفسجي", labelEn: "Purple", hsl: "264 70% 60%", glow: "264 70% 60%", hex: "#8b5cf6" },
  { name: "green", label: "أخضر", labelEn: "Green", hsl: "142 71% 45%", glow: "142 71% 45%", hex: "#22c55e" },
  { name: "pink", label: "وردي", labelEn: "Pink", hsl: "330 81% 60%", glow: "330 81% 60%", hex: "#ec4899" },
];

interface AccentColorContextType {
  accent: AccentColorName;
  setAccent: (c: AccentColorName) => void;
  currentColor: AccentColorDef;
}

const AccentColorContext = createContext<AccentColorContextType>({
  accent: "cyan",
  setAccent: () => {},
  currentColor: ACCENT_COLORS[0],
});

function applyAccent(color: AccentColorDef, isDark: boolean) {
  const root = document.documentElement;
  root.style.setProperty("--primary", color.hsl);
  root.style.setProperty("--ring", color.hsl);
  root.style.setProperty("--sidebar-primary", color.hsl);
  root.style.setProperty("--sidebar-ring", color.hsl);

  const lightness = isDark ? "50%" : "45%";
  const h = color.hsl.split(" ")[0];
  const s = color.hsl.split(" ")[1];

  root.style.setProperty(
    "--gradient-primary",
    `linear-gradient(135deg, hsl(${h}, ${s}, ${lightness}), hsl(${parseInt(h) + 16}, 80%, ${isDark ? "42%" : "38%"}))`
  );
  root.style.setProperty(
    "--shadow-glow",
    `0 0 30px -5px hsl(${color.glow} / ${isDark ? "0.25" : "0.2"})`
  );
}

export const AccentColorProvider = ({ children }: { children: ReactNode }) => {
  const [accent, setAccentState] = useState<AccentColorName>(() => {
    return (localStorage.getItem("btec-accent") as AccentColorName) || "cyan";
  });

  const currentColor = ACCENT_COLORS.find((c) => c.name === accent) || ACCENT_COLORS[0];

  const setAccent = (c: AccentColorName) => {
    setAccentState(c);
    localStorage.setItem("btec-accent", c);
  };

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    applyAccent(currentColor, isDark);
  }, [accent, currentColor]);

  // Listen for theme changes to re-apply
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      applyAccent(currentColor, isDark);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [currentColor]);

  return (
    <AccentColorContext.Provider value={{ accent, setAccent, currentColor }}>
      {children}
    </AccentColorContext.Provider>
  );
};

export const useAccentColor = () => useContext(AccentColorContext);
