import { useEffect, useState, useRef, Suspense } from "react";

import { Canvas, useFrame, useThree, PerspectiveCamera } from "@react-three/fiber"
import {Sky, useEnvironment, CubeCamera} from '@react-three/drei'

import * as THREE from 'three'
import GlassMaterial from "./glass";
import SkyHDR from "./sky/Ggenebrush_HDRI1.hdr"

function Island({ middle }) {
    let rise = 0;
    let risespeed = .015;
    const [hovered, setHover] = useState(false)
    const loader = new THREE.TextureLoader();
    const volumeRef = useRef(null);
    const leftRef = useRef(null);
    const domeRef = useRef(null);
  const platRef = useRef(null)
  



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
 
      
        <mesh ref={platRef} position={[0,-1.5,0]}>
          <cylinderGeometry args={[48, 48, 3]} />
          <meshStandardMaterial color="darkgrey" />
        </mesh>
       
        <mesh  position={[0,-28,0]}>
          <cylinderGeometry args={[55, 20, 50]} />
          <meshStandardMaterial color="rgb(194, 124, 74)"  flatShading/>
        </mesh>
        <mesh ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,-3,0]} >
          <sphereGeometry args={[55, 20,20, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="blue" clearcoat={1} transparent opacity={.1} clearcoatRoughness={0} roughness={0} metalness={0.25}/>
        </mesh>
      </mesh>
    )
  }




export default Island;