import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiTerminal, FiCheckCircle, FiCopy, FiDownload } from 'react-icons/fi'
import Background from './Background'
import heroArt from '../assets/hero-portfolio-art.jpg'
import profilePhoto from '../assets/profile.jpg'

const TERMINAL_COMMANDS = {
  stack: [
    '• Backend: Java 21, Spring Boot 3, Spring Security, Hibernate/JPA',
    '• Frontend: React 19, Tailwind CSS v4, Framer Motion, Three.js',
    '• Database: MySQL, Oracle, Schema Indexing, Connection Pooling',
    '• Tooling: Git, Docker, Postman, Vite, Maven, IntelliJ IDEA',
  ],
  status: [
    '✓ All microservices healthy [OK]',
    '✓ Security context: JWT Stateless [ACTIVE]',
    '✓ Work availability: Open to Full-Time & High-Impact Contracts [READY]',
  ],
  architecture: [
    '» 3-Tier Layered Architecture (Controller -> Service -> Repository)',
    '» Normalized relational schema design with ACID compliance',
    '» RESTful conventions with standardized HTTP response envelopes',
  ],
}

export default function Hero({ onOpenResume }) {
  const [activeTab, setActiveTab] = useState('stack')
  const [imageMode, setImageMode] = useState('art')
  const [copied, setCopied] = useState(false)

  const copyContact = () => {
    navigator.clipboard.writeText('ramnj08@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      {/* 3D WebGL Background Scene */}
      <Background />

      {/* Atmospheric Beam & Grid Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/40 to-transparent scan-beam pointer-events-none z-[2]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(0,245,255,0.08),transparent_65%)] pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/5 backdrop-blur-md text-[11px] font-mono tracking-widest text-[#00f5ff]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse shadow-[0_0_8px_#00f5ff]" />
            AVAILABLE FOR OPPORTUNITIES
          </span>
          <span className="text-xs font-mono text-slate-400 tracking-wider">
            // RAMAN · FULL STACK DEVELOPER & SYSTEMS ENGINEER
          </span>
        </motion.div>

        {/* 2-Column Hero Grid: Content & Interactive Profile Visual */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left Column: Headlines, CTA, and Developer Terminal */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Hero Title with Meng To Typography Standards */}
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.98] text-white"
              >
                ENGINEERING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  RELIABLE
                </span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5ff] via-[#38bdf8] to-indigo-400 text-glow">
                  SYSTEMS.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-6 text-base sm:text-lg text-slate-300 max-w-xl font-light leading-relaxed"
              >
                Specialized in crafting resilient backend architectures with{' '}
                <strong className="text-white font-medium">Java & Spring Boot</strong>, coupled with
                ultra-responsive, intuitive interfaces built in{' '}
                <strong className="text-white font-medium">React</strong>.
              </motion.p>
            </div>

            {/* Quick CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <button
                onClick={() => scrollTo('projects')}
                data-cursor
                data-cursor-label="EXPLORE"
                className="group px-6 py-3.5 rounded-2xl bg-[#00f5ff] text-slate-950 font-display font-semibold text-sm tracking-wide shadow-[0_0_28px_rgba(0,245,255,0.4)] hover:shadow-[0_0_40px_rgba(0,245,255,0.6)] hover:bg-[#38bdf8] transition-all flex items-center gap-2"
              >
                <span>Explore Selected Work</span>
                <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenResume}
                data-cursor
                data-cursor-label="VIEW"
                className="px-5 py-3.5 rounded-2xl glass-card text-white hover:text-[#00f5ff] border border-white/10 hover:border-[#00f5ff]/40 text-sm font-mono tracking-wider transition-all flex items-center gap-2"
              >
                <FiDownload className="text-[#00f5ff]" />
                <span>Interactive Resume</span>
              </button>

              <button
                onClick={copyContact}
                data-cursor
                data-cursor-label="COPY"
                className="px-4 py-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-all flex items-center gap-2"
              >
                {copied ? <FiCheckCircle className="text-emerald-400" /> : <FiCopy />}
                <span>{copied ? 'Email Copied!' : 'ramnj08@gmail.com'}</span>
              </button>
            </motion.div>

            {/* Interactive Developer Terminal / System Inspector */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 max-w-2xl rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/70 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                    <FiTerminal className="text-[#00f5ff]" />
                    raman@production-node:~
                  </span>
                </div>

                {/* Interactive Tab Commands */}
                <div className="flex items-center gap-1.5">
                  {['stack', 'status', 'architecture'].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => setActiveTab(cmd)}
                      data-cursor
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                        activeTab === cmd
                          ? 'bg-[#00f5ff]/20 text-[#00f5ff] border border-[#00f5ff]/40'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      ${cmd}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-4 sm:p-5 font-mono text-xs text-slate-300 space-y-2 bg-slate-950/40">
                <div className="text-slate-500">
                  # Executing diagnostic output for <span className="text-[#00f5ff]">${activeTab}</span>:
                </div>
                {TERMINAL_COMMANDS[activeTab].map((line, i) => (
                  <motion.div
                    key={line + i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    className="leading-relaxed"
                  >
                    {line}
                  </motion.div>
                ))}
                <div className="pt-2 text-slate-500 flex items-center gap-2">
                  <span className="text-emerald-400">➜</span>
                  <span>Ready for next instruction...</span>
                  <span className="w-2 h-4 bg-[#00f5ff] animate-pulse inline-block" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Profile Artwork Showcase Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col items-center justify-center w-full"
          >
            <div className="w-full max-w-md rounded-3xl glass-panel border border-white/10 p-3 sm:p-4 shadow-2xl relative overflow-hidden group">
              {/* Card Header with View Switcher */}
              <div className="flex items-center justify-between px-2 py-1.5 mb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse" />
                  <span className="font-mono text-[11px] text-slate-300 tracking-wider">
                    {imageMode === 'art' ? 'CYBER_MOSAIC.RAW' : 'PORTRAIT_HQ.JPG'}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setImageMode('art')}
                    data-cursor
                    data-cursor-label="CYBER"
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider transition-all ${
                      imageMode === 'art'
                        ? 'bg-[#00f5ff] text-slate-950 font-semibold shadow-[0_0_12px_rgba(0,245,255,0.4)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    CYBER ART
                  </button>
                  <button
                    onClick={() => setImageMode('photo')}
                    data-cursor
                    data-cursor-label="PHOTO"
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider transition-all ${
                      imageMode === 'photo'
                        ? 'bg-[#00f5ff] text-slate-950 font-semibold shadow-[0_0_12px_rgba(0,245,255,0.4)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    PHOTO
                  </button>
                </div>
              </div>

              {/* Main Image Display Frame */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
                <img
                  src={imageMode === 'art' ? heroArt : profilePhoto}
                  alt="Raman — Full Stack Developer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Gradient & Status Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-semibold text-white text-sm">Raman</h4>
                    <p className="font-mono text-[11px] text-[#00f5ff]">Systems & Full-Stack Engineer</p>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    ONLINE
                  </span>
                </div>
              </div>

              {/* Bottom Metadata Bar */}
              <div className="mt-3 px-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Java 21 · Spring Boot</span>
                <span className="text-[#00f5ff]">React 19 · MySQL</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
