export function Model({ url, useGLTF }) {
    const { nodes } = useGLTF(url)
    return (
      <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -7, 0]} scale={7}>
        <group rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}>
          <mesh receiveShadow castShadow geometry={nodes.planet002.geometry} material={nodes.planet002.material} />
          <mesh geometry={nodes.planet003.geometry} material={nodes.planet003.material} />
        </group>
      </group>
    )
  }