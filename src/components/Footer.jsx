import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const SOCIALS = [
  { icon: FiGithub, href: 'https://github.com/Ram-codespace', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/raman-jain-0b2b0b1b1', label: 'LinkedIn' },
  { icon: FaWhatsapp, href: 'https://wa.me/919159239526', label: 'WhatsApp' },
  { icon: FiMail, href: 'mailto:ramaniyappan08@gmail.com', label: 'Email' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/10 px-4 sm:px-6 lg:px-8 py-12 bg-[#060b18] overflow-hidden">
      {/* Subtle Ambient Radial Highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00f5ff]/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Systems Status */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-slate-900 border border-[#00f5ff]/40 flex items-center justify-center">
              <span className="font-display font-bold text-xs text-[#00f5ff]">R</span>
            </div>
            <span className="font-display font-bold text-lg tracking-widest text-white">
              RAMAN
            </span>
          </div>
          <p className="font-mono text-xs text-slate-400">
            Full Stack Developer · Java, Spring Boot & React Specialist
          </p>
          <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              data-cursor
              data-cursor-label={s.label}
              aria-label={s.label}
              className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-slate-300 hover:text-[#00f5ff] hover:border-[#00f5ff]/40 transition-colors"
            >
              <s.icon size={16} />
            </a>
          ))}

          <button
            onClick={scrollToTop}
            data-cursor
            data-cursor-label="TOP"
            aria-label="Back to Top"
            className="w-10 h-10 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#00f5ff] hover:border-[#00f5ff]/40 transition-colors ml-2"
          >
            <FiArrowUp size={16} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-4">
        <span>© 2026 Raman. Handcrafted with React 19, Three.js & Tailwind CSS.</span>
        <span>Built to Meng To Engineering & Design Standards.</span>
      </div>
    </footer>
  )
}
