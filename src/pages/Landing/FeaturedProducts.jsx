import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getAllProducts } from "@/store/actions/productsActions";
import FeaturedProductCard from "@/components/products/FeaturedProductCard";
import FeaturedProductSkeleton from "@/components/products/FeaturedProductSkeleton";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Montserrat', sans-serif" };

export const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(getAllProducts(1, 6));
  }, [dispatch]);

  const featured = products.filter(Boolean).slice(0, 6);

  return (
    <section className="bg-[#f8f7f5] py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="text-[11px] tracking-[0.35em] uppercase text-stone-400 mb-4"
              style={sans}
            >
              The Collection
            </p>
            <h2
              className="text-[clamp(2.2rem,5vw,4rem)] font-light leading-tight text-stone-900"
              style={serif}
            >
              Featured <em style={{ color: "#8c7b6b" }}>Pieces</em>
            </h2>
          </motion.div>

          <motion.p
            className="text-sm font-light text-stone-400 max-w-xs text-right hidden md:block"
            style={serif}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Carefully selected pieces from our latest arrivals, crafted for
            those who appreciate quiet luxury.
          </motion.p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <FeaturedProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {featured.map((product, i) => (
              <FeaturedProductCard
                key={product._id}
                product={product}
                index={i}
              />
            ))}
          </motion.div>
        )}

        {/* View all */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.a
            href="/shop"
            className="inline-flex items-center gap-3 border border-stone-300 px-10 py-4 text-[11px] tracking-[0.28em] uppercase text-stone-700 transition-all duration-200 hover:bg-stone-900 hover:text-white hover:border-stone-900"
            style={sans}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18 }}
          >
            View All Products
            <svg
              className="w-3.5 h-3.5"
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
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
