import { ChevronRight, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CouponInput from "./CouponInput";
const sans = { fontFamily: "'Montserrat', sans-serif" };
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };

function OrderSummary() {
  const {cartItems}= useSelector((state) => state.cart);
  const totalCartPrice= cartItems?.totalCartPrice || 0;
  const totalPriceAfterDiscount=cartItems?.totalPriceAfterDiscount || 0;
  const discount= (totalCartPrice - totalPriceAfterDiscount).toFixed(2); 
  const shipping = totalCartPrice > 0 && totalCartPrice >= 999 ? 0 : totalCartPrice > 0 ? 60 : 0;
  return (
    <div className="bg-white border border-neutral-100 p-6 lg:p-7 sticky top-6">
      <h2 className="text-lg font-light text-neutral-800 mb-6" style={serif}>
        Order Summary
      </h2>

      <div className="space-y-3 text-sm" style={sans}>
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span>${totalCartPrice}</span>
        </div>

        {discount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between text-emerald-600"
          >
            <span>Discount</span>
            <span>−${discount}</span>
          </motion.div>
        )}

        <div className="flex justify-between text-neutral-600">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-emerald-600">Free</span>
            ) : (
              `$${shipping}`
            )}
          </span>
        </div>

        <div className="pt-4 border-t border-neutral-100 flex justify-between font-medium text-neutral-900">
          <span>Total</span>
          <span>${totalPriceAfterDiscount}</span>
        </div>
      </div>

      <CouponInput />

      <Link
        to="/checkout"
        className="w-full mt-6 py-3.5 bg-neutral-900 text-white text-[10px] tracking-[0.26em] uppercase hover:bg-neutral-700 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        style={sans}
      >
        Proceed to Checkout
        <ArrowRight size={13} />
      </Link>
      <Link
        to="/shop"
        className="mt-4 flex items-center justify-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-neutral-400 hover:text-neutral-700 transition-colors duration-150"
        style={sans}
      >
        Continue Shopping
        <ChevronRight size={11} />
      </Link>

      <div className="mt-6 pt-5 border-t border-neutral-100 flex justify-center gap-6">
        {["Free Returns", "Secure Payment", "2-Day Delivery"].map((t) => (
          <span
            key={t}
            className="text-[9px] tracking-[0.15em] uppercase text-neutral-400 text-center"
            style={sans}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
export default OrderSummary;