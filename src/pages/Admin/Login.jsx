import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { login } from "@/store/actions/authActions";
import { toast, ToastContainer } from "react-toastify";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Montserrat', sans-serif" };

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

function AdminInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
  children,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <motion.div variants={item} className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <label
          className="text-[10px] tracking-[0.25em] uppercase transition-colors duration-150"
          style={{ ...sans, color: focused ? "#0c0c0c" : "#a8a29e" }}
        >
          {label}
        </label>
        {children}
      </div>
      <div
        className="rounded-xl transition-all duration-150"
        style={{
          boxShadow: focused
            ? "0 0 0 2px #0c0c0c40, 0 4px 16px rgba(0,0,0,0.07)"
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
            "w-full bg-white/80 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 outline-none border transition-all duration-150",
            focused ? "border-stone-800" : "border-stone-200/80",
          )}
          style={sans}
        />
      </div>
    </motion.div>
  );
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handle = (field) => (e) => {
    setError("");
    setForm((p) => ({ ...p, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(form.email, form.password));
    if (result === true) {
      toast.success("Login successful");
      navigate("/admin/dashboard");
    } else {
      toast.error(result || "Login failed");
    }
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={item} className="mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#0c0c0c] flex items-center justify-center mb-5">
          <ShieldCheck size={18} className="text-[#c9a96e]" />
        </div>
        <p
          className="text-[10px] tracking-[0.35em] uppercase text-stone-400 mb-2"
          style={sans}
        >
          Restricted access
        </p>
        <h1
          className="text-[2.2rem] font-light leading-tight text-stone-900"
          style={serif}
        >
          Admin <em style={{ color: "#8c7b6b" }}>Panel</em>
          <br />
          Sign In
        </h1>
      </motion.div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AdminInput
          label="Admin Email"
          type="email"
          placeholder="admin@maison.fr"
          value={form.email}
          onChange={handle("email")}
          autoComplete="email"
        />

        <AdminInput
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
            className="text-stone-400 hover:text-stone-700 transition-colors"
          >
            {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
          </button>
        </AdminInput>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[11px] text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5"
            style={sans}
          >
            <AlertCircle size={13} className="shrink-0" />
            {error}
          </motion.div>
        )}

        <motion.div variants={item}>
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#0c0c0c] text-white text-[11px] tracking-[0.3em] uppercase rounded-xl transition-colors duration-150 hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={sans}
            whileHover={
              !loading
                ? { scale: 1.015, boxShadow: "0 8px 28px rgba(0,0,0,0.22)" }
                : {}
            }
            whileTap={!loading ? { scale: 0.98 } : {}}
            transition={{ duration: 0.15 }}
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying…
              </>
            ) : (
              "Access Dashboard"
            )}
          </motion.button>
        </motion.div>
      </form>
      <ToastContainer />
    </motion.div>
  );
}
