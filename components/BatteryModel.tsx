"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh, Group } from "three";

type BatteryModelProps = {
  compact?: boolean;
  risk?: number;
  safetyGlow?: boolean;
  pulseSpeed?: number;
};

function BatteryCore({
  compact = false,
  risk = 22,
  safetyGlow = false,
  pulseSpeed = 2.2,
}: BatteryModelProps) {
  const group = useRef<Group>(null);
  const glow = useRef<Mesh>(null);
  const outerOrbit = useRef<Mesh>(null);
  const innerOrbit = useRef<Mesh>(null);
  const scanLine = useRef<Mesh>(null);
  const riskColor = risk > 70 ? "#fb7185" : risk > 42 ? "#facc15" : safetyGlow ? "#34d399" : "#00D9FF";

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = elapsed * 0.32;
      group.current.rotation.x = Math.sin(elapsed * 0.55) * 0.08;
    }
    if (glow.current) {
      const pulse = 1 + Math.sin(elapsed * pulseSpeed) * (risk > 70 ? 0.15 : 0.08);
      glow.current.scale.setScalar(pulse);
    }
    if (outerOrbit.current) {
      outerOrbit.current.rotation.z = elapsed * 0.42;
      outerOrbit.current.rotation.x = Math.PI / 2 + Math.sin(elapsed * 0.4) * 0.1;
    }
    if (innerOrbit.current) {
      innerOrbit.current.rotation.z = -elapsed * 0.58;
      innerOrbit.current.rotation.y = Math.PI / 3 + Math.sin(elapsed * 0.36) * 0.12;
    }
    if (scanLine.current) {
      scanLine.current.position.y = Math.sin(elapsed * 1.4) * 1.55;
    }
  });

  return (
    <Float speed={1.45} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={group} scale={compact ? 0.72 : 1}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.15, 3.8, 0.92]} />
          <meshStandardMaterial
            color="#111827"
            metalness={0.72}
            roughness={0.18}
            emissive="#06233a"
            emissiveIntensity={0.45}
          />
        </mesh>
        <mesh position={[0, 2.13, 0]}>
          <boxGeometry args={[0.92, 0.34, 0.62]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.2} />
        </mesh>
        {[-1.2, -0.42, 0.36, 1.14].map((y, index) => (
          <mesh key={y} position={[0, y, 0.49]}>
            <boxGeometry args={[1.72, 0.48, 0.045]} />
            <meshStandardMaterial
              color={index === 3 ? riskColor : "#00D9FF"}
              emissive={index === 3 ? riskColor : "#00D9FF"}
              emissiveIntensity={index === 3 ? 1.7 : 1.05}
              toneMapped={false}
            />
          </mesh>
        ))}
        <mesh ref={glow} position={[0, 0, 0.02]}>
          <boxGeometry args={[2.38, 4.05, 1.06]} />
          <meshBasicMaterial color={riskColor} transparent opacity={0.075} />
        </mesh>
        <mesh ref={scanLine} position={[0, 0, 0.535]}>
          <boxGeometry args={[1.92, 0.035, 0.035]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.65} />
        </mesh>
        <mesh ref={outerOrbit} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.68, 0.012, 16, 128]} />
          <meshBasicMaterial color="#7C3AED" transparent opacity={0.72} />
        </mesh>
        <mesh ref={innerOrbit} rotation={[Math.PI / 2, 0, Math.PI / 3]}>
          <torusGeometry args={[1.95, 0.01, 16, 128]} />
          <meshBasicMaterial color="#00D9FF" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[0.35, 0, Math.PI / 5]}>
          <torusGeometry args={[2.18, 0.006, 16, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.28} />
        </mesh>
      </group>
    </Float>
  );
}

export function BatteryModel({
  compact = false,
  risk = 22,
  safetyGlow = false,
  pulseSpeed = 2.2,
}: BatteryModelProps) {
  const riskColor = risk > 70 ? "#fb7185" : risk > 42 ? "#facc15" : safetyGlow ? "#34d399" : "#00D9FF";

  return (
    <div className={compact ? "h-[300px] w-full" : "h-[430px] w-full lg:h-[540px]"}>
      <Canvas camera={{ position: [0, 0.25, 7], fov: 42 }} dpr={[1, 1.75]}>
        <ambientLight intensity={0.55} />
        <pointLight position={[4, 5, 4]} intensity={4.2} color={riskColor} />
        <pointLight position={[-4, -2, 3]} intensity={2.7} color="#7C3AED" />
        <BatteryCore compact={compact} risk={risk} safetyGlow={safetyGlow} pulseSpeed={pulseSpeed} />
        <Sparkles
          count={compact ? 34 : 58}
          scale={compact ? 4.2 : 5.8}
          size={2}
          speed={risk > 70 ? 0.75 : 0.35}
          color={riskColor}
        />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} />
      </Canvas>
    </div>
  );
}
