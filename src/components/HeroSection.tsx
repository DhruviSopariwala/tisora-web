"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";

// Magnetic button — pulls toward cursor
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// Animated word reveal — slides up from below
function AnimatedWord({ word, delay = 0, className = "", style = {} }: {
  word: string; delay?: number; className?: string; style?: React.CSSProperties;
}) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      style={style}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {word}
    </motion.span>
  );
}

// Pre-computed bubble data — no Math.random() at render time
const BUBBLES = [
  { w: 7,  h: 5,  bottom: "22%", delay: 0 },
  { w: 9,  h: 8,  bottom: "4%",  delay: 0.5 },
  { w: 6,  h: 9,  bottom: "16%", delay: 1 },
  { w: 10, h: 9,  bottom: "22%", delay: 1.5 },
  { w: 5,  h: 7,  bottom: "2%",  delay: 2 },
  { w: 11, h: 8,  bottom: "28%", delay: 2.5 },
  { w: 8,  h: 10, bottom: "15%", delay: 3 },
  { w: 6,  h: 7,  bottom: "6%",  delay: 3.5 },
  { w: 8,  h: 4,  bottom: "12%", delay: 4 },
  { w: 9,  h: 11, bottom: "29%", delay: 4.5 },
  { w: 10, h: 5,  bottom: "7%",  delay: 5 },
  { w: 10, h: 10, bottom: "1%",  delay: 5.5 },
  { w: 6,  h: 6,  bottom: "6%",  delay: 6 },
  { w: 7,  h: 6,  bottom: "29%", delay: 6.5 },
  { w: 8,  h: 4,  bottom: "19%", delay: 7 },
  { w: 8,  h: 9,  bottom: "17%", delay: 7.5 },
];

// Bubble x-drift values (static, no random)
const BUBBLE_DRIFTS = [8, -6, 12, -10, 5, -8, 14, -5, 9, -12, 6, -9, 11, -7, 10, -11];

function Bubble({ w, h, bottom, delay, index }: {
  w: number; h: number; bottom: string; delay: number; index: number;
}) {
  const drift = BUBBLE_DRIFTS[index % BUBBLE_DRIFTS.length];
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: w,
        height: h,
        bottom,
        left: `${8 + index * 5.5}%`,
        background: "rgba(255,255,255,0.15)",
        border: "1px solid rgba(255,255,255,0.25)",
      }}
      animate={{
        y: [0, -120, -240],
        x: [0, drift, drift / 2],
        opacity: [0, 0.8, 0],
        scale: [0.5, 1, 0.3],
      }}
      transition={{
        duration: 4 + (index % 3),
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

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

function ProductBottle({ flavor }: { flavor: "lemon" | "peach" }) {
  const isLemon = flavor === "lemon";
  const { ref: tiltRef, onMouseMove, onMouseLeave } = useTilt({ max: 18, scale: 1.1, speed: 400 });

  return (
    <div
      ref={tiltRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: isLemon ? 0 : 1.2 }}
      >
        {/* Glow beneath bottle */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full blur-xl opacity-60"
          style={{
            background: isLemon
              ? "radial-gradient(ellipse, rgba(169,195,162,0.8), transparent)"
              : "radial-gradient(ellipse, rgba(247,167,108,0.8), transparent)",
          }}
        />
        <img
          src={isLemon
            ? "/lemon-bottle-removebg-preview.png"
            : "/peach-bottle-removebg-preview.png"}
          alt={isLemon ? "TISORA HyTea Lemon Mint Sage" : "TISORA HyTea Juicy Peach"}
          style={{
            width: 140,
            height: "auto",
            objectFit: "contain",
            filter: isLemon
              ? "drop-shadow(-8px 16px 24px rgba(14,90,67,0.5)) drop-shadow(8px 8px 16px rgba(169,195,162,0.3))"
              : "drop-shadow(-8px 16px 24px rgba(182,100,50,0.5)) drop-shadow(8px 8px 16px rgba(247,167,108,0.3))",
          }}
        />
      </motion.div>
    </div>
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
      {/* Animated gradient mesh — shifts like liquid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(169,195,162,0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 70%, rgba(246,211,78,0.12) 0%, transparent 60%)",
            "radial-gradient(ellipse 60% 80% at 70% 20%, rgba(169,195,162,0.2) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 30% 80%, rgba(247,167,108,0.1) 0%, transparent 60%)",
            "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(169,195,162,0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 70%, rgba(246,211,78,0.12) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

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

      {/* Rising bubbles — static data, no hydration mismatch */}
      {BUBBLES.map((b, i) => (
        <Bubble key={i} index={i} {...b} />
      ))}

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
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <motion.div
            className="h-px bg-[#A9C3A2]/50"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <span className="text-[#A9C3A2] text-xs tracking-[0.45em] uppercase font-light">
            Launching Soon
          </span>
          <motion.div
            className="h-px bg-[#A9C3A2]/50"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
        </motion.div>

        {/* Headline — word by word reveal */}
        <h1
          className="font-playfair font-bold text-[#FAF7F2] leading-[1.1] mb-4 flex flex-wrap justify-center gap-x-4"
          style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}
        >
          <AnimatedWord word="Hydration," delay={0.5} />
          <AnimatedWord
            word="Reimagined."
            delay={0.8}
            className="italic"
            style={{
              background: "linear-gradient(135deg, #A9C3A2, #F5EFE4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          />
        </h1>

        {/* Tagline */}
        <motion.p
          className="text-[#F6D34E] text-sm tracking-[0.3em] uppercase font-semibold mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          Your Daily Reset Drink
        </motion.p>

        {/* Subheadline */}
        <motion.p
          className="text-[#A9C3A2] font-light leading-relaxed mb-12 max-w-xl"
          style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
        >
          Natural iced tea infused with electrolytes, real ingredients,
          and refreshing flavour — crafted for those who choose better.
        </motion.p>

        {/* Product bottles — spring entrance */}
        <div className="flex items-end justify-center gap-10 md:gap-20 mb-14">
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 80, rotate: -10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 1.4, type: "spring", stiffness: 90, damping: 14 }}
          >
            <ProductBottle flavor="lemon" />
            <motion.span
              className="text-[#A9C3A2] text-xs tracking-[0.35em] uppercase font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1 }}
            >
              Lemon Mint Sage
            </motion.span>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-2 pb-6 opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.9 }}
          >
            <motion.div
              className="w-px bg-[#A9C3A2]"
              initial={{ height: 0 }}
              animate={{ height: 48 }}
              transition={{ duration: 0.5, delay: 2 }}
            />
            <span className="text-[#A9C3A2] text-xs">×</span>
            <motion.div
              className="w-px bg-[#A9C3A2]"
              initial={{ height: 0 }}
              animate={{ height: 48 }}
              transition={{ duration: 0.5, delay: 2 }}
            />
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 80, rotate: 10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 1.6, type: "spring", stiffness: 90, damping: 14 }}
          >
            <ProductBottle flavor="peach" />
            <motion.span
              className="text-[#F7A76C] text-xs tracking-[0.35em] uppercase font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              Juicy Peach
            </motion.span>
          </motion.div>
        </div>

        {/* CTA buttons — magnetic effect */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1 }}
        >
          <MagneticButton>
            <motion.button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide bg-[#FAF7F2] text-[#0E5A43] shadow-lg hover:bg-white transition-colors duration-300"
              whileTap={{ scale: 0.97 }}
            >
              Coming Soon — Get Notified
            </motion.button>
          </MagneticButton>

          <MagneticButton>
            <motion.a
              href="https://instagram.com/tisora_hytea"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full font-medium text-sm tracking-wide border border-[#FAF7F2]/40 text-[#FAF7F2] hover:bg-[#FAF7F2]/10 transition-colors duration-300 flex items-center gap-2"
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Follow on Instagram
            </motion.a>
          </MagneticButton>
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
