import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import SectionHeading from './SectionHeading'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.floor(v)),
    })
    return controls.stop
  }, [inView, value])

  return (
    <span ref={ref} className="font-display text-5xl md:text-6xl font-bold text-glow">
      {display}{suffix}
    </span>
  )
}

const stats = [
  { value: 4, suffix: '+', label: 'Projects' },
  { value: 15, suffix: '+', label: 'Technologies' },
  { value: 100, suffix: '%', label: 'Responsive Design' },
]

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading num="02" eyebrow="About" title="About Me" />

        <div className="grid md:grid-cols-12 gap-12">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7 text-lg md:text-xl text-mist leading-relaxed"
          >
            I am a <span className="text-white">Full Stack Developer</span> with a Bachelor's
            degree in Computer Science. I specialize in Java, Spring Boot, React.js, MySQL,
            REST APIs, and responsive web applications. I enjoy building scalable applications
            with clean architecture and excellent user experience.
          </motion.p>

          <div className="md:col-span-5 grid grid-cols-3 md:grid-cols-1 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-white/10 pl-5">
                <Counter value={s.value} suffix={s.suffix} />
                <p className="text-mist text-sm mt-2 tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
