"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"loading" | "wiping" | "done">("loading");
  const [progress, setProgress] = useState(0);

  // Progress counter
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Small pause at 100%, then start wipe
          setTimeout(() => setPhase("wiping"), 400);
          return 100;
        }
        return prev + 2.5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // After wipe completes, unmount everything
  useEffect(() => {
    if (phase === "wiping") {
      setTimeout(() => setPhase("done"), 900);
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <>
      {/* ── Loading screen ── */}
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "#FAF8F4" }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
          >
            {/* Soft decorative background circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-[#5F7A1F]/5"
                  style={{
                    width: 200 + i * 150,
                    height: 200 + i * 150,
                  }}
                  animate={{ 
                    scale: [1, 1.1, 1], 
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 360] 
                  }}
                  transition={{ 
                    duration: 15 + i * 5, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                />
              ))}
            </div>

            {/* Floating botanical elements */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute text-2xl select-none pointer-events-none opacity-20"
                style={{ 
                  left: `${10 + i * 16}%`, 
                  top: `${15 + (i % 3) * 25}%`,
                  color: "#5F7A1F" 
                }}
                animate={{ 
                  y: [0, -40, 0], 
                  rotate: [0, 20, -20, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 6 + i, 
                  repeat: Infinity, 
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
              >
                {["🍃", "🌿", "🌱", "✨"][i % 4]}
              </motion.div>
            ))}

            {/* Logo block */}
            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* "TISORA" label */}
              <motion.span
                className="text-[#AFC8A0] text-[10px] tracking-[0.6em] uppercase font-bold mb-6 block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                The Future of
              </motion.span>

              {/* TISORA logo */}
              <div className="relative">
                <Logo size="xl" color="#5F7A1F" />
                {/* Glow effect under logo */}
                <motion.div 
                  className="absolute inset-0 -z-10 blur-2xl opacity-20"
                  style={{ background: "radial-gradient(circle, #F6D9A8, transparent)" }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>

              {/* HYTEA line */}
              <motion.div
                className="mt-6 flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  className="h-px bg-[#5F7A1F]/20"
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                />
                <span className="text-[#5F7A1F] text-xs tracking-[0.6em] uppercase font-bold">HYTEA</span>
                <motion.div
                  className="h-px bg-[#5F7A1F]/20"
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="text-brown-sugar text-[10px] tracking-[0.4em] uppercase font-bold mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                Your Daily Reset Drink
              </motion.p>

              {/* Progress interaction */}
              <motion.div
                className="mt-14 w-64 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="w-full h-px bg-[#5F7A1F]/10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#5F7A1F]"
                    style={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                </div>
                <div className="flex justify-between w-full mt-3">
                  <span className="text-[#5F7A1F]/40 text-[9px] tracking-widest uppercase font-bold">
                    {progress < 100 ? "Brewing Freshness" : "Ready"}
                  </span>
                  <span className="text-[#5F7A1F]/60 text-[9px] font-bold tabular-nums">
                    {Math.round(progress)}%
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cinematic wipe panels ── */}
      <AnimatePresence>
        {phase === "wiping" && (
          <>
            <motion.div
              key="wipe-left"
              className="fixed inset-y-0 left-0 z-10000"
              style={{ width: "50%", background: "#5F7A1F" }}
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              key="wipe-right"
              className="fixed inset-y-0 right-0 z-10000"
              style={{ width: "50%", background: "#5F7A1F" }}
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
