import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const BRANDS = [
  'Novaline', 'Vertex Labs', 'Orbital', 'Hexafirm', 'Quantiq',
  'Bluepeak', 'Meridian', 'Corelight AI', 'Statix', 'Fondry',
]

export default function Marquee() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('.marquee-track', {
          xPercent: -50,
          ease: 'none',
          duration: 28,
          repeat: -1,
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="marquee-section" ref={root}>
      <p className="marquee-label">Trusted by the world's most ambitious teams</p>
      <div className="marquee">
        <div className="marquee-track">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span className="marquee-item" key={`${brand}-${i}`}>
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
