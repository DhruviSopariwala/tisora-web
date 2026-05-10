"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  color: string;
  duration: number;
}

const COLORS = [
  "#5F7A1F",
  "#AFC8A0",
  "#F6D9A8",
  "#B23A2E",
  "#7A9B28",
  "#FAF8F4",
];

let uid = 0;

interface ParticleBurstButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function ParticleBurstButton({
  onClick,
  children,
  className = "",
  style,
  type = "button",
  disabled = false,
}: ParticleBurstButtonProps) {
  const [bursts, setBursts] = useState<Particle[][]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      // Get click position relative to button center
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      const count = 22;
      const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
        id: uid++,
        x: cx,
        y: cy,
        angle: (360 / count) * i + Math.random() * 15,
        distance: 60 + Math.random() * 80,
        size: 4 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        duration: 0.5 + Math.random() * 0.4,
      }));

      setBursts((prev) => [...prev, particles]);

      // Clean up after animation
      setTimeout(() => {
        setBursts((prev) => prev.slice(1));
      }, 1200);

      onClick?.();
    },
    [onClick, disabled]
  );

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`relative overflow-visible ${className}`}
      style={style}
    >
      {children}

      {/* Particle bursts — rendered outside button flow via absolute positioning */}
      <AnimatePresence>
        {bursts.map((burst) =>
          burst.map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            const tx = Math.cos(rad) * p.distance;
            const ty = Math.sin(rad) * p.distance;

            return (
              <motion.span
                key={p.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  left: p.x - p.size / 2,
                  top: p.y - p.size / 2,
                  zIndex: 50,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: tx,
                  y: ty,
                  opacity: 0,
                  scale: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: p.duration,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            );
          })
        )}
      </AnimatePresence>
    </button>
  );
}
