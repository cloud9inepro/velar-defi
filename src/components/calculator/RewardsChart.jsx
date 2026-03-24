import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

// ─── Custom tooltip ──────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null

  return (
    <div
      className="px-4 py-3 rounded-xl text-sm"
      style={{
        background: 'rgba(10,1,24,0.95)',
        border: '1px solid rgba(0,245,255,0.2)',
        boxShadow: '0 0 20px rgba(0,245,255,0.1)',
        fontFamily: 'Rajdhani, sans-serif',
      }}
    >
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className="text-[#00f5ff] font-bold">
        ${Number(payload[0].value).toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </p>
    </div>
  )
}

export default function RewardsChart({ data }) {
  if (!data || data.length === 0) return null

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="rewardGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00f5ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="rewardStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />

          <XAxis
            dataKey="label"
            tick={{
              fill: 'rgba(148,163,184,0.6)',
              fontSize: 11,
              fontFamily: 'Rajdhani, sans-serif',
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fill: 'rgba(148,163,184,0.6)',
              fontSize: 11,
              fontFamily: 'Rajdhani, sans-serif',
            }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v}`}
            width={50}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="value"
            stroke="url(#rewardStroke)"
            strokeWidth={2}
            fill="url(#rewardGradient)"
            dot={false}
            activeDot={{
              r: 4,
              fill: '#00f5ff',
              stroke: 'rgba(0,245,255,0.3)',
              strokeWidth: 6,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}