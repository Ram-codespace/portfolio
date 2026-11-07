import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, num, subtitle }) {
  return (
    <div className="mb-14 md:mb-20">
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 mb-3"
        >
          <span className="liquid-glass-pill text-[11px] text-slate-300 border-white/10">
            {num && (
              <span className="font-mono text-xs text-[#38bdf8] font-semibold tracking-wider mr-1">
                {num}
              </span>
            )}
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="font-mono text-xs tracking-[0.25em] text-slate-300 uppercase font-medium">
              {eyebrow}
            </span>
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: 0.08 }}
        className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-4 text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
