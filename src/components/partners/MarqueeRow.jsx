import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

const partners = [
  { name: 'Chainlink', icon: '⬡', color: '#375BD2' },
  { name: 'Uniswap', icon: '🦄', color: '#FF007A' },
  { name: 'Aave', icon: '👻', color: '#B6509E' },
  { name: 'Compound', icon: '⚗️', color: '#00D395' },
  { name: 'Binance', icon: '◈', color: '#F0B90B' },
  { name: 'Polygon', icon: '⬟', color: '#8247E5' },
  { name: 'Arbitrum', icon: '◎', color: '#28A0F0' },
  { name: 'Avalanche', icon: '▲', color: '#E84142' },
  { name: 'Solana', icon: '◉', color: '#9945FF' },
  { name: 'Cosmos', icon: '✦', color: '#2E3148' },
  { name: 'Optimism', icon: '⬤', color: '#FF0420' },
  { name: 'Base', icon: '◈', color: '#0052FF' },
]

function PartnerLogo({ partner }) {
  return (
    <div
      className="flex items-center gap-3 px-6 py-3 rounded-xl flex-shrink-0 group transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `${partner.color}12`
        e.currentTarget.style.borderColor = `${partner.color}33`
        e.currentTarget.style.boxShadow = `0 0 20px ${partner.color}15`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <span
        className="text-xl"
        style={{ filter: `drop-shadow(0 0 6px ${partner.color}88)` }}
      >
        {partner.icon}
      </span>
      <span
        className="text-sm font-bold text-slate-400 group-hover:text-white transition-colors duration-200 whitespace-nowrap"
        style={{
          fontFamily: 'Rajdhani, sans-serif',
          letterSpacing: '0.08em',
        }}
      >
        {partner.name}
      </span>
    </div>
  )
}

export default function MarqueeRow({ direction = 'left', speed = 30 }) {
  const trackRef = useRef()
  const animRef = useRef()

  // Duplicate for seamless loop
  const items = [...partners, ...partners, ...partners]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth / 3
    const sign = direction === 'left' ? '-' : '+'

    animRef.current = gsap.to(track, {
      x: `${sign}=${totalWidth}`,
      duration: speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const mod = totalWidth
          return direction === 'left'
            ? ((parseFloat(x) % -mod) - mod) % -mod
            : ((parseFloat(x) % mod) + mod) % mod
        }),
      },
    })

    // Pause on hover
    track.addEventListener('mouseenter', () => animRef.current?.pause())
    track.addEventListener('mouseleave', () => animRef.current?.resume())

    return () => {
      animRef.current?.kill()
    }
  }, [direction, speed])

  return (
    <div className="relative overflow-hidden">
      {/* Edge fade left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, #030712 0%, transparent 100%)',
        }}
      />

      {/* Edge fade right */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(270deg, #030712 0%, transparent 100%)',
        }}
      />

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-4 py-2"
        style={{ width: 'max-content' }}
      >
        {items.map((partner, i) => (
          <PartnerLogo key={i} partner={partner} />
        ))}
      </div>
    </div>
  )
}