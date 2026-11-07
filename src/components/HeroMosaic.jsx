import { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import heroCenter from '../assets/hero_center.png'
import ecommerceThumb from '../assets/ecommerce-dashboard.png'
import healthcareThumb from '../assets/healthcare-dashboard.png'
import inventoryThumb from '../assets/inventory-dashboard.png'
import heroArtThumb from '../assets/hero-portfolio-art.jpg'
import LiquidGlassOrbs from './LiquidGlassOrbs'

const ATLAS_W = 2048
const ATLAS_H = 1280
const CELL_ATLAS_WIN = 112
const DUST_RATIO = 0.07

const ATLAS_CROPS = [
  [0.26, 0.17, 0.48, 0.37],
  [0.53, 0.08, 0.15, 0.55],
  [0.4, 0.14, 0.16, 0.72],
  [0.2, 0.22, 0.4, 0.4],
]

const VERTEX_SHADER = `#version 300 es
precision highp float;

in vec2 aHome;   // 0..1 inside anchor rect
in vec3 aAir;    // x,y 0..1 over canvas, z = depth
in vec4 aInfo;   // brightness, delay, duration, phase
in vec3 aCell;   // atlas window origin (uv), kind (0 tile, 1 dust)
in vec3 aColor;  // authentic portrait rgb

uniform vec2 uRes;       // canvas CSS px
uniform vec4 uRect;      // anchor x, y, w, h in canvas CSS px
uniform float uCell;     // tile pitch CSS px
uniform float uDpr;
uniform float uTime;     // seconds
uniform float uReveal;   // seconds since start
uniform float uScatter;  // 0 = formed, 1 = scattered
uniform vec2 uMouse;     // mouse coordinates

out vec2 vCell;
out float vBright;
out float vLand;
out float vAlpha;
out float vPhase;
out vec3 vColor;

float inOut(float t) {
  return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
}

void main() {
  float bright = aInfo.x;
  float delay  = aInfo.y;
  float dur    = aInfo.z;
  float phase  = aInfo.w;
  float depth  = aAir.z;
  bool dust    = aCell.z > 0.5;

  // Cosmic air drift
  vec2 drift = vec2(sin(uTime * 0.31 + phase * 6.283), cos(uTime * 0.23 + phase * 9.1))
             * (8.0 + 24.0 * (1.0 - depth));
  vec2 air  = aAir.xy * uRes + drift;
  vec2 home = uRect.xy + aHome * uRect.zw;

  // Staggered reveal flight
  float appear = smoothstep(0.0, 0.8, uReveal - delay * 0.35);
  float fly    = dust ? 0.0 : clamp((uReveal - delay) / dur, 0.0, 1.0);
  float e      = inOut(fly);

  // Scroll scatter upward into the cosmos
  float q = clamp(uScatter * 1.8 - phase * 0.6, 0.0, 1.0);
  q = q * q;

  float k = e * (1.0 - q);
  vec2 pos = mix(air, home, k);

  // Organic curved path
  vec2 d = home - air;
  pos += vec2(-d.y, d.x) * 0.15 * sin(3.14159 * k) * (phase - 0.5);

  // Interactive mouse repulsion
  vec2 m = pos - uMouse;
  float ml = length(m);
  pos += (ml > 0.001 ? m / ml : vec2(0.0)) * smoothstep(140.0, 0.0, ml) * 26.0 * k;

  float land  = smoothstep(0.55, 1.0, k);
  float speck = mix(2.4, 1.0, depth);
  // Full-density tile size so tiles tightly tile the mosaic
  float tile  = uCell * (0.86 + 0.14 * bright);
  float size  = mix(speck, tile, land);

  float dustA = dust ? mix(0.55, 0.22, smoothstep(2.0, 4.0, uReveal)) : 1.0;
  vAlpha  = appear * mix(0.35 + 0.55 * (1.0 - depth), 1.0, land) * dustA;
  vBright = bright;
  vLand   = land;
  vCell   = aCell.xy;
  vPhase  = phase;
  vColor  = aColor;

  vec2 clip = pos / uRes * 2.0 - 1.0;
  gl_Position  = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = clamp(size * uDpr, 1.5, 48.0);
}
`

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform sampler2D uAtlas;
uniform vec2 uWin;
uniform float uTime;
uniform vec2 uRes;

in vec2 vCell;
in float vBright;
in float vLand;
in float vAlpha;
in float vPhase;
in vec3 vColor;
out vec4 outColor;

void main() {
  // Tile interior with crisp micro-bevel
  vec2 p = abs(gl_PointCoord * 2.0 - 1.0);
  float d = max(p.x, p.y);
  float edge = 1.0 - smoothstep(0.85, 0.98, d);
  float innerHighlight = smoothstep(0.72, 0.85, d) * 0.3;

  // Real color from Raman's portrait, boosted with jewel-like specular shimmer
  vec3 baseColor = vColor;
  // If the color is very dark (black shirt/suit), enhance with deep midnight cyan/navy
  if (length(baseColor) < 0.22) {
    baseColor = mix(baseColor, vec3(0.08, 0.13, 0.26), 0.7);
  }

  // Micro-project screenshot texture blend from atlas
  vec3 c = texture(uAtlas, vCell + gl_PointCoord * uWin).rgb;
  float peak = max(max(c.r, c.g), max(c.b, 0.08));
  vec3 hue = c / peak;
  vec3 tile = mix(baseColor, mix(baseColor, hue, 0.25), 0.35);

  // Twinkle / glint animation
  float twinkle = 0.90 + 0.18 * sin(uTime * 2.2 + vPhase * 43.0);

  // Traveling specular chrome beam across the mosaic
  vec2 screenUV = gl_FragCoord.xy / uRes;
  float sweep = sin(uTime * 1.2 - (screenUV.x * 1.5 + screenUV.y) * 3.5);
  float glint = pow(max(0.0, sweep), 16.0) * 0.45;

  tile = tile * twinkle + vec3(innerHighlight) + vec3(glint * 0.8, glint * 0.95, glint);

  // Speck color when floating in air
  vec3 speck = vec3(0.8, 0.92, 1.0);
  vec3 rgb = mix(speck, tile, vLand);
  outColor = vec4(rgb * vAlpha * edge, vAlpha * edge);
}
`

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const err = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(err || 'Shader compile error')
  }
  return shader
}

function buildAtlas(thumbs) {
  const canvas = document.createElement('canvas')
  canvas.width = ATLAS_W
  canvas.height = ATLAS_H
  const ctx = canvas.getContext('2d')
  const halfW = ATLAS_W / 2
  const halfH = ATLAS_H / 2

  thumbs.slice(0, 4).forEach((img, idx) => {
    const [cx, cy, cw, ch] = ATLAS_CROPS[idx] ?? [0, 0, 1, 1]
    const nw = img.naturalWidth || img.width
    const nh = img.naturalHeight || img.height
    const dx = (idx % 2) * halfW
    const dy = Math.floor(idx / 2) * halfH
    ctx.drawImage(img, cx * nw, cy * nh, cw * nw, ch * nh, dx, dy, halfW, halfH)
  })

  return canvas
}

function computeParticleField(img, targetWidth) {
  // Enhanced particle density for crisp high-DPI displays & 16:9 laptop screens
  const cellPitch = Math.min(3.4, Math.max(2.0, targetWidth / 340))
  const cols = Math.max(32, Math.round(targetWidth / cellPitch))
  const rows = Math.round((cols * img.naturalHeight) / img.naturalWidth)

  const canvas = document.createElement('canvas')
  canvas.width = cols
  canvas.height = rows
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(img, 0, 0, cols, rows)

  const data = ctx.getImageData(0, 0, cols, rows).data
  const home = []
  const air = []
  const info = []
  const cellAttr = []
  const colors = []
  const uWinX = CELL_ATLAS_WIN / ATLAS_W
  const uWinY = CELL_ATLAS_WIN / ATLAS_H

  let settleDuration = 0
  const addParticle = (hx, hy, bright, rCol, gCol, bCol, isDust) => {
    home.push(hx, hy)
    air.push(Math.random() * 1.2 - 0.1, Math.random() * 1.2 - 0.1, Math.random())
    const delay = 0.25 + Math.random() * 0.9 + hy * 0.4
    const duration = 1.3 + Math.random() * 0.5
    if (!isDust) {
      settleDuration = Math.max(settleDuration, delay + duration)
    }
    info.push(bright, delay, duration, Math.random())
    cellAttr.push(Math.random() * (1 - uWinX), Math.random() * (1 - uWinY), isDust ? 1 : 0)
    colors.push(rCol, gCol, bCol)
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = (r * cols + c) * 4
      const a = data[idx + 3] / 255
      // Sample all pixels belonging to Raman's body & suit
      if (a < 0.12) continue

      const rCol = data[idx] / 255
      const gCol = data[idx + 1] / 255
      const bCol = data[idx + 2] / 255
      const luma = 0.2126 * rCol + 0.7152 * gCol + 0.0722 * bCol

      // Ensure dark suit tiles remain visible and retain metallic sheen
      const bright = Math.min(1.0, Math.max(0.3, luma * 1.35 + 0.15))
      addParticle((c + 0.5) / cols, (r + 0.5) / rows, bright, rCol, gCol, bCol, false)
    }
  }

  const count = home.length / 2
  for (let i = 0; i < Math.round(count * DUST_RATIO); i++) {
    addParticle(0.5, 0.5, 0.35, 0.8, 0.9, 1.0, true)
  }

  return {
    settle: settleDuration,
    cell: cellPitch,
    count: home.length / 2,
    home: new Float32Array(home),
    air: new Float32Array(air),
    info: new Float32Array(info),
    cellAttr: new Float32Array(cellAttr),
    colors: new Float32Array(colors),
  }
}

function WebGLMosaicCanvas({ src, thumbs, anchorRef, play }) {
  const canvasRef = useRef(null)
  const startTimeRef = useRef(null)

  useEffect(() => {
    if (play && startTimeRef.current === null) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      startTimeRef.current = performance.now() / 1000 - (reducedMotion ? 100 : 0)
    }
  }, [play])

  useEffect(() => {
    const canvas = canvasRef.current
    const anchor = anchorRef.current
    if (!canvas || !anchor) return

    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    })

    if (!gl) {
      if (anchor) anchor.style.visibility = 'visible'
      canvas.style.display = 'none'
      return
    }

    let isDisposed = false
    let isRunning = false
    let isIntersecting = true
    let particleCount = 0
    let cellPitch = 6
    let field = null
    let lastWidth = -1

    const program = gl.createProgram()
    try {
      gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER))
      gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'Program link error')
      }
    } catch (e) {
      console.error(e)
      if (anchor) anchor.style.visibility = 'visible'
      return
    }

    gl.useProgram(program)
    const getUniform = (name) => gl.getUniformLocation(program, name)
    const uniforms = {
      res: getUniform('uRes'),
      rect: getUniform('uRect'),
      cell: getUniform('uCell'),
      dpr: getUniform('uDpr'),
      time: getUniform('uTime'),
      reveal: getUniform('uReveal'),
      scatter: getUniform('uScatter'),
      mouse: getUniform('uMouse'),
      atlas: getUniform('uAtlas'),
      win: getUniform('uWin'),
    }

    const vao = gl.createVertexArray()
    gl.bindVertexArray(vao)

    const buffers = ['aHome', 'aAir', 'aInfo', 'aCell', 'aColor'].map((name, idx) => {
      const buf = gl.createBuffer()
      const loc = gl.getAttribLocation(program, name)
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, [2, 3, 4, 3, 3][idx], gl.FLOAT, false, 0, 0)
      return buf
    })

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.uniform2f(uniforms.win, CELL_ATLAS_WIN / ATLAS_W, CELL_ATLAS_WIN / ATLAS_H)

    const updateBuffers = () => {
      const anchorRect = anchor.getBoundingClientRect()
      const w = anchorRect.width
      if (!field || w < 10 || Math.abs(w - lastWidth) < 1) return
      lastWidth = w

      const pData = computeParticleField(field, w)
      particleCount = pData.count
      cellPitch = pData.cell
      ;[pData.home, pData.air, pData.info, pData.cellAttr, pData.colors].forEach((data, i) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers[i])
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
      })
    }

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = e.clientX - rect.left
      mouse.ty = e.clientY - rect.top
      if (mouse.x < -999) {
        mouse.x = mouse.tx
        mouse.y = mouse.ty
      }
    }
    const onPointerLeave = () => {
      mouse.tx = mouse.ty = -9999
      mouse.x = mouse.y = -9999
    }

    const startPerfTime = performance.now() / 1000
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const render = () => {
      if (!particleCount || startTimeRef.current === null) {
        gl.clear(gl.COLOR_BUFFER_BIT)
        return
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      const pxW = Math.round(rect.width * dpr)
      const pxH = Math.round(rect.height * dpr)

      if (canvas.width !== pxW || canvas.height !== pxH) {
        canvas.width = pxW
        canvas.height = pxH
      }

      updateBuffers()

      const aRect = anchor.getBoundingClientRect()
      const now = performance.now() / 1000
      const elapsed = now - startTimeRef.current

      const scatter = hasReducedMotion
        ? 0
        : Math.min(1, Math.max(0, -rect.top / (rect.height * 0.7)))

      mouse.x += (mouse.tx - mouse.x) * 0.18
      mouse.y += (mouse.ty - mouse.y) * 0.18

      gl.viewport(0, 0, pxW, pxH)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.uniform2f(uniforms.res, rect.width, rect.height)
      gl.uniform4f(uniforms.rect, aRect.left - rect.left, aRect.top - rect.top, aRect.width, aRect.height)
      gl.uniform1f(uniforms.cell, cellPitch)
      gl.uniform1f(uniforms.dpr, dpr)
      gl.uniform1f(uniforms.time, now - startPerfTime)
      gl.uniform1f(uniforms.reveal, elapsed)
      gl.uniform1f(uniforms.scatter, scatter)
      gl.uniform2f(uniforms.mouse, mouse.x, mouse.y)

      gl.drawArrays(gl.POINTS, 0, particleCount)
    }

    const setRunning = (run) => {
      if (run !== isRunning) {
        isRunning = run
        if (run) gsap.ticker.add(render)
        else gsap.ticker.remove(render)
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting
      setRunning(isIntersecting && particleCount > 0)
    })
    observer.observe(canvas)

    Promise.all([loadImage(src), Promise.all(thumbs.map(loadImage))])
      .then(([heroImg, loadedThumbs]) => {
        if (isDisposed) return
        field = heroImg

        const texture = gl.createTexture()
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

        // Anisotropic texture filtering for high-resolution clarity on Retina & laptop screens
        const ext = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
        if (ext) {
          const maxAniso = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT) || 4
          gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(8, maxAniso))
        }

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, buildAtlas(loadedThumbs))
        gl.generateMipmap(gl.TEXTURE_2D)
        gl.uniform1i(uniforms.atlas, 0)

        updateBuffers()
        setRunning(isIntersecting && particleCount > 0)
      })
      .catch((e) => {
        console.error(e)
        if (anchor) anchor.style.visibility = 'visible'
      })

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)

    return () => {
      isDisposed = true
      setRunning(false)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      buffers.forEach((b) => gl.deleteBuffer(b))
      gl.deleteVertexArray(vao)
      gl.deleteProgram(program)
    }
  }, [src, thumbs, anchorRef])

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Interactive mosaic portrait of Raman"
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  )
}

export default function HeroMosaic({ onOpenResume }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const anchorImgRef = useRef(null)
  const titleBoxRef = useRef(null)
  const wordLeftRef = useRef(null)
  const wordRightRef = useRef(null)
  const subtitleRef = useRef(null)
  const actionRowRef = useRef(null)

  const thumbs = useMemo(
    () => [ecommerceThumb, healthcareThumb, inventoryThumb, heroArtThumb],
    []
  )

  useEffect(() => {
    // Auto-start assembly flight animation
    const timer = setTimeout(() => {
      setIsPlaying(true)
    }, 200)

    // GSAP Intro Typography Animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.from(
        titleBoxRef.current,
        { scale: 0.98, duration: 0.8, ease: 'power3.out' }
      )

      tl.from(
        [subtitleRef.current, actionRowRef.current],
        { y: 12, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
    })

    // Scroll-linked split animation: PORT slides left, FOLIO slides right as user scrolls down
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = window.innerHeight * 0.65
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll))
      const isMobile = window.innerWidth < 768
      const splitDist = isMobile ? window.innerWidth * 0.24 : Math.min(340, window.innerWidth * 0.22)

      if (wordLeftRef.current && wordRightRef.current) {
        gsap.to(wordLeftRef.current, {
          x: -splitDist * progress,
          duration: 0.1,
          overwrite: 'auto',
        })
        gsap.to(wordRightRef.current, {
          x: splitDist * progress,
          duration: 0.1,
          overwrite: 'auto',
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      ctx.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end justify-center overflow-hidden bg-[#070d1e]"
      style={{
        background: 'radial-gradient(circle at 50% 36%, #132247 0%, #0a142c 55%, #050a18 100%)',
      }}
    >
      {/* Background Vignette & Subtle Atmospheric Stardust Overlay */}
      <div className="absolute inset-0 bg-[#050a18]/25 backdrop-blur-[1px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/30 to-transparent scan-beam pointer-events-none z-10" />

      {/* Floating Morphing Liquid Glass Orbs (Apple Aesthetic / Emerald & Sapphire Soft Lighting) */}
      <LiquidGlassOrbs variant="hero" />

      {/* Top Floating Liquid Glass Availability Pill */}
      <div className="absolute top-24 md:top-28 z-20 pointer-events-auto">
        <div className="liquid-glass-pill px-4 py-1.5 text-slate-200 border-white/20 hover:border-white/40 transition-all shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] animate-pulse" />
          <span className="font-mono text-[11px] tracking-wider text-slate-200">
            Open for Software Roles <span className="text-[#38bdf8] font-semibold">// 2026</span>
          </span>
        </div>
      </div>

      {/* Invisible Anchor Element sizing Raman's Portrait Matrix Canvas (calibrated for 16:9 laptop screens) */}
      <div className="absolute inset-x-0 bottom-0 z-0 text-center text-white flex flex-col items-center w-full pointer-events-none">
        <img
          ref={anchorImgRef}
          src={heroCenter}
          alt="Raman Portrait Matrix"
          aria-hidden="true"
          className="invisible w-auto h-[80vh] sm:h-[82vh] md:h-[84vh] lg:h-[86vh] max-h-[88vh] max-w-[90vw] md:max-w-[62vw] lg:max-w-[46vw] xl:max-w-[40vw] object-contain object-bottom select-none"
        />
      </div>

      {/* WebGL2 Interactive Mosaic Shader Canvas */}
      <WebGLMosaicCanvas
        src={heroCenter}
        thumbs={thumbs}
        anchorRef={anchorImgRef}
        play={isPlaying}
      />

      {/* Massive 3D Metallic Chrome Wordmark: PORTFOLIO (calibrated across lower chest for 16:9 laptop) */}
      <div className="absolute inset-x-0 bottom-8 md:bottom-12 lg:bottom-14 flex flex-col items-center justify-center pointer-events-none select-none z-30">
        <div ref={titleBoxRef} className="flex flex-col items-center w-[94vw] max-w-5xl md:max-w-6xl relative">
          <h1 className="flex items-baseline text-[13vw] md:text-[7.5rem] lg:text-[8.5rem] xl:text-[9.5rem] 2xl:text-[10.5rem] font-black tracking-[-0.04em] leading-none uppercase select-none">
            <span
              ref={wordLeftRef}
              className="chrome-wordmark inline-block will-change-transform drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
            >
              PORT
            </span>
            <span
              ref={wordRightRef}
              className="chrome-wordmark inline-block will-change-transform drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
            >
              FOLIO
            </span>
          </h1>

          {/* Subtitle & Actions Bar: left wing under PORT, right wing under FOLIO */}
          <div className="w-full flex items-center justify-between mt-3 px-3 sm:px-6">
            <div
              ref={subtitleRef}
              className="text-white text-sm sm:text-base md:text-lg lg:text-xl drop-shadow-lg font-display tracking-tight flex items-center gap-2"
            >
              <span className="font-extrabold text-white">Java Full Stack</span>
              <span className="font-light italic text-[#38bdf8]">Developer</span>
            </div>

            <div
              ref={actionRowRef}
              className="flex items-center gap-2.5 md:gap-3 pointer-events-auto"
            >
              <button
                onClick={() => scrollTo('projects')}
                data-cursor
                data-cursor-label="WORK"
                className="liquid-glass-btn group px-5 py-2.5 text-white font-mono text-xs md:text-sm tracking-wider flex items-center gap-2"
              >
                <span>Projects</span>
                <span className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
              </button>

              <button
                onClick={onOpenResume}
                data-cursor
                data-cursor-label="RESUME"
                className="liquid-glass-btn liquid-glass-btn-primary px-5 py-2.5 text-[#070d1e] font-display font-bold text-xs md:text-sm tracking-wider shadow-2xl flex items-center gap-1.5"
              >
                <span>Resume</span>
              </button>

              <button
                onClick={() => scrollTo('contact')}
                data-cursor
                data-cursor-label="TALK"
                className="liquid-glass-btn liquid-glass-btn-ghost hidden sm:inline-flex px-4 py-2.5 text-slate-200 hover:text-white font-mono text-xs tracking-wider"
              >
                <span>Contact</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
