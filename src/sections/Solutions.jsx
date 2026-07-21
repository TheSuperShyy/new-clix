import { motion } from 'framer-motion'

const SOLUTIONS = [
  {
    title: 'For Enterprise',
    desc: 'Bring generative AI into production with confidence. Clix pairs your proprietary data with rigorous evaluation so your models perform where it matters.',
    points: [
      'Fine-tune on your own secure data',
      'Continuous evaluation and monitoring',
      'Deploy in your cloud or ours',
    ],
    chips: ['Fine-tuning', 'RAG Pipelines', 'Evaluation'],
  },
  {
    title: 'For the Public Sector',
    desc: 'Auditable, secure AI for the missions that cannot fail. Purpose-built systems that turn overwhelming data streams into decisions people can trust.',
    points: [
      'Accredited, air-gapped deployments',
      'Human oversight at every step',
      'Full audit trails by default',
    ],
    chips: ['Secure Cloud', 'Analysis', 'Decision Support'],
  },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Solutions() {
  return (
    <section className="section" id="solutions">
      <div className="container">
        <span className="section-label">Solutions</span>
        <h2 className="section-title">
          Built for the teams doing <span className="accent">serious work</span>
        </h2>
        {SOLUTIONS.map((s, i) => (
          <div className="solution-row" key={s.title}>
            <motion.div className="solution-copy" {...fade()}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul>
                {s.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <a href="#cta" className="btn-link">
                Explore solution <span className="arrow">→</span>
              </a>
            </motion.div>
            <motion.div className="solution-visual" {...fade(0.15)}>
              <div className="orb" style={{ background: i % 2 ? '#0f3460' : '#e94560' }} />
              {s.chips.map((chip, j) => (
                <motion.span
                  className="chip"
                  key={chip}
                  style={{
                    top: `${22 + j * 26}%`,
                    left: j % 2 ? 'auto' : '10%',
                    right: j % 2 ? '10%' : 'auto',
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 4 + j,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: j * 0.6,
                  }}
                >
                  {chip}
                </motion.span>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
