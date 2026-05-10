import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { resetPassword } from "@/store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Montserrat', sans-serif" };

function PasswordInput({ label, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[10px] tracking-[0.2em] uppercase text-neutral-400"
        style={sans}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={sans}
          className="w-full px-4 py-3 pr-11 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-700 focus:bg-white transition-all placeholder:text-neutral-300"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  );
}

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    resetPassword: resetPasswordData,
  } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const set = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const passwordsMatch =
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword;
  const passwordMismatch =
    form.confirmPassword && form.password !== form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(resetPassword(form));
    if (result === true) {
      toast.success("Password reset successfully");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      toast.error(result || "Password reset failed");
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div>
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center">
              <KeyRound size={22} className="text-neutral-500" />
            </div>
          </div>

          {/* Heading */}
          <h1
            className="text-center text-[2.2rem] font-light text-neutral-900 leading-tight mb-2"
            style={serif}
          >
            Reset password
          </h1>
          <p
            className="text-center text-[11px] tracking-[0.08em] text-neutral-400 mb-10 leading-relaxed"
            style={sans}
          >
            Create a new password for your account.
            <br />
            Make sure it's at least 8 characters.
          </p>

          {/* Form */}
          <form className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[10px] tracking-[0.2em] uppercase text-neutral-400"
                style={sans}
              >
                Email address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@example.com"
                style={sans}
                className="w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-700 focus:bg-white transition-all placeholder:text-neutral-300"
              />
            </div>

            {/* New password */}
            <PasswordInput
              label="New password"
              value={form.password}
              onChange={set("password")}
              placeholder="Min. 8 characters"
            />

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <PasswordInput
                label="Confirm password"
                value={form.confirmPassword}
                onChange={set("confirmPassword")}
                placeholder="Repeat new password"
              />
              {passwordMismatch && (
                <p className="text-[11px] text-red-400" style={sans}>
                  Passwords do not match
                </p>
              )}
              {passwordsMatch && (
                <p className="text-[11px] text-emerald-500" style={sans}>
                  Passwords match ✓
                </p>
              )}
            </div>

            {/* Password strength bar */}
            {form.password && (
              <div className="flex gap-1 pt-1">
                {[8, 12, 16].map((threshold, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${
                      form.password.length >= threshold
                        ? i === 0
                          ? "bg-red-400"
                          : i === 1
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                        : "bg-neutral-200"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Submit */}
            <motion.button
              onClick={(e) => handleSubmit(e)}
              type="submit"
              whileTap={{ scale: 0.98 }}
              disabled={!form.email || !passwordsMatch || isLoading}
              className="w-full py-4 flex items-center justify-center gap-2.5 text-[11px] tracking-[0.3em] uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              style={{
                ...sans,
                background: "#0c0c0c",
                color: "#fff",
              }}
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="border-t border-neutral-100 mt-8 pt-6 flex justify-center">
            <Link
              to="/login"
              className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-neutral-400 hover:text-neutral-700 transition-colors"
              style={sans}
            >
              <ArrowLeft size={11} />
              Back to login
            </Link>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((s) => (
            <div
              key={s}
              className={`h-0.5 transition-all duration-300 ${
                s === 2 ? "w-8 bg-neutral-800" : "w-4 bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};
