import React from "react";
import { motion } from "framer-motion";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans  = { fontFamily: "'Montserrat', sans-serif" };

/* Text-based brand logos — premium typographic treatment */
const BRANDS = [
  { name: "ZARA",        style: { letterSpacing: "0.35em", fontWeight: 300 } },
  { name: "GUCCI",       style: { letterSpacing: "0.28em", fontWeight: 300 } },
  { name: "PRADA",       style: { letterSpacing: "0.32em", fontWeight: 300 } },
  { name: "BURBERRY",    style: { letterSpacing: "0.20em", fontWeight: 300 } },
  { name: "DIOR",        style: { letterSpacing: "0.45em", fontWeight: 300 } },
  { name: "HERMÈS",      style: { letterSpacing: "0.22em", fontWeight: 300 } },
  { name: "VALENTINO",   style: { letterSpacing: "0.18em", fontWeight: 300 } },
  { name: "BALENCIAGA",  style: { letterSpacing: "0.15em", fontWeight: 300 } },
  { name: "LOEWE",       style: { letterSpacing: "0.38em", fontWeight: 300 } },
  { name: "BOTTEGA",     style: { letterSpacing: "0.22em", fontWeight: 300 } },
];

/* Duplicate for seamless infinite loop */
const TRACK = [...BRANDS, ...BRANDS];

export const Companies = () => {
  return (
    <section className="bg-[#f8f7f5] py-20">

      {/* Label */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="text-[11px] tracking-[0.35em] uppercase text-stone-400"
          style={sans}
        >
          Trusted by the world&apos;s finest fashion houses
        </p>
      </motion.div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #f8f7f5, transparent)" }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #f8f7f5, transparent)" }} />

        <motion.div
          className="flex items-center gap-16 md:gap-24 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {TRACK.map((brand, i) => (
            <span
              key={i}
              className="text-[clamp(1rem,2vw,1.25rem)] text-stone-300 hover:text-stone-700 transition-colors duration-300 cursor-default select-none flex-shrink-0"
              style={{ ...serif, ...brand.style }}
            >
              {brand.name}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="mx-auto mt-12 h-px bg-stone-200 max-w-xs"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "center" }}
      />
    </section>
  );
};
