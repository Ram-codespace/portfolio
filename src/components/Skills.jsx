import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from './SectionHeading'
import {
  FaJava, FaReact, FaHtml5, FaGitAlt, FaGithub, FaDatabase, FaPython, FaPhp, FaDocker,
} from 'react-icons/fa'
import {
  SiSpringboot, SiJavascript, SiTailwindcss, SiMysql, SiPostman, SiIntellijidea, SiApachemaven,
} from 'react-icons/si'
import { TbApi, TbBrandThreejs } from 'react-icons/tb'
import { MdSecurity } from 'react-icons/md'

const SKILL_CATEGORIES = [
  { id: 'all', label: 'All Technologies' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'database', label: 'Database' },
  { id: 'devops', label: 'DevOps & Tools' },
]

const SKILLS = [
  {
    category: 'backend',
    name: 'Java (Core & OOP)',
    icon: FaJava,
    level: 'Advanced',
    note: 'Multithreading, Streams, Collections & OOP architecture',
  },
  {
    category: 'backend',
    name: 'Spring Boot 3',
    icon: SiSpringboot,
    level: 'Advanced',
    note: 'REST Controllers, IoC Container, Dependency Injection',
  },
  {
    category: 'backend',
    name: 'Spring Security & JWT',
    icon: MdSecurity,
    level: 'Proficient',
    note: 'Stateless auth filters, BCrypt, RBAC authorization',
  },
  {
    category: 'backend',
    name: 'Hibernate & JPA',
    icon: FaDatabase,
    level: 'Proficient',
    note: 'Entity mapping, cascade lifecycles, JPQL queries',
  },
  {
    category: 'backend',
    name: 'RESTful API Design',
    icon: TbApi,
    level: 'Advanced',
    note: 'Standardized JSON envelopes, error handlers, status codes',
  },
  {
    category: 'frontend',
    name: 'React 19',
    icon: FaReact,
    level: 'Advanced',
    note: 'Hooks, Suspense, custom state management, component isolation',
  },
  {
    category: 'frontend',
    name: 'JavaScript (ES6+)',
    icon: SiJavascript,
    level: 'Advanced',
    note: 'Async/await, DOM events, functional idioms, closures',
  },
  {
    category: 'frontend',
    name: 'Tailwind CSS v4',
    icon: SiTailwindcss,
    level: 'Advanced',
    note: 'Design tokens, custom utility systems, dark mode glass',
  },
  {
    category: 'frontend',
    name: 'Three.js / WebGL',
    icon: TbBrandThreejs,
    level: 'Proficient',
    note: 'Interactive particle grids, custom shaders, 3D math',
  },
  {
    category: 'frontend',
    name: 'HTML5 & Modern CSS3',
    icon: FaHtml5,
    level: 'Advanced',
    note: 'Semantic structure, WCAG accessibility, Flex/Grid layouts',
  },
  {
    category: 'database',
    name: 'MySQL',
    icon: SiMysql,
    level: 'Advanced',
    note: '3NF schema design, indexing, foreign keys, transactions',
  },
  {
    category: 'database',
    name: 'Oracle SQL',
    icon: FaDatabase,
    level: 'Proficient',
    note: 'Stored procedures, complex joins, relational integrity',
  },
  {
    category: 'backend',
    name: 'Python',
    icon: FaPython,
    level: 'Proficient',
    note: 'Data structures, data analytics, automation & scripts',
  },
  {
    category: 'backend',
    name: 'PHP & MySQL',
    icon: FaPhp,
    level: 'Proficient',
    note: 'Server scripting, database connectivity & web architecture',
  },
  {
    category: 'devops',
    name: 'Docker',
    icon: FaDocker,
    level: 'Proficient',
    note: 'Containerization, environment isolation & reproducible deployments',
  },
  {
    category: 'devops',
    name: 'Apache Maven',
    icon: SiApachemaven,
    level: 'Advanced',
    note: 'Dependency management, build lifecycle & plugin automation',
  },
  {
    category: 'devops',
    name: 'Git & Version Control',
    icon: FaGitAlt,
    level: 'Advanced',
    note: 'Branching workflows, semantic commits, PR review hygiene',
  },
  {
    category: 'devops',
    name: 'Postman & API Testing',
    icon: SiPostman,
    level: 'Advanced',
    note: 'Environment variables, test suites, automated assertions',
  },
  {
    category: 'devops',
    name: 'IntelliJ IDEA & VS Code',
    icon: SiIntellijidea,
    level: 'Advanced',
    note: 'Spring profile debugging, Maven lifecycle, hot-reload',
  },
  {
    category: 'devops',
    name: 'GitHub',
    icon: FaGithub,
    level: 'Advanced',
    note: 'Repository management, CI/CD actions, documentation',
  },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredSkills =
    activeCategory === 'all'
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          num="03"
          eyebrow="Core Competencies"
          title="Battle-Tested Technical Stack"
          subtitle="Every layer selected for performance, maintainability, and clean production architecture."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              data-cursor
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'liquid-glass-btn liquid-glass-btn-primary text-[#070d1e] font-bold shadow-lg'
                  : 'liquid-glass-btn liquid-glass-btn-ghost text-slate-300 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl liquid-glass-card border border-white/15 hover:border-[#38bdf8]/45 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl liquid-glass-pill flex items-center justify-center text-2xl text-slate-300 group-hover:text-[#38bdf8] group-hover:border-[#38bdf8]/50 transition-colors">
                      <skill.icon />
                    </div>
                    <span className="liquid-glass-pill text-[10px] text-slate-300 border-white/10 group-hover:border-[#38bdf8]/40 group-hover:text-[#38bdf8] transition-colors">
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-base text-white group-hover:text-[#38bdf8] transition-colors">
                    {skill.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed font-light">
                    {skill.note}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="uppercase">{skill.category}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:shadow-[0_0_8px_#34d399] transition-all" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
