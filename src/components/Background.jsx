import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// GPU Shaders for the Particle Wavefield
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec3 vPosition;
  varying float vDist;

  void main() {
    vec3 pos = position;
    
    // Compute distance from particle to pointer projection in XY plane
    float d = distance(pos.xy, uMouse * 8.5);
    
    // Wave dynamics calculated on the GPU
    float ripple = sin(d * 1.3 - uTime * 2.2) * 0.42 * exp(-d * 0.24);
    float ambientWave = sin(pos.x * 0.38 + uTime * 0.8) * 0.22 + cos(pos.y * 0.45 + uTime * 0.6) * 0.2;
    
    pos.z += ripple + ambientWave;
    
    vPosition = pos;
    vDist = d;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    // Dynamic point size based on perspective and pointer proximity
    float sizeFactor = 1.0 + clamp(1.4 - d * 0.2, 0.0, 1.8);
    gl_PointSize = (14.0 / -mvPosition.z) * sizeFactor;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform vec3 uBaseColor;
  uniform vec3 uGlowColor;
  varying float vDist;

  void main() {
    // Circle point drawing with anti-aliased edge
    vec2 coord = gl_PointCoord - vec2(0.5);
    float distToCenter = length(coord);
    if (distToCenter > 0.5) discard;
    
    float alpha = smoothstep(0.5, 0.08, distToCenter);
    
    // Transition color from luminous cyan to subtle deep slate
    float glowFactor = clamp(1.0 - vDist * 0.22, 0.0, 1.0);
    vec3 finalColor = mix(uBaseColor, uGlowColor, glowFactor);
    
    gl_FragColor = vec4(finalColor, alpha * (0.45 + glowFactor * 0.45));
  }
`

function WaveMesh() {
  const pointsRef = useRef()
  const mouseTarget = useRef({ x: 0, y: 0 })
  const mouseDamped = useRef({ x: 0, y: 0 })
  
  const COLS = 64
  const ROWS = 42
  const SPACING = 0.32

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(COLS * ROWS * 3)
    let idx = 0
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        positions[idx++] = (x - COLS / 2) * SPACING
        positions[idx++] = (y - ROWS / 2) * SPACING
        positions[idx++] = 0
      }
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uBaseColor: { value: new THREE.Color('#38bdf8') },
        uGlowColor: { value: new THREE.Color('#00f5ff') },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    return { geometry: geo, material: mat }
  }, [])

  // Safely manage window pointer listeners with proper cleanup
  useEffect(() => {
    const onMove = (e) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseTarget.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      geometry.dispose()
      material.dispose()
    }
  }, [geometry, material])

  useFrame((state, delta) => {
    if (!material.uniforms) return

    // Cap delta to prevent huge jumps on tab switch
    const dt = Math.min(delta, 0.1)
    material.uniforms.uTime.value = state.clock.getElapsedTime()

    // Smooth pointer damping (Meng To motion guidelines)
    mouseDamped.current.x += (mouseTarget.current.x - mouseDamped.current.x) * (dt * 4.5)
    mouseDamped.current.y += (mouseTarget.current.y - mouseDamped.current.y) * (dt * 4.5)

    material.uniforms.uMouse.value.set(mouseDamped.current.x, mouseDamped.current.y)

    // Gentle camera parallax
    if (pointsRef.current) {
      pointsRef.current.rotation.x = -0.62 + mouseDamped.current.y * 0.05
      pointsRef.current.rotation.z = mouseDamped.current.x * 0.04
    }
  })

  return (
    <group rotation={[-0.62, 0, 0]}>
      <points ref={pointsRef} geometry={geometry} material={material} />
    </group>
  )
}

function SceneSetup() {
  const { gl } = useThree()
  useEffect(() => {
    // Meng To standards: Cap render resolution to prevent GPU throttling
    gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  }, [gl])
  return null
}

export default function Background() {
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const ok = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
      setHasWebGL(ok)
    } catch {
      setHasWebGL(false)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
      {hasWebGL ? (
        <Canvas
          camera={{ position: [0, 2.8, 7.5], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <SceneSetup />
          <fog attach="fog" args={['#070d1e', 4, 12]} />
          <WaveMesh />
        </Canvas>
      ) : (
        /* Accessible progressive fallback when WebGL is unavailable */
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-950/25 via-[#070d1e] to-[#050a18]" />
      )}
      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070d1e]/40 via-transparent to-[#070d1e]" />
    </div>
  )
}
