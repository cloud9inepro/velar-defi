import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { walletIcons, FallbackWalletIcon } from '../../constants/icons'
import { siteConfig } from '../../config/siteConfig'

export default function WalletModal({ isOpen, onClose }) {
  const overlayRef = useRef()
  const modalRef = useRef()
  const itemsRef = useRef([])

  // ─── Open / close animation ──────────────────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
      )
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.2,
        }
      )
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ─── Close on escape key ─────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(3, 7, 18, 0.85)', backdropFilter: 'blur(8px)' }}
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-2xl p-6 md:p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(15,10,30,0.95), rgba(10,1,24,0.98))',
          border: '1px solid rgba(168, 85, 247, 0.25)',
          boxShadow: '0 0 60px rgba(168,85,247,0.15), 0 0 120px rgba(0,245,255,0.05)',
        }}
      >
        {/* ─── Header ───────────────────────────────────── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-white font-bold text-xl"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Connect Wallet
            </h2>
            <p
              className="text-slate-500 text-xs mt-1 tracking-wider"
              style={{ fontFamily: 'Rajdhani, sans-serif' }}
            >
              Choose your preferred wallet to continue
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            data-cursor-hover
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ─── Wallet list ──────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {siteConfig.wallets.map((wallet, i) => {
            const Icon = walletIcons[wallet.name] || FallbackWalletIcon

            return (
              <button
                key={wallet.name}
                ref={(el) => (itemsRef.current[i] = el)}
                data-cursor-hover
                onClick={() => console.log(`Connecting to ${wallet.name}...`)}
                className="group relative flex items-center gap-4 w-full rounded-xl px-5 py-4 opacity-0 transition-all duration-300 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    borderColor: 'rgba(0,245,255,0.3)',
                    backgroundColor: 'rgba(0,245,255,0.05)',
                    duration: 0.3,
                  })
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    borderColor: 'rgba(255,255,255,0.06)',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    duration: 0.3,
                  })
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(0,245,255,0.08)',
                    border: '1px solid rgba(0,245,255,0.15)',
                  }}
                >
                  <Icon
                    size={20}
                    className="text-[#00f5ff] group-hover:scale-110 transition-transform duration-200"
                  />
                </div>

                {/* Name */}
                <span
                  className="text-slate-300 group-hover:text-white font-medium transition-colors duration-200"
                  style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', letterSpacing: '0.05em' }}
                >
                  {wallet.name}
                </span>

                {/* Arrow */}
                <svg
                  className="w-4 h-4 text-slate-600 group-hover:text-[#00f5ff] ml-auto transition-all duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )
          })}
        </div>

        {/* ─── Footer note ──────────────────────────────── */}
        <p
          className="text-slate-600 text-xs text-center mt-6 leading-relaxed"
          style={{ fontFamily: 'Rajdhani, sans-serif' }}
        >
          By connecting, you agree to our{' '}
          <a href="#" className="text-[#a855f7] hover:text-[#00f5ff] transition-colors duration-200">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-[#a855f7] hover:text-[#00f5ff] transition-colors duration-200">
            Privacy Policy
          </a>
        </p>

        {/* ─── Corner glow decorations ──────────────────── */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-24 h-24 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)',
            transform: 'translate(-30%, 30%)',
          }}
        />
      </div>
    </div>
  )
}