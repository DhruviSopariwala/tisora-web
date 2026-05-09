"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface WaveDividerProps {
  fromColor: string;
  toColor: string;
  flip?: boolean;
}

export default function WaveDivider({ fromColor, toColor, flip = false }: WaveDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pathD = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z",
      "M0,20 C200,60 400,10 600,50 C800,90 1000,20 1200,60 L1200,80 L0,80 Z",
      "M0,60 C200,20 400,70 600,30 C800,10 1000,60 1200,20 L1200,80 L0,80 Z",
    ]
  );

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        height: 80,
        background: fromColor,
        transform: flip ? "scaleY(-1)" : "none",
        marginBottom: flip ? -1 : 0,
        marginTop: flip ? 0 : -1,
      }}
    >
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-full"
      >
        <motion.path d={pathD} fill={toColor} />
      </svg>
    </div>
  );
}
