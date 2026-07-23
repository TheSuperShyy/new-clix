import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Real Clix client testimonials — vertical (9:16) clips recorded by the clients
// themselves. Each card sits behind a poster frame with preload off, so nothing
// downloads until someone taps play. Tapping plays that clip with sound and
// pauses whichever one was already running, so only one voice is ever heard.
// Sources live in /public/testimonials.
const CLIENTS = [
  { id: 'adir-peretz', name: 'Adir Peretz' },
  { id: 'asaf-peretz', name: 'Asaf Peretz' },
  { id: 'achituv-review', name: 'Achituv' },
  { id: 'nevo-yahaloman', name: 'Nevo Yahaloman' },
  { id: 'noam-tovi', name: 'Noam Tovi' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const card = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export default function VideoTestimonials() {
  const prefersReducedMotion = useReducedMotion()
  const videoRefs = useRef([])
  const [playing, setPlaying] = useState(null)

  const play = (index) => {
    const next = videoRefs.current[index]
    if (!next) return

    // Pause and reset whichever clip is currently running.
    if (playing !== null && playing !== index) {
      const prev = videoRefs.current[playing]
      if (prev) prev.pause()
    }

    next.muted = false
    next.play().catch(() => {})
    setPlaying(index)
  }

  const pause = (index) => {
    const el = videoRefs.current[index]
    if (el) el.pause()
    setPlaying(null)
  }

  return (
    <section className="section vtm" id="stories">
      <div className="container">
        <span className="section-label">Client stories</span>
        <h2 className="section-title">
          Teams that build with Clix, <span className="accent">in their own words</span>
        </h2>
        <p className="section-sub">
          No scripts, no filters. Hear it straight from the founders and
          operators who put Clix to work.
        </p>

        <motion.div
          className="vtm-grid"
          variants={prefersReducedMotion ? undefined : container}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.2 }}
        >
          {CLIENTS.map((c, i) => {
            const isPlaying = playing === i
            return (
              <motion.article
                className={`vtm-card${isPlaying ? ' is-playing' : ''}`}
                key={c.id}
                variants={prefersReducedMotion ? undefined : card}
              >
                <div className="vtm-frame">
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    className="vtm-video"
                    src={`/testimonials/${c.id}.mp4`}
                    poster={`/testimonials/posters/${c.id}.jpg`}
                    preload="none"
                    playsInline
                    onEnded={() => setPlaying(null)}
                    onClick={() => (isPlaying ? pause(i) : play(i))}
                  />
                  <button
                    type="button"
                    className="vtm-play"
                    onClick={() => (isPlaying ? pause(i) : play(i))}
                    aria-label={`${isPlaying ? 'Pause' : 'Play'} ${c.name}'s testimonial`}
                    aria-pressed={isPlaying}
                  >
                    {isPlaying ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <rect x="6" y="5" width="4" height="14" rx="1" />
                        <rect x="14" y="5" width="4" height="14" rx="1" />
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
                      </svg>
                    )}
                  </button>
                  <div className="vtm-caption">
                    <span className="vtm-name">{c.name}</span>
                    <span className="vtm-tag">Clix client</span>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
