"use client";

import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  color: string;
  startTime: number;
}

const COLORS = [
  "rgba(95,122,31,",
  "rgba(175,200,160,",
  "rgba(246,217,168,",
  "rgba(178,58,46,",
];

const DURATION   = 800;
const MAX_RADIUS = 120;
const MAX_RIPPLES = 20; // cap to prevent unbounded growth

export default function ClickRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripples   = useRef<Ripple[]>([]);
  const raf       = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, input, textarea, select")) return;
      // Cap ripple count
      if (ripples.current.length >= MAX_RIPPLES) return;

      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        startTime: performance.now(),
      });
    };
    window.addEventListener("click", onClick);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();

      ripples.current = ripples.current.filter((r) => now - r.startTime < DURATION);

      for (const r of ripples.current) {
        const elapsed  = now - r.startTime;
        const progress = elapsed / DURATION;
        const eased    = 1 - Math.pow(1 - progress, 3);
        const radius   = eased * MAX_RADIUS;
        const alpha    = (1 - progress) * 0.45;

        // Outer ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${r.color}${alpha.toFixed(2)})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Inner ring
        if (progress > 0.1) {
          const r2 = eased * MAX_RADIUS * 0.6;
          const a2 = (1 - progress) * 0.25;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r2, 0, Math.PI * 2);
          ctx.strokeStyle = `${r.color}${a2.toFixed(2)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Center dot
        if (progress < 0.3) {
          const dotAlpha = (1 - progress / 0.3) * 0.5;
          ctx.beginPath();
          ctx.arc(r.x, r.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = `${r.color}${dotAlpha.toFixed(2)})`;
          ctx.fill();
        }
      }

      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99997 }}
    />
  );
}
