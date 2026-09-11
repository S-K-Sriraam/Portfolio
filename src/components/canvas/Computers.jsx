import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Float } from "@react-three/drei";

import Loader from "../Loader";

function Computers({ isMobile }) {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh>
        <hemisphereLight intensity={1.5} groundColor="#000000" color="#915eff" />
        <ambientLight intensity={1.2} />
        <pointLight intensity={3.0} color="#915eff" position={[-3, 3, 3]} />
        <pointLight intensity={2.5} color="#00cea8" position={[3, 2, -2]} />
        <spotLight
          angle={0.4}
          castShadow
          intensity={3}
          penumbra={0.8}
          position={[10, 20, 10]}
          shadow-mapSize={1024}
        />
        <primitive 
          object={computer.scene} 
          scale={isMobile ? 0.62 : 0.72}
          position={isMobile ? [0, -2.8, -1.8] : [0, -3.25, -1.5]}
          rotation={[-0.01, -0.2, -0.1]}
        />
      </mesh>
    </Float>
  );
}

function ComputersCanvas() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 640px)").matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <Canvas
      className="cursor-grab active:cursor-grabbing w-full h-full"
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls
          makeDefault
          autoRotate
          autoRotateSpeed={0.8}
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

useGLTF.preload("./desktop_pc/scene.gltf");

export default ComputersCanvas;

