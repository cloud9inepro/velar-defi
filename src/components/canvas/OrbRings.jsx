import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { siteConfig } from '../../config/siteConfig'

export default function OrbRings() {
  const ringsRef = useRef([])
  const { ringCount, color1, color2 } = siteConfig.orb

  // ─── Ring configurations ────────────────────────────────
  const rings = useMemo(() => [
    {
      radius: 1.6,
      tube: 0.008,
      rotation: [Math.PI / 2, 0, 0],
      speed: 0.4,
      axis: 'x',
      color: color1,
      opacity: 0.9,
    },
    {
      radius: 1.9,
      tube: 0.006,
      rotation: [Math.PI / 4, Math.PI / 6, 0],
      speed: -0.3,
      axis: 'y',
      color: color2,
      opacity: 0.7,
    },
    {
      radius: 2.2,
      tube: 0.004,
      rotation: [Math.PI / 3, Math.PI / 4, Math.PI / 6],
      speed: 0.2,
      axis: 'z',
      color: color1,
      opacity: 0.5,
    },
  ], [color1, color2])

  // ─── Animate rings ──────────────────────────────────────
  useFrame((state) => {
    ringsRef.current.forEach((ring, i) => {
      if (!ring) return
      const { speed, axis } = rings[i]
      const t = state.clock.elapsedTime

      if (axis === 'x') ring.rotation.x = t * speed
      if (axis === 'y') ring.rotation.y = t * speed
      if (axis === 'z') ring.rotation.z = t * speed
    })
  })

  return (
    <group>
      {rings.map((ring, i) => (
        <mesh
          key={i}
          ref={(el) => (ringsRef.current[i] = el)}
          rotation={ring.rotation}
        >
          <torusGeometry args={[ring.radius, ring.tube, 16, 200]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* ─── Glowing ring duplicates (larger, more transparent) ── */}
      {rings.map((ring, i) => (
        <mesh
          key={`glow-${i}`}
          rotation={ring.rotation}
          ref={(el) => (ringsRef.current[i] = el)}
        >
          <torusGeometry args={[ring.radius, ring.tube * 6, 16, 200]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.04}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}