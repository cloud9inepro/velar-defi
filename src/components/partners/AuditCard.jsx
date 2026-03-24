import { useRef } from 'react'
import { gsap } from 'gsap'

export default function AuditCard({ audit }) {
  const cardRef = useRef()

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -6,
      boxShadow: `0 20px 60px ${audit.color}18, 0 0 0 1px ${audit.color}33`,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: `0 0 0px ${audit.color}00`,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col gap-5 p-6 rounded-2xl cursor-pointer"
      style={{
        background: 'rgba(10,1,24,0.85)',
        border: `1px solid ${audit.color}22`,
      }}
    >
      {/* ─── Top row ──────────────────────────────────── */}
      <div className="flex items-start justify-between">
        {/* Logo placeholder */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `${audit.color}12`,
            border: `1px solid ${audit.color}33`,
          }}
        >
          <span
            className="text-lg font-black"
            style={{
              fontFamily: 'Syne, sans-serif',
              color: audit.color,
              textShadow: `0 0 10px ${audit.color}88`,
            }}
          >
            {audit.name.charAt(0)}
          </span>
        </div>

        {/* Status badge */}
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            color: audit.status === 'pending' ? '#475569' : audit.color,
            background:
              audit.status === 'pending'
                ? 'rgba(71,85,105,0.15)'
                : `${audit.color}18`,
            border:
              audit.status === 'pending'
                ? '1px solid rgba(71,85,105,0.3)'
                : `1px solid ${audit.color}33`,
            letterSpacing: '0.1em',
          }}
        >
          {audit.status === 'pending' ? 'PENDING' : 'VERIFIED'}
        </span>
      </div>

      {/* ─── Name + firm ──────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <h4
          className="text-white font-black text-lg leading-tight"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {audit.name}
        </h4>
        <p
          className="text-slate-500 text-xs"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            letterSpacing: '0.08em',
          }}
        >
          {audit.firm}
        </p>
      </div>

      {/* ─── Score ────────────────────────────────────── */}
      {audit.status !== 'pending' && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span
              className="text-xs text-slate-500 tracking-wider uppercase"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                letterSpacing: '0.15em',
              }}
            >
              Security Score
            </span>
            <span
              className="text-sm font-black"
              style={{
                fontFamily: 'Syne, sans-serif',
                color: audit.color,
              }}
            >
              {audit.score}/100
            </span>
          </div>

          {/* Score bar */}
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${audit.score}%`,
                background: `linear-gradient(90deg, ${audit.color}, ${audit.color}88)`,
                boxShadow: `0 0 8px ${audit.color}66`,
              }}
            />
          </div>
        </div>
      )}

      {/* ─── Pending state ────────────────────────────── */}
      {audit.status === 'pending' && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl"
          style={{
            background: 'rgba(71,85,105,0.1)',
            border: '1px solid rgba(71,85,105,0.2)',
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              background: '#475569',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          />
          <span
            className="text-xs text-slate-500"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              letterSpacing: '0.08em',
            }}
          >
            Audit in progress — Est. Q1 2026
          </span>
        </div>
      )}

      {/* ─── Findings ─────────────────────────────────── */}
      {audit.findings && (
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(audit.findings).map(([severity, count]) => {
            const severityColors = {
              Critical: '#ec4899',
              Medium: '#f59e0b',
              Low: '#10b981',
            }
            const color = severityColors[severity] || '#475569'
            return (
              <div
                key={severity}
                className="flex flex-col items-center gap-1 py-2 rounded-lg"
                style={{
                  background: `${color}08`,
                  border: `1px solid ${color}22`,
                }}
              >
                <span
                  className="font-black text-lg leading-none"
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    color,
                  }}
                >
                  {count}
                </span>
                <span
                  className="text-xs"
                  style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    color: 'rgba(100,116,139,0.8)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.08em',
                  }}
                >
                  {severity}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {/* ─── Link ─────────────────────────────────────── */}
      <a
        href={audit.link}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-hover
        className="group flex items-center gap-2 text-xs font-bold tracking-wider mt-auto transition-colors duration-200"
        style={{
          fontFamily: 'Rajdhani, sans-serif',
          color: audit.status === 'pending' ? '#475569' : audit.color,
          letterSpacing: '0.15em',
          pointerEvents: audit.status === 'pending' ? 'none' : 'auto',
        }}
      >
        {audit.status === 'pending' ? 'Report Pending' : 'View Full Report'}
        {audit.status !== 'pending' && (
          <svg
            className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        )}
      </a>
    </div>
  )
}