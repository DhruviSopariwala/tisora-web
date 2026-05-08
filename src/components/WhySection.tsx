"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    icon: "🌿",
    title: "Natural Ingredients",
    description: "Every ingredient is sourced with care. No artificial colours, no synthetic flavours — just real, recognisable ingredients you can trust.",
    color: "#0E5A43",
    bg: "rgba(14,90,67,0.05)",
  },
  {
    icon: "💧",
    title: "Hydration Boost",
    description: "Formulated with electrolytes that support genuine cellular hydration — not just water, but the minerals your body needs to absorb it.",
    color: "#1D6B4F",
    bg: "rgba(29,107,79,0.05)",
  },
  {
    icon: "✨",
    title: "No Artificial Feel",
    description: "Clean on the palate, clean on the label. HYTEA tastes like it was made in a kitchen, not a lab.",
    color: "#B68B5E",
    bg: "rgba(182,139,94,0.05)",
  },
  {
    icon: "🍃",
    title: "Refreshing Taste",
    description: "Crafted to be genuinely refreshing — not sweet-heavy, not watery. The kind of drink you reach for again and again.",
    color: "#0E5A43",
    bg: "rgba(14,90,67,0.05)",
  },
  {
    icon: "🍵",
    title: "Real Tea Extracts",
    description: "We use actual tea extracts, not tea flavouring. The difference is real — in taste, in antioxidants, and in the experience.",
    color: "#1D6B4F",
    bg: "rgba(29,107,79,0.05)",
  },
  {
    icon: "🌾",
    title: "Khandsari Sugar",
    description: "A naturally refined cane sugar with minimal processing. Sweeter where it counts, lighter where it matters.",
    color: "#B68B5E",
    bg: "rgba(182,139,94,0.05)",
  },
];

export default function WhySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#FAF7F2", padding: "96px 0" }}
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0E5A43" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
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
            The Difference
          </span>
          <h2
            className="font-playfair font-bold text-[#0E5A43] leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            Why choose <span className="italic">TISORA?</span>
          </h2>
          <p className="text-[#0E5A43]/55 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            In a world of compromises, HYTEA stands for something different.
            Here's what sets us apart.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="group relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(14,90,67,0.08)",
                padding: "32px 28px",
              }}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.09, ease: "easeOut" }}
              whileHover={{ y: -6, boxShadow: `0 16px 36px ${f.color}12` }}
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: f.bg }}
              />
              {/* Top accent */}
              <motion.div
                className="absolute top-0 left-0 h-[3px] rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${f.color}, transparent)` }}
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.35 }}
              />

              <div className="relative z-10">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3
                  className="font-playfair font-bold text-lg mb-3"
                  style={{ color: f.color }}
                >
                  {f.title}
                </h3>
                <p className="text-[#0E5A43]/60 text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <div
            className="rounded-2xl flex flex-col sm:flex-row items-center gap-5 sm:gap-6"
            style={{
              background: "linear-gradient(135deg, #0E5A43, #1D6B4F)",
              padding: "28px 36px",
            }}
          >
            <span className="text-3xl flex-shrink-0">🌿</span>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-[#FAF7F2] font-semibold text-sm mb-1">
                Ready to experience the difference?
              </p>
              <p className="text-[#A9C3A2] text-xs">
                HYTEA launches soon — be the first to know.
              </p>
            </div>
            <motion.button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex-shrink-0 px-6 py-3 rounded-xl bg-[#FAF7F2] text-[#0E5A43] text-sm font-semibold"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Notify Me
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
