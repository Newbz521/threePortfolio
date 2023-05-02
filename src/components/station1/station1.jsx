import React, { Component } from "react";
import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree, PerspectiveCamera} from "@react-three/fiber"
import { Outline } from '@react-three/postprocessing'
import { BlendFunction, Resizer, KernelSize } from 'postprocessing'
import {MeshReflectorMaterial, orthographicCamera, OrthographicCamera, OrbitControls, RoundedBox} from '@react-three/drei'
import Cutter from '@r3f-cutter/r3f-cutter';




import "./station1.css"
import { AmbientLight } from "three";

const StationOne = (props) => {
  let goal = 25

 
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
          <meshLambertMaterial color="white" clipShadows />
        </mesh>
        <mesh ref={bottomRef}>
          <boxGeometry args={[80, 1, 2]} />
          <meshLambertMaterial color="yellow" />
        </mesh>
      </>
    )
  }

  function Subway({middle}) {

    const leftRef = useRef(null);
    const midZ = middle
    let opacityLevel = 0
    useFrame(() => {
      // step += speed
      leftRef.current.position.z = midZ;
      leftRef.current.position.y = 6.5;
      leftRef.current.receiveShadow = true;
      leftRef.current.castShadow = true;
      leftRef.current.transparent = true;
      leftRef.current.opacity = .1;
      

      if (leftRef.current.position.x < 100) {
        leftRef.current.position.x += .5
        opacityLevel += .1
      } else if (leftRef.current.position.x = 100) {
        leftRef.current.position.x = -100
        opacityLevel = 0;
      }
     
    })
    return (
      <>
        <mesh ref={leftRef}>
        <RoundedBox args={[30, 12, 13]} radius={3}>
        <meshLambertMaterial attach="material" color={"lightgrey"} transparent opacity={.5}  />
      </RoundedBox>
        </mesh>

      </>
    )
  }
  function SubwayLeft({middle}) {

    const leftRef = useRef(null);
    const midZ = middle
    
    useFrame(() => {
      // step += speed
      leftRef.current.position.z = midZ;
      leftRef.current.position.y = 6.5;
      leftRef.current.receiveShadow = true;
      leftRef.current.castShadow = true;
      

      if (leftRef.current.position.x > -100) {
        leftRef.current.position.x -= .5
      } else if (leftRef.current.position.x = -100) {
        leftRef.current.position.x = 100
      }
     
    })
    return (
      <>
        <mesh ref={leftRef}>
          <RoundedBox args={[30, 12, 13]} radius={3}>

        <meshLambertMaterial attach="material" color={"lightgrey"} opacity={0.6} transparent />
      </RoundedBox>
        </mesh>

      </>
    )
  }

  function Plane() {
    const meshRef = useRef(null);

    useFrame(() => {
      if (!meshRef.current) {
        return;
      }
      meshRef.current.rotation.x = -0.5 * Math.PI;
      meshRef.current.position.y = .5;
      // meshRef.current.position.x = 10;
      // meshRef.current.position.z = 3;
      meshRef.current.receiveShadow = true;
      meshRef.current.castShadow = true;
      meshRef.current.wireFrame = true;
    })
    return (
      <mesh ref={meshRef}>
        {/* <planeBufferGeometry attach="geometry" args={[20, 40]} /> */}
        <gridHelper args={[14, 7, 'white', 'white']} position-x={24} rotation-x={-0.5 * Math.PI} />
        <gridHelper args={[14, 7, 'white', 'white']} position-x={12} rotation-x={-0.5 * Math.PI} />
        <gridHelper args={[14, 7, 'white', 'white']} position-x={0} rotation-x={-0.5 * Math.PI} />
        <gridHelper args={[14, 7, 'white', 'white']} position-x={-12} rotation-x={-0.5 * Math.PI} />

      </mesh>
    )
}

  return (
    <div className="canvasContainer">
      <Canvas shadows
        gl={{ localClippingEnabled: true }}
        camera={{ position: [-90, 70, 130], fov: 30 }}
        // orthographic camera={{ zoom: 10, position: [-60, 60, 70] }}
        // orthographic camera={{ zoom: 50, position: [0, 0, 100] }} 
      >
        <pointLight position={[10, 10, 10]} />
    <directionalLight intensity={1} />
              {/* <pointLight intensity={1} position={[500, 500, 1000]} /> */}
  <OrbitControls />
  <gridHelper args={[100, 100, 'white', 'grey']} position-x={0}  />
      {/* <fog attach="fog" args={['white', 120, 100]} /> */}
      <color attach="background"  args={['white']} />
        <ambientLight intensity={0.25} />
        <Subway middle={-15} />
        <Subway middle={45} />
        <SubwayLeft middle={15} />
        <SubwayLeft middle={-45}/>
        <BottomPlatform middle={-30}/>
        <BottomPlatform middle={0} />
        <BottomPlatform middle={30}/>

        <Plane/>
        <Cutter >
  {/* <mesh position={[0, 0.5, 0]}>
    <boxGeometry />
    <meshLambertMaterial color="orange" />
  </mesh> */}
</Cutter>
    </Canvas>
    </div>
  );
}


export default StationOne;