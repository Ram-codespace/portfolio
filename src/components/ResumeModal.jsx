import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX,
  FiPrinter,
  FiDownload,
  FiExternalLink,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiFileText,
  FiCheck,
  FiAward,
} from 'react-icons/fi'

export default function ResumeModal({ isOpen, onClose }) {
  const [viewMode, setViewMode] = useState('pdf') // 'paper' or 'pdf'

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[160] flex items-center justify-center p-3 sm:p-5 lg:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#050a18]/85 backdrop-blur-xl -z-10"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[94vh] flex flex-col rounded-3xl liquid-glass-card border border-white/20 shadow-2xl bg-[#091124]/98 overflow-hidden"
        >
          {/* Top Control Bar */}
          <div className="px-5 py-3.5 sm:px-8 sm:py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-white/[0.02]">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] animate-pulse" />
              <div className="flex items-center bg-white/[0.04] p-1 rounded-full border border-white/10">
                <button
                  onClick={() => setViewMode('paper')}
                  data-cursor
                  className={`px-3.5 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'paper'
                      ? 'liquid-glass-btn liquid-glass-btn-primary text-[#070d1e] font-bold shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <FiFileText size={13} />
                  <span>Interactive CV</span>
                </button>
                <button
                  onClick={() => setViewMode('pdf')}
                  data-cursor
                  className={`px-3.5 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    viewMode === 'pdf'
                      ? 'liquid-glass-btn liquid-glass-btn-primary text-[#070d1e] font-bold shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <FiExternalLink size={13} />
                  <span>Official PDF Document</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <a
                href="/Raman_Resume.pdf"
                download="Raman_FullStack_Resume.pdf"
                data-cursor
                data-cursor-label="DOWNLOAD"
                className="liquid-glass-btn liquid-glass-btn-primary px-4 py-1.5 text-xs font-display font-bold text-[#070d1e] flex items-center gap-1.5 shadow-lg cursor-pointer"
              >
                <FiDownload size={14} className="text-[#070d1e]" />
                <span>Download PDF</span>
              </a>

              <a
                href="/Raman_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                data-cursor
                data-cursor-label="OPEN"
                className="liquid-glass-btn px-3 py-1.5 text-xs font-mono text-white hidden sm:flex items-center gap-1.5 cursor-pointer"
              >
                <FiExternalLink size={13} />
                <span>Open in Tab</span>
              </a>

              <button
                onClick={handlePrint}
                data-cursor
                data-cursor-label="PRINT"
                className="liquid-glass-btn px-3 py-1.5 text-xs font-mono text-white hidden md:flex items-center gap-1.5 cursor-pointer"
              >
                <FiPrinter size={13} />
                <span>Print</span>
              </button>

              <button
                onClick={onClose}
                data-cursor
                aria-label="Close resume sheet"
                className="w-8 h-8 rounded-full liquid-glass-pill flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer ml-1"
              >
                <FiX size={17} />
              </button>
            </div>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 custom-scrollbar">
            {viewMode === 'pdf' ? (
              /* PDF View */
              <div className="flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-3 px-1 text-xs font-mono text-slate-300">
                  <span>Authentic 1:1 Uploaded Document (Raman_Resume.pdf)</span>
                  <a
                    href="/Raman_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#38bdf8] hover:underline flex items-center gap-1"
                  >
                    <span>Full Screen</span>
                    <FiExternalLink size={12} />
                  </a>
                </div>
                <div className="w-full h-[75vh] rounded-2xl overflow-hidden border border-white/20 bg-slate-950 shadow-2xl">
                  <iframe
                    src="/Raman_Resume.pdf#toolbar=1&view=FitH"
                    title="Raman Official Resume"
                    className="w-full h-full border-0"
                  />
                </div>
                <p className="text-xs text-slate-400 font-mono mt-3">
                  Tip: If your browser does not render inline PDFs,{' '}
                  <a href="/Raman_Resume.pdf" download="Raman_FullStack_Resume.pdf" className="text-[#38bdf8] underline">
                    click here to download directly
                  </a>.
                </p>
              </div>
            ) : (
              /* Executive Clean Document View */
              <div className="max-w-4xl mx-auto space-y-8 text-slate-200">
                {/* Header Profile Identity */}
                <div className="pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                      Raman
                    </h1>
                    <p className="font-mono text-base text-[#38bdf8] font-medium mt-1">
                      Java Full Stack Software Developer
                    </p>
                    <p className="text-xs text-slate-300 mt-1 font-light">
                      Specialized in Core Java, Spring Boot, Spring Security, MySQL &amp; React.js
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-slate-300">
                    <a
                      href="mailto:ramaniyappan08@gmail.com"
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <FiMail className="text-[#38bdf8] shrink-0" />
                      <span>ramaniyappan08@gmail.com</span>
                    </a>
                    <a
                      href="tel:+919159239526"
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <FiPhone className="text-[#38bdf8] shrink-0" />
                      <span>+91 9159239526</span>
                    </a>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-[#38bdf8] shrink-0" />
                      <span>Chennai, Tamil Nadu, India</span>
                    </div>
                    <a
                      href="https://github.com/Ram-codespace"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 hover:text-white transition-colors text-[#38bdf8]"
                    >
                      <FiGithub className="shrink-0" />
                      <span>github.com/Ram-codespace</span>
                    </a>
                  </div>
                </div>

                {/* Executive Summary */}
                <section>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] font-bold mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                    <span>Executive Summary</span>
                  </h2>
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 leading-relaxed text-sm text-slate-300 font-light">
                    Java Full Stack Software Developer with a <strong className="text-white font-medium">B.Sc. in Computer Science (2025)</strong> and hands-on experience building end-to-end web applications across <strong className="text-white font-medium">Java, Spring Boot, React.js, PHP, and MySQL</strong>. Comfortable across the entire web architecture — designing RESTful back-end APIs and relational databases on the server, and building responsive, user-friendly client interfaces with HTML5, CSS3, and JavaScript (ES6+). Known for strong problem-solving skills, excellent verbal communication, organizational skills, and attention to detail — applying Spring Security, Spring Data JPA/Hibernate, Git, GitHub, Postman, Maven, Docker, and Agile practices to deliver reliable software end to end.
                  </div>
                </section>

                {/* Technical Competencies Grid */}
                <section>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] font-bold mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                    <span>Technical Competencies</span>
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[#38bdf8] font-semibold block mb-1">Languages &amp; Core</span>
                      <span className="text-slate-300 leading-relaxed">Java (Core &amp; OOP), Python, JavaScript (ES6+), PHP, SQL, HTML5, CSS3</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[#38bdf8] font-semibold block mb-1">Back End Engineering</span>
                      <span className="text-slate-300 leading-relaxed">Spring Boot 3, Spring Security, Spring Data JPA, Hibernate, JDBC, RESTful APIs</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[#38bdf8] font-semibold block mb-1">Front End Development</span>
                      <span className="text-slate-300 leading-relaxed">React.js, Responsive Design, Tailwind CSS, Modern DOM Manipulation</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[#38bdf8] font-semibold block mb-1">Database &amp; Storage</span>
                      <span className="text-slate-300 leading-relaxed">MySQL, Oracle (Basics), 3NF Normalization, ACID Transactions, CRUD Operations</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[#38bdf8] font-semibold block mb-1">Architecture &amp; Patterns</span>
                      <span className="text-slate-300 leading-relaxed">MVC Architecture, Microservices, Client-Server Systems, OOP Principles</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[#38bdf8] font-semibold block mb-1">Developer Tools &amp; Build</span>
                      <span className="text-slate-300 leading-relaxed">Git, GitHub, Postman, Apache Maven, Docker, IntelliJ IDEA, VS Code</span>
                    </div>
                  </div>
                </section>

                {/* Professional Experience */}
                <section>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] font-bold mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                    <span>Professional Experience &amp; Practical Training</span>
                  </h2>
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-white/10">
                      <div>
                        <h3 className="font-display font-bold text-base sm:text-lg text-white">
                          Java Full Stack Developer — Professional Training Program
                        </h3>
                        <p className="text-xs font-mono text-slate-300 mt-0.5">
                          Professional IT Training Program · Chennai, Tamil Nadu
                        </p>
                      </div>
                      <span className="text-xs font-mono text-[#38bdf8] font-semibold shrink-0">
                        Nov 2025 – Jul 2026
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <FiCheck className="text-[#38bdf8] mt-1 shrink-0" />
                        <span>Built Java applications using Core Java, OOP, Collections, Exception Handling, and JDBC across <strong className="text-white font-normal">6+ hands-on projects</strong> during the training program.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <FiCheck className="text-[#38bdf8] mt-1 shrink-0" />
                        <span>Engineered RESTful back-end APIs with Spring Boot, implementing CRUD operations across <strong className="text-white font-normal">15+ endpoints</strong> for full stack web applications.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <FiCheck className="text-[#38bdf8] mt-1 shrink-0" />
                        <span>Designed and managed MySQL databases with <strong className="text-white font-normal">8+ relational tables</strong>, applying strong database management and organizational skills to keep schema design consistent across projects.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <FiCheck className="text-[#38bdf8] mt-1 shrink-0" />
                        <span>Created responsive web interfaces and user interfaces using HTML5, CSS3, and JavaScript (ES6+), following modern web design practices.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <FiCheck className="text-[#38bdf8] mt-1 shrink-0" />
                        <span>Applied MVC architecture and SDLC practices consistently across 3 full stack projects, using strong problem-solving skills to debug and resolve integration issues.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <FiCheck className="text-[#38bdf8] mt-1 shrink-0" />
                        <span>Collaborated using Git, GitHub, and Postman for version control and REST API testing, maintaining zero merge conflicts through clear verbal communication with teammates.</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Featured Production Projects */}
                <section>
                  <h2 className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] font-bold mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                    <span>Featured Production Projects</span>
                  </h2>
                  <div className="space-y-4">
                    {/* Project 1: MedBook */}
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="font-display font-bold text-base text-white">
                          Hospital Appointment Scheduling System (MedBook)
                        </h3>
                        <span className="text-xs font-mono text-[#38bdf8]">
                          Java · Spring Boot · MySQL · React · Spring Security
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-[#38bdf8] font-bold mt-0.5">•</span>
                          <span>Developed a full stack web application with separate back-end and front-end modules, supporting 3 user roles (patient, doctor, admin) across appointment workflows.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#38bdf8] font-bold mt-0.5">•</span>
                          <span>Engineered 12+ RESTful back-end APIs in Java and Spring Boot to handle patient, doctor, and appointment operations.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#38bdf8] font-bold mt-0.5">•</span>
                          <span>Modeled 7 relational entities in MySQL using Spring Data JPA/Hibernate for persistence and CRUD operations.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#38bdf8] font-bold mt-0.5">•</span>
                          <span>Secured back-end endpoints with Spring Security, enforcing role-based access control across all API routes.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Project 2: Bank Management System */}
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <h3 className="font-display font-bold text-base text-white">
                          Bank Management System
                        </h3>
                        <span className="text-xs font-mono text-[#38bdf8]">
                          Java · Spring Boot · MySQL · OOP · JDBC
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-[#38bdf8] font-bold mt-0.5">•</span>
                          <span>Built a banking web application supporting account management, deposits, withdrawals, and fund transfers for up to 4 account types.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#38bdf8] font-bold mt-0.5">•</span>
                          <span>Delivered REST back-end APIs for 10+ account and transaction operations using Spring Boot.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#38bdf8] font-bold mt-0.5">•</span>
                          <span>Structured 5 MySQL tables with CRUD logic implemented via SQL and Spring Data JPA.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#38bdf8] font-bold mt-0.5">•</span>
                          <span>Applied OOP principles, MVC architecture, and input validation to handle edge cases such as insufficient balance and invalid transfers.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Education & Verified Certifications */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Education */}
                  <section>
                    <h2 className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] font-bold mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                      <span>Education</span>
                    </h2>
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                      <h3 className="font-display font-bold text-sm sm:text-base text-white">
                        Bachelor of Science (B.Sc.) in Computer Science
                      </h3>
                      <p className="text-xs font-mono text-[#38bdf8]">
                        St. Joseph’s College of Arts and Science
                      </p>
                      <p className="text-xs text-slate-300 font-light">
                        2022 – 2025 · Chennai, Tamil Nadu
                      </p>
                      <p className="text-xs text-slate-400 font-light pt-2 leading-relaxed">
                        Coursework: Object-Oriented Programming, Relational DBMS &amp; SQL, Data Structures &amp; Algorithms, Web Architecture, Software Engineering SDLC.
                      </p>
                    </div>
                  </section>

                  {/* Certifications */}
                  <section>
                    <h2 className="text-xs font-mono uppercase tracking-widest text-[#38bdf8] font-bold mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                      <span>Verified Certifications</span>
                    </h2>
                    <div className="space-y-2.5">
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                        <FiAward className="text-[#38bdf8] mt-1 shrink-0 text-base" />
                        <div>
                          <h4 className="text-xs font-display font-semibold text-white">Java Full Stack Developer</h4>
                          <p className="text-[11px] text-slate-300 font-light">Techpanda, via Trainer Central by Zoho</p>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                        <FiAward className="text-[#38bdf8] mt-1 shrink-0 text-base" />
                        <div>
                          <h4 className="text-xs font-display font-semibold text-white">Data Science &amp; Analytics using Python</h4>
                          <p className="text-[11px] text-slate-300 font-light">PG &amp; Research Dept of Computer Science &amp; AI</p>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                        <FiAward className="text-[#38bdf8] mt-1 shrink-0 text-base" />
                        <div>
                          <h4 className="text-xs font-display font-semibold text-white">Web Development Fundamentals</h4>
                          <p className="text-[11px] text-slate-300 font-light">IBM SkillsBuild</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
