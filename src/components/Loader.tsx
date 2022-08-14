import { Html, useProgress } from "@react-three/drei";

export const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center style={{ width: "40vw", height: "30px" }}>
      <h1 className="text-2xl font-bold">
        {Math.round(progress)}% loading . . .
      </h1>
    </Html>
  );
};
