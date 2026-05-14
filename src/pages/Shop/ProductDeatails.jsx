import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Share2,
  ShoppingBag,
  Shield,
  Truck,
  RotateCcw,
  ChevronRight,
  Minus,
  Plus,
  ArrowLeft,
  Heart,
  X,
  PenLine,
} from "lucide-react";
import { getProductDetails } from "@/store/actions/productsActions";
import { addToWishlist } from "@/store/actions/wishlistActions";
import { addReview, getReviewsForProduct } from "@/store/actions/reviewsActions";
import { toast, ToastContainer } from "react-toastify";
import { AddToCart } from "@/store/actions/cartActions";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Montserrat', sans-serif" };

function Stars({ n = 0, size = 12 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.floor(n) ? "text-amber-400" : "text-neutral-200"}
          fill="currentColor"
        />
      ))}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 md:px-14 py-16 grid grid-cols-1 lg:grid-cols-2 gap-14 animate-pulse">
      <div className="flex gap-4">
        <div className="hidden sm:flex flex-col gap-3 w-[72px]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-neutral-200 rounded-md" />
          ))}
        </div>
        <div className="flex-1 aspect-[4/5] bg-neutral-200 rounded-md" />
      </div>
      <div className="flex flex-col gap-5 pt-4">
        <div className="h-3 w-24 bg-neutral-200 rounded" />
        <div className="h-10 w-3/4 bg-neutral-200 rounded" />
        <div className="h-3 w-40 bg-neutral-200 rounded" />
        <div className="h-8 w-32 bg-neutral-200 rounded" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-24 bg-neutral-200 rounded" />
          ))}
        </div>
        <div className="h-14 bg-neutral-200 rounded mt-4" />
        <div className="grid grid-cols-3 gap-3 mt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-neutral-200 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

export const ProductDeatails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isLoading, error } = useSelector((s) => s.products, shallowEqual);
  const { reviews } = useSelector((state) => state.review, shallowEqual);
  const { user, token } = useSelector((state) => state.auth, shallowEqual);

  const requireLogin = () => {
    const hasToken = token || localStorage.getItem("token");
    if (!hasToken) {
      toast.error("Please login first.");
      navigate("/login");
      return true;
    }
    return false;
  };

  const [active, setActive] = useState(0);
  const [color, setColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const { cart, isLoading: isLoadingCart } = useSelector((state) => state.cart, shallowEqual);
  useEffect(() => {
    if (id) {
      setActive(0);
      setColor(null);
      setQty(1);
      dispatch(getProductDetails(id));
      dispatch(getReviewsForProduct(id));
    }
  }, [id, dispatch]);

  const handleAdd =async () => {
    if (requireLogin()) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
const res=await dispatch(AddToCart(product?._id,{
      color:color
    }))
    if (res === true) {
      toast.success("Added to cart!");
    } else {
      toast.error(res || "Something went wrong");
    }
  };

  const handleAddToWishlist = async () => {
    if (requireLogin()) return;
    const res = await dispatch(addToWishlist(product?._id));
    if (res === true) {
      setWishlisted(true);
      toast.success("Added to wishlist!");
    } else {
      toast.error(typeof res === "string" ? res : "Failed to add to wishlist");
    }
  };

  const openReviewDialog = () => {
    if (requireLogin()) return;
    setReviewRating(0);
    setReviewHover(0);
    setReviewTitle("");
    setReviewDialog(true);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if(!reviewRating || !reviewTitle) {
      toast.error("Please provide both rating and review title.");
      return;
    };
    setReviewSubmitting(true);
    const res = await dispatch(addReview({
      title: reviewTitle,
      rating: reviewRating,
      product: product?._id,
      user: user?._id
    }));
    setReviewSubmitting(false);
    if (res === true) {
      toast.success("Review submitted!");
      setReviewDialog(false);
      // Re-fetch reviews (populated with user name) and product (updated rating)
      dispatch(getReviewsForProduct(id));
      dispatch(getProductDetails(id));
    } else {
      toast.error(typeof res === "string" ? res : "Failed to submit review.");
    }

  };

  if (isLoading || !product || product._id !== id) {
    return (
      <div className="bg-[#f8f7f5] min-h-screen" style={sans}>
        <Skeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-[#f8f7f5] min-h-screen flex flex-col items-center justify-center gap-4"
        style={sans}
      >
        <p className="text-neutral-400 text-sm">Failed to load product.</p>
        <button
          onClick={() => navigate("/shop")}
          className="text-[10px] tracking-widest uppercase text-neutral-500 hover:text-neutral-800 transition-colors"
        >
          Back to shop
        </button>
      </div>
    );
  }

  const {
    title,
    description,
    price,
    priceAfterDiscount,
    averageRating,
    ratingsQuantity,
    quantity,
    sold,
    colors,
    imageCover,
    images = [],
  } = product;

  const allImages = [imageCover, ...images].filter(Boolean);
  const colorList = Array.isArray(colors) ? colors : [];
  const hasDiscount = priceAfterDiscount && priceAfterDiscount < price;
  const discountPct = hasDiscount
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;
  const displayPrice = hasDiscount ? priceAfterDiscount : price;

  return (
    <div className="bg-[#f8f7f5] min-h-screen" style={sans}>
      {/* Breadcrumb */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-14 pt-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-neutral-400">
          <Link to="/" className="hover:text-neutral-700 transition-colors">
            Home
          </Link>
          <ChevronRight size={9} />
          <Link to="/shop" className="hover:text-neutral-700 transition-colors">
            Shop
          </Link>
          <ChevronRight size={9} />
          <span className="text-neutral-600 truncate max-w-[200px]">
            {title}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <main className="max-w-screen-xl mx-auto px-6 md:px-14 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
        {/* Gallery */}
        <div className="flex gap-4 lg:sticky lg:top-8 h-fit">
          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="hidden sm:flex flex-col gap-3 w-[72px] shrink-0">
              {allImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`overflow-hidden aspect-square rounded-md border-[1.5px] transition-all duration-200 ${
                    active === i
                      ? "border-neutral-800 shadow-sm"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Hero image — swipeable */}
          <div className="flex-1 relative overflow-hidden aspect-[4/5] bg-neutral-100 rounded-md select-none">
            <motion.div
              className="w-full h-full"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(e, info) => {
                if (info.offset.x < -50 && active < allImages.length - 1) setActive(active + 1);
                if (info.offset.x > 50 && active > 0) setActive(active - 1);
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={allImages[active]}
                  alt={title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.38 }}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
              </AnimatePresence>
            </motion.div>

            {hasDiscount && (
              <div
                className="absolute top-4 left-4 px-3 py-1 bg-[#0c0c0c] text-[#c9a96e] text-[10px] tracking-[0.25em] uppercase"
                style={sans}
              >
                -{discountPct}% off
              </div>
            )}

            {/* Prev / Next arrow buttons (desktop) */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setActive((p) => Math.max(0, p - 1))}
                  disabled={active === 0}
                  className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm text-neutral-700 hover:bg-white transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-sm"
                >
                  ‹
                </button>
                <button
                  onClick={() => setActive((p) => Math.min(allImages.length - 1, p + 1))}
                  disabled={active === allImages.length - 1}
                  className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 items-center justify-center rounded-full bg-white/70 backdrop-blur-sm text-neutral-700 hover:bg-white transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-sm"
                >
                  ›
                </button>
              </>
            )}

            {/* Dots (mobile + desktop) */}
            {allImages.length > 1 && (
              <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      active === i
                        ? "w-5 bg-neutral-800"
                        : "w-1.5 bg-neutral-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>


        {/* Product Info */}
        <div className="flex flex-col">
          <h1
            className="text-[clamp(1.9rem,4vw,3.2rem)] font-light leading-[1.1] text-neutral-900 mb-4"
            style={serif}
          >
            {title}
          </h1>

          {/* Rating row */}
          <div className="flex items-center flex-wrap gap-3 mb-5">
            <Stars n={averageRating} />
            <span className="text-[11px] text-neutral-400" style={sans}>
              {averageRating} &middot; {ratingsQuantity}{" "}
              {ratingsQuantity === 1 ? "review" : "reviews"}
            </span>
            <span className="text-neutral-300">|</span>
            <span className="text-[11px] text-neutral-400" style={sans}>
              {sold} sold
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-4 mb-6 pb-6 border-b border-neutral-200">
            <span
              className="text-[2.6rem] font-light leading-none text-neutral-900"
              style={serif}
            >
              ${displayPrice}
            </span>
            {hasDiscount && (
              <div className="flex flex-col pb-1 gap-0.5">
                <span
                  className="text-sm text-neutral-400 line-through"
                  style={sans}
                >
                  ${price}
                </span>
                <span
                  className="text-[10px] text-emerald-600 tracking-wide"
                  style={sans}
                >
                  Save ${price - priceAfterDiscount}
                </span>
              </div>
            )}
          </div>

          {/* Colors */}
          {colorList.length > 0 && (
            <div className="mb-6">
              <p
                className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 mb-3"
                style={sans}
              >
                Color{color ? ` - ${color}` : ""}
              </p>
              <div className="flex flex-wrap gap-2">
                {colorList.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c === color ? null : c)}
                    style={sans}
                    className={`px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-all ${
                      color === c
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-200 text-neutral-500 hover:border-neutral-500 hover:text-neutral-700"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p
              className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 mb-3"
              style={sans}
            >
              Quantity
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-neutral-200">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span
                  className="w-12 text-center text-sm text-neutral-800"
                  style={sans}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(quantity, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    quantity > 0 ? "bg-emerald-400" : "bg-red-400"
                  }`}
                />
                <span className="text-[11px] text-neutral-500" style={sans}>
                  {quantity > 5
                    ? "In stock"
                    : quantity > 0
                      ? `Only ${quantity} left`
                      : "Out of stock"}
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 mb-8">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              disabled={isLoadingCart}
              className="flex-1 flex items-center justify-center gap-2.5 py-4 text-[11px] tracking-[0.3em] uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                ...sans,
                background: added ? "#16a34a" : "#0c0c0c",
                color: "#fff",
              }}
            >
              <ShoppingBag size={14} />
              {isLoadingCart ? "Adding to Bag..." : "Add to Bag"}
            </motion.button>

            {/* Wishlist */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={ handleAddToWishlist}
              disabled={isLoading}
              title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              className={`w-14 flex items-center justify-center border transition-all ${
                wishlisted
                  ? "border-rose-400 bg-rose-50"
                  : "border-neutral-200 hover:border-rose-300 hover:bg-rose-50"
              }`}
            >
              <motion.div
                animate={wishlisted ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  size={17}
                  className={`transition-colors ${
                    wishlisted ? "text-rose-500" : "text-neutral-400"
                  }`}
                  fill={wishlisted ? "currentColor" : "none"}
                />
              </motion.div>
            </motion.button>
            <button className="w-14 flex items-center justify-center border border-neutral-200 hover:border-neutral-400 transition-all">
              <Share2 size={15} className="text-neutral-400" />
            </button>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { Icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
              { Icon: RotateCcw, label: "30-Day Returns", sub: "Hassle-free" },
              { Icon: Shield, label: "Authentic", sub: "100% genuine" },
            ].map(({ Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 py-4 px-2 bg-white border border-neutral-100 rounded-lg text-center"
              >
                <Icon size={16} className="text-neutral-400" />
                <p
                  className="text-[9px] tracking-[0.15em] uppercase text-neutral-700 leading-tight"
                  style={sans}
                >
                  {label}
                </p>
                <p className="text-[9px] text-neutral-400" style={sans}>
                  {sub}
                </p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-t border-neutral-100">
            <div className="flex gap-0">
              {["description", "details", "reviews"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative mr-8 py-4 text-[10px] tracking-[0.25em] uppercase transition-colors ${
                    tab === t
                      ? "text-neutral-900"
                      : "text-neutral-400 hover:text-neutral-600"
                  }`}
                  style={sans}
                >
                  {t}
                  {t === "reviews" && ratingsQuantity > 0 && (
                    <span className="ml-1.5 text-[9px] text-neutral-400">
                      ({ratingsQuantity})
                    </span>
                  )}
                  {tab === t && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900"
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22 }}
                className="py-6"
              >
                {/* Description */}
                {tab === "description" && (
                  <p
                    className="text-[15px] text-neutral-600 leading-[1.9] font-light"
                    style={serif}
                  >
                    {description}
                  </p>
                )}

                {/* Details */}
                {tab === "details" && (
                  <dl className="flex flex-col divide-y divide-neutral-100">
                    {[
                      ["Average Rating", `${averageRating} / 5`],
                      ["Total Reviews", ratingsQuantity],
                      ["Units Sold", sold],
                      ["In Stock", quantity],
                    ].map(([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between items-center py-3"
                      >
                        <dt
                          className="text-[10px] tracking-[0.2em] uppercase text-neutral-400"
                          style={sans}
                        >
                          {k}
                        </dt>
                        <dd
                          className="text-sm text-neutral-700 font-light"
                          style={serif}
                        >
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {/* Reviews */}
                {tab === "reviews" && (
                  <div>
                    <div className="flex items-center justify-between gap-5 mb-8 pb-6 border-b border-neutral-100">
                      <div className="text-center shrink-0">
                        <p
                          className="text-5xl font-light text-neutral-900 leading-none mb-2"
                          style={serif}
                        >
                          {averageRating}
                        </p>
                        <Stars n={averageRating} size={14} />
                        <p
                          className="text-[10px] text-neutral-400 mt-1.5"
                          style={sans}
                        >
                          {ratingsQuantity}{" "}
                          {ratingsQuantity === 1 ? "review" : "reviews"}
                        </p>
                      </div>
                      {/* Add Review button */}
                      <button
                        onClick={openReviewDialog}
                        className="flex items-center gap-2 px-4 py-2.5 text-[10px] tracking-[0.25em] uppercase border border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white transition-all duration-200"
                        style={sans}
                      >
                        <PenLine size={11} />
                        Add Review
                      </button>
                    </div>

                    {reviews.length === 0 ? (
                      <div className="flex flex-col items-center py-10 gap-2 text-center">
                        <Star size={28} className="text-neutral-200" />
                        <p
                          className="text-sm font-light text-neutral-400"
                          style={serif}
                        >
                          No reviews yet. Be the first to review this product.
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-6">
                        {reviews.map((r, i) => (
                          <div key={r._id ?? i} className="flex gap-4">
                            <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center shrink-0">
                              <span
                                className="text-[10px] font-medium text-neutral-600"
                                style={sans}
                              >
                                {r.user?.name?.slice(0, 2).toUpperCase() ?? "?"}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p
                                  className="text-sm font-medium text-neutral-800"
                                  style={sans}
                                >
                                  {r.user?.name ?? "Anonymous"}
                                </p>
                              </div>
                              <Stars n={r.rating} />
                              {r.title && (
                                <p
                                  className="text-sm text-neutral-700 mt-2 font-medium"
                                  style={sans}
                                >
                                  {r.title}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Back link */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-14 pb-20">
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-neutral-400 hover:text-neutral-700 transition-colors"
          style={sans}
        >
          <ArrowLeft size={12} />
          Back to shop
        </button>
      </div>
      <ToastContainer />

      {/* ── Review Dialog ── */}
      <AnimatePresence>
        {reviewDialog && (
          <motion.div
            key="review-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
            onClick={() => setReviewDialog(false)}
          >
            <motion.div
              key="review-modal"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-neutral-100">
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 mb-0.5" style={sans}>
                    {title}
                  </p>
                  <h2 className="text-xl font-light text-neutral-900" style={serif}>
                    Write a Review
                  </h2>
                </div>
                <button
                  onClick={() => setReviewDialog(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-all"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmitReview} className="px-7 py-6 flex flex-col gap-6">
                {/* Star picker */}
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 mb-3" style={sans}>
                    Your Rating
                  </p>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        onMouseEnter={() => setReviewHover(star)}
                        onMouseLeave={() => setReviewHover(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          size={26}
                          className="transition-colors"
                          fill={(reviewHover || reviewRating) >= star ? "#f59e0b" : "none"}
                          stroke={(reviewHover || reviewRating) >= star ? "#f59e0b" : "#d1d5db"}
                        />
                      </button>
                    ))}
                  </div>
                  {reviewRating > 0 && (
                    <p className="text-[10px] text-neutral-400 mt-1.5" style={sans}>
                      {["Terrible","Poor","Average","Good","Excellent"][reviewRating - 1]}
                    </p>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label
                    className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 mb-2 block"
                    style={sans}
                  >
                    Review Title
                  </label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Summarise your experience…"
                    maxLength={120}
                    className="w-full border border-neutral-200 px-4 py-3 text-sm text-neutral-700 outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-300"
                    style={sans}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={reviewSubmitting}
                  className="w-full py-3.5 text-[11px] tracking-[0.3em] uppercase text-white transition-opacity disabled:opacity-50"
                  style={{ ...sans, background: "#0c0c0c" }}
                >
                  {reviewSubmitting ? "Submitting…" : "Submit Review"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
  );
};
