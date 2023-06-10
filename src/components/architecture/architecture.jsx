import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
// import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import "./architecture.css";
import { Canvas, useFrame, useThree, PerspectiveCamera, useLoader } from "@react-three/fiber"
import { ObjectLoader } from "three";
import {OrbitControls} from '@react-three/drei'
import { Document } from "react-pdf";
import ThreeScene from "./Building";
import * as THREE from 'three'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import Capybara from "./Building";
import { MTLLoader, DDSLoader } from 'three-stdlib'



function Architecture(props) {
  const [currentUser, setCurrentUser] = useState(null)
  const [navbar, setNavbar] = useState(true)
  const [initials, setInitials] = useState(null)
  const [nameArray, setNameArray] = useState([])
  const projects = [{background: "cover"}]
  const [dpr, setDpr] = useState(1.5)
  const [dov, setDov] = useState(75);


  // THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader())

  function Model(props) {
    const materials = useLoader(MTLLoader, '/NewDesign8Mesh.mtl')
    materials.side = THREE.DoubleSide;
    const obj = useLoader(OBJLoader, '/NewDesign8Mesh.obj', (loader) => {
      materials.preload()
      loader.setMaterials(materials)
      
    })
    const leftRef = useRef(null);
    useFrame(() => {

      leftRef.current.position.z = 0;
      leftRef.current.position.y = 0;
      leftRef.current.receiveShadow = true;
      leftRef.current.rotation.x = -0.5 * Math.PI;
      leftRef.current.castShadow = true;
      leftRef.current.receiveShadow = true;
  
    })

    return (
      <mesh ref={leftRef} scale={[.05,.05,.05]} >

        <primitive  object={obj} ref={leftRef}>

        </primitive>
        <meshStandardMaterial  side={THREE.DoubleSide} attach="material" color={"red"} flatShading />

      </mesh>
    )
  }
  
  return (
    <div className="home-container">

      <div className='architecture-screen' style={{ fontSize: "40px"}}>
        {/* <h5>Coming Soon..</h5> */}
        {/* <div className="blur"></div> */}

        {/* {projects.map((data) => <div className="project-box" ><img src={Cover}></img></div>
        )} */}
       <Canvas shadows
        
        far={1000}
        dpr={dpr} 
        gl={{ localClippingEnabled: true, alpha: false }} 
        camera={{ position: [-35.0, 15, -20.0], fov: dov }}
        performance={{ min: .1 }}
        >
          <OrbitControls></OrbitControls>
        <color attach="background" args={["rgb(201, 200, 210)"]}></color>
        <ambientLight color="white" intensity={.075}></ambientLight>
          <mesh>
            <boxGeometry args={[1,1,1]}></boxGeometry>
          </mesh>
          <Model />
          {/* <spotLight color="white" angle={.2} penumbra={.8} intensity={1} position={[-10,20,0]}></spotLight> */}
          {/* <spotLight angle={.4} penumbra={.8} intensity={.2} position={[0,50,0]}></spotLight> */}
          <spotLight color="rgb(110,175,250)" angle={.1} penumbra={.8} intensity={.4} position={[200,90,-150]}></spotLight>
          <spotLight angle={.1} penumbra={.8} intensity={.2} position={[200, 50, 0]}></spotLight>
          
          <spotLight  angle={.1} penumbra={.8} intensity={.3} position={[-250,20,70]}></spotLight>
          <spotLight  color="rgb(110,175,250)" angle={.1} penumbra={.8} intensity={.4} position={[-200,40,70]}></spotLight>

          {/* <spotLight  angle={.1} penumbra={.8} intensity={.05} position={[0,20,250]}></spotLight>
          <spotLight  color="rgb(110,175,250)" angle={.1} penumbra={.8} intensity={.05} position={[0,20,300]}></spotLight> */}

          {/* <spotLight angle={.3} penumbra={.5} intensity={.5} position={[0,50,50]}></spotLight> */}
          {/* <Capybara/> */}
      </Canvas>

      </div>

  </div>

  )
}

export default Architecture