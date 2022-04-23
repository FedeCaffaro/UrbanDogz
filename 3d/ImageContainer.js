import { Edges, useTexture } from "@react-three/drei";

const ImageContainer = ({ src = "NFTs/1.jpeg", ...props }) => {
  const texture = useTexture(src);
  return (
    <group {...props}>
      <mesh>
        <Edges />
        <planeGeometry attach="geometry" args={[10, 10]} />
        {texture && <meshBasicMaterial attach="material" map={texture} />}
      </mesh>
    </group>
  );
};

export default ImageContainer;
