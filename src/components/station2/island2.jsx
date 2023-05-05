import { useState, useRef} from "react";
import {useFrame} from "@react-three/fiber"
import { useCursor} from '@react-three/drei'
import * as THREE from 'three'
import { OrbitingMeshThree,OrbitingMeshFour } from "../station1/satelite";


function IslandTwo(props) {
    let rise = 0;
    let risespeed = .015;
    const [hovered, setHover] = useState(false)
    const loader = new THREE.TextureLoader();
    const volumeRef = useRef(null);
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
 
      
        <mesh ref={platRef} position={[450,-51,0]} onClick={() => {  props.setPreset(7)}} >
          <cylinderGeometry args={[60, 60, 2]} />
          <meshStandardMaterial color="green" />
        </mesh>
       
        <mesh  position={[450,-68,0]} onClick={() => { props.setPreset(7) }} >
          <cylinderGeometry args={[70, 10, 30]} />
          <meshStandardMaterial color="lightgrey"  flatShading clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25}/>
        </mesh>
        <mesh ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[450,-53,0]} >
          <sphereGeometry args={[70, 20,20, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="blue" clearcoat={1} transparent opacity={.1} clearcoatRoughness={0} roughness={0} metalness={0.25}/>
        </mesh>
        <OrbitingMeshFour />
        <OrbitingMeshThree/>
      </mesh>
    )
  }




export default IslandTwo;