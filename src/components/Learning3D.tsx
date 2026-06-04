import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  OrbitControls, 
  Float, 
  useGLTF, 
  Environment, 
  ContactShadows,
  Html
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
  const { scene } = useGLTF('https://models.readyplayer.me/6385c0f381727b1c68633741.glb')
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (group.current) {
      const targetRotationY = (state.mouse.x * Math.PI) / 8
      const targetRotationX = (state.mouse.y * Math.PI) / 16
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotationY, 0.1)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetRotationX, 0.1)
    }
  })

  return (
    <group ref={group}>
      <primitive 
        object={scene} 
        scale={2.8} 
        position={[0, -2.8, 0]} 
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
        <boxGeometry args={[0.6, 0.6, 0.2]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={hovered ? 2 : 0.5}
        />
        <Html distanceFactor={10} position={[0, 0, 0.15]} transform>
          <div 
            className={`flex items-center justify-center bg-zinc-900/90 border border-zinc-700 rounded-xl p-2 w-14 h-14 shadow-2xl transition-all duration-300 pointer-events-none ${hovered ? 'scale-110 border-emerald-500' : ''}`}
          >
            <span className="text-[10px] font-black text-white uppercase tracking-tighter">{icon}</span>
          </div>
        </Html>
      </mesh>
    </Float>
  )
}

export const Learning3D: React.FC = () => {
  return (
    <div className="w-full h-[500px] lg:h-[600px] relative">
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }} dpr={[1, 2]}>
        {/* Guaranteed visible test object */}
        <mesh position={[-4, -2, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="red" />
        </mesh>

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#10b981" />
        
        <Suspense fallback={<Html center><div className="text-emerald-500 font-mono animate-pulse whitespace-nowrap">Loading 3D Scene...</div></Html>}>
          <group position={[0, 0, 0]}>
            <Suspense fallback={<FallbackModel />}>
              <GirlModel />
            </Suspense>
            
            <FloatingIcon 
              icon="Figma" 
              color="#F24E1E" 
              position={[-3, 1.5, 2]} 
              speed={1.2}
            />
            <FloatingIcon 
              icon="Tailwind" 
              color="#38B2AC" 
              position={[3.2, 0.5, 1]} 
              speed={0.8}
            />
            <FloatingIcon 
              icon="React" 
              color="#61DAFB" 
              position={[-0.5, 3, -1]} 
              speed={1.5}
            />
          </group>
          
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -2.8, 0]} 
            opacity={0.5} 
            scale={12} 
            blur={2} 
            far={4.5} 
          />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  )
}
