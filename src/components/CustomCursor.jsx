import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(window.innerWidth < 768)

  useEffect(() => {
    if (hidden) return
    let mx = 0, my = 0, rx = 0, ry = 0
    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`
      }
    }
    const raf = () => {
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`
      }
      requestAnimationFrame(raf)
    }
    const over = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) setHovering(true)
    }
    const out = (e) => {
      if (e.target.closest('a, button, [data-cursor]')) setHovering(false)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseout', out)
    const id = requestAnimationFrame(raf)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mouseout', out)
      cancelAnimationFrame(id)
    }
  }, [hidden])

  if (hidden) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[200] w-1.5 h-1.5 rounded-full bg-accent -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[200] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 transition-[width,height,opacity] duration-200"
        style={{
          width: hovering ? 56 : 28,
          height: hovering ? 56 : 28,
          opacity: hovering ? 0.8 : 0.4,
          willChange: 'transform',
        }}
      />
    </>
  )
}
