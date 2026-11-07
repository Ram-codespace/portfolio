import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { FiCheckCircle, FiCpu, FiShield, FiDatabase } from 'react-icons/fi'
import profilePhoto from '../assets/profile.jpg'
import LiquidGlassOrbs from './LiquidGlassOrbs'

function AnimatedCounter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplayValue(Math.floor(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
      {displayValue}
      <span className="text-[#00f5ff]">{suffix}</span>
    </span>
  )
}

const STATS = [
  { value: 6, suffix: '+', label: 'Production-Ready Projects', desc: 'From mini ERPs to e-commerce engines' },
  { value: 100, suffix: '%', label: 'Responsive & Accessible', desc: 'Cross-browser & mobile certified' },
  { value: 15, suffix: '+', label: 'Core Technologies', desc: 'Java, Spring Boot, React, MySQL & more' },
]

const PRINCIPLES = [
  {
    icon: FiDatabase,
    title: 'Data Integrity & Normalization',
    desc: 'Structured 3NF relational schemas, foreign key cascades, and ACID transactions to ensure clean state and zero data corruption.',
  },
  {
    icon: FiShield,
    title: 'Stateless Security & RBAC',
    desc: 'JWT authorization filters, password hashing via BCrypt, and role-based route guards across Spring Security and React.',
  },
  {
    icon: FiCpu,
    title: 'High-Throughput REST APIs',
    desc: 'Clean REST controller endpoints with standardized DTOs, global exception handling, pagination, and predictable status codes.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Liquid Glass Atmosphere */}
      <LiquidGlassOrbs variant="section" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          num="02"
          eyebrow="Engineering Philosophy"
          title="Architected for reliability. Built with intent."
          subtitle="A disciplined full-stack engineer bridging rigorous Java backend fundamentals with human-centric React web experiences."
        />

        {/* Narrative & Metrics Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Main Story Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6 text-slate-300 text-base md:text-lg leading-relaxed font-light"
          >
            <div className="p-8 rounded-3xl liquid-glass-card border border-white/15 space-y-6">
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-white/10">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-[#38bdf8]/40 shadow-[0_0_20px_rgba(56,189,248,0.25)] shrink-0 bg-slate-950">
                  <img src={profilePhoto} alt="Raman" className="w-full h-full object-cover object-center" />
                  <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 shadow-[0_0_8px_#34d399]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-xl text-white">Raman</h3>
                    <span className="liquid-glass-pill text-[10px] text-emerald-300 border-emerald-500/30">
                      VERIFIED DEV
                    </span>
                  </div>
                  <p className="text-sm font-mono text-[#38bdf8] mt-0.5">Java Full Stack Software Developer</p>
                  <p className="text-xs text-slate-400 font-light mt-0.5">B.Sc. Computer Science (2025) · St. Joseph&apos;s College · Chennai, India</p>
                </div>
              </div>

              <p>
                I hold a <strong className="text-white font-semibold">Bachelor of Science (B.Sc.) in Computer Science (2022 – 2025)</strong> from <strong className="text-white font-semibold">St. Joseph&apos;s College of Arts and Science</strong> and specialize in the design and engineering of reliable, end-to-end full stack web applications.
              </p>
              <p>
                My engineering foundation centers around <span className="text-[#38bdf8] font-medium">Java, Spring Boot, Spring Security, and Spring Data JPA/Hibernate</span> on the server, paired with <span className="text-[#38bdf8] font-medium">MySQL</span> for relational persistence and <span className="text-emerald-300 font-medium">React.js, HTML5, CSS3, and JavaScript (ES6+)</span> for high-speed client interfaces.
              </p>
              <p>
                Having engineered 6+ hands-on projects across the full SDLC — including MedBook (Hospital Appointment Scheduling System) and a multi-account Bank Management System — I focus on data integrity, clean RESTful contracts, and robust MVC architecture.
              </p>

              <div className="pt-4 border-t border-white/10 grid sm:grid-cols-2 gap-3 text-sm font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-400" />
                  <span>Chennai, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-400" />
                  <span>B.Sc. Computer Science (2025)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-400" />
                  <span>Fluent in English &amp; Tamil</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="text-emerald-400" />
                  <span>github.com/Ram-codespace</span>
                </div>
              </div>
            </div>

            {/* Architectural Pillars */}
            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              {PRINCIPLES.map((p, idx) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="p-5 rounded-2xl liquid-glass-card border border-white/10 hover:border-[#38bdf8]/40 transition-all group"
                >
                  <p.icon className="text-2xl text-[#38bdf8] mb-3 group-hover:scale-110 group-hover:text-emerald-400 transition-all" />
                  <h4 className="font-display font-semibold text-sm text-white mb-2">{p.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Stat Counters */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="p-7 rounded-3xl liquid-glass-card border border-white/15 flex flex-col justify-between hover:border-[#38bdf8]/40 transition-all"
              >
                <div className="flex items-baseline justify-between">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                  <span className="liquid-glass-pill text-[10px] text-[#38bdf8] border-[#38bdf8]/30">
                    VERIFIED
                  </span>
                </div>
                <div className="mt-3">
                  <h4 className="font-display text-base font-semibold text-white">{s.label}</h4>
                  <p className="text-xs text-slate-300 mt-1 font-light">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
