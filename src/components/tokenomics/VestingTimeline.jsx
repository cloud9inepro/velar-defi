import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { distribution } from './TokenomicsChart'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_MONTHS = 48

const vestingData = [
  {
    label: 'Public Sale',
    color: '#00f5ff',
    cliff: 0,
    vest: 0,
    tge: 100, // % unlocked at TGE
  },
  {
    label: 'Staking Rewards',
    color: '#a855f7',
    cliff: 0,
    vest: 48,
    tge: 0,
  },
  {
    label: 'Ecosystem Fund',
    color: '#ec4899',
    cliff: 6,
    vest: 24,
    tge: 0,
  },
  {
    label: 'Treasury',
    color: '#f59e0b',
    cliff: 12,
    vest: 36,
    tge: 0,
  },
  {
    label: 'Team & Advisors',
    color: '#10b981',
    cliff: 12,
    vest: 48,
    tge: 0,
  },
  {
    label: 'Liquidity Bootstrap',
    color: '#6366f1',
    cliff: 0,
    vest: 0,
    tge: 100,
  },
]

// ─── Month labels ────────────────────────────────────────────
const monthLabels = ['TGE', '6M', '12M', '18M', '24M', '30M', '36M', '42M', '48M']

export default function VestingTimeline() {
  const wrapperRef = useRef()
  const barsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      barsRef.current.forEach((bar, i) => {
        if (!bar) return
        gsap.fromTo(
          bar,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} className="flex flex-col gap-2">

      {/* ─── Month header ─────────────────────────────── */}
      <div
        className="grid mb-2"
        style={{ gridTemplateColumns: '140px 1fr' }}
      >
        <div />
        <div className="relative">
          <div className="flex justify-between px-1">
            {monthLabels.map((label) => (
              <span
                key={label}
                className="text-xs text-slate-600"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '0.05em',
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Vesting rows ─────────────────────────────── */}
      {vestingData.map((item, i) => {
        const cliffStart = item.cliff / TOTAL_MONTHS
        const vestEnd = (item.cliff + item.vest) / TOTAL_MONTHS
        const isTGE = item.tge === 100

        return (
          <div
            key={i}
            className="grid items-center gap-3 group"
            style={{ gridTemplateColumns: '140px 1fr' }}
          >
            {/* Label */}
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: item.color,
                  boxShadow: `0 0 6px ${item.color}88`,
                }}
              />
              <span
                className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors duration-200 truncate"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '0.05em',
                }}
              >
                {item.label}
              </span>
            </div>

            {/* Timeline bar */}
            <div
              className="relative h-6 rounded-lg overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {isTGE ? (
                // Full unlock at TGE
                <div
                  ref={(el) => (barsRef.current[i] = el)}
                  className="absolute inset-y-1 left-0 right-0 rounded-md origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
                    boxShadow: `0 0 10px ${item.color}44`,
                  }}
                >
                  <span
                    className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                    style={{
                      fontFamily: 'Rajdhani, sans-serif',
                      color: 'rgba(0,0,0,0.7)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    100% TGE
                  </span>
                </div>
              ) : (
                <>
                  {/* Cliff block */}
                  {item.cliff > 0 && (
                    <div
                      ref={(el) => (barsRef.current[i * 2] = el)}
                      className="absolute inset-y-1 rounded-l-md origin-left"
                      style={{
                        left: 0,
                        width: `${cliffStart * 100}%`,
                        background: `repeating-linear-gradient(
                          45deg,
                          ${item.color}22,
                          ${item.color}22 4px,
                          ${item.color}11 4px,
                          ${item.color}11 8px
                        )`,
                        border: `1px solid ${item.color}33`,
                      }}
                    >
                      <span
                        className="absolute inset-0 flex items-center justify-center text-xs"
                        style={{
                          fontFamily: 'Rajdhani, sans-serif',
                          color: item.color,
                          fontSize: '0.6rem',
                          letterSpacing: '0.1em',
                        }}
                      >
                        CLIFF
                      </span>
                    </div>
                  )}

                  {/* Vesting block */}
                  {item.vest > 0 && (
                    <div
                      ref={(el) => (barsRef.current[i * 2 + 1] = el)}
                      className="absolute inset-y-1 rounded-r-md origin-left"
                      style={{
                        left: `${cliffStart * 100}%`,
                        width: `${(vestEnd - cliffStart) * 100}%`,
                        background: `linear-gradient(90deg, ${item.color}cc, ${item.color}44)`,
                        boxShadow: `0 0 8px ${item.color}22`,
                      }}
                    >
                      <span
                        className="absolute inset-0 flex items-center justify-center text-xs font-bold"
                        style={{
                          fontFamily: 'Rajdhani, sans-serif',
                          color: 'rgba(0,0,0,0.6)',
                          fontSize: '0.65rem',
                          letterSpacing: '0.1em',
                        }}
                      >
                        {item.vest}M LINEAR
                      </span>
                    </div>
                  )}
                </>
              )}

              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, ${item.color}08, transparent)`,
                }}
              />
            </div>
          </div>
        )
      })}

      {/* ─── Legend ───────────────────────────────────── */}
      <div className="flex items-center gap-6 mt-4 pt-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-3 rounded-sm"
            style={{
              background: 'repeating-linear-gradient(45deg, #ffffff22, #ffffff22 4px, #ffffff11 4px, #ffffff11 8px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          />
          <span
            className="text-xs text-slate-500"
            style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}
          >
            Cliff Period
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-3 rounded-sm"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
            }}
          />
          <span
            className="text-xs text-slate-500"
            style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}
          >
            Linear Vesting
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-3 rounded-sm"
            style={{
              background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3))',
            }}
          />
          <span
            className="text-xs text-slate-500"
            style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}
          >
            TGE Unlock
          </span>
        </div>
      </div>
    </div>
  )
}