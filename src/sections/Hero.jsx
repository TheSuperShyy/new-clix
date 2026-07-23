import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Local hero clips (public/hero). Each holds for 1.5s, then crossfades to the
// next; the whole set loops. Every clip also has the `loop` attribute so a
// clip shorter than 1.5s keeps playing rather than freezing.
const VIDEOS = [
  { id: 'human-ai', src: '/hero/hero-human-ai.mp4', label: 'Human + AI' },
  { id: 'eye', src: '/hero/hero-eye.mp4', label: 'Perception' },
  { id: 'socials', src: '/hero/hero-socials.mp4', label: 'Social' },
]

const ROTATE_MS = 1500

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const videoRefs = useRef([])

  // Files are small and local — keep all clips playing so each 1.5s crossfade
  // is instant with no load stutter. Only the opacity (via `active`) changes.
  useEffect(() => {
    if (prefersReducedMotion) return

    videoRefs.current.forEach((el) => el?.play().catch(() => {}))
    const timer = setInterval(() => {
      setActive((cur) => (cur + 1) % VIDEOS.length)
    }, ROTATE_MS)
    return () => clearInterval(timer)
  }, [prefersReducedMotion])

  return (
    <section className="hero hero-video" id="top">
      <div className="hero-frame">
        <div className="hero-media" aria-hidden="true">
          {VIDEOS.map((v, i) => (
            <video
              key={v.id}
              ref={(el) => (videoRefs.current[i] = el)}
              className={`hero-clip ${i === active ? 'is-active' : ''}`}
              src={v.src}
              muted
              loop
              playsInline
              preload="auto"
              tabIndex={-1}
            />
          ))}
          <div className="hero-overlay" />
        </div>

        <div className="hero-inner-video">
          <motion.h1
            className="hero-title-video"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            The world&rsquo;s hardest problems
            <br className="hero-br" />
            deserve AI that delivers.
          </motion.h1>
        </div>

        <motion.div
          className="hero-foot"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a href="#signal" className="scroll-explore">
            <span>Scroll to explore</span>
            <span className="scroll-explore-btn" aria-hidden="true">
              ↓
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
