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
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0E5A43 0%, #1D6B4F 50%, #0a3d2e 100%)" }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.35, ease: "easeIn" }}
          >
            {/* Concentric rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 120 + i * 100,
                    height: 120 + i * 100,
                    border: "1px solid rgba(169,195,162,0.12)",
                  }}
                  animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
            </div>

            {/* Floating leaves */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute text-xl select-none pointer-events-none"
                style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 20}%` }}
                animate={{ y: [0, -25, 0], rotate: [0, 15, -10, 0], opacity: [0.08, 0.22, 0.08] }}
                transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 0.5 }}
              >
                🍃
              </motion.div>
            ))}

            {/* Logo block */}
            <motion.div
              className="relative z-10 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.75, y: 32 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* "Introducing" label */}
              <motion.span
                className="text-[#A9C3A2] text-xs tracking-[0.5em] uppercase font-light mb-4 block"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                Introducing
              </motion.span>

              {/* TISORA logo */}
              <Logo size="xl" color="#FAF7F2" />

              {/* HYTEA line */}
              <motion.div
                className="mt-3 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.div
                  className="h-px bg-[#A9C3A2]/50"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                />
                <span className="text-[#A9C3A2] text-xs tracking-[0.5em] uppercase">HYTEA</span>
                <motion.div
                  className="h-px bg-[#A9C3A2]/50"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                />
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="text-[#F6D34E] text-[11px] tracking-[0.3em] uppercase font-semibold mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Your Daily Reset Drink
              </motion.p>

              {/* Progress bar */}
              <motion.div
                className="mt-10 w-52"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-100"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, #A9C3A2, #F6D34E)",
                    }}
                  />
                </div>
                <p className="text-[#A9C3A2]/50 text-[10px] mt-2 text-center tracking-widest">
                  {progress < 100 ? "Loading..." : "Welcome"}
                </p>
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
              className="fixed inset-y-0 left-0 z-[10000]"
              style={{ width: "50%", background: "linear-gradient(to right, #0a3d2e, #0E5A43)" }}
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              exit={{}}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              key="wipe-right"
              className="fixed inset-y-0 right-0 z-[10000]"
              style={{ width: "50%", background: "linear-gradient(to left, #0a3d2e, #1D6B4F)" }}
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              exit={{}}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
