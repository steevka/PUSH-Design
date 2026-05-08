"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { DisplacedPlate } from "./displaced-plate";

interface HeroCanvasProps {
  src: string;
  video?: boolean;
}

export function HeroCanvas({ src, video }: HeroCanvasProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: false }}
      camera={{ position: [0, 0, 1], fov: 50, near: 0.1, far: 10 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#050505"]} />
      <Suspense fallback={null}>
        <DisplacedPlate src={src} video={video} intensity={1} />
      </Suspense>
    </Canvas>
  );
}
