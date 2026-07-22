import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap, useGSAP } from '../lib/gsap'

// Three product categories, each with its own accent color on the light band.
// The highlighted word follows whichever tile the user hovers (desktop).
const CATEGORIES = {
  web: { word: 'Websites', color: '#1d4ed8' },
  crm: { word: 'CRM', color: '#0f766e' },
  n8n: { word: 'Automation', color: '#b45309' },
}
const DEFAULT_CAT = 'web'

// Scattered video tiles (desktop). Percent positions inside the stage, px
// widths, per-card aspect. `cat` = product category (drives the highlighted
// word and which clip loops in the tile). `sm` cards hide on phones.
const CARDS = [
  { src: 'web1', top: 4, left: 30, w: 122, ar: '4 / 3', cat: 'web' },
  { src: 'crm1', top: 9, left: 57, w: 108, ar: '1 / 1', cat: 'crm', sm: true },
  { src: 'n8n1', top: 5, left: 75, w: 106, ar: '1 / 1', cat: 'n8n', sm: true },
  { src: 'crm2', top: 24, left: 84, w: 116, ar: '4 / 3', cat: 'crm' },
  { src: 'web2', top: 30, left: 5, w: 152, ar: '4 / 3', cat: 'web' },
  { src: 'n8n2', top: 14, left: 13, w: 108, ar: '3 / 4', cat: 'n8n', sm: true },
  { src: 'crm3', top: 50, left: 79, w: 110, ar: '1 / 1', cat: 'crm' },
  { src: 'n8n3', top: 58, left: 13, w: 128, ar: '1 / 1', cat: 'n8n' },
  { src: 'web3', top: 74, left: 29, w: 146, ar: '4 / 3', cat: 'web' },
  { src: 'crm4', top: 70, left: 62, w: 118, ar: '3 / 4', cat: 'crm' },
  { src: 'web4', top: 82, left: 47, w: 110, ar: '4 / 3', cat: 'web', sm: true },
  { src: 'n8n4', top: 61, left: 89, w: 108, ar: '3 / 4', cat: 'n8n', sm: true },
  { src: 'n8n5', top: 88, left: 18, w: 112, ar: '4 / 3', cat: 'n8n' },
]

// Compressed muted loops live in /public/impact (served at the site root).
const vidSrc = (name) => `/impact/${name}.mp4`

// Same clips grouped by category for the mobile carousels — every category
// gets its own labeled, swipeable row so all three are clearly represented.
const GROUPS = ['web', 'crm', 'n8n'].map((key) => ({
  key,
  ...CATEGORIES[key],
  items: CARDS.filter((c) => c.cat === key).map((c) => c.src),
}))

// True on phone-width viewports. Initialized from matchMedia (client-only SPA,
// no SSR) so we mount the right layout on the first paint — no flash.
function useIsMobile(query = '(max-width: 720px)') {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    setIsMobile(mq.matches)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return isMobile
}

export default function Impact() {
  const root = useRef(null)
  const isMobile = useIsMobile()
  // The highlighted category follows the hovered tile (desktop only).
  const [cat, setCat] = useState(DEFAULT_CAT)
  // The card currently shown as a big centered preview (null when none).
  const [preview, setPreview] = useState(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // While the sheet rises over the previous section it is inset from the
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
      })
    },
    { scope: root },
  )

  const active = CATEGORIES[cat]

  return (
    <section className="impact" ref={root}>
      {isMobile ? (
        // ---- Mobile: title + one labeled, swipeable row per category ----
        <div className="impact-mobile">
          <div className="impact-center impact-center-m">
            <h2 className="impact-title">
              <span className="impact-line1">Applied Intelligence</span>
              <span className="impact-line2">
                Real <em style={{ color: '#1d4ed8' }}>Solutions</em>
              </span>
            </h2>
            <a href="#cta" className="impact-cta">
              Get started
            </a>
          </div>

          {GROUPS.map((g) => (
            <div className="impact-cat" key={g.key} aria-label={g.word}>
              <div className="impact-cat-head">
                <span
                  className="impact-cat-dot"
                  style={{ background: g.color }}
                  aria-hidden="true"
                />
                <span className="impact-cat-name" style={{ color: g.color }}>
                  {g.word}
                </span>
              </div>
              <div className="impact-cat-row">
                {g.items.map((src) => (
                  <video
                    key={src}
                    className="impact-mvid"
                    src={vidSrc(src)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // ---- Desktop: scattered video tiles with a centered hover preview ----
        <div className="impact-stage">
          {CARDS.map((c, i) => (
            // Button so the tile is keyboard-focusable; hover/focus sets the
            // highlighted category. The wrapper owns position; the inner video
            // owns the CSS orbit animation (separate transforms, no conflict).
            <button
              type="button"
              key={c.src}
              className={`impact-card ${c.sm ? 'impact-card-sm' : ''}`}
              aria-label={`Highlight ${CATEGORIES[c.cat].word}`}
              onMouseEnter={() => {
                setCat(c.cat)
                setPreview(c)
              }}
              onFocus={() => {
                setCat(c.cat)
                setPreview(c)
              }}
              onMouseLeave={() => setPreview(null)}
              onBlur={() => setPreview(null)}
              style={{
                top: `${c.top}%`,
                left: `${c.left}%`,
                width: c.w,
                aspectRatio: c.ar,
              }}
            >
              <video
                className="impact-card-img"
                src={vidSrc(c.src)}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                style={{
                  '--orbit-r': `${5 + (i % 3) * 2}px`,
                  '--orbit-t': `${11 + (i % 5) * 2.5}s`,
                  animationDelay: `${-(i * 1.9)}s`,
                  animationDirection: i % 2 ? 'reverse' : 'normal',
                }}
              />
            </button>
          ))}

          <div className="impact-center">
            <h2 className="impact-title">
              <span className="impact-line1">Applied Intelligence</span>
              <span className="impact-line2">
                Real <em style={{ color: active.color }}>{active.word}</em>
              </span>
            </h2>
            <a href="#cta" className="impact-cta">
              Get started
            </a>
          </div>

          {/* Big centered preview of the hovered tile (lightbox style). It sits
              above the scattered thumbnails and the title; pointer-events off so
              it never steals the hover from the card underneath. */}
          <AnimatePresence>
            {preview && (
              <motion.div
                className="impact-scrim"
                key="scrim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {preview && (
              <motion.div
                className="impact-preview"
                key={preview.src}
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              >
                <video
                  className="impact-preview-img"
                  src={vidSrc(preview.src)}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}
