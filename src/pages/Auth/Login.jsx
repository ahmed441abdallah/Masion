import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/actions/authActions";
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Montserrat', sans-serif" };
/* ── Animation variants ─────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
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

/* ── Divider ────────────────────────────────── */
const OrDivider = () => (
  <motion.div variants={item} className="flex items-center gap-3 my-1">
    <div className="flex-1 h-px bg-stone-200" />
    <span
      className="text-[10px] tracking-[0.25em] uppercase text-stone-300"
      style={sans}
    >
      or
    </span>
    <div className="flex-1 h-px bg-stone-200" />
  </motion.div>
);

/* ── Social button ──────────────────────────── */

/* ═══════════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════════ */
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handle = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(form.email, form.password));
    if (result === true) {
      toast.success("Login successful");
      navigate("/");
    } else {
      toast.error(result || "Login failed");
    }
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      {/* Heading */}
      <motion.div variants={item} className="mb-8">
        <p
          className="text-[10px] tracking-[0.35em] uppercase text-stone-400 mb-3"
          style={sans}
        >
          Welcome back
        </p>
        <h1
          className="text-[2.4rem] font-light leading-tight text-stone-900"
          style={serif}
        >
          Sign <em style={{ color: "#8c7b6b" }}>in</em> to
          <br />
          your account.
        </h1>
      </motion.div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handle("email")}
          autoComplete="email"
        />

        {/* Password */}
        <AuthInput
          label="Password"
          type={showPass ? "text" : "password"}
          placeholder="••••••••"
          value={form.password}
          onChange={handle("password")}
          autoComplete="current-password"
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

        {/* Remember + Forgot */}
        <motion.div
          variants={item}
          className="flex items-center justify-between"
        >
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div
              className="relative w-4 h-4 rounded border border-stone-300 bg-white flex items-center justify-center transition-all duration-150 group-hover:border-stone-500"
              onClick={() => setRemember((p) => !p)}
              style={{
                backgroundColor: remember ? "#1c1917" : "white",
                borderColor: remember ? "#1c1917" : undefined,
              }}
            >
              {remember && (
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
              className="text-[11px] text-stone-500 select-none"
              style={sans}
            >
              Remember me
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="text-[11px] text-stone-400 hover:text-stone-700 cursor-pointer underline underline-offset-2 transition-colors duration-150"
            style={sans}
          >
            Forgot password?
          </Link>
        </motion.div>

        {/* Submit */}
        <motion.div variants={item}>
          <motion.button
            type="submit"
            className="w-full py-3.5 bg-stone-900 text-white text-[11px] tracking-[0.3em] uppercase rounded-xl cursor-pointer transition-colors duration-150 hover:bg-stone-700"
            style={sans}
            whileHover={{
              scale: 1.018,
              boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            Sign In
          </motion.button>
        </motion.div>

        <OrDivider />

        {/* Social */}
      </form>

      {/* Register link */}
      <motion.p
        variants={item}
        className="mt-8 text-center text-xs text-stone-400"
        style={sans}
      >
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="text-stone-700 font-medium underline underline-offset-2 cursor-pointer hover:text-stone-900 transition-colors duration-150"
        >
          Create one
        </Link>
      </motion.p>
      <ToastContainer />
    </motion.div>
  );
};

export default Login;
