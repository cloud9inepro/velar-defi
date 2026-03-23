import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/hero/HeroSection'

function App() {
  // ─── Lenis Smooth Scroll ────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <main className="relative min-h-screen bg-[#030712] overflow-x-hidden pl-0">
      <Navbar />
      <HeroSection />
      {/* More sections will be added here later */}
    </main>
  )
}

export default App