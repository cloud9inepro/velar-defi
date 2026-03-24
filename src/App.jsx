import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/hero/HeroSection'
import FeaturesSection from './components/features/FeaturesSection'
import CalculatorSection from './components/calculator/CalculatorSection'
import TokenomicsSection from './components/tokenomics/TokenomicsSection'
import RoadmapSection from './components/roadmap/RoadmapSection'
import PartnersSection from './components/partners/PartnersSection'

function App() {
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

    return () => lenis.destroy()
  }, [])

  return (
    <main className="relative min-h-screen bg-[#030712] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CalculatorSection />
      <TokenomicsSection />
      <RoadmapSection />
      <PartnersSection />
    </main>
  )
}

export default App
