import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import RewardsChart from './RewardsChart'
import { riskProfiles } from './CalculatorInput'

export default function CalculatorOutput({ values, results }) {
  const apyRef = useRef()
  const dailyRef = useRef()
  const monthlyRef = useRef()
  const yearlyRef = useRef()
  const badgeRef = useRef()

  const profile = riskProfiles[values.risk]

  // ─── Animate numbers on result change ───────────────────
  useEffect(() => {
  if (!results) return

  // Badge pop
  gsap.fromTo(
    badgeRef.current,
    { scale: 0.9, opacity: 0.5 },
    { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
  )

  // Animate APY counter
  const apyObj = { val: 0 }
  gsap.to(apyObj, {
    val: results.apy,
    duration: 1,
    ease: 'power3.out',
    onUpdate: () => {
      if (apyRef.current)
        apyRef.current.textContent = apyObj.val.toFixed(1) + '%'
    },
  })

  // Animate daily
  const dailyObj = { val: 0 }
  gsap.to(dailyObj, {
    val: results.daily,
    duration: 1,
    ease: 'power3.out',
    onUpdate: () => {
      if (dailyRef.current)
        dailyRef.current.textContent =
          '$' + dailyObj.val.toLocaleString(undefined, { maximumFractionDigits: 2 })
    },
  })

  // Animate monthly
  const monthlyObj = { val: 0 }
  gsap.to(monthlyObj, {
    val: results.monthly,
    duration: 1,
    ease: 'power3.out',
    onUpdate: () => {
      if (monthlyRef.current)
        monthlyRef.current.textContent =
          '$' + monthlyObj.val.toLocaleString(undefined, { maximumFractionDigits: 2 })
    },
  })

  // Animate yearly
  const yearlyObj = { val: 0 }
  gsap.to(yearlyObj, {
    val: results.yearly,
    duration: 1,
    ease: 'power3.out',
    onUpdate: () => {
      if (yearlyRef.current)
        yearlyRef.current.textContent =
          '$' + yearlyObj.val.toLocaleString(undefined, { maximumFractionDigits: 2 })
    },
  })

}, [results])

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(0,245,255,0.06)',
            border: '1px solid rgba(0,245,255,0.15)',
          }}
        >
          <svg
            className="w-8 h-8 text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p
          className="text-slate-600 text-sm text-center"
          style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}
        >
          Adjust inputs to calculate
          <br />
          your estimated yield
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ─── APY Badge ────────────────────────────────── */}
      <div
        ref={badgeRef}
        className="flex flex-col items-center justify-center py-8 rounded-2xl relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${profile.color}12, ${profile.color}06)`,
          border: `1px solid ${profile.color}33`,
          boxShadow: `0 0 40px ${profile.color}12`,
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${profile.color}10 0%, transparent 70%)`,
          }}
        />

        <span
          className="text-xs font-bold tracking-widest uppercase mb-2 relative z-10"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            color: profile.color,
            letterSpacing: '0.3em',
            opacity: 0.7,
          }}
        >
          Your Estimated APY
        </span>

        <span
          ref={apyRef}
          className="relative z-10 font-black"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            color: profile.color,
            textShadow: `0 0 30px ${profile.color}88, 0 0 60px ${profile.color}44`,
            lineHeight: 1,
          }}
        >
          {results.apy.toFixed(1)}%
        </span>

        <span
          className="text-slate-500 text-xs mt-2 relative z-10"
          style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}
        >
          {values.risk} Strategy · {values.lockPeriod} Days · {values.compound} Compound
        </span>
      </div>

      {/* ─── Earnings breakdown ───────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Daily', ref: dailyRef, value: results.daily },
          { label: 'Monthly', ref: monthlyRef, value: results.monthly },
          { label: 'Yearly', ref: yearlyRef, value: results.yearly },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-1 py-4 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span
              className="text-xs text-slate-500 tracking-wider uppercase"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.15em' }}
            >
              {item.label}
            </span>
            <span
              ref={item.ref}
              className="text-white font-bold text-sm"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              ${item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>

      {/* ─── Chart ────────────────────────────────────── */}
      <div
        className="rounded-xl p-4"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <span
          className="text-xs text-slate-500 tracking-wider uppercase mb-4 block"
          style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.15em' }}
        >
          Rewards Over Time
        </span>
        <RewardsChart data={results.chartData} />
      </div>

      {/* ─── Share buttons ────────────────────────────── */}
      <div className="flex gap-3">
        <button
          data-cursor-hover
          onClick={() => {
            const text = `I'm earning ${results.apy.toFixed(1)}% APY on @VelarProtocol! 🚀 Stake ${values.amount.toLocaleString()} $VLR and earn $${results.yearly.toLocaleString(undefined, { maximumFractionDigits: 0 })} yearly. #DeFi #Velar`
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
          }}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 hover:scale-105"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            letterSpacing: '0.15em',
            background: 'rgba(29,161,242,0.1)',
            border: '1px solid rgba(29,161,242,0.3)',
            color: '#1da1f2',
          }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </button>

        <button
          data-cursor-hover
          onClick={() => {
            const text = `Velar Protocol Yield: ${results.apy.toFixed(1)}% APY | Stake: $${values.amount.toLocaleString()} | Yearly: $${results.yearly.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
            navigator.clipboard.writeText(text)
          }}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 hover:scale-105"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            letterSpacing: '0.15em',
            background: 'rgba(168,85,247,0.1)',
            border: '1px solid rgba(168,85,247,0.3)',
            color: '#a855f7',
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </button>
      </div>

    </div>
  )
}