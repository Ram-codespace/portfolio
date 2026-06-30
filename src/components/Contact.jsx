import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import SectionHeading from './SectionHeading'
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin, FiFileText, FiSend } from 'react-icons/fi'

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

const contactInfo = [
  { icon: FiMail, label: 'Email', value: 'ramnj08@gmail.com', href: 'mailto:ramnj08@gmail.com' },
  { icon: FiPhone, label: 'Phone', value: '+91 9159239526', href: 'tel:+919159239526' },
  { icon: FiMapPin, label: 'Location', value: 'Chennai, Tamil Nadu', href: null },
]

const socials = [
  { icon: FiGithub, label: 'GitHub', href: '#' },
  { icon: FiLinkedin, label: 'LinkedIn', href: '#' },
  { icon: FiMail, label: 'Email', href: 'mailto:ramnj08@gmail.com' },
  { icon: FiFileText, label: 'Resume', href: '/resume.pdf' },
]

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, { publicKey: EMAILJS_PUBLIC_KEY })
      .then(() => {
        setStatus('success')
        formRef.current.reset()
        setTimeout(() => setStatus('idle'), 4000)
      })
      .catch(() => {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      })
  }

  return (
    <section id="contact" className="relative py-28 md:py-36 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display font-bold text-4xl md:text-6xl tracking-tight mb-16 max-w-2xl"
        >
          Let's Build Something <span className="text-accent">Amazing</span>
        </motion.h2>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <ul className="space-y-6 mb-10">
              {contactInfo.map((c) => (
                <li key={c.label} className="flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full glass flex items-center justify-center text-accent flex-shrink-0">
                    <c.icon size={16} />
                  </span>
                  <div>
                    <p className="text-xs text-mist tracking-wide">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} data-cursor className="hover:text-accent transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <p>{c.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  data-cursor
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full glass text-sm hover:border-accent/50 hover:text-accent transition-colors"
                >
                  <s.icon size={14} /> {s.label}
                </a>
              ))}
            </div>
          </div>

          <motion.form
            ref={formRef}
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 gradient-border glass rounded-2xl p-8 space-y-5"
          >
            <div>
              <label className="text-xs text-mist tracking-wide mb-2 block">Name</label>
              <input
                name="user_name"
                required
                type="text"
                placeholder="Your name"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-mist tracking-wide mb-2 block">Email</label>
              <input
                name="user_email"
                required
                type="email"
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-mist tracking-wide mb-2 block">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              data-cursor
              disabled={status === 'sending'}
              className="flex items-center gap-2 px-7 py-3.5 bg-accent text-black font-display font-medium text-sm tracking-wide rounded-full hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-shadow disabled:opacity-60"
            >
              <FiSend size={14} />
              {status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent!' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-xs text-accent">Thanks — I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="text-xs text-red-400">Something went wrong. Please email me directly.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
