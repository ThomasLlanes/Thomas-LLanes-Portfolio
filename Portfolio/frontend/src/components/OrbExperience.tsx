import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Group, MathUtils, Mesh, Points } from "three";

type OrbExperienceProps = {
  active: boolean;
  onActivate: () => void;
};

function CollectibleOrb({ active, hot }: { active: boolean; hot: boolean }) {
  const groupRef = useRef<Group>(null);
  const topShellRef = useRef<Group>(null);
  const bottomShellRef = useRef<Group>(null);
  const buttonRef = useRef<Group>(null);
  const innerGlowRef = useRef<Mesh>(null);
  const particlesRef = useRef<Points>(null);

  useFrame(({ clock, pointer }) => {
    const elapsed = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = active ? 0 : Math.sin(elapsed * 0.65) * 0.18 + pointer.x * 0.08;
      groupRef.current.rotation.x = active ? 0.02 : Math.sin(elapsed * 0.5) * 0.05 - pointer.y * 0.06;
      const scale = active ? 1.05 : 1;
      groupRef.current.scale.setScalar(hot ? scale + 0.05 : scale);
    }
    if (topShellRef.current) {
      topShellRef.current.position.y = MathUtils.lerp(topShellRef.current.position.y, active ? 0.34 : 0, 0.12);
      topShellRef.current.position.z = MathUtils.lerp(topShellRef.current.position.z, active ? -0.08 : 0, 0.12);
      topShellRef.current.rotation.x = MathUtils.lerp(topShellRef.current.rotation.x, active ? -0.48 : 0, 0.12);
    }
    if (bottomShellRef.current) {
      bottomShellRef.current.position.y = MathUtils.lerp(bottomShellRef.current.position.y, active ? -0.16 : 0, 0.12);
      bottomShellRef.current.rotation.x = MathUtils.lerp(bottomShellRef.current.rotation.x, active ? 0.08 : 0, 0.12);
    }
    if (buttonRef.current) {
      buttonRef.current.position.y = MathUtils.lerp(buttonRef.current.position.y, active ? -0.05 : 0, 0.12);
      buttonRef.current.position.z = MathUtils.lerp(buttonRef.current.position.z, active ? 1.08 : 1.055, 0.12);
    }
    if (innerGlowRef.current) {
      innerGlowRef.current.scale.setScalar(MathUtils.lerp(innerGlowRef.current.scale.x, active ? 1 : 0.001, 0.14));
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = active ? -0.3 : -elapsed * 0.18;
      particlesRef.current.rotation.x = active ? 0.08 : Math.sin(elapsed * 0.22) * 0.2;
    }
  });

  const particlePositions = useMemo(() => {
    const values: number[] = [];
    for (let index = 0; index < 90; index += 1) {
      const angle = (index / 90) * Math.PI * 2;
      const radius = 2.1 + Math.sin(index * 1.7) * 0.36;
      const height = Math.cos(index * 2.3) * 0.58;
      values.push(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
    }
    return new Float32Array(values);
  }, []);

  return (
    <group ref={groupRef}>
      <pointLight position={[0, 0, 2.2]} intensity={active ? 6.8 : 4.4} color="#ffe4e4" />
      <group ref={topShellRef}>
        <mesh>
          <sphereGeometry args={[1, 96, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial
            color="#f0444d"
            roughness={0.2}
            metalness={0.08}
            transmission={0.06}
            thickness={0.5}
            clearcoat={1}
            clearcoatRoughness={0.14}
            emissive="#9f1018"
            emissiveIntensity={hot ? 0.3 : active ? 0.2 : 0.12}
          />
        </mesh>
        <mesh position={[-0.34, 0.52, 0.78]} rotation={[0.25, -0.45, -0.5]} scale={[0.28, 0.11, 0.055]}>
          <sphereGeometry args={[1, 32, 16]} />
          <meshBasicMaterial color="#fff4f4" transparent opacity={0.78} />
        </mesh>
        <mesh position={[-0.2, 0.34, 0.88]} rotation={[0.16, -0.25, -0.25]} scale={[0.15, 0.055, 0.03]}>
          <sphereGeometry args={[1, 32, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.68} />
        </mesh>
      </group>
      <mesh ref={innerGlowRef} position={[0, 0.06, 0.1]} scale={[0.001, 0.001, 0.001]}>
        <sphereGeometry args={[0.72, 48, 20]} />
        <meshStandardMaterial color="#dffaff" emissive="#67dfff" emissiveIntensity={0.9} transparent opacity={0.42} />
      </mesh>
      <group ref={bottomShellRef}>
        <mesh>
          <sphereGeometry args={[1, 96, 48, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
          <meshPhysicalMaterial
            color="#f8fbff"
            roughness={0.28}
            metalness={0.07}
            transmission={0.12}
            thickness={0.62}
            clearcoat={1}
            clearcoatRoughness={0.18}
            emissive="#d7e5f5"
            emissiveIntensity={hot ? 0.16 : active ? 0.1 : 0.06}
          />
        </mesh>
      </group>
      {!active && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.004, 0.018, 24, 180]} />
          <meshStandardMaterial color="#111820" emissive="#03070b" emissiveIntensity={0.04} roughness={0.38} />
        </mesh>
      )}
      <group ref={buttonRef} position={[0, 0, 1.055]}>
        <mesh>
          <circleGeometry args={[0.255, 72]} />
          <meshStandardMaterial color="#171b20" emissive="#05080c" emissiveIntensity={0.1} roughness={0.28} />
        </mesh>
        <mesh position={[0, 0, 0.008]}>
          <circleGeometry args={[0.168, 72]} />
          <meshPhysicalMaterial color="#f9fcff" roughness={0.2} metalness={0.05} clearcoat={1} clearcoatRoughness={0.14} side={2} />
        </mesh>
        <mesh position={[0, 0, 0.016]}>
          <circleGeometry args={[0.098, 56]} />
          <meshPhysicalMaterial color="#d8dde9" roughness={0.16} metalness={0.05} emissive="#eff6ff" emissiveIntensity={active ? 0.58 : 0.34} side={2} />
        </mesh>
        <mesh position={[-0.045, 0.055, 0.025]} scale={[0.035, 0.02, 0.012]}>
          <sphereGeometry args={[1, 24, 12]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.86} />
        </mesh>
      </group>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#8ee6ff" size={0.028} transparent opacity={active ? 0.85 : 0.5} />
      </points>
    </group>
  );
}

export function OrbExperience({ active, onActivate }: OrbExperienceProps) {
  const [hot, setHot] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      onClick={onActivate}
      onPointerOver={() => setHot(true)}
      onPointerOut={() => setHot(false)}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#020814"]} />
      <ambientLight intensity={0.72} />
      <directionalLight position={[4, 5, 4]} intensity={2.5} color="#d7f6ff" />
      <directionalLight position={[-3, -2, -2]} intensity={0.8} color="#247cff" />
      <fog attach="fog" args={["#020814", 5.2, 8]} />
      <CollectibleOrb active={active} hot={hot} />
    </Canvas>
  );
}
