import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { siteConfig } from '../../config/siteConfig'

export default function Orb({ mouseX = 0, mouseY = 0 }) {
  const orbRef = useRef()
  const innerRef = useRef()
  const glowRef = useRef()
  const { color1, color2 } = siteConfig.orb

  // ─── Holographic shader material ───────────────────────
  const holoMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(color1) },
        uColor2: { value: new THREE.Color(color2) },
        uOpacity: { value: 0.85 },
      },
      vertexShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplace;

        // Simple noise
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        float noise(vec3 p) {
          vec3 i = floor(p);
          vec3 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(mix(hash(i), hash(i+vec3(1,0,0)), f.x),
                mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
            mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
                mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y),
            f.z
          );
        }

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;

          // Animated displacement
          float n = noise(position * 2.0 + uTime * 0.3);
          float displacement = n * 0.12;
          vDisplace = displacement;

          vec3 newPosition = position + normal * displacement;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform float uOpacity;

        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplace;

        void main() {
          // Fresnel edge glow
          vec3 viewDir = normalize(cameraPosition - vPosition);
          float fresnel = pow(1.0 - dot(vNormal, viewDir), 3.0);

          // Color mix based on position + time
          float mixFactor = sin(vPosition.y * 2.0 + uTime * 0.5) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, mixFactor);

          // Scanline effect
          float scanline = sin(vPosition.y * 40.0 + uTime * 2.0) * 0.04 + 0.96;

          // Add fresnel glow on edges
          color = mix(color, uColor1, fresnel * 0.6);
          float alpha = (0.3 + fresnel * 0.5) * uOpacity * scanline;

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  }, [color1, color2])

  // ─── Wireframe material ─────────────────────────────────
  const wireMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: color1,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    })
  }, [color1])

  // ─── Animate ────────────────────────────────────────────
  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (orbRef.current) {
      // Base rotation
      orbRef.current.rotation.y = t * 0.15
      orbRef.current.rotation.x = t * 0.08

      // Mouse parallax — subtle tilt toward cursor
      orbRef.current.rotation.x += mouseY * 0.3
      orbRef.current.rotation.y += mouseX * 0.3
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.2
      innerRef.current.rotation.z = t * 0.1
    }

    if (glowRef.current) {
      // Pulse glow scale
      const pulse = Math.sin(t * 1.5) * 0.04 + 1
      glowRef.current.scale.setScalar(pulse)
    }

    // Update shader time
    holoMaterial.uniforms.uTime.value = t
  })

  return (
    <group>
      {/* ─── Outer glow sphere ─────────────────────────── */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.45, 32, 32]} />
        <meshBasicMaterial
          color={color2}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ─── Main holographic orb ──────────────────────── */}
      <mesh ref={orbRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <primitive object={holoMaterial} attach="material" />
      </mesh>

      {/* ─── Wireframe overlay ─────────────────────────── */}
      <mesh ref={orbRef}>
        <sphereGeometry args={[1.22, 32, 32]} />
        <primitive object={wireMaterial} attach="material" />
      </mesh>

      {/* ─── Inner core ────────────────────────────────── */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial
          color={color1}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>

      {/* ─── Core point light ──────────────────────────── */}
      <pointLight
        color={color1}
        intensity={2}
        distance={5}
        decay={2}
      />
      <pointLight
        color={color2}
        intensity={1}
        distance={8}
        decay={2}
        position={[2, 1, 0]}
      />
    </group>
  )
}