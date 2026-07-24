import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";

export default function CoralFragment() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const coralMaterial = new THREE.MeshStandardMaterial({
      color: 0x2ec4b6,
      emissive: 0x0a6b7c,
      emissiveIntensity: 0.4,
      roughness: 0.4,
      metalness: 0.1,
      flatShading: true,
    });

    const geometriesToDispose = [];
    const materialsToDispose = new Set();

    const branches = 8;
    for (let i = 0; i < branches; i++) {
      const angle = (i / branches) * Math.PI * 2;
      const radius = 0.3 + Math.random() * 0.4;
      const height = 0.6 + Math.random() * 1.2;
      const segments = 5;

      const geometry = new THREE.CylinderGeometry(0.02, 0.08, height, 5, segments);
      geometriesToDispose.push(geometry);
      const positions = geometry.attributes.position;
      for (let j = 0; j < positions.count; j++) {
        const x = positions.getX(j);
        const y = positions.getY(j);
        const z = positions.getZ(j);
        const noise = Math.sin(y * 3 + i) * 0.05;
        positions.setX(j, x + noise + (Math.random() - 0.5) * 0.03);
        positions.setZ(j, z + noise + (Math.random() - 0.5) * 0.5);
      }
      geometry.computeVertexNormals();

      const mesh = new THREE.Mesh(geometry, coralMaterial);
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.z = Math.sin(angle) * radius;
      mesh.position.y = -0.5;
      mesh.rotation.z = (Math.random() - 0.5) * 0.5;
      mesh.rotation.x = (Math.random() - 0.5) * 0.5;
      group.add(mesh);
    }

    const coreGeometry = new THREE.IcosahedronGeometry(0.25, 1);
    geometriesToDispose.push(coreGeometry);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x5eead4,
      emissive: 0x2ec4b6,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.3,
      flatShading: true,
    });
    materialsToDispose.add(coreMaterial);
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    scene.add(new THREE.AmbientLight(0x04344a, 1.2));
    const pointLight1 = new THREE.PointLight(0x2ec4b6, 2, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0xff6b8a, 0.8, 10);
    pointLight2.position.set(-2, -1, 1);
    scene.add(pointLight2);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let frameId;
    const clock = new THREE.Clock();
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.rotation.y += 0.003;
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, mouseY * 0.3, 0.05);
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, mouseX * 0.5, 0.05);
      coreMaterial.emissiveIntensity = 0.6 + Math.sin(t * 1.5) * 0.2 + Math.sin(t * 2.3) * 0.1;
      coralMaterial.emissiveIntensity = 0.3 + Math.sin(t * 1.2) * 0.15;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometriesToDispose.forEach((geometry) => geometry.dispose());
      geometriesToDispose.length = 0;
      materialsToDispose.forEach((material) => material.dispose());
      materialsToDispose.clear();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="relative w-full h-full flex items-center justify-center" aria-hidden="true">
        <svg viewBox="0 0 200 200" className="w-48 h-48 animate-float-coral opacity-80">
          <defs>
            <linearGradient id="coralGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ff6b8a" />
              <stop offset="50%" stopColor="#2ec4b6" />
              <stop offset="100%" stopColor="#5eead4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glow)">
            <rect x="85" y="40" width="6" height="80" rx="3" fill="url(#coralGrad)" opacity="0.9" />
            <rect x="75" y="60" width="5" height="55" rx="2.5" fill="url(#coralGrad)" opacity="0.85" transform="rotate(-15 77 60)" />
            <rect x="95" y="55" width="5" height="60" rx="2.5" fill="url(#coralGrad)" opacity="0.85" transform="rotate(12 97 55)" />
            <rect x="65" y="80" width="4" height="40" rx="2" fill="url(#coralGrad)" opacity="0.8" transform="rotate(-25 67 80)" />
            <rect x="105" y="75" width="4" height="45" rx="2" fill="url(#coralGrad)" opacity="0.8" transform="rotate(20 107 75)" />
            <circle cx="100" cy="35" r="6" fill="#5eead4" opacity="0.9" />
            <circle cx="100" cy="35" r="10" fill="none" stroke="#2ec4b6" strokeWidth="1" opacity="0.4" />
          </g>
        </svg>
      </div>
    );
  }

  return <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden="true" />;
}