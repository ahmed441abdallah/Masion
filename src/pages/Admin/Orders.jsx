import { useState, useEffect, useMemo } from "react";
import { Search, Download, Eye, Check, Loader2, Edit2, X } from "lucide-react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getUserOrders, updateOrderStatus } from "@/store/actions/orderActions";

const TABS = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Refunded"];

const STATUS_STYLES = {
  Delivered:  "bg-emerald-50 text-emerald-700",
  Shipped:    "bg-sky-50 text-sky-700",
  Processing: "bg-amber-50 text-amber-700",
  Pending:    "bg-neutral-100 text-neutral-500",
  Cancelled:  "bg-red-50 text-red-600",
  Refunded:   "bg-violet-50 text-violet-600",
  pending:    "bg-neutral-100 text-neutral-500", // Fallback for lowercase
};

export default function Orders() {
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({});
  
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.order, shallowEqual);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const handleEditClick = (order) => {
    setEditingOrder(order);
    setFormData({
      paymentMethod: order.rawOrder?.paymentMethod || "cash",
      paymentStatus: order.rawOrder?.paymentStatus || "pending",
      status: order.rawOrder?.status || "pending",
      isPaid: order.rawOrder?.isPaid || false,
      isDelivered: order.rawOrder?.isDelivered || false,
    });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setUpdatingOrderId(editingOrder.originalId);
    await dispatch(updateOrderStatus(editingOrder.originalId, formData));
    setUpdatingOrderId(null);
    setEditingOrder(null);
  };

  // Memoize formatted orders so it only recomputes when `orders` changes
  const formattedOrders = useMemo(() => (orders || []).map(o => ({
    id: `#${o._id?.slice(-6).toUpperCase()}`,
    originalId: o._id,
    customer: o.user?.name || "Unknown",
    email: o.user?.email || "No Email",
    product: o.cartItems?.[0]?.product?.title || "Product",
    items: o.cartItems?.length || 0,
    amount: `$${o.totalOrderPrice?.toLocaleString() || 0}`,
    status: o.isDelivered ? "Delivered" : (o.status ? o.status.charAt(0).toUpperCase() + o.status.slice(1) : "Pending"),
    date: new Date(o.createdAt).toLocaleDateString(),
    rawOrder: o, // keep original for Edit Modal pre-population
  })), [orders]);

  // Memoize tab counts
  const counts = useMemo(() => TABS.reduce((acc, t) => {
    acc[t] = t === "All" ? formattedOrders.length : formattedOrders.filter(o => o.status === t).length;
    return acc;
  }, {}), [formattedOrders]);

  // Memoize filtered list — only recomputes when tab, search, or orders change
  const filtered = useMemo(() => formattedOrders.filter(o => {
    const matchTab = tab === "All" || o.status === tab;
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  }), [formattedOrders, tab, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[26px] font-light tracking-[0.02em] text-[#1a1a1a]">
            Orders
          </h1>
          <p className="text-xs text-neutral-400 mt-1">{formattedOrders.length} orders total</p>
        </div>
        <button className="flex items-center gap-2 border border-neutral-200 text-neutral-600 text-xs px-4 py-2.5 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
          <Download size={13} />
          Export CSV
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-1.5 text-[11px] px-3 py-2 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              tab === t
                ? "bg-[#0c0c0c] text-white"
                : "bg-white border border-neutral-200 text-neutral-500 hover:border-neutral-400"
            }`}
          >
            {t}
            {counts[t] > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                  tab === t ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {counts[t]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-black/6 overflow-hidden">
        {/* Search */}
        <div className="px-6 py-4 border-b border-black/5">
          <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 max-w-sm">
            <Search size={13} className="text-neutral-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer or order ID…"
              className="bg-transparent text-xs outline-none placeholder:text-neutral-400 w-full"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-black/5">
                {["Order ID", "Customer", "Product", "Amount", "Status", "Date", ""].map((h, i) => (
                  <th
                    key={i}
                    className={`text-left text-[11px] font-medium text-neutral-400 px-6 py-3.5 ${
                      i === 2 ? "hidden lg:table-cell" : i === 5 ? "hidden sm:table-cell" : i === 6 ? "text-right" : ""
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="7" className="py-14 text-center text-sm text-neutral-400">Loading orders...</td>
                </tr>
              )}
              {!isLoading && filtered.map((o, i) => (
                <tr
                  key={o.originalId}
                  className={`group hover:bg-neutral-50/70 transition-colors ${
                    i < filtered.length - 1 ? "border-b border-black/4" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-xs font-semibold text-neutral-800">{o.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-neutral-800">{o.customer}</p>
                    <p className="text-[10px] text-neutral-400">{o.email}</p>
                  </td>
                  <td className="px-6 py-4 text-xs text-neutral-500 hidden lg:table-cell">
                    {o.product}
                    {o.items > 1 && (
                      <span className="text-neutral-300 ml-1">+{o.items - 1}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-neutral-900">{o.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[o.status] || STATUS_STYLES.Pending}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[11px] text-neutral-400 hidden sm:table-cell">{o.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditClick(o)}
                        className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
                        title="Edit Order Status"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer" title="View details">
                        <Eye size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!isLoading && filtered.length === 0 && (
            <div className="py-14 text-center text-sm text-neutral-400">No orders found</div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-black/5 flex items-center justify-between">
          <p className="text-[11px] text-neutral-400">
            Showing {filtered.length} of {formattedOrders.length}
          </p>
          <div className="flex gap-1">
            {[1].map((n) => (
              <button
                key={n}
                className={`w-7 h-7 rounded-lg text-[11px] transition-all cursor-pointer ${
                  n === 1 ? "bg-[#0c0c0c] text-white" : "text-neutral-500 hover:bg-neutral-100"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Edit Order Modal ── */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div>
                <h3 className="font-serif text-xl font-light text-neutral-900">Edit Order</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{editingOrder.id} • {editingOrder.customer}</p>
              </div>
              <button 
                onClick={() => setEditingOrder(null)}
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            <form onSubmit={handleModalSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Payment Method</label>
                  <select 
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    className="w-full text-sm border border-neutral-200 rounded-lg px-3 py-2 bg-neutral-50 outline-none focus:border-neutral-400"
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Payment Status</label>
                  <select 
                    value={formData.paymentStatus}
                    onChange={(e) => setFormData({...formData, paymentStatus: e.target.value})}
                    className="w-full text-sm border border-neutral-200 rounded-lg px-3 py-2 bg-neutral-50 outline-none focus:border-neutral-400"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Order Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full text-sm border border-neutral-200 rounded-lg px-3 py-2 bg-neutral-50 outline-none focus:border-neutral-400"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 border border-neutral-100 rounded-lg bg-neutral-50 mt-2">
                <label className="text-sm font-medium text-neutral-700 cursor-pointer flex-1" htmlFor="isPaidToggle">
                  Is Paid
                </label>
                <input 
                  type="checkbox" 
                  id="isPaidToggle"
                  checked={formData.isPaid}
                  onChange={(e) => setFormData({...formData, isPaid: e.target.checked})}
                  className="w-4 h-4 cursor-pointer accent-[#1a1a1a]"
                />
              </div>

              <div className="flex items-center justify-between p-3 border border-neutral-100 rounded-lg bg-neutral-50">
                <label className="text-sm font-medium text-neutral-700 cursor-pointer flex-1" htmlFor="isDeliveredToggle">
                  Is Delivered
                </label>
                <input 
                  type="checkbox" 
                  id="isDeliveredToggle"
                  checked={formData.isDelivered}
                  onChange={(e) => setFormData({...formData, isDelivered: e.target.checked})}
                  className="w-4 h-4 cursor-pointer accent-[#1a1a1a]"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setEditingOrder(null)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={updatingOrderId === editingOrder.originalId}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-[#1a1a1a] text-white text-sm font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {updatingOrderId === editingOrder.originalId && <Loader2 size={14} className="animate-spin" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
