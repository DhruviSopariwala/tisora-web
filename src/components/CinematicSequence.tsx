"use client";

import { useRef, useEffect, useState } from "react";
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
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  // ssr:false wrapper means this always runs in browser — safe to read window
  const [vw, setVw] = useState<number>(window.innerWidth);
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = vw < 640;
  const desktopScale = Math.min(1, vw / 1000);
  const bottleW = Math.min(160, Math.round(vw * 0.4));

  return (
    <section
      ref={ref}
      className="relative w-full flex flex-col items-center justify-center"
      style={{ background: "#FAF8F4", padding: isMobile ? "48px 0 56px" : "60px 0" }}
    >
      {/* Central glow — purely decorative, pointer-events none, doesn't affect layout */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: isMobile ? 260 : 600,
          height: isMobile ? 260 : 600,
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

      {/* ─────────────────────────────────────────────────────────────
          MOBILE  (<640px)
          Pure flex-column flow — no absolute positioning at all.
          Each element takes its natural height; nothing can overlap.
      ───────────────────────────────────────────────────────────── */}
      {isMobile ? (
        <div className="relative z-10 flex flex-col items-center w-full px-6">

          {/* Lemon bottle + label — outer: entrance, inner: float loop */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex flex-col items-center"
              initial={{ y: 0 }}
              animate={isInView ? { y: [0, -10, 0] } : { y: 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.0 }}
            >
              <img
                src="/lemon-bottle-removebg-preview.png"
                alt="Lemon Mint Sage"
                style={{
                  width: bottleW,
                  height: "auto",
                  display: "block",
                  filter: "drop-shadow(0 16px 32px rgba(95,122,31,0.35))",
                }}
              />
              <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#5F7A1F]/50 mt-2 block">
                Lemon Mint Sage
              </span>
            </motion.div>
          </motion.div>

          {/* Ingredient pills — fixed height, no animation that shifts position */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-6 mb-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {ingredients.map((ing) => (
              <span
                key={ing.label}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase font-bold"
                style={{
                  background: "rgba(95,122,31,0.07)",
                  border: "1px solid rgba(95,122,31,0.14)",
                  color: "rgba(95,122,31,0.65)",
                }}
              >
                {ing.emoji} {ing.label}
              </span>
            ))}
          </motion.div>

          {/* Peach bottle + label — outer: entrance, inner: float loop */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex flex-col items-center"
              initial={{ y: 0 }}
              animate={isInView ? { y: [0, -10, 0] } : { y: 0 }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
            >
              <img
                src="/peach-bottle-removebg-preview.png"
                alt="Juicy Peach"
                style={{
                  width: bottleW,
                  height: "auto",
                  display: "block",
                  filter: "drop-shadow(0 16px 32px rgba(246,217,168,0.5))",
                }}
              />
              <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#5F7A1F]/50 mt-2 block">
                Juicy Peach
              </span>
            </motion.div>
          </motion.div>
        </div>

      ) : (
        /* ─────────────────────────────────────────────────────────────
            DESKTOP / TABLET  (≥640px)
            Absolute-positioned scene — unchanged from original.
        ───────────────────────────────────────────────────────────── */
        <div
          className="relative flex items-center justify-center w-full overflow-hidden"
          style={{ height: 420 }}
        >
          {/* Orbiting ingredient labels */}
          {ingredients.map((ing, i) => {
            const rad = (ing.angle * Math.PI) / 180;
            const r   = ing.radius * desktopScale;
            const tx  = Math.cos(rad) * r;
            const ty  = Math.sin(rad) * r;
            return (
              <motion.div
                key={ing.label}
                className="absolute flex flex-col items-center gap-1 pointer-events-none select-none"
                style={{ x: tx, y: ty, zIndex: 1 }}
                initial={{ opacity: 0, scale: 0.2 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.span
                  className="text-2xl"
                  animate={isInView ? { rotate: [0, 8, -8, 0], y: [0, -5, 0] } : {}}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: 1.2 + i * 0.15 }}
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

          {/* Lemon bottle */}
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
              style={{ width: 220, filter: "drop-shadow(0 24px 48px rgba(95,122,31,0.4))" }}
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

          {/* Peach bottle */}
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
              style={{ width: 220, filter: "drop-shadow(0 24px 48px rgba(246,217,168,0.55))" }}
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
      )}

      {/* Tagline — always in normal flow below the scene */}
      <motion.div
        className="flex flex-col items-center gap-3 px-6 z-10"
        style={{ marginTop: isMobile ? 32 : 32 }}
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
