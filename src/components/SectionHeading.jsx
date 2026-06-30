import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, num }) {
  return (
    <div className="mb-14 md:mb-20">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-xs tracking-[0.4em] text-accent mb-4"
        >
          {num && <span className="mr-2">{num} /</span>}{eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display font-bold text-4xl md:text-6xl tracking-tight"
      >
        {title}
      </motion.h2>
    </div>
  )
}
