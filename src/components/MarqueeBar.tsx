"use client";

import { motion } from "framer-motion";

const row1 = [
  "🍃 Natural Tea Extracts",
  "⚡ Electrolytes",
  "🍋 Lemon Mint Sage",
  "🍑 Juicy Peach",
  "✨ Khandsari Sugar & Stevia",
  "💧 Hydration Reimagined",
  "🌿 Real Ingredients",
  "🧊 Refreshingly Cold",
];

const row2 = [
  "🌱 Low Calorie",
  "🫖 Green & Black Tea",
  "💊 Essential Vitamins",
  "🏃 For Active Lifestyles",
  "🎯 Daily Focus",
  "🌾 Stevia Sweetened",
  "🇮🇳 India's First Hydration Ice Tea",
  "✦ Your Daily Reset Drink",
];

function MarqueeRow({ items, direction = "left", speed = 30, color = "#AFC8A0" }: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  color?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-3">
      <motion.div
        className="flex whitespace-nowrap"
        style={{ gap: "3rem" }}
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex-shrink-0 flex items-center gap-2"
            style={{
              color: color,
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            {item}
            <span style={{ opacity: 0.3, margin: "0 1rem" }}>·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function MarqueeBar() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #5F7A1F 0%, #4A5F18 100%)",
        borderTop: "1px solid rgba(175,200,160,0.15)",
        borderBottom: "1px solid rgba(175,200,160,0.15)",
      }}
    >
      {/* Premium glass shimmer */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />
      
      <MarqueeRow items={row1} direction="left" speed={40} color="#AFC8A0" />
      <div className="h-px mx-10" style={{ background: "rgba(175,200,160,0.1)" }} />
      <MarqueeRow items={row2} direction="right" speed={32} color="#F6D9A8" />
    </div>
  );
}
