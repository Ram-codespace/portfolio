import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiGithub, FiExternalLink, FiServer, FiDatabase, FiLayers, FiCheck } from 'react-icons/fi'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl -z-10"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl liquid-glass-card border border-white/20 p-6 sm:p-8 lg:p-10 shadow-2xl bg-[#0b1633]/95"
        >
          {/* Header & Close Button */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="liquid-glass-pill text-[10px] text-emerald-300 border-emerald-500/30 uppercase font-semibold">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  // ARCHITECTURE SPECIFICATION
                </span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white">
                {project.title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-300 font-light">
                {project.tagline}
              </p>
            </div>

            <button
              onClick={onClose}
              data-cursor
              aria-label="Close architecture modal"
              className="w-10 h-10 rounded-xl liquid-glass-pill flex items-center justify-center text-slate-300 hover:text-white transition-colors flex-shrink-0 cursor-pointer"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Project Preview Image if available */}
          {project.image && (
            <div className="rounded-2xl overflow-hidden border border-white/10 mb-8 max-h-72 w-full bg-slate-900/60">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}

          {/* Architecture Blueprint Card */}
          <div className="p-6 rounded-2xl glass-card border border-white/10 mb-8 space-y-4">
            <div className="flex items-center gap-2 text-sm font-mono text-[#00f5ff] font-semibold">
              <FiLayers size={16} />
              <span>SYSTEM ARCHITECTURE PATTERN</span>
            </div>
            <p className="font-display text-lg text-white font-medium">
              {project.architecture}
            </p>

            <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 block text-[10px]">API VOLUME</span>
                <span className="text-white font-semibold mt-0.5 block">{project.metrics.endpoints}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 block text-[10px]">RELATIONAL DATA</span>
                <span className="text-white font-semibold mt-0.5 block">{project.metrics.tables}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-slate-400 block text-[10px]">SECURITY MODEL</span>
                <span className="text-[#00f5ff] font-semibold mt-0.5 block">{project.metrics.auth}</span>
              </div>
            </div>
          </div>

          {/* Key REST API Endpoints */}
          {project.endpoints && (
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
                <FiServer className="text-[#00f5ff]" />
                <span>Selected REST Controller Endpoints</span>
              </div>
              <div className="space-y-2.5">
                {project.endpoints.map((ep, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ep.method === 'POST'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : ep.method === 'GET'
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {ep.method}
                      </span>
                      <code className="text-white font-medium">{ep.path}</code>
                    </div>
                    <span className="text-slate-400 text-[11px] sm:text-right">{ep.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Relational Entity Models */}
          {project.entities && (
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                <FiDatabase className="text-[#00f5ff]" />
                <span>Mapped JPA / Hibernate Relational Entities</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.entities.map((ent) => (
                  <span
                    key={ent}
                    className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300"
                  >
                    {ent}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Full Feature Checklist */}
          <div className="mb-8">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
              Production Capabilities & Security Safeguards
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <FiCheck className="text-[#00f5ff] mt-0.5 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Handlers */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="liquid-glass-pill text-xs px-3 py-1 text-slate-200 border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                data-cursor
                data-cursor-label="CODE"
                className="liquid-glass-btn px-4 py-2 text-xs font-mono text-white flex items-center gap-2 cursor-pointer"
              >
                <FiGithub className="text-white/80" /> GitHub Repository
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                data-cursor
                data-cursor-label="LIVE"
                className="liquid-glass-btn liquid-glass-btn-primary px-4 py-2 text-[#070d1e] text-xs font-display font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <FiExternalLink className="text-[#070d1e]" /> Live Instance
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
