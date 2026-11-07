import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [label, setLabel] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(true)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isTouch || prefersReducedMotion) {
      setIsTouchOrReduced(true)
      return
    }

    setIsTouchOrReduced(false)

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let rafId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setIsVisible(true)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
    }

    const render = () => {
      // Smooth interpolation for delayed follow ring
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      rafId = requestAnimationFrame(render)
    }

    const onMouseOver = (e) => {
      const interactiveEl = e.target.closest('a, button, [data-cursor], input, textarea, [data-cursor-label]')
      if (interactiveEl) {
        setIsHovering(true)
        const customLabel = interactiveEl.getAttribute('data-cursor-label')
        if (customLabel) {
          setLabel(customLabel)
        } else {
          setLabel('')
        }
      }
    }

    const onMouseOut = (e) => {
      const interactiveEl = e.target.closest('a, button, [data-cursor], input, textarea, [data-cursor-label]')
      if (interactiveEl) {
        setIsHovering(false)
        setLabel('')
      }
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    const onMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })
    window.addEventListener('mouseout', onMouseOut, { passive: true })
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)

    rafId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      window.removeEventListener('mouseout', onMouseOut)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (isTouchOrReduced) return null

  return (
    <>
      {/* Precision inner laser dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[120] w-2 h-2 rounded-full bg-[#00f5ff] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_#00f5ff] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Outer magnetic aura ring with contextual label badge */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[119] -translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center text-[10px] font-mono tracking-widest text-[#00f5ff] transition-[width,height,background-color,border-color,opacity] duration-250 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovering
            ? label
              ? 'w-20 h-20 bg-slate-950/80 border-[#00f5ff]/70 backdrop-blur-md shadow-[0_0_24px_rgba(0,245,255,0.25)]'
              : 'w-14 h-14 bg-[#00f5ff]/10 border-[#00f5ff]/60 backdrop-blur-sm'
            : 'w-8 h-8 bg-transparent border-white/20'
        }`}
        style={{ willChange: 'transform' }}
      >
        {label && <span className="uppercase text-[9px] font-semibold animate-pulse">{label}</span>}
      </div>
    </>
  )
}
