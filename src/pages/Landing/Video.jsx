import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans  = { fontFamily: "'Montserrat', sans-serif" };

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const STATS = [
  { value: "120K+", label: "Happy Customers" },
  { value: "4,800+", label: "Products Listed" },
  { value: "98%",   label: "Satisfaction Rate" },
  { value: "60+",   label: "Countries Served" },
];

export const Video = () => {
  const paraRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: paraRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="bg-[#f8f7f5]">

      {/* ── Editorial statement ──────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] tracking-[0.35em] uppercase text-stone-400 mb-8"
            style={sans}
          >
            Why Maison
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-[clamp(2.2rem,5.5vw,5rem)] font-light leading-[1.08] text-stone-900 max-w-4xl"
            style={serif}
          >
            The only commerce platform built for{" "}
            <em style={{ color: "#8c7b6b" }}>fashion-first</em> brands —
            <br className="hidden md:block" /> wherever you sell.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-7 text-stone-500 text-base leading-relaxed max-w-xl"
            style={sans}
          >
            From curated online boutiques to global wholesale, Maison gives
            your brand a premium storefront and the tools to grow it — all in
            one place.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Two-column editorial images ──────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-3">
          {/* Left: tall hero image with parallax */}
          <div ref={paraRef} className="relative overflow-hidden h-[480px] md:h-[680px]">
            <motion.img
              src="https://images.pexels.com/photos/15160206/pexels-photo-15160206.jpeg?auto=compress&w=900&q=85"
              alt="Fashion editorial"
              className="absolute inset-0 w-full h-[110%] object-cover object-top"
              style={{ y: imgY }}
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Overlay text */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-8"
              style={{
                background: "linear-gradient(to top, rgba(10,9,8,0.65) 0%, transparent 100%)",
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-2" style={sans}>
                Spring / Summer
              </p>
              <p className="text-2xl font-light text-white" style={serif}>
                The Linen Edit
              </p>
            </motion.div>
          </div>

          {/* Right: stacked content */}
          <div className="flex flex-col gap-3">
            {/* Image top */}
            <div className="relative overflow-hidden h-64 md:h-[360px]">
              <motion.img
                src="https://images.pexels.com/photos/15160251/pexels-photo-15160251.jpeg?auto=compress&w=700&q=85"
                alt="Fashion accessories"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.06 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Stats card */}
            <div className="bg-stone-900 p-8 flex-1 flex flex-col justify-between">
              <p className="text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-6" style={sans}>
                By the numbers
              </p>
              <div className="grid grid-cols-2 gap-6">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-3xl font-light text-white leading-none" style={serif}>
                      {s.value}
                    </p>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-stone-500 mt-1.5" style={sans}>
                      {s.label}
                    </p>
                  </motion.div>
                ))}
              </div>
              <motion.a
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-[11px] tracking-[0.25em] uppercase text-stone-400 cursor-pointer group hover:text-white transition-colors duration-200"
                style={sans}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.18 }}
              >
                Learn more
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Full-width marquee tagline ────────────── */}
      <div className="overflow-hidden py-10 border-y border-stone-200 bg-white mt-6">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, ri) => (
            <React.Fragment key={ri}>
              {["Premium Quality", "Effortless Style", "Global Delivery", "Sustainable Fashion", "Curated Collections", "Seamless Checkout"].map((text) => (
                <span
                  key={text}
                  className="text-[clamp(1.1rem,2.5vw,1.6rem)] font-light text-stone-300 tracking-wide"
                  style={serif}
                >
                  {text}
                  <span className="mx-8 text-stone-200">·</span>
                </span>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
