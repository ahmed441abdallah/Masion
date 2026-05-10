import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans  = { fontFamily: "'Montserrat', sans-serif" };

const SLIDES = [
  {
    image: "https://images.pexels.com/photos/33549627/pexels-photo-33549627.jpeg",
    tag:   "New Collection",
    title: "Effortless",
    title2: "Elegance",
    sub:   "Curated pieces for the modern wardrobe.",
  },
  {
    image: "https://images.pexels.com/photos/33549628/pexels-photo-33549628.jpeg",
    tag:   "Summer Edit",
    title: "Light &",
    title2: "Luminous",
    sub:   "Breathable fabrics crafted for warm days.",
  },
  {
    image: "https://images.pexels.com/photos/27849544/pexels-photo-27849544.jpeg",
    tag:   "Menswear",
    title: "Sharp",
    title2: "& Refined",
    sub:   "Tailored silhouettes for every occasion.",
  },
  {
    image: "https://images.pexels.com/photos/27849557/pexels-photo-27849557.jpeg",
    tag:   "Accessories",
    title: "The Final",
    title2: "Touch",
    sub:   "Elevate any look with precision accessories.",
  },
  {
    image: "https://images.pexels.com/photos/10617834/pexels-photo-10617834.jpeg",
    tag:   "Luxury Edit",
    title: "Timeless",
    title2: "Luxury",
    sub:   "Investment pieces that transcend seasons.",
  },
  {
    image: "https://images.pexels.com/photos/10617880/pexels-photo-10617880.jpeg",
    tag:   "Seasonal Drop",
    title: "New",
    title2: "Arrivals",
    sub:   "Fresh styles added every week.",
  },
];

const slideText = {
  hidden: { opacity: 0, y: 34 },
  show:   { opacity: 1, y: 0 },
  exit:   { opacity: 0, y: -20 },
};

const HeroSlider = () => {
  const [swiperInst, setSwiperInst] = useState(null);
  const [active, setActive] = useState(0);

  const total = SLIDES.length;
  const pad   = (n) => String(n + 1).padStart(2, "0");

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "100svh" }}>

      {/* ── Swiper ───────────────────────────────── */}
      <Swiper
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1600}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={setSwiperInst}
        onSlideChange={(s) => setActive(s.realIndex)}
        modules={[Autoplay, EffectFade, Navigation]}
        className="w-full h-full"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={i} className="relative w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Gradient overlay ─────────────────────── */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(10,9,8,0.72) 0%, rgba(10,9,8,0.18) 45%, rgba(10,9,8,0.30) 100%)",
        }}
      />

      {/* ── Top bar: brand tag + nav dots ────────── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-14 pt-10">
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            className="text-[10px] tracking-[0.35em] uppercase text-white/60"
            style={sans}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {SLIDES[active].tag}
          </motion.span>
        </AnimatePresence>
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className="h-px transition-all duration-500"
              style={{
                width: i === active ? 28 : 12,
                backgroundColor: i === active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Slide text ───────────────────────────── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 md:px-14 pb-28 md:pb-32 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial="hidden"
            animate="show"
            exit="exit"
            className="max-w-3xl"
          >
            <motion.h1
              variants={slideText}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.5rem,9vw,8rem)] font-light leading-[0.95] text-white"
              style={serif}
            >
              {SLIDES[active].title}
              <br />
              <em style={{ color: "#e8d5c0" }}>{SLIDES[active].title2}</em>
            </motion.h1>
            <motion.p
              variants={slideText}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-sm text-white/65 max-w-xs leading-relaxed"
              style={sans}
            >
              {SLIDES[active].sub}
            </motion.p>
            <motion.div
              variants={slideText}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex items-center gap-4 pointer-events-auto"
            >
              <a
                href="/shop"
                className="px-8 py-3.5 bg-white text-stone-900 text-[11px] tracking-[0.28em] uppercase cursor-pointer transition-all duration-200 hover:bg-stone-100"
                style={sans}
              >
                Shop Now
              </a>
              <a
                href="/about"
                className="flex items-center gap-2.5 text-[11px] tracking-[0.28em] uppercase text-white/80 cursor-pointer group transition-colors duration-200 hover:text-white"
                style={sans}
              >
                Our Story
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom-right: counter + arrows ───────── */}
      <div className="absolute bottom-10 right-8 md:right-14 z-20 flex items-center gap-6">
        {/* Slide counter */}
        <AnimatePresence mode="wait">
          <motion.span
            key={active}
            className="text-[11px] text-white/50 tabular-nums"
            style={sans}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {pad(active)} / {pad(total - 1)}
          </motion.span>
        </AnimatePresence>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => swiperInst?.slidePrev()}
            aria-label="Previous slide"
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white cursor-pointer transition-all duration-200 hover:bg-white/10 hover:border-white/60"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
          <button
            onClick={() => swiperInst?.slideNext()}
            aria-label="Next slide"
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white cursor-pointer transition-all duration-200 hover:bg-white/10 hover:border-white/60"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Bottom progress bar ───────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-white/10">
        <motion.div
          className="h-full bg-white/40"
          key={active}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default HeroSlider;
