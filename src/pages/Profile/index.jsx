import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  ShieldCheck,
  MapPin,
  LogOut,
  Plus,
  Package,
  Heart,
  Trash2,
  ClipboardPlus,
} from "lucide-react";
import { getUserProfile, getUserWishlist, logout } from "@/store/actions/authActions";
import { removeFromWishlist } from "@/store/actions/wishlistActions";
import { ToastContainer,toast } from "react-toastify";
import { getUserOrders } from "@/store/actions/orderActions";


const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
};

function Avatar({ name }) {
  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";
  return (
    <div className="relative inline-block">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-light select-none"
        style={{
          background: "linear-gradient(135deg,#1a1a1a 0%,#3a3a3a 100%)",
          color: "#c9a96e",
        }}
      >
        {initials}
      </div>
      <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
    </div>
  );
}

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error, token, wishlist } = useSelector(
    (s) => s.auth,
    shallowEqual
  );
  const { orders, isLoading: isOrdersLoading } = useSelector((s) => s.order, shallowEqual);
  const storedToken = token || localStorage.getItem("token");

  useEffect(() => {
    if (storedToken) {
      dispatch(getUserProfile());
    }
    dispatch(getUserWishlist());
    dispatch(getUserOrders());
  }, [dispatch, storedToken]);
  if (!storedToken) return <Navigate to="/login" replace />;
console.log('orders',orders);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };
  const handleRemoveFromWishlist = async (productId) => {
    const res = await dispatch(removeFromWishlist(productId));
    if (res===true) {
      dispatch(getUserWishlist());
      toastt.success("Product removed from wishlist");
    }else{
      toast.error(res || "Failed to remove product from wishlist");
    }
  };

  

  return (
    <div className="min-h-screen bg-neutral-950" >
      {/* ── Ambient glow ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse,#c9a96e 0%,transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5"
        >
          {/* ── Identity Block ──────────────── */}
          <motion.div
            variants={item}
            className="rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.02) 100%)",
            }}
          >
            {/* Gold top stripe */}
            <div
              className="h-1 w-full"
              style={{
                background: "linear-gradient(90deg,#c9a96e,#e8c98a,#c9a96e)",
              }}
            />

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <Avatar name={user?.name} />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 text-white/40 hover:text-red-400 hover:border-red-400/30 transition-all text-[11px] tracking-[0.15em] uppercase"
                  
                >
                  <LogOut size={12} />
                  Sign out
                </button>
                
              </div>

              {isLoading ? (
                <div className="flex gap-2 items-center">
                  <span className="w-4 h-4 border-2 border-white/20 border-t-[#c9a96e] rounded-full animate-spin" />
                  <span
                    className="text-white/30 text-xs tracking-widest"
                  >
                    Loading…
                  </span>
                </div>
              ) : (
                <>
                  <h1
                    className="font-serif text-4xl font-light text-white mb-1"
                  >
                    {user?.name ?? "—"}
                  </h1>
                  <p className="text-white/40 text-sm mb-4" >
                    {user?.email ?? "—"}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase border"
                    style={{
                      background: "rgba(201,169,110,0.12)",
                      borderColor: "rgba(201,169,110,0.3)",
                      color: "#c9a96e",
                    }}
                  >
                    <ShieldCheck size={10} />
                    {user?.role ?? "user"}
                  </span>
                </>
              )}

              {error && (
                <p
                  className="mt-4 text-[11px] text-red-400/80 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2"
                >
                  {error}
                </p>
              )}
            </div>
          </motion.div>

          {/* ── Info Grid ───────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: User, label: "Name", value: user?.name },
              { icon: Mail, label: "Email", value: user?.email },
              { icon: ShieldCheck, label: "Role", value: user?.role },
            ].map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                variants={item}
                className="rounded-2xl border border-white/8 p-5"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: "rgba(201,169,110,0.12)" }}
                >
                  <Icon size={14} style={{ color: "#c9a96e" }} />
                </div>
                <p
                  className="text-[9px] tracking-[0.25em] uppercase text-white/25 mb-1"
                >
                  {label}
                </p>
                <p className="text-sm text-white/70 truncate" >
                  {value ?? "—"}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── Wishlist ───────────────────── */}
          <motion.div
            variants={item}
            className="rounded-3xl border border-white/10 p-6"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Heart size={15} style={{ color: "#c9a96e" }} />
                <span
                  className="text-[10px] tracking-[0.25em] uppercase text-white/40"
                >
                  Wishlist
                </span>
              </div>
              <button className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all">
                <Plus size={13} />
              </button>
            </div>

            {wishlist?.length > 0 ? (
              <div className="flex flex-col gap-2">
                {wishlist.map((item, i) => (
                  <div
                    key={i}
                    className="flex relative items-start gap-3 px-3 py-3 rounded-xl border border-white/6"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <img
                      src={item.imageCover}
                      alt={item.title}
                      className="w-35 h-35 object-cover rounded-md"
                    />
                    <div>
                      <p
                        className="text-lg text-white/60 leading-relaxed"
                      >
                        {item.title}
                      </p>
                      <p
                        className="text-sm text-white/60 leading-relaxed"
                      >
                        ${item.price}
                      </p>
                    </div>
                    <button
                    onClick={()=>handleRemoveFromWishlist(item._id)}
                     className="w-7 h-7 absolute top-4 right-2 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-8 gap-2">
                <Package size={28} className="text-white/10" />
                <p
                  className="text-[11px] text-white/25 tracking-wider"
                >
                  No Prouct in your wishlist
                </p>
              </div>
            )}
          </motion.div>
          {/* { orders-------} */}
          <motion.div
            variants={item}
            className="rounded-3xl border border-white/10 p-6"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <ClipboardPlus size={15} style={{ color: "#c9a96e" }} />
                <span
                  className="text-[10px] tracking-[0.25em] uppercase text-white/40"
                >
                  My Orders
                </span>
              </div>
              <button className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/30 hover:text-[#c9a96e] hover:border-[#c9a96e]/30 transition-all">
                <Plus size={13} />
              </button>
            </div>

            {isOrdersLoading ? (
              <div className="flex justify-center py-8 gap-2 items-center">
                <span className="w-4 h-4 border-2 border-white/20 border-t-[#c9a96e] rounded-full animate-spin" />
                <span className="text-white/30 text-xs tracking-widest">Loading orders…</span>
              </div>
            ) : orders?.length > 0 ? (
              <div className="flex flex-col gap-3">
                {orders.map((order, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-3 p-4 rounded-xl border border-white/6 hover:border-white/10 transition-colors"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        {order.cartItems?.[0]?.product?.imageCover && (
                          <div className="w-16 h-20 bg-white/5 rounded-md overflow-hidden shrink-0">
                            <img
                              src={order.cartItems[0].product.imageCover}
                              alt={order.cartItems[0].product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex flex-col py-0.5">
                          <p className="text-sm text-white/80 font-medium mb-1 line-clamp-1" >
                            {order.cartItems?.[0]?.product?.title || "Product"}
                          </p>
                          <p className="text-xs text-white/50 mb-2" >
                            Order #{order._id}
                          </p>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest" >
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`text-[9px] px-2 py-0.5 uppercase tracking-widest rounded-sm ${order.isDelivered ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                          {order.status}
                        </span>
                        <p className="text-sm font-medium" style={{ color: "#c9a96e" }}>
                          ${order.totalOrderPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-8 gap-2">
                <Package size={28} className="text-white/10" />
                <p
                  className="text-[11px] text-white/25 tracking-wider"
                >
                  You haven't placed any orders yet
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
      <ToastContainer />
    </div>
  );
}
