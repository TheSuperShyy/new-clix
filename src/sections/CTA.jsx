import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="section cta" id="cta">
      <div className="container">
        <motion.div
          className="cta-inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2>
            The future belongs to the <span className="accent">builders</span>
          </h2>
          <p>
            Talk to our team about bringing dependable AI into your
            organization — from first dataset to full deployment.
          </p>
          <div className="hero-ctas">
            <a href="#top" className="btn btn-primary">
              Book a Demo
            </a>
            <a href="#products" className="btn btn-ghost">
              Talk to Sales
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
