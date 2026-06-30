import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

export default function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="gradient-border glass rounded-2xl overflow-hidden group h-full flex flex-col"
      >
        <div className="relative aspect-[16/10] bg-gradient-to-br from-white/5 to-black flex items-center justify-center overflow-hidden">
          <span className="font-display text-5xl font-bold text-white/10 group-hover:text-accent/20 transition-colors duration-500">
            0{index + 1}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="p-6 flex flex-col flex-1" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="font-display text-xl font-semibold mb-3">{project.title}</h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[11px] tracking-wide px-2.5 py-1 rounded-full border border-accent/30 text-accent"
              >
                {t}
              </span>
            ))}
          </div>

          <ul className="text-sm text-mist space-y-1.5 mb-6 flex-1">
            {project.features.slice(0, 5).map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-mist flex-shrink-0" />
                {f}
              </li>
            ))}
            {project.features.length > 5 && (
              <li className="text-accent/80 text-xs pl-3">+{project.features.length - 5} more</li>
            )}
          </ul>

          <div className="flex gap-3 mt-auto">
            <a
              href={project.github}
              data-cursor
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-full glass hover:border-accent/50 transition-colors"
            >
              <FiGithub size={14} /> GitHub
            </a>
            <a
              href={project.demo}
              data-cursor
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-white/5 hover:bg-accent hover:text-black transition-colors"
            >
              <FiExternalLink size={14} /> Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
