"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function FloatingLeaf({
  style,
  delay,
  duration,
  emoji,
}: {
  style: React.CSSProperties;
  delay: number;
  duration: number;
  emoji: string;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ fontSize: "1.5rem", ...style }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -8, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {emoji}
    </motion.div>
  );
}

function IceCube({ style, delay }: { style: React.CSSProperties; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      animate={{ y: [0, -18, 0], rotate: [0, 6, -4, 0] }}
      transition={{ duration: 5 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(200,230,220,0.35) 50%, rgba(255,255,255,0.15) 100%)",
          border: "1px solid rgba(255,255,255,0.45)",
          backdropFilter: "blur(6px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 16px rgba(14,90,67,0.15)",
        }}
      />
    </motion.div>
  );
}

function ProductCan({ flavor }: { flavor: "lemon" | "peach" }) {
  const isLemon = flavor === "lemon";
  const primary = isLemon ? "#F6D34E" : "#F7A76C";
  const secondary = isLemon ? "#B68B5E" : "#E8855A";

  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: isLemon ? 0 : 1 }}
      whileHover={{ scale: 1.06 }}
    >
      <svg
        viewBox="0 0 120 220"
        style={{
          width: 110,
          filter: `drop-shadow(0 16px 32px ${primary}70)`,
        }}
      >
        <defs>
          <linearGradient id={`cg-${flavor}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={secondary} stopOpacity="0.75" />
            <stop offset="35%" stopColor={primary} />
            <stop offset="65%" stopColor={primary} />
            <stop offset="100%" stopColor={secondary} stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id={`tg-${flavor}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ccc" />
            <stop offset="100%" stopColor="#999" />
          </linearGradient>
          <linearGradient id={`sg-${flavor}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <ellipse cx="60" cy="22" rx="42" ry="8" fill={`url(#tg-${flavor})`} />
        <rect x="52" y="14" width="16" height="4" rx="2" fill="#888" />
        <rect x="58" y="10" width="4" height="8" rx="1" fill="#999" />
        <path d="M18 22 Q18 18 60 18 Q102 18 102 22 L102 195 Q102 210 60 210 Q18 210 18 195 Z" fill={`url(#cg-${flavor})`} />
        <path d="M18 22 Q18 18 60 18 Q102 18 102 22 L102 195 Q102 210 60 210 Q18 210 18 195 Z" fill={`url(#sg-${flavor})`} />
        <ellipse cx="60" cy="200" rx="42" ry="10" fill={secondary} opacity="0.65" />
        <text x="60" y="55" textAnchor="middle" fontSize="20">{isLemon ? "🍋" : "🍑"}</text>
        <text x="60" y="98" textAnchor="middle" fill="#FAF7F2" fontSize="10" fontWeight="bold" fontFamily="serif" letterSpacing="3">TISORA</text>
        <text x="60" y="116" textAnchor="middle" fill="#FAF7F2" fontSize="17" fontWeight="bold" fontFamily="serif" letterSpacing="2">HYTEA</text>
        <text x="60" y="132" textAnchor="middle" fill="#FAF7F2" fontSize="7.5" fontFamily="sans-serif" letterSpacing="2" opacity="0.9">{isLemon ? "LEMON" : "PEACH"}</text>
        <line x1="32" y1="142" x2="88" y2="142" stroke="#FAF7F2" strokeWidth="0.5" opacity="0.4" />
        <text x="60" y="154" textAnchor="middle" fill="#FAF7F2" fontSize="5.5" fontFamily="sans-serif" letterSpacing="1" opacity="0.65">WITH ELECTROLYTES</text>
      </svg>
    </motion.div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const leaves = [
    { emoji: "🍃", style: { top: "18%", left: "4%" },  delay: 0,   duration: 7 },
    { emoji: "🌿", style: { top: "38%", left: "7%" },  delay: 1.2, duration: 8 },
    { emoji: "🍃", style: { top: "62%", left: "3%" },  delay: 2,   duration: 6 },
    { emoji: "🌱", style: { top: "78%", left: "9%" },  delay: 0.6, duration: 9 },
    { emoji: "🍃", style: { top: "14%", right: "5%" }, delay: 1.5, duration: 7 },
    { emoji: "🌿", style: { top: "44%", right: "4%" }, delay: 0.9, duration: 8 },
    { emoji: "🍃", style: { top: "68%", right: "8%" }, delay: 2.4, duration: 6 },
    { emoji: "🌱", style: { top: "84%", right: "5%" }, delay: 1.1, duration: 9 },
  ];

  const iceCubes = [
    { style: { top: "22%", left: "22%" }, delay: 0 },
    { style: { top: "66%", left: "16%" }, delay: 1.4 },
    { style: { top: "30%", right: "20%" }, delay: 0.7 },
    { style: { top: "72%", right: "24%" }, delay: 2 },
  ];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0E5A43 0%, #1D6B4F 35%, #0a3d2e 65%, #0E5A43 100%)" }}
    >
      {/* Parallax background orbs */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #A9C3A2, transparent)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #F6D34E, transparent)" }} />
        <div className="absolute top-1/2 right-1/3 w-56 h-56 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #F7A76C, transparent)" }} />
      </motion.div>

      {/* Floating leaves */}
      {leaves.map((l, i) => <FloatingLeaf key={i} {...l} />)}

      {/* Ice cubes */}
      {iceCubes.map((c, i) => <IceCube key={i} {...c} />)}

      {/* ── Main content ── */}
      <motion.div
        className="section-container relative z-10 flex flex-col items-center text-center"
        style={{ opacity: contentOpacity, paddingTop: "120px", paddingBottom: "100px" }}
      >
        {/* Badge */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="h-px w-8 bg-[#A9C3A2]/50" />
          <span className="text-[#A9C3A2] text-xs tracking-[0.45em] uppercase font-light">
            Launching Soon
          </span>
          <div className="h-px w-8 bg-[#A9C3A2]/50" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-playfair font-bold text-[#FAF7F2] leading-[1.1] mb-6"
          style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
        >
          Hydration,{" "}
          <span
            className="italic"
            style={{
              background: "linear-gradient(135deg, #A9C3A2, #F5EFE4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Reimagined.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-[#A9C3A2] font-light leading-relaxed mb-12 max-w-xl"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        >
          Natural iced tea infused with electrolytes, real ingredients,
          and refreshing flavour — crafted for those who choose better.
        </motion.p>

        {/* Product cans */}
        <motion.div
          className="flex items-end justify-center gap-10 md:gap-20 mb-14"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center gap-3">
            <ProductCan flavor="lemon" />
            <span className="text-[#F6D34E] text-xs tracking-[0.35em] uppercase font-medium">
              Lemon
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 pb-6 opacity-40">
            <div className="h-12 w-px bg-[#A9C3A2]" />
            <span className="text-[#A9C3A2] text-xs">×</span>
            <div className="h-12 w-px bg-[#A9C3A2]" />
          </div>

          <div className="flex flex-col items-center gap-3">
            <ProductCan flavor="peach" />
            <span className="text-[#F7A76C] text-xs tracking-[0.35em] uppercase font-medium">
              Peach
            </span>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide bg-[#FAF7F2] text-[#0E5A43] shadow-lg hover:bg-white transition-colors duration-300"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Coming Soon — Get Notified
          </motion.button>

          <motion.a
            href="https://instagram.com/tisora_hytea"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full font-medium text-sm tracking-wide border border-[#FAF7F2]/40 text-[#FAF7F2] hover:bg-[#FAF7F2]/10 transition-colors duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Follow on Instagram
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span className="text-[#A9C3A2]/50 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[#A9C3A2]/50 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          style={{ originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 left-0 right-0 h-full rounded-t-[50%]"
            style={{ background: `rgba(169,195,162,${0.07 - i * 0.02})` }}
            animate={{ scaleX: [1, 1.04, 0.98, 1], y: [0, -4, 2, 0] }}
            transition={{ duration: 4 + i, delay: i * 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </section>
  );
}
