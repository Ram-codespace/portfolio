import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function GridField() {
  const ref = useRef()
  const mouse = useRef({ x: 0, y: 0 })
  const COLS = 64
  const ROWS = 40
  const SPACING = 0.34

  const positions = useMemo(() => {
    const arr = new Float32Array(COLS * ROWS * 3)
    let i = 0
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        arr[i++] = (x - COLS / 2) * SPACING
        arr[i++] = (y - ROWS / 2) * SPACING
        arr[i++] = 0
      }
    }
    return arr
  }, [])

  const base = useMemo(() => positions.slice(), [positions])

  const onMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
  }

  useMemo(() => {
    window.addEventListener('pointermove', onMove)
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const geom = ref.current
    if (!geom) return
    const arr = geom.attributes.position.array
    const mx = mouse.current.x * 6
    const my = mouse.current.y * 4
    for (let i = 0; i < arr.length; i += 3) {
      const x = base[i]
      const y = base[i + 1]
      const dx = x - mx
      const dy = y - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      const ripple = Math.sin(dist * 1.1 - t * 1.4) * 0.35 * Math.exp(-dist * 0.18)
      const wave = Math.sin(x * 0.4 + t * 0.6) * 0.18 + Math.cos(y * 0.5 + t * 0.4) * 0.18
      arr[i + 2] = ripple + wave
    }
    geom.attributes.position.needsUpdate = true
    ref.current.parent.rotation.x = -0.55 + mouse.current.y * 0.03
    ref.current.parent.rotation.z = mouse.current.x * 0.02
  })

  return (
    <group rotation={[-0.55, 0, 0]}>
      <points>
        <bufferGeometry ref={ref}>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.028} color="#00F5FF" transparent opacity={0.65} sizeAttenuation />
      </points>
    </group>
  )
}

export default function Background() {
  return (
    <div className="absolute inset-0 z-0 opacity-80">
      <Canvas
        camera={{ position: [0, 2.4, 7.2], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#000000', 5, 11]} />
        <GridField />
      </Canvas>
    </div>
  )
}
