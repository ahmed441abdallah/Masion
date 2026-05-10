import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─────────────────────────────────────────────
   Shared style tokens
───────────────────────────────────────────── */
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans  = { fontFamily: "'Montserrat', sans-serif" };

/* ─────────────────────────────────────────────
   Kinetic Typography — words slide up one-by-one
───────────────────────────────────────────── */
const KineticHeading = ({ text, className = "", delay = 0, style = {} }) => (
  <span
    className={`inline ${className}`}
    style={{ ...serif, ...style }}
    aria-label={text}
  >
    {text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
        <motion.span
          className="inline-block"
          initial={{ y: "105%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.85,
            delay: delay + i * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      </span>
    ))}
  </span>
);

/* ─────────────────────────────────────────────
   Fade-in Image — opacity + subtle scale on scroll
───────────────────────────────────────────── */
const FadeImage = ({ src, alt, className = "", delay = 0 }) => (
  <motion.img
    src={src}
    alt={alt}
    className={className}
    initial={{ opacity: 0, scale: 1.06 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 1.1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
  />
);

/* ─────────────────────────────────────────────
   Soft fade-in for text blocks
───────────────────────────────────────────── */
const SoftFade = ({ children, delay = 0, className = "", style = {} }) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

/* ─────────────────────────────────────────────
   Thin divider line
───────────────────────────────────────────── */
const Divider = ({ className = "" }) => (
  <motion.div
    className={`h-px bg-stone-200 ${className}`}
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    style={{ transformOrigin: "left" }}
  />
);

/* ═══════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════ */
const AboutPage = () => {
  const craftRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: craftRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <div className="bg-[#faf9f7] text-[#1a1a1a] overflow-x-hidden">

      {/* ── 1. HERO ──────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <SoftFade delay={0.1}>
          <p
            className="text-[11px] tracking-[0.35em] uppercase text-stone-400 mb-10"
            style={sans}
          >
            Est. 2018 &nbsp;·&nbsp; Paris &nbsp;·&nbsp; Tokyo &nbsp;·&nbsp; New York
          </p>
        </SoftFade>

        <h1 className="text-[clamp(3rem,9vw,8rem)] font-light leading-[1.05] max-w-5xl">
          <KineticHeading text="Crafted for" delay={0.2} />
          <br />
          <KineticHeading
            text="the Quiet Luxury."
            delay={0.55}
            style={{ fontStyle: "italic", color: "#7c6f5e" }}
          />
        </h1>

        <SoftFade delay={1.0} className="mt-10 max-w-md">
          <p
            className="text-sm text-stone-500 leading-relaxed tracking-wide"
            style={sans}
          >
            We design for those who understand that true elegance is never
            announced — it is simply felt.
          </p>
        </SoftFade>

        {/* Scroll indicator */}
        <SoftFade delay={1.4} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div
            className="w-px h-14 bg-stone-300 origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 1.6, ease: "easeInOut" }}
          />
          <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400" style={sans}>
            Scroll
          </p>
        </SoftFade>
      </section>

      <Divider className="max-w-6xl mx-auto" />

      {/* ── 2. MANIFESTO ─────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <div>
          <SoftFade delay={0.1}>
            <p className="text-[11px] tracking-[0.35em] uppercase text-stone-400 mb-8" style={sans}>
              Our Manifesto
            </p>
          </SoftFade>
          <h2
            className="text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.2] mb-10 text-stone-800"
            style={serif}
          >
            <KineticHeading text={'\u201cLess is the'} delay={0.15} />
            <br />
            <KineticHeading
              text="ultimate form"
              delay={0.4}
              style={{ fontStyle: "italic" }}
            />
            <br />
            <KineticHeading text={'of sophistication.\u201d'} delay={0.65} />
          </h2>
          <SoftFade delay={0.9}>
            <p className="text-sm text-stone-500 leading-[1.9] max-w-sm" style={sans}>
              Every garment we create begins with a question: what can we
              remove? Stitched from intention, not trend — we build pieces
              that live beyond the season and speak without words.
            </p>
          </SoftFade>
          <SoftFade delay={1.1}>
            <div className="mt-10 flex items-center gap-4">
              <div className="w-8 h-px bg-stone-700" />
              <p className="text-[11px] tracking-[0.25em] uppercase text-stone-600" style={sans}>
                Founded by Élise Morel
              </p>
            </div>
          </SoftFade>
        </div>

        {/* Dimensional Image Stack */}
        <div className="relative h-[520px] hidden lg:block">
          {/* Back frame */}
          <motion.div
            className="absolute top-8 right-8 w-72 h-96 border border-stone-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          {/* Primary image */}
          <FadeImage
            src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80"
            alt="Luxury fashion atelier"
            className="absolute top-0 left-0 w-72 h-96 object-cover"
            delay={0.2}
          />
          {/* Secondary floating image */}
          <FadeImage
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80"
            alt="Fabric detail"
            className="absolute bottom-0 right-0 w-52 h-64 object-cover shadow-xl"
            delay={0.5}
          />
          {/* Accent label */}
          <motion.div
            className="absolute -bottom-6 left-4 bg-[#faf9f7] px-5 py-3 border border-stone-200"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400" style={sans}>
              Atelier &mdash; Paris
            </p>
          </motion.div>
        </div>
      </section>

      <Divider className="max-w-6xl mx-auto" />

      {/* ── 3. VALUES ────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <SoftFade delay={0.1} className="mb-20 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-stone-400 mb-6" style={sans}>
            What We Stand For
          </p>
          <h2
            className="text-[clamp(2.2rem,5vw,4rem)] font-light leading-tight text-stone-800"
            style={serif}
          >
            <KineticHeading text="Three pillars." delay={0.2} />
            <span className="italic text-[#7c6f5e]"> One vision.</span>
          </h2>
        </SoftFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-200">
          {[
            {
              number: "01",
              title: "Intention",
              body: "Nothing reaches the hanger by accident. Every seam, every drape, every silence in the silhouette is a deliberate choice.",
            },
            {
              number: "02",
              title: "Restraint",
              body: "We resist the impulse to add. Restraint is our creative muscle — the hardest discipline, and the most rewarding.",
            },
            {
              number: "03",
              title: "Longevity",
              body: "We make clothes for decades, not seasons. Timeless construction with materials that age the way great things should — gracefully.",
            },
          ].map((pillar, i) => (
            <SoftFade
              key={pillar.number}
              delay={0.15 * i}
              className="bg-[#faf9f7] p-12"
            >
              <p
                className="text-[11px] tracking-[0.3em] text-stone-300 mb-8"
                style={sans}
              >
                {pillar.number}
              </p>
              <h3
                className="text-2xl font-light text-stone-800 mb-5"
                style={serif}
              >
                {pillar.title}
              </h3>
              <p className="text-sm text-stone-500 leading-[1.9]" style={sans}>
                {pillar.body}
              </p>
            </SoftFade>
          ))}
        </div>
      </section>

      {/* ── 4. CRAFTSMANSHIP (Parallax) ───────────── */}
      <section ref={craftRef} className="relative h-[80vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: bgY }}
        >
          <img
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1400&q=85"
            alt="Craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1a1a1a]/55" />
        </motion.div>

        {/* Dimensional overlay card */}
        <div className="relative h-full flex items-center justify-center">
          <motion.div
            className="text-center text-white px-8 max-w-3xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[11px] tracking-[0.4em] uppercase text-white/50 mb-8"
              style={sans}
            >
              The Process
            </p>
            <h2
              className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-tight"
              style={serif}
            >
              <em>Seventy-two hours</em>
              <br />
              to cut a single coat.
            </h2>
            <p
              className="mt-8 text-sm text-white/60 leading-[1.9] max-w-md mx-auto"
              style={sans}
            >
              Our master tailors spend three days on a single piece. No
              shortcuts. No compromise. Just the quiet pursuit of perfect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 5. NUMBERS ───────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-32 grid grid-cols-2 md:grid-cols-4 gap-px bg-stone-200">
        {[
          { stat: "2018", label: "Year Founded" },
          { stat: "12", label: "Artisans" },
          { stat: "3", label: "Collections / Year" },
          { stat: "100%", label: "Natural Fabrics" },
        ].map((item, i) => (
          <SoftFade
            key={item.label}
            delay={0.1 * i}
            className="bg-[#faf9f7] py-14 px-8 text-center"
          >
            <p
              className="text-[clamp(2.5rem,5vw,4rem)] font-light text-stone-800 leading-none"
              style={serif}
            >
              {item.stat}
            </p>
            <p
              className="mt-3 text-[11px] tracking-[0.28em] uppercase text-stone-400"
              style={sans}
            >
              {item.label}
            </p>
          </SoftFade>
        ))}
      </section>

      <Divider className="max-w-6xl mx-auto" />

      {/* ── 6. TEAM ──────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-32">
        <SoftFade delay={0.1} className="mb-20">
          <p
            className="text-[11px] tracking-[0.35em] uppercase text-stone-400 mb-6"
            style={sans}
          >
            The People
          </p>
          <h2
            className="text-[clamp(2.2rem,5vw,4rem)] font-light text-stone-800 leading-tight"
            style={serif}
          >
            <KineticHeading text="Those behind" delay={0.2} />
            <br />
            <KineticHeading text="the silence." delay={0.45} style={{ fontStyle: "italic" }} />
          </h2>
        </SoftFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              name: "Élise Morel",
              role: "Founder & Creative Director",
              src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80",
            },
            {
              name: "Hiroshi Kato",
              role: "Head of Fabric & Materials",
              src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
            },
            {
              name: "Sofia Andersson",
              role: "Lead Atelier Tailor",
              src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
            },
          ].map((person, i) => (
            <SoftFade key={person.name} delay={0.15 * i}>
              <div className="group cursor-default">
                <div className="relative overflow-hidden mb-5">
                  <FadeImage
                    src={person.src}
                    alt={person.name}
                    className="w-full aspect-[3/4] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    delay={0.15 * i}
                  />
                </div>
                <p
                  className="text-lg font-light text-stone-800"
                  style={serif}
                >
                  {person.name}
                </p>
                <p
                  className="text-[11px] tracking-[0.22em] uppercase text-stone-400 mt-1"
                  style={sans}
                >
                  {person.role}
                </p>
              </div>
            </SoftFade>
          ))}
        </div>
      </section>

      <Divider className="max-w-6xl mx-auto" />

      {/* ── 7. CLOSING CTA ───────────────────────── */}
      <section className="py-40 px-6 text-center">
        <SoftFade delay={0.1}>
          <p
            className="text-[11px] tracking-[0.35em] uppercase text-stone-400 mb-10"
            style={sans}
          >
            Ready to Begin?
          </p>
        </SoftFade>
        <h2
          className="text-[clamp(2.5rem,7vw,6rem)] font-light leading-tight text-stone-800 max-w-4xl mx-auto"
          style={serif}
        >
          <KineticHeading text="Wear what you" delay={0.2} />
          <br />
          <KineticHeading
            text="believe in."
            delay={0.5}
            style={{ fontStyle: "italic", color: "#7c6f5e" }}
          />
        </h2>
        <SoftFade delay={0.9} className="mt-14">
          <motion.a
            href="/shop"
            className="inline-block border border-stone-800 text-stone-800 px-12 py-4 text-[11px] tracking-[0.3em] uppercase"
            style={{ ...sans, transition: "all 250ms ease" }}
            whileHover={{
              backgroundColor: "#1a1a1a",
              color: "#faf9f7",
            }}
            transition={{ duration: 0.25 }}
          >
            Explore the Collection
          </motion.a>
        </SoftFade>
      </section>

    </div>
  );
};

export default AboutPage;
