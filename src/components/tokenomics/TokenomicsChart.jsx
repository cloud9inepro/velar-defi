import { useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const distribution = [
  {
    label: 'Public Sale',
    percentage: 35,
    color: '#00f5ff',
    tokens: '350,000,000',
    vesting: 'No lock — immediate',
  },
  {
    label: 'Staking Rewards',
    percentage: 20,
    color: '#a855f7',
    tokens: '200,000,000',
    vesting: 'Released over 4 years',
  },
  {
    label: 'Ecosystem Fund',
    percentage: 15,
    color: '#ec4899',
    tokens: '150,000,000',
    vesting: '6 month cliff, 2 year vest',
  },
  {
    label: 'Treasury',
    percentage: 15,
    color: '#f59e0b',
    tokens: '150,000,000',
    vesting: '12 month cliff, 3 year vest',
  },
  {
    label: 'Team & Advisors',
    percentage: 10,
    color: '#10b981',
    tokens: '100,000,000',
    vesting: '12 month cliff, 4 year vest',
  },
  {
    label: 'Liquidity Bootstrap',
    percentage: 5,
    color: '#6366f1',
    tokens: '50,000,000',
    vesting: 'No lock — DEX liquidity',
  },
]

// ─── Custom tooltip ──────────────────────────────────────────
function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null
  const data = payload[0].payload

  return (
    <div
      className="px-4 py-3 rounded-xl text-sm"
      style={{
        background: 'rgba(10,1,24,0.98)',
        border: `1px solid ${data.color}44`,
        boxShadow: `0 0 20px ${data.color}22`,
        fontFamily: 'Rajdhani, sans-serif',
      }}
    >
      <p
        className="font-bold text-base mb-1"
        style={{ color: data.color }}
      >
        {data.label}
      </p>
      <p className="text-slate-400 text-xs">{data.percentage}% · {data.tokens} VLR</p>
      <p className="text-slate-500 text-xs mt-1">{data.vesting}</p>
    </div>
  )
}

// ─── Custom active shape ─────────────────────────────────────
function ActiveShape(props) {
  const {
    cx, cy, innerRadius, outerRadius,
    startAngle, endAngle, fill,
  } = props

  const { Arc } = require('recharts')

  return (
    <g>
      <circle cx={cx} cy={cy} r={outerRadius + 6} fill="none" stroke={fill} strokeWidth={1} strokeOpacity={0.3} />
    </g>
  )
}

export { distribution }

export default function TokenomicsChart() {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <div className="flex flex-col lg:flex-row gap-10 items-center">

      {/* ─── Donut chart ──────────────────────────────── */}
      <div className="relative w-72 h-72 md:w-80 md:h-80 flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={distribution}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={3}
              dataKey="percentage"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              animationBegin={0}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {distribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.3}
                  stroke="transparent"
                  style={{
                    filter:
                      activeIndex === index
                        ? `drop-shadow(0 0 8px ${entry.color})`
                        : 'none',
                    cursor: 'pointer',
                    transition: 'opacity 0.3s ease',
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* ─── Center text ────────────────────────── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {activeIndex !== null ? (
            <>
              <span
                className="font-black text-2xl"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  color: distribution[activeIndex].color,
                  textShadow: `0 0 20px ${distribution[activeIndex].color}88`,
                }}
              >
                {distribution[activeIndex].percentage}%
              </span>
              <span
                className="text-slate-400 text-xs text-center px-4 mt-1"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                {distribution[activeIndex].label}
              </span>
            </>
          ) : (
            <>
              <span
                className="font-black text-2xl gradient-text"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                1B
              </span>
              <span
                className="text-slate-500 text-xs mt-1"
                style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}
              >
                TOTAL SUPPLY
              </span>
            </>
          )}
        </div>
      </div>

      {/* ─── Distribution list ────────────────────────── */}
      <div className="flex flex-col gap-4 w-full">
        {distribution.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-1.5 group cursor-pointer"
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {/* Label row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300"
                  style={{
                    background: item.color,
                    boxShadow:
                      activeIndex === i ? `0 0 8px ${item.color}` : 'none',
                  }}
                />
                <span
                  className="text-sm font-bold transition-colors duration-200"
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    color: activeIndex === i ? item.color : 'rgba(226,232,240,0.8)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-xs text-slate-500"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {item.tokens} VLR
                </span>
                <span
                  className="text-sm font-black w-10 text-right"
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    color: item.color,
                  }}
                >
                  {item.percentage}%
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="w-full h-1 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${item.percentage * (100 / 35)}%`,
                  background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
                  boxShadow:
                    activeIndex === i ? `0 0 8px ${item.color}` : 'none',
                }}
              />
            </div>

            {/* Vesting tag */}
            <span
              className="text-xs text-slate-600"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}
            >
              {item.vesting}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}