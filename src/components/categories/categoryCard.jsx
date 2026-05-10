import { motion } from "framer-motion";
import { serif, sans } from "@/lib/fonts";
export const CategoryCard = ({ category, index }) => {
  return (
    <motion.a
      key={index}
      href={`/shop?category=${category.id ?? category._id}`}
      className="group relative overflow-hidden block aspect-[3/4] cursor-pointer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Image */}
      <motion.img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover object-center"
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

      {/* Hover tint */}
      <motion.div
        className="absolute inset-0 bg-black/20"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Name + CTA pinned to bottom */}
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-2">
        <h3
          className="text-white font-light leading-none tracking-wide text-[clamp(1.4rem,2.5vw,2rem)]"
          style={serif}
        >
          {category.name}
        </h3>

        {/* Explore row — slides up on hover */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 6 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
        >
          <span
            className="text-[10px] tracking-[0.28em] uppercase text-white/75"
            style={sans}
          >
            Explore
          </span>
          <svg
            className="w-3.5 h-3.5 text-white/75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </motion.div>

        {/* Animated underline */}
        <motion.div
          className="h-px bg-white/40"
          initial={{ scaleX: 0, originX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.a>
  );
};
