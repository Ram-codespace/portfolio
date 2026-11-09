import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiLayers, FiArrowUpRight, FiCheck } from 'react-icons/fi'

export default function ProjectCard({ project, index, onSelect }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      className="group liquid-glass-card border border-white/15 hover:border-[#38bdf8]/40 transition-all duration-300 flex flex-col overflow-hidden shadow-2xl relative"
    >
      {/* Project Visual / Thumbnail */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-900 to-[#030712] overflow-hidden flex items-center justify-center border-b border-white/10">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} interface`}
            className="w-full h-full object-cover object-top opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <span className="font-mono text-xs text-[#38bdf8] mb-2">// CORE SYSTEM ARCHITECTURE</span>
            <span className="font-display font-bold text-lg text-white">{project.title}</span>
          </div>
        )}

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d1e] via-transparent to-transparent opacity-70" />

        {/* Category Liquid Pill */}
        <div className="absolute top-4 left-4 z-10">
          <span className="liquid-glass-pill uppercase font-semibold text-[10px] text-sky-200 border-sky-400/30">
            {project.category || 'Full Stack'}
          </span>
        </div>

        {/* Numeric Index Badge */}
        <div className="absolute bottom-3 right-4 z-10 font-mono text-xs text-white/40 font-bold tracking-widest group-hover:text-[#38bdf8] transition-colors">
          0{index + 1} // 06
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 relative z-10">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#38bdf8] transition-colors leading-snug">
            {project.title}
          </h3>
          <button
            onClick={() => onSelect(project)}
            data-cursor
            data-cursor-label="VIEW"
            aria-label={`View architecture for ${project.title}`}
            className="p-1.5 rounded-lg text-slate-400 group-hover:text-[#38bdf8] group-hover:bg-[#38bdf8]/10 transition-colors"
          >
            <FiArrowUpRight size={18} />
          </button>
        </div>

        <p className="text-sm text-slate-300 font-light leading-relaxed mb-5 line-clamp-2">
          {project.tagline}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="liquid-glass-pill text-[10px] py-0.5 px-2.5 text-slate-300 border-white/10"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="liquid-glass-pill text-[10px] py-0.5 px-2 text-[#38bdf8] border-[#38bdf8]/30">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="space-y-2 mb-6 flex-1">
          {project.features.slice(0, 2).map((feat, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-300 font-light leading-relaxed">
              <FiCheck className="text-emerald-400 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>

        {/* Card Action Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 mt-auto">
          <button
            onClick={() => onSelect(project)}
            data-cursor
            data-cursor-label="SYSTEM"
            className="text-xs font-mono text-[#38bdf8] hover:text-white transition-colors flex items-center gap-1.5"
          >
            <FiLayers size={14} />
            <span>Architecture Blueprint</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              data-cursor
              data-cursor-label="CODE"
              aria-label="GitHub Repository"
              className="w-8 h-8 rounded-lg liquid-glass-pill flex items-center justify-center text-slate-300 hover:text-[#38bdf8] hover:border-[#38bdf8]/50 transition-colors"
            >
              <FiGithub size={14} />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              data-cursor
              data-cursor-label="DEMO"
              aria-label="Live Demo"
              className="w-8 h-8 rounded-lg liquid-glass-pill flex items-center justify-center text-slate-300 hover:text-[#38bdf8] hover:border-[#38bdf8]/50 transition-colors"
            >
              <FiExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
