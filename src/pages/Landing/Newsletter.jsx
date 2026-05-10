import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans  = { fontFamily: "'Montserrat', sans-serif" };

export const Newsletter = () => {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden bg-stone-900 py-32 px-6">

      {/* Decorative background elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(180,140,100,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(140,123,110,0.06) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">

        {/* Pill badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9b090] animate-pulse" />
          <p className="text-[10px] tracking-[0.35em] uppercase text-stone-400" style={sans}>
            Exclusive Access
          </p>
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.05] text-white mb-6"
          style={serif}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Style delivered{" "}
          <em style={{ color: "#c9b090" }}>to you.</em>
        </motion.h2>

        <motion.p
          className="text-sm text-stone-500 leading-relaxed max-w-md mx-auto mb-12"
          style={sans}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Join our inner circle for early collection drops, private sales,
          and curated style guides — delivered fortnightly.
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full border border-stone-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-stone-300 text-sm" style={sans}>
                  You&apos;re on the list. Watch your inbox.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div
                  className="flex-1 rounded-xl transition-all duration-200"
                  style={{
                    boxShadow: focused
                      ? "0 0 0 1.5px rgba(201,176,144,0.5)"
                      : "none",
                  }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-white/5 border border-stone-700 rounded-xl px-5 py-3.5 text-sm text-stone-200 placeholder-stone-600 outline-none transition-all duration-200 focus:border-stone-500 cursor-text"
                    style={sans}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="px-8 py-3.5 bg-white text-stone-900 text-[11px] tracking-[0.28em] uppercase rounded-xl cursor-pointer transition-all duration-200 hover:bg-stone-100 whitespace-nowrap"
                  style={sans}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  Subscribe
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            { icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "No spam, ever" },
            { icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z", label: "Unsubscribe anytime" },
            { icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z", label: "Free shipping on first order" },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
              </svg>
              <span className="text-[10px] tracking-[0.18em] uppercase text-stone-600" style={sans}>
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
