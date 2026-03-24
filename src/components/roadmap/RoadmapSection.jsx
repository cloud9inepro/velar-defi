import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RoadmapCard from './RoadmapCard'

gsap.registerPlugin(ScrollTrigger)

const roadmap = [
  {
    quarter: 'Q1 2025',
    phase: 'Foundation',
    description: 'Laying the groundwork for the Velar ecosystem with core protocol deployment and initial community building.',
    status: 'completed',
    milestones: [
      'Protocol smart contracts deployed',
      'Token Generation Event (TGE)',
      'Initial DEX listing on Uniswap',
      'Community Discord & Twitter launch',
    ],
  },
  {
    quarter: 'Q2 2025',
    phase: 'Growth',
    description: 'Expanding core DeFi capabilities and onboarding the first wave of liquidity providers and yield farmers.',
    status: 'completed',
    milestones: [
      'Yield farming pools live',
      'Cross-chain bridge beta (ETH ↔ BNB)',
      '10,000 active wallets milestone',
      'CertiK audit completed — Score 94/100',
    ],
  },
  {
    quarter: 'Q3 2025',
    phase: 'Expansion',
    description: 'Decentralizing governance and expanding to mobile users while deepening cross-chain capabilities.',
    status: 'completed',
    milestones: [
      'On-chain governance launched',
      'Mobile app (iOS & Android) released',
      'Avalanche & Solana bridge support',
      '$50M TVL milestone reached',
    ],
  },
  {
    quarter: 'Q4 2025',
    phase: 'Scale',
    description: 'Hitting major growth milestones and forming strategic partnerships with institutional players.',
    status: 'active',
    milestones: [
      '$100M TVL target',
      'Institutional partnership program',
      'V2 protocol upgrade proposal',
      'Hacken audit initiated',
    ],
  },
  {
    quarter: 'Q1 2026',
    phase: 'Acceleration',
    description: 'Integrating Layer 2 solutions and AI-powered tooling to supercharge yield optimization for all users.',
    status: 'upcoming',
    milestones: [
      'Layer 2 integration (Arbitrum + Base)',
      'AI yield optimization engine',
      '100,000 active users target',
      'Derivatives market beta launch',
    ],
  },
  {
    quarter: 'Q2 2026',
    phase: 'Vision',
    description: 'Achieving full cross-chain autonomy and positioning Velar as a global DeFi infrastructure layer.',
    status: 'upcoming',
    milestones: [
      'Cross-chain governance system',
      'Derivatives market full launch',
      'Global institutional expansion',
      'Velar V3 whitepaper release',
    ],
  },
]

export default function RoadmapSection() {
  const sectionRef = useRef()
  const headerRef = useRef()
  const labelRef = useRef()
  const titleRef = useRef()
  const lineRef = useRef()
  const lineProgressRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ─── Header animations ────────────────────────
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

      // ─── Scroll-driven line progress ──────────────
      gsap.fromTo(
        lineProgressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="roadmap"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
      style={{ background: '#030712' }}
    >
      {/* ─── Background glow ──────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 30%, rgba(0,245,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(168,85,247,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

        {/* ─── Section header ───────────────────────── */}
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center gap-5 mb-16 lg:mb-24"
        >
          <div ref={labelRef} className="flex items-center gap-3 opacity-0">
            <span className="w-8 h-px bg-[#ec4899]" />
            <span
              className="text-[#ec4899] text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.3em' }}
            >
              Roadmap
            </span>
            <span className="w-8 h-px bg-[#ec4899]" />
          </div>

          <h2
            ref={titleRef}
            className="text-white font-black leading-tight opacity-0"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
            }}
          >
            Building the{' '}
            <span className="gradient-text">Future of DeFi</span>
          </h2>

          <p
            className="text-slate-500 max-w-lg text-center"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1rem',
              letterSpacing: '0.03em',
            }}
          >
            A clear path from protocol launch to becoming the
            premier cross-chain DeFi infrastructure layer.
          </p>
        </div>

        {/* ─── Timeline ─────────────────────────────── */}
        <div className="relative">

          {/* ─── Center vertical line ─────────────── */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            {/* Animated progress fill */}
            <div
              ref={lineProgressRef}
              className="absolute top-0 left-0 right-0 origin-top"
              style={{
                height: '100%',
                background:
                  'linear-gradient(180deg, #00f5ff, #a855f7, #ec4899)',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {/* ─── Mobile left line ─────────────────── */}
          <div
            className="lg:hidden absolute left-2 top-0 bottom-0 w-px"
            style={{
              background:
                'linear-gradient(180deg, #00f5ff, #a855f7, #ec4899)',
            }}
          />

          {/* ─── Cards ────────────────────────────── */}
          <div className="flex flex-col gap-12 lg:gap-16 pl-8 lg:pl-0">
            {roadmap.map((item, i) => (
              <RoadmapCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* ─── Bottom CTA ───────────────────────────── */}
        <div className="flex flex-col items-center gap-4 mt-20">
          <div
            className="w-px h-12"
            style={{
              background: 'linear-gradient(180deg, #ec4899, transparent)',
            }}
          />
          <div
            className="px-6 py-3 rounded-full text-sm font-bold tracking-wider"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              background: 'rgba(236,72,153,0.08)',
              border: '1px solid rgba(236,72,153,0.2)',
              color: '#ec4899',
              letterSpacing: '0.15em',
            }}
          >
            More milestones coming — stay tuned
          </div>
        </div>

      </div>
    </section>
  )
}