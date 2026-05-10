"use client";

import { useEffect, useRef } from "react";

interface Drop {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
  color: string;
}

const COLORS = [
  "rgba(95,122,31,",    // brand green
  "rgba(175,200,160,",  // sage green
  "rgba(246,217,168,",  // warm gold
  "rgba(178,58,46,",    // accent red
];

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drops = useRef<Drop[]>([]);
  const mouse = useRef({ x: -999, y: -999 });
  const raf = useRef<number>(0);
  const lastSpawn = useRef(0);

  useEffect(() => {
    // Skip on touch devices — no mousemove events, RAF loop would run empty
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      const now = performance.now();
      if (now - lastSpawn.current < 30) return; // throttle: 1 drop per 30ms
      lastSpawn.current = now;

      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      drops.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4 + Math.random() * 6,
        alpha: 0.55 + Math.random() * 0.3,
        vx: (Math.random() - 0.5) * 1.2,
        vy: 0.6 + Math.random() * 1.4,
        color,
      });

      // cap at 80 drops
      if (drops.current.length > 80) drops.current.shift();
    };

    window.addEventListener("mousemove", onMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.current = drops.current.filter((d) => d.alpha > 0.01);

      for (const d of drops.current) {
        // physics
        d.x += d.vx;
        d.y += d.vy;
        d.vy += 0.06; // gravity
        d.radius *= 0.97;
        d.alpha *= 0.93;

        // draw teardrop shape
        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.beginPath();
        // teardrop: circle body + pointed top
        ctx.arc(0, d.radius * 0.3, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${d.color}${d.alpha.toFixed(2)})`;
        ctx.fill();
        ctx.restore();
      }

      raf.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99998 }} // just below loading screen, above everything else
    />
  );
}
