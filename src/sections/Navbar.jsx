import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = ['Products', 'Solutions', 'Research', 'Resources']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [showAnnounce, setShowAnnounce] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)
  const announceRef = useRef(null)
  const announceVisible = showAnnounce && !scrolled

  // Publish the announce bar's height as --announce-h so the page layout
  // (hero card etc.) is pushed down below it, not just the nav row.
  useEffect(() => {
    const root = document.documentElement
    const setHeight = () => {
      const h = announceVisible && announceRef.current
        ? announceRef.current.offsetHeight
        : 0
      root.style.setProperty('--announce-h', `${h}px`)
    }
    setHeight()
    window.addEventListener('resize', setHeight)
    return () => {
      window.removeEventListener('resize', setHeight)
      root.style.setProperty('--announce-h', '0px')
    }
  }, [announceVisible])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)

      // Hide on scroll down, reveal on scroll up (small delta = ignore jitter).
      const delta = y - lastY.current
      if (y < 80) setHidden(false)
      else if (delta > 6) setHidden(true)
      else if (delta < -6) setHidden(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="site-header"
      initial={{ y: -110, opacity: 0 }}
      animate={{ y: hidden ? '-105%' : 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatePresence initial={false}>
        {announceVisible && (
          <motion.div
            className="announce"
            key="announce"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="announce-inner" ref={announceRef}>
              <span className="announce-text">
                Clix partners with Meridian Health to bring dependable AI to
                healthcare
              </span>
              <a href="#research" className="announce-link">
                Read the Full Story <span aria-hidden="true">↗</span>
              </a>
              <button
                className="announce-close"
                aria-label="Dismiss announcement"
                onClick={() => setShowAnnounce(false)}
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#top" className="nav-logo">
            clix<span className="dot">.</span>
          </a>
          <nav className="nav-links">
            {LINKS.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}>
                {link}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <a href="#login" className="btn btn-ghost">
              Log In
            </a>
            <a href="#cta" className="btn btn-primary">
              Book Demo
            </a>
            <button
              type="button"
              className={`nav-burger ${menuOpen ? 'is-open' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="nav-mobile"
              key="nav-mobile"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <a
                href="#login"
                className="nav-mobile-login"
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
