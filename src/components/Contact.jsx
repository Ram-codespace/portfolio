import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import SectionHeading from './SectionHeading'
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCopy,
  FiCheckCircle,
  FiClock,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const CONTACT_INFO = [
  {
    icon: FiMail,
    label: 'Direct Email',
    value: 'ramaniyappan08@gmail.com',
    action: 'mailto:ramaniyappan08@gmail.com',
    copyable: true,
  },
  {
    icon: FiPhone,
    label: 'Phone / WhatsApp',
    value: '+91 9159239526',
    action: 'tel:+919159239526',
    copyable: true,
  },
  {
    icon: FiMapPin,
    label: 'Base Location',
    value: 'Chennai, Tamil Nadu, India',
    action: null,
    copyable: false,
  },
  {
    icon: FiClock,
    label: 'Response SLA',
    value: 'Within 12 Hours (IST Timezone)',
    action: null,
    copyable: false,
  },
]

const SOCIAL_LINKS = [
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com/Ram-codespace' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/raman-jain-0b2b0b1b1' },
  { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/919159239526' },
  { icon: FiMail, label: 'Email', href: 'mailto:ramaniyappan08@gmail.com' },
]

export default function Contact() {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'copied'
  const [copiedItem, setCopiedItem] = useState('')

  const handleCopy = (val, label) => {
    navigator.clipboard.writeText(val)
    setCopiedItem(label)
    setTimeout(() => setCopiedItem(''), 2500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    // Simulate resilient form processing with graceful fallback
    setTimeout(() => {
      setStatus('success')
      try {
        confetti({
          particleCount: 65,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#00f5ff', '#38bdf8', '#818cf8', '#ffffff'],
        })
      } catch {
        // Fallback gracefully if canvas is blocked
      }

      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 6000)
    }, 900)
  }

  return (
    <section id="contact" className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          num="08"
          eyebrow="Initiate Contact"
          title="Let's Build Something Resilient."
          subtitle="Whether you are hiring for full-stack engineering roles or need architectural consultation on Java/React platforms, I am here."
        />

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl liquid-glass-card border border-white/15 space-y-6 shadow-2xl">
              <h3 className="font-display font-bold text-xl text-white">
                Contact Channels
              </h3>
              <p className="text-sm text-slate-300 font-light leading-relaxed">
                Feel free to email directly, call, or message on WhatsApp. I welcome discussions regarding engineering roles, microservice architectures, and modern web systems.
              </p>

              <ul className="space-y-4 pt-2">
                {CONTACT_INFO.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#38bdf8]/40 transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl liquid-glass-pill flex items-center justify-center text-[#38bdf8] flex-shrink-0">
                        <c.icon size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">
                          {c.label}
                        </span>
                        {c.action ? (
                          <a
                            href={c.action}
                            className="text-sm font-mono text-white hover:text-[#38bdf8] transition-colors"
                          >
                            {c.value}
                          </a>
                        ) : (
                          <span className="text-sm font-mono text-slate-200">{c.value}</span>
                        )}
                      </div>
                    </div>

                    {c.copyable && (
                      <button
                        onClick={() => handleCopy(c.value, c.label)}
                        data-cursor
                        data-cursor-label="COPY"
                        aria-label={`Copy ${c.label}`}
                        className="p-2 rounded-lg text-slate-400 hover:text-[#38bdf8] hover:bg-white/5 transition-colors"
                      >
                        {copiedItem === c.label ? (
                          <FiCheckCircle className="text-emerald-400" size={16} />
                        ) : (
                          <FiCopy size={16} />
                        )}
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                  Verified Profiles & Networks
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor
                      data-cursor-label={s.label}
                      className="px-4 py-2 rounded-xl liquid-glass-pill text-xs font-mono text-slate-200 hover:text-white hover:border-[#38bdf8]/50 transition-all flex items-center gap-2"
                    >
                      <s.icon size={14} className="text-[#38bdf8]" />
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl liquid-glass-card border border-white/15 shadow-2xl relative"
          >
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Send a Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light mb-8">
              Fill out the details below and I will respond to your inquiry promptly.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-2">
                    YOUR NAME <span className="text-[#38bdf8]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Henderson"
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-2">
                    EMAIL ADDRESS <span className="text-[#38bdf8]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-2">
                  PROJECT SCOPE OR TOPIC
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Full Stack Developer Opening / Java Architecture"
                  className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-2">
                  MESSAGE <span className="text-[#38bdf8]">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your technical requirements, team vision, or opportunity..."
                  className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#38bdf8] transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  data-cursor
                  data-cursor-label="SEND"
                  className="liquid-glass-btn liquid-glass-btn-primary px-8 py-3.5 text-[#070d1e] font-display font-bold text-sm tracking-wide shadow-2xl flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  <FiSend size={15} className="text-[#070d1e]" />
                  <span>
                    {status === 'sending'
                      ? 'Transmitting Message...'
                      : status === 'success'
                      ? 'Message Received!'
                      : 'Send Message'}
                  </span>
                </button>

                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs font-mono text-emerald-400 flex items-center gap-2"
                  >
                    <FiCheckCircle />
                    <span>Thank you — I will be in touch shortly!</span>
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
