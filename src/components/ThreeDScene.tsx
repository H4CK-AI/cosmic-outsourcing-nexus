
import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

// Simple floating object with smooth physics
const SpaceObject = ({ 
  position = [0, 0, 0], 
  color = "#9b87f5", 
  size = 0.5, 
  text = "", 
  shape = "sphere",
  mousePosition = { x: 0, y: 0 }
}) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const textRef = useRef<THREE.Group>(null!)
  const [velocity] = useState({ x: 0, y: 0, z: 0 })
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      
      // Mouse influence
      const mouseInfluence = 1.5
      const targetX = position[0] + mousePosition.x * mouseInfluence
      const targetY = position[1] + mousePosition.y * mouseInfluence
      
      // Smooth movement
      velocity.x += (targetX - meshRef.current.position.x) * 0.015
      velocity.y += (targetY - meshRef.current.position.y) * 0.015
      velocity.z += (Math.sin(time * 0.4) * 0.2 - meshRef.current.position.z + position[2]) * 0.008
      
      // Apply damping
      velocity.x *= 0.96
      velocity.y *= 0.96
      velocity.z *= 0.96
      
      // Update position
      meshRef.current.position.x += velocity.x
      meshRef.current.position.y += velocity.y
      meshRef.current.position.z += velocity.z
      
      // Smooth rotation
      meshRef.current.rotation.x += 0.008 + velocity.x * 0.05
      meshRef.current.rotation.y += 0.012 + velocity.y * 0.05
      meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.05
    }
  })

  const geometry = React.useMemo(() => {
    switch (shape) {
      case 'box':
        return new THREE.BoxGeometry(size, size, size)
      case 'torus':
        return new THREE.TorusGeometry(size, size * 0.4, 16, 100)
      case 'octahedron':
        return new THREE.OctahedronGeometry(size)
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(size)
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(size)
      default:
        return new THREE.SphereGeometry(size, 32, 32)
    }
  }, [shape, size])

  const material = React.useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.2,
      metalness: 0.8,
      emissive: color,
      emissiveIntensity: hovered ? 0.5 : 0.2,
      transparent: true,
      opacity: 0.85
    }), [color, hovered])

  const textTexture = React.useMemo(() => {
    if (!text) return null
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = 512
    canvas.height = 128
    
    if (context) {
      context.fillStyle = 'rgba(255, 255, 255, 0.9)'
      context.font = 'bold 36px Arial'
      context.textAlign = 'center'
      context.fillText(text, 256, 64)
    }
    
    return new THREE.CanvasTexture(canvas)
  }, [text])

  return (
    <group position={[position[0], position[1], position[2]]}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
      />
      
      {text && textTexture && (
        <group ref={textRef} position={[0, size + 0.8, 0]}>
          <mesh>
            <planeGeometry args={[2.2, 0.5]} />
            <meshBasicMaterial map={textTexture} transparent />
          </mesh>
        </group>
      )}
      
      {/* Glow effect */}
      <mesh position={[0, 0, 0]} scale={[1.6, 1.6, 1.6]}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={hovered ? 0.15 : 0.06}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

// Orbital ring
const OrbitalRing = ({ radius = 3, color = "#6e59a5", mousePosition = { x: 0, y: 0 } }) => {
  const ringRef = useRef<THREE.Mesh>(null!)
  
  useFrame(({ clock }) => {
    if (ringRef.current) {
      const mouseInfluence = mousePosition.x * 0.3 + mousePosition.y * 0.2
      ringRef.current.rotation.y = clock.elapsedTime * 0.08 + mouseInfluence
      ringRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.08 + mousePosition.y * 0.15
    }
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.04, radius + 0.04, 128]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.35} 
        side={THREE.DoubleSide} 
      />
    </mesh>
  )
}

// Central core
const CentralCore = ({ mousePosition = { x: 0, y: 0 } }) => {
  const coreRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  
  useFrame(({ clock }) => {
    if (coreRef.current) {
      const time = clock.elapsedTime
      coreRef.current.rotation.y = time * 0.12 + mousePosition.x * 0.2
      coreRef.current.rotation.x = Math.sin(time * 0.15) * 0.08 + mousePosition.y * 0.15
      
      const scale = 1 + Math.sin(time * 1.5) * 0.03
      coreRef.current.scale.setScalar(scale)
    }
    
    if (glowRef.current) {
      const glowScale = 1.1 + Math.sin(clock.elapsedTime * 1.2) * 0.08
      glowRef.current.scale.setScalar(glowScale)
    }
  })

  const textTexture = React.useMemo(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = 512
    canvas.height = 128
    
    if (context) {
      context.fillStyle = 'rgba(255, 255, 255, 0.95)'
      context.font = 'bold 48px Arial'
      context.textAlign = 'center'
      context.fillText('NEXVORA', 256, 74)
    }
    
    return new THREE.CanvasTexture(canvas)
  }, [])

  return (
    <group>
      <mesh ref={coreRef} castShadow>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#ffd93d"
          roughness={0.1}
          metalness={0.8}
          emissive="#ffd93d"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      <mesh ref={glowRef} scale={[1.4, 1.4, 1.4]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ffd93d"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <mesh position={[0, 2.5, 0]}>
        <planeGeometry args={[3.5, 0.8]} />
        <meshBasicMaterial map={textTexture} transparent />
      </mesh>
    </group>
  )
}

// Enhanced starfield
const StarField = ({ mousePosition = { x: 0, y: 0 } }) => {
  const starsRef = useRef<THREE.Points>(null!)
  
  const { positions, colors } = React.useMemo(() => {
    const positions = new Float32Array(6000 * 3)
    const colors = new Float32Array(6000 * 3)
    
    for (let i = 0; i < 6000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1500
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1500
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1500
      
      const gray = Math.random() * 0.3 + 0.7
      colors[i * 3] = gray
      colors[i * 3 + 1] = gray
      colors[i * 3 + 2] = gray
    }
    
    return { positions, colors }
  }, [])

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = clock.elapsedTime * 0.003 + mousePosition.y * 0.015
      starsRef.current.rotation.y = clock.elapsedTime * 0.008 + mousePosition.x * 0.015
    }
  })
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={6000}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={6000}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={1.2} vertexColors transparent opacity={0.7} />
    </points>
  )
}

// Mouse controller
const MouseController = ({ setMousePosition }) => {
  const { size } = useThree()
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / size.width) * 2 - 1
      const y = -(event.clientY / size.height) * 2 + 1
      setMousePosition({ x: x * 0.4, y: y * 0.4 })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [size, setMousePosition])
  
  return null
}

// Main scene
const Scene = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const services = {
    bpm: ["Customer Support", "Data Entry", "Back Office", "Recruitment", "Finance"],
    lpo: ["Legal Review", "Contract Analysis", "Compliance", "Research", "Documentation"],
    it: ["Development", "Cloud Services", "Cybersecurity", "Data Analytics", "AI Solutions"]
  }
  
  const colors = {
    bpm: "#ff6b6b",
    lpo: "#4ecdc4", 
    it: "#45b7d1",
    center: "#ffd93d",
    accent1: "#6c5ce7",
    accent2: "#a29bfe"
  }
  
  const shapes = ['sphere', 'box', 'torus', 'octahedron', 'tetrahedron', 'dodecahedron']
  
  return (
    <>
      <ambientLight intensity={0.35} color="#ffffff" />
      <pointLight position={[12, 12, 12]} intensity={2} color={colors.accent1} />
      <pointLight position={[-12, -12, -12]} intensity={1.5} color={colors.accent2} />
      <spotLight 
        position={[0, 20, 0]} 
        angle={0.2} 
        penumbra={1} 
        intensity={2} 
        color={colors.center}
        castShadow
      />
      
      <MouseController setMousePosition={setMousePosition} />
      <StarField mousePosition={mousePosition} />
      <CentralCore mousePosition={mousePosition} />
      
      {/* Orbital rings */}
      <OrbitalRing radius={4.5} color={colors.bpm} mousePosition={mousePosition} />
      <OrbitalRing radius={7} color={colors.lpo} mousePosition={mousePosition} />
      <OrbitalRing radius={9.5} color={colors.it} mousePosition={mousePosition} />
      
      {/* BPM Services */}
      {services.bpm.map((service, index) => {
        const angle = (index / services.bpm.length) * Math.PI * 2
        const radius = 4.5
        return (
          <SpaceObject
            key={service}
            position={[Math.cos(angle) * radius, Math.sin(angle * 0.4) * 1.2, Math.sin(angle) * radius]}
            color={colors.bpm}
            text={service}
            shape={shapes[index % shapes.length]}
            size={0.6}
            mousePosition={mousePosition}
          />
        )
      })}
      
      {/* LPO Services */}
      {services.lpo.map((service, index) => {
        const angle = (index / services.lpo.length) * Math.PI * 2 + Math.PI * 0.25
        const radius = 7
        return (
          <SpaceObject
            key={service}
            position={[Math.cos(angle) * radius, Math.sin(angle * 0.6) * 1.8, Math.sin(angle) * radius]}
            color={colors.lpo}
            text={service}
            shape={shapes[(index + 2) % shapes.length]}
            size={0.55}
            mousePosition={mousePosition}
          />
        )
      })}
      
      {/* IT Services */}
      {services.it.map((service, index) => {
        const angle = (index / services.it.length) * Math.PI * 2 + Math.PI * 0.5
        const radius = 9.5
        return (
          <SpaceObject
            key={service}
            position={[Math.cos(angle) * radius, Math.sin(angle * 0.25) * 2.2, Math.sin(angle) * radius]}
            color={colors.it}
            text={service}
            shape={shapes[(index + 4) % shapes.length]}
            size={0.7}
            mousePosition={mousePosition}
          />
        )
      })}
      
      <fog attach="fog" args={['#0a0a1a', 12, 50]} />
    </>
  )
}

const LoadingFallback = () => (
  <div className="h-full w-full flex items-center justify-center bg-cosmic-dark">
    <div className="text-white text-center p-8">
      <div className="animate-spin w-12 h-12 border-4 border-cosmic-accent border-t-transparent rounded-full mx-auto mb-4"></div>
      <h2 className="text-xl mb-2 cosmic-text-gradient">Loading Universe...</h2>
      <p className="text-white/60">Initializing...</p>
    </div>
  </div>
)

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-cosmic-dark">
          <div className="text-white text-center p-8">
            <h2 className="text-xl mb-2 cosmic-text-gradient">Loading 3D Scene...</h2>
            <p className="text-white/60">Please wait...</p>
            <button 
              className="mt-4 px-4 py-2 bg-cosmic-accent rounded hover:bg-cosmic-highlight transition-colors"
              onClick={() => this.setState({ hasError: false })}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ThreeDScene = () => {
  return (
    <div className="h-screen w-full relative">
      <div className="absolute inset-0">
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          camera={{ position: [0, 4, 12], fov: 75 }}
        >
          <ErrorBoundary>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </ErrorBoundary>
        </Canvas>
      </div>
      
      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold cosmic-text-gradient mb-6 animate-fade-in">
            Nexvora Outsourcing
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Scale Your Business. Explore the Universe of Outsourcing Solutions.
          </p>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreeDScene
