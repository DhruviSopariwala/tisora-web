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

function MarqueeRow({ items, direction = "left", speed = 30 }: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-3">
      <motion.div
        className="flex whitespace-nowrap"
        style={{ gap: "2.5rem" }}
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex-shrink-0 flex items-center gap-2"
            style={{
              color: direction === "left" ? "#A9C3A2" : "#F6D34E",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            {item}
            <span style={{ color: "rgba(169,195,162,0.3)", margin: "0 0.5rem" }}>·</span>
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
        background: "linear-gradient(135deg, #0a3d2e 0%, #0E5A43 50%, #1D6B4F 100%)",
        borderTop: "1px solid rgba(169,195,162,0.12)",
        borderBottom: "1px solid rgba(169,195,162,0.12)",
      }}
    >
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />
      <MarqueeRow items={row1} direction="left" speed={35} />
      <div className="h-px mx-6" style={{ background: "rgba(169,195,162,0.1)" }} />
      <MarqueeRow items={row2} direction="right" speed={28} />
    </div>
  );
}
