import { useState } from "react";
import { SOCIAL_LINKS } from "@/data/socialLinks";

const Footer = () => {
  const [hoverId, setHoverId] = useState<string | null>(null);

  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">
            <span className="gradient-text">BTEC</span> Platform
          </h3>
          <p className="text-sm text-muted-foreground">
            تم التطوير بواسطة محمد عطالله
          </p>
        </div>

        {/* Framed glassmorphism container for social icons */}
        <div className="flex justify-center my-8">
          <div
            dir="ltr"
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl"
            style={{
              background: "rgba(15, 23, 42, 0.45)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
              maxWidth: "min(560px, 100%)",
            }}
          >
            {[...SOCIAL_LINKS.filter((l) => l.id !== "linkedin"), ...SOCIAL_LINKS.filter((l) => l.id === "linkedin")].map((link) => {
              const Icon = link.Icon;
              const hovered = hoverId === link.id;
              const iconColor = hovered
                ? link.lightHover
                  ? "#1a1a1a"
                  : link.brand
                : "rgba(241, 245, 249, 0.78)";
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  onMouseEnter={() => setHoverId(link.id)}
                  onMouseLeave={() =>
                    setHoverId((id) => (id === link.id ? null : id))
                  }
                  onFocus={() => setHoverId(link.id)}
                  onBlur={() =>
                    setHoverId((id) => (id === link.id ? null : id))
                  }
                  className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-all duration-300 hover:scale-110"
                  style={{
                    background: hovered
                      ? link.lightHover
                        ? link.brand
                        : `${link.brand}1f`
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${hovered ? link.brand : "rgba(255,255,255,0.08)"}`,
                    boxShadow: hovered
                      ? `0 0 18px ${link.brand}80, 0 0 32px ${link.brand}40`
                      : "0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  <Icon
                    className="w-[18px] h-[18px] sm:w-5 sm:h-5 transition-colors duration-300"
                    style={{ color: iconColor }}
                  />
                </a>
              );
            })}
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground pt-8 border-t border-border/30">
          © {new Date().getFullYear()} Mohammad Atallah. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
