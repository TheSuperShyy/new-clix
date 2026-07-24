import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const SENTENCE =
  '90% of teams that try Clix run their entire workday on it within weeks.'

// Reuse clips already warmed by the hero so this section costs no extra bytes.
const VIDEOS = [
  'https://videos.pexels.com/video-files/6153468/6153468-hd_2048_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/5028622/5028622-hd_1920_1080_25fps.mp4',
]

const ROTATE_MS = 9000

// Detection-style overlay markers (percent positions inside the media card).
const TAGS = [
  { top: 14, left: 10, size: 26 },
  { top: 30, left: 74, size: 32 },
  { top: 58, left: 22, size: 24 },
  { top: 72, left: 60, size: 28 },
  { top: 42, left: 44, size: 20 },
]

export default function Proof() {
  const root = useRef(null)
  const videoRefs = useRef([])
  const [active, setActive] = useState(0)
  const words = SENTENCE.split(' ')

  const ensureLoaded = (i) => {
    const el = videoRefs.current[i]
    if (el && !el.src) {
      el.src = VIDEOS[i]
      el.load()
    }
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ensureLoaded(0)
      return
    }
    ensureLoaded(0)
    videoRefs.current[0]?.play().catch(() => {})
    const timer = setInterval(() => {
      setActive((cur) => (cur + 1) % VIDEOS.length)
    }, ROTATE_MS)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    ensureLoaded(active)
    videoRefs.current[active]?.play().catch(() => {})
    const pause = setTimeout(() => {
      videoRefs.current.forEach((el, i) => {
        if (el && i !== active) el.pause()
      })
    }, 1200)
    return () => clearTimeout(pause)
  }, [active])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1001px) and (prefers-reduced-motion: no-preference)', () => {
        // The section arrives plain (every word dim), sticks to the top,
        // and only releases once the whole sentence has been revealed.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=180%',
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Words brighten one after another while the section is pinned.
        // They finish within the first ~44% of the pin, before the next
        // section's light sheet (margin-top overlap) rises over the text.
        tl.fromTo(
          '.proof-word',
          { opacity: 0.16 },
          { opacity: 1, ease: 'none', stagger: 0.17, duration: 0.6 },
          0,
        )

        // Long hold with the sentence fully lit while the sheet slides over.
        tl.to({}, { duration: 3.36 })

        // Media card rides upward while pinned. CSS anchors it to the card's
        // bottom edge, so it only ever moves up by (card - media) height:
        // flush with the bottom at the start, flush with the top at the end.
        const travel = () => {
          const stage = root.current?.querySelector('.proof-stage')
          const media = root.current?.querySelector('.proof-media')
          if (!stage || !media) return 0
          return Math.max(0, stage.offsetHeight - media.offsetHeight)
        }
        tl.fromTo(
          '.proof-media',
          { y: 0 },
          {
            y: () => -travel(),
            ease: 'none',
            duration: tl.duration(),
          },
          0,
        )
      })

      // Mobile/tablet: no pin. Static stacked layout (media above the card),
      // sentence shown fully lit so nothing depends on the scrub.
      mm.add('(max-width: 1000px)', () => {
        gsap.set('.proof-word', { opacity: 1 })
        gsap.set('.proof-media', { clearProps: 'transform' })
      })

      mm.add('(min-width: 1001px) and (prefers-reduced-motion: reduce)', () => {
        gsap.set('.proof-word', { opacity: 1 })
      })
    },
    { scope: root },
  )

  return (
    <section className="proof" ref={root}>
      <div className="proof-stage">
        <div className="proof-media" aria-hidden="true">
          {VIDEOS.map((src, i) => (
            <video
              key={src}
              ref={(el) => (videoRefs.current[i] = el)}
              className={`proof-clip ${i === active ? 'is-active' : ''}`}
              muted
              loop
              playsInline
              preload="none"
              tabIndex={-1}
            />
          ))}
          {TAGS.map((t, i) => (
            <span
              key={i}
              className="proof-tag"
              style={{
                top: `${t.top}%`,
                left: `${t.left}%`,
                width: t.size,
                height: t.size,
                animationDelay: `${i * 0.7}s`,
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 4 14 8-14 8V4Z" />
              </svg>
            </span>
          ))}
        </div>

        <div className="proof-card">
          <h2 className="proof-title" aria-label={SENTENCE}>
            <span aria-hidden="true">
              {words.map((w, i) => (
                <span className="proof-word" key={i}>
                  {w}{' '}
                </span>
              ))}
            </span>
          </h2>
        </div>
      </div>
    </section>
  )
}
