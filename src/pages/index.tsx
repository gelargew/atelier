import { OrbitControls, TorusKnot } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Canvas>

        <pointLight position={[20, 60, 10]} color='lightblue' />
      <group>
      <OrbitControls />
      <TorusKnot>
          <meshPhysicalMaterial color='brown' />
        </TorusKnot>
      </group>

      </Canvas>
    </div>
  )
}

export default Home
