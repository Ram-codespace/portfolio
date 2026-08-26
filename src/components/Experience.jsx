import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const responsibilities = [
  'Built REST APIs',
  'Developed CRUD applications',
  'Worked with Spring Boot',
  'Designed MySQL databases',
  'Used Git and Postman',
  'Built responsive interfaces',
]

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading num="04" eyebrow="Experience" title="Where I've Been" />

        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-white/15 to-transparent" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <span className="absolute -left-[39px] md:-left-[55px] top-2 w-3 h-3 rounded-full bg-accent shadow-[0_0_16px_#00F5FF]" />

            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
              <h3 className="font-display text-2xl md:text-3xl font-semibold">
                Java Full Stack Developer Trainee
              </h3>
              <span className="font-display text-sm text-accent tracking-widest"></span>
            </div>
            <p className="text-mist mb-6">Professional Training</p>

            <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
              {responsibilities.map((r, i) => (
                <motion.div
                  key={r}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex items-center gap-3 text-sm text-mist glass rounded-lg px-4 py-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  {r}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
