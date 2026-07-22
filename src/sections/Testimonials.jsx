import { useEffect, useRef } from 'react'

// Original Clix clients (fictional — no real logos or verbatim copy).
// `mono` renders as the small logo tile; `accent` tints it per industry.
const CLIENTS = [
  {
    mono: 'NW',
    quote:
      'Clix turned years of fragmented patient records into clinical intelligence our physicians actually trust.',
    name: 'Northwind Health',
    industry: 'Healthcare',
    accent: '#0f766e',
  },
  {
    mono: 'MT',
    quote:
      'We rebuilt a century of archives into a living, searchable AI experience that our readers love.',
    name: 'Meridian Times',
    industry: 'Media',
    accent: '#b91c1c',
  },
  {
    mono: 'AD',
    quote:
      'Clix accelerated our development pipeline — from site analysis to revenue — faster than any tool we have used.',
    name: 'Atlas Development',
    industry: 'Real Estate',
    accent: '#1d4ed8',
  },
  {
    mono: 'VR',
    quote:
      'Physical intelligence at scale — Clix fuels our robotics fleet with real-world data it can learn from.',
    name: 'Vanta Robotics',
    industry: 'Robotics',
    accent: '#7c3aed',
  },
  {
    mono: 'HF',
    quote:
      'Risk decisions that took our analysts days now take minutes, with an audit trail we can defend.',
    name: 'Halcyon Financial',
    industry: 'Finance',
    accent: '#15803d',
  },
  {
    mono: 'PL',
    quote:
      'Every shipment, every route, every exception — Clix gives our operations a single source of truth.',
    name: 'Portway Logistics',
    industry: 'Logistics',
    accent: '#b45309',
  },
]

// Three copies of the list so the track always has content on both sides;
// the scroll handler keeps the viewport parked in the middle copy, which
// makes the loop seamless in either direction (drag, wheel, or arrows).
const LOOP = [...CLIENTS, ...CLIENTS, ...CLIENTS]

export default function Testimonials() {
  const trackRef = useRef(null)

  // Recenter onto the middle copy whenever the viewport drifts into an
  // outer copy. Because the copies are identical, the jump is invisible.
  const recenter = () => {
    const track = trackRef.current
    if (!track) return
    const third = track.scrollWidth / 3
    if (track.scrollLeft < third * 0.5) track.scrollLeft += third
    else if (track.scrollLeft > third * 1.5) track.scrollLeft -= third
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    // Start parked at the head of the middle copy.
    track.scrollLeft = track.scrollWidth / 3

    let down = false
    let startX = 0
    let startScroll = 0
    let moved = false

    const onDown = (e) => {
      down = true
      moved = false
      startX = e.clientX
      startScroll = track.scrollLeft
      track.classList.add('is-dragging')
      track.setPointerCapture?.(e.pointerId)
    }
    const onMove = (e) => {
      if (!down) return
      const dx = e.clientX - startX
      if (Math.abs(dx) > 3) moved = true
      track.scrollLeft = startScroll - dx
    }
    const onUp = (e) => {
      down = false
      track.classList.remove('is-dragging')
      track.releasePointerCapture?.(e.pointerId)
      recenter()
    }
    // Swallow the click that follows a drag so it doesn't feel jumpy.
    const onClick = (e) => {
      if (moved) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    track.addEventListener('scroll', recenter, { passive: true })
    track.addEventListener('pointerdown', onDown)
    track.addEventListener('pointermove', onMove)
    track.addEventListener('pointerup', onUp)
    track.addEventListener('pointercancel', onUp)
    track.addEventListener('click', onClick, true)

    return () => {
      track.removeEventListener('scroll', recenter)
      track.removeEventListener('pointerdown', onDown)
      track.removeEventListener('pointermove', onMove)
      track.removeEventListener('pointerup', onUp)
      track.removeEventListener('pointercancel', onUp)
      track.removeEventListener('click', onClick, true)
    }
  }, [])

  // Arrow buttons nudge the track by roughly one card width; the scroll
  // handler loops it back into the middle copy as needed.
  const nudge = (dir) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.tm-card')
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8
    track.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="section testimonials" id="testimonials">
      <div
        className="tm-track"
        ref={trackRef}
        role="list"
        aria-label="Client testimonials"
      >
        {LOOP.map((c, i) => (
          <article className="tm-card" role="listitem" key={i} aria-hidden={i >= CLIENTS.length && i < CLIENTS.length * 2 ? undefined : 'true'}>
            <span
              className="tm-logo"
              style={{ '--tm-accent': c.accent }}
              aria-hidden="true"
            >
              {c.mono}
            </span>
            <p className="tm-quote">{c.quote}</p>
            <div className="tm-foot">
              <span className="tm-name">{c.name}</span>
              <span className="tm-industry">{c.industry}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="container tm-bar">
        <h2 className="section-title tm-title">Proven across every industry.</h2>
        <div className="tm-nav">
          <button
            type="button"
            className="tm-arrow"
            aria-label="Previous testimonials"
            onClick={() => nudge(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6 9 12l6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="tm-arrow"
            aria-label="Next testimonials"
            onClick={() => nudge(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
