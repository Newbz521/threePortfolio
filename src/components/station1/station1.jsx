import React, { Component, useMemo } from "react";
import { useEffect, useState, useRef, Suspense } from "react";
import { useSpring, a, config } from "@react-spring/three";

import { Canvas, useFrame, useThree, PerspectiveCamera} from "@react-three/fiber"
import { Outline } from '@react-three/postprocessing'
import { BlendFunction, Resizer, KernelSize } from 'postprocessing'
import {PivotControls, MeshReflectorMaterial, orthographicCamera, OrthographicCamera, OrbitControls, RoundedBox, useCursor, Text} from '@react-three/drei'
import Cutter from '@r3f-cutter/r3f-cutter';
import { useCSG, Geometry, Base, Subtraction } from '@react-three/csg'
import PlatformOne from "./platform1";
import DayScene from "./environment";
import { OrbitingMesh, OrbitingMeshTwo } from "./satelite";
import { useControls } from "leva";
import Island from "./island";
import * as THREE from 'three'
import "./station1.css"
import { Vector3 } from "three";



const StationOne = (props) => {
const [toggler, setToggler] = useState(false);

  
const t = new Vector3();

const defaultPosition = {
  position: [-100, 50, 80],
  target: [0, 0, 0]
};

const farAway = {
  position: [-18, 10, 0],
  target: [-18, 10, -15]
};
  
  const storeTwo = {
    position: [0, 10, 0],
    target: [0,10,-15]
  }
  
  const storeThree = {
    position: [18, 10, 0],
    target: [18,10,-15]
  }
  const storeFour = {
    position: [-18, 10, 0],
    target: [-18,10,15]
  }
  const storeFive = {
    position: [0, 10, 0],
    target: [0,10,15]
  }
  const storeSix = {
  position: [18, 10, 0],
  target: [18,10,15]
}

const CameraWrapper = ({ cameraPosition, target }) => {
  const { camera } = useThree();
  camera.position.set(...cameraPosition);
  camera.lookAt(t.set(...target));
  return null;
};

const ControlsWrapper = ({ target }) => {
  const { controls } = useThree();
  if (controls) {
    controls.target.set(...target);
  }
  return null;
};

function AnimateEyeToTarget({ position, target }) {
  const { camera, controls } = useThree();

  const s = useSpring({
    from: defaultPosition,
    // Fun jelly-like animation
    config: config.wobbly,
    onStart: () => {
      if (!controls) return;
      controls.enabled = false;
    },
    onRest: () => {
      if (!controls) return;
      controls.enabled = true;
    }
  });

  s.position.start({ from: camera.position.toArray(), to: position });
  s.target.start({
    from: controls ? controls.target.toArray() : [0, 0, 0],
    to: target
  });

  const AnimateControls = useMemo(() => a(ControlsWrapper), []);
  const AnimatedNavigation = useMemo(() => a(CameraWrapper), []);

  return (
    <>
      <AnimatedNavigation cameraPosition={s.position} target={s.target} />
      <AnimateControls target={s.target} />
    </>
  );
}

function EyeAnimation({ preset }) {
  const [cameraSettings, setCameraSettings] = useState(defaultPosition);

  useEffect(() => {
    if (preset === 0) {
      setCameraSettings(defaultPosition);
    } else if (preset === 1) {
      setCameraSettings(farAway);
    } else if (preset === 2) {
      setCameraSettings(storeTwo);
    } else if (preset === 3) {
      setCameraSettings(storeThree);
    } else if (preset === 4) {
      setCameraSettings(storeFour);
    } else if (preset === 5) {
      setCameraSettings(storeFive);
    } else if (preset === 6) {
      setCameraSettings(storeSix);
    }
  }, [preset]);

  return (
    <>
      <AnimateEyeToTarget
        position={cameraSettings.position}
        target={cameraSettings.target}
      />
    </>
  );
}
  
const [preset, setPreset] = useState(0)  
// const { preset } = useControls({
//   preset: {
//     value: 0,
//     min: 0,
//     max: 1,
//     step: 1
//   }
// });

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

  function Video() {
    const [video] = useState(() => Object.assign(document.createElement('video'), { src: "/Kitchan.mp4", crossOrigin: 'Anonymous', loop: true, muted: true }))
    useEffect(() => void video.play(), [video])
    return (
      <mesh position={[-20, 8, -14.7]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[.1,8,8]}/>
        <meshBasicMaterial  toneMapped={false}>
          <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
        </meshBasicMaterial>
      </mesh>
    )
  }

  function VideoTwo() {
    const [video] = useState(() => Object.assign(document.createElement('video'), { src: "/Bubble.mp4", crossOrigin: 'Anonymous', loop: true, muted: true }))
    useEffect(() => void video.play(), [video])
    return (
      <mesh position={[0, 8, -14.7]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[.1,8,8]}/>
        <meshBasicMaterial  toneMapped={false}>
          <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
        </meshBasicMaterial>
      </mesh>
    )
  }

  function VideoThree() {
    const [video] = useState(() => Object.assign(document.createElement('video'), { src: "/Levi.mp4", crossOrigin: 'Anonymous', loop: true, muted: true }))
    useEffect(() => void video.play(), [video])
    return (
      <mesh position={[20, 8, -14.7]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[.1,8,8]}/>
        <meshBasicMaterial  toneMapped={false}>
          <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
        </meshBasicMaterial>
      </mesh>
    )
  }

  let rise = 0;
  let risespeed = .015;
  function StoreOne() {
      const ref = useRef()
      const bounceRef = useRef()
      const [active, setActive] = useState(false)
      const [git, setGit] = useState(false)
      const [deploy, setDeploy] = useState(false)
      const [world,setWorld] = useState(false)
      const [zoom, setZoom] = useState(false)
      useCursor(active)
      
    
      useFrame((state) => {
        rise += risespeed
        bounceRef.current.position.y = 1.5 * Math.sin(rise) 
      })
      return (
        <mesh ref={bounceRef}>
          <mesh ref={ref} position={[-20, 8, -15]} receiveShadow castShadow onClick={() => { if (!zoom) { setPreset(1) } else { setPreset(0) }; setZoom(!zoom) }} onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)}>
          <boxGeometry args={[8, 8, .5]} />
          <meshStandardMaterial color={active ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
          </mesh>
          <Video />
          <mesh ref={ref} position={[-23, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://github.com/Newbz521/FiberKitchen", "_blank"); }} onPointerOver={() => setGit(true)} onPointerOut={() => setGit(false)}>
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={git ? 'lightpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
          </mesh>
          <mesh position={[-23, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            GIT
          </Text>
            </mesh>
          <mesh ref={ref} position={[-20, 14, -15]} receiveShadow castShadow onClick={() => {  window.open("https://kitchan.netlify.app/", "_blank"); }} onPointerOver={() => setDeploy(true)} onPointerOut={() => setDeploy(false)}>
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={deploy ? 'pink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
          </mesh>
          <mesh position={[-20, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            APP
          </Text>
            </mesh>
          <mesh ref={ref} position={[-17, 14, -15]} receiveShadow castShadow onClick={() => { if (!zoom) { setPreset(1) } else { setPreset(0) }; setZoom(!zoom) }} onPointerOver={() => setWorld(true)} onPointerOut={() => setWorld(false)}>
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={world ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
          </mesh>
          <mesh position={[-17, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            ZOOM
          </Text>
            </mesh>
        </mesh>
      )
    }

  let rise2 = 0;
  let risespeed2 = .015
  function StoreTwo() {
    const ref = useRef()
    const bounceRef = useRef()
    const [active, setActive] = useState(false)
    const [git, setGit] = useState(false)
    const [deploy, setDeploy] = useState(false)
    const [world,setWorld] = useState(false)
    const [zoom, setZoom] = useState(false)
    useCursor(active)
     
  
    useFrame((state) => {
      rise2 += risespeed2
      bounceRef.current.position.y = 1.5 * Math.sin(rise2) 
    })
    return (
      <mesh ref={bounceRef}>
        <mesh ref={ref} position={[0, 8, -15]} receiveShadow castShadow onClick={() => { if (!zoom) { setPreset(2) } else { setPreset(0) }; setZoom(!zoom) }} onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)}>
        <boxGeometry args={[8, 8, .5]} />
        <meshStandardMaterial color={active ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
        </mesh>
        <VideoTwo />
        <mesh ref={ref} position={[-3, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://github.com/Newbz521/Beacon-Defender-", "_blank"); }} onPointerOver={() => setGit(true)} onPointerOut={() => setGit(false)}>
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={git ? 'lightpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
          </mesh>
          <mesh position={[-3, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            GIT
          </Text>
            </mesh>
          <mesh ref={ref} position={[0, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://newbz521.github.io/Beacon-Defender-/", "_blank"); }} onPointerOver={() => setDeploy(true)} onPointerOut={() => setDeploy(false)}>
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={deploy ? 'pink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
          </mesh>
          <mesh position={[0, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            APP
          </Text>
            </mesh>
          <mesh ref={ref} position={[3, 14, -15]} receiveShadow castShadow onClick={() => { if (!zoom) { setPreset(1) } else { setPreset(0) }; setZoom(!zoom) }} onPointerOver={() => setWorld(true)} onPointerOut={() => setWorld(false)}>
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={world ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
          </mesh>
          <mesh position={[3, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            BACK
          </Text>
            </mesh>
      </mesh>
    )
  }

  let rise3 = 0;
  let risespeed3 = .015
  function StoreThree() {
    const ref = useRef()
    const bounceRef = useRef()
    const [active, setActive] = useState(false)
    const [git, setGit] = useState(false)
    const [deploy, setDeploy] = useState(false)
    const [world,setWorld] = useState(false)
    const [zoom, setZoom] = useState(false)
    useCursor(active)
     
  
    useFrame((state) => {
      rise3 += risespeed3
      bounceRef.current.position.y = 1.5 * Math.sin(rise3) 
    })
    return (
      <mesh ref={bounceRef}>
        <mesh ref={ref} position={[20, 8, -15]} receiveShadow castShadow onClick={() => { if (!zoom) { setPreset(3) } else { setPreset(0) }; setZoom(!zoom) }} onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)}>
        <boxGeometry args={[8, 8, .5]} />
        <meshStandardMaterial color={active ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
        </mesh>
        <VideoThree />
        <mesh ref={ref} position={[17, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://github.com/Newbz521/virtufit-prototype", "_blank") }} onPointerOver={() => setGit(true)} onPointerOut={() => setGit(false)}>
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={git ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
          </mesh>
          <mesh position={[17, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            GIT
          </Text>
            </mesh>
          <mesh ref={ref} position={[20, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://virtualfit.netlify.app/", "_blank") }} onPointerOver={() => setDeploy(true)} onPointerOut={() => setDeploy(false)}>
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={deploy ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
          </mesh>
          <mesh position={[20, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            APP
          </Text>
            </mesh>
          <mesh ref={ref} position={[23, 14, -15]} receiveShadow castShadow onClick={() => { if (!zoom) { setPreset(1) } else { setPreset(0) }; setZoom(!zoom) }} onPointerOver={() => setWorld(true)} onPointerOut={() => setWorld(false)}>
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={world ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
          </mesh>
          <mesh position={[23, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            BACK
          </Text>
            </mesh>
      </mesh>
    )
  }

  let rise4 = 0;
  let risespeed4 = .015
  function StoreFour() {
    const ref = useRef()
    const bounceRef = useRef()
    const [active, setActive] = useState(false)
    const [git, setGit] = useState(false)
    const [deploy, setDeploy] = useState(false)
    const [world,setWorld] = useState(false)
    const [zoom, setZoom] = useState(false)
    useCursor(active)
     
  
    useFrame((state) => {
      rise4 += risespeed4
      bounceRef.current.position.y = 1.5 * Math.sin(rise4) 
    })
    return (
      <mesh ref={bounceRef}>
        <mesh ref={ref} position={[-20, 8, 15]} receiveShadow castShadow onClick={() => { if (!zoom) { setPreset(4) } else { setPreset(0) }; setZoom(!zoom) }} onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)}>
        <boxGeometry args={[8, 8, .5]} />
        <meshStandardMaterial color={active ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
      </mesh>
      </mesh>
    )
  }

  let rise5 = 0;
  let risespeed5 = .015
  function StoreFive() {
    const ref = useRef()
    const bounceRef = useRef()
    const [active, setActive] = useState(false)
    const [git, setGit] = useState(false)
    const [deploy, setDeploy] = useState(false)
    const [world,setWorld] = useState(false)
    const [zoom, setZoom] = useState(false)
    useCursor(active)
     
    useFrame((state) => {
      rise5 += risespeed5
      bounceRef.current.position.y = 1.5 * Math.sin(rise5) 
    })
    return (
      <mesh ref={bounceRef}>
        <mesh ref={ref} position={[0, 8, 15]} receiveShadow castShadow onClick={() => { if (!zoom) { setPreset(5) } else { setPreset(0) }; setZoom(!zoom) }} onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)}>
        <boxGeometry args={[8, 8, .5]} />
        <meshStandardMaterial color={active ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
      </mesh>
      </mesh>
    )
  }

  let rise6 = 0;
  let risespeed6 = .015
  function StoreSix() {
    const ref = useRef()
    const bounceRef = useRef()
    const [active, setActive] = useState(false)
    const [git, setGit] = useState(false)
    const [deploy, setDeploy] = useState(false)
    const [world,setWorld] = useState(false)
    const [zoom, setZoom] = useState(false)
    useCursor(active)
     
    useFrame((state) => {
      rise6 += risespeed6
      bounceRef.current.position.y = 1.5 * Math.sin(rise6) 
    })
    return (
      <mesh ref={bounceRef}>
        <mesh ref={ref} position={[20, 8, 15]} receiveShadow castShadow onClick={() => { if (!zoom) { setPreset(6) } else { setPreset(0) }; setZoom(!zoom) }} onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)}>
        <boxGeometry args={[8, 8, .5]} />
        <meshStandardMaterial color={active ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
      </mesh>
      </mesh>
    )
  }

  return (
    <div className="canvasContainer">
      <Canvas shadows
        far={50}
        dpr={[1, 1.5]} 
        gl={{ localClippingEnabled: true, alpha: false }} 
        // camera={{ position: [-180, 90, -100], fov: 75 }}
      >
        <StoreOne />
        {/* <Video/> */}
        <StoreTwo />
        <StoreThree />
        <StoreFour />
        <StoreFive />
        <StoreSix/>
        <EyeAnimation preset={preset} />
        <OrbitControls makeDefault/>
       
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