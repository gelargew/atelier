/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: germydan (https://sketchfab.com/germydan)
license: CC-BY-NC-ND-4.0 (http://creativecommons.org/licenses/by-nc-nd/4.0/)
source: https://sketchfab.com/3d-models/smartphone-51659a712290405e83256fe3f6284648
title: Smartphone
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh
  }
  materials: {
    wire_154215229: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/smartphone-transformed.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[-29.51, 60.53, -28.72]}>
          <mesh geometry={nodes.Object_2.geometry} material={materials.wire_154215229} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/smartphone-transformed.glb')
