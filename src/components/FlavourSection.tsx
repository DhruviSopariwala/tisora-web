"use client";

import { useRef, useState, useEffect } from "react";
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
    blobColor: "rgba(175,200,160,0.2)",
    pourColor: "#5F7A1F",   // deep brand green — fully visible
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
    blobColor: "rgba(246,217,168,0.3)",
    pourColor: "#E8A045",   // warm deep peach/amber — fully visible
    mood: "Calm & Indulgent",
    bestFor: ["Afternoon treat", "Relaxation", "Social moments"],
    bottle: "/peach-bottle-removebg-preview.png",
  },
];

// ── Liquid Fill Canvas ───────────────────────────────────────────────────────
// Renders inside the section (not full screen).
// A sine-wave surface rises from bottom to top, then drains back down.
// The wave oscillates naturally as it moves — like liquid in a container.

function LiquidFill({ color, active }: { color: string; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let startTime: number | null = null;

    // Parse hex color to rgba
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const FILL_DURATION = 1400;  // ms to fill
    const DRAIN_DELAY   = 400;   // ms to hold at top before draining
    const DRAIN_DURATION = 1000; // ms to drain

    const draw = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Progress: 0 = empty, 1 = full
      let fillProgress = 0;
      if (elapsed < FILL_DURATION) {
        // ease in-out fill
        const t = elapsed / FILL_DURATION;
        fillProgress = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      } else if (elapsed < FILL_DURATION + DRAIN_DELAY) {
        fillProgress = 1;
      } else {
        const t = (elapsed - FILL_DURATION - DRAIN_DELAY) / DRAIN_DURATION;
        const clamped = Math.min(t, 1);
        fillProgress = 1 - (clamped < 0.5 ? 2 * clamped * clamped : -1 + (4 - 2 * clamped) * clamped);
      }

      // Water surface Y position (from bottom)
      const waterY = H - fillProgress * H;

      // Wave parameters — amplitude shrinks as fill approaches edges
      const edgeDamp = Math.sin(fillProgress * Math.PI); // 0 at empty/full, 1 at mid
      const amplitude = 18 * edgeDamp;
      const frequency = 0.012;
      const speed = elapsed * 0.002;

      // Draw liquid body
      ctx.beginPath();
      ctx.moveTo(0, H);

      // Wobbly wave surface using two overlapping sine waves
      for (let x = 0; x <= W; x += 2) {
        const wave1 = Math.sin(x * frequency + speed) * amplitude;
        const wave2 = Math.sin(x * frequency * 1.7 + speed * 1.3 + 1) * amplitude * 0.5;
        const y = waterY + wave1 + wave2;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(W, H);
      ctx.closePath();

      // Gradient fill — lighter at top, richer at bottom
      const grad = ctx.createLinearGradient(0, waterY, 0, H);
      grad.addColorStop(0, `rgba(${r},${g},${b},0.18)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0.38)`);
      ctx.fillStyle = grad;
      ctx.fill();

      // Subtle highlight line on wave surface
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const wave1 = Math.sin(x * frequency + speed) * amplitude;
        const wave2 = Math.sin(x * frequency * 1.7 + speed * 1.3 + 1) * amplitude * 0.5;
        const y = waterY + wave1 + wave2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${r},${g},${b},0.5)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      const totalDuration = FILL_DURATION + DRAIN_DELAY + DRAIN_DURATION;
      if (elapsed < totalDuration) {
        raf = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, W, H);
      }
    };

    if (active) {
      startTime = null;
      raf = requestAnimationFrame(draw);
    }

    return () => cancelAnimationFrame(raf);
  }, [active, color]);

  // Resize canvas to match parent
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function FlavourSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [activeId, setActiveId] = useState("lemon");
  const [fillColor, setFillColor] = useState("#5F7A1F");
  const [fillActive, setFillActive] = useState(false);
  const [pourKey, setPourKey] = useState(0);

  const active = flavours.find((f) => f.id === activeId)!;

  const { ref: bottleTilt, onMouseMove: bottleMove, onMouseLeave: bottleLeave } = useTilt({
    max: 20, scale: 1.08, speed: 400,
  });

  const handleFlavourSwitch = (id: string) => {
    if (id === activeId) return;
    const target = flavours.find((f) => f.id === id)!;

    // Start liquid fill animation
    setFillColor(target.pourColor);
    setPourKey((k) => k + 1);
    setFillActive(true);

    // Switch content at peak fill (~700ms into the 1400ms fill phase)
    setTimeout(() => setActiveId(id), 700);

    // Stop animation after full cycle (fill 1400 + hold 400 + drain 1000 = 2800ms)
    setTimeout(() => setFillActive(false), 2900);
  };

  return (
    <section
      id="flavours"
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: "96px 0" }}
    >
      {/* Liquid fill — canvas inside the section, not full screen */}
      <LiquidFill key={pourKey} color={fillColor} active={fillActive} />

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
            <span
              className="italic"
              style={{
                backgroundImage: "linear-gradient(135deg, #5F7A1F, #AFC8A0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              One obsession.
            </span>
          </h2>

          {/* Flavour toggle pills */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {flavours.map((f) => (
              <motion.button
                key={f.id}
                onClick={() => handleFlavourSwitch(f.id)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  background: activeId === f.id ? f.primaryColor : "rgba(255,255,255,0.6)",
                  color: activeId === f.id ? (f.id === "peach" ? "#5F7A1F" : "#FAF8F4") : "#5F7A1F",
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
              <div className="relative flex items-center justify-center">
                {/* Halo rings */}
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
                  style={{ width: 320, height: 320, borderColor: active.primaryColor + "40" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute rounded-full border"
                  style={{ width: 280, height: 280, borderColor: active.primaryColor + "25" }}
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
                <span className="text-4xl font-playfair font-bold" style={{ color: active.textColor }}>
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
