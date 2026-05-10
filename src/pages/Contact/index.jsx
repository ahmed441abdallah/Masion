import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Typography tokens (matches About page)
───────────────────────────────────────────── */
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans  = { fontFamily: "'Montserrat', sans-serif" };

/* ─────────────────────────────────────────────
   Stagger container — children animate in sequence
───────────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

/* ─────────────────────────────────────────────
   Soft UI Input — focus glow + depth shift
───────────────────────────────────────────── */
const SoftInput = ({ label, type = "text", name, placeholder, required, value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
      <label
        className="text-[11px] tracking-[0.22em] uppercase text-stone-400 transition-colors duration-200"
        style={{ ...sans, color: focused ? "#292524" : undefined }}
      >
        {label}
        {required && <span className="ml-1 text-[#b5a090]">*</span>}
      </label>
      <div
        className="relative rounded-xl transition-all duration-200"
        style={{
          boxShadow: focused
            ? "0 0 0 2px #d6ccc2, 0 4px 18px 0 rgba(0,0,0,0.07)"
            : "0 1px 4px 0 rgba(0,0,0,0.06), inset 0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full bg-white rounded-xl px-4 py-3.5 text-sm text-stone-800 placeholder-stone-300 outline-none border border-stone-200 transition-all duration-200 cursor-text",
            focused && "border-stone-300 bg-white"
          )}
          style={sans}
        />
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Soft UI Textarea
───────────────────────────────────────────── */
const SoftTextarea = ({ label, name, placeholder, required, value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
      <label
        className="text-[11px] tracking-[0.22em] uppercase text-stone-400 transition-colors duration-200"
        style={{ ...sans, color: focused ? "#292524" : undefined }}
      >
        {label}
        {required && <span className="ml-1 text-[#b5a090]">*</span>}
      </label>
      <div
        className="relative rounded-xl transition-all duration-200"
        style={{
          boxShadow: focused
            ? "0 0 0 2px #d6ccc2, 0 4px 18px 0 rgba(0,0,0,0.07)"
            : "0 1px 4px 0 rgba(0,0,0,0.06), inset 0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          className={cn(
            "w-full bg-white rounded-xl px-4 py-3.5 text-sm text-stone-800 placeholder-stone-300 outline-none border border-stone-200 resize-none transition-all duration-200 cursor-text",
            focused && "border-stone-300"
          )}
          style={sans}
        />
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Bento Card wrapper
───────────────────────────────────────────── */
const BentoCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    className={cn(
      "bg-white rounded-2xl border border-stone-100 p-7 overflow-hidden relative",
      "shadow-[0_2px_12px_rgba(0,0,0,0.05)]",
      className
    )}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

/* ─────────────────────────────────────────────
   AI suggestions data
───────────────────────────────────────────── */
const AI_SUGGESTIONS = [
  "I'd like to know more about your bespoke tailoring service.",
  "What are the lead times for custom orders?",
  "I'm interested in wholesale / partnership opportunities.",
  "I need help with sizing for an online order.",
  "I'd like to schedule an in-atelier appointment.",
];

/* ═══════════════════════════════════════════
   CONTACT PAGE
═══════════════════════════════════════════ */
const ContactPage = () => {
  const [form, setForm]           = useState({ name: "", email: "", subject: "", message: "" });
  const [aiQuery, setAiQuery]     = useState("");
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* Simulate AI suggestion lookup */
  const handleAiInput = (e) => {
    const val = e.target.value;
    setAiQuery(val);
    if (val.trim().length < 2) { setAiSuggestions([]); return; }
    setAiLoading(true);
    setTimeout(() => {
      setAiSuggestions(
        AI_SUGGESTIONS.filter((s) =>
          s.toLowerCase().includes(val.toLowerCase())
        ).slice(0, 3)
      );
      setAiLoading(false);
    }, 380);
  };

  const applyAiSuggestion = (s) => {
    setForm((prev) => ({ ...prev, message: s }));
    setAiQuery("");
    setAiSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f5] text-[#1a1a1a]">

      {/* ── HERO HEADER ─────────────────────────── */}
      <motion.section
        className="max-w-6xl mx-auto px-6 pt-24 pb-16"
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        <motion.p
          variants={fadeUp}
          className="text-[11px] tracking-[0.35em] uppercase text-stone-400 mb-6"
          style={sans}
        >
          Get in Touch
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="text-[clamp(2.8rem,7vw,6rem)] font-light leading-[1.05] text-stone-900 max-w-2xl"
          style={serif}
        >
          We&apos;d love to{" "}
          <span style={{ fontStyle: "italic", color: "#8c7b6b" }}>hear</span>
          <br />from you.
        </motion.h1>
        <motion.div
          variants={fadeUp}
          className="mt-6 h-px bg-stone-200 max-w-xs"
        />
      </motion.section>

      {/* ── MAIN GRID ───────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 pb-28 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">

        {/* LEFT — Contact Form */}
        <div className="flex flex-col gap-6">

          {/* ── AI-Native Suggestion Box ──────────── */}
          <BentoCard delay={0.05} className="border-stone-200">
            <div className="flex items-center gap-2 mb-4">
              {/* AI pulse icon */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b5a090] opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8c7b6b]" />
              </span>
              <p className="text-[11px] tracking-[0.28em] uppercase text-stone-400" style={sans}>
                AI Message Assistant
              </p>
            </div>

            <p className="text-xs text-stone-400 mb-3 leading-relaxed" style={sans}>
              Describe what you need and we&apos;ll suggest how to phrase it.
            </p>

            {/* AI Input */}
            <div className="relative">
              <input
                type="text"
                value={aiQuery}
                onChange={handleAiInput}
                placeholder="e.g. &quot;I want to ask about custom orders…&quot;"
                className="w-full bg-[#f8f7f5] rounded-xl px-4 py-3 text-sm text-stone-700 placeholder-stone-300 outline-none border border-stone-200 transition-all duration-200 cursor-text focus:border-stone-300 focus:shadow-[0_0_0_2px_#e7e0d8]"
                style={sans}
              />
              {aiLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="block w-1.5 h-1.5 rounded-full bg-stone-300"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Suggestion pills */}
            <AnimatePresence>
              {aiSuggestions.length > 0 && (
                <motion.div
                  className="mt-3 flex flex-col gap-2"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {aiSuggestions.map((s) => (
                    <motion.button
                      key={s}
                      onClick={() => applyAiSuggestion(s)}
                      className="text-left text-xs text-stone-600 bg-stone-50 border border-stone-100 rounded-lg px-4 py-2.5 cursor-pointer transition-all duration-200 hover:bg-white hover:border-stone-300 hover:shadow-sm"
                      style={sans}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.15 }}
                    >
                      ↳ {s}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </BentoCard>

          {/* ── Contact Form ──────────────────────── */}
          <BentoCard delay={0.1}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center py-16 text-center"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="w-14 h-14 rounded-full border-2 border-stone-200 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-light text-stone-800 mb-3" style={serif}>
                    Message received.
                  </h3>
                  <p className="text-sm text-stone-400 max-w-xs leading-relaxed" style={sans}>
                    Thank you for reaching out. Our team will be in touch within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="mt-8 text-[11px] tracking-[0.25em] uppercase text-stone-400 underline underline-offset-4 cursor-pointer transition-colors duration-200 hover:text-stone-700"
                    style={sans}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.15 }}
                  >
                    Send another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <SoftInput
                      label="Full Name"
                      name="name"
                      placeholder="Your name"
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                    <SoftInput
                      label="Email Address"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <SoftInput
                    label="Subject"
                    name="subject"
                    placeholder="What is this regarding?"
                    value={form.subject}
                    onChange={handleChange}
                  />
                  <SoftTextarea
                    label="Message"
                    name="message"
                    placeholder="Tell us how we can help…"
                    required
                    value={form.message}
                    onChange={handleChange}
                  />

                  {/* Topic chips */}
                  <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                    {["General Enquiry", "Order Support", "Press", "Wholesale", "Careers"].map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, subject: topic }))}
                        className={cn(
                          "text-[10px] tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full border cursor-pointer transition-all duration-200",
                          form.subject === topic
                            ? "bg-stone-800 text-white border-stone-800"
                            : "bg-white text-stone-400 border-stone-200 hover:border-stone-400 hover:text-stone-700"
                        )}
                        style={sans}
                      >
                        {topic}
                      </button>
                    ))}
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <motion.button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-4 bg-stone-900 text-white text-[11px] tracking-[0.3em] uppercase rounded-xl cursor-pointer transition-all duration-200 hover:bg-stone-700 active:scale-[0.98]"
                      style={sans}
                      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.14)" }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                    >
                      Send Message
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </BentoCard>
        </div>

        {/* RIGHT — Bento Grid sidebar */}
        <div className="flex flex-col gap-6">

          {/* ── Bento: Quick contact ──────────────── */}
          <BentoCard delay={0.15} className="bg-stone-900 border-stone-800">
            <p className="text-[11px] tracking-[0.3em] uppercase text-stone-400 mb-6" style={sans}>
              Direct Lines
            </p>
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
                ),
                label: "Email",
                value: "hello@maison.co",
                href: "mailto:hello@maison.co",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
                ),
                label: "Phone",
                value: "+1 (212) 555-0194",
                href: "tel:+12125550194",
              },
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="flex items-start gap-4 group cursor-pointer mb-5 last:mb-0"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.18 }}
              >
                <div className="w-9 h-9 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-stone-700">
                  <svg className="w-4 h-4 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {item.icon}
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-0.5" style={sans}>{item.label}</p>
                  <p className="text-sm text-stone-200 group-hover:text-white transition-colors duration-200" style={sans}>{item.value}</p>
                </div>
              </motion.a>
            ))}
          </BentoCard>

          {/* ── Bento: Hours ──────────────────────── */}
          <BentoCard delay={0.2}>
            <p className="text-[11px] tracking-[0.3em] uppercase text-stone-400 mb-5" style={sans}>
              Atelier Hours
            </p>
            <div className="flex flex-col gap-3">
              {[
                { day: "Monday – Friday", time: "10:00 – 18:30" },
                { day: "Saturday",        time: "11:00 – 17:00" },
                { day: "Sunday",          time: "By appointment" },
              ].map(({ day, time }) => (
                <div key={day} className="flex justify-between items-center text-sm">
                  <span className="text-stone-500" style={sans}>{day}</span>
                  <span className="text-stone-800 font-medium" style={sans}>{time}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-stone-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs text-stone-400" style={sans}>Open now · Closes at 18:30</p>
            </div>
          </BentoCard>

          {/* ── Bento: Location / Map ─────────────── */}
          <BentoCard delay={0.25} className="p-0 overflow-hidden">
            <div className="relative h-52 bg-stone-100">
              <iframe
                title="Atelier Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=2.3288%2C48.8698%2C2.3488%2C48.8798&layer=mapnik&marker=48.8748%2C2.3388"
                className="w-full h-full border-0 opacity-90"
                loading="lazy"
              />
              {/* Premium map overlay tint */}
              <div className="absolute inset-0 pointer-events-none bg-stone-50/20 mix-blend-multiply" />
            </div>
            <div className="p-7">
              <p className="text-[11px] tracking-[0.3em] uppercase text-stone-400 mb-2" style={sans}>
                Our Atelier
              </p>
              <p className="text-sm text-stone-700 leading-relaxed" style={sans}>
                24 Rue du Faubourg Saint-Honoré<br />
                75008 Paris, France
              </p>
              <motion.a
                href="https://maps.google.com/?q=24+Rue+du+Faubourg+Saint-Honoré+Paris"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-[11px] tracking-[0.22em] uppercase text-stone-400 cursor-pointer transition-colors duration-200 hover:text-stone-800"
                style={sans}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.15 }}
              >
                Get Directions
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </motion.a>
            </div>
          </BentoCard>

          {/* ── Bento: Social ─────────────────────── */}
          <BentoCard delay={0.3}>
            <p className="text-[11px] tracking-[0.3em] uppercase text-stone-400 mb-5" style={sans}>
              Follow Along
            </p>
            <div className="flex gap-3">
              {[
                { label: "Instagram", href: "#", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
                { label: "Pinterest", href: "#", icon: "M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" },
                { label: "X", href: "#", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl border border-stone-200 flex items-center justify-center text-stone-400 cursor-pointer transition-all duration-200 hover:border-stone-400 hover:text-stone-700 hover:bg-white hover:shadow-sm"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.18 }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </BentoCard>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
