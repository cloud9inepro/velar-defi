import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TokenomicsChart from './TokenomicsChart'
import VestingTimeline from './VestingTimeline'
import AISimulator from './AISimulator'

gsap.registerPlugin(ScrollTrigger)

// ─── Audit badge ─────────────────────────────────────────────
function AuditBadge({ name, score, status, color, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      className="group flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 hover:scale-105"
      style={{
        background: `${color}08`,
        border: `1px solid ${color}22`,
        boxShadow: `0 0 0px ${color}00`,
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 20px ${color}22`
        e.currentTarget.style.borderColor = `${color}44`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0px ${color}00`
        e.currentTarget.style.borderColor = `${color}22`
      }}
    >
      {/* Status dot */}
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{
          background: color,
          boxShadow: `0 0 6px ${color}`,
          animation: status === 'live' ? 'pulse-glow 2s infinite' : 'none',
        }}
      />

      <div className="flex flex-col gap-0.5">
        <span
          className="text-sm font-bold"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            color: 'rgba(226,232,240,0.9)',
            letterSpacing: '0.05em',
          }}
        >
          {name}
        </span>
        <span
          className="text-xs"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            color: status === 'pending' ? 'rgba(148,163,184,0.5)' : color,
            letterSpacing: '0.08em',
          }}
        >
          {score}
        </span>
      </div>

      {/* Arrow */}
      <svg
        className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1"
        style={{ color }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  )
}

const auditBadges = [
  {
    name: 'CertiK Audit',
    score: 'Score: 94/100',
    status: 'live',
    color: '#00f5ff',
    link: '#',
  },
  {
    name: 'Hacken Audit',
    score: 'Score: 91/100',
    status: 'live',
    color: '#10b981',
    link: '#',
  },
  {
    name: 'Immunefi Bug Bounty',
    score: 'Up to $500K',
    status: 'live',
    color: '#f59e0b',
    link: '#',
  },
  {
    name: 'PeckShield Audit',
    score: 'Audit Pending',
    status: 'pending',
    color: '#a855f7',
    link: '#',
  },
]

export default function TokenomicsSection() {
  const sectionRef = useRef()
  const headerRef = useRef()
  const labelRef = useRef()
  const titleRef = useRef()
  const chartRef = useRef()
  const vestingRef = useRef()
  const simulatorRef = useRef()
  const auditsRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ─── Header ───────────────────────────────────
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ─── Chart block ──────────────────────────────
      gsap.fromTo(
        chartRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: chartRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ─── Vesting block ────────────────────────────
      gsap.fromTo(
        vestingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: vestingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ─── Simulator block ──────────────────────────
      gsap.fromTo(
        simulatorRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: simulatorRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ─── Audits block ─────────────────────────────
      gsap.fromTo(
        auditsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: auditsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="tokenomics"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
      style={{ background: '#030712' }}
    >
      {/* ─── Background glow ──────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(168,85,247,0.06) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 80%, rgba(0,245,255,0.04) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

        {/* ─── Section header ───────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center gap-5 mb-16 lg:mb-20"
        >
          <div ref={labelRef} className="flex items-center gap-3 opacity-0">
            <span className="w-8 h-px bg-[#a855f7]" />
            <span
              className="text-[#a855f7] text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.3em' }}
            >
              Token Economy
            </span>
            <span className="w-8 h-px bg-[#a855f7]" />
          </div>

          <h2
            ref={titleRef}
            className="text-white font-black leading-tight opacity-0"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
            }}
          >
            Designed for{' '}
            <span className="gradient-text">Long-Term Value</span>
          </h2>

          <p
            className="text-slate-500 max-w-lg text-center"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1rem',
              letterSpacing: '0.03em',
            }}
          >
            A balanced token economy built for sustainable growth,
            investor confidence, and long-term protocol health.
          </p>
        </div>

        {/* ─── Distribution chart ───────────────────── */}
        <div
          ref={chartRef}
          className="p-8 lg:p-10 rounded-2xl mb-8 opacity-0"
          style={{
            background: 'rgba(10,1,24,0.8)',
            border: '1px solid rgba(168,85,247,0.15)',
            boxShadow: '0 0 60px rgba(168,85,247,0.06)',
          }}
        >
          {/* Block header */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: '#a855f7', boxShadow: '0 0 8px #a855f7' }}
            />
            <h3
              className="text-white font-bold text-sm tracking-wider uppercase"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.2em' }}
            >
              Token Distribution — 1,000,000,000 VLR
            </h3>
          </div>
          <TokenomicsChart />
        </div>

        {/* ─── Vesting timeline ─────────────────────── */}
        <div
          ref={vestingRef}
          className="p-8 lg:p-10 rounded-2xl mb-8 opacity-0"
          style={{
            background: 'rgba(10,1,24,0.8)',
            border: '1px solid rgba(0,245,255,0.1)',
            boxShadow: '0 0 60px rgba(0,245,255,0.04)',
          }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: '#00f5ff', boxShadow: '0 0 8px #00f5ff' }}
            />
            <h3
              className="text-white font-bold text-sm tracking-wider uppercase"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.2em' }}
            >
              Vesting Schedule
            </h3>
          </div>
          <VestingTimeline />
        </div>

        {/* ─── AI Simulator ─────────────────────────── */}
        <div ref={simulatorRef} className="mb-8 opacity-0">
          <AISimulator />
        </div>

        {/* ─── Audit badges ─────────────────────────── */}
        <div
          ref={auditsRef}
          className="opacity-0"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#00f5ff]" />
            <span
              className="text-[#00f5ff] text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.3em' }}
            >
              Security & Audits
            </span>
            <span className="w-8 h-px bg-[#00f5ff]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {auditBadges.map((badge, i) => (
              <AuditBadge key={i} {...badge} />
            ))}
          </div>

          {/* Contract address placeholder */}
          <div
            className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span
              className="text-xs font-bold tracking-wider uppercase text-slate-500 flex-shrink-0"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.15em' }}
            >
              Contract Address
            </span>
            <span
              className="text-xs font-mono text-slate-400 break-all"
              style={{ letterSpacing: '0.05em' }}
            >
              0x0000000000000000000000000000000000000000
            </span>
            <button
              data-cursor-hover
              className="flex-shrink-0 text-xs px-3 py-1 rounded-lg transition-colors duration-200"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                background: 'rgba(0,245,255,0.08)',
                border: '1px solid rgba(0,245,255,0.2)',
                color: '#00f5ff',
                letterSpacing: '0.1em',
              }}
              onClick={() =>
                navigator.clipboard.writeText(
                  '0x0000000000000000000000000000000000000000'
                )
              }
            >
              COPY
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}