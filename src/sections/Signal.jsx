import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const PALETTE = ['#0f3460', '#16213e', '#e94560', '#4a6fa5']

/**
 * Lightweight canvas flow-field — the simple replacement for the
 * reference site's heavy 3D scene. The card is pinned on scroll and
 * zooms up to become the full-viewport background (GSAP scrub), then
 * the headline fades in on top.
 */
const ICONS = {
  logo: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="m4.9 4.9 2.8 2.8" />
      <path d="m16.3 16.3 2.8 2.8" />
      <path d="m4.9 19.1 2.8-2.8" />
      <path d="m16.3 7.7 2.8-2.8" />
    </>
  ),
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </>
  ),
  tasks: (
    <>
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="m3 6 1 1 2-2" />
      <path d="m3 12 1 1 2-2" />
      <path d="m3 18 1 1 2-2" />
    </>
  ),
  folder: (
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  ),
  doc: (
    <>
      <path d="M6 2h8l5 5v15H6z" />
      <path d="M14 2v6h5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  send: (
    <>
      <path d="m22 2-7 20-4-9-9-4z" />
      <path d="M22 2 11 13" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </>
  ),
  chat: (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M8 17v-6" />
      <path d="M13 17V7" />
      <path d="M18 17v-9" />
    </>
  ),
  list: (
    <>
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v6a5 5 0 0 1-10 0z" />
      <path d="M7 6H4a2 2 0 0 0 2 4" />
      <path d="M17 6h3a2 2 0 0 1-2 4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m4.9 19.1 1.4-1.4" />
      <path d="m17.7 6.3 1.4-1.4" />
    </>
  ),
  chevR: <path d="m9 6 6 6-6 6" />,
  chevD: <path d="m6 9 6 6 6-6" />,
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
}

function Icon({ name, size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}

const APP_NAV = [
  { label: 'My home', icon: 'home', active: true },
  { label: 'My tasks', icon: 'tasks' },
  { label: 'Client folder', icon: 'folder', badge: '3' },
  { label: 'Documents', icon: 'doc' },
  { label: 'Inbox', icon: 'bell' },
  { label: 'My requests', icon: 'users' },
  { label: 'Message requests', icon: 'send' },
  { label: 'Projects', icon: 'briefcase' },
  { label: 'Calendar', icon: 'calendar' },
  { label: 'Chats', icon: 'chat' },
]

const APP_CHATS = [
  { label: 'General Chat', icon: 'chat' },
  { label: 'Report Chat', icon: 'doc', badge: '2' },
  { label: 'CLIX - website', letter: 'C', color: '#e94560' },
  { label: 'CLIX website', letter: 'C', color: '#d63b55' },
  { label: 'DIN', letter: 'D', color: '#b23c3c' },
  { label: 'Hadas Maman', letter: 'H', color: '#e91e63' },
]

const APP_REPORTS = [
  { title: 'Morning report', sub: "Build & share today's plan", icon: 'sun', tint: '#f0a13a' },
  { title: 'Mid Report', sub: 'Report your mid-shift status', icon: 'clock', tint: '#2e9e5b' },
  { title: 'Project report', sub: 'Summarize progress per project', icon: 'chart', tint: '#e94560' },
]

const APP_STATS = [
  { label: 'Open Tasks', value: '1', foot: '0 due today', color: '#e94560', icon: 'list' },
  { label: 'Completed', value: '6', foot: 'this week', color: '#2e9e5b', icon: 'trophy' },
  { label: 'Today', value: '0', foot: 'none overdue', color: '#f0a13a', icon: 'clock' },
  {
    label: 'Active Projects',
    value: '3',
    foot: 'Shahar Marketing agent · CLIX website +1',
    color: '#4a6fa5',
    icon: 'folder',
  },
]

const APP_BARS = [
  { v: 4, c: '#2e9e5b', label: 'Jun 14' },
  { v: 0, c: '#d7dae0', label: 'Jun 21' },
  { v: 6, c: '#2e9e5b', label: 'Jun 28' },
  { v: 0, c: '#d7dae0', label: 'Jul 5' },
  { v: 1, c: '#f0a13a', label: 'Last week' },
  { v: 1, c: '#f0a13a', label: 'This week' },
]

const APP_TASKS = [
  { label: 'Jun 14', done: 78, active: 16, count: 5 },
  { label: 'Jun 21', done: 20, active: 20, count: 2 },
  { label: 'Jun 28', done: 40, active: 20, count: 3 },
  { label: 'Jul 5', done: 0, active: 0, count: 0 },
  { label: 'Last week', done: 100, active: 0, count: 5 },
  { label: 'This week', done: 0, active: 0, count: 0 },
]

export default function Signal() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const copyRef = useRef(null)
  const appRef = useRef(null)
  const canvasRef = useRef(null)

  useGSAP(
    () => {
      const canvas = canvasRef.current
      const card = cardRef.current
      const copy = copyRef.current
      const ctx = canvas.getContext('2d')
      let raf
      let particles = []
      let vw = 0
      let vh = 0
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      // offsetWidth/offsetHeight ignore the zoom transform, so scaling
      // the card never corrupts the drawing-buffer size.
      const resize = () => {
        vw = canvas.offsetWidth
        vh = canvas.offsetHeight
        canvas.width = vw * dpr
        canvas.height = vh * dpr
        ctx.scale(dpr, dpr)
        particles = Array.from({ length: 90 }, () => spawn(vw, vh))
        ctx.fillStyle = '#0d0d0d'
        ctx.fillRect(0, 0, vw, vh)
      }

      const spawn = (w, h) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        life: 80 + Math.random() * 160,
        color: PALETTE[(Math.random() * PALETTE.length) | 0],
        speed: 0.5 + Math.random() * 0.9,
      })

      const field = (x, y, t) =>
        Math.sin(x * 0.004 + t) * Math.cos(y * 0.004 - t * 0.7) * Math.PI * 2

      let t = 0
      const tick = () => {
        t += 0.0035
        ctx.fillStyle = 'rgba(13, 13, 13, 0.055)'
        ctx.fillRect(0, 0, vw, vh)

        for (const p of particles) {
          const angle = field(p.x, p.y, t)
          const nx = p.x + Math.cos(angle) * p.speed
          const ny = p.y + Math.sin(angle) * p.speed
          ctx.strokeStyle = p.color
          ctx.globalAlpha = 0.55
          ctx.lineWidth = 1.1
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(nx, ny)
          ctx.stroke()
          ctx.globalAlpha = 1
          p.x = nx
          p.y = ny
          p.life -= 1
          if (p.life <= 0 || p.x < -20 || p.x > vw + 20 || p.y < -20 || p.y > vh + 20) {
            Object.assign(p, spawn(vw, vh))
          }
        }
        raf = requestAnimationFrame(tick)
      }

      // Scale needed for the card to cover the whole viewport.
      const coverScale = () =>
        Math.max(
          window.innerWidth / card.offsetWidth,
          window.innerHeight / card.offsetHeight,
        ) * 1.02

      resize()
      window.addEventListener('resize', resize)

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        raf = requestAnimationFrame(tick)

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%',
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
        tl.to(card, { scale: coverScale, ease: 'power1.inOut', duration: 1 }, 0)
          .to(card, { borderRadius: 0, borderColor: 'transparent', duration: 0.2 }, 0.15)
          .fromTo(
            copy,
            { autoAlpha: 0, y: 36 },
            { autoAlpha: 1, y: 0, ease: 'power2.out', duration: 0.3 },
            0.68,
          )
          .fromTo(
            appRef.current,
            { autoAlpha: 0, x: 90 },
            { autoAlpha: 1, x: 0, ease: 'power2.out', duration: 0.32 },
            0.74,
          )

        return () => cancelAnimationFrame(raf)
      })

      // Static equivalent for reduced motion: card already fills the
      // section as background, headline visible on top.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(card, { scale: coverScale(), borderRadius: 0, borderColor: 'transparent' })
      })

      return () => {
        cancelAnimationFrame(raf)
        window.removeEventListener('resize', resize)
      }
    },
    { scope: sectionRef },
  )

  return (
    <section className="signal" id="signal" ref={sectionRef}>
      <div className="signal-stage">
        <div className="signal-canvas-wrap" ref={cardRef}>
          <canvas ref={canvasRef} />
        </div>
        <div className="signal-app" ref={appRef} aria-hidden="true">
          <aside className="sapp-side">
            <div className="sapp-logo">
              <span className="sapp-logo-mark">
                <Icon name="logo" size={24} />
              </span>
              <div>
                CLIX<span>Workspace</span>
              </div>
            </div>
            <nav className="sapp-nav">
              <ul>
                {APP_NAV.map((item) => (
                  <li key={item.label} className={item.active ? 'active' : ''}>
                    <Icon name={item.icon} />
                    {item.label}
                    {item.badge && <em>{item.badge}</em>}
                  </li>
                ))}
              </ul>
              <ul className="sapp-chats">
                {APP_CHATS.map((c) => (
                  <li key={c.label}>
                    {c.letter ? (
                      <b style={{ background: c.color }}>{c.letter}</b>
                    ) : (
                      <Icon name={c.icon} size={14} />
                    )}
                    {c.label}
                    {c.badge && <em>{c.badge}</em>}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="sapp-user">
              <b>Y</b>
              <div>
                Yul<span>Employee</span>
              </div>
              <Icon name="chevD" size={14} />
            </div>
          </aside>
          <div className="sapp-main">
            <div className="sapp-topbar">
              My home
              <span className="sapp-bell">
                <Icon name="bell" size={17} />
                <i>6</i>
              </span>
            </div>
            <div className="sapp-body">
              <div className="sapp-head">
                <h4>Good night, Yul</h4>
                <div className="sapp-reports">
                  {APP_REPORTS.map((r) => (
                    <div className="sapp-report" key={r.title}>
                      <span className="sapp-tile" style={{ '--c': r.tint }}>
                        <Icon name={r.icon} />
                      </span>
                      <div>
                        <strong>{r.title}</strong>
                        <span>{r.sub}</span>
                      </div>
                      <Icon name="chevR" size={13} />
                    </div>
                  ))}
                </div>
              </div>
              <p className="sapp-date">
                Tuesday, July 21 · <strong>One open task</strong>
              </p>
              <div className="sapp-stats">
                {APP_STATS.map((s) => (
                  <div className="sapp-stat" key={s.label} style={{ '--c': s.color }}>
                    <span className="sapp-stat-label">
                      <span className="sapp-tile">
                        <Icon name={s.icon} size={13} />
                      </span>
                      {s.label}
                    </span>
                    <span className="sapp-stat-value">{s.value}</span>
                    <span className="sapp-stat-foot">{s.foot}</span>
                  </div>
                ))}
              </div>
              <div className="sapp-panels">
                <div className="sapp-card">
                  <div className="sapp-card-head">
                    <span className="sapp-tile" style={{ '--c': '#e94560' }}>
                      <Icon name="chart" />
                    </span>
                    <div>
                      <strong>Requests sent</strong>
                      <span>Last 6 weeks</span>
                    </div>
                    <div className="sapp-figures">
                      <div>
                        <b>12</b>
                        <span>Sent</span>
                      </div>
                      <div>
                        <b style={{ color: '#2e9e5b' }}>10</b>
                        <span>Resolved</span>
                      </div>
                      <div>
                        <b style={{ color: '#f0a13a' }}>2</b>
                        <span>Pending</span>
                      </div>
                    </div>
                  </div>
                  <div className="sapp-chart">
                    <div className="sapp-axis">
                      <span>6</span>
                      <span>3</span>
                      <span>0</span>
                    </div>
                    <div className="sapp-plot">
                      {APP_BARS.map((b) => (
                        <div className="sapp-bar" key={b.label}>
                          {b.v > 0 && <u>{b.v}</u>}
                          <i
                            style={{
                              height: b.v ? `${(b.v / 6) * 72}%` : '4px',
                              background: b.c,
                            }}
                          />
                          <span>{b.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="sapp-legend">
                    <span>
                      <i style={{ background: '#2e9e5b' }} />
                      Resolved
                    </span>
                    <span>
                      <i style={{ background: '#f0a13a' }} />
                      Pending
                    </span>
                  </div>
                </div>
                <div className="sapp-card">
                  <div className="sapp-card-head">
                    <span className="sapp-tile" style={{ '--c': '#f0a13a' }}>
                      <Icon name="list" />
                    </span>
                    <div>
                      <strong>Shared tasks</strong>
                      <span>Assigned by your manager</span>
                    </div>
                    <div className="sapp-figures">
                      <div>
                        <b style={{ color: '#e94560' }}>3</b>
                        <span>Active</span>
                      </div>
                      <div>
                        <b style={{ color: '#2e9e5b' }}>12</b>
                        <span>Finished</span>
                      </div>
                    </div>
                  </div>
                  <div className="sapp-rows">
                    {APP_TASKS.map((t) => (
                      <div className="sapp-row" key={t.label}>
                        <span>{t.label}</span>
                        <div className="sapp-track">
                          <i style={{ width: `${t.done}%`, background: '#2e9e5b' }} />
                          <i style={{ width: `${t.active}%`, background: '#e94560' }} />
                        </div>
                        <b>{t.count}</b>
                      </div>
                    ))}
                  </div>
                  <div className="sapp-legend">
                    <span>
                      <i style={{ background: '#2e9e5b' }} />
                      Finished
                    </span>
                    <span>
                      <i style={{ background: '#e94560' }} />
                      Active
                    </span>
                  </div>
                </div>
              </div>
              <div className="sapp-focus">
                <div className="sapp-focus-bar">
                  <Icon name="chevD" size={14} />
                  <strong>Focus today</strong>
                  <span>1 tasks</span>
                </div>
                <span className="sapp-add">
                  <Icon name="plus" size={13} />
                  Add task
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="signal-copy" ref={copyRef}>
          <div className="container">
            <h2 className="section-title">
              Dependable AI is
              <br />
              built, not bought.
            </h2>
            <p className="section-sub">
              Clix connects every layer of the stack — the data your models
              learn from, the evaluation that keeps them honest, and the
              infrastructure that ships them.
            </p>
            <a href="#cta" className="btn btn-primary signal-cta">
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
