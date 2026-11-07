import { useEffect, useRef } from 'react'

/**
 * LiquidGlassOrbs Component
 * Renders tranquil, hyper-detailed Apple VisionOS-inspired morphing liquid glass orbs
 * in serene emerald green and deep sapphire blue with specular highlights and soft lighting.
 */
export default function LiquidGlassOrbs({ variant = 'hero' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0
    let animationFrameId

    const handlePointerMove = (e) => {
      const { innerWidth, innerHeight } = window
      mouseX = (e.clientX / innerWidth - 0.5) * 40
      mouseY = (e.clientY / innerHeight - 0.5) * 40
    }

    const animate = () => {
      currentX += (mouseX - currentX) * 0.05
      currentY += (mouseY - currentY) * 0.05

      if (el) {
        el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  if (variant === 'hero') {
    return (
      <div
        ref={containerRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden z-[5] will-change-transform"
      >
        {/* Orb 1: Ethereal Aurora Lens (Top-Left Shoulder) */}
        <div
          className="liquid-orb liquid-orb-aurora w-72 h-72 md:w-96 md:h-96 top-[18%] -left-12 md:left-[6%] opacity-25 blur-[4px]"
          style={{ animationDuration: '22s', animationDelay: '0s' }}
        />

        {/* Orb 2: Crystalline Lens (Right Hip / Torso) */}
        <div
          className="liquid-orb liquid-orb-crystal w-80 h-80 md:w-[26rem] md:h-[26rem] top-[30%] -right-16 md:right-[8%] opacity-20 blur-[4px]"
          style={{ animationDuration: '26s', animationDelay: '-6s' }}
        />

        {/* Orb 3: Small Floating Dewdrop (Lower Center-Left) */}
        <div
          className="liquid-orb liquid-orb-aurora w-36 h-36 md:w-44 md:h-44 bottom-[24%] left-[16%] md:left-[22%] opacity-25"
          style={{ animationDuration: '18s', animationDelay: '-9s' }}
        />

        {/* Orb 4: Floating Dewdrop (Upper Right Crest) */}
        <div
          className="liquid-orb liquid-orb-crystal w-28 h-28 md:w-40 md:h-40 top-[14%] right-[20%] opacity-20"
          style={{ animationDuration: '20s', animationDelay: '-3s' }}
        />

        {/* Tranquil Soft Cyan & Sapphire Atmospheric Depth */}
        <div className="absolute top-[28%] left-[18%] w-[32rem] h-[32rem] rounded-full bg-sky-500/8 blur-[140px] pointer-events-none" />
        <div className="absolute top-[36%] right-[15%] w-[36rem] h-[36rem] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />
      </div>
    )
  }

  // Section variant (About / Projects / Contact)
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden -z-10 will-change-transform"
    >
      <div
        className="liquid-orb liquid-orb-aurora w-72 h-72 top-[10%] -left-12 opacity-20 blur-[4px]"
        style={{ animationDuration: '24s' }}
      />
      <div
        className="liquid-orb liquid-orb-crystal w-64 h-64 bottom-[15%] -right-8 opacity-20 blur-[4px]"
        style={{ animationDuration: '20s', animationDelay: '-5s' }}
      />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-sky-500/6 blur-[120px] pointer-events-none" />
    </div>
  )
}
