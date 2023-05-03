import { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree, PerspectiveCamera} from "@react-three/fiber"
import * as THREE from 'three'
import GlassMaterial from "./glass";

  function Island({ middle }) {
    const [hovered, setHover] = useState(false)

    const volumeRef = useRef(null);
    const leftRef = useRef(null);
    const domeRef = useRef(null);
    useFrame(() => {

      // leftRef.current.position.y = 0;
      leftRef.current.receiveShadow = true;
      leftRef.current.castShadow = true;
     
    })
    return (
      <mesh ref={leftRef}>
      
        <mesh  position={[0,-1.5,0]}>
          <cylinderGeometry args={[48, 48, 3]} />
          <meshStandardMaterial color="blue" />
        </mesh>
       
        <mesh  position={[0,-18,0]}>
          <cylinderGeometry args={[55, 5, 30]} />
          <meshNormalMaterial color="purple" flatShading/>
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0,-3,0]} >
          <sphereGeometry args={[55,50,50,0,Math.PI]} />
          <meshPhysicalMaterial side={THREE.DoubleSide} color="blue" flatShading opacity={.1} transparent/>
        </mesh>
      </mesh>
    )
  }




export default Island;