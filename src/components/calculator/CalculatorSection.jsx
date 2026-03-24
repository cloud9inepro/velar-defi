import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CalculatorInput, { riskProfiles, lockPeriods } from './CalculatorInput'
import CalculatorOutput from './CalculatorOutput'

gsap.registerPlugin(ScrollTrigger)

// ─── Yield calculation engine ────────────────────────────────
function calculateYield(amount, lockPeriod, compound, risk) {
  const profile = riskProfiles[risk]
  const baseApy = profile.apy

  // Lock period bonus — longer lock = higher APY
  const lockBonus = (lockPeriod / 365) * 8

  // Compound frequency multiplier
  const compoundMap = { Daily: 365, Weekly: 52, Monthly: 12 }
  const n = compoundMap[compound]

  // Final APY with lock bonus
  const apy = baseApy + lockBonus

  // Compound interest formula: A = P(1 + r/n)^(nt)
  const r = apy / 100
  const t = lockPeriod / 365
  const total = amount * Math.pow(1 + r / n, n * t)
  const earned = total - amount

  const daily = earned / lockPeriod
  const monthly = daily * 30
  const yearly = daily * 365

  // Chart data — monthly points up to lock period
  const chartData = []
  const points = Math.min(lockPeriod, 12)
  const interval = lockPeriod / points

  for (let i = 1; i <= points; i++) {
    const dayPoint = Math.round(interval * i)
    const tPoint = dayPoint / 365
    const totalPoint = amount * Math.pow(1 + r / n, n * tPoint)
    const earnedPoint = totalPoint - amount

    chartData.push({
      label: dayPoint >= 365
        ? `${Math.round(dayPoint / 365)}Y`
        : `${dayPoint}D`,
      value: parseFloat(earnedPoint.toFixed(2)),
    })
  }

  return {
    apy: parseFloat(apy.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    earned: parseFloat(earned.toFixed(2)),
    daily: parseFloat(daily.toFixed(2)),
    monthly: parseFloat(monthly.toFixed(2)),
    yearly: parseFloat(yearly.toFixed(2)),
    chartData,
  }
}

export default function CalculatorSection() {
  const sectionRef = useRef()
  const headerRef = useRef()
  const labelRef = useRef()
  const titleRef = useRef()
  const cardRef = useRef()

  const [values, setValues] = useState({
    amount: 5000,
    lockPeriod: 90,
    compound: 'Daily',
    risk: 'Balanced',
  })

  // ─── Auto calculate on any input change ─────────────────
  const results = calculateYield(
    values.amount,
    values.lockPeriod,
    values.compound,
    values.risk
  )

  // ─── Scroll reveal animations ────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
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
      id="calculator"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
      style={{ background: '#030712' }}
    >
      {/* ─── Background glow ──────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,245,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 20%, rgba(168,85,247,0.06) 0%, transparent 50%)',
        }}
      />

      {/* ─── Animated orb in background ──────────────── */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{
          background:
            'radial-gradient(circle, #00f5ff 0%, #a855f7 50%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

        {/* ─── Section header ───────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center gap-5 mb-16"
        >
          <div ref={labelRef} className="flex items-center gap-3 opacity-0">
            <span className="w-8 h-px bg-[#00f5ff]" />
            <span
              className="text-[#00f5ff] text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.3em' }}
            >
              Yield Calculator
            </span>
            <span className="w-8 h-px bg-[#00f5ff]" />
          </div>

          <h2
            ref={titleRef}
            className="text-white font-black leading-tight opacity-0"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
            }}
          >
            Calculate Your{' '}
            <span className="gradient-text">Earnings</span>
          </h2>

          <p
            className="text-slate-500 max-w-lg text-center"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1rem',
              letterSpacing: '0.03em',
            }}
          >
            Adjust the parameters below to see your personalized yield projections
            in real time. No signup required.
          </p>
        </div>

        {/* ─── Calculator card ──────────────────────── */}
        <div
          ref={cardRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden opacity-0"
          style={{
            border: '1px solid rgba(168,85,247,0.2)',
            boxShadow:
              '0 0 80px rgba(168,85,247,0.08), 0 0 160px rgba(0,245,255,0.04)',
          }}
        >
          {/* ─── Left — Inputs ────────────────────── */}
          <div
            className="p-8 lg:p-10"
            style={{
              background: 'rgba(10,1,24,0.8)',
              borderRight: '1px solid rgba(168,85,247,0.15)',
            }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: '#00f5ff',
                  boxShadow: '0 0 8px #00f5ff',
                }}
              />
              <h3
                className="text-white font-bold text-sm tracking-wider uppercase"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '0.2em',
                }}
              >
                Configure Strategy
              </h3>
            </div>

            <CalculatorInput values={values} onChange={setValues} />
          </div>

          {/* ─── Right — Output ───────────────────── */}
          <div
            className="p-8 lg:p-10"
            style={{
              background: 'rgba(5,1,18,0.9)',
            }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: '#a855f7',
                  boxShadow: '0 0 8px #a855f7',
                }}
              />
              <h3
                className="text-white font-bold text-sm tracking-wider uppercase"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '0.2em',
                }}
              >
                Your Projections
              </h3>
            </div>

            <CalculatorOutput values={values} results={results} />
          </div>
        </div>

        {/* ─── Disclaimer ───────────────────────────── */}
        <p
          className="text-slate-700 text-xs text-center mt-6"
          style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}
        >
          * Projected yields are estimates based on current protocol parameters.
          Actual returns may vary. Not financial advice.
        </p>
      </div>
    </section>
  )
}