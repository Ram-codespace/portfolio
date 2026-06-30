import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const FILTERS = ['All', 'Java', 'Spring Boot', 'React', 'MySQL']

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return projects
    return projects.filter((p) =>
      p.tech.some((t) => t.toLowerCase().includes(filter.toLowerCase()))
    )
  }, [filter])

  return (
    <section id="projects" className="relative py-28 md:py-36 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading num="05" eyebrow="Projects" title="Selected Work" />

        <div className="flex flex-wrap gap-3 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              data-cursor
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-display transition-colors ${
                filter === f
                  ? 'bg-accent text-black'
                  : 'glass text-mist hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
