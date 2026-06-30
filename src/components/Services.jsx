import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { TbApi, TbDeviceLaptop } from 'react-icons/tb'
import { FaServer } from 'react-icons/fa'

const services = [
  {
    icon: FaServer,
    title: 'Backend Development',
    desc: 'Robust, secure server-side systems built with Java and Spring Boot — clean architecture, solid data modeling, and reliable business logic.',
  },
  {
    icon: TbApi,
    title: 'REST API Development',
    desc: 'Well-documented, versioned REST APIs designed for performance, security, and easy integration with any frontend or third-party service.',
  },
  {
    icon: TbDeviceLaptop,
    title: 'Responsive Web Applications',
    desc: 'Interfaces built with React.js and Tailwind CSS that adapt seamlessly across desktop, tablet, and mobile — fast, accessible, and polished.',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Services" title="What I Offer" />

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="gradient-border glass rounded-2xl p-8"
            >
              <s.icon className="text-3xl text-accent mb-6" />
              <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-mist text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
