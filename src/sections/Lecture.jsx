import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Founder lecture preview. The clip loops muted as an ambient preview; a tap
// unmutes it so Ido's talk plays with sound (browsers block autoplay-with-audio,
// so sound is always user-initiated). 16:9 source in /public/lecture.
export default function Lecture() {
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  const toggleSound = () => {
    const el = videoRef.current
    if (!el) return
    const next = !muted
    el.muted = next
    if (!next) el.play().catch(() => {})
    setMuted(next)
  }

  return (
    <section className="section lecture" id="lecture">
      <div className="container lecture-grid">
        <motion.div
          className="lecture-copy"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">From the founder</span>
          <h2 className="section-title">
            Operational AI, <span className="accent">taught first-hand</span>
          </h2>
          <p className="section-sub">
            Ido breaks down how real teams put AI to work — the systems, the
            trade-offs, and the practical playbook behind every Clix build.
          </p>
        </motion.div>

        <motion.div
          className="lecture-stage"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="lecture-frame">
            <video
              ref={videoRef}
              className="lecture-video"
              src="/lecture/lecture-preview.mp4"
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
            />
            <button
              type="button"
              className="lecture-sound"
              onClick={toggleSound}
              aria-label={muted ? 'Unmute lecture' : 'Mute lecture'}
              aria-pressed={!muted}
            >
              {muted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
                  <path d="M17 9l4 4m0-4l-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
                  <path d="M16.5 8.5a5 5 0 0 1 0 7M18.8 6a8 8 0 0 1 0 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              )}
              <span>{muted ? 'Play with sound' : 'Mute'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
