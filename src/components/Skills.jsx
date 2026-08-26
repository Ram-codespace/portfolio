import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import {
  FaJava, FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaDatabase,
} from 'react-icons/fa'
import {
  SiSpringboot, SiJavascript, SiTailwindcss, SiMysql, SiPostman, SiIntellijidea,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { TbApi } from 'react-icons/tb'
import { MdSecurity } from 'react-icons/md'

const groups = [
  {
    title: 'Backend',
    items: [
      { name: 'Java', icon: FaJava },
      { name: 'Spring Boot', icon: SiSpringboot },
      { name: 'REST API', icon: TbApi },
      { name: 'Spring Security', icon: MdSecurity },
      { name: 'Hibernate', icon: FaDatabase },
    ],
  },
  {
    title: 'Frontend',
    items: [
      { name: 'React.js', icon: FaReact },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'HTML5', icon: FaHtml5 },
      { name: 'CSS3', icon: FaCss3Alt },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
    ],
  },
  {
    title: 'Database',
    items: [
      { name: 'MySQL', icon: SiMysql },
      { name: 'Oracle', icon: FaDatabase },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git', icon: FaGitAlt },
      { name: 'GitHub', icon: FaGithub },
      { name: 'Postman', icon: SiPostman },
      { name: 'VS Code', icon: VscVscode },
      { name: 'IntelliJ IDEA', icon: SiIntellijidea },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading num="03" eyebrow="Skills" title="What I Work With" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              whileHover={{ y: -6 }}
              className="gradient-border glass rounded-2xl p-6 group"
            >
              <h3 className="font-display text-sm tracking-[0.3em] text-accent mb-6">
                {g.title.toUpperCase()}
              </h3>
              <ul className="space-y-4">
                {g.items.map((it) => (
                  <li
                    key={it.name}
                    className="flex items-center gap-3 text-mist group-hover:text-mist transition-colors hover:!text-white"
                  >
                    <it.icon className="text-lg text-white/70" />
                    <span className="text-sm">{it.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
