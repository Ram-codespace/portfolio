import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { FaJava, FaReact, FaGlobe } from 'react-icons/fa'
import { SiSpringboot } from 'react-icons/si'

const certs = [
  { title: 'Java', icon: FaJava },
  { title: 'Spring Boot', icon: SiSpringboot },
  { title: 'React', icon: FaReact },
  { title: 'Web Development', icon: FaGlobe },
]

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-28 md:py-36 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Certificates" title="Credentials" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: '0 0 30px rgba(0,245,255,0.15)' }}
              className="glass rounded-2xl p-8 text-center"
            >
              <c.icon className="text-4xl text-accent mx-auto mb-4" />
              <p className="font-display text-sm tracking-wide">{c.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
