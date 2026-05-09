"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setNotifySubmitted(true);
  };

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid rgba(14,90,67,0.15)",
    background: "rgba(14,90,67,0.03)",
    color: "#0E5A43",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden"
      style={{ padding: "96px 0" }}
    >
      {/* Rich background */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #F5EFE4 0%, #FAF7F2 50%, #F0EBE0 100%)" }}
      />

      {/* Animated orbs — contained behind content */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, #A9C3A2, transparent)" }}
          animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-15"
          style={{ background: "radial-gradient(circle, #F6D34E, transparent)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full blur-3xl opacity-10"
          style={{ background: "radial-gradient(circle, #F7A76C, transparent)" }}
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
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
            Stay Connected
          </span>
          <h2
            className="font-playfair font-bold text-[#0E5A43] leading-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
          >
            Be first to{" "}
            <span className="italic" style={{
              background: "linear-gradient(135deg, #0E5A43, #A9C3A2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              taste it.
            </span>
          </h2>
          <p className="text-[#0E5A43]/60 max-w-lg mx-auto text-sm md:text-base">
            HYTEA is launching soon. Sign up for launch updates, exclusive
            early access, and the freshest news from TISORA.
          </p>
        </motion.div>

        {/* Two-column forms */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Launch notification */}
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0E5A43 0%, #1D6B4F 100%)",
              padding: "40px 36px",
            }}
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15 }}
          >
            {/* Decorative blobs — inside overflow-hidden so they stay clipped */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 translate-x-1/3 -translate-y-1/3" style={{ background: "#A9C3A2" }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10 -translate-x-1/3 translate-y-1/3" style={{ background: "#F6D34E" }} />

            <div className="relative z-10">
              <div className="text-4xl mb-5">🚀</div>
              <h3 className="font-playfair text-2xl font-bold text-[#FAF7F2] mb-3">
                Launch Notification
              </h3>
              <p className="text-[#A9C3A2] text-sm leading-relaxed mb-8">
                Be the first to know when HYTEA drops. We'll send you an
                exclusive early access link the moment we launch.
              </p>

              <AnimatePresence mode="wait">
                {!notifySubmitted ? (
                  <motion.form
                    key="nf"
                    onSubmit={handleNotify}
                    className="space-y-4"
                    exit={{ opacity: 0 }}
                  >
                    <input
                      type="email"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      style={{
                        width: "100%",
                        padding: "14px 18px",
                        borderRadius: 12,
                        border: "1px solid rgba(255,255,255,0.2)",
                        background: "rgba(255,255,255,0.1)",
                        color: "#FAF7F2",
                        fontSize: "0.875rem",
                        outline: "none",
                      }}
                      className="placeholder-[#A9C3A2]/55"
                    />
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-[#FAF7F2] text-[#0E5A43] font-semibold text-sm tracking-wide disabled:opacity-60"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.span
                            className="inline-block w-4 h-4 border-2 border-[#0E5A43]/25 border-t-[#0E5A43] rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                          />
                          Signing up...
                        </span>
                      ) : "Notify Me at Launch →"}
                    </motion.button>
                    <p className="text-[#A9C3A2]/45 text-xs text-center">No spam. Unsubscribe anytime.</p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="ns"
                    className="text-center py-6"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 220 }}
                  >
                    <div className="text-5xl mb-4">🎉</div>
                    <h4 className="font-playfair text-xl font-bold text-[#FAF7F2] mb-2">You're on the list!</h4>
                    <p className="text-[#A9C3A2] text-sm">We'll reach out the moment HYTEA launches.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(14,90,67,0.1)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              padding: "40px 36px",
            }}
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.25 }}
          >
            <div className="text-4xl mb-5">✉️</div>
            <h3 className="font-playfair text-2xl font-bold text-[#0E5A43] mb-3">
              Get in Touch
            </h3>
            <p className="text-[#0E5A43]/55 text-sm leading-relaxed mb-8">
              Questions, partnerships, press enquiries — we'd love to hear from you.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="cf"
                  onSubmit={handleContact}
                  className="space-y-4"
                  exit={{ opacity: 0 }}
                >
                  {/* Name + Email stacked on mobile, side-by-side on sm+ */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-[#0E5A43]/50 tracking-[0.3em] uppercase mb-2">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        style={inputBase}
                        className="placeholder-[#0E5A43]/30"
                        onFocus={(e) => (e.target.style.borderColor = "rgba(14,90,67,0.4)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(14,90,67,0.15)")}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#0E5A43]/50 tracking-[0.3em] uppercase mb-2">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        style={inputBase}
                        className="placeholder-[#0E5A43]/30"
                        onFocus={(e) => (e.target.style.borderColor = "rgba(14,90,67,0.4)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(14,90,67,0.15)")}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#0E5A43]/50 tracking-[0.3em] uppercase mb-2">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what's on your mind..."
                      rows={4}
                      style={{ ...inputBase, resize: "none" }}
                      className="placeholder-[#0E5A43]/30"
                      onFocus={(e) => (e.target.style.borderColor = "rgba(14,90,67,0.4)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(14,90,67,0.15)")}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-[#FAF7F2] font-semibold text-sm tracking-wide disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #0E5A43, #1D6B4F)" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          className="inline-block w-4 h-4 border-2 border-white/25 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </span>
                    ) : "Send Message →"}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="cs"
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 220 }}
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="font-playfair text-xl font-bold text-[#0E5A43] mb-2">Message received!</h4>
                  <p className="text-[#0E5A43]/55 text-sm">We'll get back to you within 24 hours.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Social link */}
        <motion.div
          className="flex flex-col items-center mt-14 gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p className="text-[#0E5A43]/35 text-xs tracking-[0.4em] uppercase">Find us on</p>
          <motion.a
            href="https://instagram.com/tisora_hytea"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#0E5A43]/55 hover:text-[#0E5A43] transition-colors text-sm"
            whileHover={{ scale: 1.04 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @tisora_hytea
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
