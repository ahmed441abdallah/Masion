import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Montserrat', sans-serif" };

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
        <ShoppingBag size={24} className="text-neutral-300" />
      </div>
      <h2 className="text-2xl font-light text-neutral-700 mb-2" style={serif}>
        Your cart is empty
      </h2>
      <p
        className="text-[10px] tracking-[0.22em] uppercase text-neutral-400 mb-8"
        style={sans}
      >
        Discover our curated collections
      </p>
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 px-8 py-3 bg-neutral-900 text-white text-[10px] tracking-[0.22em] uppercase hover:bg-neutral-700 transition-colors duration-200"
        style={sans}
      >
        Shop Now
        <ArrowRight size={12} />
      </Link>
    </motion.div>
  );
}

export default EmptyCart;