"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const mockPosts = [
  { id: 1, emoji: "🍋", caption: "Lemon Mint Sage — bright, zesty, electric. Coming soon. ✨", likes: "2.4k", bg: "linear-gradient(135deg, #FFFBEA, #FFF5C0)", border: "rgba(246,211,78,0.3)", tall: true },
  { id: 2, emoji: "🍑", caption: "Juicy Peach — soft, juicy, warm. The golden hour in a can. 🧡", likes: "3.1k", bg: "linear-gradient(135deg, #FFF5EE, #FFE8D4)", border: "rgba(247,167,108,0.3)", tall: false },
  { id: 3, emoji: "🌿", caption: "Real tea. Real electrolytes. Real refreshment. #TISORA #HYTEA", likes: "1.8k", bg: "linear-gradient(135deg, #F0F7F0, #E4F0E4)", border: "rgba(169,195,162,0.3)", tall: false },
  { id: 4, emoji: "⚡", caption: "Hydration, reimagined. What does your body deserve? 💧", likes: "4.2k", bg: "linear-gradient(135deg, #F5EFE4, #EDE5D8)", border: "rgba(14,90,67,0.12)", tall: true },
  { id: 5, emoji: "🍵", caption: "Natural tea extracts. Khandsari sugar & stevia. Electrolytes. That's it. 🌾", likes: "2.9k", bg: "linear-gradient(135deg, #FFFBEA, #F5EFE4)", border: "rgba(182,139,94,0.25)", tall: false },
  { id: 6, emoji: "🌱", caption: "The wellness drink you've been waiting for. #HydrationReimagined", likes: "5.6k", bg: "linear-gradient(135deg, #F0F7F0, #E4F0E4)", border: "rgba(29,107,79,0.18)", tall: false },
];

const igIcon = (
  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export default function SocialSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="social"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #F0EBE0 0%, #FAF7F2 100%)", padding: "96px 0" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-10" style={{ background: "#F7A76C" }} />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full blur-3xl opacity-10" style={{ background: "#F6D34E" }} />
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="block text-[#A9C3A2] text-xs tracking-[0.45em] uppercase font-medium mb-4">
            Follow Along
          </span>
          <h2
            className="font-playfair font-bold text-[#0E5A43] leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            Join the{" "}
            <span className="italic" style={{
              background: "linear-gradient(135deg, #0E5A43, #A9C3A2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              movement.
            </span>
          </h2>
          <p className="text-[#0E5A43]/55 max-w-md mx-auto text-sm md:text-base mb-8">
            Follow us on Instagram for launch updates, behind-the-scenes,
            and the freshest content from the TISORA world.
          </p>
          <motion.a
            href="https://instagram.com/tisora_hytea"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#FAF7F2]"
            style={{ background: "linear-gradient(135deg, #0E5A43, #1D6B4F)" }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(14,90,67,0.3)" }}
            whileTap={{ scale: 0.97 }}
          >
            {igIcon}
            @tisora_hytea
          </motion.a>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-14" style={{ gridAutoRows: "160px" }}>
          {mockPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://instagram.com/tisora_hytea"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden block"
              style={{
                background: post.bg,
                border: `1px solid ${post.border}`,
                gridRow: post.tall ? "span 2" : "span 1",
              }}
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.03, y: -4, zIndex: 10 }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <motion.span
                  className="text-5xl md:text-6xl"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity }}
                >
                  {post.emoji}
                </motion.span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#0E5A43]/88 flex flex-col items-center justify-center gap-2 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {igIcon}
                <p className="text-white text-xs text-center leading-snug mt-1">{post.caption}</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[#F7A76C] text-xs">♥</span>
                  <span className="text-[#A9C3A2] text-xs">{post.likes}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          className="rounded-3xl overflow-hidden relative text-center"
          style={{
            background: "linear-gradient(135deg, #0E5A43 0%, #1D6B4F 50%, #0a3d2e 100%)",
            padding: "56px 40px",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
          />
          <p className="text-[#A9C3A2] text-xs tracking-[0.4em] uppercase mb-4">Join the Community</p>
          <h3
            className="font-playfair font-bold text-[#FAF7F2] mb-3"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
          >
            Join the hydration movement.
          </h3>
          <p className="text-[#A9C3A2] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Your Daily Reset Drink
          </p>
          <p className="text-[#A9C3A2] text-sm mb-8 max-w-sm mx-auto leading-relaxed">
            Be part of something refreshing. Follow TISORA and be the first to know when HYTEA drops.
          </p>
          <motion.a
            href="https://instagram.com/tisora_hytea"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FAF7F2] text-[#0E5A43] font-semibold text-sm"
            whileHover={{ scale: 1.05, boxShadow: "0 12px 32px rgba(250,247,242,0.3)" }}
            whileTap={{ scale: 0.97 }}
          >
            Follow @tisora_hytea
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
