"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function ProductBottle({ flavor }: { flavor: "lemon" | "peach" }) {
  const isLemon = flavor === "lemon";

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: isLemon ? 0.6 : 0.8 }}
      className="relative flex justify-center items-center"
    >
      <img
        src={isLemon
          ? "/lemon-bottle-removebg-preview.png"
          : "/peach-bottle-removebg-preview.png"}
        alt={isLemon ? "TISORA HyTea Lemon" : "TISORA HyTea Peach"}
        className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[220px] h-auto object-contain drop-shadow-xl"
      />
    </motion.div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden py-24 md:py-32"
      style={{ background: "#FAF8F4" }}
    >
      {/* ── Fixed Background Elements ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -left-[10%] top-[10%] w-[300px] md:w-[500px] h-auto opacity-[0.04] grayscale brightness-[0.9]">
          <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-contain invert" alt="" />
        </div>
        <div className="absolute -right-[10%] bottom-[5%] w-[400px] md:w-[600px] h-auto opacity-[0.03] grayscale brightness-[0.9]">
          <img src="https://images.unsplash.com/photo-1501004318641-729e8e22bd5e?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-contain invert" alt="" />
        </div>
      </div>

      {/* ── Main Content Container ── */}
      <motion.div
        className="section-container relative z-10 flex flex-col items-center text-center w-full max-w-6xl px-6 gap-y-10 md:gap-y-16"
        style={{ opacity: contentOpacity }}
      >
        {/* Header Content */}
        <div className="flex flex-col items-center gap-y-6 md:gap-y-8">
          <motion.p
            className="text-[#5F7A1F] text-[10px] md:text-[12px] tracking-[0.5em] uppercase font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Daily Reset Drink
          </motion.p>

          <h1
            className="font-playfair font-bold text-[#5F7A1F] leading-[1.1] flex flex-wrap justify-center gap-x-4 md:gap-x-6"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hydration,
            </motion.span>
            <motion.span 
              className="italic font-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Reimagined.
            </motion.span>
          </h1>

          <motion.p
            className="text-[#5F7A1F]/70 font-medium leading-relaxed max-w-2xl text-sm md:text-lg px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Natural iced tea infused with electrolytes, real ingredients,<br className="hidden md:block" />
            and refreshing flavour — crafted for those who choose better.
          </motion.p>
        </div>

        {/* Product Display */}
        <div className="flex items-end justify-center gap-6 sm:gap-12 md:gap-24 w-full">
          <ProductBottle flavor="lemon" />
          <ProductBottle flavor="peach" />
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="flex items-center justify-center gap-6 sm:gap-12 md:gap-20 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { icon: "☀️", label: "FRESH" },
            { icon: "🍃", label: "CALMING" },
            { icon: "🛡️", label: "TRUSTWORTHY" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-lg md:text-xl opacity-70">{item.icon}</span>
              <span className="text-[9px] md:text-[11px] tracking-[0.3em] font-bold text-[#5F7A1F]/40 uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 opacity-20 pointer-events-none">
        <span className="text-[#5F7A1F] text-[9px] tracking-[0.4em] uppercase font-bold">Explore</span>
        <div className="w-px h-10 md:h-14 bg-[#5F7A1F]" />
      </div>
    </section>
  );
}