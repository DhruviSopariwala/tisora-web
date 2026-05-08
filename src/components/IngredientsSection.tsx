"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ingredients = [
  {
    id: "electrolytes",
    emoji: "⚡",
    name: "Electrolytes",
    tagline: "Replenish & Restore",
    description:
      "Essential minerals that keep your body in balance. Our electrolyte blend supports hydration at a cellular level, helping you stay energised and refreshed throughout the day.",
    benefits: ["Cellular hydration", "Energy support", "Muscle recovery", "Mental clarity"],
    color: "#0E5A43",
    bgColor: "rgba(14,90,67,0.06)",
    gradient: "linear-gradient(135deg, rgba(14,90,67,0.08), rgba(169,195,162,0.08))",
  },
  {
    id: "khandsari",
    emoji: "🌾",
    name: "Khandsari Sugar",
    tagline: "Naturally Refined",
    description:
      "Khandsari is a minimally processed, natural cane sugar that retains trace minerals and a subtle molasses character. A cleaner sweetness — the way nature intended.",
    benefits: ["Minimal processing", "Natural minerals", "Gentle sweetness", "No bleaching"],
    color: "#B68B5E",
    bgColor: "rgba(182,139,94,0.06)",
    gradient: "linear-gradient(135deg, rgba(182,139,94,0.08), rgba(246,211,78,0.08))",
  },
  {
    id: "tea",
    emoji: "🍵",
    name: "Natural Tea Extracts",
    tagline: "Brewed with Purpose",
    description:
      "Real tea, not flavouring. Our natural tea extracts bring authentic depth, antioxidants, and that unmistakable freshness that only comes from genuine tea leaves.",
    benefits: ["Rich antioxidants", "Authentic flavour", "Natural caffeine", "Botanical depth"],
    color: "#1D6B4F",
    bgColor: "rgba(29,107,79,0.06)",
    gradient: "linear-gradient(135deg, rgba(29,107,79,0.08), rgba(169,195,162,0.12))",
  },
];

function IngredientCard({
  ingredient,
  index,
  isInView,
}: {
  ingredient: (typeof ingredients)[0];
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: hovered ? ingredient.gradient : "rgba(255,255,255,0.85)",
        border: `1px solid ${hovered ? ingredient.color + "25" : "rgba(14,90,67,0.08)"}`,
        padding: "36px 32px",
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.14, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, boxShadow: `0 16px 40px ${ingredient.color}18` }}
    >
      {/* Decorative circle */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10"
        style={{ background: ingredient.color }}
      />

      {/* Accent top bar */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${ingredient.color}, transparent)` }}
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.35 }}
      />

      <div className="relative z-10">
        {/* Emoji */}
        <motion.div
          className="text-4xl mb-5 inline-block"
          animate={hovered ? { scale: 1.15, rotate: [-4, 4, 0] } : { scale: 1 }}
          transition={{ duration: 0.35 }}
        >
          {ingredient.emoji}
        </motion.div>

        {/* Tagline pill */}
        <div className="mb-3">
          <span
            className="text-[10px] tracking-[0.3em] uppercase font-semibold px-3 py-1 rounded-full"
            style={{ color: ingredient.color, background: ingredient.bgColor }}
          >
            {ingredient.tagline}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-playfair text-xl font-bold mb-3"
          style={{ color: ingredient.color }}
        >
          {ingredient.name}
        </h3>

        {/* Description */}
        <p className="text-[#0E5A43]/65 text-sm leading-relaxed mb-6">
          {ingredient.description}
        </p>

        {/* Benefits grid */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-3">
          {ingredient.benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[10px]" style={{ color: ingredient.color }}>✦</span>
              <span className="text-xs text-[#0E5A43]/65">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function IngredientsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="ingredients"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F0EBE0 0%, #FAF7F2 100%)",
        padding: "96px 0",
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.04] blur-3xl"
          style={{ background: "#0E5A43" }}
        />
      </div>

      <div className="section-container relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="block text-[#A9C3A2] text-xs tracking-[0.45em] uppercase font-medium mb-4">
            What's Inside
          </span>
          <h2
            className="font-playfair font-bold text-[#0E5A43] leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            Ingredients that <span className="italic">matter.</span>
          </h2>
          <p className="text-[#0E5A43]/55 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
            Every ingredient in HYTEA is chosen with intention. No fillers,
            no shortcuts — just what your body actually needs.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {ingredients.map((ing, i) => (
            <IngredientCard key={ing.id} ingredient={ing} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          className="text-center text-[#0E5A43]/35 text-xs tracking-[0.3em] uppercase mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          No artificial colours · No preservatives · No compromise
        </motion.p>
      </div>
    </section>
  );
}
