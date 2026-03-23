import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { siteConfig } from '../../config/siteConfig'

export default function Particles() {
  const mesh = useRef()
  const { particleCount } = siteConfig.orb

  // ─── Generate random positions ──────────────────────────
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const colorCyan = new THREE.Color(siteConfig.orb.color1)
    const colorPurple = new THREE.Color(siteConfig.orb.color2)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // Spread particles in a wide sphere
      const radius = Math.random() * 8 + 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3]     = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Mix cyan and purple randomly
      const mix = Math.random()
      const color = colorCyan.clone().lerp(colorPurple, mix)

      colors[i3]     = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    return [positions, colors]
  }, [particleCount])

  // ─── Slow rotation ──────────────────────────────────────
  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.elapsedTime * 0.04
    mesh.current.rotation.x = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}