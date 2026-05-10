import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Montserrat', sans-serif" };

export const VerifyCodePage = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const {
    isLoading,
    error,
    verifyResetCode: verifyResetCodeData,
  } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(otp);
    const result = await dispatch(verifyResetCode(otp));
    if (result === true) {
      toast.success("Password reset code verified");
      setTimeout(() => navigate("/reset-password"), 2000);
    } else {
      toast.error(result || "Password reset code verification failed");
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
              <ShieldCheck size={24} className="text-neutral-500" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-2">
            <h1
              className="text-[2.2rem] font-light text-neutral-900 leading-tight"
              style={serif}
            >
              Verify your code
            </h1>
          </div>
          <p
            className="text-center text-[11px] tracking-[0.08em] text-neutral-400 mb-10 leading-relaxed"
            style={sans}
          >
            We sent a 6-digit code to your email address.
            <br />
            Enter it below to continue.
          </p>

          {/* OTP inputs */}

          <Field className="w-fit">
            <FieldLabel style={sans} htmlFor="digits-only">
              Enter the code
            </FieldLabel>
            <InputOTP
              id="digits-only"
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Field>
          {/* Submit */}
          <motion.button
            onClick={(e) => handleSubmit(e)}
            disabled={isLoading}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 py-4 text-[11px] tracking-[0.3em] uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              ...sans,
              background: "#0c0c0c",
              color: "#fff",
            }}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </motion.button>

          {/* Resend */}

          {/* Divider */}
          <div className="border-t border-neutral-100 mt-8 pt-6 flex justify-center">
            <Link
              to="/forgot-password"
              className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-neutral-400 hover:text-neutral-700 transition-colors"
              style={sans}
            >
              <ArrowLeft size={11} />
              Back to forgot password
            </Link>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((s) => (
            <div
              key={s}
              className={`h-0.5 transition-all duration-300 ${
                s === 1 ? "w-8 bg-neutral-800" : "w-4 bg-neutral-300"
              }`}
            />
          ))}
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};
