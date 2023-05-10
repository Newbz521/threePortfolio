import React, { Component } from "react";
import { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree, PerspectiveCamera} from "@react-three/fiber"
import * as THREE from 'three'

  function PlatformOne({ middle }) {
    const [hovered, setHover] = useState(false)

    const mapRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const bottomRef = useRef(null);
    const leftZ =  middle - 7
    const midZ = middle
    const bottomZ = middle + 7
    const lightRef = useRef()
    const lightTwoRef = useRef()
    const lightThreeRef = useRef()
    const lightFourRef = useRef()
    const lightFiveRef = useRef()
    const targetRef = useRef()
    const targetTwoRef = useRef()
    const targetThreeRef = useRef()
    const targetFourRef = useRef()
    const targetFiveRef = useRef()
    const poleRef = useRef()
    const lightAngle = .8
    const lightHeight = 14
    let rise = 0;
    let risespeed = .005;

    useFrame(() => {
      rise += risespeed

      
      // leftRef.current.position.z = leftZ;
      // leftRef.current.position.y = 3.5;
      leftRef.current.receiveShadow = true;
      // leftRef.current.castShadow = true;
      
      
      rightRef.current.position.z = midZ;
      rightRef.current.position.y = 2;
      rightRef.current.receiveShadow = true;
      // rightRef.current.castShadow = true;

      mapRef.current.position.y = 1.5 * Math.sin(rise);

      
      bottomRef.current.position.z = bottomZ;
      bottomRef.current.position.y = 3.5;
      bottomRef.current.receiveShadow = true;
      // bottomRef.current.castShadow = true;

      targetRef.current.position.set(-30, lightHeight-1, midZ)
      lightRef.current.target = targetRef.current
      lightRef.current.angle = lightAngle

      targetTwoRef.current.position.set(-10, lightHeight-1, midZ)
      lightTwoRef.current.target = targetTwoRef.current
      lightTwoRef.current.angle = lightAngle

      targetThreeRef.current.position.set(10, lightHeight-1, midZ)
      lightThreeRef.current.target = targetThreeRef.current
      lightThreeRef.current.angle = lightAngle

      targetFourRef.current.position.set(30, lightHeight-1, midZ)
      lightFourRef.current.target = targetFourRef.current
      lightFourRef.current.angle = lightAngle
    })
    return (
      <mesh ref={mapRef}
      //   scale={hovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}
      // onPointerOver={() => setHover(true)}
      //   onPointerOut={() => setHover(false)}
      >
        <mesh ref={leftRef}  position={[0,3.5,leftZ]}>
          <boxGeometry args={[80, 1, 2]} />
          <meshStandardMaterial color="yellow" />
        </mesh>  
        <mesh ref={rightRef}>
          <boxGeometry args={[80, 4, 12]} smoothness={10} />
          <meshStandardMaterial color="#436fbd" envMapIntensity={.1} roughness={0} metalness={.1} />
        </mesh>
        <mesh ref={bottomRef}>
          <boxGeometry args={[80, 1, 2]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
        <spotLight castShadow ref={lightRef} position={[-30, lightHeight, midZ]} color={"yellow"} intensity={1} penumbra={1} />
        <mesh  ref={targetRef} position={[-30, lightHeight, midZ]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial  color="yellow" />
        </mesh>
        <mesh  position={[-30, lightHeight- .5, midZ]}>
          <cylinderGeometry args={[0.2, 1, 1]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh ref={poleRef} position={[-30, 8, midZ]}>
          <cylinderGeometry args={[.15, .35, 10]} />
          <meshStandardMaterial color="black" />
        </mesh>


        <spotLight castShadow ref={lightTwoRef} position={[-10, lightHeight, midZ]} color={"yellow"} intensity={1}  penumbra={1} />
        <mesh ref={targetTwoRef} position={[-10, lightHeight, midZ]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial color="yellow" />
        </mesh>
        <mesh  position={[-10, lightHeight- .5, midZ]}>
          <cylinderGeometry args={[0.2, 1, 1]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh ref={poleRef} position={[-10, 8, midZ]}>
          <cylinderGeometry args={[.15, .35, 10]} />
          <meshBasicMaterial color="black" />
        </mesh>


        <spotLight castShadow ref={lightThreeRef} position={[10, lightHeight, midZ]} color={"yellow"} intensity={1}  penumbra={1} />
        <mesh ref={targetThreeRef} position={[10, lightHeight, midZ]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial color="yellow" />
        </mesh>
        <mesh  position={[10, lightHeight- .5, midZ]}>
          <cylinderGeometry args={[0.2, 1, 1]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh ref={poleRef} position={[10, 8, midZ]}>
          <cylinderGeometry args={[.15, .35, 10]} />
          <meshBasicMaterial color="black" />
        </mesh>

        <spotLight castShadow ref={lightFourRef} position={[30, lightHeight, midZ]} color={"yellow"} intensity={1}  penumbra={1} />
        <mesh ref={targetFourRef} position={[30, lightHeight, midZ]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial color="yellow" />
        </mesh>
        <mesh  position={[30, lightHeight- .5, midZ]}>
          <cylinderGeometry args={[0.2, 1, 1]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh ref={poleRef} position={[30, 8, midZ]}>
          <cylinderGeometry args={[.15, .35, 10]} />
          <meshBasicMaterial color="black" />
        </mesh>
  
      </mesh>
    )
  }




export default PlatformOne;