import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  Tag,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, RemoveFromCart, updateCartItem,clearCart } from "@/store/actions/cartActions";
import EmptyCart from "./EmptyCart";
import CartSkeleton from "./CartSkeleton";
import OrderSummary from "./OrderSummary";
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans  = { fontFamily: "'Montserrat', sans-serif" };
function CartItem({ item, onRemove, onQtyChange }) {
  if (!item) return null; // safety check
  const product  = item.product   ?? {};
  const name     = product.title   ?? "Product";
  const image    = product.imageCover ?? product.image ?? "";
  const price    = item.price  ?? 0;
  const qty      = item.quantity  ?? item.qty ?? 1;
  const color    = item.color     ?? "";
  const category = product.brand?.name ?? product.category ?? "";
  const [quantity, setQuantity] = useState(qty);
  useEffect(() => {
    setQuantity(qty);
  }, [qty]);

  const handleChange = (newQty) => {
    if (newQty < 1) return;          // prevent going below 1
    setQuantity(newQty);             // optimistic local update
    onQtyChange(product?._id, newQty);   // dispatch API call
  };

  return (
    <>
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24, transition: { duration: 0.22 } }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-5 py-6 border-b border-neutral-100 last:border-0"
    >
      {/* Image */}
      <div className="relative w-24 h-28 sm:w-28 sm:h-32 shrink-0 overflow-hidden bg-neutral-100 rounded-sm">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={24} className="text-neutral-300" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              {category && (
                <p
                  className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-1"
                  style={sans}
                >
                  {category}
                </p>
              )}
              <h3
                className="text-base font-light text-neutral-800 leading-snug"
                style={serif}
              >
                {name}
              </h3>
            </div>

            {/* Remove */}
            <button
              onClick={() => onRemove(product?._id)}
              className="p-1.5 text-neutral-300 hover:text-rose-400 transition-colors cursor-pointer shrink-0"
              aria-label="Remove item"
            >
              <X size={15} />
            </button>
          </div>

          {/* Meta tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {color && (
              <span
                className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 border border-neutral-200 px-2 py-0.5"
                style={sans}
              >
                {color}
              </span>
            )}
            <span
                className="text-[10px] tracking-[0.15em] uppercase text-neutral-400 border border-neutral-200 px-2 py-0.5"
                style={sans}
              >
                {qty}x
              </span>
          </div>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity stepper */}
          <div className="flex items-center border border-neutral-200">
            <button
              onClick={() => handleChange(quantity - 1)}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <Minus size={12} />
            </button>
            <span
              className="w-8 h-8 flex items-center justify-center text-sm text-neutral-700"
              style={sans}
            >
              {quantity}
            </span>
            <button
              onClick={() => handleChange(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <Plus size={12} />
            </button>
          </div>

          <p className="text-sm font-medium text-neutral-800" style={sans}>
            ${(price * quantity).toLocaleString()}
          </p>
        </div>
      </div>
      
    </motion.div>
    
    </>
    
  );
}

/* ─── Cart Page ──────────────────────────────────────────────── */
export default function CartPage() {
  const { cartItems, isLoading, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);
const handleClearCart= async ()=>{
 const  res = await dispatch(clearCart());
 if(res){
  dispatch(getUserCart());
 }
}
  const handleRemove = (itemId) => {
    dispatch(RemoveFromCart(itemId));
  };

  const handleQtyChange = (itemId, quantity) => {
    dispatch(updateCartItem(itemId, quantity));
  };


  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Breadcrumb */}
      <div className="border-b border-neutral-100 bg-white">
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-[10px] tracking-[0.18em] uppercase text-neutral-400"
          style={sans}
        >
          <Link to="/" className="hover:text-neutral-700 transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-neutral-700 transition-colors">Shop</Link>
          <ChevronRight size={10} />
          <span className="text-neutral-600">Cart</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-light text-neutral-800" style={serif}>
            Shopping Cart
          </h1>
          <p
            className="text-[10px] tracking-[0.22em] uppercase text-neutral-400 mt-1"
            style={sans}
          >
            
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-rose-50 border border-rose-100 text-rose-600 text-sm" style={sans}>
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
            <div className="bg-white border border-neutral-100 px-5 sm:px-7">
              <CartSkeleton />
            </div>
            <div className="bg-white border border-neutral-100 p-6 lg:p-7 space-y-4 animate-pulse">
              <div className="h-5 w-32 bg-neutral-100 rounded" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-3 w-20 bg-neutral-100 rounded" />
                    <div className="h-3 w-12 bg-neutral-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : !cartItems || cartItems?.cartItems?.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
            {/* Left — items */}
            <div className="bg-white border border-neutral-100 px-5 sm:px-7">
              <AnimatePresence mode="popLayout">
                {cartItems?.cartItems?.map((item) => (
                  item && (
                    <CartItem
                      key={item._id}
                      item={item}
                      onRemove={handleRemove}
                      onQtyChange={handleQtyChange}
                    />
                  )
                ))}
              </AnimatePresence>
            </div>
            <OrderSummary    />
          </div>
        )}
        {
          cartItems?.cartItems?.length > 0 && (
            <button onClick={handleClearCart} className="px-4 py-2.5 bg-neutral-900 text-white text-[10px] tracking-[0.2em] uppercase hover:bg-neutral-700 transition-colors duration-150 cursor-pointer whitespace-nowrap" style={sans}>
              Clear Cart
            </button>
          )
        }
      </div>
    </div>
  );
}
