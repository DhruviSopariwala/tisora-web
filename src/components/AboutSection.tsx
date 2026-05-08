"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "100%", label: "Natural Ingredients" },
  { value: "0g",   label: "Artificial Additives" },
  { value: "2",    label: "Refreshing Flavours" },
  { value: "∞",    label: "Hydration Potential" },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#FAF7F2", padding: "96px 0 80px" }}
    >
      {/* Subtle background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-8 blur-3xl"
          style={{ background: "radial-gradient(circle, #0E5A43, transparent)" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-6 blur-3xl"
          style={{ background: "radial-gradient(circle, #A9C3A2, transparent)" }}
        />
        {/* Decorative leaf */}
        <svg className="absolute top-8 left-8 w-48 h-48 opacity-[0.04]" viewBox="0 0 200 200" fill="none">
          <path d="M100 10 C150 10,190 50,190 100 C190 150,150 190,100 190 C50 190,10 150,10 100 C10 50,50 10,100 10Z" fill="#0E5A43" />
        </svg>
      </div>

      <div className="section-container relative z-10">

        {/* ── Two-column layout ── */}
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
              className="font-playfair font-bold text-[#0E5A43] leading-[1.15] mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
            >
              Born from a<br />
              <span className="italic text-[#1D6B4F]">better thirst.</span>
            </h2>

            <div className="space-y-4 text-[#1D6B4F]/75 leading-relaxed mb-8">
              <p style={{ fontSize: "1.05rem" }}>
                TISORA was born from a simple question: why should staying hydrated
                mean compromising on taste, quality, or what goes into your body?
              </p>
              <p>
                We set out to create something different — a hydration drink that
                actually tastes like it was made with care. HYTEA blends real tea
                extracts with natural electrolytes and Khandsari sugar, delivering
                genuine refreshment without the artificial shortcuts.
              </p>
              <p>
                Every can is a commitment to transparency, taste, and the belief
                that what you drink should work as hard as you do.
              </p>
            </div>

            {/* Tag pills */}
            <div className="flex flex-wrap gap-2">
              {["Real Ingredients", "No Artificial Flavours", "Electrolyte Infused", "Khandsari Sugar", "Natural Tea"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide"
                  style={{
                    border: "1px solid rgba(14,90,67,0.18)",
                    color: "#0E5A43",
                    background: "rgba(14,90,67,0.05)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Main green card */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0E5A43 0%, #1D6B4F 100%)",
                padding: "40px",
              }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #A9C3A2, transparent)", transform: "translate(30%,-30%)" }} />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #F6D34E, transparent)", transform: "translate(-30%,30%)" }} />

              <div className="relative z-10">
                <div className="text-5xl mb-5">🍵</div>
                <h3 className="font-playfair text-2xl font-bold text-[#FAF7F2] mb-4">
                  The TISORA Promise
                </h3>
                <ul className="space-y-3">
                  {[
                    "Real tea, real taste — no shortcuts",
                    "Electrolytes for genuine hydration",
                    "Khandsari sugar — naturally refined",
                    "Crafted for the conscious consumer",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 16 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <span className="text-[#F6D34E] mt-0.5 flex-shrink-0 text-sm">✦</span>
                      <span className="text-[#A9C3A2] text-sm leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Floating accent badge — positioned inside the column, not overflowing */}
            <motion.div
              className="absolute bottom-4 right-4 rounded-2xl shadow-xl"
              style={{
                background: "#F5EFE4",
                border: "1px solid rgba(14,90,67,0.1)",
                padding: "16px 20px",
              }}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-2xl mb-1">🌿</div>
              <p className="text-[#0E5A43] font-semibold text-sm">Botanical</p>
              <p className="text-[#0E5A43]/55 text-xs">Freshness</p>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12"
          style={{ borderTop: "1px solid rgba(14,90,67,0.1)" }}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="font-playfair font-bold text-[#0E5A43] mb-1"
                style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
              >
                {s.value}
              </div>
              <div className="text-[#0E5A43]/55 text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
