import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown } from 'react-icons/fi'
import Background from './Background'

const reveal = {
  hidden: { y: 60, opacity: 0 },
  show: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24">
      <Suspense fallback={null}>
        <Background />
      </Suspense>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <motion.p
          initial="hidden"
          animate="show"
          custom={0}
          variants={reveal}
          className="font-display text-xs md:text-sm tracking-[0.4em] text-accent mb-6"
        >
          // RAMAN&nbsp;&nbsp;·&nbsp;&nbsp;FULL STACK DEVELOPER
        </motion.p>

        <h1 className="font-display font-bold leading-[0.92] tracking-tight">
          <motion.span
            initial="hidden"
            animate="show"
            custom={1}
            variants={reveal}
            className="block text-[14vw] md:text-[7.5rem] text-white text-glow"
          >
            FULL STACK
          </motion.span>
          <motion.span
            initial="hidden"
            animate="show"
            custom={2}
            variants={reveal}
            className="block text-[14vw] md:text-[7.5rem] text-transparent"
            style={{ WebkitTextStroke: '1.5px #9CA3AF' }}
          >
            DEVELOPER
          </motion.span>
        </h1>

        <motion.p
          initial="hidden"
          animate="show"
          custom={3}
          variants={reveal}
          className="mt-8 font-display text-base md:text-lg text-mist tracking-wide"
        >
          Java&nbsp; • &nbsp;Spring Boot&nbsp; • &nbsp;React.js&nbsp; • &nbsp;MySQL
        </motion.p>

        <motion.p
          initial="hidden"
          animate="show"
          custom={4}
          variants={reveal}
          className="mt-5 max-w-xl text-mist leading-relaxed"
        >
          I build scalable, secure and modern web applications using Java, Spring Boot,
          React.js and MySQL. Passionate about solving real-world problems through clean
          architecture and intuitive user experiences.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          custom={5}
          variants={reveal}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            data-cursor
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="px-7 py-3.5 bg-accent text-black font-display font-medium text-sm tracking-wide rounded-full hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-shadow"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            data-cursor
            download
            className="px-7 py-3.5 glass text-white font-display font-medium text-sm tracking-wide rounded-full hover:border-accent/50 transition-colors"
          >
            Download Resume
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-mist"
      >
        <span className="text-[10px] tracking-[0.3em] font-display">SCROLL</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <FiArrowDown className="text-accent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
