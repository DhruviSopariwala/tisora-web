"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #0E5A43 0%, #1D6B4F 50%, #0a3d2e 100%)",
            zIndex: 99999,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated background circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${100 + i * 80}px`,
                  height: `${100 + i * 80}px`,
                  border: "1px solid rgba(169, 195, 162, 0.15)",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
              />
            ))}
          </div>

          {/* Floating leaves */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`leaf-${i}`}
              className="absolute text-2xl pointer-events-none select-none"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              🍃
            </motion.div>
          ))}

          {/* Main content — no initial opacity:0 on the wrapper so background is never blank */}
          <div className="relative z-10 text-center flex flex-col items-center">

            {/* "Introducing" label */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.span
                className="text-[#A9C3A2] text-sm tracking-[0.4em] uppercase font-light"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
              >
                Introducing
              </motion.span>
            </motion.div>

            {/* TISORA Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <Logo size="xl" color="#FAF7F2" />
            </motion.div>

            {/* HYTEA divider */}
            <motion.div
              className="mt-4 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="h-px w-12 bg-[#A9C3A2] opacity-60" />
              <span className="text-[#A9C3A2] text-xs tracking-[0.5em] uppercase">
                HYTEA
              </span>
              <div className="h-px w-12 bg-[#A9C3A2] opacity-60" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-[#F6D34E] text-[11px] tracking-[0.3em] uppercase font-semibold mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Your Daily Reset Drink
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="mt-12 w-48 mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div
                className="h-px rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.2)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(to right, #A9C3A2, #F5EFE4)",
                    transition: "width 0.1s linear",
                  }}
                />
              </div>
              <p className="text-[#A9C3A2] text-xs mt-3 tracking-widest opacity-60">
                {progress < 100 ? "Loading..." : "Welcome"}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
