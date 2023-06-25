import * as THREE from 'three'
import { forwardRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CubeCamera, MeshReflectorMaterial } from '@react-three/drei'
import { EffectComposer, GodRays, Bloom } from '@react-three/postprocessing'
import { easing } from 'maath'
import { EventEmitter } from 'stream'

export default function App() {
  return (
    <main className='w-screen h-screen' >


    <Canvas camera={{ position: [5, 0, 18], fov: 35, near: 1, far: 60 }} gl={{ antialias: false }}>
      <color attach="background" args={['#050505']} />
      <ambientLight />
      {/** The screen uses postpro godrays */}
      <Screen />
      {/** The sphere reflects the screen with a cube-cam */}
      <CubeCamera position={[-5, -3, -5]} resolution={256} frames={Infinity}>
        {(texture) => (
          <mesh>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color="#999" metalness={1} roughness={0.15} envMap={texture} />
          </mesh>
        )}
      </CubeCamera>
      {/** The floor uses drei/MeshReflectorMaterial */}
      <Floor />
      <Rig />
    </Canvas>
    </main>
  )
}

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [5 + state.pointer.x, 0 + +state.pointer.y, 18 + Math.atan2(state.pointer.x, state.pointer.y) * 2], 0.4, delta)
  })
}

function Floor() {
  return (
    <mesh position={[0, -5.02, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[300, 50]}
        resolution={1024}
        mixBlur={1}
        mixStrength={100}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#202020"
        metalness={0.8}
      />
    </mesh>
  )
}

const Emitter = forwardRef((props, forwardRef) => {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/caterpillar.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
  useEffect(() => void video.play(), [video])
  return (
    <mesh ref={forwardRef} position={[0, 0, -16]} {...props}>
      <planeGeometry args={[16, 10]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} colorSpace={THREE.SRGBColorSpace} />
      </meshBasicMaterial>
      <mesh scale={[16.05, 10.05, 1]} position={[0, 0, -0.01]}>
        <planeGeometry />
        <meshBasicMaterial color="black" />
      </mesh>
    </mesh>
  )
})

Emitter.displayName = 'emitter'

function Screen() {
  const [material, set] = useState()
  return (
    <>
      <Emitter ref={set} />
      {material && (
        <EffectComposer disableNormalPass multisampling={8}>
          <GodRays sun={material} exposure={0.34} decay={0.7} blur />
          <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={1} />
        </EffectComposer>
      )}
    </>
  )
}
