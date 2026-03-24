import { useState } from 'react'

const lockPeriods = [
  { label: '30D', days: 30 },
  { label: '60D', days: 60 },
  { label: '90D', days: 90 },
  { label: '180D', days: 180 },
  { label: '365D', days: 365 },
]

const compoundOptions = ['Daily', 'Weekly', 'Monthly']

const riskProfiles = {
  Conservative: { apy: 24, color: '#00f5ff' },
  Balanced: { apy: 58, color: '#a855f7' },
  Aggressive: { apy: 94, color: '#ec4899' },
}

export default function CalculatorInput({ values, onChange }) {
  const { amount, lockPeriod, compound, risk } = values

  return (
    <div className="flex flex-col gap-7">

      {/* ─── Stake Amount ─────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label
            className="text-xs font-bold tracking-widest uppercase text-slate-400"
            style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.2em' }}
          >
            Stake Amount
          </label>
          <div
            className="flex items-center gap-1 px-3 py-1 rounded-lg"
            style={{
              background: 'rgba(0,245,255,0.08)',
              border: '1px solid rgba(0,245,255,0.2)',
            }}
          >
            <span className="text-[#00f5ff] text-xs font-bold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              $
            </span>
            <input
              type="number"
              min="0"
              max="1000000"
              value={amount}
              onChange={(e) => onChange({ ...values, amount: Number(e.target.value) })}
              className="bg-transparent text-[#00f5ff] font-bold text-sm w-24 outline-none"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            />
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          <input
            type="range"
            min="100"
            max="100000"
            step="100"
            value={amount}
            onChange={(e) => onChange({ ...values, amount: Number(e.target.value) })}
            className="w-full h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(90deg, #00f5ff ${(amount / 100000) * 100}%, rgba(255,255,255,0.1) ${(amount / 100000) * 100}%)`,
            }}
          />
          {/* Tick labels */}
          <div className="flex justify-between mt-2">
            {['$100', '$25K', '$50K', '$75K', '$100K'].map((v) => (
              <span
                key={v}
                className="text-slate-600 text-xs"
                style={{ fontFamily: 'Rajdhani, sans-serif' }}
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Lock Period ──────────────────────────────── */}
      <div className="flex flex-col gap-3">
        <label
          className="text-xs font-bold tracking-widest uppercase text-slate-400"
          style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.2em' }}
        >
          Lock Period
        </label>
        <div className="flex gap-2 flex-wrap">
          {lockPeriods.map((p) => (
            <button
              key={p.days}
              data-cursor-hover
              onClick={() => onChange({ ...values, lockPeriod: p.days })}
              className="px-4 py-2 rounded-lg text-xs font-bold tracking-wider transition-all duration-200"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                letterSpacing: '0.1em',
                background:
                  lockPeriod === p.days
                    ? 'linear-gradient(135deg, #00f5ff22, #a855f722)'
                    : 'rgba(255,255,255,0.04)',
                border:
                  lockPeriod === p.days
                    ? '1px solid rgba(0,245,255,0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
                color: lockPeriod === p.days ? '#00f5ff' : 'rgba(148,163,184,0.7)',
                boxShadow:
                  lockPeriod === p.days
                    ? '0 0 12px rgba(0,245,255,0.15)'
                    : 'none',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Compound Frequency ───────────────────────── */}
      <div className="flex flex-col gap-3">
        <label
          className="text-xs font-bold tracking-widest uppercase text-slate-400"
          style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.2em' }}
        >
          Compound Frequency
        </label>
        <div className="flex gap-2">
          {compoundOptions.map((opt) => (
            <button
              key={opt}
              data-cursor-hover
              onClick={() => onChange({ ...values, compound: opt })}
              className="flex-1 py-2 rounded-lg text-xs font-bold tracking-wider transition-all duration-200"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                letterSpacing: '0.1em',
                background:
                  compound === opt
                    ? 'linear-gradient(135deg, #a855f722, #ec489922)'
                    : 'rgba(255,255,255,0.04)',
                border:
                  compound === opt
                    ? '1px solid rgba(168,85,247,0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
                color: compound === opt ? '#a855f7' : 'rgba(148,163,184,0.7)',
                boxShadow:
                  compound === opt
                    ? '0 0 12px rgba(168,85,247,0.15)'
                    : 'none',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Risk Tolerance ───────────────────────────── */}
      <div className="flex flex-col gap-3">
        <label
          className="text-xs font-bold tracking-widest uppercase text-slate-400"
          style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.2em' }}
        >
          Risk Tolerance
        </label>
        <div className="flex flex-col gap-2">
          {Object.entries(riskProfiles).map(([name, profile]) => (
            <button
              key={name}
              data-cursor-hover
              onClick={() => onChange({ ...values, risk: name })}
              className="flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200"
              style={{
                background:
                  risk === name
                    ? `${profile.color}12`
                    : 'rgba(255,255,255,0.03)',
                border:
                  risk === name
                    ? `1px solid ${profile.color}44`
                    : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center gap-3">
                {/* Radio dot */}
                <div
                  className="w-3 h-3 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                  style={{
                    borderColor: risk === name ? profile.color : 'rgba(148,163,184,0.3)',
                  }}
                >
                  {risk === name && (
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: profile.color }}
                    />
                  )}
                </div>
                <span
                  className="text-sm font-bold"
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    color: risk === name ? profile.color : 'rgba(148,163,184,0.7)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {name}
                </span>
              </div>
              <span
                className="text-xs font-bold tracking-wider"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  color: risk === name ? profile.color : 'rgba(100,116,139,0.5)',
                }}
              >
                {profile.apy}% APY
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export { riskProfiles, lockPeriods }