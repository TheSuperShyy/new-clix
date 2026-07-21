import { motion } from 'framer-motion'

const PAPERS = [
  {
    tag: 'Evaluation',
    title: 'Measuring what matters: stress-testing language models beyond benchmarks',
    date: 'June 2026',
  },
  {
    tag: 'Data Quality',
    title: 'Expert data at scale: how human feedback shapes frontier model behavior',
    date: 'April 2026',
  },
  {
    tag: 'Safety',
    title: 'Red-teaming multimodal systems: a practical framework for finding failure modes',
    date: 'February 2026',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Research() {
  return (
    <section className="section research" id="research">
      <div className="container">
        <div className="research-head">
          <div>
            <span className="section-label">Research</span>
            <h2 className="section-title">Advancing the frontier</h2>
          </div>
          <a href="#resources" className="btn btn-ghost">
            View all research
          </a>
        </div>
        <motion.div
          className="research-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PAPERS.map((p) => (
            <motion.a href="#resources" className="research-card" key={p.title} variants={card}>
              <span className="tag">{p.tag}</span>
              <h4>{p.title}</h4>
              <span className="date">{p.date}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
