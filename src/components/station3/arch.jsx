import { useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber"
import { useCursor, Cylinder, RoundedBox, Text3D, Text} from '@react-three/drei'
import * as THREE from 'three'
import { OrbitingMeshThree,OrbitingMeshFour } from "../station1/satelite";
import Propel from "../station1/propel";
import { act } from "react-dom/test-utils";
import Texter from "./texter.jsx"

export function Arch({position, rotation}) {
  // const loader = new THREE.TextureLoader();
  // const grassTexture = loader.load(Grass)
  

  const leftRef = useRef(null);
  const textRef= useRef(null)
  const domeRef = useRef(null);
  const platRef = useRef(null)
  const rightArmRef = useRef(null)
  const moveRef = useRef(null)
  const [zoom, setZoom] = useState(false)
  const [active, setActive] = useState(false)

  useCursor(active)
  
    useFrame(() => {
      
  

    })
  
  

  
  
  return (
      <mesh ref={moveRef} position={position}>
  
      <mesh scale={[1.1,1.1,.25]} rotation={[-Math.PI / 2, 0, 0]} position={[0,0,0]} >
          <sphereGeometry args={[20, 20,20, 0, Math.PI]} />
          <meshStandardMaterial color="green"side={THREE.DoubleSide} />
      </mesh>
      
      </mesh>
        
    )
  }