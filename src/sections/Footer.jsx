const COLUMNS = [
  {
    heading: 'Products',
    links: ['Data Forge', 'GenStudio', 'Sentinel', 'Pricing'],
  },
  {
    heading: 'Solutions',
    links: ['Enterprise', 'Public Sector', 'Startups', 'Automotive'],
  },
  {
    heading: 'Company',
    links: ['About', 'Careers', 'Customers', 'Security'],
  },
  {
    heading: 'Resources',
    links: ['Blog', 'Research', 'Docs', 'Guides'],
  },
]

export default function Footer() {
  return (
    <footer className="footer" id="resources">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="nav-logo">
              clix<span className="dot">.</span>
            </a>
            <p>
              The full-stack AI platform — data, models, and deployment with
              humans in the loop.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div className="footer-col" key={col.heading}>
              <h5>{col.heading}</h5>
              <ul>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#top">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2026 Clix. All rights reserved.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  )
}
