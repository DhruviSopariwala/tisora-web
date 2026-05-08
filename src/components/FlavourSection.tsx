"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const flavours = [
  {
    id: "lemon",
    name: "Lemon Mint Sage",
    tagline: "Bright. Zesty. Electric.",
    description:
      "A burst of sun-ripened citrus meets fresh mint and earthy sage, balanced with the clean depth of natural tea. Lemon Mint Sage is your morning energy, your afternoon reset — all in one refreshing bottle.",
    notes: ["Bright citrus top notes", "Fresh mint mid-palate", "Crisp, herbal finish"],
    emoji: "🍋",
    primaryColor: "#F6D34E",
    secondaryColor: "#B68B5E",
    textColor: "#4A2E00",
    bgGradient: "linear-gradient(160deg, #FFFBEA 0%, #FFF5C0 40%, #FAF7F2 100%)",
    cardBg: "rgba(255,251,234,0.95)",
    cardBorder: "rgba(246,211,78,0.35)",
    mood: "Energetic & Uplifting",
    bestFor: ["Morning boost", "Post-workout", "Study sessions"],
  },
  {
    id: "peach",
    name: "Juicy Peach",
    tagline: "Soft. Juicy. Warm.",
    description:
      "Velvet-smooth peach meets the gentle warmth of natural tea. Juicy Peach wraps you in a golden afternoon glow — sweet without being cloying, refreshing without being sharp.",
    notes: ["Ripe peach sweetness", "Floral tea character", "Smooth, lingering finish"],
    emoji: "🍑",
    primaryColor: "#F7A76C",
    secondaryColor: "#E8855A",
    textColor: "#4A1800",
    bgGradient: "linear-gradient(160deg, #FFF5EE 0%, #FFE8D4 40%, #FAF7F2 100%)",
    cardBg: "rgba(255,245,238,0.95)",
    cardBorder: "rgba(247,167,108,0.35)",
    mood: "Calm & Indulgent",
    bestFor: ["Afternoon treat", "Relaxation", "Social moments"],
  },
];

export default function FlavourSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState("lemon");
  const active = flavours.find((f) => f.id === activeId)!;

  return (
    <section
      id="flavours"
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: "96px 0" }}
    >
      {/* Dynamic background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId + "-bg"}
          className="absolute inset-0"
          style={{ background: active.bgGradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
        />
      </AnimatePresence>

      {/* Soft blob */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId + "-blob"}
            className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
            style={{ background: active.primaryColor, opacity: 0.12 }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.12 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        </AnimatePresence>
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
            The Collection
          </span>
          <h2
            className="font-playfair font-bold text-[#0E5A43] leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            Two flavours. <span className="italic">One obsession.</span>
          </h2>
          <p className="text-[#0E5A43]/55 max-w-md mx-auto text-sm md:text-base">
            Each HYTEA flavour is crafted to deliver a distinct experience — tap to explore.
          </p>
        </motion.div>

        {/* Flavour cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {flavours.map((f, i) => {
            const isActive = f.id === activeId;
            return (
              <motion.div
                key={f.id}
                className="relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: f.cardBg,
                  border: `2px solid ${isActive ? f.primaryColor + "55" : f.cardBorder}`,
                  boxShadow: isActive ? `0 16px 48px ${f.primaryColor}28` : "0 2px 16px rgba(0,0,0,0.04)",
                  padding: "36px 32px",
                }}
                initial={{ opacity: 0, y: 48 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.15 }}
                whileHover={{ scale: 1.015 }}
                onClick={() => setActiveId(f.id)}
              >
                {/* Floating fruit — top right, clipped */}
                <div
                  className="absolute top-4 right-4 text-4xl opacity-20 pointer-events-none select-none"
                  aria-hidden
                >
                  {f.emoji}
                </div>

                {/* Active dot */}
                {isActive && (
                  <motion.div
                    className="flex items-center gap-2 mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ background: f.primaryColor }} />
                    <span className="text-[10px] tracking-[0.35em] uppercase font-semibold" style={{ color: f.primaryColor }}>
                      Selected
                    </span>
                  </motion.div>
                )}

                {/* Bottle image */}
                <div className="flex justify-center mb-6">
                  <motion.img
                    src={f.id === "lemon"
                      ? "/lemon-bottle-removebg-preview.png"
                      : "/peach-bottle-removebg-preview.png"}
                    alt={f.name}
                    style={{
                      width: 100,
                      height: "auto",
                      objectFit: "contain",
                      filter: f.id === "lemon"
                        ? "drop-shadow(-4px 12px 16px rgba(14,90,67,0.35))"
                        : "drop-shadow(-4px 12px 16px rgba(182,100,50,0.35))",
                    }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
                  />
                </div>

                {/* Emoji */}
                <div className="text-3xl mb-3">{f.emoji}</div>

                {/* Name */}
                <h3
                  className="font-playfair font-bold mb-1"
                  style={{ color: f.textColor, fontSize: "1.5rem" }}
                >
                  {f.name}
                </h3>

                {/* Tagline */}
                <p className="text-sm font-medium tracking-wide mb-4" style={{ color: f.primaryColor }}>
                  {f.tagline}
                </p>

                {/* Description */}
                <p className="text-[#0E5A43]/65 text-sm leading-relaxed mb-6">
                  {f.description}
                </p>

                {/* Tasting notes */}
                <div className="mb-5">
                  <p className="text-[10px] tracking-[0.35em] uppercase text-[#0E5A43]/35 mb-3">
                    Tasting Notes
                  </p>
                  <div className="space-y-2">
                    {f.notes.map((note, ni) => (
                      <div key={ni} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: f.primaryColor }} />
                        <span className="text-sm text-[#0E5A43]/65">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mood badge */}
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                  style={{ background: f.primaryColor + "18", color: f.textColor }}
                >
                  <span>✦</span> {f.mood}
                </span>

                {/* Bottom bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px]"
                  style={{
                    background: `linear-gradient(90deg, ${f.primaryColor}, ${f.secondaryColor})`,
                    opacity: isActive ? 1 : 0.25,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Best-for tags */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId + "-tags"}
            className="text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-[#0E5A43]/35 text-xs tracking-[0.35em] uppercase mb-4">
              {active.name} is perfect for
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {active.bestFor.map((use, i) => (
                <motion.span
                  key={i}
                  className="px-5 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: active.primaryColor + "18",
                    color: active.textColor,
                    border: `1px solid ${active.primaryColor}35`,
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {use}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
