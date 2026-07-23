// Static three-card services band — no scroll animation.

// The three core Clix services (from clixsolutions.info). Every card shares one
// neutral "empty" format; there is no accent-filled tile. Structure — an index
// number, a top hairline, a title/body block, and an arrow link — carries the
// visual weight at rest; on hover an accent gradient rises from the bottom
// (see .bench-card--plain in global.css).
const CARDS = [
  {
    variant: 'plain',
    kicker: 'Conversational agents',
    title: 'Voice AI',
    body:
      'AI voice agents that handle the entire call, answering, qualifying leads, booking meetings, and handing off to a human the moment it matters.',
  },
  {
    variant: 'plain',
    kicker: 'Product engineering',
    title: 'Web & Mobile Development',
    body:
      'Apps and websites engineered as systems, native iOS and Android, custom sites, and CRM portals, all wired into your AI agents and automations.',
  },
  {
    variant: 'plain',
    kicker: 'Enablement',
    title: 'Consulting & Training',
    body:
      'Lectures, workshops, and hands-on guidance that put operational AI into your team’s hands, practical implementation over theory.',
  },
]

export default function Benchmark() {
  return (
    <section className="section benchmark" id="benchmark">
      <div className="container">
        <h2 className="section-title bench-title">
          The services that move your business forward
        </h2>

        <div className="bench-grid">
          {CARDS.map((c, i) => (
            <article
              className={`bench-card bench-card--${c.variant}`}
              key={c.title}
            >
              <span className="bench-index" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="bench-kicker">{c.kicker}</span>
              <h3 className="bench-card-title">{c.title}</h3>
              <p className="bench-card-body">{c.body}</p>
              <a href="#cta" className="bench-more">
                <span>Learn More</span>
                <svg
                  className="bench-more-arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h9M8.5 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
