"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ingredients = [
  { label: "Electrolytes", emoji: "⚡", angle: -70,  radius: 260 },
  { label: "Natural Tea",  emoji: "🌱", angle: -20,  radius: 280 },
  { label: "Khandsari",    emoji: "🌾", angle: 30,   radius: 265 },
  { label: "Real Fruit",   emoji: "🍋", angle: 150,  radius: 270 },
  { label: "Stevia",       emoji: "🌿", angle: 200,  radius: 255 },
  { label: "Vitamins",     emoji: "✨", angle: 250,  radius: 268 },
];

export default function CinematicSequence() {
  const ref = useRef<HTMLDivElement>(null);

  // once: false — replays every time section enters viewport
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#FAF8F4",
        minHeight: "100vh",
        padding: "60px 0",
      }}
    >
      {/* Central glow — behind everything */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(175,200,160,0.28), transparent 70%)",
          top: "50%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 0,
        }}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={isInView ? { scale: 1.3, opacity: 1 } : { scale: 0.4, opacity: 0 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />

      {/* ── Scene container ── */}
      <div
        className="relative flex items-center justify-center w-full"
        style={{ height: 420 }}
      >

        {/* Orbiting ingredients — z-index 1, BEHIND bottles */}
        {ingredients.map((ing, i) => {
          const rad = (ing.angle * Math.PI) / 180;
          const tx = Math.cos(rad) * ing.radius;
          const ty = Math.sin(rad) * ing.radius;
          return (
            <motion.div
              key={ing.label}
              className="absolute flex flex-col items-center gap-1 pointer-events-none select-none"
              style={{ x: tx, y: ty, zIndex: 1 }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
              transition={{
                duration: 0.5,
                delay: 0.7 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.span
                className="text-2xl"
                animate={isInView ? { rotate: [0, 8, -8, 0], y: [0, -5, 0] } : {}}
                transition={{
                  duration: 3 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2 + i * 0.15,
                }}
              >
                {ing.emoji}
              </motion.span>
              <span
                className="text-[8px] tracking-[0.25em] uppercase font-bold"
                style={{ color: "rgba(95,122,31,0.5)" }}
              >
                {ing.label}
              </span>
            </motion.div>
          );
        })}

        {/* Lemon bottle — z-index 2, IN FRONT of ingredients */}
        <motion.div
          className="absolute flex flex-col items-center"
          style={{ zIndex: 2 }}
          initial={{ x: 0, opacity: 0, scale: 0.4 }}
          animate={isInView ? { x: -170, opacity: 1, scale: 1 } : { x: 0, opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/lemon-bottle-removebg-preview.png"
            alt="Lemon Mint Sage"
            style={{
              width: 220,
              filter: "drop-shadow(0 24px 48px rgba(95,122,31,0.4))",
            }}
            animate={isInView ? { y: [0, -14, 0] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
          />
          <motion.span
            className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#5F7A1F]/50 mt-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.9 }}
          >
            Lemon Mint Sage
          </motion.span>
        </motion.div>

        {/* Peach bottle — z-index 2, IN FRONT of ingredients */}
        <motion.div
          className="absolute flex flex-col items-center"
          style={{ zIndex: 2 }}
          initial={{ x: 0, opacity: 0, scale: 0.4 }}
          animate={isInView ? { x: 170, opacity: 1, scale: 1 } : { x: 0, opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src="/peach-bottle-removebg-preview.png"
            alt="Juicy Peach"
            style={{
              width: 220,
              filter: "drop-shadow(0 24px 48px rgba(246,217,168,0.55))",
            }}
            animate={isInView ? { y: [0, -14, 0] } : {}}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          />
          <motion.span
            className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#5F7A1F]/50 mt-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.0 }}
          >
            Juicy Peach
          </motion.span>
        </motion.div>

      </div>

      {/* Tagline — below the scene, never overlaps */}
      <motion.div
        className="flex flex-col items-center gap-3 mt-8 relative"
        style={{ zIndex: 3 }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="h-px bg-[#5F7A1F]/20"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          />
          <span className="text-[#AFC8A0] text-[10px] tracking-[0.5em] uppercase font-bold">
            TISORA HYTEA
          </span>
          <motion.div
            className="h-px bg-[#5F7A1F]/20"
            initial={{ width: 0 }}
            animate={isInView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          />
        </div>
        <p
          className="font-playfair font-bold text-[#5F7A1F] text-center"
          style={{ fontSize: "clamp(1.3rem, 3.5vw, 2.2rem)" }}
        >
          Every ingredient.{" "}
          <span className="italic">Intentional.</span>
        </p>
      </motion.div>
    </section>
  );
}
