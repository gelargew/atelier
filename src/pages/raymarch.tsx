import {
  Backdrop,
  Loader,
  MarchingCube,
  MarchingCubes,
  MarchingPlane,
  OrbitControls,
  Stage,
  TorusKnot,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useEffect, useRef } from "react";
import { Color, DoubleSide, Object3D } from "three";

export default function RaymarchPage() {
  return (
    <main>
      <div className="w-screen h-screen">
        <Canvas>
          <OrbitControls />
          <ambientLight />
          <Suspense fallback={<Loader />}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </main>
  );
}

const Scene = () => {
  const ref = useRef<Object3D>(null!);
  const ref2 = useRef<Object3D>(null!);
  useFrame((state) => {
    ref.current.position.z = 0.5 + Math.sin(state.clock.getElapsedTime()) / 3;
    ref2.current.position.z = 0.5 + state.mouse.y * 0.2;
  });
  useEffect(() => {
    console.log(ref.current);
  }, []);
  return (
    <Backdrop floor={20} receiveShadow>
      <Physics>
        <pointLight position={[0, 5, 0]} intensity={2} />
        <pointLight position={[0, -20, 0]} intensity={2} />
        <ambientLight intensity={2} />
        <MarchingCubes
          resolution={80}
          maxPolyCount={20000}
          enableUvs
          enableColors={true}
          scale={4}
        >
          <RigidBody>
            <MarchingCube
              ref={ref}
              position={[0.5, 0.5, 0]}
              strength={0.7}
              color={new Color("#f0f")}
            />
          </RigidBody>
          <RigidBody>
            <MarchingCube
              ref={ref2}
              position={[0.5, 0.5, 0]}
              strength={0.7}
              color={new Color("#f0f")}
            >
              <boxGeometry />
            </MarchingCube>
          </RigidBody>

          <MarchingPlane planeType="z" scale={10} />
          <meshPhongMaterial
            specular={0xffffff}
            shininess={1}
            vertexColors={true}
            side={DoubleSide}
          />
        </MarchingCubes>
      </Physics>
    </Backdrop>
  );
};
