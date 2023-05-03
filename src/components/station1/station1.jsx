import React, { Component } from "react";
import { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree, PerspectiveCamera} from "@react-three/fiber"
import { Outline } from '@react-three/postprocessing'
import { BlendFunction, Resizer, KernelSize } from 'postprocessing'
import {PivotControls, MeshReflectorMaterial, orthographicCamera, OrthographicCamera, OrbitControls, RoundedBox, Environment, Plane, Sky,Stage} from '@react-three/drei'
import Cutter from '@r3f-cutter/r3f-cutter';
import { useCSG, Geometry, Base, Subtraction } from '@react-three/csg'
import PlatformOne from "./platform1";
import DayScene from "./environment";
import { OrbitingMesh , OrbitingMeshTwo} from "./satelite";


import Island from "./island";
import * as THREE from 'three'
import "./station1.css"


const StationOne = (props) => {
  const [toggler, setToggler] = useState(false);
  
  function Subway({middle}) {
    let step = 0;
    let speed = .005;

    let rise = 0;
    let risespeed = .015;
    const subRef = useRef(null)
    const leftRef = useRef(null);
    const midZ = middle
    let opacityLevel = 0
    useFrame(() => {
      step += speed
      rise += risespeed
      leftRef.current.position.z = midZ;
      leftRef.current.position.y = 7;
      leftRef.current.receiveShadow = true;
      leftRef.current.castShadow = true;
      leftRef.current.transparent = true;
      leftRef.current.opacity = .1;
      leftRef.current.position.x = -20 * Math.sin(step) 

      subRef.current.position.y = 1.5 * Math.sin(rise);
      // if (leftRef.current.position.x < 200) {
      //   leftRef.current.position.x += .5
      //   opacityLevel += .1
      // } else if (leftRef.current.position.x = 200) {
      //   leftRef.current.position.x = -200
      //   opacityLevel = 0;
      // }
     
    })
    return (
      <mesh ref={subRef}>
        <mesh ref={leftRef} >
        <RoundedBox args={[30, 12, 13]} radius={3}>
        <meshLambertMaterial attach="material" color={"lightgrey"} flatShading />
      </RoundedBox>
        </mesh>

      </mesh>
    )
  }
  function SubwayLeft({middle}) {

    const leftRef = useRef(null);
    const midZ = middle
    let step = 0;
    let speed = .005;
    let rise = 0;
    let risespeed = .015;
    const subRef = useRef(null)
    useFrame(() => {
      step += speed
      rise += risespeed
      leftRef.current.position.z = midZ;
      leftRef.current.position.y = 7;
      leftRef.current.receiveShadow = true;
      leftRef.current.castShadow = true;
      leftRef.current.position.x = 20 * Math.sin(step) 

      subRef.current.position.y = 1.5 * Math.sin(rise);
      subRef.current.castShadow = true;
      // if (leftRef.current.position.x > -200) {
      //   leftRef.current.position.x -= .5
      // } else if (leftRef.current.position.x = -200) {
      //   leftRef.current.position.x = 200
      // }
    })
    return (
      <mesh ref={subRef}>
        <mesh ref={leftRef}>
          <RoundedBox args={[30, 12, 13]} radius={3}>
        <meshLambertMaterial attach="material" color={"lightgrey"}  />
      </RoundedBox>
        </mesh>

      </mesh>
    )
  }
  function handleShow(e) {
    e.preventDefault()
    setToggler((prevCheck) => !prevCheck);
  }
  return (
    <div className="canvasContainer">
      <Canvas shadows
        far={50}
        dpr={[1, 1.5]} 
        gl={{ localClippingEnabled: true, alpha: false }} 
        camera={{ position: [-90, 30, 90], fov: 75 }}>
       
        <OrbitControls />
        {/* <gridHelper args={[100, 100, 'white', 'grey']} position-x={0}  /> */}
        <Subway middle={-30} />
        <SubwayLeft middle={30} />
        <PlatformOne middle={-15} />
        <PlatformOne middle={15} />
        <Island/>
        <DayScene />
        <OrbitingMesh />
        <OrbitingMeshTwo/>
    </Canvas>
    </div>
  );
}


export default StationOne;