import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { FaJava, FaPython, FaCode } from 'react-icons/fa'
import { SiSpringboot } from 'react-icons/si'
import { FiCheckCircle, FiShield } from 'react-icons/fi'

const CERTS = [
  {
    title: 'Java Full Stack Developer',
    issuer: 'Techpanda, via Trainer Central by Zoho',
    icon: SiSpringboot,
    specialization: 'Professional IT Training Program in Java Full Stack',
    topics: [
      'Core Java, OOP, Collections, Exception Handling & JDBC',
      'Spring Boot RESTful APIs & CRUD Endpoints',
      'MySQL Database Normalization (8+ Tables)',
      'Responsive Web UI with HTML5, CSS3 & JavaScript (ES6+)',
    ],
  },
  {
    title: 'Data Science and Data Analytics using Python',
    issuer: 'PG & Research Dept of Computer Science & AI',
    icon: FaPython,
    specialization: 'Python Programming & Data Analytics (2024 – 2025)',
    topics: [
      'Python Syntax, Data Structures & Automation',
      'Data Cleansing, Transformation & Exploratory Analysis',
      'Statistical Methods & Data Modeling',
      'Analytical Insights & Visualization Pipelines',
    ],
  },
  {
    title: 'Web Development Fundamentals',
    issuer: 'IBM SkillsBuild',
    icon: FaCode,
    specialization: 'Completion Certificate (2026)',
    topics: [
      'Modern Web Standards, HTML5 & Semantic Markup',
      'CSS3 Responsive Layouts & Styling Frameworks',
      'JavaScript Web Programming Fundamentals',
      'SDLC Practices, Agile Workflows & Web Protocols',
    ],
  },
  {
    title: 'Full Stack Web Architecture',
    issuer: 'Hands-on Project Portfolio Accreditation',
    icon: FaJava,
    specialization: 'MedBook & Banking Core Implementations',
    topics: [
      'Role-Based Access Control (RBAC) & Spring Security',
      'Spring Data JPA & Hibernate Entity Persistence',
      'Zero-Merge-Conflict Git & Postman REST Testing',
      '3-Tier Architecture & Scalable Web Systems',
    ],
  },
]

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          num="07"
          eyebrow="Credentials & Validation"
          title="Certifications & Accreditations"
          subtitle="Formal recognition of hands-on expertise across backend enterprise patterns, database architectures, and frontend applications."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl liquid-glass-card border border-white/15 hover:border-[#38bdf8]/45 transition-all flex flex-col justify-between shadow-2xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl liquid-glass-pill flex items-center justify-center text-2xl text-slate-200 group-hover:text-[#38bdf8] group-hover:border-[#38bdf8]/50 transition-all">
                    <c.icon />
                  </div>
                  <span className="liquid-glass-pill text-[10px] text-emerald-300 border-emerald-500/30">
                    <FiShield size={11} className="text-emerald-400" /> VERIFIED
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white group-hover:text-[#38bdf8] transition-colors leading-snug">
                  {c.title}
                </h3>
                <p className="font-mono text-xs text-slate-300 mt-1">
                  {c.issuer}
                </p>

                <p className="text-xs text-emerald-300 mt-3 font-mono font-medium">
                  {c.specialization}
                </p>

                <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
                  {c.topics.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300 font-light">
                      <FiCheckCircle className="text-emerald-400 text-[10px] flex-shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
