import { motion } from 'framer-motion'

const PRODUCTS = [
  {
    num: '01',
    name: 'Clix Data Forge',
    desc: 'High-quality training data at any scale. Curate, label, and refine datasets with expert humans in the loop — built for frontier model development.',
  },
  {
    num: '02',
    name: 'Clix GenStudio',
    desc: 'A full-stack generative AI platform for the enterprise. Fine-tune, evaluate, and deploy custom models securely on your own data.',
  },
  {
    num: '03',
    name: 'Clix Sentinel',
    desc: 'Mission-grade AI for critical decisions. Turn complex, multi-source data into clear operational insight with auditable AI systems.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
}

const card = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Products() {
  return (
    <section className="section" id="products">
      <div className="container">
        <span className="section-label">Products</span>
        <h2 className="section-title">
          One platform, every stage of the <span className="accent">AI lifecycle</span>
        </h2>
        <p className="section-sub">
          From raw data to deployed intelligence — three products that work as
          one system.
        </p>
        <motion.div
          className="products-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {PRODUCTS.map((p) => (
            <motion.article className="product-card" key={p.num} variants={card}>
              <span className="card-num">{p.num}</span>
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <a href="#cta" className="btn-link">
                Learn more <span className="arrow">→</span>
              </a>
              <div className="card-glow" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
