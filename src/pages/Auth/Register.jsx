import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast, ToastContainer } from "react-toastify";
import { register } from "@/store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Montserrat', sans-serif" };

/* ── Animation variants ─────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ── Soft UI Input ──────────────────────────── */
const AuthInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
  children,
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <motion.div variants={item} className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <label
          className="text-[10px] tracking-[0.25em] uppercase transition-colors duration-150"
          style={{ ...sans, color: focused ? "#292524" : "#a8a29e" }}
        >
          {label}
        </label>
        {children}
      </div>
      <div
        className="rounded-xl transition-all duration-150"
        style={{
          boxShadow: focused
            ? "0 0 0 2px #c8bfb5, 0 4px 16px rgba(0,0,0,0.07)"
            : "0 1px 3px rgba(0,0,0,0.06), inset 0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full bg-white/80 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 outline-none border transition-all duration-150 cursor-text",
            focused ? "border-stone-300" : "border-stone-200/80",
          )}
          style={sans}
        />
      </div>
    </motion.div>
  );
};

/* ── AI Password Strength Engine ────────────── */
const analyzePassword = (pw) => {
  if (!pw)
    return { score: 0, level: "", label: "", tips: [], color: "transparent" };

  let score = 0;
  const tips = [];

  if (pw.length >= 8) score += 20;
  else tips.push("At least 8 characters");
  if (pw.length >= 12) score += 15;
  else if (pw.length >= 8) tips.push("12+ chars is stronger");
  if (/[A-Z]/.test(pw)) score += 20;
  else tips.push("Add uppercase letters");
  if (/[0-9]/.test(pw)) score += 20;
  else tips.push("Include numbers");
  if (/[^A-Za-z0-9]/.test(pw)) score += 25;
  else tips.push("Special chars (!@#) boost security");

  let level, label, color;
  if (score < 25) {
    level = "1";
    label = "Very Weak";
    color = "#e07070";
  } else if (score < 45) {
    level = "2";
    label = "Weak";
    color = "#d4956a";
  } else if (score < 65) {
    level = "3";
    label = "Fair";
    color = "#c9b24a";
  } else if (score < 85) {
    level = "4";
    label = "Strong";
    color = "#7aab7a";
  } else {
    level = "5";
    label = "Excellent";
    color = "#5a9a8a";
  }

  return {
    score: Math.min(score, 100),
    level,
    label,
    tips: tips.slice(0, 2),
    color,
  };
};

/* ── AI Strength Bar ────────────────────────── */
const AIStrengthIndicator = ({ password }) => {
  const { score, label, tips, color } = useMemo(
    () => analyzePassword(password),
    [password],
  );
  if (!password) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="strength"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <div className="mt-2.5 px-1">
          {/* AI label row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
                  style={{ backgroundColor: color }}
                />
                <span
                  className="relative inline-flex rounded-full h-1.5 w-1.5"
                  style={{ backgroundColor: color }}
                />
              </span>
              <span
                className="text-[10px] tracking-[0.22em] uppercase text-stone-400"
                style={sans}
              >
                AI Strength
              </span>
            </div>
            <motion.span
              key={label}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[11px] font-medium"
              style={{ ...sans, color }}
            >
              {label}
            </motion.span>
          </div>

          {/* Progress track */}
          <div className="h-1 w-full rounded-full bg-stone-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Segment ticks */}
          <div className="flex gap-1 mt-1">
            {[20, 40, 60, 80, 100].map((thresh, i) => (
              <div
                key={i}
                className="flex-1 h-0.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: score >= thresh ? color : "#e7e5e4",
                  opacity: score >= thresh ? 1 : 0.4,
                }}
              />
            ))}
          </div>

          {/* AI tips */}
          <AnimatePresence>
            {tips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="mt-2.5 flex flex-col gap-1"
              >
                {tips.map((tip) => (
                  <div key={tip} className="flex items-center gap-1.5">
                    <svg
                      className="w-3 h-3 text-stone-300 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-[10px] text-stone-400" style={sans}>
                      {tip}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ═══════════════════════════════════════════
   REGISTER PAGE
═══════════════════════════════════════════ */
const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handle = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const passwordMatch = form.confirm && form.password === form.confirm;
  const mismatch = form.confirm && form.password !== form.confirm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed || mismatch) return;
    const result = await dispatch(
      register(form.name, form.email, form.password),
    );
    if (result === true) {
      toast.success("Account created successfully!");
      setSubmitted(true);
    } else {
      toast.error(result || "Registration failed");
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className="w-16 h-16 rounded-full border-2 border-stone-200 flex items-center justify-center mb-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg
            className="w-7 h-7 text-stone-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </motion.div>
        <h2
          className="text-[2rem] font-light text-stone-900 mb-2"
          style={serif}
        >
          Welcome, {form.name.split(" ")[0]}.
        </h2>
        <p
          className="text-xs text-stone-400 max-w-xs leading-relaxed mb-8"
          style={sans}
        >
          Your account has been created. You can now sign in and explore the
          collection.
        </p>
        <Link
          to="/login"
          className="text-[11px] tracking-[0.28em] uppercase text-stone-700 border border-stone-300 px-8 py-3 rounded-xl hover:bg-stone-900 hover:text-white hover:border-stone-900 cursor-pointer transition-all duration-200"
          style={sans}
        >
          Sign In Now
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* Heading */}
      <motion.div variants={item} className="mb-7">
        <p
          className="text-[10px] tracking-[0.35em] uppercase text-stone-400 mb-3"
          style={sans}
        >
          New here?
        </p>
        <h1
          className="text-[2.2rem] font-light leading-tight text-stone-900"
          style={serif}
        >
          Create your <em style={{ color: "#8c7b6b" }}>account.</em>
        </h1>
      </motion.div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <AuthInput
          label="Full Name"
          placeholder="Your full name"
          value={form.name}
          onChange={handle("name")}
          autoComplete="name"
        />

        {/* Email */}
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handle("email")}
          autoComplete="email"
        />

        {/* Password + AI Strength */}
        <motion.div variants={item} className="flex flex-col gap-1.5">
          <AuthInput
            label="Password"
            type={showPass ? "text" : "password"}
            placeholder="Create a strong password"
            value={form.password}
            onChange={handle("password")}
            autoComplete="new-password"
          >
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              className="text-[10px] tracking-[0.2em] uppercase text-stone-400 hover:text-stone-700 cursor-pointer transition-colors duration-150"
              style={sans}
            >
              {showPass ? "Hide" : "Show"}
            </button>
          </AuthInput>
          <AIStrengthIndicator password={form.password} />
        </motion.div>

        {/* Confirm Password */}
        <motion.div variants={item} className="flex flex-col gap-1.5">
          <AuthInput
            label="Confirm Password"
            type={showConfirm ? "text" : "password"}
            placeholder="Repeat your password"
            value={form.confirm}
            onChange={handle("confirm")}
            autoComplete="new-password"
          >
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="text-[10px] tracking-[0.2em] uppercase text-stone-400 hover:text-stone-700 cursor-pointer transition-colors duration-150"
              style={sans}
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </AuthInput>
          <AnimatePresence>
            {mismatch && (
              <motion.p
                key="mismatch"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] text-[#c07070] pl-1"
                style={sans}
              >
                Passwords do not match.
              </motion.p>
            )}
            {passwordMatch && (
              <motion.p
                key="match"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] text-[#7aab7a] pl-1 flex items-center gap-1"
                style={sans}
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                Passwords match
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Terms */}
        <motion.div variants={item}>
          <label className="flex items-start gap-3 cursor-pointer group">
            <div
              className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border flex items-center justify-center transition-all duration-150"
              onClick={() => setAgreed((p) => !p)}
              style={{
                backgroundColor: agreed ? "#1c1917" : "white",
                borderColor: agreed ? "#1c1917" : "#d6d3d1",
              }}
            >
              {agreed && (
                <svg
                  className="w-2.5 h-2.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              )}
            </div>
            <span
              className="text-[11px] text-stone-500 leading-relaxed select-none"
              style={sans}
            >
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-stone-700 underline underline-offset-2 cursor-pointer hover:text-stone-900 transition-colors duration-150"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-stone-700 underline underline-offset-2 cursor-pointer hover:text-stone-900 transition-colors duration-150"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
        </motion.div>

        {/* Submit */}
        <motion.div variants={item}>
          <motion.button
            type="submit"
            disabled={
              !agreed ||
              !!mismatch ||
              !form.name ||
              !form.email ||
              !form.password
            }
            className={cn(
              "w-full py-3.5 text-[11px] tracking-[0.3em] uppercase rounded-xl cursor-pointer transition-all duration-150",
              agreed && !mismatch && form.password
                ? "bg-stone-900 text-white hover:bg-stone-700"
                : "bg-stone-100 text-stone-400 cursor-not-allowed",
            )}
            style={sans}
            whileHover={
              agreed && !mismatch && form.password
                ? { scale: 1.018, boxShadow: "0 8px 28px rgba(0,0,0,0.18)" }
                : {}
            }
            whileTap={agreed && !mismatch ? { scale: 0.98 } : {}}
            transition={{ duration: 0.15 }}
          >
            {isLoading ? "Loading" : "Create Account"}
          </motion.button>
        </motion.div>
      </form>

      {/* Login link */}
      <motion.p
        variants={item}
        className="mt-6 text-center text-xs text-stone-400"
        style={sans}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-stone-700 font-medium underline underline-offset-2 cursor-pointer hover:text-stone-900 transition-colors duration-150"
        >
          Sign in
        </Link>
      </motion.p>
      <ToastContainer />
    </motion.div>
  );
};

export default Register;
