import { applyCoupon } from "@/store/actions/cartActions";
import { Tag } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const sans = { fontFamily: "'Montserrat', sans-serif" };

function CouponInput() {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const cartData = cartItems?.cartItems ? cartItems : cartItems?.data?.cart;  
  //  Check if coupon is applied if  totalPriceAfterDiscount is less than totalCartPrice
  const hasDiscount = cartData?.totalPriceAfterDiscount && cartData.totalPriceAfterDiscount < cartData.totalCartPrice;
  // Calculate discount amount
  const discountAmount = hasDiscount ? (cartData.totalCartPrice - cartData.totalPriceAfterDiscount) : 0;

  const handleApply = async () => {
    if (!code.trim()) return;

    const res = await dispatch(applyCoupon(code)); 
    
    if (typeof res === "number" || res === true || !isNaN(res)) {
      toast.success("Coupon applied successfully!"); 
      setCode(""); 
    } else {
      toast.error(typeof res === "string" ? res : "Invalid or expired coupon code.");
    }
  };

  if (hasDiscount) {
    return (
      <div className="mt-5 px-4 py-3 bg-emerald-50 border border-emerald-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag size={13} className="text-emerald-500" />
          <span className="text-xs font-semibold text-emerald-700 tracking-widest" style={sans}>
            Coupon Applied
          </span>
          <span className="text-[10px] text-emerald-600" style={sans}>
            — {discountAmount.toFixed(2)}  saved
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <p
        className="text-[10px] tracking-[0.22em] uppercase text-neutral-500 mb-2"
        style={sans}
      >
        Coupon Code
      </p>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="e.g. AHMED10"
            className="w-full pl-9 pr-3 py-2.5 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-300 tracking-wider"
            style={sans}
          />
        </div>
        <button
          onClick={handleApply}
          className="px-4 py-2.5 bg-neutral-900 text-white text-[10px] tracking-[0.2em] uppercase hover:bg-neutral-700 transition-colors duration-150 cursor-pointer whitespace-nowrap"
          style={sans}
        >
          Apply
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CouponInput;