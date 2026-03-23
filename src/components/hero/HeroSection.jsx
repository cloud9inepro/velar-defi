import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OrbScene from '../canvas/OrbScene'
import HeroText from './HeroText'
import HeroStats from './HeroStats'
import HeroCTA from './HeroCTA'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef()
  const contentRef = useRef()
  const orbWrapRef = useRef()

  // ─── Scroll-driven animations ──────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Content fades + slides left on scroll out
      gsap.to(contentRef.current, {
        opacity: 0,
        x: -60,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Orb shrinks + drifts right on scroll out
      gsap.to(orbWrapRef.current, {
        scale: 0.6,
        x: 120,
        opacity: 0,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden"
    >

      {/* ─── Background gradient ──────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(168,85,247,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 70% 60%, rgba(0,245,255,0.08) 0%, transparent 50%), linear-gradient(180deg, #0a0118 0%, #030712 100%)',
        }}
      />

      {/* ─── Scanline overlay ─────────────────────────── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 3px)',
          backgroundSize: '100% 3px',
        }}
      />

      {/* ─── Grid lines ───────────────────────────────── */}
      {/* <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      /> */}

      {/* ─── 3D Canvas — full viewport ────────────────── */}
      <div
        ref={orbWrapRef}
        className="absolute inset-0 z-0"
      >
        <OrbScene />
      </div>

      {/* ─── Hero content ─────────────────────────────── */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-screen py-32">

          {/* ─── Left — text content ──────────────────── */}
          <div className="flex flex-col gap-8 lg:gap-10">
            <HeroText />
            <HeroCTA />
            <HeroStats />
          </div>

          {/* ─── Right — empty on mobile, spacer on desktop ── */}
          {/* The orb fills this space via the absolute canvas */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* ─── Bottom fade ──────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent, #030712)',
        }}
      />

      {/* ─── Scroll indicator ─────────────────────────── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <span
          className="text-slate-500 text-xs tracking-widest uppercase"
          style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.2em' }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10 relative overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '40%',
              background: 'linear-gradient(to bottom, transparent, #00f5ff)',
              animation: 'scanline 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

    </section>
  )
}

// ```

// ---

// **What this does:**
// - Full viewport section with the 3D canvas as absolute background
// - Radial gradient background — deep purple + cyan glow centered on the orb side
// - Scanline overlay — subtle CRT horizontal lines across the whole hero
// - Grid lines — faint cyan grid for a tech/blockchain feel
// - GSAP ScrollTrigger — content slides left and fades, orb shrinks and drifts right as you scroll out
// - Two-column layout on desktop — text left, orb fills right via canvas
// - Scroll indicator at bottom with animated line

// ---

// That's the complete hero. Here's a summary of every file you need:
// ```
// src/
// ├── config/siteConfig.js        ✅
// ├── constants/icons.js          ✅
// ├── hooks/useCountUp.js         ✅
// ├── components/
// │   ├── canvas/
// │   │   ├── Particles.jsx       ✅
// │   │   ├── OrbRings.jsx        ✅
// │   │   ├── Orb.jsx             ✅
// │   │   └── OrbScene.jsx        ✅
// │   ├── hero/
// │   │   ├── HeroText.jsx        ✅
// │   │   ├── HeroStats.jsx       ✅
// │   │   ├── HeroCTA.jsx         ✅
// │   │   ├── WalletModal.jsx     ✅
// │   │   └── HeroSection.jsx     ✅
// │   └── layout/
// │       └── Navbar.jsx          ✅
// ├── App.jsx                     ✅
// ├── main.jsx                    ✅
// └── index.css                   ✅