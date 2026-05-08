"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";

const stats = [
  { label: "Natural Ingredients" },
  { label: "Artificial Additives" },
  { label: "Refreshing Flavours" },
  { label: "Hydration Potential" },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leafY = useTransform(scrollYProgress, [0, 1], ["-20px", "60px"]);
  const blobY = useTransform(scrollYProgress, [0, 1], ["0px", "80px"]);

  // Glare effect state for the promise card
  const cardRef = useRef<HTMLDivElement>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const { ref: tiltRef, onMouseMove: tiltMove, onMouseLeave: tiltLeave } = useTilt({ max: 14, scale: 1.03, speed: 500 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    tiltMove(e);
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlare({ x, y, opacity: 0.15 });
  };

  const handleCardMouseLeave = () => {
    tiltLeave();
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  const setRefs = (el: HTMLDivElement | null) => {
    (cardRef as React.RefObject<HTMLDivElement | null>).current = el;
    (tiltRef as React.RefObject<HTMLDivElement | null>).current = el;
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#FAF7F2", padding: "96px 0 80px" }}
    >
      {/* Background blobs with parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-8 blur-3xl"
          style={{ background: "radial-gradient(circle, #0E5A43, transparent)", y: blobY }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-6 blur-3xl"
          style={{ background: "radial-gradient(circle, #A9C3A2, transparent)", y: blobY }}
        />
        <motion.svg
          className="absolute top-8 left-8 w-48 h-48 opacity-[0.04]"
          viewBox="0 0 200 200"
          fill="none"
          style={{ y: leafY }}
        >
          <path d="M100 10 C150 10,190 50,190 100 C190 150,150 190,100 190 C50 190,10 150,10 100 C10 50,50 10,100 10Z" fill="#0E5A43" />
        </motion.svg>
      </div>

      <div className="section-container relative z-10">

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="block text-[#A9C3A2] text-xs tracking-[0.45em] uppercase font-medium mb-4">
              Our Story
            </span>
            <h2
              className="font-playfair font-bold text-[#0E5A43] leading-[1.15] mb-3"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
            >
              Born from a<br />
              <span className="italic text-[#1D6B4F]">better thirst.</span>
            </h2>
            <p className="text-[#B68B5E] text-xs tracking-[0.35em] uppercase font-semibold mb-6">
              Your Daily Reset Drink
            </p>
            <div className="space-y-4 text-[#1D6B4F]/75 leading-relaxed mb-8">
              <p style={{ fontSize: "1.05rem" }}>
                TISORA is a daily lifestyle iced tea designed for health-conscious
                youth, office goers, and active individuals.
              </p>
              <p>
                Positioned in the functional hydration category, TISORA delivers a
                refreshing boost with natural green and black tea extracts, balanced
                with Khandsari sugar and stevia, plus essential vitamins and
                electrolytes.
              </p>
              <p>
                Unlike traditional sugary drinks, TISORA is a low-calorie, naturally
                sweetened beverage that supports daily focus and hydration.
              </p>
            </div>

            {/* Tag pills — staggered entrance */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              {["Real Ingredients", "No Artificial Flavours", "Electrolyte Infused", "Khandsari Sugar & Stevia", "Natural Tea"].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide"
                  style={{
                    border: "1px solid rgba(14,90,67,0.18)",
                    color: "#0E5A43",
                    background: "rgba(14,90,67,0.05)",
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 8 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.08, background: "rgba(14,90,67,0.1)" }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D tilt card with glare */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 32, rotateY: 20 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 70 }}
            style={{ perspective: "1000px" }}
          >
            <div
              ref={setRefs}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative rounded-3xl overflow-hidden cursor-default"
              style={{
                background: "linear-gradient(135deg, #0E5A43 0%, #1D6B4F 100%)",
                padding: "40px",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {/* Glare sweep */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
                style={{
                  opacity: glare.opacity,
                  background: `radial-gradient(circle 200px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.25), transparent)`,
                }}
              />

              {/* Shimmer sweep on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
              />

              <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #A9C3A2, transparent)", transform: "translate(30%,-30%)" }} />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #F6D34E, transparent)", transform: "translate(-30%,30%)" }} />

              <div className="relative z-10">
                <motion.div
                  className="text-5xl mb-5 inline-block"
                  animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  🍵
                </motion.div>
                <h3 className="font-playfair text-2xl font-bold text-[#FAF7F2] mb-4">
                  The TISORA Promise
                </h3>
                <ul className="space-y-3">
                  {[
                    "Real tea, real taste — no shortcuts",
                    "Electrolytes for genuine hydration",
                    "Khandsari sugar & stevia — naturally refined",
                    "Crafted for the conscious consumer",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.12, type: "spring", stiffness: 120 }}
                    >
                      <motion.span
                        className="text-[#F6D34E] mt-0.5 flex-shrink-0 text-sm"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      >
                        ✦
                      </motion.span>
                      <span className="text-[#A9C3A2] text-sm leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats labels row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12"
          style={{ borderTop: "1px solid rgba(14,90,67,0.1)" }}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <div className="text-[#0E5A43]/70 text-sm font-medium tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
