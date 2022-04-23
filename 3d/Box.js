
import { useRef, useState} from 'react'
import { useFrame } from 'react-three-fiber';
import { Edges } from '@react-three/drei'

export default function Box(props){
    const mesh = useRef();

    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame(() => {
      if(active){
        props.onFocus(props.value, props.position)
        setActive(false)
      }
    })


    return (
      <group {...props}>
        <mesh
          ref={mesh}
          scale={1}
          onClick={(event) => {
            setActive(!active)
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            props.onHoverIn()
            setHover(true);
          }}
          onPointerOut={(event) => {
            event.stopPropagation();
            props.onHoverOut()
            setHover(false);
          }}
        >
          <boxGeometry args={[5, 6, 0.1]} />
          <meshBasicMaterial color={hovered && !active ? "lightsalmon" : "white"} />
          <Edges />
        </mesh>
        {props.children && <>{props.children}</>}
      </group>
    );
  }