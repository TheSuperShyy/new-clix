import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './lib/gsap'
import Navbar from './sections/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import Signal from './sections/Signal.jsx'
import Proof from './sections/Proof.jsx'
import Impact from './sections/Impact.jsx'
import Testimonials from './sections/Testimonials.jsx'
import Products from './sections/Products.jsx'
import Stats from './sections/Stats.jsx'
import Solutions from './sections/Solutions.jsx'
import Research from './sections/Research.jsx'
import CTA from './sections/CTA.jsx'
import Footer from './sections/Footer.jsx'

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.12 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Signal />
        <Proof />
        <Impact />
        <Testimonials />
        <Products />
        <Stats />
        <Solutions />
        <Research />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
