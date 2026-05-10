import { Link } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const sans = { fontFamily: "'Montserrat', sans-serif" };
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };

export default function OrderSuccessPage() {
  const { order } = useSelector((state) => state.order);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6">
        <CheckCircle size={48} className="text-emerald-500 mb-6" />
        <h1 className="text-3xl font-light text-neutral-800 mb-4" style={serif}>
          Order Completed!
        </h1>
        <p className="text-sm text-neutral-500 mb-8" style={sans}>
          Thank you for your purchase. Your order is being processed.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-neutral-900 text-white text-[10px] tracking-[0.2em] uppercase hover:bg-neutral-700 transition-colors"
          style={sans}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const { _id, totalOrderPrice, shippingAddress, paymentMethod, isPaid, isDelivered, createdAt } = order;

  return (
    <div className="min-h-screen bg-[#fafafa] py-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-neutral-100 p-8 md:p-12 text-center shadow-sm"
        >
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-emerald-500" />
          </div>

          <h1 className="text-3xl md:text-4xl font-light text-neutral-800 mb-3" style={serif}>
            Thank you for your order!
          </h1>
          <p className="text-[11px] tracking-[0.1em] uppercase text-neutral-400 mb-10" style={sans}>
            Order #{_id?.slice(-8).toUpperCase() || "UNKNOWN"}
          </p>

          <div className="text-left bg-neutral-50 p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-medium text-neutral-800 border-b border-neutral-200 pb-3" style={serif}>
              Order Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={sans}>
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-1">
                  Total Amount
                </p>
                <p className="text-base font-medium text-neutral-800">
                  ${totalOrderPrice?.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-1">
                  Payment Method
                </p>
                <p className="text-base font-medium text-neutral-800 capitalize">
                  {paymentMethod}
                </p>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-1">
                  Status
                </p>
                <div className="flex gap-2">
                  <span className={`text-[10px] px-2 py-1 uppercase tracking-widest ${isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {isPaid ? "Paid" : "Not Paid"}
                  </span>
                  <span className={`text-[10px] px-2 py-1 uppercase tracking-widest ${isDelivered ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-1">
                  Order Date
                </p>
                <p className="text-sm text-neutral-800">
                  {createdAt ? new Date(createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200">
              <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 mb-2" style={sans}>
                Shipping Address
              </p>
              <div className="text-sm text-neutral-700 space-y-1" style={sans}>
                <p className="flex items-center gap-2"><Home size={14} className="text-neutral-400" /> {shippingAddress?.address || "Address not provided"}</p>
                {shippingAddress?.city && <p className="ml-6">{shippingAddress.city}</p>}
                {shippingAddress?.phone && <p className="ml-6">Phone: {shippingAddress.phone}</p>}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-neutral-900 text-white text-[10px] tracking-[0.2em] uppercase hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2"
              style={sans}
            >
              Continue Shopping
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/profile"
              className="px-8 py-3.5 bg-white text-neutral-900 border border-neutral-200 text-[10px] tracking-[0.2em] uppercase hover:border-neutral-900 transition-colors flex items-center justify-center gap-2"
              style={sans}
            >
              <Package size={14} />
              View Orders
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
