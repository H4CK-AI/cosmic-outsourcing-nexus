
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stars, Text, Float } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// Floating sphere component that represents a service node
const ServiceNode = ({ position = [0, 0, 0], color = "#9b87f5", size = 0.5, text = "", hover = 0 }) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useEffect(() => {
    if (hovered) {
      gsap.to(meshRef.current.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.3 })
    } else {
      gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.3 })
    }
  }, [hovered])

  useFrame((state) => {
    if (hover > 0) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1 * hover
    }
  })

  return (
    <group position={[position[0], position[1], position[2]]}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3} 
          metalness={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 0.4 : 0.1}
        />
      </mesh>
      {text && (
        <Text
          position={[0, size + 0.3, 0]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      )}
    </group>
  )
}

// Connection line between service nodes
const ConnectionLine = ({ start, end, color = "#ffffff" }) => {
  const ref = useRef<THREE.Line>(null!)
  
  useFrame(() => {
    if (ref.current) {
      const points = [
        new THREE.Vector3(...start),
        new THREE.Vector3(...end)
      ]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      ref.current.geometry = geometry
    }
  })
  
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  )
}

// Orbital path for service nodes to follow
const OrbitalPath = ({ radius = 3, color = "#6e59a5", segments = 128 }) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.01, radius + 0.01, segments]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
    </mesh>
  )
}

// Rotating orbital group of service nodes
const ServiceOrbit = ({ radius = 3, speed = 0.5, height = 0, services = [], color = "#9b87f5" }) => {
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame(({ clock }) => {
    groupRef.current.rotation.y = clock.getElapsedTime() * speed * 0.1
  })
  
  return (
    <group ref={groupRef}>
      <OrbitalPath radius={radius} color={color} />
      {services.map((service, index) => {
        const angle = (index / services.length) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <ServiceNode 
            key={index} 
            position={[x, height, z]} 
            color={color} 
            text={service} 
            hover={1}
          />
        )
      })}
    </group>
  )
}

// Starfield background
const StarField = () => {
  return <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
}

// Main scene component
const Scene = () => {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(0, 2, 8)
  }, [camera])

  const bpmServices = ["Customer Support", "Data Entry", "Back Office", "Recruitment", "Finance"]
  const lpoServices = ["Legal Review", "Contract Analysis", "Compliance", "Research", "Documentation"]
  const itServices = ["Development", "Cloud Services", "Cybersecurity", "Data Analytics", "AI Solutions"]
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <StarField />
      
      {/* Central node representing Nexvora */}
      <ServiceNode position={[0, 0, 0]} color="#ffffff" size={1} text="NEXVORA" hover={0.5} />
      
      {/* Service Orbits */}
      <ServiceOrbit radius={4} speed={0.2} height={0} services={bpmServices} color="#9b87f5" />
      <ServiceOrbit radius={6} speed={-0.15} height={1} services={lpoServices} color="#6e59a5" />
      <ServiceOrbit radius={8} speed={0.1} height={-1} services={itServices} color="#8E9196" />
      
      {/* Core service connections */}
      <ConnectionLine start={[0, 0, 0]} end={[0, 0, 4]} color="#9b87f5" />
      <ConnectionLine start={[0, 0, 0]} end={[0, 1, 6]} color="#6e59a5" />
      <ConnectionLine start={[0, 0, 0]} end={[0, -1, 8]} color="#8E9196" />
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
}

const ThreeDScene = () => {
  return (
    <div className="h-screen w-full">
      <Canvas shadows dpr={[1, 2]}>
        <Scene />
      </Canvas>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
        <h1 className="text-5xl md:text-6xl font-bold cosmic-text-gradient mb-4">
          Nexvora Outsourcing
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-xl">
          Scale Your Business. Explore the Universe of Outsourcing.
        </p>
      </div>
    </div>
  )
}

export default ThreeDScene
