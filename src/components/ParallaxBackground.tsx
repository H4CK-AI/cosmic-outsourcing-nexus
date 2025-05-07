
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Stars, useTexture } from '@react-three/drei';

const ParticleField = ({ count = 5000, size = 0.015 }) => {
  const mesh = useRef<THREE.Points>(null!);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });
  
  useEffect(() => {
    if (mesh.current) {
      const particles = mesh.current.geometry as THREE.BufferGeometry;
      const positions = new Float32Array(count * 3);
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Create particles in a spherical distribution
        const radius = 5 + Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
      }
      
      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, [count]);
  
  return (
    <points ref={mesh}>
      <bufferGeometry />
      <pointsMaterial 
        size={size} 
        sizeAttenuation={true} 
        color="white" 
        transparent 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const MovingNebula = ({ speed = 0.01 }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const texture = useTexture('/images/nebula.png');
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.z = clock.getElapsedTime() * speed;
    }
  });
  
  return (
    <mesh ref={mesh} scale={[30, 30, 1]} position={[0, 0, -20]}>
      <planeGeometry />
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        opacity={0.4} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

interface ParallaxBackgroundProps {
  mouseMove?: boolean;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ mouseMove = true }) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null!);
  
  useEffect(() => {
    if (mouseMove) {
      const handleMouseMove = (event: MouseEvent) => {
        if (groupRef.current) {
          // Calculate normalized mouse position (-1 to 1)
          const x = (event.clientX / window.innerWidth) * 2 - 1;
          const y = -(event.clientY / window.innerHeight) * 2 + 1;
          
          // Move slightly based on mouse position for parallax effect
          groupRef.current.rotation.x = y * 0.1;
          groupRef.current.rotation.y = x * 0.1;
        }
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [mouseMove]);
  
  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
      <ParticleField count={3000} />
      <MovingNebula />
    </group>
  );
};

export default ParallaxBackground;
