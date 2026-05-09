"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Flavours", href: "#flavours" },
  { label: "Why TISORA", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#FAF8F4]/90 backdrop-blur-xl shadow-sm border-b border-[#5F7A1F]/10"
            : "py-6 bg-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <Logo
              size="md"
              color="#5F7A1F"
            />
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-70 relative group text-[#5F7A1F]`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-current transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={() => scrollTo("#contact")}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm bg-[#F6D9A8] text-[#5F7A1F] hover:bg-[#efcd91]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Notified
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className={`block w-6 h-0.5 transition-colors duration-300 bg-[#5F7A1F]`}
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className={`block w-6 h-0.5 transition-colors duration-300 bg-[#5F7A1F]`}
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className={`block w-6 h-0.5 transition-colors duration-300 bg-[#5F7A1F]`}
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#FAF8F4] flex flex-col items-center justify-center"
            initial={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 95% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 95% 5%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center gap-8">
              <Logo size="lg" color="#5F7A1F" className="mb-4" />
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="font-playfair text-4xl text-[#5F7A1F] hover:text-[#AFC8A0] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollTo("#contact")}
                className="mt-4 px-8 py-3 rounded-full bg-[#F6D9A8] text-[#5F7A1F] font-semibold text-lg uppercase tracking-widest shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                Get Notified
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
