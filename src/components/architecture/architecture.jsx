import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
// import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import "./architecture.css";
import { Canvas, useFrame, useThree, PerspectiveCamera, useLoader } from "@react-three/fiber"
import { ObjectLoader } from "three";
import {MeshReflectorMaterial,OrbitControls, RoundedBox, useCursor, Text, Preload, Html, AdaptiveEvents, AdaptiveDpr, PerformanceMonitor, Hud, useProgress, Loader, Reflector} from '@react-three/drei'
import { Document } from "react-pdf";
import ThreeScene from "./Building";
import * as THREE from 'three'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import Capybara from "./Building";
import { MTLLoader, DDSLoader } from 'three-stdlib'
import EastElevation from "./EastElevation.jpg"
import WestElevation from "./WestElevation.jpg"
import NorthElevation from "./NorthElevation.jpg"
import SouthElevation from "./SouthElevation.jpg"
import GroundFloor from "./GroundFloor.jpg"
import ShortSection from "./ShortSection.jpg"
import ArchImage from "./Building";
import ScrollTo from "react-scroll-into-view";


function Architecture(props) {
  const [currentUser, setCurrentUser] = useState(null)
  const [navbar, setNavbar] = useState(true)
  const [initials, setInitials] = useState(null)
  const [nameArray, setNameArray] = useState([])
  const projects = [{background: "cover"}]
  const [dpr, setDpr] = useState(1.5)
  const [dov, setDov] = useState(75);
  const [image, setImage] = useState("");
  const [fade, setFade] = useState(.4);
  
 
  const WestRef = useRef();
  const EastRef = useRef();
  const NorthRef = useRef();
  const SouthRef = useRef();
  const GroundFloorRef = useRef();
  const ShortSectionRef = useRef();
  const pages =[{name: "east-elevation", pic: EastElevation, ref: EastRef },{name: "west-elevation", pic: WestElevation, ref: WestRef}, {name: "north-elevation", pic: NorthElevation, ref: NorthRef},{name: "south-elevation", pic: SouthElevation, ref: SouthRef}, {name: "ground-floorplan", pic: GroundFloor, ref: GroundFloorRef}, {name: "shortsection", pic: ShortSection, ref: ShortSectionRef}]

  function Model(props) {
    const materials = useLoader(MTLLoader, '/NewDesign8Mesh.mtl')
    materials.side = THREE.DoubleSide;
    const obj = useLoader(OBJLoader, '/NewDesign8Mesh.obj', (loader) => {
      materials.preload()
      loader.setMaterials(materials)
      
    })
    const leftRef = useRef(null);
  
    useFrame(() => {

      leftRef.current.position.z = -2;
      leftRef.current.position.y = -4;
      leftRef.current.receiveShadow = true;
      leftRef.current.rotation.x = -0.5 * Math.PI;
      leftRef.current.castShadow = true;
      leftRef.current.receiveShadow = true;
  
    })

    return (
      <mesh ref={leftRef} scale={[.05,.05,.05]} >

        <primitive  object={obj} >

        </primitive>
        <meshStandardMaterial  side={THREE.DoubleSide} attach="material" color={"red"} flatShading />

      </mesh>
    )
  }



  
  return (
    <div className="home-container">

      <div className='architecture-screen' style={{ fontSize: "40px"}}>
   
        <div className="Arch-container">
  
          {pages.map((data) => (<ArchImage img={data.pic} name={data.name} ref={data.ref} />))}
        </div>
        <div className="canvas-wrap">
          <div className="arch-title">
            Manufacturing Laboratory
            <div className="address">320 W Fordham Road, Bronx, NY</div>
            <div className="address">Mouse Controls</div>
            <div className="address">Left : Rotate</div>
            <div className="address">Middle : Zoom</div>
            <div className="address">Right : Rotate</div>
          </div>

      
       <Canvas shadows
        
        far={1000}
        dpr={dpr} 
        gl={{ localClippingEnabled: true, alpha: false }} 
        camera={{ position: [-35.0, 7, -35.0], fov: dov }}
        performance={{ min: .1 }}
        >
        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI * 0.5} minDistance={18} maxDistance={35}  makeDefault />

        <color attach="background" args={["rgb(201, 200, 210)"]}></color>
        {/* <ambientLight color="white" intensity={.075}></ambientLight> */}
          {/* <mesh>
            <boxGeometry args={[1,1,1]}></boxGeometry>
          </mesh> */}

          <mesh position={[0,5,0]} >
              <Html distanceFactor={35}>
              <ScrollTo selector={`#ground-floorplan`}>
            <div style={{zIndex:"1",display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", opacity: fade}}>
              <div  style={{ borderRadius: "50px",border: "2px solid blue", height: "25px", fontSize: "25px", justifyContent: "center", alignItems:"center", display: "flex", background: "blue", color: "white", cursor: "pointer"}}>Plan</div>
              <div style={{border: "1px solid blue", width: "0px", height: "20px"}}></div>
                  </div>
                  </ScrollTo>
            </Html>
            </mesh>
            
            <mesh position={[-10,6,-3]} >
              <Html distanceFactor={35}>
              <ScrollTo selector={`#shortsection`}>
            <div style={{zIndex:"1",display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", opacity: fade}}>
              <div  style={{ borderRadius: "50px",border: "2px solid blue", height: "25px", fontSize: "25px", justifyContent: "center", alignItems:"center", display: "flex", background: "blue", color: "white", cursor: "pointer"}}>Section</div>
              <div style={{border: "1px solid blue", width: "0px", height: "20px"}}></div>
                  </div>
                  </ScrollTo>
            </Html>
          </mesh>


          <mesh position={[18,1,-2]} >
              <Html distanceFactor={35}>
              <ScrollTo selector={`#south-elevation`}>
            <div style={{zIndex:"1",display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", opacity: fade}}>
              <div  style={{ borderRadius: "50px",border: "2px solid blue",width: "25px", height: "25px", fontSize: "25px", justifyContent: "center", alignItems:"center", display: "flex", background: "blue", color: "white", cursor: "pointer"}}>S</div>
              <div style={{border: "1px solid blue", width: "0px", height: "20px"}}></div>
                  </div>
                  </ScrollTo>
            </Html>
          </mesh>

          <mesh position={[-18,1,-2]}>
              <Html distanceFactor={35}>
                <ScrollTo selector={`#north-elevation`}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", opacity: fade}}>
              <div style={{ borderRadius: "50px",border: "2px solid blue",width: "25px", height: "25px", fontSize: "25px", justifyContent: "center", alignItems:"center", display: "flex", background: "blue", color: "white", cursor: "pointer"}}>N</div>
              <div style={{border: "1px solid blue", width: "0px", height: "20px"}}></div>
              </div>    
                </ScrollTo>
            </Html>
          </mesh>

          <mesh position={[0,1,5]}>
              <Html distanceFactor={35}>
              <ScrollTo selector={`#west-elevation`}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", opacity: fade}}>
              <div style={{ borderRadius: "50px",border: "2px solid blue",width: "25px", height: "25px", fontSize: "25px", justifyContent: "center", alignItems:"center", display: "flex", background: "blue", color: "white", cursor: "pointer"}}>W</div>
              <div style={{border: "1px solid blue", width: "0px", height: "20px"}}></div>
                  </div>
                  </ScrollTo>
            </Html>
          </mesh>

          <mesh position={[0,1,-9]}>
              <Html distanceFactor={35}>
              <ScrollTo selector={`#east-elevation`}>
              <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", opacity: fade, transition: ".5s"}}>
              <div style={{ borderRadius: "50px",border: "2px solid blue",width: "25px", height: "25px", fontSize: "25px", justifyContent: "center", alignItems:"center", display: "flex", background: "blue", color: "white", cursor: "pointer"}}>E</div>
              <div style={{border: "1px solid blue", width: "0px", height: "20px"}}></div>
                  </div>
                  </ScrollTo>
            </Html>
          </mesh>

          <Model />
          {/* <spotLight color="white" angle={.2} penumbra={.8} intensity={1} position={[-10,20,0]}></spotLight> */}
          {/* <spotLight angle={.4} penumbra={.8} intensity={.2} position={[0,50,0]}></spotLight> */}
          <spotLight color="rgb(110,175,250)" angle={.1} penumbra={.8} intensity={.4} position={[200,90,-150]}></spotLight>
          <spotLight angle={.1} penumbra={.8} intensity={.2} position={[200, 50, 0]}></spotLight>
          
          <spotLight color="white"  angle={.1} penumbra={.8} intensity={.8} position={[-250,20,70]}></spotLight>
          {/* <spotLight  color="rgb(110,175,250)" angle={.1} penumbra={.8} intensity={.4} position={[-200,40,70]}></spotLight> */}

          {/* <spotLight  angle={.1} penumbra={.8} intensity={.05} position={[0,20,250]}></spotLight>
          <spotLight  color="rgb(110,175,250)" angle={.1} penumbra={.8} intensity={.05} position={[0,20,300]}></spotLight> */}

          {/* <spotLight angle={.3} penumbra={.5} intensity={.5} position={[0,50,50]}></spotLight> */}
          <Preload all/>
      </Canvas>
      </div>
      </div>

  </div>

  )
}

export default Architecture