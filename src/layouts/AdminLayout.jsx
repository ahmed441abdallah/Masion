import { useState } from "react";
import {
  Outlet,
  NavLink,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  List,
  Ticket,
  Shirt,
} from "lucide-react";
import { useSelector } from "react-redux";

const NAV = [
  { label: "Overview", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Products", icon: Package, href: "/admin/products" },
  { label: "Orders", icon: ShoppingBag, href: "/admin/orders" },
  { label: "Customers", icon: Users, href: "/admin/customers" },
  { label: "Analytics", icon: TrendingUp, href: "/admin/analytics" },
  { label: "Categories", icon: List, href: "/admin/categories" },
  { label: "Brands", icon: Shirt, href: "/admin/brands" },
  { label: "Cupons", icon: Ticket, href: "/admin/cupons" },
];

function NavItem({ label, icon: Icon, href, onClick }) {
  return (
    <NavLink
      to={href}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
          isActive
            ? "bg-white/8 text-[#c9a96e]"
            : "text-white/48 hover:text-white/85 hover:bg-white/5"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={15} strokeWidth={isActive ? 2 : 1.6} />
          <span
            style={{
              letterSpacing: "0.02em",
              fontFamily: "'Geist Variable', sans-serif",
            }}
          >
            {label}
          </span>
          {isActive && (
            <span className="ml-auto w-1 h-4 rounded-full bg-[#c9a96e]" />
          )}
        </>
      )}
    </NavLink>
  );
}

function SidebarContent({ onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("maison_admin_token");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex flex-col h-full py-7">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 mb-8">
        <div className="flex flex-col gap-1.5">
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 17,
              fontWeight: 300,
              letterSpacing: "0.34em",
              color: "rgba(255,255,255,0.90)",
              textTransform: "uppercase",
            }}
          >
            Maison
          </span>
          <span
            style={{
              fontSize: 8,
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.24)",
              textTransform: "uppercase",
            }}
          >
            Admin Panel
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/70 transition-colors lg:hidden"
          >
            <X size={17} />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 px-3 flex-1">
        {NAV.map((item) => (
          <NavItem key={item.href} {...item} onClick={onClose} />
        ))}

        <div className="my-4 border-t border-white/8" />

        
      </nav>

      {/* Admin profile */}
      <div className="px-3 mt-2">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl border border-white/8">
          <div className="w-8 h-8 rounded-full bg-[#c9a96e]/15 flex items-center justify-center text-[#c9a96e] text-xs font-semibold shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/85 text-xs font-medium truncate">
              Admin User
            </p>
            <p className="text-white/28 text-[10px] truncate">
              admin@maison.fr
            </p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="text-white/28 hover:text-white/70 transition-colors"
          >
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useSelector((s) => s.auth);

  const segment = location.pathname.split("/")[2] || "dashboard";
  const pageTitle = segment.charAt(0).toUpperCase() + segment.slice(1);

  if (user?.role !== "admin") return <Navigate to="/login" replace />;
  return (
    <div className="flex h-screen bg-[#f5f5f4] overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-[220px] shrink-0 bg-[#0c0c0c]">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/55 lg:hidden"
            />
            <motion.aside
              key="sidebar"
              initial={{ x: -220 }}
              animate={{ x: 0 }}
              exit={{ x: -220 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-[220px] flex flex-col bg-[#0c0c0c] lg:hidden"
            >
              <SidebarContent onClose={() => setSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-[60px] bg-white border-b border-black/6 flex items-center gap-4 px-5 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-neutral-400 hover:text-neutral-800 transition-colors"
          >
            <Menu size={19} />
          </button>

          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-800 capitalize tracking-wide">
              {pageTitle}
            </p>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 w-52">
            <Search size={13} className="text-neutral-400 shrink-0" />
            <input
              placeholder="Search…"
              className="bg-transparent text-xs outline-none placeholder:text-neutral-400 w-full"
            />
          </div>

          {/* Bell */}
          <button className="relative text-neutral-400 hover:text-neutral-800 transition-colors">
            <Bell size={17} />
            <span className="absolute -top-1 -right-1 w-[15px] h-[15px] bg-[#c9a96e] rounded-full text-[9px] text-white flex items-center justify-center font-semibold">
              3
            </span>
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#0c0c0c] text-white text-xs font-semibold flex items-center justify-center select-none">
            A
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
