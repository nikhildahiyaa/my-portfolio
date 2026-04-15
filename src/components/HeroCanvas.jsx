import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Particle cloud ── */
function ParticleField() {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta * 0.04;
    ref.current.rotation.y -= delta * 0.025;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

/* ── Individual floating wireframe shape ── */
function FloatingShape({ position, speed, color, children }) {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.x = t * speed * 0.5;
    ref.current.rotation.y = t * speed * 0.35;
    ref.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.3;
  });

  return (
    <mesh ref={ref} position={position}>
      {children}
      <meshStandardMaterial color={color} wireframe opacity={0.55} transparent />
    </mesh>
  );
}

/* ── Mouse parallax wrapper ── */
function Scene({ mouse }) {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouse.current[0] * 0.3 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-mouse.current[1] * 0.15 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1} />
      <ParticleField />

      {/* Indigo icosahedron */}
      <FloatingShape position={[-3.2, 1.2, -1.5]} speed={0.38} color="#818cf8">
        <icosahedronGeometry args={[0.9, 0]} />
      </FloatingShape>

      {/* Cyan torus */}
      <FloatingShape position={[3.4, -0.6, -2]} speed={0.55} color="#22d3ee">
        <torusGeometry args={[0.55, 0.18, 8, 24]} />
      </FloatingShape>

      {/* Fuchsia octahedron */}
      <FloatingShape position={[-1.5, -2, -1]} speed={0.28} color="#e879f9">
        <octahedronGeometry args={[0.65]} />
      </FloatingShape>

      {/* Indigo tetrahedron */}
      <FloatingShape position={[2, 2, -0.8]} speed={0.48} color="#818cf8">
        <tetrahedronGeometry args={[0.55]} />
      </FloatingShape>

      {/* Cyan dodecahedron */}
      <FloatingShape position={[0.5, -1.5, -2.5]} speed={0.33} color="#22d3ee">
        <dodecahedronGeometry args={[0.5]} />
      </FloatingShape>

      {/* Fuchsia torus knot – small */}
      <FloatingShape position={[-2.5, -1.2, -2]} speed={0.2} color="#e879f9">
        <torusKnotGeometry args={[0.3, 0.1, 60, 8]} />
      </FloatingShape>
    </group>
  );
}

/* ── Exported canvas ── */
export default function HeroCanvas() {
  const mouse = useRef([0, 0]);

  function onMouseMove(e) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouse.current = [
      ((e.clientX - left) / width - 0.5) * 2,
      ((e.clientY - top) / height - 0.5) * 2,
    ];
  }

  return (
    <div
      className="absolute inset-0 -z-10"
      onMouseMove={onMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
