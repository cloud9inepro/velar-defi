import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { siteConfig } from '../../config/siteConfig'
import WalletModal from './WalletModal'

export default function HeroCTA() {
  const primaryRef = useRef()
  const secondaryRef = useRef()
  const [modalOpen, setModalOpen] = useState(false)

  // ─── Entrance animation ──────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      [primaryRef.current, secondaryRef.current],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 1.4,
      }
    )
  }, [])

  return (
    <>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

        {/* ─── Primary CTA — Connect Wallet ─────────────── */}
        <button
          ref={primaryRef}
          onClick={() => setModalOpen(true)}
          data-cursor-hover
          className="relative group opacity-0 overflow-hidden rounded-lg px-8 py-4 text-sm font-bold tracking-widest uppercase w-full sm:w-auto"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            background: 'linear-gradient(135deg, #00f5ff22, #a855f722)',
            border: '1px solid rgba(0, 245, 255, 0.5)',
            letterSpacing: '0.15em',
          }}
        >
          {/* Animated background fill on hover */}
          <span
            className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
            style={{
              background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
            }}
          />

          {/* Pulse ring */}
          <span
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 btn-pulse"
            style={{
              boxShadow: '0 0 20px rgba(0,245,255,0.4), 0 0 40px rgba(0,245,255,0.2)',
            }}
          />

          {/* Label */}
          <span className="relative z-10 flex items-center justify-center gap-2 text-[#00f5ff] group-hover:text-[#030712] transition-colors duration-300">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            {siteConfig.cta.primary}
          </span>
        </button>

        {/* ─── Secondary CTA — Whitepaper ───────────────── */}
        <a
          ref={secondaryRef}
          href={siteConfig.cta.whitepaperUrl}
          data-cursor-hover
          className="relative group opacity-0 rounded-lg px-8 py-4 text-sm font-bold tracking-widest uppercase w-full sm:w-auto text-center overflow-hidden"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            letterSpacing: '0.15em',
            color: 'rgba(168, 85, 247, 0.8)',
          }}
        >
          {/* Shimmer effect on hover */}
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(168,85,247,0.15), transparent)',
            }}
          />

          {/* Label */}
          <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-[#a855f7] transition-colors duration-300">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            {siteConfig.cta.secondary}
          </span>
        </a>
      </div>

      {/* ─── Wallet Modal ──────────────────────────────────── */}
      <WalletModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}