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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFilter, setModalFilter] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  
 
  const WestRef = useRef();
  const EastRef = useRef();
  const NorthRef = useRef();
  const SouthRef = useRef();
  const GroundFloorRef = useRef();
  const ShortSectionRef = useRef();
  const pages =[{name: "east-elevation", pic: EastElevation, ref: EastRef },{name: "west-elevation", pic: WestElevation, ref: WestRef}, {name: "north-elevation", pic: NorthElevation, ref: NorthRef},{name: "south-elevation", pic: SouthElevation, ref: SouthRef}, {name: "ground-floorplan", pic: GroundFloor, ref: GroundFloorRef}, {name: "shortsection", pic: ShortSection, ref: ShortSectionRef}]

  // Check WebGL support
  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          setWebGLSupported(false);
          return;
        }
        
        // Check for basic WebGL capabilities
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          // Check if it's a software renderer
          if (renderer && (renderer.includes('SwiftShader') || renderer.includes('Software') || renderer.includes('llvmpipe'))) {
            setWebGLSupported(false);
            return;
          }
        }
        
        setWebGLSupported(true);
      } catch (e) {
        setWebGLSupported(false);
      }
    };
    
    checkWebGL();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 600);
      // Reduce DPR on mobile for better performance
      if (window.innerWidth <= 600) {
        setDpr(0.8);
      } else {
        setDpr(1.5);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // WebGL Fallback Component
  const WebGLFallback = () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1a1a1a',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Graphics Upgrade Required</h1>
      <p style={{ fontSize: '1.1rem', maxWidth: '500px', lineHeight: '1.5' }}>
        Your device doesn't support the required graphics capabilities for this 3D architecture experience. 
        Please enable hardware acceleration in your browser settings or upgrade your graphics drivers.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>How to enable hardware acceleration:</h3>
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
          <li>Chrome: Settings → Advanced → System → Use hardware acceleration</li>
          <li>Firefox: about:config → layers.acceleration.force-enabled → true</li>
          <li>Edge: Settings → System and performance → Use hardware acceleration</li>
        </ul>
      </div>
    </div>
  );

  // Return fallback if WebGL is not supported
  if (!webGLSupported) {
    return <WebGLFallback />;
  }

  return (
    <div className="home-container">
      <div className='architecture-screen' style={{ fontSize: "40px"}}>
        {/* Modal and Backdrop */}
        <div className={`arch-modal-backdrop${modalOpen ? " open" : ""}`} onClick={() => setModalOpen(false)} />
        <div className={`Arch-container${modalOpen ? " modal-open" : ""}`}>
          {pages
            .filter(data => data.name.includes(modalFilter))
            .map(data => (
              <ArchImage key={data.name} img={data.pic} name={data.name} ref={data.ref} />
            ))}
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

          <Canvas
            shadows
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
                <div style={{zIndex:"1",display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", opacity: fade}}>
                  <div  style={{ borderRadius: "50px",border: "2px solid blue", height: "25px", fontSize: "25px", justifyContent: "center", alignItems:"center", display: "flex", background: "blue", color: "white", cursor: "pointer"}}
                    onClick={() => { setModalFilter("ground-floorplan"); setModalOpen(true); }}
                  >Plan</div>
                  <div style={{border: "1px solid blue", width: "0px", height: "20px"}}></div>
                    </div>
                    </Html>
              </mesh>
              
              <mesh position={[-10,6,-3]} >
                <Html distanceFactor={35}>
                <div style={{zIndex:"1",display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", opacity: fade}}>
                  <div  style={{ borderRadius: "50px",border: "2px solid blue", height: "25px", fontSize: "25px", justifyContent: "center", alignItems:"center", display: "flex", background: "blue", color: "white", cursor: "pointer"}}
                    onClick={() => { setModalFilter("shortsection"); setModalOpen(true); }}
                  >Section</div>
                  <div style={{border: "1px solid blue", width: "0px", height: "20px"}}></div>
                    </div>
                    </Html>
                </mesh>


              <mesh position={[18,1,-2]} >
                  <Html distanceFactor={35}>
                  <div style={{zIndex:"1",display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", opacity: fade}}>
                    <div  style={{ borderRadius: "50px",border: "2px solid blue",width: "25px", height: "25px", fontSize: "25px", justifyContent: "center", alignItems:"center", display: "flex", background: "blue", color: "white", cursor: "pointer"}}
                      onClick={() => { setModalFilter("south-elevation"); setModalOpen(true); }}
                    >S</div>
                    <div style={{border: "1px solid blue", width: "0px", height: "20px"}}></div>
                      </div>
                      </Html>
                </mesh>

              <mesh position={[-18,1,-2]}>
                <Html distanceFactor={35}>
                  <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", opacity: fade}}>
                    <div style={{ borderRadius: "50px",border: "2px solid blue",width: "25px", height: "25px", fontSize: "25px", justifyContent: "center", alignItems:"center", display: "flex", background: "blue", color: "white", cursor: "pointer"}}
                      onClick={() => { setModalFilter("north-elevation"); setModalOpen(true); }}
                    >N</div>
                    <div style={{border: "1px solid blue", width: "0px", height: "20px"}}></div>
                  </div>
                </Html>
              </mesh>

              <mesh position={[0,1,5]}>
                  <Html distanceFactor={35}>
                  <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", opacity: fade}}>
                    <div style={{ borderRadius: "50px",border: "2px solid blue",width: "25px", height: "25px", fontSize: "25px", justifyContent: "center", alignItems:"center", display: "flex", background: "blue", color: "white", cursor: "pointer"}}
                      onClick={() => { setModalFilter("west-elevation"); setModalOpen(true); }}
                    >W</div>
                    <div style={{border: "1px solid blue", width: "0px", height: "20px"}}></div>
                      </div>
                      </Html>
                </mesh>

              <mesh position={[0,1,-9]}>
                  <Html distanceFactor={35}>
                  <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", opacity: fade, transition: ".5s"}}>
                    <div style={{ borderRadius: "50px",border: "2px solid blue",width: "25px", height: "25px", fontSize: "25px", justifyContent: "center", alignItems:"center", display: "flex", background: "blue", color: "white", cursor: "pointer"}}
                      onClick={() => { setModalFilter("east-elevation"); setModalOpen(true); }}
                    >E</div>
                    <div style={{border: "1px solid blue", width: "0px", height: "20px"}}></div>
                      </div>
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