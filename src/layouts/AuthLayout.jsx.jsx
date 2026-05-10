import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "@/components/common/Logo";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans  = { fontFamily: "'Montserrat', sans-serif" };

const QUOTES = [
  { text: "Style is a way to say who you are without having to speak.", author: "Rachel Zoe" },
  { text: "Elegance is not about being noticed, it is about being remembered.", author: "Giorgio Armani" },
  { text: "Fashion is the armor to survive the reality of everyday life.", author: "Bill Cunningham" },
];
const Q = QUOTES[Math.floor(Math.random() * QUOTES.length)];

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f8f7f5", ...sans }}>

      {/* ── LEFT BRAND PANEL ──────────────────────── */}
      <div
        className="hidden lg:flex lg:w-[48%] xl:w-[44%] relative flex-col justify-between p-14 overflow-hidden"
        style={{ backgroundColor: "#1c1917" }}
      >
        {/* Subtle warm vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(180,140,100,0.10) 0%, transparent 70%)",
          }}
        />

        {/* Faint decorative grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Top: Brand mark */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10"
        >
          <Logo color="white" size="md" />
        </motion.div>

        {/* Middle: Large decorative character */}
        <motion.div
          className="relative z-10 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
        >
          <p
            className="text-[22vw] lg:text-[16rem] xl:text-[18rem] font-light leading-none text-white/[0.03] absolute -left-8 -top-16 pointer-events-none"
            style={serif}
          >
            M
          </p>
          <div className="relative">
            <div className="w-10 h-px bg-stone-600 mb-8" />
            <blockquote
              className="text-2xl xl:text-3xl font-light leading-[1.4] text-stone-300 max-w-xs"
              style={serif}
            >
              <span style={{ fontStyle: "italic" }}>&ldquo;{Q.text}&rdquo;</span>
            </blockquote>
            <p className="mt-6 text-[11px] tracking-[0.3em] uppercase text-stone-600" style={sans}>
              — {Q.author}
            </p>
          </div>
        </motion.div>

        {/* Bottom: Links */}
        <motion.div
          className="relative z-10 flex gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {["Privacy", "Terms", "Support"].map((label) => (
            <Link
              key={label}
              to={`/${label.toLowerCase()}`}
              className="text-[10px] tracking-[0.25em] uppercase text-stone-600 hover:text-stone-300 cursor-pointer transition-colors duration-200"
              style={sans}
            >
              {label}
            </Link>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT FORM PANEL ──────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 relative">
        {/* Back link */}
        <motion.div
          className="absolute top-6 left-6"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-stone-400 hover:text-stone-700 cursor-pointer transition-colors duration-200"
            style={sans}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>
        </motion.div>

        {/* Glass card */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="rounded-3xl border border-white/70 p-10 shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
            }}
          >
            <Outlet />
          </div>

          {/* Subtle reflection below card */}
          <div
            className="mx-8 h-6 rounded-b-3xl opacity-20"
            style={{
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(10px)",
              filter: "blur(8px)",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
