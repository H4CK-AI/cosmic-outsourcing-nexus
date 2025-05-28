
import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingGeometry = ({ position, color, shape = 'sphere', speed = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  const geometry = useMemo(() => {
    switch (shape) {
      case 'box':
        return new THREE.BoxGeometry(0.5, 0.5, 0.5);
      case 'torus':
        return new THREE.TorusGeometry(0.3, 0.1, 8, 16);
      case 'octahedron':
        return new THREE.OctahedronGeometry(0.4);
      default:
        return new THREE.SphereGeometry(0.3, 16, 16);
    }
  }, [shape]);

  const material = useMemo(() => 
    new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.6,
      metalness: 0.8,
      roughness: 0.2
    }), [color]);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(clock.elapsedTime * speed) * 2;
      meshRef.current.position.y = position[1] + Math.cos(clock.elapsedTime * speed * 0.7) * 1.5;
      meshRef.current.position.z = position[2] + Math.sin(clock.elapsedTime * speed * 0.5) * 1;
      
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.02 * speed;
      meshRef.current.rotation.z += 0.005 * speed;
    }
  });
  
  return <mesh ref={meshRef} geometry={geometry} material={material} castShadow receiveShadow />;
};

const ParticleSystem = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      
      // Grayscale with hints of color
      const baseGray = Math.random() * 0.3 + 0.4;
      colors[i * 3] = baseGray + Math.random() * 0.2;
      colors[i * 3 + 1] = baseGray + Math.random() * 0.1;
      colors[i * 3 + 2] = baseGray + Math.random() * 0.3;
    }
    
    return { positions, colors };
  }, []);
  
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = clock.elapsedTime * 0.02;
      pointsRef.current.rotation.y = clock.elapsedTime * 0.03;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={2000}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={1} vertexColors transparent opacity={0.6} />
    </points>
  );
};

const Enhanced3DScene = () => {
  const geometries = useMemo(() => [
    { position: [-10, 5, -5], color: '#9b87f5', shape: 'sphere', speed: 0.8 },
    { position: [8, -3, -8], color: '#6e59a5', shape: 'box', speed: 1.2 },
    { position: [-5, -8, 5], color: '#4ecdc4', shape: 'torus', speed: 0.6 },
    { position: [12, 8, 3], color: '#ff6b6b', shape: 'octahedron', speed: 1.0 },
    { position: [-12, 2, 8], color: '#45b7d1', shape: 'sphere', speed: 0.9 },
    { position: [5, -5, -10], color: '#ffd93d', shape: 'box', speed: 0.7 },
  ], []);
  
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#9b87f5" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#6e59a5" />
      <directionalLight position={[0, 20, 0]} intensity={0.5} color="#ffffff" />
      
      <ParticleSystem />
      
      {geometries.map((geo, index) => (
        <FloatingGeometry
          key={index}
          position={geo.position}
          color={geo.color}
          shape={geo.shape}
          speed={geo.speed}
        />
      ))}
      
      <fog attach="fog" args={['#1a1a2e', 20, 100]} />
    </>
  );
};

const Enhanced3DBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Enhanced3DScene />
      </Canvas>
    </div>
  );
};

export default Enhanced3DBackground;
