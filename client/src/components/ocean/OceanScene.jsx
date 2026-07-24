import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useReefStore } from '../../store/useReefStore';

// Custom Water Surface Shader with animated pop-art waves
function WaterSurface() {
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#00F0FF') }, // Pop Teal
      uColor2: { value: new THREE.Color('#0066FF') }, // Pop Blue
    }),
    []
  );

  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float elevation = sin(pos.x * 2.5 + uTime * 1.5) * cos(pos.y * 2.5 + uTime * 1.5) * 0.25;
      pos.z += elevation;
      vElevation = elevation;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float mixFactor = (vElevation + 0.25) * 2.0;
      vec3 color = mix(uColor1, uColor2, mixFactor);
      
      // Pop-Art grid line effect
      float gridX = step(0.95, fract(vUv.x * 30.0));
      float gridY = step(0.95, fract(vUv.y * 30.0));
      float grid = max(gridX, gridY);
      
      color = mix(color, vec3(0.0), grid * 0.4);
      gl_FragColor = vec4(color, 0.85);
    }
  `;

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2.2, 0, 0]}
      position={[0, -1.2, -5.0]} // Background depth z = -5 per global rule
    >
      <planeGeometry args={[30, 20, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Deep Sea Plastic Micro-particle Current System
function DeepSeaParticleCurrents({ visible }) {
  const count = 1200;
  const particlesRef = useRef();

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12 - 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5.0; // Deep backdrop z = -5
      spd[i] = Math.random() * 0.08 + 0.02;
    }
    return [pos, spd];
  }, []);

  useFrame(() => {
    if (!visible || !particlesRef.current) return;
    const positionsArray = particlesRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      positionsArray[i * 3] += speeds[i]; // Move along horizontal current
      if (positionsArray[i * 3] > 12) {
        positionsArray[i * 3] = -12;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!visible) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#FF003C" // Pop Red Plastic particles
        transparent
        opacity={0.85}
      />
    </points>
  );
}

// Interactive 3D Reef Pins placed at z = 0 (PROXIMITY RULE FOR INTERACTIVE ELEMENTS)
function InteractiveReefPins() {
  const { reefs, selectedReefId, setSelectedReefId } = useReefStore();

  return (
    <group position={[0, 0, 0]}>
      {reefs.map((reef, idx) => {
        // Map latitude/longitude to 3D layout coordinates near z = 0
        const x = (reef.coordinates[1] / 180) * 8 - 1;
        const y = (reef.coordinates[0] / 90) * 2.5 + 0.5;
        const z = 0.0; // INTERACTIVE ELEMENT AT Z = 0 PER GLOBAL RULE!

        const isSelected = reef.id === selectedReefId;

        return (
          <group key={reef.id} position={[x, y, z]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
              {/* 3D Pin Head */}
              <mesh
                onClick={() => setSelectedReefId(reef.id)}
                scale={isSelected ? [0.45, 0.45, 0.45] : [0.35, 0.35, 0.35]}
              >
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial
                  color={isSelected ? '#FFE600' : '#00F0FF'}
                  emissive={isSelected ? '#FF7A00' : '#0066FF'}
                  emissiveIntensity={0.6}
                  roughness={0.2}
                />
              </mesh>

              {/* Pop-Art Speech Badge HTML Overlay */}
              <Html distanceFactor={8} position={[0, 0.6, 0.2]} center>
                <div
                  onClick={() => setSelectedReefId(reef.id)}
                  className={`cursor-pointer transition-all duration-200 transform ${
                    isSelected ? 'scale-110 -translate-y-2' : 'hover:scale-105'
                  }`}
                >
                  <div
                    className={`comic-box px-3 py-1.5 font-comic text-xs whitespace-nowrap shadow-pop flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-popYellow text-black border-4 border-black font-extrabold'
                        : 'bg-white text-black border-3 border-black'
                    }`}
                  >
                    <span className="text-sm">🪸</span>
                    <span>{reef.name}</span>
                    <span
                      className={`ml-1 px-1.5 py-0.5 text-[10px] uppercase border border-black rounded ${
                        reef.healthIndex >= 80 ? 'bg-popGreen text-black' : 'bg-popPink text-white'
                      }`}
                    >
                      {reef.healthIndex}% HEALTH
                    </span>
                  </div>
                  {/* Bubble tail */}
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black mx-auto"></div>
                </div>
              </Html>
            </Float>
          </group>
        );
      })}
    </group>
  );
}

// Camera animation controller based on visual mode
function SceneCameraController() {
  const { visualMode } = useReefStore();

  useFrame((state) => {
    const targetZ = visualMode === 'DEEP_SEA_PLASTIC_CURRENT' ? 4.5 : 7.0;
    const targetY = visualMode === 'DEEP_SEA_PLASTIC_CURRENT' ? -2.0 : 0.8;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function OceanScene() {
  const { visualMode } = useReefStore();
  const isDeepSea = visualMode === 'DEEP_SEA_PLASTIC_CURRENT';

  return (
    <div className="w-full h-full relative overflow-hidden bg-popDark">
      <Canvas
        camera={{ position: [0, 0.8, 7.0], fov: 55 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        {/* Lighting setup */}
        <ambientLight intensity={isDeepSea ? 0.3 : 0.9} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={isDeepSea ? 0.4 : 1.6}
          color={isDeepSea ? '#00F0FF' : '#FFFFFF'}
          castShadow
        />
        <pointLight position={[-5, -2, -2]} intensity={0.8} color="#FF2A85" />

        {/* Ocean Background Skybox Stars */}
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

        {/* Water Surface Mesh at z = -5 */}
        <WaterSurface />

        {/* Deep Sea Plastic Particles (Visible in deep-sea mode) */}
        <DeepSeaParticleCurrents visible={isDeepSea} />

        {/* Interactive Reef Pin Markers at z = 0 (Proximity Rule) */}
        <InteractiveReefPins />

        {/* Camera Control Smoother */}
        <SceneCameraController />

        <OrbitControls
          enableZoom={true}
          maxDistance={12}
          minDistance={3}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>

      {/* Pop-Art Mode Indicator Badge overlay */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="comic-box bg-popYellow text-black px-4 py-2 font-comic text-lg flex items-center gap-2 shadow-pop">
          <span className="animate-pulse">⚡</span>
          <span>
            {isDeepSea ? 'MODE: DEEP-SEA PLASTIC CURRENT VECTOR' : 'MODE: SURFACE OCEAN REEF MAP'}
          </span>
          <span className="bg-black text-white text-xs px-2 py-0.5 rounded font-mono ml-2">
            60 FPS R3F
          </span>
        </div>
      </div>
    </div>
  );
}
