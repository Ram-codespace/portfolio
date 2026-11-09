import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 250)
          return 100
        }
        const step = Math.floor(Math.random() * 12) + 6
        return Math.min(prev + step, 100)
      })
    }, 70)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#030712] flex flex-col items-center justify-center px-6 select-none"
    >
      <div className="relative max-w-sm w-full flex flex-col items-center">
        {/* Monogram Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center border border-[#00f5ff]/30 shadow-[0_0_30px_rgba(0,245,255,0.2)]">
            <span className="font-display font-bold text-2xl tracking-tighter text-[#00f5ff]">R</span>
          </div>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00f5ff] animate-ping" />
        </motion.div>

        {/* Identity & Status */}
        <div className="flex items-center justify-between w-full text-xs font-mono mb-3 text-slate-400">
          <span className="tracking-[0.25em] text-white">RAMAN // FULL STACK</span>
          <span className="text-[#00f5ff] font-semibold">{progress}%</span>
        </div>

        {/* Precision Progress Track */}
        <div className="w-full h-1 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 to-[#00f5ff] rounded-full shadow-[0_0_12px_#00f5ff]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.1 }}
          />
        </div>

        {/* Micro System Diagnostics */}
        <div className="mt-4 flex items-center justify-between w-full text-[10px] font-mono text-slate-500">
          <span>{progress < 40 ? 'INITIALIZING KERNEL...' : progress < 75 ? 'LOADING SYSTEM MODULES...' : 'READY'}</span>
          <span>EST. 2026</span>
        </div>
      </div>
    </motion.div>
  )
}
