"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"loading" | "wiping" | "done">("loading");
  const [progress, setProgress] = useState(0);

  // Progress counter
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("wiping"), 800);
          return 100;
        }
        return prev + 1.8;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === "wiping") {
      setTimeout(() => setPhase("done"), 900);
    }
  }, [phase]);

  const letters = "TISORA".split("");

  // Generate random particles for antigravity effect
  const particles = useMemo(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: (i % 5) + 2,
      x: (i * 17) % 100,
      y: (i * 23) % 100,
      duration: (i % 5) * 3 + 10,
      delay: (i % 10),
    })), []);

  if (phase === "done") return null;

  return (
    <>
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            key="loader"
            className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
            style={{ 
              zIndex: 99999,
              background: "radial-gradient(circle at center, #134e3a 0%, #0a2a21 100%)" 
            }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {/* Antigravity Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full bg-sage-green/10"
                  style={{
                    width: p.size,
                    height: p.size,
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    filter: "blur(1px)",
                  }}
                  animate={{
                    y: [-20, -150],
                    opacity: [0, 0.3, 0],
                    x: [0, (p.id % 5) * 12 - 30],
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* Glowing Aura */}
            <motion.div 
              className="absolute w-[400px] h-[400px] rounded-full bg-sage-green/5 blur-[120px]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center">
              <motion.span
                className="text-sage-green/40 text-[9px] tracking-[0.8em] uppercase font-light mb-16 block"
                initial={{ opacity: 1, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
              >
                The Future of Hydration
              </motion.span>

              {/* Antigravity Wordmark */}
              <div className="flex gap-2 md:gap-5 mb-12">
                {letters.map((char, i) => (
                  <motion.span
                    key={i}
                    className="font-extrabold inline-block select-none text-white"
                    style={{ 
                      fontSize: "clamp(3rem, 12vw, 6rem)",
                      fontFamily: "'Montserrat', 'Arial Black', sans-serif",
                      textShadow: "0 20px 50px rgba(0,0,0,0.5)",
                      lineHeight: 1
                    }}
                    initial={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                    animate={{ 
                      y: [0, -15, 0], 
                    }}
                    transition={{
                      y: { 
                        duration: 3 + (i % 2), 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: i * 0.2 
                      }
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Subtitle */}
              <motion.div
                className="flex items-center gap-6"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="h-px bg-sage-green/20 w-16" />
                <span className="text-citrus-yellow text-[10px] tracking-[0.5em] uppercase font-semibold">
                  TISORA HYTEA
                </span>
                <div className="h-px bg-sage-green/20 w-16" />
              </motion.div>

              {/* Progress System */}
              <div className="mt-24 w-72">
                <div className="h-px w-full relative overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <motion.div
                    className="absolute inset-y-0 left-0"
                    style={{ 
                      width: `${progress}%`,
                      background: "linear-gradient(to right, transparent, var(--color-sage-green, #A9C3A2), transparent)"
                    }}
                  />
                  {/* Glowing head */}
                  <motion.div
                    className="absolute h-full w-20 bg-sage-green/30 blur-md"
                    style={{ left: `${progress - 10}%` }}
                  />
                </div>
                <div className="flex justify-between mt-3">
                  <span className="text-sage-green/30 text-[8px] uppercase tracking-[0.4em]">Optimizing Molecules</span>
                  <span className="text-ivory/40 text-[9px] font-mono tracking-tighter">{Math.round(progress)}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Wipe */}
      <AnimatePresence>
        {phase === "wiping" && (
          <motion.div
            key="wipe"
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 100000, background: "#0a2a21" }}
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 1.2, ease: [0.8, 0, 0.1, 1] }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
