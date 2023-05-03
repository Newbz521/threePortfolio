import React, { Component } from "react";
import { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree, PerspectiveCamera} from "@react-three/fiber"
import { Outline } from '@react-three/postprocessing'
import { BlendFunction, Resizer, KernelSize } from 'postprocessing'
import {PivotControls, MeshReflectorMaterial, orthographicCamera, OrthographicCamera, OrbitControls, RoundedBox, Environment, Plane, Sky} from '@react-three/drei'
import Cutter from '@r3f-cutter/r3f-cutter';
import { useCSG, Geometry, Base, Subtraction } from '@react-three/csg'
import PlatformOne from "./platform1";
import Island from "./island";
// import { useControls } from 'leva'
// import {Environment} from "./environment"

import * as THREE from 'three'
import "./station1.css"


const StationOne = (props) => {
  // const box = new THREE.BoxGeometry()
  let goal = 25
  
  function Subway({middle}) {

    const leftRef = useRef(null);
    const midZ = middle
    let opacityLevel = 0
    let step = 0;
    let speed = .001;
    useFrame(() => {
      step += speed
      leftRef.current.position.z = midZ;
      leftRef.current.position.y = 7;
      leftRef.current.receiveShadow = true;
      leftRef.current.castShadow = true;
      leftRef.current.transparent = true;
      leftRef.current.opacity = .1;
      leftRef.current.position.x = -30 * Math.sin(step) 

      // if (leftRef.current.position.x < 200) {
      //   leftRef.current.position.x += .5
      //   opacityLevel += .1
      // } else if (leftRef.current.position.x = 200) {
      //   leftRef.current.position.x = -200
      //   opacityLevel = 0;
      // }
     
    })
    return (
      <>
        <mesh ref={leftRef} >
        <RoundedBox args={[30, 12, 13]} radius={3}>
        <meshLambertMaterial attach="material" color={"lightgrey"}  />
      </RoundedBox>
        </mesh>

      </>
    )
  }
  function SubwayLeft({middle}) {

    const leftRef = useRef(null);
    const midZ = middle
    let step = 0;
    let speed = .001;
    useFrame(() => {
      step += speed
      leftRef.current.position.z = midZ;
      leftRef.current.position.y = 7;
      leftRef.current.receiveShadow = true;
      leftRef.current.castShadow = true;
      leftRef.current.position.x = 30 * Math.sin(step) 
      // if (leftRef.current.position.x > -200) {
      //   leftRef.current.position.x -= .5
      // } else if (leftRef.current.position.x = -200) {
      //   leftRef.current.position.x = 200
      // }
    })
    return (
      <>
        <mesh ref={leftRef}>
          <RoundedBox args={[30, 12, 13]} radius={3}>
        <meshLambertMaterial attach="material" color={"lightgrey"} />
      </RoundedBox>
        </mesh>

      </>
    )
  }

  return (
    <div className="canvasContainer">
      <Canvas shadows
        far={50}
        dpr={[1, 1.5]} 
        gl={{ localClippingEnabled: true, alpha: false }} 
        camera={{ position: [-150, 60, 150], fov: 30 }}>
        {/* <Sky sunPosition={[10, 10, 10]} distance={1000} /> */}
        <Environment
          background={true}
         files={'Ggenebrush_HDRI1.png'}
         path={'./sky'}
        />

        <directionalLight castShadow intensity={1} position={[20, 70, 20]} shadow-mapSize={[1024, 1024]}/>
        {/* <fog attach="fog" args={['#17171b', 500, 900]} />
        <color attach="background" args={['#17171b']} /> */}
        <ambientLight intensity={0.15} />
 
        {/* <Lights positions={0} /> */}
        {/* <Lights positions={30} /> */}
        <OrbitControls />
        {/* <gridHelper args={[100, 100, 'white', 'grey']} position-x={0}  /> */}

        <Subway middle={-30} />
    
        <SubwayLeft middle={30} />
        <PlatformOne middle={-15} />
        <PlatformOne middle={15} />
        <Island/>
    </Canvas>
    </div>
  );
}


export default StationOne;