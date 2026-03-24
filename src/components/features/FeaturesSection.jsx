import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MdFlashOn } from 'react-icons/md'
import { RiShieldKeyholeFill } from 'react-icons/ri'
import { TbArrowsExchange } from 'react-icons/tb'
import { GiWheat } from 'react-icons/gi'
import FeatureCard from './FeatureCard'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    label: 'Feature 01',
    title: 'Lightning Fast Swaps',
    description:
      'Execute token swaps in milliseconds with our optimized AMM engine. Zero slippage on major pairs, powered by deep liquidity pools and intelligent routing across multiple DEXs.',
    bullets: [
      'Sub-second transaction finality',
      'Smart routing across 12+ liquidity sources',
      'Gas-optimized swap contracts',
    ],
    stat: '0.3s AVG SWAP TIME',
    icon: MdFlashOn,
    color: '#00f5ff',
  },
  {
    label: 'Feature 02',
    title: 'Secure Vaults',
    description:
      'Your assets protected by battle-tested smart contracts, multi-sig governance, and real-time on-chain monitoring. Audited by top-tier security firms with a $2B+ TVL track record.',
    bullets: [
      'Multi-sig vault protection',
      'Real-time threat monitoring',
      'CertiK & Hacken audited',
    ],
    stat: '$2B+ SECURED',
    icon: RiShieldKeyholeFill,
    color: '#a855f7',
  },
  {
    label: 'Feature 03',
    title: 'Cross-chain Bridge',
    description:
      'Move assets seamlessly across Ethereum, BNB Chain, Solana, Avalanche and more. Our trustless bridge protocol ensures atomic swaps with no custodial risk.',
    bullets: [
      'Support for 8+ EVM and non-EVM chains',
      'Trustless atomic swap mechanism',
      'Bridge insurance via decentralized pool',
    ],
    stat: '8+ CHAINS SUPPORTED',
    icon: TbArrowsExchange,
    color: '#ec4899',
  },
  {
    label: 'Feature 04',
    title: 'Yield Farming',
    description:
      'Put your assets to work with dynamic yield strategies. Our auto-compounding vaults continuously optimize your positions across protocols to maximize returns.',
    bullets: [
      'Auto-compounding every 4 hours',
      'Risk-adjusted strategy selection',
      'One-click entry and exit',
    ],
    stat: 'UP TO 94% APY',
    icon: GiWheat,
    color: '#f59e0b',
  },
]

export default function FeaturesSection() {
  const sectionRef = useRef()
  const headerRef = useRef()
  const labelRef = useRef()
  const titleRef = useRef()
  const lineRef = useRef()

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
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power3.inOut',
          delay: 0.3,
          scrollTrigger: {
            trigger: headerRef.current,
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
      id="features"
      className="relative w-full py-24 lg:py-32 overflow-hidden"
      style={{ background: '#030712' }}
    >
      {/* ─── Background glow ────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(168,85,247,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

        {/* ─── Section header ───────────────────────── */}
        <div ref={headerRef} className="flex flex-col items-center text-center gap-5 mb-20 lg:mb-28">
          <div ref={labelRef} className="flex items-center gap-3 opacity-0">
            <span className="w-8 h-px bg-[#00f5ff]" />
            <span
              className="text-[#00f5ff] text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.3em' }}
            >
              Why Velar
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
            Built for the{' '}
            <span className="gradient-text">Next Generation</span>
            <br />
            of DeFi
          </h2>

          <div
            ref={lineRef}
            className="w-24 h-px origin-center mt-2"
            style={{
              background: 'linear-gradient(90deg, #00f5ff, #a855f7)',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* ─── Feature cards ────────────────────────── */}
        <div className="flex flex-col">
          {features.map((feature, i) => (
            <div key={i}>
              <FeatureCard feature={feature} index={i} />
              {i < features.length - 1 && (
                <div
                  className="w-full h-px"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(168,85,247,0.2), rgba(0,245,255,0.2), transparent)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}