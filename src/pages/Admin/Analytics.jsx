import { TrendingUp, TrendingDown } from "lucide-react";

const REVENUE = [
  { month: "Oct '25", value: 82000  },
  { month: "Nov '25", value: 95400  },
  { month: "Dec '25", value: 142800 },
  { month: "Jan '26", value: 78200  },
  { month: "Feb '26", value: 110600 },
  { month: "Mar '26", value: 98400  },
  { month: "Apr '26", value: 124590 },
];

const CATEGORIES = [
  { name: "Knitwear",  sales: 312, pct: 100 },
  { name: "Dresses",   sales: 248, pct: 79  },
  { name: "Outerwear", sales: 189, pct: 61  },
  { name: "Footwear",  sales: 156, pct: 50  },
  { name: "Bags",      sales: 124, pct: 40  },
  { name: "Other",     sales: 98,  pct: 31  },
];

const METRICS = [
  { label: "Avg. Order Value",  value: "€412", change: "+6.2%", up: true  },
  { label: "Conversion Rate",   value: "3.8%", change: "+0.4%", up: true  },
  { label: "Return Rate",       value: "4.1%", change: "-0.8%", up: false },
  { label: "Repeat Customers",  value: "62%",  change: "+3.1%", up: true  },
];

const WEEKLY = [
  { day: "Mon", sessions: 1240, orders: 48 },
  { day: "Tue", sessions: 980,  orders: 32 },
  { day: "Wed", sessions: 1560, orders: 61 },
  { day: "Thu", sessions: 1820, orders: 74 },
  { day: "Fri", sessions: 2100, orders: 89 },
  { day: "Sat", sessions: 2480, orders: 102},
  { day: "Sun", sessions: 1890, orders: 76 },
];

function RevenueLineChart({ data }) {
  const W = 560;
  const H = 140;
  const padL = 8, padR = 8, padT = 12, padB = 28;

  const maxVal = Math.max(...data.map((d) => d.value));
  const pts = data.map((d, i) => ({
    x: padL + (i / (data.length - 1)) * (W - padL - padR),
    y: H - padB - ((d.value / maxVal) * (H - padT - padB)),
  }));

  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${H - padB} L ${pts[0].x} ${H - padB} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 140 }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="aGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%"   stopColor="#0c0c0c" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#0c0c0c" stopOpacity="0"    />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = (H - padB) - t * (H - padT - padB);
        return <line key={t} x1={padL} x2={W - padR} y1={y} y2={y} stroke="#f0f0f0" strokeWidth="1" />;
      })}
      <path d={areaPath} fill="url(#aGrad)" />
      <path d={linePath} fill="none" stroke="#0c0c0c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="white" stroke="#0c0c0c" strokeWidth="1.8" />
      ))}
      {data.map((d, i) => (
        <text key={i} x={pts[i].x} y={H - 6} textAnchor="middle" fontSize="8.5" fill="#b0b0b0">
          {d.month}
        </text>
      ))}
    </svg>
  );
}

function WeeklyBars({ data }) {
  const maxSessions = Math.max(...data.map((d) => d.sessions));
  const maxOrders   = Math.max(...data.map((d) => d.orders));

  return (
    <div className="flex items-end gap-2 h-28">
      {data.map(({ day, sessions, orders }) => {
        const sPct = (sessions / maxSessions) * 100;
        const oPct = (orders / maxOrders) * 100;
        return (
          <div key={day} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex gap-0.5 items-end" style={{ height: 90 }}>
              <div
                className="flex-1 rounded-t-sm bg-neutral-200"
                style={{ height: `${sPct}%` }}
              />
              <div
                className="flex-1 rounded-t-sm bg-[#0c0c0c]"
                style={{ height: `${oPct}%` }}
              />
            </div>
            <span className="text-[9px] text-neutral-400">{day}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function Analytics() {
  return (
    <div className="space-y-6">
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
          Analytics
        </h1>
        <p className="text-xs text-neutral-400 mt-1">Apr 1 – Apr 16, 2026</p>
      </div>

      {/* KPI metrics */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {METRICS.map(({ label, value, change, up }) => (
          <div key={label} className="bg-white rounded-xl p-5 border border-black/6">
            <p className="text-[22px] font-semibold text-neutral-900 leading-none">{value}</p>
            <p className="text-[11px] text-neutral-400 mt-2">{label}</p>
            <span
              className={`flex items-center gap-0.5 text-[11px] font-medium mt-2 ${
                up ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {change} vs last month
            </span>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-xl p-6 border border-black/6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm font-semibold text-neutral-900">Revenue Trend</p>
            <p className="text-[11px] text-neutral-400 mt-0.5">Monthly revenue · Oct 2025 – Apr 2026</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-neutral-900">€124,590</p>
            <p className="text-[10px] text-emerald-600 font-medium">+12.4% this month</p>
          </div>
        </div>
        <RevenueLineChart data={REVENUE} />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Category breakdown */}
        <div className="bg-white rounded-xl p-6 border border-black/6">
          <p className="text-sm font-semibold text-neutral-900 mb-5">Sales by Category</p>
          <div className="space-y-3.5">
            {CATEGORIES.map(({ name, sales, pct }) => (
              <div key={name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-neutral-700">{name}</span>
                  <span className="text-[11px] text-neutral-400">{sales} units</span>
                </div>
                <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#0c0c0c] transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly sessions vs orders */}
        <div className="bg-white rounded-xl p-6 border border-black/6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="text-sm font-semibold text-neutral-900">Weekly Activity</p>
              <p className="text-[11px] text-neutral-400 mt-0.5">Sessions vs Orders · Apr 7–13</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[10px] text-neutral-500">
                <span className="w-2 h-2 rounded-sm bg-neutral-200 inline-block" /> Sessions
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-neutral-500">
                <span className="w-2 h-2 rounded-sm bg-[#0c0c0c] inline-block" /> Orders
              </span>
            </div>
          </div>
          <WeeklyBars data={WEEKLY} />
        </div>
      </div>
    </div>
  );
}
