import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans  = { fontFamily: "'Montserrat', sans-serif" };

const COLOR_MAP = {
  black:  "#1c1917",
  white:  "#fafaf9",
  brown:  "#92400e",
  red:    "#dc2626",
  navy:   "#1e3a5f",
  grey:   "#9ca3af",
  gray:   "#9ca3af",
  beige:  "#d4b896",
  gold:   "#c9a96e",
};

function ColorSwatch({ color }) {
  const resolved = color.startsWith("#")
    ? color
    : COLOR_MAP[color.toLowerCase()] ?? "#c9a96e";

  return (
    <div
      className="w-3 h-3 rounded-full border border-stone-200"
      style={{ backgroundColor: resolved }}
      title={color}
    />
  );
}

export default function FeaturedProductCard({ product, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const {
    _id,
    title,
    price,
    priceAfterDiscount,
    imageCover,
    averageRating,
    colors = [],
  } = product;

  const hasDiscount = priceAfterDiscount && priceAfterDiscount < price;
  const discountPct = hasDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;
  const colorList = Array.isArray(colors) ? colors.slice(0, 3) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/shop/${_id}`)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-stone-100 aspect-[3/4]">
        <motion.img
          src={imageCover}
          alt={title}
          className="w-full h-full object-cover object-top"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />

        {hasDiscount && (
          <span
            className="absolute top-4 left-4 px-2.5 py-1 text-[9px] tracking-[0.25em] uppercase bg-[#0c0c0c] text-[#c9a96e]"
            style={sans}
          >
            -{discountPct}%
          </span>
        )}

        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-x-0 bottom-0 p-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22 }}
            >
              <button
                className="w-full py-3 bg-stone-900/90 text-white text-[10px] tracking-[0.28em] uppercase backdrop-blur-sm hover:bg-stone-900 transition-colors"
                style={sans}
                onClick={(e) => { e.stopPropagation(); navigate(`/shop/${_id}`); }}
              >
                Quick View
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="mt-4 flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-stone-800 text-base font-light leading-snug truncate" style={serif}>
            {title}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <Star size={10} className="text-amber-400 shrink-0" fill="currentColor" />
            <span className="text-[10px] text-stone-400" style={sans}>{averageRating}</span>
          </div>
        </div>
        <div className="text-right shrink-0 mt-0.5">
          <p className="text-stone-700 text-sm" style={sans}>
            ${hasDiscount ? priceAfterDiscount : price}
          </p>
          {hasDiscount && (
            <p className="text-[10px] text-stone-400 line-through" style={sans}>
              ${price}
            </p>
          )}
        </div>
      </div>

      {/* Color swatches */}
      {colorList.length > 0 && (
        <div className="mt-2.5 flex items-center gap-1.5">
          {colorList.map((c, i) => (
            <ColorSwatch key={i} color={c} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
