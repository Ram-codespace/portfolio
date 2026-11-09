import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { projects } from '../data/projects'
import { FiGithub, FiArrowUpRight } from 'react-icons/fi'

const FILTERS = ['All', 'Spring Boot', 'React', 'MySQL', 'Full Stack']

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter(
      (p) =>
        p.tech.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(activeFilter.toLowerCase()))
    )
  }, [activeFilter])

  return (
    <section id="projects" className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          num="05"
          eyebrow="Portfolio & Systems"
          title="Engineered Applications"
          subtitle="A showcase of full-stack platforms, mini ERPs, and REST API microservices designed for real-world enterprise workflows."
        />

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                data-cursor
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-200 ${
                  activeFilter === f
                    ? 'bg-[#00f5ff] text-slate-950 font-semibold shadow-[0_0_20px_rgba(0,245,255,0.35)]'
                    : 'glass-card text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <p className="text-xs font-mono text-slate-400">
            Displaying <span className="text-[#00f5ff] font-semibold">{filteredProjects.length}</span> of {projects.length} systems
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((p, i) => (
              <ProjectCard
                key={p.id || p.title}
                project={p}
                index={i}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub Footnote CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 p-8 rounded-3xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-display font-bold text-xl text-white">
              Looking for more backend repositories?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
              Explore my GitHub account for open-source utilities, database migration scripts, and algorithms.
            </p>
          </div>

          <a
            href="https://github.com/Ram-codespace"
            target="_blank"
            rel="noreferrer"
            data-cursor
            data-cursor-label="GITHUB"
            className="px-6 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/10 text-white border border-white/10 hover:border-[#00f5ff]/40 text-xs font-mono tracking-wider transition-all flex items-center gap-2 flex-shrink-0"
          >
            <FiGithub size={16} className="text-[#00f5ff]" />
            <span>github.com/Ram-codespace</span>
            <FiArrowUpRight />
          </a>
        </motion.div>
      </div>

      {/* Interactive Project Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
