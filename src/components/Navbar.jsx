import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiArrowUpRight, FiFileText } from 'react-icons/fi'

const NAV_LINKS = [
  { id: 'home', label: 'Home', num: '01' },
  { id: 'about', label: 'About', num: '02' },
  { id: 'skills', label: 'Skills', num: '03' },
  { id: 'experience', label: 'Experience', num: '04' },
  { id: 'projects', label: 'Projects', num: '05' },
  { id: 'services', label: 'Services', num: '06' },
  { id: 'contact', label: 'Contact', num: '07' },
]

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)

      // Determine active section
      const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
      const scrollPos = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i]
        if (sec.offsetTop <= scrollPos) {
          setActiveSection(sec.id)
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const scrollTo = (id) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'liquid-glass-card border-white/20 shadow-2xl backdrop-blur-2xl'
              : 'bg-slate-950/20 border border-white/5 backdrop-blur-md'
          }`}
        >
          {/* Logo / Brand Name */}
          <button
            onClick={() => scrollTo('home')}
            data-cursor
            data-cursor-label="TOP"
            className="group relative z-50 text-left focus:outline-none"
          >
            <span className="font-display font-black text-xl md:text-2xl tracking-widest uppercase text-white block transition-colors duration-300 group-hover:text-[#38bdf8]">
              RAMAN
            </span>
            <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#38bdf8] transition-transform duration-500 ease-out group-hover:scale-x-100 shadow-[0_0_8px_#38bdf8]" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-white/[0.03] p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  data-cursor
                  className={`group relative px-3.5 py-1 rounded-full text-xs uppercase tracking-wider font-mono font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/15 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Quick Actions (Liquid Glass Buttons) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenResume}
              data-cursor
              data-cursor-label="RESUME"
              className="liquid-glass-btn px-4 py-1.5 text-xs font-mono text-slate-200 hover:text-white flex items-center gap-1.5"
            >
              <FiFileText className="text-white/80" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => scrollTo('contact')}
              data-cursor
              data-cursor-label="CONTACT"
              className="liquid-glass-btn liquid-glass-btn-primary px-4 py-1.5 text-xs font-display font-semibold text-[#070d1e] flex items-center gap-1.5"
            >
              <span>Get in Touch</span>
              <FiArrowUpRight size={13} className="text-[#070d1e]" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-cursor
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-300 hover:text-[#00f5ff] transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden mx-4 sm:mx-6 mt-2 rounded-2xl glass-panel p-5 border border-white/10 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => scrollTo(link.id)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-mono text-left transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#00f5ff]/15 text-[#00f5ff] border border-[#00f5ff]/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#00f5ff]/60">{link.num}</span>
                    <span>{link.label}</span>
                  </div>
                  {activeSection === link.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff]" />
                  )}
                </motion.button>
              ))}

              <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onOpenResume()
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-mono text-slate-200 glass-card flex items-center justify-center gap-2"
                >
                  <FiFileText className="text-[#00f5ff]" /> View Full Resume
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="w-full py-2.5 rounded-xl text-xs font-display font-medium text-slate-950 bg-[#00f5ff] flex items-center justify-center gap-1.5"
                >
                  Get in Touch <FiArrowUpRight />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
