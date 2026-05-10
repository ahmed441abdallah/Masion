import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { getAllCategories } from "@/store/actions/categoriesActions";
import { CategoryCard } from "@/components/categories/categoryCard";
import { serif, sans } from "@/lib/fonts";
import useCategories from "@/hooks/categories/useCategories";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const SkeletonCard = ({ index }) => (
  <motion.div
    className="relative overflow-hidden bg-stone-200 aspect-[3/4] animate-pulse"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.6s_infinite]" />
  </motion.div>
);

export const CategoriesPage = () => {
  const { categories, isLoading, error, filtered, search, setSearch } =
    useCategories();

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
            Browse
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-3">
            <motion.h1
              variants={fadeUp}
              className="text-[clamp(3rem,7vw,6.5rem)] font-light leading-none text-stone-900"
              style={serif}
            >
              All <em style={{ color: "#8c7b6b" }}>Categories</em>
            </motion.h1>

            {!isLoading && (
              <motion.p
                variants={fadeUp}
                className="text-[11px] tracking-[0.25em] uppercase text-stone-400 pb-2"
                style={sans}
              >
                {categories.length} collection
                {categories.length !== 1 ? "s" : ""}
              </motion.p>
            )}
          </div>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            className="h-px bg-stone-200 mt-6 mb-10"
          />

          {/* Search */}
          <motion.div variants={fadeUp} className="relative max-w-sm">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search categories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 text-stone-700 text-[11px] tracking-[0.12em] placeholder:text-stone-300 outline-none focus:border-stone-400 transition-colors duration-200"
              style={sans}
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500 transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Grid ─────────────────────────────────── */}
      <section className="px-6 md:px-12 pb-28 max-w-7xl mx-auto">
        {/* Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4 py-32 text-center"
          >
            <p
              className="text-[11px] tracking-[0.3em] uppercase text-stone-400"
              style={sans}
            >
              Unable to load categories
            </p>
            <button
              onClick={() => dispatch(getAllCategories())}
              className="mt-2 px-6 py-2.5 border border-stone-300 text-[10px] tracking-[0.24em] uppercase text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-200 cursor-pointer"
              style={sans}
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* Empty search result */}
        {!isLoading && !error && filtered.length === 0 && search && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <p
              className="text-[11px] tracking-[0.3em] uppercase text-stone-400"
              style={sans}
            >
              No results for "{search}"
            </p>
          </motion.div>
        )}

        {/* Cards */}
        {!isLoading && !error && filtered.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
            >
              {filtered.map((category, index) => (
                <CategoryCard
                  key={category._id ?? category.id ?? index}
                  category={category}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </div>
  );
};

export default CategoriesPage;
