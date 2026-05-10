import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

import { serif } from "@/lib/fonts";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import useShop from "@/hooks/Shop/useShop";
import { ShopSidebar } from "./ShopSidebar";
import Pagination from "@/components/common/Pagination";
const sans = { fontFamily: "'Montserrat', sans-serif" };
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
/* ══════════════════════════════════════════
   SHOP PAGE
══════════════════════════════════════════ */
export const ShopPage = () => {
  const {
    products,
    isLoading,
    totalProducts,
    categories,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    page,
    limit,
    handleNextPage,
    handlePrevPage,
    sort,
    setSort,
  } = useShop();

  return (
    <div className="bg-[#f8f7f5] min-h-screen" style={sans}>
      <div className="px-6 md:px-12 pt-14 pb-8 max-w-screen-xl mx-auto">
        <p
          className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-2"
          style={sans}
        >
          Collection 
        </p>
        <h1
          className="text-[clamp(2rem,5vw,4rem)] font-light text-stone-900 leading-none"
          style={serif}
        >
          All Products
        </h1>
      </div>

      <main className="max-w-screen-xl mx-auto px-6 md:px-12 pb-24 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* ── Sidebar ── */}
        <ShopSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* ── Products ── */}
        <section className="col-span-3">
          {/* Search bar */}
          <div className="flex  gap-4 justify-between items-center">
            <div className="flex  w-full items-center gap-3 bg-white border border-neutral-200 px-4 py-3 ">
              <Search size={14} className="text-neutral-400 shrink-0" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="bg-transparent  flex-1 text-sm text-neutral-700 outline-none placeholder:text-neutral-300"
                style={sans}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="text-neutral-300 hover:text-neutral-600 transition-colors"
                >
                  <X size={13} />
                </button>
              )}
            </div>
            <Select value={sort} onValueChange={(value) => setSort(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" style={sans} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="" style={sans}>
                    Default
                  </SelectItem>
                  <SelectItem value="-price" style={sans}>
                    Highest Price
                  </SelectItem>
                  <SelectItem value="price" style={sans}>
                    Lowest Price
                  </SelectItem>
                  <SelectItem value="-averageRating" style={sans}>
                    Highest Rating
                  </SelectItem>
                  <SelectItem value="averageRating" style={sans}>
                    Lowest Rating
                  </SelectItem>
                  <SelectItem value="-createdAt" style={sans}>
                    Newest
                  </SelectItem>
                  <SelectItem value="-sold" style={sans}>
                    Best Sellers
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <p
            className="text-[11px] text-neutral-400 tracking-widest uppercase mb-6"
            style={sans}
          >
            {isLoading ? "Loading…" : `${totalProducts} results`}
          </p>
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : products.filter(Boolean).length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center gap-3">
              <p className="text-2xl font-light text-neutral-300" style={serif}>
                No products found
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory(null);
                }}
                className="text-[11px] tracking-widest uppercase text-neutral-400 hover:text-neutral-700 transition-colors"
                style={sans}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10"
            >
              <AnimatePresence>
                {products.filter(Boolean).map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      </main>
      <Pagination
        page={page}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        isNextDisabled={products.length < limit || isLoading}
        isPrevDisabled={page === 1 || isLoading}
      />
    </div>
  );
};
