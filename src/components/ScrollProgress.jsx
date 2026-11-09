import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.0005,
  })

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[95] pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-sky-400 via-[#00f5ff] to-cyan-300 origin-left"
        style={{
          scaleX,
          boxShadow: '0 0 12px rgba(0, 245, 255, 0.7)',
        }}
      />
    </div>
  )
}
