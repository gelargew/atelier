import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  TorusKnot,
  useTexture,
} from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import type { NextPage } from "next";
import {
  MutableRefObject,
  RefObject,
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import styles from "../styles/Home.module.css";
import { FigureMaterial } from "../shaders/figureMaterial";
import Head from "next/head";
import { Loader } from "../components/Loader";

const PERSPECTIVE = 800;

const DATAS = [
  {
    title: "loubei",
    imgURL: "/figures/lou.jpg",
    hoverURL: "/figures/bei.jpg",
  },
  {
    title: "berg",
    imgURL: "/figures/mountain1.jpg",
    hoverURL: "/figures/mountain2.jpg",
  },
  {
    title: "pilyukshin",
    imgURL: "/figures/pilyukshin.jpg",
    hoverURL: "/figures/pilyukshin-c.jpg",
  },
  {
    title: "power",
    imgURL: "/figures/warrior.jpg",
    hoverURL: "/figures/priestess.jpg",
  },
];

const Home: NextPage = () => {
  const imgRef = useRef<HTMLImageElement>(null!);
  const a = imgRef.current;
  const [pic, setPic] = useState(Math.floor(Math.random() * DATAS.length));

  const next = () => {
    if (pic + 1 >= DATAS.length) setPic(0);
    else setPic(pic + 1);
  };

  return (
    <div className="relative w-screen flex justify-center place-items-center">
      <Head>
        <title>atelier | sheda</title>
      </Head>
      <main className="relative w-full z-0 flex flex-col justify-center place-items-center ">
        <section className="w-full h-screen">
          <Canvas gl={{ alpha: true }}>
            <ambientLight />
            <Camera />
            <Suspense fallback={<Loader />}>
              <Figure
                imageURL={DATAS[pic].imgURL}
                hoverURL={DATAS[pic].hoverURL}
              />
            </Suspense>
          </Canvas>
        </section>
        {/* <section className="h-screen w-full">
          <Canvas gl={{ alpha: true }}>
            <ambientLight />
            <Camera />
            <Suspense fallback={null}>
              <Figure imageURL={DATAS[pic].imgURL} hoverURL={DATAS[pic].hoverURL} />
            </Suspense>
          </Canvas>
        </section> */}
        {/* <figure className="w-1/3">
          <img
            ref={imgRef}
            data-src="/lou.jpg"
            data-hover="/bei.jpg"
            width={400}
            height={300}
            className="w-full h-full object-cover object-center"
          />
        </figure> */}
        <button
          onClick={next}
          className="fixed z-20 text-xl bottom-10 right-40 px-10 py-1 bg-white"
        >
          NEXT &gt;&gt;
        </button>
      </main>
    </div>
  );
};

extend({ FigureMaterial });

const Figure = ({
  imageURL,
  hoverURL,
}: {
  imageURL: string;
  hoverURL: string;
}) => {
  const ref = useRef(null);
  const image = useTexture(imageURL);
  const hoverImage = useTexture(hoverURL);
  const { viewport, mouse } = useThree();
  const mouseVec = new THREE.Vector2(0, 0);
  const scale = useMemo<[x: number, y: number, z: number]>(() => {
    console.log(
      image.image.width / image.image.height,
      viewport.width / viewport.height
    );
    if (
      image.image.width / image.image.height >
      viewport.width / viewport.height
    )
      return [
        (viewport.height * image.image.width) / image.image.height,
        viewport.height,
        1,
      ];
    return [
      viewport.width,
      (viewport.width * image.image.height) / image.image.width,
      1,
    ];
  }, [viewport, imageURL]);

  useFrame((state, delta) => {
    ref.current.material.uniforms.uMouse.value =
      ref.current.material.uniforms.uMouse.value.lerp(mouse, 0.08);

    ref.current.material.uniforms.uTime.value += delta;
  });

  useLayoutEffect(() => {
    image.wrapS = THREE.RepeatWrapping;
    hoverImage.wrapS = THREE.RepeatWrapping;

    ref.current.material.uniforms.uRes.value = new THREE.Vector2(
      (image.image.height * viewport.width) / viewport.height,
      image.image.height
    );
  }, [viewport]);

  return (
    <Plane ref={ref} args={[1, 1, 1, 1]} position={[0, 0, 0]} scale={scale}>
      <figureMaterial
        uImage={image}
        uImageHover={hoverImage}
        dpr={viewport.dpr}
      />
    </Plane>
  );
};

// uImage: null,
// uImageHover: null,
// uMouse: [0, 0],
// uTime: 0,
// uRes: [800, 600],
// dpr: [16 / 9],

const Camera = () => {
  const { viewport } = useThree();

  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 0, PERSPECTIVE]}
      fov={(180 * (2 * Math.atan(viewport.height / 2 / PERSPECTIVE))) / Math.PI}
    />
  );
};

export default Home;
