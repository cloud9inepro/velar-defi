import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MarqueeRow from './MarqueeRow'
import AuditCard from './AuditCard'

gsap.registerPlugin(ScrollTrigger)

const audits = [
  {
    name: 'CertiK',
    firm: 'CertiK Blockchain Security',
    score: 94,
    status: 'verified',
    color: '#00f5ff',
    link: '#',
    findings: {
      Critical: 0,
      Medium: 2,
      Low: 5,
    },
  },
  {
    name: 'Hacken',
    firm: 'Hacken Security Auditors',
    score: 91,
    status: 'verified',
    color: '#10b981',
    link: '#',
    findings: {
      Critical: 0,
      Medium: 3,
      Low: 4,
    },
  },
  {
    name: 'Immunefi',
    firm: 'Bug Bounty Program',
    score: null,
    status: 'verified',
    color: '#f59e0b',
    link: '#',
    findings: {
      Critical: 0,
      Medium: 1,
      Low: 3,
    },
  },
  {
    name: 'PeckShield',
    firm: 'PeckShield Inc.',
    score: null,
    status: 'pending',
    color: '#a855f7',
    link: '#',
    findings: null,
  },
]

const trustStats = [
  { label: 'Audits Completed', value: '3', suffix: '+' },
  { label: 'Lines of Code Reviewed', value: '24K', suffix: '+' },
  { label: 'Bugs Found & Fixed', value: '18', suffix: '' },
  { label: 'Bug Bounty Pool', value: '$500K', suffix: '' },
]

export default function PartnersSection() {
  const sectionRef = useRef()
  const headerRef = useRef()
  const labelRef = useRef()
  const titleRef = useRef()
  const statsRef = useRef([])
  const auditsRef = useRef()
  const marqueeRef = useRef()

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

      // ─── Trust stats ──────────────────────────────
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current[0],
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ─── Marquee fade in ──────────────────────────
      gsap.fromTo(
        marqueeRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      // ─── Audit cards ──────────────────────────────
      gsap.fromTo(
        auditsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: auditsRef.current,
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
      id="partners"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
      style={{ background: '#030712' }}
    >
      {/* ─── Background glow ──────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 80% 30%, rgba(0,245,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 70%, rgba(168,85,247,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

        {/* ─── Section header ───────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center gap-5 mb-16"
        >
          <div ref={labelRef} className="flex items-center gap-3 opacity-0">
            <span className="w-8 h-px bg-[#f59e0b]" />
            <span
              className="text-[#f59e0b] text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.3em' }}
            >
              Partners & Security
            </span>
            <span className="w-8 h-px bg-[#f59e0b]" />
          </div>

          <h2
            ref={titleRef}
            className="text-white font-black leading-tight opacity-0"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
            }}
          >
            Trusted by the{' '}
            <span className="gradient-text">Best in Web3</span>
          </h2>

          <p
            className="text-slate-500 max-w-lg text-center"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1rem',
              letterSpacing: '0.03em',
            }}
          >
            Built with and audited by the most trusted names
            in the decentralized finance ecosystem.
          </p>
        </div>

        {/* ─── Trust stats ──────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {trustStats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => (statsRef.current[i] = el)}
              className="flex flex-col items-center gap-2 py-6 rounded-xl opacity-0"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <span
                className="font-black gradient-text"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                }}
              >
                {stat.value}{stat.suffix}
              </span>
              <span
                className="text-xs text-slate-500 text-center tracking-wider uppercase"
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  letterSpacing: '0.15em',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ─── Partner marquee ──────────────────────── */}
        <div ref={marqueeRef} className="flex flex-col gap-4 mb-16 opacity-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-px bg-[#00f5ff]" />
            <span
              className="text-[#00f5ff] text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.3em' }}
            >
              Ecosystem Partners
            </span>
          </div>
          <MarqueeRow direction="left" speed={40} />
          <MarqueeRow direction="right" speed={35} />
        </div>

        {/* ─── Audit cards ──────────────────────────── */}
        <div ref={auditsRef} className="opacity-0">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-[#10b981]" />
            <span
              className="text-[#10b981] text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.3em' }}
            >
              Security Audits
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {audits.map((audit, i) => (
              <AuditCard key={i} audit={audit} />
            ))}
          </div>
        </div>

      </div>

      {/* ─── Footer strip ─────────────────────────────── */}
      <div
        className="mt-24 px-8 md:px-16 lg:px-24 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <span
          className="text-slate-600 text-xs"
          style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}
        >
          © 2026 Velar Protocol. All rights reserved.
        </span>

        <div className="flex items-center gap-2">
          <span
            className="text-slate-700 text-xs"
            style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}
          >
            Built with
          </span>
          <span className="text-[#ec4899] text-xs">♥</span>
          <span
            className="text-slate-700 text-xs"
            style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}
          >
            for the DeFi community
          </span>
        </div>

        <div className="flex items-center gap-4">
          {['Privacy Policy', 'Terms of Service', 'Docs'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-slate-600 hover:text-slate-400 text-xs transition-colors duration-200"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}