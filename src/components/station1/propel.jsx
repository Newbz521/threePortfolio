import {
 
  Sky
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
// import { useControls } from "leva";
import { ReactNode, useRef, useState, useEffect } from "react";
// import { Group } from "three";


function Propel({location}) {
  const propelRef = useRef(null);


  useFrame(() => {
   propelRef.current.rotation.y -= 0.01

})
  return (
    <mesh ref={propelRef} position={location}>
          <mesh position={[15,0,0]} rotation={[-Math.PI / 4,0,0]}>
            <boxGeometry args={[30, 1, 5]} castShadow receiveShadow/>
            <meshNormalMaterial color="black" castShadow receiveShadow/>
      </mesh>
      <mesh position={[-15,0,0]} rotation={[Math.PI / 4,0,0]}>
            <boxGeometry args={[30, 1, 5]} castShadow receiveShadow/>
            <meshNormalMaterial color="black" castShadow receiveShadow/>
      </mesh>
          <mesh position={[0,0,-15]}  rotation={[0,0,Math.PI / 4]}>
            <boxGeometry args={[5, 1, 30]} castShadow receiveShadow/>
            <meshNormalMaterial color="black" castShadow receiveShadow/>
      </mesh>
      <mesh position={[0,0,15]}  rotation={[0,0,-Math.PI / 4]}>
            <boxGeometry args={[5, 1, 30]} castShadow receiveShadow/>
            <meshNormalMaterial color="black" castShadow receiveShadow/>
          </mesh>
          <mesh >
            <cylinderGeometry args={[5, 5, 5]} castShadow receiveShadow/>
            <meshNormalMaterial color="black" castShadow receiveShadow />
          </mesh>

        </mesh>
  );
}


export default Propel;

