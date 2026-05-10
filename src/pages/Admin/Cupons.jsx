import { Plus, Trash2, Tag, Percent, CalendarDays, BadgeCheck, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { toast, ToastContainer } from "react-toastify";
import useCupon from "@/hooks/Cupon/useCupon";
const sans = { fontFamily: "'Montserrat', sans-serif" };
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };

/* ─── Add Coupon Dialog ─────────────────────────────────────── */
function AddCouponDialog() {
  const { open, name, discount, expire, loading, handleOpenChange, handleSubmit } = useCupon();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="gap-2 rounded-none text-[10px] tracking-[0.2em] uppercase cursor-pointer"
          style={sans}
        >
          <Plus size={13} />
          Add Coupon
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md p-0 overflow-hidden gap-0 border border-neutral-200 shadow-xl rounded-none">
        <DialogHeader className="px-7 pt-7 pb-0">
          <DialogTitle
            className="text-xl font-light text-neutral-800 tracking-wide"
            style={serif}
          >
            New Coupon
          </DialogTitle>
          <p
            className="text-[10px] tracking-[0.22em] uppercase text-neutral-400 mt-1"
            style={sans}
          >
            Fill in the details below
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-7 pt-6 pb-7 space-y-5">
          {/* Coupon Name */}
          <div className="space-y-1.5">
            <label
              className="block text-[10px] tracking-[0.22em] uppercase text-neutral-500"
              style={sans}
            >
              Coupon Code
            </label>
            <div className="relative">
              <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. AHMED10"
                className="w-full pl-9 pr-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors duration-150 placeholder:text-neutral-300 uppercase"
                style={sans}
              />
            </div>
          </div>

          {/* Discount */}
          <div className="space-y-1.5">
            <label
              className="block text-[10px] tracking-[0.22em] uppercase text-neutral-500"
              style={sans}
            >
              Discount (%)
            </label>
            <div className="relative">
              <Percent size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="number"
                min="1"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="e.g. 10"
                className="w-full pl-9 pr-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors duration-150 placeholder:text-neutral-300"
                style={sans}
              />
            </div>
          </div>

          {/* Expiry Date */}
          <div className="space-y-1.5">
            <label
              className="block text-[10px] tracking-[0.22em] uppercase text-neutral-500"
              style={sans}
            >
              Expiry Date
            </label>
            <div className="relative">
              <CalendarDays size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={expire}
                onChange={(e) => setExpire(e.target.value)}
                placeholder="e.g. 3/10/2026"
                className="w-full pl-9 pr-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors duration-150 placeholder:text-neutral-300"
                style={sans}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-5 py-2.5 text-[10px] tracking-[0.22em] uppercase text-neutral-500 border border-neutral-200 hover:border-neutral-400 hover:text-neutral-700 transition-all duration-150 cursor-pointer"
              style={sans}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-[10px] tracking-[0.22em] uppercase bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-150 cursor-pointer disabled:opacity-60"
              style={sans}
            >
              {loading ? "Saving..." : "Save Coupon"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Coupon Card ───────────────────────────────────────────── */
function CouponCard({ coupon, onDelete }) {
  const isExpired = new Date(coupon.expire) < new Date();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full ${isExpired ? "bg-neutral-300" : "bg-neutral-900"}`} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-sm ${isExpired ? "bg-neutral-100" : "bg-neutral-900"}`}>
              <Tag size={14} className={isExpired ? "text-neutral-400" : "text-white"} />
            </div>
            <div>
              <p
                className="text-sm font-semibold text-neutral-800 tracking-widest uppercase"
                style={sans}
              >
                {coupon.name}
              </p>
              <p className="text-[10px] text-neutral-400 tracking-[0.15em] uppercase mt-0.5" style={sans}>
                Coupon Code
              </p>
            </div>
          </div>

          {/* Delete button */}
          <button
            onClick={() => onDelete(coupon._id)}
            className="p-1.5 text-neutral-300 hover:text-rose-500 hover:bg-rose-50 rounded-sm transition-colors duration-200 cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mt-5 pt-4 border-t border-neutral-100">
          {/* Discount */}
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <Percent size={12} className="text-neutral-400" />
              <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400" style={sans}>
                Discount
              </span>
            </div>
            <p className="text-2xl font-light text-neutral-900 mt-1" style={serif}>
              {coupon.discount}%
            </p>
          </div>

          {/* Divider */}
          <div className="h-10 w-px bg-neutral-100" />

          {/* Expiry */}
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={12} className="text-neutral-400" />
              <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-400" style={sans}>
                Expires
              </span>
            </div>
            <p className="text-sm font-light text-neutral-700 mt-1" style={sans}>
              {formatDate(coupon.expire)}
            </p>
          </div>

          {/* Status badge */}
          <div>
            {isExpired ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] tracking-[0.18em] uppercase bg-neutral-100 text-neutral-400 rounded-full" style={sans}>
                <XCircle size={10} />
                Expired
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[9px] tracking-[0.18em] uppercase bg-emerald-50 text-emerald-600 rounded-full" style={sans}>
                <BadgeCheck size={10} />
                Active
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Loading Skeleton ──────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white border border-neutral-100 overflow-hidden">
      <div className="h-1 w-full bg-neutral-200 animate-pulse" />
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-neutral-100 animate-pulse rounded-sm" />
          <div className="space-y-2">
            <div className="w-24 h-3 bg-neutral-100 animate-pulse rounded" />
            <div className="w-16 h-2 bg-neutral-50 animate-pulse rounded" />
          </div>
        </div>
        <div className="flex gap-4 pt-4 border-t border-neutral-100">
          <div className="flex-1 space-y-2">
            <div className="w-12 h-2 bg-neutral-100 animate-pulse rounded" />
            <div className="w-10 h-6 bg-neutral-100 animate-pulse rounded" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="w-12 h-2 bg-neutral-100 animate-pulse rounded" />
            <div className="w-20 h-3 bg-neutral-100 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
const Cupons = () => {
  const { cupons, loading, error, activeCoupons, expiredCoupons, handleDelete } = useCupon();
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-neutral-800" style={serif}>
            Coupons
          </h1>
          <p
            className="text-[10px] tracking-[0.22em] uppercase text-neutral-400 mt-1"
            style={sans}
          >
            {cupons?.length} coupon{cupons?.length !== 1 ? "s" : ""} &middot; {activeCoupons?.length} active
          </p>
        </div>
        <AddCouponDialog />
      </div>

      {/* Error state */}
      {error && (
        <div className="px-4 py-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm" style={sans}>
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && cupons?.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : cupons?.length === 0 ? (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 border border-dashed border-neutral-200 bg-neutral-50"
        >
          <Tag size={32} className="text-neutral-300 mb-4" />
          <p className="text-sm font-light text-neutral-500" style={serif}>
            No coupons yet
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1" style={sans}>
            Create your first coupon above
          </p>
        </motion.div>
      ) : (
        /* Coupons grid */
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        >
          <AnimatePresence mode="popLayout">
            {cupons?.map((coupon) => (
              <CouponCard key={coupon._id} coupon={coupon} onDelete={handleDelete} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Cupons;