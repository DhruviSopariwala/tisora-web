"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";

// Static leaf particle data — no Math.random() to avoid hydration mismatch
const LEAVES = [
  { emoji: "🍃", x: "10%",  size: 16, duration: 18, delay: 0,   drift: 30  },
  { emoji: "🌿", x: "25%",  size: 12, duration: 22, delay: 3,   drift: -20 },
  { emoji: "🍃", x: "40%",  size: 14, duration: 16, delay: 6,   drift: 25  },
  { emoji: "🌱", x: "55%",  size: 10, duration: 20, delay: 1,   drift: -30 },
  { emoji: "🍃", x: "70%",  size: 18, duration: 24, delay: 8,   drift: 20  },
  { emoji: "🌿", x: "82%",  size: 12, duration: 19, delay: 4,   drift: -15 },
  { emoji: "🍃", x: "92%",  size: 15, duration: 21, delay: 10,  drift: 28  },
];

const navLinks = [
  { label: "About",       href: "#about" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Flavours",    href: "#flavours" },
  { label: "Why TISORA",  href: "#why" },
  { label: "Contact",     href: "#contact" },
];

const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, var(--color-forest-green) 0%, #0a3d2e 100%)" }}
    >
      {/* Top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-sage-green/25 to-transparent" />

      {/* Drifting leaf particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {LEAVES.map((leaf, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 select-none"
            style={{ left: leaf.x, fontSize: leaf.size }}
            animate={{
              y: [0, -300],
              x: [0, leaf.drift, 0],
              rotate: [0, 180, 360],
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{
              duration: leaf.duration,
              delay: leaf.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {leaf.emoji}
          </motion.div>
        ))}
      </div>

      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full opacity-[0.04]" style={{ background: "var(--color-sage-green)" }} />
        <div className="absolute -top-16 -left-16 w-60 h-60 rounded-full opacity-[0.04]" style={{ background: "var(--color-citrus-yellow)" }} />
      </div>

      <div className="section-container relative z-10 py-16">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="mb-5">
              <Logo size="lg" color="var(--color-ivory)" />
              <p className="text-sage-green text-[10px] tracking-[0.45em] uppercase mt-2">
                HYTEA
              </p>
              <p className="text-citrus-yellow text-[10px] tracking-[0.25em] uppercase font-semibold mt-1">
                Your Daily Reset Drink
              </p>
            </div>
            <p className="text-sage-green/65 text-sm leading-relaxed max-w-xs mb-6">
              Natural iced tea infused with electrolytes, real ingredients,
              and refreshing flavour. Hydration, reimagined.
            </p>
            <motion.a
              href="https://instagram.com/tisora_hytea"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full"
              style={{
                background: "rgba(169,195,162,0.1)",
                border: "1px solid rgba(169,195,162,0.2)",
              }}
              whileHover={{ scale: 1.1, background: "rgba(169,195,162,0.2)" }}
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 text-sage-green" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </motion.a>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-ivory text-[10px] tracking-[0.35em] uppercase font-semibold mb-5">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="text-sage-green/65 hover:text-sage-green text-sm transition-colors text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Flavours */}
          <div>
            <h4 className="text-ivory text-[10px] tracking-[0.35em] uppercase font-semibold mb-5">
              Legal
            </h4>
            <ul className="space-y-3 mb-8">
              {legalLinks.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sage-green/65 hover:text-sage-green text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="text-ivory text-[10px] tracking-[0.35em] uppercase font-semibold mb-3">
              Flavours
            </h4>
            <div className="flex gap-4">
              <span className="text-sm text-sage-green">🍋 Lemon Mint Sage</span>
              <span className="text-sm text-peach-orange">🍑 Juicy Peach</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-sage-green/18 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-sage-green/40">
          <span>© 2025 TISORA. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <span className="text-peach-orange">♥</span> for the hydration generation
          </span>
          <span>HYTEA · Hydration Reimagined</span>
        </div>

      </div>
    </footer>
  );
}
