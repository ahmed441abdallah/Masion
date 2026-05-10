import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, CreditCard, Wallet, Banknote, ShieldCheck, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { clearCart } from "@/store/actions/cartActions";
import { createCashOrder, createCardOrder } from "@/store/actions/orderActions";
import { useMemo } from "react";
const sans = { fontFamily: "'Montserrat', sans-serif" };
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };

export default function CheckoutPage() {
  const { cartItems, isLoading,error } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Derive totals from Redux
  const {
    cartId,
    items,
    totalCartPrice,
    discount,
    hasDiscount,
    shipping,
    finalTotal
  } = useMemo(() => {
    const cartData = cartItems?.cartItems ? cartItems : cartItems?.data?.cart;
    const cId = cartItems?._id || cartItems?.data?.cart?._id;
    const itemsList = cartData?.cartItems || [];
    const tPrice = cartData?.totalCartPrice || 0;
    const tPriceAfterDiscount = cartData?.totalPriceAfterDiscount || 0;
    
    const isDiscounted = tPriceAfterDiscount > 0 && tPriceAfterDiscount < tPrice;
    const discAmount = isDiscounted ? tPrice - tPriceAfterDiscount : 0;
    const shipCost = tPrice > 0 && tPrice >= 999 ? 0 : tPrice > 0 ? 60 : 0;
    const fTotal = isDiscounted ? tPriceAfterDiscount + shipCost : tPrice + shipCost;

    return {
      cartId: cId,
      items: itemsList,
      totalCartPrice: tPrice,
      discount: discAmount,
      hasDiscount: isDiscounted,
      shipping: shipCost,
      finalTotal: fTotal
    };
  }, [cartItems]);
  const isFormValid =
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.city.trim() !== "";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill in all contact and shipping information.");
      return;
    }
    if (paymentMethod === "card") {
      const res = await dispatch(createCardOrder(cartId, formData));
      if (res.success) {
        toast.success("Redirecting to payment...");
        window.location.href = res.url;
      } else {
        toast.error(res.message || "Failed to initiate payment");
      }
    } else {
      const res = await dispatch(createCashOrder(cartId, formData));
      if(res==true) {
        toast.success("Order placed successfully");
        dispatch(clearCart());
        setTimeout(() => {
          navigate("/order-success");
        }, 1500);    
      } else {
        toast.error(res || "Failed to place order");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Breadcrumb */}
      <div className="border-b border-neutral-100 bg-white">
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase text-neutral-400"
          style={sans}
        >
          <Link to="/" className="hover:text-neutral-700 transition-colors">
            Home
          </Link>
          <ChevronRight size={10} />
          <Link to="/cart" className="hover:text-neutral-700 transition-colors">
            Cart
          </Link>
          <ChevronRight size={10} />
          <span className="text-neutral-600">Checkout</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-light text-neutral-800" style={serif}>
            Checkout
          </h1>
          <p className="text-[10px] tracking-[0.22em] uppercase text-neutral-400 mt-1" style={sans}>
            Complete your order
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-start">
          {/* Left Column - Forms */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="bg-white border border-neutral-100 p-6 sm:p-8 space-y-8">
              
              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-light text-neutral-800 mb-5 pb-2 border-b border-neutral-100" style={serif}>
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-2" style={sans}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-300"
                      style={sans}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-2" style={sans}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-300"
                      style={sans}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-lg font-light text-neutral-800 mb-5 pb-2 border-b border-neutral-100" style={serif}>
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-2" style={sans}>
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main St, Apt 4B"
                      className="w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-300"
                      style={sans}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-2" style={sans}>
                      City
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-300"
                      style={sans}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-2" style={sans}>
                      State / Province
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="State"
                      className="w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-300"
                      style={sans}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-2" style={sans}>
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ZIP Code"
                      className="w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors placeholder:text-neutral-300"
                      style={sans}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-lg font-light text-neutral-800 mb-5 pb-2 border-b border-neutral-100" style={serif}>
                  Payment Method
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Credit Card */}
                  <label
                    className={`relative flex flex-col items-center justify-center p-4 border cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "border-neutral-900 bg-neutral-50 text-neutral-900"
                        : "border-neutral-200 hover:border-neutral-400 text-neutral-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <CreditCard size={20} className="mb-2" />
                    <span className="text-[10px] tracking-[0.1em] uppercase text-center" style={sans}>
                      Credit Card
                    </span>
                  </label>

                 

                  {/* Cash on Delivery */}
                  <label
                    className={`relative flex flex-col items-center justify-center p-4 border cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-neutral-900 bg-neutral-50 text-neutral-900"
                        : "border-neutral-200 hover:border-neutral-400 text-neutral-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <Banknote size={20} className="mb-2" />
                    <span className="text-[10px] tracking-[0.1em] uppercase text-center" style={sans}>
                      Cash on Delivery
                    </span>
                  </label>
                </div>
              </div>

            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white border border-neutral-100 p-6 lg:p-7 sticky top-6">
            <h2 className="text-lg font-light text-neutral-800 mb-6" style={serif}>
              Order Summary
            </h2>

            {/* Cart Items List Mini */}
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {items?.map((item) => {
                const p = item.product || {};
                const name = p.title || "Product";
                const image = p.imageCover || p.image || "";
                return (
                  <div key={item._id} className="flex gap-4">
                    <div className="w-16 h-20 bg-neutral-100 shrink-0">
                      {image && <img src={image} alt={name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-xs text-neutral-800 leading-snug line-clamp-2 mb-1" style={sans}>
                        {name}
                      </h3>
                      <p className="text-[10px] text-neutral-500" style={sans}>
                        Qty: {item.quantity || 1}
                      </p>
                      <p className="text-xs font-medium text-neutral-800 mt-1" style={sans}>
                        ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Totals */}
            <div className="space-y-3 text-sm pt-5 border-t border-neutral-100" style={sans}>
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>${totalCartPrice.toLocaleString()}</span>
              </div>

              {hasDiscount && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>−${discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-600">Free</span>
                  ) : (
                    `$${shipping.toLocaleString()}`
                  )}
                </span>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex justify-between text-lg font-medium text-neutral-900">
                <span>Total</span>
                <span>${finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !isFormValid}
              className={`w-full mt-8 py-4 text-white text-[10px] tracking-[0.26em] uppercase transition-all duration-200 flex items-center justify-center gap-2 ${
                isLoading || !isFormValid
                  ? "bg-neutral-400 cursor-not-allowed"
                  : "bg-neutral-900 hover:bg-neutral-700 active:scale-[0.99] cursor-pointer"
              }`}
              style={sans}
            >
              {isLoading ? (
                <>
                <Loader className="animate-spin" />
                Placing Order...
                </>
              ) : (
                <>
                <ShieldCheck size={14} />
                Place Order
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
