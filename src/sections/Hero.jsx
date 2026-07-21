import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Pexels stock videos — AI in real-world applications. Free license, hotlinked
// from the Pexels CDN at 1080p to keep the hero light. Ordered smallest-first
// so the first paint arrives fast.
const VIDEOS = [
  {
    id: 'robot',
    src: 'https://videos.pexels.com/video-files/8084614/8084614-hd_1920_1080_25fps.mp4',
    label: 'Robotics',
  },
  {
    id: 'robotic-arm',
    src: 'https://videos.pexels.com/video-files/6153468/6153468-hd_2048_1080_25fps.mp4',
    label: 'Human + Machine',
  },
  {
    id: 'humanoid',
    src: 'https://videos.pexels.com/video-files/5854603/5854603-hd_2048_1080_24fps.mp4',
    label: 'Autonomy',
  },
  {
    id: 'datacenter',
    src: 'https://videos.pexels.com/video-files/5028622/5028622-hd_1920_1080_25fps.mp4',
    label: 'Infrastructure',
  },
]

const ROTATE_MS = 8000

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const videoRefs = useRef([])

  // Attach src lazily so a clip only downloads when it's about to be shown.
  const ensureLoaded = (i) => {
    const el = videoRefs.current[i]
    if (el && !el.src) {
      el.src = VIDEOS[i].src
      el.load()
    }
  }

  useEffect(() => {
    ensureLoaded(0)
    if (prefersReducedMotion) return

    videoRefs.current[0]?.play().catch(() => {})
    const timer = setInterval(() => {
      setActive((cur) => (cur + 1) % VIDEOS.length)
    }, ROTATE_MS)
    return () => clearInterval(timer)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion) return
    ensureLoaded(active)
    ensureLoaded((active + 1) % VIDEOS.length)
    videoRefs.current[active]?.play().catch(() => {})

    // Pause the outgoing clip only after the crossfade finishes.
    const pause = setTimeout(() => {
      videoRefs.current.forEach((el, i) => {
        if (el && i !== active) el.pause()
      })
    }, 1400)
    return () => clearTimeout(pause)
  }, [active, prefersReducedMotion])

  return (
    <section className="hero hero-video" id="top">
      <div className="hero-frame">
        <div className="hero-media" aria-hidden="true">
          {VIDEOS.map((v, i) => (
            <video
              key={v.id}
              ref={(el) => (videoRefs.current[i] = el)}
              className={`hero-clip ${i === active ? 'is-active' : ''}`}
              muted
              loop
              playsInline
              preload="none"
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
