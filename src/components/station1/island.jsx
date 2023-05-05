import {useState, useRef} from "react";

import { useFrame } from "@react-three/fiber"
import {useCursor} from '@react-three/drei'

import * as THREE from 'three'


function Island(props) {
    let rise = 0;
    let risespeed = .015;
    // const [hovered, setHover] = useState(false)
    // const loader = new THREE.TextureLoader();
    // const volumeRef = useRef(null);
    const leftRef = useRef(null);
    const domeRef = useRef(null);
  const platRef = useRef(null)
  const [zoom, setZoom] = useState(false)
  const [active, setActive] = useState(false)
  useCursor(active)
  



    useFrame(() => {
      rise += risespeed
      // leftRef.current.position.y = 0;
      leftRef.current.receiveShadow = true;
      // leftRef.current.castShadow = true;
      leftRef.current.position.y = 1.5 * Math.sin(rise) 
     
      // platRef.current.receiveShadow = true;
      platRef.current.castShadow = true;

      // domeRef.current.castShadow = true;
      // domeRef.current.receiveShadow = true;
    })
  
  

  
  
    return (
      <mesh ref={leftRef}>
 
      
        <mesh ref={platRef} position={[0,-1.5,0]} onClick={() => { if (!zoom) { props.setPreset(2) } else { props.setPreset(0) }; setZoom(!zoom) }} >
          <cylinderGeometry args={[48, 48, 3]} />
          <meshStandardMaterial color="darkgrey" />
        </mesh>
       
        <mesh  position={[0,-22,0]} onClick={() => { if (!zoom) { props.setPreset(2) } else { props.setPreset(0) }; setZoom(!zoom) }}>
          <cylinderGeometry args={[55, 5, 38]} />
          <meshStandardMaterial color="pink"  flatShading clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25}/>
        </mesh>
        <mesh ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,-3,0]} >
          <sphereGeometry args={[55, 20,20, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="blue" clearcoat={1} transparent opacity={.1} clearcoatRoughness={0} roughness={0} metalness={0.25}/>
        </mesh>
      </mesh>
    )
  }




export default Island;