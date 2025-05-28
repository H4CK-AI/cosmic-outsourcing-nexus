import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

// Enhanced floating sphere component with premium animations
const ServiceNode = ({ position = [0, 0, 0], color = "#9b87f5", size = 0.5, text = "", hover = 0, shape = "sphere" }) => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const textRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  
  useEffect(() => {
    if (hovered && meshRef.current) {
      gsap.to(meshRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.4, ease: "back.out(1.7)" })
      if (textRef.current) {
        gsap.to(textRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 })
      }
    } else if (meshRef.current) {
      gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.4, ease: "back.out(1.7)" })
      if (textRef.current) {
        gsap.to(textRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.3 })
      }
    }
  }, [hovered])

  useFrame((state) => {
    if (meshRef.current) {
      // Premium floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3 * hover
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 1.5 + position[2]) * 0.1 * hover
      
      // Continuous rotation with premium easing
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.015
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const geometry = React.useMemo(() => {
    switch (shape) {
      case 'box':
        return new THREE.BoxGeometry(size, size, size)
      case 'torus':
        return new THREE.TorusGeometry(size, size * 0.4, 16, 100)
      default:
        return new THREE.SphereGeometry(size, 32, 32)
    }
  }, [shape, size])

  const material = React.useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.2,
      metalness: 0.9,
      emissive: color,
      emissiveIntensity: hovered ? 0.6 : 0.2,
      transparent: true,
      opacity: 0.9
    }), [color, hovered])

  // Create text texture
  const textTexture = React.useMemo(() => {
    if (!text) return null
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = 512
    canvas.height = 128
    
    if (context) {
      context.fillStyle = 'white'
      context.font = '48px Arial'
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
            <planeGeometry args={[2, 0.5]} />
            <meshBasicMaterial map={textTexture} transparent />
          </mesh>
        </group>
      )}
      
      {/* Enhanced glow effect */}
      <mesh position={[0, 0, 0]} scale={[2, 2, 2]}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={hovered ? 0.15 : 0.05}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

// Enhanced connection line with animation - Fixed ref type
const ConnectionLine = ({ start, end, color = "#ffffff" }) => {
  const ref = useRef<THREE.Line>(null!)
  
  const points = React.useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end])

  const geometry = React.useMemo(() => 
    new THREE.BufferGeometry().setFromPoints(points), [points])

  const material = React.useMemo(() => 
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 }), [color])
  
  useFrame(({ clock }) => {
    if (ref.current && ref.current.material instanceof THREE.LineBasicMaterial) {
      const opacity = 0.3 + Math.sin(clock.elapsedTime * 2) * 0.2
      ref.current.material.opacity = opacity
    }
  })
  
  return <primitive object={new THREE.Line(geometry, material)} ref={ref} />
}

// Enhanced orbital path with glow
const OrbitalPath = ({ radius = 3, color = "#6e59a5", segments = 128 }) => {
  const pathRef = useRef<THREE.Mesh>(null!)
  
  const geometry = React.useMemo(() => 
    new THREE.RingGeometry(radius - 0.02, radius + 0.02, segments), [radius, segments])

  const material = React.useMemo(() => 
    new THREE.MeshBasicMaterial({ 
      color, 
      transparent: true, 
      opacity: 0.3, 
      side: THREE.DoubleSide 
    }), [color])

  const glowGeometry = React.useMemo(() => 
    new THREE.RingGeometry(radius - 0.1, radius + 0.1, segments), [radius, segments])

  const glowMaterial = React.useMemo(() => 
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    }), [color])
  
  useFrame(({ clock }) => {
    if (pathRef.current && pathRef.current.material instanceof THREE.MeshBasicMaterial) {
      const intensity = 0.2 + Math.sin(clock.elapsedTime) * 0.1
      pathRef.current.material.opacity = intensity
    }
  })

  return (
    <group>
      <mesh ref={pathRef} rotation={[Math.PI / 2, 0, 0]} geometry={geometry} material={material} />
      <mesh rotation={[Math.PI / 2, 0, 0]} geometry={glowGeometry} material={glowMaterial} />
    </group>
  )
}

// Enhanced rotating orbital group
const ServiceOrbit = ({ radius = 3, speed = 0.5, height = 0, services = [], color = "#9b87f5", shape = "sphere" }) => {
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * speed * 0.1
    }
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
            shape={shape}
            size={0.6}
          />
        )
      })}
    </group>
  )
}

// Enhanced starfield with more depth and grayscale
const StarField = () => {
  const starsRef = useRef<THREE.Points>(null!)
  
  const { positions, colors } = React.useMemo(() => {
    const positions = new Float32Array(5000 * 3)
    const colors = new Float32Array(5000 * 3)
    
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
      
      // Grayscale colors
      const gray = Math.random() * 0.5 + 0.5
      colors[i * 3] = gray
      colors[i * 3 + 1] = gray
      colors[i * 3 + 2] = gray
    }
    
    return { positions, colors }
  }, [])

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = clock.elapsedTime * 0.01
      starsRef.current.rotation.y = clock.elapsedTime * 0.02
    }
  })
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={5000}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={5000}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={2} vertexColors transparent opacity={0.8} />
    </points>
  )
}

// Enhanced central globe with better materials
const CentralGlobe = () => {
  const globeRef = useRef<THREE.Mesh>(null!)
  
  const geometry = React.useMemo(() => new THREE.SphereGeometry(1.2, 64, 64), [])
  const material = React.useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: "#ffd93d",
      roughness: 0.1,
      metalness: 0.8,
      emissive: "#ffd93d",
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.9
    }), [])

  const glowGeometry = React.useMemo(() => new THREE.SphereGeometry(1.2, 32, 32), [])
  const glowMaterial = React.useMemo(() => 
    new THREE.MeshBasicMaterial({
      color: "#ffd93d",
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    }), [])

  // Create text texture for NEXVORA
  const textTexture = React.useMemo(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = 512
    canvas.height = 128
    
    if (context) {
      context.fillStyle = 'white'
      context.font = 'bold 48px Arial'
      context.textAlign = 'center'
      context.fillText('NEXVORA', 256, 64)
    }
    
    return new THREE.CanvasTexture(canvas)
  }, [])
  
  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.elapsedTime * 0.1
      globeRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.1
    }
  })
  
  return (
    <group>
      <mesh ref={globeRef} geometry={geometry} material={material} />
      <mesh scale={[1.5, 1.5, 1.5]} geometry={glowGeometry} material={glowMaterial} />
      
      {/* Text label */}
      <mesh position={[0, 2.5, 0]}>
        <planeGeometry args={[3, 0.75]} />
        <meshBasicMaterial map={textTexture} transparent />
      </mesh>
    </group>
  )
}

// Camera controller component to fix zoom/scroll issues
const CameraController = () => {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(0, 3, 12)
    camera.lookAt(0, 0, 0)
  }, [camera])

  useFrame(() => {
    // Gentle auto-rotation without interfering with user controls
    if (camera) {
      camera.position.x = Math.sin(Date.now() * 0.0001) * 0.5
      camera.position.z = 12 + Math.cos(Date.now() * 0.0001) * 0.5
      camera.lookAt(0, 0, 0)
    }
  })

  return null
}

// Main scene component
const Scene = () => {
  // Enhanced service arrays with more variety
  const bpmServices = ["Customer Support", "Data Entry", "Back Office", "Recruitment", "Finance & Accounting"]
  const lpoServices = ["Legal Review", "Contract Analysis", "Compliance", "Research", "Documentation"]
  const itServices = ["Development", "Cloud Services", "Cybersecurity", "Data Analytics", "AI Solutions"]
  
  // Enhanced vibrant color palette
  const colors = {
    bpm: "#ff6b6b",      // Coral red
    lpo: "#4ecdc4",      // Turquoise
    it: "#45b7d1",       // Sky blue
    center: "#ffd93d",   // Golden yellow
    accent1: "#6c5ce7",  // Purple
    accent2: "#a29bfe",  // Light purple
    accent3: "#fd79a8"   // Pink
  }
  
  return (
    <>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={2} color={colors.accent1} />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color={colors.accent2} />
      <pointLight position={[0, 15, 0]} intensity={1.5} color={colors.accent3} />
      <spotLight 
        position={[0, 20, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={2} 
        color={colors.center}
        castShadow
      />
      
      <StarField />
      
      {/* Enhanced central globe */}
      <CentralGlobe />
      
      {/* Enhanced Service Orbits with different shapes and improved animations */}
      <ServiceOrbit 
        radius={5} 
        speed={0.4} 
        height={0} 
        services={bpmServices} 
        color={colors.bpm} 
        shape="sphere"
      />
      <ServiceOrbit 
        radius={7.5} 
        speed={-0.25} 
        height={1.5} 
        services={lpoServices} 
        color={colors.lpo} 
        shape="box"
      />
      <ServiceOrbit 
        radius={10} 
        speed={0.2} 
        height={-1.2} 
        services={itServices} 
        color={colors.it} 
        shape="torus"
      />
      
      {/* Enhanced connections with multiple colors and better animations */}
      <ConnectionLine start={[0, 0, 0]} end={[0, 0, 5]} color={colors.bpm} />
      <ConnectionLine start={[0, 0, 0]} end={[0, 1.5, 7.5]} color={colors.lpo} />
      <ConnectionLine start={[0, 0, 0]} end={[0, -1.2, 10]} color={colors.it} />
      
      {/* Additional dynamic connections */}
      <ConnectionLine start={[3, 0, 3]} end={[-3, 1, -3]} color={colors.accent1} />
      <ConnectionLine start={[-4, 0, 2]} end={[4, -1, -4]} color={colors.accent2} />
      <ConnectionLine start={[2, 2, -2]} end={[-2, -2, 4]} color={colors.accent3} />
      
      <CameraController />
    </>
  )
}

// Enhanced loading fallback
const LoadingFallback = () => (
  <div className="h-full w-full flex items-center justify-center bg-cosmic-dark">
    <div className="text-white text-center p-8">
      <div className="animate-spin w-16 h-16 border-4 border-cosmic-accent border-t-transparent rounded-full mx-auto mb-4"></div>
      <h2 className="text-2xl mb-4 cosmic-text-gradient">Loading 3D Universe...</h2>
      <p className="text-white/60">Initializing premium 3D experience</p>
    </div>
  </div>
)

// Enhanced error boundary
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.error("3D Scene Error:", error);
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Three.js rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex items-center justify-center bg-cosmic-dark">
          <div className="text-white text-center p-8">
            <h2 className="text-2xl mb-4 cosmic-text-gradient">3D Visualization Loading...</h2>
            <p className="text-white/60">Initializing premium 3D experience</p>
            <div 
              className="mt-6 px-6 py-3 bg-cosmic-accent rounded-lg hover:bg-cosmic-highlight transition-colors cursor-pointer"
              onClick={() => this.setState({ hasError: false })}
            >
              Retry
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ThreeDScene = () => {
  useEffect(() => {
    // Disable scroll-to-zoom behavior and prevent default scrolling within canvas
    const preventZoom = (e: WheelEvent) => {
      if (e.target instanceof HTMLCanvasElement) {
        e.preventDefault()
        e.stopPropagation()
      }
    }
    
    window.addEventListener('wheel', preventZoom, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', preventZoom)
    }
  }, [])

  return (
    <div className="h-screen w-full relative">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 3, 12], fov: 75 }}
      >
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </ErrorBoundary>
      </Canvas>
      
      {/* Enhanced overlay text with better animations */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold cosmic-text-gradient mb-6 animate-fade-in">
          Nexvora Outsourcing
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Scale Your Business. Explore the Universe of Outsourcing Solutions.
        </p>
        
        {/* Enhanced premium glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-cosmic-accent/20 via-transparent to-transparent blur-3xl -z-10"></div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce pointer-events-none">
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
