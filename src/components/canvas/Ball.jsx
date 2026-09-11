import { Decal, Float, OrbitControls, useTexture } from "@react-three/drei";

const Ball = ({ icon }) => {
  const [decal] = useTexture([icon]);

  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[0, 0, 0.05]} intensity={1.6} />
      <directionalLight position={[3, 3, 5]} intensity={1.2} />
      <directionalLight position={[-3, -3, -5]} intensity={0.8} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2.0}
        makeDefault
      />
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh castShadow receiveShadow scale={2.75}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial 
            color="#ffffff"
            roughness={0.4}
            metalness={0.05}
            polygonOffset
            polygonOffsetFactor={-5} 
            flatShading 
          />
          <Decal 
            position={[0, 0, 1.02]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={1.1}
            flatShading 
            map={decal}
          />
          <Decal 
            position={[0, 0, -1.02]}
            rotation={[0, Math.PI, 0]}
            scale={1.1}
            flatShading 
            map={decal}
          />
        </mesh>
      </Float>
    </>
  );
};

export default Ball;

