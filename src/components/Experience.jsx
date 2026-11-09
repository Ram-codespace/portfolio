import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { FiBriefcase, FiAward, FiCalendar, FiMapPin, FiCheckCircle } from 'react-icons/fi'

const TIMELINE = [
  {
    type: 'Experience',
    role: 'Java Full Stack Developer — Professional Training Program',
    organization: 'Professional Training Program · Techpanda, via Trainer Central by Zoho',
    period: 'Nov 2025 – Jul 2026',
    location: 'Chennai, Tamil Nadu',
    highlight: '6+ Hands-on Projects, 15+ REST Endpoints, MySQL 8+ Tables, HTML5/CSS3/ES6+ UI',
    details: [
      'Built Java applications using Core Java, OOP, Collections, Exception Handling, and JDBC across 6+ hands-on projects during the training program.',
      'Engineered RESTful back-end APIs with Spring Boot, implementing CRUD operations across 15+ endpoints for full stack web applications.',
      'Designed and managed MySQL databases with 8+ relational tables, applying strong database management and organizational skills to keep schema design consistent across projects.',
      'Created responsive web interfaces and user interfaces using HTML5, CSS3, and JavaScript (ES6+), following modern web design practices.',
      'Applied MVC architecture and SDLC practices consistently across 3 full stack projects, using strong problem-solving skills to debug and resolve integration issues.',
      'Collaborated using Git, GitHub, and Postman for version control and REST API testing, maintaining zero merge conflicts through clear verbal communication with teammates.',
    ],
    skills: ['Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'JDBC', 'MySQL', 'React.js', 'HTML5/CSS3', 'REST APIs', 'Postman', 'Git', 'Maven'],
  },
  {
    type: 'Education',
    role: 'Bachelor of Science (B.Sc.) in Computer Science',
    organization: 'St. Joseph’s College of Arts and Science',
    period: '2022 – 2025',
    location: 'Chennai, Tamil Nadu',
    highlight: 'Rigorous Academic Foundation in Computer Science, OOP, Relational Databases & Web Architecture',
    details: [
      'Studied foundational and advanced computer science topics: Object-Oriented Programming, Database Management Systems, Data Structures, Web Development, and Computer Networks.',
      'Completed practical coursework in software engineering methodologies, algorithm analysis, and database schema normalization.',
      'Developed strong algorithmic problem-solving skills, verbal communication, and collaborative coding practices.',
    ],
    skills: ['Computer Science Fundamentals', 'DBMS & SQL', 'Java', 'Python', 'OOP', 'Data Structures', 'Web Technologies'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          num="04"
          eyebrow="Milestones & Path"
          title="Education & Practical Training"
          subtitle="A structured journey from academic Computer Science fundamentals to production full-stack systems engineering."
        />

        <div className="relative mt-12 pl-6 sm:pl-10 space-y-12">
          {/* Glowing Vertical Rail */}
          <div className="absolute left-0 top-3 bottom-3 w-px bg-gradient-to-b from-[#00f5ff] via-sky-500/30 to-transparent" />

          {TIMELINE.map((item, idx) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="relative"
            >
              {/* Timeline Beacon Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#030712] border-2 border-[#00f5ff] flex items-center justify-center shadow-[0_0_16px_#00f5ff]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff]" />
              </div>

              {/* Main Card */}
              <div className="p-7 sm:p-8 rounded-3xl liquid-glass-card border border-white/15 hover:border-[#38bdf8]/45 transition-all shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg liquid-glass-pill flex items-center justify-center text-[#38bdf8]">
                      {item.type === 'Education' ? <FiAward size={16} /> : <FiBriefcase size={16} />}
                    </span>
                    <span className="liquid-glass-pill text-[10px] text-[#38bdf8] border-[#38bdf8]/30 uppercase font-semibold">
                      {item.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar className="text-[#38bdf8]" />
                      {item.period}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <FiMapPin className="text-[#38bdf8]" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl text-white sm:text-3xl">
                  {item.role}
                </h3>
                <p className="font-mono text-sm text-slate-300 mt-1">
                  {item.organization}
                </p>

                <p className="text-sm text-emerald-300 mt-3 font-mono font-medium">
                  {item.highlight}
                </p>

                <div className="mt-5 space-y-2.5">
                  {item.details.map((detail, di) => (
                    <div key={di} className="flex items-start gap-3 text-sm text-slate-300 font-light leading-relaxed">
                      <FiCheckCircle className="text-emerald-400 mt-1 flex-shrink-0 text-xs" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="liquid-glass-pill text-xs py-1 px-3 text-slate-300 border-white/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
