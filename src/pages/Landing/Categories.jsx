import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getAllCategories } from "@/store/actions/categoriesActions";
import { CategoryCard } from "@/components/categories/categoryCard";
import { serif, sans } from "@/lib/fonts";

const SkeletonCard = () => (
  <div className="relative overflow-hidden bg-stone-200 aspect-[3/4] animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-100/60 to-transparent -translate-x-full animate-[shimmer_1.6s_infinite]" />
  </div>
);

export const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((s) => s.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <section className="bg-[#f8f7f5] py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
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
              Shop by Category
            </p>
            <h2
              className="text-[clamp(2.2rem,5vw,4rem)] font-light leading-tight text-stone-900"
              style={serif}
            >
              Our <em style={{ color: "#8c7b6b" }}>Collections</em>
            </h2>
          </motion.div>

          <motion.p
            className="text-sm text-stone-400 max-w-xs leading-relaxed"
            style={sans}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Curated with intention. Each category tells its own story of craft,
            culture, and elegance.
          </motion.p>
        </div>

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <p
            className="text-center text-stone-400 py-16 tracking-[0.2em] text-xs uppercase"
            style={sans}
          >
            {error}
          </p>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.slice(0, 6).map((category, index) => (
              <CategoryCard
                key={category._id ?? category.id ?? index}
                category={category}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
