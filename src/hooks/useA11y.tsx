import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

export type FontSize = "small" | "normal" | "large";

export interface A11ySettings {
  fontSize: FontSize;
  highContrast: boolean;
  reduceMotion: boolean;
  readingMode: boolean;
  dyslexiaFont: boolean;
}

const DEFAULTS: A11ySettings = {
  fontSize: "normal",
  highContrast: false,
  reduceMotion: false,
  readingMode: false,
  dyslexiaFont: false,
};

const LS_KEY = "btec-a11y-settings";

interface Ctx extends A11ySettings {
  setFontSize: (s: FontSize) => void;
  toggle: (k: Exclude<keyof A11ySettings, "fontSize">) => void;
  reset: () => void;
}

const A11yContext = createContext<Ctx>({
  ...DEFAULTS,
  setFontSize: () => {},
  toggle: () => {},
  reset: () => {},
});

const FONT_SIZE_PX: Record<FontSize, string> = {
  small: "14px",
  normal: "16px",
  large: "19px",
};

function applyToDom(s: A11ySettings) {
  const root = document.documentElement;
  root.style.setProperty("--app-font-size", FONT_SIZE_PX[s.fontSize]);
  root.setAttribute("data-font-size", s.fontSize);
  root.classList.toggle("a11y-high-contrast", s.highContrast);
  root.classList.toggle("a11y-reduce-motion", s.reduceMotion);
  root.classList.toggle("a11y-reading-mode", s.readingMode);
  root.classList.toggle("a11y-dyslexia", s.dyslexiaFont);
}

function load(): A11ySettings {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

// Apply persisted settings synchronously on module load to avoid FOUC.
if (typeof window !== "undefined") {
  try {
    applyToDom(load());
  } catch {
    /* noop */
  }
}

export const A11yProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<A11ySettings>(() => load());

  // Defer DOM/localStorage writes so React state updates feel instant
  // and the layout reflow (rem cascade) happens off the click handler.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      applyToDom(settings);
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(settings));
      } catch {
        /* noop */
      }
    });
    return () => window.cancelAnimationFrame(id);
  }, [settings]);

  const setFontSize = useCallback(
    (fontSize: FontSize) => setSettings((s) => (s.fontSize === fontSize ? s : { ...s, fontSize })),
    [],
  );
  const toggle = useCallback(
    (k: Exclude<keyof A11ySettings, "fontSize">) =>
      setSettings((s) => ({ ...s, [k]: !s[k] })),
    [],
  );
  const reset = useCallback(() => {
    setSettings(DEFAULTS);
  }, []);

  return (
    <A11yContext.Provider value={{ ...settings, setFontSize, toggle, reset }}>
      {children}
    </A11yContext.Provider>
  );
};

export const useA11y = () => useContext(A11yContext);
