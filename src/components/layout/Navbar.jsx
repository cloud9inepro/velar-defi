import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { FaTwitter, FaDiscord, FaTelegram } from 'react-icons/fa'
import { siteConfig } from '../../config/siteConfig'

const socialIconMap = {
  twitter: FaTwitter,
  discord: FaDiscord,
  telegram: FaTelegram,
}

export default function Navbar() {
  const navRef = useRef()
  const logoRef = useRef()
  const linksRef = useRef([])
  const socialsRef = useRef([])
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileMenuRef = useRef()

  // ─── Entrance animation ────────────────────────────────
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 }
    )
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', delay: 0.5 }
    )
    gsap.fromTo(
      linksRef.current,
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.6,
      }
    )
    gsap.fromTo(
      socialsRef.current,
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.7,
      }
    )
  }, [])

  // ─── Scroll glass effect ───────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ─── Mobile menu animation ─────────────────────────────
  useEffect(() => {
    if (!mobileMenuRef.current) return
    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -10, height: 0 },
        { opacity: 1, y: 0, height: 'auto', duration: 0.4, ease: 'power3.out' }
      )
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -10,
        height: 0,
        duration: 0.3,
        ease: 'power3.in',
      })
    }
  }, [mobileOpen])

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-40 opacity-0"
    >
      {/* ─── Main nav bar ─────────────────────────────── */}
      <nav
        className="mx-4 md:mx-8 mt-4 rounded-2xl px-6 py-4 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(10, 1, 24, 0.85)'
            : 'rgba(10, 1, 24, 0.4)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: scrolled
            ? '1px solid rgba(168, 85, 247, 0.2)'
            : '1px solid rgba(255,255,255,0.05)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,245,255,0.05)'
            : 'none',
        }}
      >
        <div className="flex items-center justify-between">

          {/* ─── Logo ───────────────────────────────────── */}
          <a
            ref={logoRef}
            href="/"
            data-cursor-hover
            className="flex items-center gap-2 opacity-0 group"
          >
            {/* Logo mark */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #00f5ff22, #a855f722)',
                border: '1px solid rgba(0,245,255,0.3)',
              }}
            >
              <span
                className="text-xs font-black gradient-text"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {siteConfig.name.charAt(0)}
              </span>
              {/* Shimmer */}
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.15), transparent)',
                }}
              />
            </div>

            {/* Logo text */}
            <span
              className="text-white font-bold text-lg tracking-wide"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {siteConfig.name}
              <span className="gradient-text">.</span>
            </span>
          </a>

          {/* ─── Desktop nav links ───────────────────────── */}
          <ul className="hidden md:flex items-center gap-8">
            {siteConfig.nav.map((item, i) => (
              <li key={item.label}>
                <a
                  ref={(el) => (linksRef.current[i] = el)}
                  href={item.href}
                  data-cursor-hover
                  className="relative text-slate-400 hover:text-white text-sm font-medium tracking-wider transition-colors duration-200 opacity-0 group"
                  style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}
                >
                  {item.label}
                  {/* Underline */}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg, #00f5ff, #a855f7)' }}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* ─── Right side — socials + launch app ──────── */}
          <div className="hidden md:flex items-center gap-4">
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {Object.entries(siteConfig.socials).map(([key, url], i) => {
                const Icon = socialIconMap[key]
                if (!Icon) return null
                return (
                  <a
                    key={key}
                    ref={(el) => (socialsRef.current[i] = el)}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="opacity-0 text-slate-500 hover:text-[#00f5ff] transition-colors duration-200"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>

            {/* Divider */}
            <div
              className="w-px h-4"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            />

            {/* Launch App button */}
            <button
              data-cursor-hover
              className="relative group rounded-lg px-5 py-2 text-xs font-bold tracking-widest uppercase overflow-hidden"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
                letterSpacing: '0.15em',
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, #a855f7, #00f5ff)',
                }}
              />
              <span className="relative z-10 text-[#030712]">Launch App</span>
            </button>
          </div>

          {/* ─── Mobile hamburger ────────────────────────── */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-cursor-hover
          >
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: 'linear-gradient(90deg, #00f5ff, #a855f7)',
                transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }}
            />
            <span
              className="block w-4 h-px transition-all duration-300"
              style={{
                background: '#a855f7',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                background: 'linear-gradient(90deg, #a855f7, #00f5ff)',
                transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* ─── Mobile menu ──────────────────────────────────── */}
      <div
        ref={mobileMenuRef}
        className="md:hidden mx-4 overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div
          className="rounded-b-2xl px-6 py-6 flex flex-col gap-6"
          style={{
            background: 'rgba(10, 1, 24, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(168,85,247,0.15)',
            borderTop: 'none',
          }}
        >
          {/* Mobile links */}
          <ul className="flex flex-col gap-4">
            {siteConfig.nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-300 hover:text-white text-sm font-medium tracking-wider transition-colors duration-200 flex items-center gap-2 group"
                  style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}
                >
                  <span
                    className="w-4 h-px group-hover:w-8 transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg, #00f5ff, #a855f7)' }}
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile socials + CTA */}
          <div className="flex items-center justify-between pt-2"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-4">
              {Object.entries(siteConfig.socials).map(([key, url]) => {
                const Icon = socialIconMap[key]
                if (!Icon) return null
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-[#00f5ff] transition-colors duration-200"
                  >
                    <Icon size={16} />
                  </a>
                )
              })}
            </div>

            <button
              data-cursor-hover
              className="rounded-lg px-5 py-2 text-xs font-bold tracking-widest uppercase"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
                letterSpacing: '0.15em',
                color: '#030712',
              }}
            >
              Launch App
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}