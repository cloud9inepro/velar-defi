import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const statusConfig = {
  completed: { label: 'Completed', color: '#10b981' },
  active: { label: 'In Progress', color: '#00f5ff' },
  upcoming: { label: 'Upcoming', color: '#475569' },
}

export default function RoadmapCard({ item, index }) {
  const cardRef = useRef()
  const dotRef = useRef()
  const isLeft = index % 2 === 0
  const status = statusConfig[item.status]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card slides in from its side
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          x: isLeft ? -60 : 60,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Dot pops in
      gsap.fromTo(
        dotRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, cardRef)

    return () => ctx.revert()
  }, [isLeft])

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-8 items-start">

      {/* ─── Left card slot ───────────────────────────── */}
      <div className={`${isLeft ? 'block' : 'hidden lg:block'}`}>
        {isLeft && (
          <div
            ref={cardRef}
            className="relative p-6 rounded-2xl lg:ml-auto lg:mr-8"
            style={{
              background: 'rgba(10,1,24,0.85)',
              border: `1px solid ${status.color}22`,
              boxShadow: item.status === 'active'
                ? `0 0 30px ${status.color}12`
                : 'none',
              maxWidth: '420px',
            }}
          >
            <CardContent item={item} status={status} />
          </div>
        )}
      </div>

      {/* ─── Center dot ───────────────────────────────── */}
      <div className="hidden lg:flex flex-col items-center">
        <div
          ref={dotRef}
          className="relative w-5 h-5 rounded-full flex items-center justify-center z-10"
          style={{
            background: status.color,
            boxShadow: item.status === 'active'
              ? `0 0 0 4px ${status.color}22, 0 0 16px ${status.color}66`
              : item.status === 'completed'
              ? `0 0 0 3px ${status.color}33`
              : `0 0 0 3px rgba(71,85,105,0.3)`,
          }}
        >
          {item.status === 'completed' && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          {item.status === 'active' && (
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: '#030712',
                animation: 'pulse-glow 1.5s ease-in-out infinite',
              }}
            />
          )}
        </div>
      </div>

      {/* ─── Right card slot ──────────────────────────── */}
      <div className={`${!isLeft ? 'block' : 'hidden lg:block'}`}>
        {!isLeft && (
          <div
            ref={cardRef}
            className="relative p-6 rounded-2xl lg:ml-8"
            style={{
              background: 'rgba(10,1,24,0.85)',
              border: `1px solid ${status.color}22`,
              boxShadow: item.status === 'active'
                ? `0 0 30px ${status.color}12`
                : 'none',
              maxWidth: '420px',
            }}
          >
            <CardContent item={item} status={status} />
          </div>
        )}
      </div>

      {/* ─── Mobile dot ──────────────────────────────── */}
      <div
        className="lg:hidden absolute left-0 top-6 w-4 h-4 rounded-full"
        style={{
          background: status.color,
          boxShadow: `0 0 8px ${status.color}`,
        }}
      />
    </div>
  )
}

// ─── Card inner content ──────────────────────────────────────
function CardContent({ item, status }) {
  return (
    <>
      {/* Quarter + status */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-black tracking-widest uppercase"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            color: status.color,
            letterSpacing: '0.2em',
          }}
        >
          {item.quarter}
        </span>
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            color: status.color,
            background: `${status.color}18`,
            border: `1px solid ${status.color}33`,
            letterSpacing: '0.1em',
          }}
        >
          {status.label}
        </span>
      </div>

      {/* Phase name */}
      <h3
        className="text-white font-black mb-2 leading-tight"
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
        }}
      >
        {item.phase}
      </h3>

      {/* Description */}
      <p
        className="text-slate-500 text-xs mb-4 leading-relaxed"
        style={{
          fontFamily: 'Rajdhani, sans-serif',
          letterSpacing: '0.03em',
        }}
      >
        {item.description}
      </p>

      {/* Milestones */}
      <ul className="flex flex-col gap-2">
        {item.milestones.map((milestone, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-xs"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              color: item.status === 'upcoming'
                ? 'rgba(100,116,139,0.7)'
                : 'rgba(203,213,225,0.85)',
              letterSpacing: '0.04em',
            }}
          >
            {item.status === 'completed' ? (
              <svg
                className="w-3 h-3 flex-shrink-0"
                style={{ color: '#10b981' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : item.status === 'active' ? (
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: '#00f5ff' }}
              />
            ) : (
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: 'rgba(71,85,105,0.5)' }}
              />
            )}
            {milestone}
          </li>
        ))}
      </ul>
    </>
  )
}