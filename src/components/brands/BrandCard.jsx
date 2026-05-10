import { motion } from "framer-motion";
import { serif } from "./shared";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BrandCard({ brand }) {
  return (
    <motion.div variants={fadeUp} className="group cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-stone-100 mb-4">
        {brand.image ? (
          <img
            src={brand.image}
            alt={brand.name}
            className="w-[200px] h-[200px]  group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-light text-stone-300" style={serif}>
              {brand.name?.[0]?.toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Name */}
      <p
        className="text-base font-light tracking-[0.12em] uppercase text-stone-800 group-hover:text-stone-500 transition-colors duration-200"
        style={serif}
      >
        {brand.name}
      </p>
      <div className="h-px w-0 group-hover:w-full bg-stone-300 transition-all duration-500 mt-1.5" />
    </motion.div>
  );
}
