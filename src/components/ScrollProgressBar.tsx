"use client";

import { useScroll, motion } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9998] h-[3px]"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "left center",
        background: "linear-gradient(90deg, var(--color-forest-green), var(--color-sage-green), var(--color-citrus-yellow), var(--color-peach-orange))",
      }}
    />
  );
}
