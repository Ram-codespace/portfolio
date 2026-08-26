import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const FILTERS = ['All', 'Java', 'Spring Boot', 'React', 'MySQL']
export default function Projects() { const [filter, setFilter] = useState('All'); const filtered = useMemo(() => filter === 'All' ? projects : projects.filter(p => p.tech.some(t => t.toLowerCase().includes(filter.toLowerCase()))), [filter])
 return <section id="projects" className="relative py-28 md:py-36 px-6 lg:px-10"><div className="max-w-7xl mx-auto"><SectionHeading num="05" eyebrow="Projects" title="Selected Work" /><div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"><p className="text-mist max-w-md leading-relaxed">A selection of systems I have designed and shipped—from internal workflows to customer-facing products.</p><div className="flex flex-wrap gap-2">{FILTERS.map(f => <button key={f} data-cursor onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-xs font-display transition-all ${filter === f ? 'bg-accent text-black shadow-[0_0_20px_rgba(0,245,255,.25)]' : 'glass text-mist hover:text-white'}`}>{f}</button>)}</div></div><motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}</motion.div><AnimatePresence mode="wait"><motion.p key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-xs text-mist font-display tracking-wide">Showing {filtered.length} {filtered.length === 1 ? 'project' : 'projects'} · {filter}</motion.p></AnimatePresence></div></section> }
