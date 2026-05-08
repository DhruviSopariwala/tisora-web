"use client";

import { motion } from "framer-motion";

const items = [
  "🍃 Natural Tea Extracts",
  "⚡ Electrolytes",
  "🍋 Lemon HYTEA",
  "🍑 Peach HYTEA",
  "✨ Khandsari Sugar",
  "💧 Hydration Reimagined",
  "🌿 Real Ingredients",
  "🧊 Refreshingly Cold",
];

export default function MarqueeBar() {
  const doubled = [...items, ...items];
  return (
    <div
      className="relative overflow-hidden py-5"
      style={{
        background: "linear-gradient(90deg, #0E5A43, #1D6B4F)",
        borderTop: "1px solid rgba(169,195,162,0.15)",
        borderBottom: "1px solid rgba(169,195,162,0.15)",
      }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        style={{ gap: "3rem" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-[#A9C3A2] text-xs tracking-[0.3em] uppercase font-light flex-shrink-0"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
