import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

// Computers
const Computers = ({ isMobile, isTablet }) => {
  // Import scene
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    // Mesh
    <mesh className="border-2 border-red-900">
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.6 : isTablet ? 0.8 : 1.1}
        position={
          isMobile
            ? [-1, -0.7, -1.4]
            : isTablet
            ? [-2, -0.3, -1.8]
            : [0, -1.95, -1.7]
        }
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

// Computer Canvas
const ComputersCanvas = () => {
  // state to check mobile
  const [isMobile, setIsMobile] = useState(false);

  // state to check if device is a tablet
  const [isTablet, setIsTablet] = useState(false);

  // Check if device is Mobile
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    // handle screen size change
    const handleMediaQueryChange = (event) => {
      setIsMobile(event?.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Check if device is a tablet
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 768px) and (max-width: 1024px) and (min-height: 1024px) and (max-height: 1368px)"
    );
    setIsTablet(mediaQuery.matches);

    // handle screen size change
    const handleMediaQueryChange = (event) => {
      setIsTablet(event?.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      height={"50%"}
      width={"100%"}
    >
      {/* Canvas Loader show on fallback */}
      <Suspense fallback={<CanvasLoader />}>
        Ï
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        {/* Show Model */}
        <Computers isMobile={isMobile} isTablet={isTablet} />
      </Suspense>

      {/* Preload all */}
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
