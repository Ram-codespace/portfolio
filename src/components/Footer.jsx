import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const socials = [
  { icon: FiGithub, href: 'https://github.com/Ram-codespace', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/raman-jain-0b2b0b1b1', label: 'LinkedIn' },
  { icon: FiMail, href: 'mailto:ramnj08@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 lg:px-10 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-display text-lg tracking-[0.2em]">RAMAN</p>
          <p className="text-xs text-mist mt-1">Full Stack Developer</p>
        </div>

        <div className="flex gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              data-cursor
              aria-label={s.label}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-accent hover:border-accent/50 transition-colors"
            >
              <s.icon size={15} />
            </a>
          ))}
        </div>

        <p className="text-xs text-mist">© 2026 Raman. All rights reserved.</p>
      </div>
    </footer>
  )
}
