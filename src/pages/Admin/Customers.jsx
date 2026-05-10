import { useState, useEffect, useMemo } from "react";
import { Search, UserPlus, Mail, Loader2 } from "lucide-react";
import api from "@/services/api";

const TIER_STYLES = {
  VIP:     "bg-[#c9a96e]/10 text-[#c9a96e]",
  Regular: "bg-sky-50 text-sky-600",
  New:     "bg-emerald-50 text-emerald-600",
};

export default function Customers() {
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("All");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, ordersRes] = await Promise.all([
          api.get("users"),
          api.get("orders")
        ]);
        setUsers(usersRes.data?.data?.users || usersRes.data?.data || usersRes.data?.users || []);
        setOrders(ordersRes.data?.data?.orders || ordersRes.data?.orders || []);
      } catch (err) {
        console.error("Failed to fetch customers data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const CUSTOMERS = useMemo(() => {
    return users.map(user => {
      const userOrders = orders.filter(o => o.user?._id === user._id || o.user === user._id);
      const spent = userOrders.filter(o => o.isPaid).reduce((acc, o) => acc + (o.totalOrderPrice || 0), 0);
      const ordersCount = userOrders.length;
      
      let computedTier = "New";
      if (spent >= 3000 || ordersCount >= 8) {
        computedTier = "VIP";
      } else if (ordersCount >= 3 || spent >= 500) {
        computedTier = "Regular";
      }

      return {
        id: user._id?.slice(-6).toUpperCase() || "UNKNOWN",
        name: user.name || "Unknown",
        email: user.email || "No Email",
        orders: ordersCount,
        spent: `€${spent.toLocaleString()}`,
        joined: new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        tier: computedTier,
        avatar: (user.name || "U").substring(0, 2).toUpperCase()
      };
    });
  }, [users, orders]);

  const filtered = CUSTOMERS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchTier = tier === "All" || c.tier === tier;
    return matchSearch && matchTier;
  });

  const vipCount     = CUSTOMERS.filter((c) => c.tier === "VIP").length;
  const regularCount = CUSTOMERS.filter((c) => c.tier === "Regular").length;
  const newCount     = CUSTOMERS.filter((c) => c.tier === "New").length;

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-neutral-400" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
            Customers
          </h1>
          <p className="text-xs text-neutral-400 mt-1">{CUSTOMERS.length} registered customers</p>
        </div>
        <button className="flex items-center gap-2 bg-[#0c0c0c] text-white text-xs px-4 py-2.5 rounded-lg hover:bg-neutral-800 transition-colors">
          <UserPlus size={13} />
          Add Customer
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "VIP Members",      value: vipCount,     color: "text-[#c9a96e]",  bg: "bg-[#c9a96e]/8" },
          { label: "Regular",          value: regularCount, color: "text-sky-600",    bg: "bg-sky-50"      },
          { label: "New This Month",   value: newCount,     color: "text-emerald-600",bg: "bg-emerald-50"  },
        ].map(({ label, value, color, bg }) => (
          <div key={label} className="bg-white rounded-xl p-4 border border-black/6">
            <p className={`text-2xl font-semibold ${color}`}>{value}</p>
            <p className="text-[11px] text-neutral-400 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-black/6 overflow-hidden">
        {/* Search + filter */}
        <div className="px-6 py-4 border-b border-black/5 flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 flex-1 max-w-sm">
            <Search size={13} className="text-neutral-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers…"
              className="bg-transparent text-xs outline-none placeholder:text-neutral-400 w-full"
            />
          </div>
          <div className="flex gap-1.5">
            {["All", "VIP", "Regular", "New"].map((t) => (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`text-[11px] px-3 py-2 rounded-lg border transition-all ${
                  tier === t
                    ? "bg-[#0c0c0c] text-white border-[#0c0c0c]"
                    : "border-neutral-200 text-neutral-500 hover:border-neutral-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5">
                {["Customer", "Orders", "Total Spent", "Joined", "Tier", ""].map((h, i) => (
                  <th
                    key={i}
                    className={`text-left text-[11px] font-medium text-neutral-400 px-6 py-3.5 ${
                      i === 1 ? "hidden sm:table-cell" : i === 3 ? "hidden md:table-cell" : i === 5 ? "text-right" : ""
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={c.id}
                  className={`group hover:bg-neutral-50/70 transition-colors ${
                    i < filtered.length - 1 ? "border-b border-black/4" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-[11px] font-semibold text-neutral-500 shrink-0">
                        {c.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{c.name}</p>
                        <p className="text-[10px] text-neutral-400">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700 hidden sm:table-cell">{c.orders}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-neutral-900">{c.spent}</td>
                  <td className="px-6 py-4 text-xs text-neutral-400 hidden md:table-cell">{c.joined}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${TIER_STYLES[c.tier]}`}>
                      {c.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors opacity-0 group-hover:opacity-100">
                      <Mail size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-14 text-center text-sm text-neutral-400">No customers found</div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-black/5 flex items-center justify-between">
          <p className="text-[11px] text-neutral-400">
            Showing {filtered.length} of {CUSTOMERS.length}
          </p>
          <div className="flex gap-1">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`w-7 h-7 rounded-lg text-[11px] transition-all ${
                  n === 1 ? "bg-[#0c0c0c] text-white" : "text-neutral-500 hover:bg-neutral-100"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
