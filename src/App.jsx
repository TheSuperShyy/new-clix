import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './lib/gsap'
import Navbar from './sections/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import Signal from './sections/Signal.jsx'
import Proof from './sections/Proof.jsx'
import Impact from './sections/Impact.jsx'
import Testimonials from './sections/Testimonials.jsx'
import VideoTestimonials from './sections/VideoTestimonials.jsx'
import Benchmark from './sections/Benchmark.jsx'
import Lecture from './sections/Lecture.jsx'
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

  // ---- Whole-page stacked-sticky effect ----
  // Each screen-sized section sticks to the top while the next section scrolls
  // up and overlaps it (the "stacking cards" scroll effect). Sections taller
  // than one screen — and the ones that run their own pinned/scrubbed GSAP
  // timelines — are left in normal flow so none of their content is hidden;
  // the next sticky section still slides over them, so the stack reads all the
  // way down. Disabled entirely for reduced-motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // These own bespoke scroll animations (pin / scrub / clip-path); leave them
    // alone so the sticky logic never fights their triggers.
    const EXCLUDE = ['signal', 'proof', 'impact', 'benchmark', 'stories']
    const sections = Array.from(document.querySelectorAll('main > section'))

    const apply = () => {
      const vh = window.innerHeight
      sections.forEach((s) => {
        const excluded = EXCLUDE.some((c) => s.classList.contains(c) || s.id === c)
        // scrollHeight includes any GSAP pin-spacer, so tall/pinned sections
        // measure large and stay in normal flow.
        const fits = s.scrollHeight <= vh * 1.05
        s.classList.toggle('is-stack', !excluded && fits)
      })
      ScrollTrigger.refresh()
    }

    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
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
        <Benchmark />
        <Lecture />
        <VideoTestimonials />
      </main>
      <Footer />
    </>
  )
}
