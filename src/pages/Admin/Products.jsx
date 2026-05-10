import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Package, ChevronRight, ChevronLeft } from "lucide-react";
import { deleteProduct, getAllProducts } from "@/store/actions/productsActions";
import AdminProductCard from "@/components/products/AdminProductCard";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "@/components/common/Pagination";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Montserrat', sans-serif" };

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const { products, isLoading, error, totalProducts } = useSelector(
    (s) => s.products,
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllProducts(page, limit));
  }, [dispatch, page]);

  const filtered = products.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()),
  );
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleDelete = async (productId) => {
    const result = await dispatch(deleteProduct(productId));
    if (result === true) {
      toast.success("Product deleted successfully");
    } else {
      toast.error(result || "Failed to delete product");
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-neutral-800" style={serif}>
            Products
          </h1>
          <p
            className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1"
            style={sans}
          >
            {isLoading ? "Loading…" : `${totalProducts} products total`}
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/products/add")}
          className="flex items-center gap-2 bg-[#0c0c0c] text-white text-[10px] tracking-[0.2em] uppercase px-4 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors"
          style={sans}
        >
          <Plus size={13} />
          Add Product
        </button>
      </div>

      {/* ── Search bar ── */}
      <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-4 py-2.5 max-w-sm">
        <Search size={13} className="text-neutral-400 shrink-0" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          className="bg-transparent text-sm text-neutral-700 outline-none placeholder:text-neutral-300 w-full"
          style={sans}
        />
      </div>

      {/* ── Error ── */}
      {error && (
        <p
          className="text-sm text-red-400 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
          style={sans}
        >
          {error}
        </p>
      )}

      {/* ── Loading skeletons ── */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-neutral-100 rounded-2xl overflow-hidden"
            >
              <div className="aspect-[4/3] bg-neutral-100 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-neutral-100 animate-pulse rounded-full w-3/4" />
                <div className="h-3 bg-neutral-100 animate-pulse rounded-full w-1/2" />
                <div className="h-3 bg-neutral-100 animate-pulse rounded-full w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Grid ── */}
      {!isLoading && (
        <>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-20 gap-3 text-center"
            >
              <Package size={36} className="text-neutral-200" />
              <p className="text-lg font-light text-neutral-400" style={serif}>
                {search ? "No products match your search" : "No products yet"}
              </p>
              {!search && (
                <button
                  onClick={() => navigate("/admin/products/add")}
                  className="mt-2 text-[11px] tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-800 transition-colors"
                  style={sans}
                >
                  Add your first product →
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              layout
            >
              <AnimatePresence>
                {filtered.map((product) => (
                  <AdminProductCard
                    key={product._id}
                    product={product}
                    handleDelete={handleDelete}
                    isLoading={isLoading}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </>
      )}
      {/* ── Pagination ── */}
      <Pagination
        page={page}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
        isNextDisabled={products.length < limit || isLoading}
        isPrevDisabled={page === 1 || isLoading}
      />
      <ToastContainer />
    </div>
  );
}
