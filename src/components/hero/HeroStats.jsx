import { useRef } from 'react'
import { useCountUp } from '../../hooks/useCountUp'
import { siteConfig } from '../../config/siteConfig'

// ─── Single stat item ────────────────────────────────────────
function StatItem({ stat }) {
  const decimals = !Number.isInteger(stat.value) ? 1 : 0
  const { count, ref } = useCountUp(stat.value, 2200, decimals)

  return (
    <div
      ref={ref}
      className="flex flex-col gap-1 group"
    >
      {/* Value */}
      <div
        className="flex items-end gap-0.5 leading-none"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        {stat.prefix && (
          <span
            className="text-slate-400 text-lg font-medium mb-0.5"
          >
            {stat.prefix}
          </span>
        )}
        <span
          className="gradient-text font-bold"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          {count}
        </span>
        <span
          className="text-[#00f5ff] font-bold text-xl mb-1"
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <span
        className="text-slate-500 text-xs tracking-widest uppercase"
        style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.15em' }}
      >
        {stat.label}
      </span>

      {/* Bottom border — animates on group hover */}
      <div
        className="h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: 'linear-gradient(90deg, #00f5ff, #a855f7)' }}
      />
    </div>
  )
}

// ─── Stats grid ──────────────────────────────────────────────
export default function HeroStats() {
  const wrapperRef = useRef()

  return (
    <div
      ref={wrapperRef}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-2"
    >
      {/* Divider top */}
      <div
        className="col-span-2 md:col-span-4 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), rgba(0,245,255,0.3), transparent)',
        }}
      />

      {siteConfig.stats.map((stat, i) => (
        <StatItem key={i} stat={stat} />
      ))}

      {/* Divider bottom */}
      <div
        className="col-span-2 md:col-span-4 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), rgba(168,85,247,0.3), transparent)',
        }}
      />
    </div>
  )
}