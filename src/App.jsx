import { useState, useEffect, Suspense, lazy } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/HeroMosaic'
import BackToTop from './components/BackToTop'
import ResumeModal from './components/ResumeModal'

const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const Services = lazy(() => import('./components/Services'))
const Certificates = lazy(() => import('./components/Certificates'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

export default function App() {
  const [loading, setLoading] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  // Meng To Standards: Initialize Lenis Smooth Scrolling integrated with GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let lenis = null
    let tickerFn = null

    if (!reduceMotion) {
      lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 0.95,
      })

      lenis.on('scroll', ScrollTrigger.update)

      tickerFn = (time) => {
        lenis.raf(time * 1000)
      }

      gsap.ticker.add(tickerFn)
      gsap.ticker.lagSmoothing(0)
    }

    return () => {
      if (lenis) {
        lenis.destroy()
      }
      if (tickerFn) {
        gsap.ticker.remove(tickerFn)
      }
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : 'auto'
  }, [loading])

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <ScrollProgress />
      <Navbar onOpenResume={() => setResumeOpen(true)} />
      
      <main id="main-content">
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <Suspense fallback={<div className="min-h-screen" />}>
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Services />
          <Certificates />
          <Contact />
          <Footer />
        </Suspense>
      </main>

      <BackToTop />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  )
}
