import { motion } from "framer-motion";
import { Trash2, Star, Package, Loader2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Montserrat', sans-serif" };

export default function AdminProductCard({ product, handleDelete, isLoading }) {
  const navigate = useNavigate();
  const {
    _id,
    title,
    imageCover,
    price,
    priceAfterDiscount,
    quantity,
    sold,
    averageRating,
    colors,
  } = product;

  const colorList =
    typeof colors === "string"
      ? colors.split(" ").filter(Boolean)
      : Array.isArray(colors)
        ? colors
        : [];

  const hasDiscount = priceAfterDiscount && priceAfterDiscount < price;
  const discountPct = hasDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="group bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50">
        <img
          src={imageCover}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {hasDiscount && (
          <span
            className="absolute top-2 left-2 px-2 py-0.5 bg-[#0c0c0c] text-[#c9a96e] text-[9px] tracking-[0.2em] uppercase rounded-full"
            style={sans}
          >
            -{discountPct}%
          </span>
        )}
        {/* action buttons */}
        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => navigate(`/admin/products/edit/${_id}`)}
            className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-blue-50"
          >
            <Pencil size={12} className="text-blue-400" />
          </button>
          <button
            disabled={isLoading}
            onClick={() => handleDelete(_id)}
            className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-red-50"
          >
            {isLoading ? (
              <Loader2 size={12} className="text-red-400 animate-spin" />
            ) : (
              <Trash2 size={12} className="text-red-400" />
            )}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p
          className="text-sm font-light text-neutral-800 leading-snug mb-3 line-clamp-2"
          style={serif}
        >
          {title}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-base font-medium text-neutral-900" style={sans}>
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

        {/* Colors */}
        {colorList.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {colorList.map((c) => (
              <span
                key={c}
                className="px-2 py-0.5 bg-neutral-50 border border-neutral-200 text-[10px] text-neutral-500 rounded-full"
                style={sans}
              >
                {c}
              </span>
            ))}
          </div>
        )}

        {/* Stats row */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-50">
          <div className="flex items-center gap-1 text-amber-400">
            <Star size={11} fill="currentColor" />
            <span className="text-[11px] text-neutral-500" style={sans}>
              {averageRating}
            </span>
          </div>
          <div className="flex items-center gap-1 text-neutral-400">
            <Package size={11} />
            <span className="text-[11px]" style={sans}>
              {quantity} in stock
            </span>
          </div>
          <span className="text-[11px] text-neutral-400" style={sans}>
            {sold} sold
          </span>
        </div>
      </div>
    </motion.div>
  );
}
