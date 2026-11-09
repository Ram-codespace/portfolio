import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { TbApi, TbDeviceLaptop } from 'react-icons/tb'
import { FaServer, FaDatabase } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'

const SERVICES = [
  {
    icon: FaServer,
    title: 'Enterprise Backend Engineering',
    tag: 'JAVA & SPRING BOOT',
    desc: 'Production-ready server architectures engineered for reliability. Clean separation of concerns through Controller, Service, and Repository layers with robust business domain modeling.',
    deliverables: [
      'Spring Boot 3 REST microservices & modular monoliths',
      'Stateless Spring Security & JWT token authorization',
      'Centralized global exception handling & validation envelopes',
      'Automated integration testing with Mockito & Spring Test',
    ],
  },
  {
    icon: TbApi,
    title: 'Scalable REST API Development',
    tag: 'API CONTRACTS & SPECS',
    desc: 'Standards-compliant, predictable RESTful APIs designed for seamless client integration, high concurrency, and long-term backward compatibility.',
    deliverables: [
      'Standard HTTP response wrappers & error codes',
      'Pagination, dynamic multi-field filtering & sorting',
      'Postman collection documentation & automated testing suites',
      'Role-based access guards (RBAC) on sensitive endpoints',
    ],
  },
  {
    icon: TbDeviceLaptop,
    title: 'Modern Full-Stack Applications',
    tag: 'REACT & TAILWIND CSS',
    desc: 'High-speed, accessible Single Page Applications (SPAs) built with React 19. Pixel-perfect implementations pairing responsive fluidity with 60fps GPU animations.',
    deliverables: [
      'Reusable component architectures with strict typing',
      'Fluid responsiveness across mobile, tablet, and 4K displays',
      'Meng To dark glassmorphism & subtle micro-interactions',
      'Zero layout shifts (CLS) and optimized bundle delivery',
    ],
  },
  {
    icon: FaDatabase,
    title: 'Database Architecture & Persistence',
    tag: 'MYSQL & HIBERNATE / JPA',
    desc: 'Disciplined relational data modeling in MySQL. Schema design adhering to Third Normal Form (3NF), optimized indexes, and transactional data integrity.',
    deliverables: [
      'Normalized schema architectures with foreign key cascades',
      'Hibernate / JPA entity lifecycle & relationship mapping',
      'ACID transaction management with rollback guarantees',
      'Query indexing & execution plan optimization',
    ],
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          num="06"
          eyebrow="Capabilities & Offerings"
          title="What I Deliver"
          subtitle="Full-lifecycle engineering support—from database entity diagrams and backend APIs to polished, intuitive frontends."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl liquid-glass-card border border-white/15 hover:border-[#38bdf8]/45 transition-all flex flex-col justify-between shadow-2xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl liquid-glass-pill flex items-center justify-center text-3xl text-slate-300 group-hover:text-[#38bdf8] group-hover:border-[#38bdf8]/50 transition-colors">
                    <s.icon />
                  </div>
                  <span className="liquid-glass-pill text-[10px] text-emerald-300 border-emerald-500/30">
                    {s.tag}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-3 group-hover:text-[#38bdf8] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                  {s.desc}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Key Deliverables:
                  </span>
                  {s.deliverables.map((del) => (
                    <div key={del} className="flex items-start gap-2.5 text-xs text-slate-300 font-light leading-relaxed">
                      <FiCheck className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{del}</span>
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
