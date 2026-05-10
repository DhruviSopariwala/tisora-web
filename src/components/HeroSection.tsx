"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import FloatingLeaves from "./FloatingLeaves";
import WebGLBackground from "./WebGLBackground";

// ── Depth Parallax hook ──────────────────────────────────────────────────────
function useMouseParallax(strength = 1) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    x.set(((e.clientX - cx) / cx) * strength * 30);
    y.set(((e.clientY - cy) / cy) * strength * 30);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { springX, springY, onMouseMove, onMouseLeave };
}

function ProductBottle({ flavor }: { flavor: "lemon" | "peach" }) {
  const isLemon = flavor === "lemon";
  const { springX, springY, onMouseMove, onMouseLeave } = useMouseParallax(isLemon ? 1.4 : 1.1);

  // Glow layer has its own slower spring
  const glowX = useSpring(useMotionValue(0), { stiffness: 30, damping: 15 });
  const glowY = useSpring(useMotionValue(0), { stiffness: 30, damping: 15 });

  // Page scroll drives the rotation — visible range is 0–30% of page scroll
  const { scrollYProgress } = useScroll();
  const rotateYRaw = useTransform(
    scrollYProgress,
    [0, 0.25],
    [isLemon ? 0 : 0, isLemon ? 35 : -35]
  );
  const rotateY = useSpring(rotateYRaw, { stiffness: 50, damping: 18 });

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: isLemon ? 0.6 : 0.8 }}
      className="relative flex justify-center items-center"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Glow behind bottle */}
      <motion.div
        className="absolute rounded-full blur-2xl pointer-events-none"
        style={{
          width: 120,
          height: 120,
          background: isLemon
            ? "radial-gradient(circle, rgba(175,200,160,0.35), transparent)"
            : "radial-gradient(circle, rgba(246,217,168,0.35), transparent)",
          x: glowX,
          y: glowY,
        }}
      />

      {/* Mouse Y offset wrapper — separate from entrance animation */}
      <motion.div style={{ y: springY }}>
        {/* Bottle — mouse X parallax + scroll Y rotation + float */}
        <motion.div
          style={{
            x: springX,
            rotateY,
            transformPerspective: 800,
          }}
          animate={{ y: [0, -14, 0] }}
          transition={{ y: { duration: 5 + (isLemon ? 0 : 1), repeat: Infinity, ease: "easeInOut" } }}
        >
          <img
            src={isLemon
              ? "/lemon-bottle-removebg-preview.png"
              : "/peach-bottle-removebg-preview.png"}
            alt={isLemon ? "TISORA HyTea Lemon" : "TISORA HyTea Peach"}
            className="w-[140px] sm:w-[160px] md:w-[200px] lg:w-[220px] h-auto object-contain drop-shadow-xl"
            style={{
              filter: isLemon
                ? "drop-shadow(0 20px 40px rgba(95,122,31,0.3))"
                : "drop-shadow(0 20px 40px rgba(246,217,168,0.4))",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  // Scroll-driven depth layers
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const layer1Y = useTransform(scrollYProgress, [0, 1], ["0px", "80px"]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], ["0px", "140px"]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], ["0px", "200px"]);

  // Page-level mouse parallax for background orbs
  const bgMouseX = useMotionValue(0);
  const bgMouseY = useMotionValue(0);
  const bgSpringX = useSpring(bgMouseX, { stiffness: 25, damping: 18 });
  const bgSpringY = useSpring(bgMouseY, { stiffness: 25, damping: 18 });

  // Second orb has its own slower spring (no inline hooks)
  const orb2X = useSpring(useMotionValue(0), { stiffness: 20, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    bgMouseX.set(((e.clientX - cx) / cx) * 18);
    bgMouseY.set(((e.clientY - cy) / cy) * 18);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden py-24 md:py-32"
      style={{ background: "#FAF8F4" }}
      onMouseMove={handleMouseMove}
    >
      {/* ── WebGL fluid background — absolute, z-index 0, behind everything ── */}
      <WebGLBackground />
      {/* ── Layer 1: Far background — slowest parallax ── */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: layer1Y, x: bgSpringX }}
      >
        {/* Large soft orbs */}
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 600, height: 600,
            top: "-10%", left: "-15%",
            background: "radial-gradient(circle, rgba(175,200,160,0.12), transparent)",
            x: bgSpringX,
            y: bgSpringY,
          }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 500, height: 500,
            bottom: "-5%", right: "-10%",
            background: "radial-gradient(circle, rgba(246,217,168,0.1), transparent)",
            x: orb2X,
          }}
        />
        <div className="absolute left-[-10%] top-[10%] w-[300px] md:w-[500px] h-auto opacity-[0.04] grayscale brightness-[0.9]">
          <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-contain invert" alt="" />
        </div>
        <div className="absolute right-[-10%] bottom-[5%] w-[400px] md:w-[600px] h-auto opacity-[0.03] grayscale brightness-[0.9]">
          <img src="https://images.unsplash.com/photo-1501004318641-729e8e22bd5e?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-contain invert" alt="" />
        </div>
      </motion.div>

      {/* ── Layer 2: Floating leaves — mid parallax ── */}
      <motion.div className="absolute inset-0 z-[1] pointer-events-none" style={{ y: layer2Y }}>
        <FloatingLeaves />
      </motion.div>

      {/* ── Layer 3: Foreground accent dots — fastest parallax ── */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ y: layer3Y, x: bgSpringX }}
      >
        {[
          { top: "15%", left: "8%", size: 6, color: "rgba(95,122,31,0.25)" },
          { top: "70%", left: "5%", size: 4, color: "rgba(175,200,160,0.3)" },
          { top: "25%", right: "7%", size: 5, color: "rgba(246,217,168,0.35)" },
          { top: "60%", right: "9%", size: 7, color: "rgba(95,122,31,0.2)" },
          { top: "45%", left: "12%", size: 3, color: "rgba(178,58,46,0.2)" },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: dot.size,
              height: dot.size,
              top: dot.top,
              left: (dot as { left?: string }).left,
              right: (dot as { right?: string }).right,
              background: dot.color,
            }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </motion.div>

      {/* ── Main Content ── */}
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

        {/* Product Display — bottles have their own per-element mouse parallax */}
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
            { icon: "🛡️", label: "TRUSTWORTHY" },
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
        <motion.div
          className="w-px bg-[#5F7A1F]"
          style={{ height: 40 }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
