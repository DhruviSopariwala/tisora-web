"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";

const flavours = [
  {
    id: "lemon",
    name: "Lemon Mint Sage",
    tagline: "Bright. Zesty. Electric.",
    description:
      "A burst of sun-ripened citrus meets fresh mint and earthy sage, balanced with the clean depth of natural tea. Lemon Mint Sage is your morning energy, your afternoon reset — all in one refreshing bottle.",
    notes: ["Bright citrus top notes", "Fresh mint mid-palate", "Crisp, herbal finish"],
    emoji: "🍋",
    primaryColor: "#5F7A1F",
    secondaryColor: "#AFC8A0",
    textColor: "#5F7A1F",
    bgGradient: "linear-gradient(160deg, #FAF8F4 0%, #FFFFFF 100%)",
    cardBg: "rgba(250,248,244,0.95)",
    cardBorder: "rgba(95,122,31,0.15)",
    blobColor: "rgba(175,200,160,0.2)",
    mood: "Energetic & Uplifting",
    bestFor: ["Morning boost", "Post-workout", "Study sessions"],
    bottle: "/lemon-bottle-removebg-preview.png",
  },
  {
    id: "peach",
    name: "Juicy Peach",
    tagline: "Soft. Juicy. Warm.",
    description:
      "Velvet-smooth peach meets the gentle warmth of natural tea. Juicy Peach wraps you in a golden afternoon glow — sweet without being cloying, refreshing without being sharp.",
    notes: ["Ripe peach sweetness", "Floral tea character", "Smooth, lingering finish"],
    emoji: "🍑",
    primaryColor: "#F6D9A8",
    secondaryColor: "#B23A2E",
    textColor: "#5F7A1F",
    bgGradient: "linear-gradient(160deg, #FAF8F4 0%, #FFFFFF 100%)",
    cardBg: "rgba(250,248,244,0.95)",
    cardBorder: "rgba(246,217,168,0.25)",
    blobColor: "rgba(246,217,168,0.3)",
    mood: "Calm & Indulgent",
    bestFor: ["Afternoon treat", "Relaxation", "Social moments"],
    bottle: "/peach-bottle-removebg-preview.png",
  },
];

export default function FlavourSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState("lemon");
  const active = flavours.find((f) => f.id === activeId)!;
  const { ref: bottleTilt, onMouseMove: bottleMove, onMouseLeave: bottleLeave } = useTilt({ max: 20, scale: 1.08, speed: 400 });

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
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>

      {/* Morphing blob */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId + "-blob"}
          className="absolute pointer-events-none"
          style={{
            top: "10%", right: "-10%",
            width: 500, height: 500,
            background: active.blobColor,
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(60px)",
          }}
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          initial={{ opacity: 0, scale: 0.5 }}
          exit={{ opacity: 0, scale: 0.5 }}
        />
      </AnimatePresence>

      <div className="section-container relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="block text-[#AFC8A0] text-xs tracking-[0.45em] uppercase font-bold mb-4">
            The Collection
          </span>
          <h2
            className="font-playfair font-bold text-[#0E5A43] leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            Two flavours.{" "}
            <span className="italic" style={{
              backgroundImage: "linear-gradient(135deg, #5F7A1F, #AFC8A0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              One obsession.
            </span>
          </h2>

          {/* Flavour toggle pills */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {flavours.map((f) => (
              <motion.button
                key={f.id}
                onClick={() => setActiveId(f.id)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  background: activeId === f.id ? f.primaryColor : "rgba(255,255,255,0.6)",
                  color: activeId === f.id ? (f.id === 'peach' ? '#5F7A1F' : '#FAF8F4') : "#5F7A1F",
                  border: `2px solid ${activeId === f.id ? f.primaryColor : "rgba(95,122,31,0.1)"}`,
                  boxShadow: activeId === f.id ? `0 8px 24px ${f.primaryColor}50` : "none",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {f.emoji} {f.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Immersive split layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Left: Bottle showcase */}
            <div className="flex flex-col items-center justify-center">
              {/* Halo ring */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: 350, height: 350,
                    background: `radial-gradient(circle, ${active.blobColor} 0%, transparent 70%)`,
                  }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute rounded-full border-2 border-dashed"
                  style={{
                    width: 320, height: 320,
                    borderColor: active.primaryColor + "40",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute rounded-full border"
                  style={{
                    width: 280, height: 280,
                    borderColor: active.primaryColor + "25",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Bottle */}
                <div
                  ref={bottleTilt}
                  onMouseMove={bottleMove}
                  onMouseLeave={bottleLeave}
                  className="relative z-10"
                  style={{ transformStyle: "preserve-3d", willChange: "transform" }}
                >
                  <motion.img
                    key={activeId + "-bottle"}
                    src={active.bottle}
                    alt={active.name}
                    style={{
                      width: 240,
                      height: "auto",
                      filter: `drop-shadow(0 24px 48px ${active.primaryColor}60) drop-shadow(0 8px 16px rgba(0,0,0,0.15))`,
                    }}
                    initial={{ rotateY: -180, opacity: 0, scale: 0.8 }}
                    animate={{ rotateY: 0, opacity: 1, scale: 1, y: [0, -16, 0] }}
                    transition={{
                      rotateY: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.4 },
                      scale: { duration: 0.5 },
                      y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
                    }}
                  />
                </div>
              </div>

              {/* Flavour label */}
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span
                  className="text-4xl font-playfair font-bold"
                  style={{ color: active.textColor }}
                >
                  {active.emoji}
                </span>
                <p className="text-sm font-semibold tracking-widest uppercase mt-2" style={{ color: active.primaryColor }}>
                  {active.tagline}
                </p>
              </motion.div>
            </div>

            {/* Right: Details */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
                style={{ background: active.primaryColor + "20", color: active.textColor }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: active.primaryColor }} />
                {active.mood}
              </motion.div>

              <h3
                className="font-playfair font-bold mb-4"
                style={{ color: active.textColor, fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
              >
                {active.name}
              </h3>

              <p className="text-[#5F7A1F]/70 leading-relaxed mb-8 text-sm md:text-base">
                {active.description}
              </p>

              {/* Tasting notes */}
              <div className="mb-8">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#5F7A1F]/40 mb-4">
                  Tasting Notes
                </p>
                <div className="space-y-3">
                  {active.notes.map((note, i) => (
                    <motion.div
                      key={note}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <div
                        className="w-8 h-[2px] rounded-full flex-shrink-0"
                        style={{ background: `linear-gradient(90deg, ${active.primaryColor}, transparent)` }}
                      />
                      <span className="text-sm text-[#5F7A1F]/70">{note}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Best for */}
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#5F7A1F]/40 mb-3">
                  Perfect for
                </p>
                <div className="flex flex-wrap gap-2">
                  {active.bestFor.map((use, i) => (
                    <motion.span
                      key={use}
                      className="px-4 py-2 rounded-full text-xs font-medium"
                      style={{
                        background: active.primaryColor + "12",
                        color: active.textColor,
                        border: `1px solid ${active.primaryColor}25`,
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                      }}
                      whileHover={{ scale: 1.05, background: active.primaryColor + "20" }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                    >
                      {use}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
