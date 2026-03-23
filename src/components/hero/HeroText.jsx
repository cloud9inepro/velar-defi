import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { siteConfig } from '../../config/siteConfig'

export default function HeroText() {
  const labelRef = useRef()
  const headlineRef = useRef()
  const glitch1Ref = useRef()
  const glitch2Ref = useRef()
  const subRef = useRef()
  const lineRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    // ─── Entrance animation ──────────────────────────────
    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        [glitch1Ref.current, glitch2Ref.current],
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.4'
      )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
        '-=0.4'
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )

    // ─── Glitch loop ─────────────────────────────────────
    const glitchLoop = gsap.timeline({
      repeat: -1,
      repeatDelay: 4,
      delay: 2,
    })

    glitchLoop
      .to([glitch1Ref.current, glitch2Ref.current], {
        opacity: 1,
        duration: 0.05,
      })
      .to(glitch1Ref.current, {
        x: -4,
        duration: 0.05,
        ease: 'none',
      })
      .to(glitch2Ref.current, {
        x: 4,
        duration: 0.05,
        ease: 'none',
      })
      .to([glitch1Ref.current, glitch2Ref.current], {
        x: 0,
        duration: 0.05,
      })
      .to(glitch1Ref.current, {
        x: 3,
        duration: 0.03,
        ease: 'none',
      })
      .to(glitch2Ref.current, {
        x: -3,
        duration: 0.03,
        ease: 'none',
      })
      .to([glitch1Ref.current, glitch2Ref.current], {
        x: 0,
        opacity: 0,
        duration: 0.05,
      })

    return () => {
      tl.kill()
      glitchLoop.kill()
    }
  }, [])

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* ─── Label ──────────────────────────────────────── */}
      <div
        ref={labelRef}
        className="flex items-center gap-3 opacity-0"
      >
        <span className="w-8 h-px bg-[#00f5ff]" />
        <span
          className="text-[#00f5ff] text-xs font-semibold tracking-[0.3em] uppercase"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          {siteConfig.token.symbol} — Next Gen DeFi
        </span>
      </div>

      {/* ─── Glitch Headline ────────────────────────────── */}
      <div className="relative">
        {/* Main headline */}
        <h1
          ref={headlineRef}
          className="relative z-10 font-bold leading-[1.2] tracking-normal opacity-0"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.8rem, 8vw, 7rem)',
          }}
        >
          <span className="block text-white">Revolutionize</span>
          <span
            className="block gradient-text"
          >
            DeFi with
          </span>
          <span
            className="block text-white glow-cyan"
          >
            {siteConfig.name}
          </span>
        </h1>

        {/* Glitch layer 1 — cyan */}
        <h1
          ref={glitch1Ref}
          aria-hidden="true"
          className="absolute inset-0 z-20 font-bold leading-[1.2] tracking-normal opacity-0 pointer-events-none"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.8rem, 8vw, 7rem)',
            color: '#00f5ff',
            clipPath: 'inset(30% 0 50% 0)',
            mixBlendMode: 'screen',
          }}
        >
          <span className="block">Revolutionize</span>
          <span className="block">DeFi with</span>
          <span className="block">{siteConfig.name}</span>
        </h1>

        {/* Glitch layer 2 — purple */}
        <h1
          ref={glitch2Ref}
          aria-hidden="true"
          className="absolute inset-0 z-20 font-bold leading-[1.2] tracking-normal opacity-0 pointer-events-none"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.8rem, 8vw, 7rem)',
            color: '#a855f7',
            clipPath: 'inset(60% 0 20% 0)',
            mixBlendMode: 'screen',
          }}
        >
          <span className="block">Revolutionize</span>
          <span className="block">DeFi with</span>
          <span className="block">{siteConfig.name}</span>
        </h1>
      </div>

      {/* ─── Divider line ───────────────────────────────── */}
      <div
        ref={lineRef}
        className="w-24 h-px origin-left"
        style={{
          background: 'linear-gradient(90deg, #00f5ff, #a855f7)',
          transform: 'scaleX(0)',
        }}
      />

      {/* ─── Subheadline ────────────────────────────────── */}
      <p
        ref={subRef}
        className="text-slate-400 leading-relaxed opacity-0 max-w-lg"
        style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          letterSpacing: '0.05em',
        }}
      >
        {siteConfig.subtagline}
        <span className="block mt-1 text-slate-500 text-sm">
          {siteConfig.description ?? 'The next generation DeFi protocol built for speed, security, and scale.'}
        </span>
      </p>
    </div>
  )
}
