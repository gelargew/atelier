import { CameraShake, Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Particles from "../components/Particles";
import * as THREE from "three";
import Sparks from "../components/Sparkles";

export default function nfrpage() {
  return (
    <main className="text-slate-50 flex place-items-center flex-col fullscreenSections">
      <section className="h-screen flex place-items-center justify-center">
        <Canvas
          linear
          dpr={[1, 2]}
          camera={{ fov: 100, position: [0, 0, 30] }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color("#020207"));
          }}
        >
          <pointLight distance={100} intensity={40} color="white" />
          <fog attach="fog" args={["white", 50, 190]} />
          <CameraShake />
          <Suspense fallback={<Loader />}>
            <Particles />
            <Sparks
              count={20}
              colors={[
                "#A2CCB6",
                "#FCEEB5",
                "#EE786E",
                "#e0feff",
                "lightpink",
                "lightblue",
              ]}
            />
          </Suspense>
        </Canvas>
      </section>
    </main>
  );
}
