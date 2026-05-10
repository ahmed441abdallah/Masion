import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BrandCard from "@/components/brands/BrandCard";
import { serif, sans, fadeUp, stagger } from "@/components/brands/shared";
import ArrowIcon from "@/components/brands/ArrowIcon";
import useBrands from "@/hooks/Brands/useBrands";
export default function BrandsPage() {
  const { brands } = useBrands();

  return (
    <div className="bg-[#f8f7f5] min-h-screen">
      {/* ── Hero ─────────────────────────────────── */}
      <section className="px-6 md:px-12 pt-20 pb-14 max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p
            variants={fadeUp}
            className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-5"
            style={sans}
          >
            Our Brands
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-3">
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(3rem,7vw,6.5rem)] font-light leading-none text-stone-900"
              style={serif}
            >
              The <em style={{ color: "#8c7b6b" }}>Houses</em>
            </motion.h1>

            {/* Stats */}
          </div>

          <motion.div
            variants={fadeUp}
            className="h-px bg-stone-200 mt-8 mb-12"
          />
        </motion.div>
      </section>

      {/* ── All Brands Grid ───────────────────────── */}
      <section className="px-6 md:px-12 pb-28 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <p
              className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-2"
              style={sans}
            >
              Explore
            </p>
            <h2
              className="text-[clamp(1.8rem,4vw,3rem)] font-light text-stone-900"
              style={serif}
            >
              All Brands
            </h2>
          </div>

          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-stone-400 hover:text-stone-700 transition-colors duration-200"
            style={sans}
          >
            View All Products
            <ArrowIcon />
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
          initial="hidden"
          animate={brands.length > 0 ? "show" : "hidden"}
          variants={stagger}
        >
          {brands.filter(Boolean).map((brand, i) => (
            <BrandCard key={brand._id ?? i} brand={brand} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}
