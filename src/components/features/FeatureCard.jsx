import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FeatureCard({ feature, index }) {
  const cardRef = useRef()
  const visualRef = useRef()
  const contentRef = useRef()
  const isEven = index % 2 === 0

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Visual slides in from its side
      gsap.fromTo(
        visualRef.current,
        {
          opacity: 0,
          x: isEven ? -80 : 80,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Content slides in from opposite side
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          x: isEven ? 80 : -80,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, cardRef)

    return () => ctx.revert()
  }, [isEven])

  return (
    <div
      ref={cardRef}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20 py-16 lg:py-24`}
    >
      {/* ─── Visual side ──────────────────────────────── */}
      <div
        ref={visualRef}
        className="w-full lg:w-1/2 flex items-center justify-center"
      >
        <div
          className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(15,10,30,0.8), rgba(10,1,24,0.9))',
            border: `1px solid ${feature.color}33`,
            boxShadow: `0 0 60px ${feature.color}15, inset 0 0 60px ${feature.color}08`,
          }}
        >
          {/* Corner accents */}
          <span
            className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-2xl"
            style={{ borderColor: feature.color }}
          />
          <span
            className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-2xl"
            style={{ borderColor: feature.color }}
          />
          <span
            className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-2xl"
            style={{ borderColor: feature.color }}
          />
          <span
            className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-2xl"
            style={{ borderColor: feature.color }}
          />

          {/* Glow rings */}
          <div
            className="absolute w-40 h-40 rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, ${feature.color} 0%, transparent 70%)`,
            }}
          />
          <div
            className="absolute w-56 h-56 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, ${feature.color} 0%, transparent 70%)`,
            }}
          />

          {/* Icon */}
          <div
            className="relative z-10 float"
            style={{
              filter: `drop-shadow(0 0 20px ${feature.color}) drop-shadow(0 0 40px ${feature.color}88)`,
            }}
          >
            <feature.icon size={80} color={feature.color} />
          </div>

          {/* Stat badge */}
          <div
            className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl"
            style={{
              background: 'rgba(10,1,24,0.95)',
              border: `1px solid ${feature.color}44`,
              boxShadow: `0 0 20px ${feature.color}22`,
            }}
          >
            <span
              className="text-xs font-bold tracking-wider"
              style={{
                fontFamily: 'Rajdhani, sans-serif',
                color: feature.color,
                letterSpacing: '0.1em',
              }}
            >
              {feature.stat}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Content side ─────────────────────────────── */}
      <div
        ref={contentRef}
        className="w-full lg:w-1/2 flex flex-col gap-6"
      >
        {/* Label */}
        <div className="flex items-center gap-3">
          <span
            className="w-8 h-px"
            style={{ background: feature.color }}
          />
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              color: feature.color,
              letterSpacing: '0.25em',
            }}
          >
            {feature.label}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-white font-black leading-tight"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
          }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p
          className="text-slate-400 leading-relaxed"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '1.05rem',
            letterSpacing: '0.03em',
          }}
        >
          {feature.description}
        </p>

        {/* Bullet points */}
        <ul className="flex flex-col gap-3 mt-2">
          {feature.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-slate-300 text-sm"
              style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.05em' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: feature.color }}
              />
              {bullet}
            </li>
          ))}
        </ul>

        {/* Learn more link */}
        <a
          href="#"
          data-cursor-hover
          className="group flex items-center gap-2 text-sm font-bold tracking-wider w-fit mt-2"
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            color: feature.color,
            letterSpacing: '0.15em',
          }}
        >
          Learn More
          <svg
            className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  )
}