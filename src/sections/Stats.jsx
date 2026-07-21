import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const STATS = [
  { value: 12, unit: 'B+', label: 'Data points labeled' },
  { value: 400, unit: '+', label: 'Enterprise deployments' },
  { value: 98, unit: '%', label: 'Model accuracy uplift' },
  { value: 40, unit: 'x', label: 'Faster time to production' },
]

export default function Stats() {
  const root = useRef(null)

  useGSAP(
    () => {
      const counters = gsap.utils.toArray('.stat-num')
      counters.forEach((el) => {
        const target = Number(el.dataset.value)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString()
          },
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="section stats" ref={root}>
      <div className="container stats-grid">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="stat-value">
              <span className="stat-num" data-value={s.value}>
                0
              </span>
              <span className="unit">{s.unit}</span>
            </div>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
