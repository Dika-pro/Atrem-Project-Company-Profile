import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  OrbitControls, 
  Float, 
  useGLTF, 
  Bvh,
  PerformanceMonitor,
  AdaptiveDpr,
  AdaptiveEvents
} from '@react-three/drei'
import * as THREE from 'three'

// Simple box fallback if GLTF fails or takes too long
const FallbackModel = () => (
  <mesh position={[0, 0, 0]}>
    <boxGeometry args={[1, 2, 1]} />
    <meshStandardMaterial color="#10b981" wireframe />
  </mesh>
)

const GirlModel = () => {
  // Use a try-catch pattern indirectly via Suspense
  const { scene } = useGLTF('https://models.readyplayer.me/6385c0f381727b1c68633741.glb')
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (group.current) {
      const targetRotationY = (state.mouse.x * Math.PI) / 10
      const targetRotationX = (state.mouse.y * Math.PI) / 20
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, 0.05)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetRotationX, 0.05)
    }
  })

  return (
    <group ref={group}>
      <primitive 
        object={scene} 
        scale={2.5} 
        position={[0, -2.5, 0]} 
      />
    </group>
  )
}

const FloatingIcon = ({ icon, color, position, speed = 1 }: { icon: string, color: string, position: [number, number, number], speed?: number }) => {
  const mesh = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.getElapsedTime() * 0.5 * speed
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speed
    }
  })

  return (
    <Float 
      speed={2 * speed} 
      rotationIntensity={1.5} 
      floatIntensity={2} 
      position={position}
    >
      <mesh 
        ref={mesh}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.5, 0.5, 0.1]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={hovered ? 1.5 : 0.4}
        />
      </mesh>
    </Float>
  )
}

const OrbitingSphere = ({ radius, speed, color, offset = 0, reverse = false, tilt = 0 }: { 
  radius: number, 
  speed: number, 
  color: string, 
  offset?: number,
  reverse?: boolean,
  tilt?: number
}) => {
  const mesh = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime() * speed + offset
      const direction = reverse ? -1 : 1
      
      const x = Math.cos(time * direction) * radius
      const z = Math.sin(time * direction) * radius
      
      // Apply tilt
      mesh.current.position.x = x
      mesh.current.position.z = z
      mesh.current.position.y = Math.sin(time * direction) * tilt
      
      mesh.current.rotation.x += 0.01
      mesh.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={1}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

export const Learning3D: React.FC = () => {
  const [degraded, setDegraded] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [showModel, setShowModel] = useState(true)

  return (
    <div className="w-full h-full relative z-20 min-h-[400px]">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 40 }} 
        dpr={1}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: true
        }}
        onCreated={() => setLoaded(true)}
        onError={() => {
          setShowModel(false)
          setLoaded(true)
        }}
      >
        <PerformanceMonitor onDecline={() => setDegraded(true)} />
        <AdaptiveDpr pixelated />
        
        <ambientLight intensity={1} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#10b981" />
        
        <Suspense fallback={null}>
          <Bvh firstHitOnly>
            <group position={[0, 0, 0]}>
              {(showModel && !degraded) ? (
                <Suspense fallback={<FallbackModel />}>
                  <GirlModel />
                </Suspense>
              ) : (
                <FallbackModel />
              )}
              
              <FloatingIcon 
                icon="Figma" 
                color="#F24E1E" 
                position={[-2.5, 1.5, 1]} 
                speed={0.5}
              />
              <FloatingIcon 
                icon="Tailwind" 
                color="#38B2AC" 
                position={[2.5, 0.5, 1]} 
                speed={0.4}
              />
              <FloatingIcon 
                icon="React" 
                color="#61DAFB" 
                position={[-0.5, 2.5, -1]} 
                speed={0.6}
              />

              {/* Orbiting Spheres */}
              <OrbitingSphere 
                radius={3.5} 
                speed={0.8} 
                color="#818cf8" 
                tilt={1.5}
              />
              <OrbitingSphere 
                radius={4.2} 
                speed={0.5} 
                color="#c084fc" 
                reverse={true} 
                tilt={-1.2}
                offset={Math.PI}
              />
              
              {/* Extra Spheres */}
              <OrbitingSphere 
                radius={2.8} 
                speed={1.2} 
                color="#34d399" 
                reverse={false} 
                tilt={2.5}
                offset={Math.PI / 2}
              />
              <OrbitingSphere 
                radius={5} 
                speed={0.3} 
                color="#fbbf24" 
                reverse={true} 
                tilt={0.5}
                offset={-Math.PI / 4}
              />
            </group>
          </Bvh>
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
      
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/40 backdrop-blur-sm z-30">
          <div className="text-emerald-500 font-mono text-xs tracking-widest uppercase animate-pulse">
            System Initializing...
          </div>
        </div>
      )}
    </div>
  )
}
