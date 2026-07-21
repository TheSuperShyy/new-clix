import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

// Rotating industry words, each with its own accent color on the light band.
const PHASES = [
  { word: 'Healthcare', color: '#0f766e' },
  { word: 'Finance', color: '#15803d' },
  { word: 'Logistics', color: '#b45309' },
  { word: 'Manufacturing', color: '#1d4ed8' },
]

const HEADLINE = `Applied intelligence. Real ${PHASES.map((p) => p.word).join(', ')}.`

// Scattered thumbnails (Pexels stills). Percent positions inside the stage,
// px widths, per-card aspect + upward drift speed. `sm` cards hide on phones.
const CARDS = [
  { id: 3861969, top: 4, left: 30, w: 110, ar: '4 / 3', speed: 1.2 },
  { id: 3862130, top: 9, left: 56, w: 76, ar: '1 / 1', speed: 0.7, sm: true },
  { id: 1181671, top: 6, left: 74, w: 64, ar: '1 / 1', speed: 1.5, sm: true },
  { id: 3184465, top: 24, left: 84, w: 96, ar: '4 / 3', speed: 0.9 },
  { id: 3183197, top: 30, left: 6, w: 150, ar: '4 / 3', speed: 1.0 },
  { id: 356040, top: 27, left: 26, w: 92, ar: '3 / 4', speed: 1.6, sm: true },
  { id: 4386466, top: 52, left: 78, w: 60, ar: '1 / 1', speed: 1.3 },
  { id: 4481259, top: 58, left: 14, w: 118, ar: '1 / 1', speed: 0.8 },
  { id: 3183150, top: 74, left: 30, w: 140, ar: '4 / 3', speed: 1.1 },
  { id: 8386440, top: 70, left: 62, w: 100, ar: '3 / 4', speed: 0.6 },
  { id: 3184292, top: 82, left: 48, w: 88, ar: '4 / 3', speed: 1.4, sm: true },
  { id: 1181244, top: 62, left: 90, w: 72, ar: '3 / 4', speed: 1.0, sm: true },
]

const imgSrc = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=480`

export default function Impact() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // While the sheet rises over the pinned section it is inset from the
        // sides with rounded corners, then grows to full-bleed as it reaches
        // the top of the viewport (clip-path: paints only, no layout shift).
        gsap.fromTo(
          '.impact',
          { clipPath: 'inset(0px 28px 0px 28px round 28px 28px 0px 0px)' },
          {
            clipPath: 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )

        const phrases = gsap.utils.toArray('.impact-phrase')

        // Only the first phrase is visible before the pin starts.
        gsap.set(phrases.slice(1), { autoAlpha: 0, yPercent: 60 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=260%',
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Thumbnails stay visible while the sheet rides up over the previous
        // section, so there is no entrance tween — they only drift (below).

        // Cycle the headline: hold, then swap to the next phrase.
        phrases.forEach((phrase, i) => {
          tl.to({}, { duration: 1.2 })
          if (i < phrases.length - 1) {
            tl.to(phrase, {
              yPercent: -60,
              autoAlpha: 0,
              duration: 0.8,
              ease: 'none',
            })
            tl.to(
              phrases[i + 1],
              { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'none' },
              '<',
            )
          }
        })

        // Every thumbnail drifts upward for the whole pin, each at its own pace.
        tl.fromTo(
          '.impact-card',
          { y: 0 },
          {
            y: (i, el) => -(parseFloat(el.dataset.speed) * 150),
            ease: 'none',
            duration: tl.duration(),
          },
          0,
        )
      })
    },
    { scope: root },
  )

  return (
    <section className="impact" ref={root}>
      <div className="impact-stage">
        {CARDS.map((c, i) => (
          // Wrapper owns position + the GSAP scroll drift (transform); the
          // inner img owns the CSS orbit animation — separate transforms, no
          // conflict between the two.
          <div
            key={c.id}
            className={`impact-card ${c.sm ? 'impact-card-sm' : ''}`}
            aria-hidden="true"
            data-speed={c.speed}
            style={{
              top: `${c.top}%`,
              left: `${c.left}%`,
              width: c.w,
              aspectRatio: c.ar,
            }}
          >
            <img
              className="impact-card-img"
              src={imgSrc(c.id)}
              alt=""
              loading="lazy"
              style={{
                '--orbit-r': `${5 + (i % 3) * 2}px`,
                '--orbit-t': `${11 + (i % 5) * 2.5}s`,
                animationDelay: `${-(i * 1.9)}s`,
                animationDirection: i % 2 ? 'reverse' : 'normal',
              }}
            />
          </div>
        ))}

        <div className="impact-center">
          <h2 className="impact-title" aria-label={HEADLINE}>
            <span aria-hidden="true">
              <span className="impact-line1">Applied Intelligence</span>
              <span className="impact-line2">
                {PHASES.map((p) => (
                  <span className="impact-phrase" key={p.word}>
                    Real <em style={{ color: p.color }}>{p.word}</em>
                  </span>
                ))}
              </span>
            </span>
          </h2>
          <a href="#cta" className="impact-cta">
            Get started
          </a>
        </div>
      </div>
    </section>
  )
}
