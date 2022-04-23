import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import css from "./Landing.module.css";
import Overlay from "3d/Overlay";
import ImageContainer from "3d/ImageContainer";
import AbsoluteContainer from "components/Positionals/AbsoluteContainer";
import Box from "3d/Box";
import Links from "components/Links";
import useEventListener from "@use-it/event-listener";
import { OpacityIn } from "animations/OpacityIn";

const ESCAPE_KEYS = ["27", "Escape"];

export default function LandingPage() {
  const cameraRef = useRef();
  const orbitRef = useRef();
  const [rotate, toggle] = useState(true);
  const [focused, setFocused] = useState(false);
  const [NFTInfo, setNFTInfo] = useState(null);

  const [scenePosition, setScenePosition] = useState([0, 0, 0]);
  const [position, setPosition] = useState([0, 0, 16]);
  const [rotation, setRotation] = useState([0, 0, 0]);

  function handleKeyDown({ key }) {
    if (ESCAPE_KEYS.includes(String(key))) {
      if (focused && !rotate) {
        setPosition((exPos) => [
          exPos[0],
          exPos[1],
          position[2] >= 0 ? 16 : -16,
        ]);
        setScenePosition([0, 0, 0]);
        setFocused(false);
        toggle(true);
        orbitRef.current.enablePan = true;
        orbitRef.current.enableRotate = true;
        setNFTInfo(null);
      }
    }
  }

  useEventListener("keydown", handleKeyDown);

  const handleFocus = (name, objPosition) => {
    console.log(name, objPosition);
    if (cameraRef.current) {
      cameraRef.current.enableDamping = false;
      toggle(false);
      setFocused(true);
      setPosition([
        objPosition[0],
        objPosition[1],
        objPosition[2] >= 0 ? 13 : -13,
      ]);
      setScenePosition([
        objPosition[2] >= 0 ? 15 : -15,
        0,
        objPosition[2] >= 0 ? 23 : -23,
      ]);
      orbitRef.current.enablePan = false;
      orbitRef.current.enableRotate = false;
      cameraRef.current.updateProjectionMatrix();

      handleExtendNFTInfo();
    }
  };

  const handleExtendNFTInfo = () => {
    //Should have metadata lookup or smth to populate NFT Properties and contents.
    setNFTInfo(`Nulla est non sint labore consequat sit ea. Velit magna occaecat quis ut irure nulla qui. 
    Sint velit elit voluptate elit id fugiat reprehenderit ullamco proident eu incididunt elit aliquip. 
    Ipsum laboris excepteur duis ullamco quis eu sit dolore aute esse laboris.`);
  };

  const prepareNFTsArray = (arrayOfImageSrcs, ...props) => {
    return arrayOfImageSrcs.map(({ name, src, position }) => {
      const imagePos = [0, 0.7, position[2] >= 0 ? 0.11 : -0.11];
      return (
        <Box
          value={name}
          position={position}
          onHoverIn={() => toggle(false)}
          onHoverOut={() => (!focused ? toggle(true) : null)}
          onFocus={handleFocus}
        >
          <ImageContainer
            position={imagePos}
            rotation-y={position[2] > 0 ? 0 : Math.PI}
            scale={0.4}
            src={src}
          />
        </Box>
      );
    });
  };

  return (
    <div className={css.bg}>
      <div className={css["bg-scene"]}>
        <Canvas dpr={[1.5, 2]} linear shadows>
          <Suspense fallback={<>Loading ...</>}>
            <group position={scenePosition}>
              <mesh>
                <directionalLight intensity={0.9} distance={10} />
                <fog attach="fog" args={["#272730", 16, 30]} intensity={0.4} />
                <ambientLight intensity={0.75} />
                <PerspectiveCamera
                  makeDefault
                  position={position}
                  fov={75}
                  ref={cameraRef}
                >
                  <pointLight intensity={1} position={[-10, -25, -10]} />
                  <pointLight intensity={1} position={[5, 5, 5]} />
                  <spotLight
                    castShadow
                    intensity={2.25}
                    angle={0.2}
                    penumbra={1}
                    position={[-25, 20, -15]}
                    shadow-mapSize={[1024, 1024]}
                    shadow-bias={-0.0001}
                  />
                  <spotLight
                    castShadow
                    distance={10}
                    intensity={2.25}
                    angle={0.2}
                    penumbra={1}
                    position={[0, 0, 8]}
                    shadow-mapSize={[1024, 1024]}
                    shadow-bias={-0.0001}
                  />
                </PerspectiveCamera>
                <OrbitControls
                  autoRotate={rotate}
                  enablePan={false}
                  enableZoom={false}
                  enableRotate={true}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 2}
                  ref={orbitRef}
                />
                <Stars radius={500} depth={50} count={1000} factor={10} />

                {prepareNFTsArray(
                  [
                    { name: "1", src: "NFTs/1.jpeg", position: [0, 0, 6] },
                    { name: "2", src: "NFTs/2.jpeg", position: [0, 0, -6] },
                  ],
                  handleFocus,
                  toggle
                )}
              </mesh>
            </group>
          </Suspense>
        </Canvas>
        <Overlay />
        <AbsoluteContainer className="top-8 right-16">
          <Links
            items={[
              { label: "TWITTER", url: "http://twitter.com/DONROUCH" },
              { label: "INSTAGRAM", url: "http://instagram.com/DONROUCH" },
              { label: "OPEN SEA", url: "http://OPENSEA.com/DONROUCH" },
            ]}
          />
        </AbsoluteContainer>
        {focused && (
          <AbsoluteContainer className="bottom-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="inline-block animate-pulse rounded-full p-2 bg-teal-400 font-iA text-cSilver text-md">
              Press 'ESC' to return.
            </span>
          </AbsoluteContainer>
        )}
        {NFTInfo && (
          <AbsoluteContainer className="top-1/4 left-1/4 transform -translate-x-1/2 w-1/3">
            <OpacityIn isActive={!!NFTInfo}>
              <div className="font-sketch text-2xl text-cWhite underline text-center whitespace-nowrap my-3">
                NFT: DON ROQUE
              </div>
              <span className="inline-block rounded-full p-2 bg-teal-400 font-iA text-cSilver text-md">
                NFT: {' "WILL DISPLAY NAME" '}
                NFT'S DESCRIPTION & PROPERTIES:
                {NFTInfo}
              </span>
              <div className="w-full flex justify-center mt-6">
              <button
                className="font-sketch border-2 border-cBlack bg-cMineShaft px-4 py-3 text-lg leading-4 shadow-md text-cWhite hover:brightness-150 mx-auto"
                onClick={() =>
                  console.warn("BIND MINT METHOD FROM CONTRACT FIRST")
                }
              >
                MINT
              </button>
              </div>
            </OpacityIn>
          </AbsoluteContainer>
        )}
      </div>
    </div>
  );
}
