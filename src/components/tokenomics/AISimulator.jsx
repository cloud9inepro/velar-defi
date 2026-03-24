import { useState, useMemo } from 'react'

// ─── Simulation engine ───────────────────────────────────────
function simulate(circulatingPct, stakingRatio, initialPrice) {
  const totalSupply = 1_000_000_000
  const circulating = totalSupply * (circulatingPct / 100)
  const staked = circulating * (stakingRatio / 100)
  const liquid = circulating - staked

  // Price pressure — less liquid supply = higher price pressure
  const scarcityMultiplier = 1 + (stakingRatio / 100) * 0.8
  const circulationPressure = 1 - (circulatingPct / 100) * 0.4
  const estimatedPrice = initialPrice * scarcityMultiplier * circulationPressure

  // Inflation rate — staking rewards emission
  const annualEmission = totalSupply * 0.05 // 5% annual staking emission
  const inflationRate = (annualEmission / circulating) * 100

  // Staking APY — based on staking ratio
  // Lower staking ratio = higher APY (more rewards per staker)
  const baseRewardPool = totalSupply * 0.20 * 0.25 // 25% of staking allocation per year
  const apyFromStaking =
    stakingRatio > 0 ? (baseRewardPool / staked) * 100 : 0

  // Market cap
  const marketCap = liquid * estimatedPrice

  // Sell pressure score (0-100, lower is better)
  const sellPressure = Math.max(
    0,
    Math.min(100, (circulatingPct / 100) * 60 - (stakingRatio / 100) * 40)
  )

  // Health score
  const healthScore = Math.round(
    Math.min(
      100,
      (stakingRatio / 100) * 40 +
        (1 - circulatingPct / 100) * 30 +
        Math.min(apyFromStaking / 2, 30)
    )
  )

  return {
    circulating: Math.round(circulating).toLocaleString(),
    staked: Math.round(staked).toLocaleString(),
    liquid: Math.round(liquid).toLocaleString(),
    estimatedPrice: estimatedPrice.toFixed(4),
    inflationRate: inflationRate.toFixed(2),
    apyFromStaking: Math.min(apyFromStaking, 999).toFixed(1),
    marketCap:
      marketCap >= 1_000_000_000
        ? `$${(marketCap / 1_000_000_000).toFixed(2)}B`
        : `$${(marketCap / 1_000_000).toFixed(2)}M`,
    sellPressure: Math.round(sellPressure),
    healthScore,
  }
}

// ─── Health meter component ──────────────────────────────────
function HealthMeter({ score }) {
  const color =
    score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ec4899'
  const label =
    score >= 70 ? 'Healthy' : score >= 40 ? 'Moderate' : 'At Risk'

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-bold tracking-widest uppercase text-slate-400"
          style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.2em' }}
        >
          Token Health Score
        </span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            color,
            background: `${color}22`,
            border: `1px solid ${color}44`,
          }}
        >
          {label}
        </span>
      </div>
      <div
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${score}%`,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 8px ${color}88`,
          }}
        />
      </div>
      <div className="flex justify-between">
        <span
          className="text-xs text-slate-600"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          0
        </span>
        <span
          className="text-sm font-black"
          style={{ fontFamily: 'Syne, sans-serif', color }}
        >
          {score}/100
        </span>
        <span
          className="text-xs text-slate-600"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          100
        </span>
      </div>
    </div>
  )
}

// ─── Stat card ───────────────────────────────────────────────
function StatCard({ label, value, sub, color = '#00f5ff' }) {
  return (
    <div
      className="flex flex-col gap-1 p-4 rounded-xl"
      style={{
        background: `${color}08`,
        border: `1px solid ${color}22`,
      }}
    >
      <span
        className="text-xs text-slate-500 tracking-wider uppercase"
        style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.15em' }}
      >
        {label}
      </span>
      <span
        className="font-black text-lg leading-none"
        style={{
          fontFamily: 'Syne, sans-serif',
          color,
          textShadow: `0 0 20px ${color}66`,
        }}
      >
        {value}
      </span>
      {sub && (
        <span
          className="text-xs text-slate-600"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          {sub}
        </span>
      )}
    </div>
  )
}

export default function AISimulator() {
  const [circulating, setCirculating] = useState(40)
  const [staking, setStaking] = useState(25)
  const [initialPrice, setInitialPrice] = useState(0.1)

  const results = useMemo(
    () => simulate(circulating, staking, initialPrice),
    [circulating, staking, initialPrice]
  )

  const pressureColor =
    results.sellPressure <= 30
      ? '#10b981'
      : results.sellPressure <= 60
      ? '#f59e0b'
      : '#ec4899'

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: '1px solid rgba(0,245,255,0.15)',
        boxShadow: '0 0 60px rgba(0,245,255,0.05)',
      }}
    >
      {/* ─── Header ─────────────────────────────────── */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{
          background: 'rgba(0,245,255,0.05)',
          borderBottom: '1px solid rgba(0,245,255,0.1)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: '#00f5ff',
              boxShadow: '0 0 8px #00f5ff',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          />
          <span
            className="text-white font-bold text-sm tracking-wider"
            style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.15em' }}
          >
            AI Token Economy Simulator
          </span>
        </div>
        <span
          className="text-xs px-3 py-1 rounded-full font-bold"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            background: 'rgba(0,245,255,0.1)',
            border: '1px solid rgba(0,245,255,0.2)',
            color: '#00f5ff',
            letterSpacing: '0.1em',
          }}
        >
          LIVE SIM
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

        {/* ─── Inputs ───────────────────────────────── */}
        <div
          className="p-6 flex flex-col gap-6"
          style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
        >

          {/* Circulating supply */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label
                className="text-xs font-bold tracking-widest uppercase text-slate-400"
                style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.2em' }}
              >
                Circulating Supply
              </label>
              <span
                className="text-[#00f5ff] font-black text-sm"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {circulating}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={circulating}
              onChange={(e) => setCirculating(Number(e.target.value))}
              className="w-full h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(90deg, #00f5ff ${((circulating - 10) / 90) * 100}%, rgba(255,255,255,0.1) ${((circulating - 10) / 90) * 100}%)`,
              }}
            />
            <div className="flex justify-between">
              <span className="text-xs text-slate-600" style={{ fontFamily: 'Rajdhani, sans-serif' }}>10%</span>
              <span className="text-xs text-slate-600" style={{ fontFamily: 'Rajdhani, sans-serif' }}>100%</span>
            </div>
          </div>

          {/* Staking ratio */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label
                className="text-xs font-bold tracking-widest uppercase text-slate-400"
                style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.2em' }}
              >
                Staking Ratio
              </label>
              <span
                className="font-black text-sm"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  color: staking >= 20 && staking <= 30 ? '#10b981' : '#f59e0b',
                }}
              >
                {staking}%
                {staking >= 20 && staking <= 30 && (
                  <span className="text-xs ml-1 text-[#10b981]">✓ Optimal</span>
                )}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="1"
              value={staking}
              onChange={(e) => setStaking(Number(e.target.value))}
              className="w-full h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(90deg, #a855f7 ${(staking / 80) * 100}%, rgba(255,255,255,0.1) ${(staking / 80) * 100}%)`,
              }}
            />
            <div className="flex justify-between">
              <span className="text-xs text-slate-600" style={{ fontFamily: 'Rajdhani, sans-serif' }}>0%</span>
              <span className="text-xs text-[#10b981]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>20-30% optimal</span>
              <span className="text-xs text-slate-600" style={{ fontFamily: 'Rajdhani, sans-serif' }}>80%</span>
            </div>
          </div>

          {/* Initial token price */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label
                className="text-xs font-bold tracking-widest uppercase text-slate-400"
                style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.2em' }}
              >
                Initial Token Price
              </label>
              <div
                className="flex items-center gap-1 px-3 py-1 rounded-lg"
                style={{
                  background: 'rgba(168,85,247,0.08)',
                  border: '1px solid rgba(168,85,247,0.2)',
                }}
              >
                <span
                  className="text-[#a855f7] text-xs font-bold"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  $
                </span>
                <input
                  type="number"
                  min="0.001"
                  max="100"
                  step="0.001"
                  value={initialPrice}
                  onChange={(e) => setInitialPrice(Number(e.target.value))}
                  className="bg-transparent text-[#a855f7] font-bold text-sm w-16 outline-none"
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                />
              </div>
            </div>
          </div>

          {/* Sell pressure meter */}
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-bold tracking-widest uppercase text-slate-400"
                style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.2em' }}
              >
                Sell Pressure
              </span>
              <span
                className="text-xs font-bold"
                style={{ fontFamily: 'Rajdhani, sans-serif', color: pressureColor }}
              >
                {results.sellPressure <= 30
                  ? 'LOW'
                  : results.sellPressure <= 60
                  ? 'MODERATE'
                  : 'HIGH'}
              </span>
            </div>
            <div
              className="w-full h-2 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${results.sellPressure}%`,
                  background: `linear-gradient(90deg, #10b981, ${pressureColor})`,
                }}
              />
            </div>
          </div>
        </div>

        {/* ─── Outputs ──────────────────────────────── */}
        <div className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Est. Token Price"
              value={`$${results.estimatedPrice}`}
              sub="Based on supply/demand"
              color="#00f5ff"
            />
            <StatCard
              label="Market Cap"
              value={results.marketCap}
              sub="Liquid supply × price"
              color="#a855f7"
            />
            <StatCard
              label="Staking APY"
              value={`${results.apyFromStaking}%`}
              sub="Annual reward rate"
              color="#ec4899"
            />
            <StatCard
              label="Inflation Rate"
              value={`${results.inflationRate}%`}
              sub="Annual token emission"
              color="#f59e0b"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div
              className="flex flex-col gap-1 p-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                className="text-xs text-slate-500"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em' }}
              >
                CIRCULATING
              </span>
              <span
                className="text-white font-bold text-xs"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {results.circulating}
              </span>
            </div>
            <div
              className="flex flex-col gap-1 p-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                className="text-xs text-slate-500"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em' }}
              >
                STAKED
              </span>
              <span
                className="text-[#a855f7] font-bold text-xs"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {results.staked}
              </span>
            </div>
            <div
              className="flex flex-col gap-1 p-3 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                className="text-xs text-slate-500"
                style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.65rem', letterSpacing: '0.1em' }}
              >
                LIQUID
              </span>
              <span
                className="text-[#00f5ff] font-bold text-xs"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {results.liquid}
              </span>
            </div>
          </div>

          {/* Health score */}
          <HealthMeter score={results.healthScore} />
        </div>
      </div>
    </div>
  )
}