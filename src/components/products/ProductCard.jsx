import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Montserrat', sans-serif" };

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const {
    _id,
    title,
    imageCover,
    price,
    priceAfterDiscount,
    averageRating,
    colors,
  } = product;

  const hasDiscount = priceAfterDiscount && priceAfterDiscount < price;
  const discountPct = hasDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;
  const colorList =
    typeof colors === "string"
      ? colors.split(" ").filter(Boolean)
      : Array.isArray(colors)
        ? colors
        : [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      onClick={() => navigate(`/shop/${_id}`)}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-neutral-100 aspect-[3/4]">
        <img
          src={imageCover}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {hasDiscount && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 bg-[#0c0c0c] text-[#c9a96e] text-[9px] tracking-[0.2em] uppercase"
            style={sans}
          >
            -{discountPct}%
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-sm p-3">
          {colorList.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {colorList.map((c) => (
                <span
                  key={c}
                  className="text-[9px] tracking-widest uppercase text-neutral-500 border border-neutral-200 px-2 py-0.5"
                  style={sans}
                >
                  {c}
                </span>
              ))}
            </div>
          )}
          <button
            className="w-full py-2 bg-[#0c0c0c] text-white text-[10px] tracking-[0.2em] uppercase hover:bg-neutral-700 transition-colors"
            style={sans}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="pt-3">
        <p
          className="text-sm font-light text-neutral-800 truncate"
          style={serif}
        >
          {title}
        </p>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-sm text-neutral-900" style={sans}>
              ${hasDiscount ? priceAfterDiscount : price}
            </span>
            {hasDiscount && (
              <span
                className="text-xs text-neutral-400 line-through"
                style={sans}
              >
                ${price}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Star size={10} className="text-amber-400" fill="currentColor" />
            <span className="text-[11px] text-neutral-400" style={sans}>
              {averageRating}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
