import { useEffect, useMemo, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  tw: number;
  hue: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function DeepSpaceBackground({
  className,
  density = 110,
}: {
  className?: string;
  density?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.35, active: false });

  const base = useMemo(() => {
    return {
      bg:
        "radial-gradient(1200px 900px at 15% 20%, rgba(88, 169, 255, 0.14), transparent 55%)," +
        "radial-gradient(950px 800px at 80% 12%, rgba(214, 160, 82, 0.16), transparent 52%)," +
        "radial-gradient(900px 900px at 55% 100%, rgba(168, 85, 247, 0.14), transparent 55%)," +
        "radial-gradient(700px 700px at 45% 45%, rgba(45, 212, 191, 0.08), transparent 58%)," +
        "linear-gradient(180deg, rgba(5, 8, 18, 1), rgba(3, 5, 12, 1) 55%, rgba(2, 3, 8, 1))",
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round((density * width * height) / (1200 * 800));
      const count = clamp(target, 60, 160);
      const next: Star[] = [];
      for (let i = 0; i < count; i++) {
        next.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.6 + 0.2,
          vx: (Math.random() - 0.5) * 0.06,
          vy: (Math.random() - 0.5) * 0.06,
          a: Math.random() * 0.55 + 0.15,
          tw: Math.random() * 0.9 + 0.2,
          hue: [200, 210, 35, 42, 270][Math.floor(Math.random() * 5)],
        });
      }
      starsRef.current = next;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      pointerRef.current = { x: clamp(x, 0, 1), y: clamp(y, 0, 1), active: true };
    };
    const onLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    let last = performance.now();
    const loop = (now: number) => {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;
      const { width, height } = canvasEl.getBoundingClientRect();
      const dt = clamp((now - last) / 16.67, 0.5, 2);
      last = now;

      ctx.clearRect(0, 0, width, height);

      const p = pointerRef.current;
      const px = width * (p.active ? p.x : 0.55);
      const py = height * (p.active ? p.y : 0.35);

      // Subtle bokeh glow fields
      const b1 = ctx.createRadialGradient(px, py, 0, px, py, Math.max(width, height) * 0.55);
      b1.addColorStop(0, "rgba(216, 166, 96, 0.10)");
      b1.addColorStop(0.5, "rgba(88, 169, 255, 0.06)");
      b1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = b1;
      ctx.fillRect(0, 0, width, height);

      const b2 = ctx.createRadialGradient(width * 0.18, height * 0.72, 0, width * 0.18, height * 0.72, Math.max(width, height) * 0.42);
      b2.addColorStop(0, "rgba(45, 212, 191, 0.08)");
      b2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = b2;
      ctx.fillRect(0, 0, width, height);

      // Stars
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;
        if (s.y < -10) s.y = height + 10;
        if (s.y > height + 10) s.y = -10;

        const tw = 0.65 + 0.35 * Math.sin(now * 0.0008 + s.tw * 10);
        const alpha = s.a * tw;

        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6.5);
        g.addColorStop(0, `hsla(${s.hue}, 95%, 75%, ${alpha})`);
        g.addColorStop(0.35, `hsla(${s.hue}, 95%, 65%, ${alpha * 0.28})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 6.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Very subtle drifting lines
      ctx.save();
      ctx.globalAlpha = 0.14;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 220, 170, 0.08)";
      const t = now * 0.00005;
      for (let i = 0; i < 6; i++) {
        const y = ((i / 6) * height + (Math.sin(t * 8 + i) * 20 + t * 140) % height) % height;
        ctx.beginPath();
        ctx.moveTo(-30, y);
        ctx.bezierCurveTo(width * 0.25, y - 20, width * 0.6, y + 30, width + 30, y - 10);
        ctx.stroke();
      }
      ctx.restore();

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [density]);

  return (
    <div className={className ?? ""}>
      <div className="absolute inset-0" style={{ backgroundImage: base.bg }} />
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "62px 62px",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
      <div className="absolute inset-0" style={{ boxShadow: "inset 0 0 140px rgba(0,0,0,0.75)" }} />
    </div>
  );
}

