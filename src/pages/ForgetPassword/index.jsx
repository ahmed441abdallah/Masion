import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { forgotPassword } from "@/store/actions/authActions";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Montserrat', sans-serif" };

export const ForgetPasswordPage = () => {
  const {
    error,
    isLoading,
    forgotPassword: forgotPasswordData,
  } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(forgotPassword(email));
    if (result === true && forgotPasswordData?.status === "success") {
      toast.success("Password reset code sent to your email");
      setTimeout(() => navigate("/verify-code"), 2000);
    } else {
      toast.error(result || "Password reset failed");
    }
  };

  return (
    <div>
      <ToastContainer />

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
              <Mail size={22} className="text-neutral-500" />
            </div>
          </div>

          {/* Heading */}
          <h1
            className="text-center text-[2.2rem] font-light text-neutral-900 leading-tight mb-2"
            style={serif}
          >
            Forgot password?
          </h1>
          <p
            className="text-center text-[11px] tracking-[0.08em] text-neutral-400 mb-10 leading-relaxed"
            style={sans}
          >
            No worries. Enter your email and we'll send
            <br />
            you a reset code.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[10px] tracking-[0.2em] uppercase text-neutral-400"
                style={sans}
              >
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={sans}
                className="w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-700 focus:bg-white transition-all placeholder:text-neutral-300"
              />
              {error && (
                <p className="text-[11px] text-red-400" style={sans}>
                  {error}
                </p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading || !email.trim()}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 flex items-center justify-center gap-2.5 text-[11px] tracking-[0.3em] uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              style={{
                ...sans,
                background: "#0c0c0c",
                color: "#fff",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Sending…
                </>
              ) : (
                "Send Reset Code"
              )}
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
                s === 0 ? "w-8 bg-neutral-800" : "w-4 bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
