import { Suspense, useRef, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'
import Orb from './Orb'
import OrbRings from './OrbRings'
import Particles from './Particles'

// ─── Camera rig that follows mouse ──────────────────────────
function CameraRig({ mouseX, mouseY }) {
  useFrame((state) => {
    state.camera.position.x += (mouseX * 0.5 - state.camera.position.x) * 0.05
    state.camera.position.y += (-mouseY * 0.5 - state.camera.position.y) * 0.05
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

// ─── Scene fog + environment ─────────────────────────────────
function SceneSetup() {
  const { scene } = useThree()

  scene.fog = new THREE.FogExp2('#030712', 0.08)

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.3}
        color="#00f5ff"
      />
    </>
  )
}

// ─── Fallback while loading ──────────────────────────────────
function Loader() {
  return null
}

export default function OrbScene() {
  const containerRef = useRef()
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [dpr, setDpr] = useState(1.5)

  // ─── Mouse tracking ────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY, currentTarget } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    setMouseX(((clientX - left) / width - 0.5) * 2)
    setMouseY(((clientY - top) / height - 0.5) * 2)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMouseX(0)
    setMouseY(0)
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        {/* ─── Performance monitoring ───────────────────── */}
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.5)}
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <Suspense fallback={<Loader />}>
          <SceneSetup />
          <CameraRig mouseX={mouseX} mouseY={mouseY} />
          <Orb mouseX={mouseX} mouseY={mouseY} />
          <OrbRings />
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  )
}