"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";

const features = [
  {
    icon: "🌿",
    title: "Natural Ingredients",
    description: "Every ingredient is sourced with care. No artificial colours, no synthetic flavours — just real, recognisable ingredients you can trust.",
    color: "#0E5A43",
    bg: "rgba(14,90,67,0.05)",
    glow: "rgba(14,90,67,0.15)",
  },
  {
    icon: "💧",
    title: "Hydration Boost",
    description: "Formulated with electrolytes that support genuine cellular hydration — not just water, but the minerals your body needs to absorb it.",
    color: "#1D6B4F",
    bg: "rgba(29,107,79,0.05)",
    glow: "rgba(29,107,79,0.15)",
  },
  {
    icon: "✨",
    title: "No Artificial Feel",
    description: "Clean on the palate, clean on the label. HYTEA tastes like it was made in a kitchen, not a lab.",
    color: "#B68B5E",
    bg: "rgba(182,139,94,0.05)",
    glow: "rgba(182,139,94,0.2)",
  },
  {
    icon: "🍃",
    title: "Refreshing Taste",
    description: "Crafted to be genuinely refreshing — not sweet-heavy, not watery. The kind of drink you reach for again and again.",
    color: "#0E5A43",
    bg: "rgba(14,90,67,0.05)",
    glow: "rgba(14,90,67,0.15)",
  },
  {
    icon: "🍵",
    title: "Real Tea Extracts",
    description: "We use actual tea extracts, not tea flavouring. The difference is real — in taste, in antioxidants, and in the experience.",
    color: "#1D6B4F",
    bg: "rgba(29,107,79,0.05)",
    glow: "rgba(29,107,79,0.15)",
  },
  {
    icon: "🌾",
    title: "Khandsari Sugar & Stevia",
    description: "A naturally refined cane sugar with minimal processing. Sweeter where it counts, lighter where it matters.",
    color: "#B68B5E",
    bg: "rgba(182,139,94,0.05)",
    glow: "rgba(182,139,94,0.2)",
  },
];

function SpotlightCard({ feature, index, isInView }: {
  feature: (typeof features)[0];
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
  const { ref: tiltRef, onMouseMove: tiltMove, onMouseLeave: tiltLeave } = useTilt({ max: 10, scale: 1.03, speed: 400 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    tiltMove(e);
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    tiltLeave();
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  };

  // Merge refs using callback ref pattern
  const setRefs = (el: HTMLDivElement | null) => {
    (cardRef as React.RefObject<HTMLDivElement | null>).current = el;
    (tiltRef as React.RefObject<HTMLDivElement | null>).current = el;
  };

  return (
    <motion.div
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "rgba(255,255,255,0.75)",
        border: "1px solid rgba(14,90,67,0.08)",
        padding: "32px 28px",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      initial={{ opacity: 0, y: 36, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: "easeOut" }}
    >
      {/* Spotlight glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(circle 120px at ${spotlight.x}% ${spotlight.y}%, ${feature.glow}, transparent)`,
        }}
      />

      {/* Hover fill */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: feature.bg }}
      />

      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }}
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.4 }}
      />

      {/* Border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `inset 0 0 0 1px ${feature.color}30` }}
      />

      <div className="relative z-10">
        <motion.div
          className="text-4xl mb-5 inline-block"
          whileHover={{ scale: 1.3, rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.4 }}
        >
          {feature.icon}
        </motion.div>
        <h3 className="font-playfair font-bold text-xl mb-3" style={{ color: feature.color }}>
          {feature.title}
        </h3>
        <p className="text-[#0E5A43]/60 text-sm leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
}

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
      {/* Animated grid pattern */}
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

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #A9C3A2, transparent)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl opacity-6 pointer-events-none"
        style={{ background: "radial-gradient(circle, #F6D34E, transparent)" }}
        animate={{ scale: [1, 1.3, 1], x: [0, -15, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="inline-block text-[#A9C3A2] text-xs tracking-[0.45em] uppercase font-medium mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
          >
            The Difference
          </motion.span>
          <h2
            className="font-playfair font-bold text-[#0E5A43] leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            Why choose{" "}
            <span className="italic" style={{
              background: "linear-gradient(135deg, #0E5A43, #A9C3A2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              TISORA?
            </span>
          </h2>
          <p className="text-[#0E5A43]/55 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            In a world of compromises, HYTEA stands for something different.
            Here's what sets us apart.
          </p>
        </motion.div>

        {/* Spotlight cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <SpotlightCard key={f.title} feature={f} index={i} isInView={isInView} />
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
            className="rounded-2xl flex flex-col sm:flex-row items-center gap-5 sm:gap-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0E5A43, #1D6B4F)",
              padding: "28px 36px",
            }}
          >
            {/* Animated shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
            />
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
              whileHover={{ scale: 1.06, boxShadow: "0 8px 24px rgba(250,247,242,0.3)" }}
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
