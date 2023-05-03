import React, { Component } from "react";
import { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree, PerspectiveCamera} from "@react-three/fiber"
import { Outline } from '@react-three/postprocessing'
import { BlendFunction, Resizer, KernelSize } from 'postprocessing'
import {PivotControls, MeshReflectorMaterial, orthographicCamera, OrthographicCamera, OrbitControls, RoundedBox, Environment, Plane} from '@react-three/drei'
import Cutter from '@r3f-cutter/r3f-cutter';
import { useCSG, Geometry, Base, Subtraction } from '@react-three/csg'
// import { useControls } from 'leva'
// import {Environment} from "./environment"

import * as THREE from 'three'
import "./station1.css"


const StationOne = (props) => {
  // const box = new THREE.BoxGeometry()
  let goal = 25
  let step = 0;
  let speed = .001;




  function BottomPlatform({middle}) {
    const volumeRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const bottomRef = useRef(null);
    const leftZ =  middle - 7
    const midZ = middle
    const bottomZ = middle + 7
    useFrame(() => {

      leftRef.current.position.z = leftZ;
      leftRef.current.position.y = 3.5;
      leftRef.current.receiveShadow = true;
      leftRef.current.castShadow = true;

      rightRef.current.position.z = midZ;
      rightRef.current.position.y = 2;
      rightRef.current.receiveShadow = true;
      rightRef.current.castShadow = true;

      bottomRef.current.position.z = bottomZ;
      bottomRef.current.position.y = 3.5;
      bottomRef.current.receiveShadow = true;
      bottomRef.current.castShadow = true;

    })
    return (
      <>
        <mesh ref={leftRef}>
          <boxGeometry args={[80, 1, 2]} />
          <meshLambertMaterial color="yellow"/>
        </mesh>
        <mesh ref={rightRef}>
          <boxGeometry args={[80, 4, 12]} />
          <plane attach="clippingPlanes-0" normal={[0, 0, 0]} constant={0} />
          <meshStandardMaterial color="grey" clipShadows />
        </mesh>
        <mesh ref={bottomRef}>
          <boxGeometry args={[80, 1, 2]} />
          <meshLambertMaterial color="yellow" />
        
        </mesh>
      </>
    )
  }

  const Lights = ({positions}) => {
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
    useFrame(() => {
      const position = lightRef.current.position
      targetRef.current.position.set(-30, lightHeight-1, positions)
      lightRef.current.target = targetRef.current
      lightRef.current.angle = lightAngle

      targetTwoRef.current.position.set(-10, lightHeight-1, positions)
      lightTwoRef.current.target = targetTwoRef.current
      lightTwoRef.current.angle = lightAngle

      targetThreeRef.current.position.set(10, lightHeight-1, positions)
      lightThreeRef.current.target = targetThreeRef.current
      lightThreeRef.current.angle = lightAngle

      targetFourRef.current.position.set(30, lightHeight-1, positions)
      lightFourRef.current.target = targetFourRef.current
      lightFourRef.current.angle = lightAngle

      // poleRef.current.receiveShadow = true;
      // poleRef.current.castShadow = true;
     
      // targetFiveRef.current.position.set(0, lightHeight-1, positions)
      // lightFiveRef.current.target = targetFiveRef.current
      // lightFiveRef.current.angle = lightAngle
      
    })
  
    return (
      <>
        <spotLight castShadow ref={lightRef} position={[-30, lightHeight, positions]} color={0xffffff} intensity={1}  penumbra={1} />
        <mesh  ref={targetRef} position={[-30, lightHeight, positions]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial  color="white" />
        </mesh>
        <mesh  position={[-30, lightHeight- .5, positions]}>
          <cylinderGeometry args={[0.2, 1, 1]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh ref={poleRef} position={[-30, 8, positions]}>
          <cylinderGeometry args={[.15, .35, 10]} />
          <meshStandardMaterial color="black" />
        </mesh>


        <spotLight castShadow ref={lightTwoRef} position={[-10, lightHeight, positions]} color={0xffffff} intensity={1}  penumbra={1} />
        <mesh ref={targetTwoRef} position={[-10, lightHeight, positions]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh  position={[-10, lightHeight- .5, positions]}>
          <cylinderGeometry args={[0.2, 1, 1]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh ref={poleRef} position={[-10, 8, positions]}>
          <cylinderGeometry args={[.15, .35, 10]} />
          <meshBasicMaterial color="black" />
        </mesh>


        <spotLight castShadow ref={lightThreeRef} position={[10, lightHeight, positions]} color={0xffffff} intensity={1}  penumbra={1} />
        <mesh ref={targetThreeRef} position={[10, lightHeight, positions]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh  position={[10, lightHeight- .5, positions]}>
          <cylinderGeometry args={[0.2, 1, 1]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh ref={poleRef} position={[10, 8, positions]}>
          <cylinderGeometry args={[.15, .35, 10]} />
          <meshBasicMaterial color="black" />
        </mesh>

        <spotLight castShadow ref={lightFourRef} position={[30, lightHeight, positions]} color={0xffffff} intensity={1}  penumbra={1} />
        <mesh ref={targetFourRef} position={[30, lightHeight, positions]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh  position={[30, lightHeight- .5, positions]}>
          <cylinderGeometry args={[0.2, 1, 1]} />
          <meshBasicMaterial color="black" />
        </mesh>
        <mesh ref={poleRef} position={[30, 8, positions]}>
          <cylinderGeometry args={[.15, .35, 10]} />
          <meshBasicMaterial color="black" />
        </mesh>
  
      </>
    )
  }

  function Subway({middle}) {

    const leftRef = useRef(null);
    const midZ = middle
    let opacityLevel = 0
    useFrame(() => {
      step += speed
      leftRef.current.position.z = midZ;
      leftRef.current.position.y = 7;
      leftRef.current.receiveShadow = true;
      leftRef.current.castShadow = true;
      leftRef.current.transparent = true;
      leftRef.current.opacity = .1;
      // leftRef.current.position.x = -30 * Math.sin(step) 

      if (leftRef.current.position.x < 200) {
        leftRef.current.position.x += .5
        opacityLevel += .1
      } else if (leftRef.current.position.x = 200) {
        leftRef.current.position.x = -200
        opacityLevel = 0;
      }
     
    })
    return (
      <>
        <mesh ref={leftRef}>
        <RoundedBox args={[30, 12, 13]} radius={3}>
        <meshLambertMaterial attach="material" color={"lightgrey"} transparent opacity={.9}  />
      </RoundedBox>
        </mesh>

      </>
    )
  }
  function SubwayLeft({middle}) {

    const leftRef = useRef(null);
    const midZ = middle
    
    useFrame(() => {
      step += speed
      leftRef.current.position.z = midZ;
      leftRef.current.position.y = 7;
      leftRef.current.receiveShadow = true;
      leftRef.current.castShadow = true;
      // leftRef.current.position.x = 30 * Math.sin(step) 
      if (leftRef.current.position.x > -200) {
        leftRef.current.position.x -= .5
      } else if (leftRef.current.position.x = -200) {
        leftRef.current.position.x = 200
      }
    })
    return (
      <>
        <mesh ref={leftRef}>
          <RoundedBox args={[30, 12, 13]} radius={3}>
        <meshLambertMaterial attach="material" color={"lightgrey"} opacity={0.9} transparent />
      </RoundedBox>
        </mesh>

      </>
    )
  }

  function Reflect() {
    const planeRef = useRef()
    useFrame(() => {
      
    })
    return (
      <mesh ref={planeRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]}/>
      {/* <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={15}
        depthScale={1}
        minDepthThreshold={0.85}
        color="#151515"
        metalness={0.6}
        roughness={1}
        /> */}
      <meshBasicMaterial/>
    </mesh>
    )
}

  return (
    <div className="canvasContainer">
      <Canvas shadows
        far={50}
        dpr={[1, 1.5]} 
        gl={{ localClippingEnabled: true, alpha: false }} 
      
        camera={{ position: [-90, 70, 130], fov: 30 }}>
    <directionalLight castShadow intensity={1} position={[20, 70, 20]} shadow-mapSize={[1024, 1024]}/>
    {/* <color attach="background" args={['lightpink']} /> */}

        <fog attach="fog" args={['#17171b', 500, 900]} />
        <color attach="background" args={['#17171b']} />
        <ambientLight intensity={0.15} />
 


        <Lights positions={-30} />
        <Lights positions={0} />
        <Lights positions={30} />
  <OrbitControls />
  <gridHelper args={[100, 100, 'white', 'grey']} position-x={0}  />

        <Subway middle={-15} />
        <Subway middle={45} />
        <SubwayLeft middle={15} />
        <SubwayLeft middle={-45}/>
        <BottomPlatform middle={-30}/>
        <BottomPlatform middle={0} />
        <BottomPlatform middle={30}/>
{/* <Reflect/> */}
    </Canvas>
    </div>
  );
}


export default StationOne;