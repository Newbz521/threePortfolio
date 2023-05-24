import React, { Component, useMemo} from "react";
import { useEffect, useState, useRef, Suspense } from "react";
import { useSpring, a, config} from "@react-spring/three";

import { Canvas, useFrame, useThree, PerspectiveCamera} from "@react-three/fiber"

import {MeshReflectorMaterial,OrbitControls, RoundedBox, useCursor, Text, Preload, Html, AdaptiveEvents, AdaptiveDpr, PerformanceMonitor, Hud, useProgress, Loader, Reflector} from '@react-three/drei'
import PlatformOne from "./platform1";
import DayScene from "./environment";
import { OrbitingMesh, OrbitingMeshTwo } from "./satelite";
import Island from "./island";
import IslandTwo from "../station2/island2";
import IslandThree from "../station3/island3";
import * as THREE from 'three'
import "./station1.css"
import { Vector3 } from "three";
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing'
import { LoadingScreen } from "../loader/loader";
import { useControls } from "leva";
import {Bot, BotTwo} from "../station3/bot";


const StationOne = (props) => {
  const [toggler, setToggler] = useState(false);
  const [dpr, setDpr] = useState(1.5)
  const [preset, setPreset] = useState(0)  
  const [start, setStart] = useState(false);
  const [dov, setDov] = useState(95);
  const [day, setDay] = useState(true);

  useEffect(()=>{
    // console.log(window.innerWidth)
    if (window.innerWidth < 500) {
      setDov(110)
    } 
  },[])

  document.addEventListener('keydown', function (event) {
    
    // console.log(`Key: ${event.key} with keycode ${event.keyCode} has been pressed`);
    if (event.key == "Escape") {
      console.log("escape has been pressed!")
      setPreset(0)
      
    }
  }
)
    
const t = new Vector3();

const defaultPosition = {
  position: [-100, 30, 80],
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
  const Island2 = {
    position: [490, -38, 20],
    target: [450,-40,0]
  }
  const Island3 = {
    position: [300,90,-575],
    target: [300, 50,-500]
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
    // config: config.wobbly,
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
    }else if (preset === 7) {
      setCameraSettings(Island2);
    }else if (preset === 8) {
      setCameraSettings(Island3);
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
  
  function Subway({middle}) {
    let step = 0;
    let speed = .005;

    let rise = 0;
    let risespeed = .005;
    const subRef = useRef(null)
    const leftRef = useRef(null);
    const midZ = middle
    let opacityLevel = 0
    useFrame(() => {
      step += speed
      // rise += risespeed
      leftRef.current.position.z = midZ;
      leftRef.current.position.y = 7;
      leftRef.current.receiveShadow = true;
      leftRef.current.castShadow = true;
      leftRef.current.position.x = -20 * Math.sin(step) 
      // subRef.current.position.y = 1.5 * Math.sin(rise);
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
    let risespeed = .005;
    const subRef = useRef(null)
    useFrame(() => {
      step += speed
      // rise += risespeed
      leftRef.current.position.z = midZ;
      leftRef.current.position.y = 7;
      leftRef.current.receiveShadow = true;
      leftRef.current.castShadow = true;
      leftRef.current.position.x = 20 * Math.sin(step) 

      // subRef.current.position.y = 1.5 * Math.sin(rise);
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
  // function Video() {
  //   const [video] = useState(() => Object.assign(document.createElement('video'), { src: "/Kitchan.mp4", crossOrigin: 'Anonymous', loop: true, muted: true }))
  //   useEffect(() => void video.play(), [video])
  //   return (
  //     <mesh position={[-20, 8, -14.7]} rotation={[0, Math.PI / 2, 0]}>
  //       <boxGeometry args={[.1,8,8]}/>
  //       <meshBasicMaterial  toneMapped={false}>
  //         <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
  //       </meshBasicMaterial>
  //     </mesh>
  //   )
  // }
  // function VideoTwo() {
  //   const [video] = useState(() => Object.assign(document.createElement('video'), { src: "/Bubble.mp4", crossOrigin: 'Anonymous', loop: true, muted: true }))
  //   useEffect(() => void video.play(), [video])
  //   return (
  //     <mesh position={[0, 8, -14.7]} rotation={[0, Math.PI / 2, 0]}>
  //       <boxGeometry args={[.1,8,8]}/>
  //       <meshBasicMaterial  toneMapped={false}>
  //         <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
  //       </meshBasicMaterial>
  //     </mesh>
  //   )
  // }
  // function VideoThree() {
  //   const [video] = useState(() => Object.assign(document.createElement('video'), { src: "/Levi.mp4", crossOrigin: 'Anonymous', loop: true, muted: true }))
  //   useEffect(() => void video.play(), [video])
  //   return (
  //     <mesh position={[20, 8, -14.7]} rotation={[0, Math.PI / 2, 0]}>
  //       <boxGeometry args={[.1,8,8]}/>
  //       <meshBasicMaterial  toneMapped={false}>
  //         <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
  //       </meshBasicMaterial>
  //     </mesh>
  //   )
  // }


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
        // rise += risespeed
        // bounceRef.current.position.y = 1.5 * Math.sin(rise) 
      })
      return (
        <mesh ref={bounceRef}>
          <mesh ref={ref} position={[-20, 8, -15]} receiveShadow castShadow onClick={() => { setPreset(1) } } >
          <boxGeometry args={[8, 8, .5]} />
          <meshStandardMaterial color={active ? 'lightpink' : 'lightblue'}/>
          </mesh>
          {/* <Video /> */}
          <mesh ref={ref} scale={git ?[1.2,1.2,1]: [1,1,1] } position={[-23, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://github.com/Newbz521/FiberKitchen", "_blank"); }} >
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={git ? 'lightpink' : 'lightblue'}/>
          </mesh>
          <mesh position={[-23, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            GIT
          </Text>
            </mesh>
          <mesh ref={ref}scale={deploy ?[1.2,1.2,1]: [1,1,1] } position={[-20, 14, -15]} receiveShadow castShadow onClick={() => {  window.open("https://kitchan.netlify.app/", "_blank"); }} >
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={deploy ? 'pink' : 'lightblue'} />
          </mesh>
          <mesh position={[-20, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            APP
          </Text>
            </mesh>
          <mesh ref={ref} scale={world ?[1.2,1.2,1]: [1,1,1] } position={[-17, 14, -15]} receiveShadow castShadow onClick={() => { setPreset(0) }}>
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={world ? 'lightpink' : 'lightblue'} />
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

  function StoreTwo() {
    const ref = useRef()
    const bounceRef = useRef()
    const [active, setActive] = useState(false)
    const [git, setGit] = useState(false)
    const [deploy, setDeploy] = useState(false)
    const [world,setWorld] = useState(false)
    const [zoom, setZoom] = useState(false)
    useCursor(active)
     
    return (
      <mesh ref={bounceRef}>
        <mesh ref={ref} position={[0, 8, -15]} receiveShadow castShadow onClick={() => { setPreset(2) }} >
        <boxGeometry args={[8, 8, .5]} />
        <meshStandardMaterial color={active ? 'lightpink' : 'lightblue'}  />
        </mesh>
        {/* <VideoTwo /> */}
        <mesh ref={ref} scale={git ?[1.2,1.2,1]: [1,1,1] }position={[-3, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://github.com/Newbz521/Beacon-Defender-", "_blank"); }} >
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={git ? 'lightpink' : 'lightblue'} clearcoat={1}  />
          </mesh>
          <mesh position={[-3, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            GIT
          </Text>
            </mesh>
          <mesh ref={ref} scale={deploy ?[1.2,1.2,1]: [1,1,1] } position={[0, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://newbz521.github.io/Beacon-Defender-/", "_blank"); }} >
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={deploy ? 'lightpink' : 'lightblue'} />
          </mesh>
          <mesh position={[0, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            APP
          </Text>
            </mesh>
          <mesh ref={ref} scale={world ?[1.2,1.2,1]: [1,1,1] } position={[3, 14, -15]} receiveShadow castShadow onClick={() => { setPreset(0) }}>
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={world ? 'lightpink' : 'lightblue'} />
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
      // rise3 += risespeed3
      // bounceRef.current.position.y = 1.5 * Math.sin(rise3) 
    })
    return (
      <mesh ref={bounceRef}>
        <mesh ref={ref} position={[20, 8, -15]} receiveShadow castShadow onClick={() => { setPreset(3) }} >
        <boxGeometry args={[8, 8, .5]} />
        <meshStandardMaterial color={active ? 'lightpink' : 'lightblue'} />
        </mesh>
        {/* <VideoThree /> */}
        <mesh ref={ref} scale={git ?[1.2,1.2,1]: [1,1,1] } position={[17, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://github.com/Newbz521/virtufit-prototype", "_blank") }} >
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial  color={git ? 'lightpink' : 'lightblue'} />
          </mesh>
          <mesh position={[17, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            GIT
          </Text>
            </mesh>
          <mesh ref={ref} scale={deploy ?[1.2,1.2,1]: [1,1,1] } position={[20, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://virtualfit.netlify.app/", "_blank") }} >
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={deploy ? 'lightpink' : 'lightblue'} />
          </mesh>
          <mesh position={[20, 14, -14.7]} >
          <Text
        scale={[.5, .5, .5]}
        color="white" // default
        >
            APP
          </Text>
            </mesh>
          <mesh ref={ref} scale={world ?[1.2,1.2,1]: [1,1,1] } position={[23, 14, -15]} receiveShadow castShadow onClick={() => { setPreset(0) }} >
            <boxGeometry args={[2, 2, .5]} />
          <meshStandardMaterial color={world ? 'lightpink' : 'lightblue'} />
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
  function QuickLoad() {
    const { progress } = useProgress()
    return <Html center> {progress} % loaded</Html>
  }
  
  return (
    <div className="canvasContainer">
      <div className='title-block' >
        <h1 onClick={function () { setPreset(0) }}>WORLD</h1>
        <h4 onClick={function () { setPreset(2) }}>Projects</h4>
        <h4 onClick={function () { setPreset(7) }}>CONTACTS</h4>
        <h4 onClick={function () { setPreset(8) }}>ABOUT ME</h4>
      </div>


      
      <Canvas shadows
        far={1000}
        dpr={dpr} 
        gl={{ localClippingEnabled: true, alpha: false }} 
        camera={{ position: [-180, 60, -150], fov: dov }}
        performance={{ min: .1 }}
      >
        {day ? <fog attach="fog" args={["white", 1, 880]} /> : <fog attach="fog" args={["black", 1, 880]} />}
        {/* <fog attach="fog" args={["white", 1, 950]} /> */}
      
        <AdaptiveDpr pixelated />
        <PerformanceMonitor flipflops={3} onFallback={() => setDpr(1)}/>
        <AdaptiveEvents />
        <EyeAnimation preset={preset} />
   <OrbitControls minDistance={10} maxDistance={200} makeDefault/>
      
    <Suspense fallback={<QuickLoad/>}>    
          {(
            
            <>
              
    <Preload all/>
              <DayScene setDay={setDay} />   
          
    <StoreOne />
    <StoreTwo />
    <StoreThree />
    <Subway middle={-30} />
    <SubwayLeft middle={30} />
    <PlatformOne middle={-15} />
    <PlatformOne middle={15} />
              <Island setPreset={setPreset} />
              <mesh position={[-11.5, 15, -12]} rotation={[-Math.PI / 1.2, 0, -Math.PI]}>
          <Html distanceFactor={50}>
            <div className="chat-bubble">Take a look at my projects!</div>
          </Html>
        </mesh>
              <Bot position={[-10, 7, -12]} rotation={[0,0,0]} />
              <BotTwo position={[0, 7, 15]} rotation={[0,0,0]} />
    <OrbitingMesh />
    <OrbitingMeshTwo />
    <IslandTwo setPreset={setPreset} />  
    <IslandThree setPreset={setPreset} />
            </>
          )}
   </Suspense>
{/*        
        <EffectComposer>
   
            <Bloom
    intensity={.1} // The bloom intensity.
    blurPass={undefined} // A blur pass.
    kernelSize={KernelSize.LARGE} // blur kernel size
    luminanceThreshold={0.1} // luminance threshold. Raise this value to mask out darker elements in the scene.
    luminanceSmoothing={1} // smoothness of the luminance threshold. Range is [0, 1]
    mipmapBlur={false} // Enables or disables mipmap blur.
    resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
    resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
  />
          
   
        </EffectComposer>     */}
      </Canvas>
      {/* <Loader/> */}
    </div>
  );
}


export default StationOne;