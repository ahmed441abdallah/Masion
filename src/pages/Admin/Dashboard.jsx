import { useState, useEffect, useMemo } from "react";
import api from "@/services/api";
import { Euro, ShoppingBag, Users, Package, TrendingUp, TrendingDown, ArrowRight, Loader2 } from "lucide-react";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, usersRes, productsRes] = await Promise.all([
          api.get("orders"),
          api.get("users"),
          api.get("products?limit=1000") // attempt to get all products
        ]);
        setOrders(ordersRes.data?.data?.orders || ordersRes.data?.orders || []);
        setUsers(usersRes.data?.data?.users || usersRes.data?.data || usersRes.data?.users || []);
        setProducts(productsRes.data?.data?.products || productsRes.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const { STATS, MONTHLY, TOP_PRODUCTS, RECENT_ORDERS } = useMemo(() => {
    // Basic stats
    const totalRevenue = orders.filter(o => o.isPaid).reduce((acc, o) => acc + (o.totalOrderPrice || 0), 0);
    const totalOrders = orders.length;
    const customersCount = users.length;
    const activeProducts = products.length;

    const computedStats = [
      { label: "Total Revenue",  value: `€${totalRevenue.toLocaleString()}`, change: "", up: true,  icon: Euro },
      { label: "Total Orders",   value: totalOrders.toLocaleString(),    change: "",  up: true,  icon: ShoppingBag },
      { label: "Customers",      value: customersCount.toLocaleString(),    change: "",  up: true,  icon: Users },
      { label: "Active Products",value: activeProducts.toLocaleString(),      change: "",  up: false, icon: Package },
    ];

    // Monthly revenue
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyMap = {};
    orders.forEach(o => {
      if (o.isPaid) {
        const d = new Date(o.createdAt);
        const m = monthNames[d.getMonth()];
        monthlyMap[m] = (monthlyMap[m] || 0) + (o.totalOrderPrice || 0);
      }
    });
    // Create last 7 months
    const computedMonthly = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const m = monthNames[d.getMonth()];
      computedMonthly.push({
        month: m,
        value: monthlyMap[m] ? Math.round(monthlyMap[m] / 1000) : 0 // in thousands
      });
    }

    // Top Products
    const prodMap = {};
    orders.forEach(o => {
      if (o.isPaid && o.cartItems) {
        o.cartItems.forEach(item => {
          const pName = item.product?.title || "Unknown Product";
          if (!prodMap[pName]) prodMap[pName] = { sales: 0, revenue: 0 };
          prodMap[pName].sales += item.quantity || 1;
          prodMap[pName].revenue += (item.price || 0) * (item.quantity || 1);
        });
      }
    });
    const sortedProds = Object.entries(prodMap).sort((a, b) => b[1].sales - a[1].sales).slice(0, 4);
    const maxSales = sortedProds[0]?.[1].sales || 1;
    const computedTopProducts = sortedProds.map(([name, data]) => ({
      name,
      sales: data.sales,
      revenue: `€${data.revenue.toLocaleString()}`,
      pct: (data.sales / maxSales) * 100
    }));

    // Recent orders
    const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    const computedRecentOrders = sortedOrders.map(o => ({
      id: `#${o._id?.slice(-6).toUpperCase()}`,
      customer: o.user?.name || "Unknown",
      product: o.cartItems?.[0]?.product?.title || "Product",
      amount: `€${o.totalOrderPrice?.toLocaleString() || 0}`,
      status: o.isDelivered ? "Delivered" : (o.status ? o.status.charAt(0).toUpperCase() + o.status.slice(1) : "Pending"),
      date: new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }));

    return { STATS: computedStats, MONTHLY: computedMonthly, TOP_PRODUCTS: computedTopProducts, RECENT_ORDERS: computedRecentOrders };
  }, [orders, users, products]);

  const maxVal = Math.max(1, ...MONTHLY.map((m) => m.value));
  const STATUS_PILL = {
    Delivered:  "bg-emerald-50 text-emerald-700",
    Shipped:    "bg-sky-50 text-sky-700",
    Processing: "bg-amber-50 text-amber-700",
    Pending:    "bg-neutral-100 text-neutral-500",
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-neutral-400" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-7">
      {/* Header */}
      <div>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 26,
            fontWeight: 300,
            letterSpacing: "0.02em",
            color: "#1a1a1a",
          }}
        >
          Dashboard Overview
        </h1>
        <p className="text-xs text-neutral-400 mt-1 tracking-wide">{new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map(({ label, value, change, up, icon: Icon }) => (
          <div key={label} className="bg-white rounded-xl p-5 border border-black/6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-8 h-8 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center">
                <Icon size={14} className="text-neutral-500" />
              </div>
              {change && (
                <span
                  className={`flex items-center gap-0.5 text-[11px] font-medium ${
                    up ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {change}
                </span>
              )}
            </div>
            <p className="text-[22px] font-semibold text-neutral-900 tracking-tight leading-none">{value}</p>
            <p className="text-[11px] text-neutral-400 mt-1.5 tracking-wide">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Bar chart */}
        <div className="xl:col-span-2 bg-white rounded-xl p-6 border border-black/6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-sm font-semibold text-neutral-900">Revenue</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Last 7 months · € thousands</p>
            </div>
            <span className="text-[10px] text-neutral-300 uppercase tracking-widest">€ K</span>
          </div>
          <div className="flex items-end gap-2.5 h-32">
            {MONTHLY.map(({ month, value }) => {
              const pct = (value / maxVal) * 100;
              const isLatest = month === "Apr";
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-neutral-400 font-medium">{value}</span>
                  <div
                    className="w-full rounded-t-sm transition-all duration-700"
                    style={{
                      height: `${pct}%`,
                      background: isLatest ? "#0c0c0c" : "#e9e9e7",
                    }}
                  />
                  <span className="text-[9px] text-neutral-400">{month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-xl p-6 border border-black/6">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-semibold text-neutral-900">Top Products</p>
            <a
              href="/admin/products"
              className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              View all <ArrowRight size={11} />
            </a>
          </div>
          <div className="space-y-4">
            {TOP_PRODUCTS.length > 0 ? TOP_PRODUCTS.map(({ name, sales, revenue, pct }) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-neutral-700 truncate max-w-[58%]">{name}</span>
                  <span className="text-[11px] text-neutral-400">{revenue}</span>
                </div>
                <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#0c0c0c] transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[10px] text-neutral-300 mt-1">{sales} units</p>
              </div>
            )) : (
              <p className="text-xs text-neutral-400 text-center py-4">No product data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl border border-black/6 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5">
          <p className="text-sm font-semibold text-neutral-900">Recent Orders</p>
          <a
            href="/admin/orders"
            className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            View all <ArrowRight size={11} />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5">
                {["Order", "Customer", "Product", "Amount", "Status", "Date"].map((h, i) => (
                  <th
                    key={h}
                    className={`text-left text-[11px] font-medium text-neutral-400 px-6 py-3 ${
                      i === 2 ? "hidden md:table-cell" : i === 5 ? "hidden sm:table-cell" : ""
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.length > 0 ? RECENT_ORDERS.map((o, i) => (
                <tr
                  key={o.id}
                  className={`hover:bg-neutral-50/80 transition-colors ${
                    i < RECENT_ORDERS.length - 1 ? "border-b border-black/4" : ""
                  }`}
                >
                  <td className="px-6 py-3.5 text-xs font-semibold text-neutral-800">{o.id}</td>
                  <td className="px-6 py-3.5 text-xs text-neutral-700">{o.customer}</td>
                  <td className="px-6 py-3.5 text-xs text-neutral-400 hidden md:table-cell">{o.product}</td>
                  <td className="px-6 py-3.5 text-xs font-semibold text-neutral-900">{o.amount}</td>
                  <td className="px-6 py-3.5">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_PILL[o.status] || STATUS_PILL.Pending}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-[11px] text-neutral-400 hidden sm:table-cell">{o.date}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-xs text-neutral-400">No recent orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
