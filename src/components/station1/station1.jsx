import React, { Component, useMemo} from "react";
import { useEffect, useState, useRef, Suspense } from "react";
import { useSpring, a} from "@react-spring/three";
import { Canvas, useFrame, useThree} from "@react-three/fiber"
import {OrbitControls, RoundedBox, useCursor, Text, Preload, Html, AdaptiveEvents, AdaptiveDpr, PerformanceMonitor, Hud, useProgress, Loader, Reflector} from '@react-three/drei'
import PlatformOne from "./platform1";
import DayScene from "./environment";
import Island from "./island";
import IslandTwo from "../station2/island2";
import IslandThree from "../station3/island3";
import "./station1.css"
import { Vector3 } from "three";
import { Bot, BotTwo } from "../station3/bot";
import { PerfHeadless, usePerf, Perf, getReport } from 'r3f-perf'

// import * as THREE from 'three'
// import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing'
// import { LoadingScreen } from "../loader/loader";
// import { useControls } from "leva";


const StationOne = (props) => {
  const [dpr, setDpr] = useState(1.5)
  const [dov, setDov] = useState(85);
  const [preset, setPreset] = useState(0)  
  const [day, setDay] = useState(true);
  const [shaded, setShaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

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

  useEffect(()=>{
    // console.log(window.innerWidth)
    if (window.innerWidth < 500) {
      setDov(105)
    } 
  }, [])

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
  
  let created =() => {
    console.log("created")
  }

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
    // Smooth, configurable animation
    config: {
      mass: 1,
      tension: 170,
      friction: 26,
      duration: 2000, // 2 second transition
      easing: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // easeInOutQuart
    },
    onStart: () => {
      if (!controls) return;
      controls.enabled = false;
    },
    onRest: () => {
      if (!controls) return;
      controls.enabled = true;
    }
  });

  s.position.start({ 
    from: camera.position.toArray(), 
    to: position,
    config: {
      mass: 1,
      tension: 170,
      friction: 26,
      duration: 2000
    }
  });
  
  s.target.start({
    from: controls ? controls.target.toArray() : [0, 0, 0],
    to: target,
    config: {
      mass: 1,
      tension: 170,
      friction: 26,
      duration: 2000
    }
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
      // leftRef.current.position.x = -20 * Math.sin(step) 
      // leftRef.current.receiveShadow = shaded;
      // leftRef.current.castShadow = shaded;
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
        <mesh ref={leftRef} scale={[30,12,13]} >
        <RoundedBox args={[1, 1, 1]} radius={.3}>
        <meshLambertMaterial attach="material" color={"lightgrey"}  />
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
      // leftRef.current.position.x = 20 * Math.sin(step) 
      // leftRef.current.castShadow = shaded;
      // subRef.current.castShadow = shaded;

      // subRef.current.position.y = 1.5 * Math.sin(rise);
      // if (leftRef.current.position.x > -200) {
      //   leftRef.current.position.x -= .5
      // } else if (leftRef.current.position.x = -200) {
      //   leftRef.current.position.x = 200
      // }
    })
    return (
      <mesh ref={subRef}>
        <mesh ref={leftRef} scale={[30,12,13]} >
          <RoundedBox args={[1, 1, 1]} radius={.3}>
          <meshLambertMaterial attach="material" color={"lightgrey"}  />
          </RoundedBox>
        </mesh>

      </mesh>
    )
  }

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
          <mesh ref={ref} scale={[8,8,.5]} position={[-20, 8, -15]} receiveShadow castShadow onClick={() => { setPreset(1) } } >
          <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={active ? 'lightpink' : 'lightblue'} />
            <mesh position={[0, 0, .65]} >

          <Text
        scale={[.12, .12, .12]}
        color="white" // default
        >
            Fiber Kitchen
          </Text>
            </mesh>
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
            REPO
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
        <mesh ref={ref} scale={[8,8,.5]} position={[0, 8, -15]} receiveShadow castShadow onClick={() => { setPreset(2) }} >
          <boxGeometry
            // args={[8, 8, .5]}
            args={[1, 1, 1]}
            
          />
          <meshStandardMaterial color={active ? 'lightpink' : 'lightblue'} />
          <mesh position={[0,0,.6]} >
          <Text
        scale={[.12, .12, .12]}
        color="white" // default
        >
            Beacon Defender
          </Text>
            </mesh>
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
            REPO
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
        <mesh ref={ref} scale={[8,8,.5]} position={[20, 8, -15]} receiveShadow castShadow onClick={() => { setPreset(3) }} >
        <boxGeometry args={[1,1,1]} />
          <meshStandardMaterial color={active ? 'lightpink' : 'lightblue'} />
          <mesh position={[0,0,.6]} >
          <Text
        scale={[.12, .12, .12]}
        color="white" // default
        >
            Virtual Fit
          </Text>
            </mesh>
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
            REPO
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
    const { progress, active,errors,item,loaded,total } = useProgress()
    return null // We'll use the LoadingOverlay instead
  }

  // Loading Overlay Component (outside Canvas)
  const LoadingOverlay = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [smoothProgress, setSmoothProgress] = useState(0)
    const { progress, active } = useProgress()
    
    // Check if this is the very first time the site has ever been loaded
    const isFirstEverLoad = !localStorage.getItem('siteHasLoadedBefore')
    
    // Only show loading on the very first site load ever
    const shouldShow = isFirstEverLoad && active && progress < 100
    
    // Use useEffect to manage loading state more smoothly
    useEffect(() => {
      if (shouldShow) {
        setIsLoading(true)
        setSmoothProgress(0)
        
        const startTime = Date.now()
        const minLoadTime = 5000 // 5 seconds minimum
        
        // Smoothly animate progress
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime
          const progressRatio = Math.min(elapsed / minLoadTime, 1)
          
          // Calculate target progress based on time elapsed vs actual progress
          const targetProgress = Math.max(progress, progressRatio * 100)
          
          setSmoothProgress(prev => {
            // Move in small increments (0.5% per update for smooth animation)
            const increment = 0.5
            if (prev < targetProgress) {
              return Math.min(prev + increment, targetProgress)
            }
            return prev
          })
        }, 15) // Update every 15ms for smoother animation (60fps)
        
        return () => clearInterval(interval)
      } else if (isLoading && !active) {
        // Add a small delay before hiding to prevent flickering
        const timer = setTimeout(() => {
          setIsLoading(false)
          setSmoothProgress(0)
          // Mark that the site has been loaded before (permanent)
          localStorage.setItem('siteHasLoadedBefore', 'true')
        }, 500)
        return () => clearTimeout(timer)
      }
    }, [shouldShow, progress, active, isLoading, isFirstEverLoad])
    
    if (!isLoading) return null
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
        backdropFilter: 'blur(5px)',
        pointerEvents: 'auto',
        transition: 'opacity 0.3s ease-in-out'
      }}>
        <div className="load-block" style={{
          fontSize: "5vw",
          color: 'white',
          textAlign: 'center',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          padding: '2rem',
          borderRadius: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
        }}>
          {Math.round(smoothProgress)} % of World loaded...
        </div>
      </div>
    )
  }
  
  const Debug = () => {
    const { width } = useThree((s) => s.size)
    return (
      /* This is it -> */
      <Perf
        minimal={width < 712}
        // matrixUpdate
        // deepAnalyze
        // overClock
        position="bottom-right"
      />
    )
  }

  const PerfHook = () => {
    // getPerf() is also available for non-reactive way
    const [getReport] = usePerf((s) => s[(s.getReport)])
    console.log(getReport())
    return <PerfHeadless />
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
        Your device doesn't support the required graphics capabilities for this 3D experience. 
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
    <div className="canvasContainer" load>
      <LoadingOverlay />
      <div className='title-block'>
        <h1 onClick={function () { setPreset(0) }}>WORLD</h1>
        <h4 onClick={function () { setPreset(2) }}>Projects</h4>
        <h4 onClick={function () { setPreset(7) }}>CONTACTS</h4>
        <h4 onClick={function () { setPreset(8) }}>ABOUT ME</h4>
      </div>
      <div className="title-block controls-block" style={{bottom:"calc(25px + 10vh)",position:"absolute",borderRadius:"10px", width:"fit-content", height: "25vh", color:"white", zIndex:"20", display:"flex", justifyContent:"center", alignItems:"start", flexDirection:"column", paddingLeft:"1vw", pointerEvents:"none"}}>
        <h4 style={{textShadow:"0 0 3px black"}}>ESC : Zoom to World View</h4>
        <h4 style={{textShadow:"0 0 3px black"}}>Left(Hold) : Camera Angle</h4>
        <h4 style={{textShadow:"0 0 3px black"}}>Left(Click) : Select </h4>
        <h4 style={{textShadow:"0 0 3px black"}}>Scroll : Zoom </h4>

      </div>

      
      <Canvas
      
        far={1000}
        dpr={dpr} 
        gl={{ localClippingEnabled: true, alpha: false }} 
        camera={{ position: [-180, 60, -150], fov: dov }}
        performance={{ min: .1 }}
        onCreated={created}
        // frameloop="ondemand"
      >
        {/* <fog attach="fog" args={["white", 1, 950]} /> */}
      
        {day ? <fog attach="fog" args={["white", 10, 700]} /> : <fog attach="fog" args={["black", 1, 700]} />}
        <mesh scale={[1, 1, 1]}>
          
        
        <PerformanceMonitor flipflops={3} onFallback={() => setDpr(1)}/>
        <EyeAnimation preset={preset} />
        <OrbitControls minDistance={0} maxDistance={170} makeDefault />
        
    <AdaptiveDpr pixelated />
    <AdaptiveEvents />
          <DayScene setDay={setDay} />      
      
          <Suspense fallback={<QuickLoad/>}>    
          {(      
            <>
    <StoreOne />
    <StoreTwo />
    <StoreThree />
    <Subway middle={-30} />
    <SubwayLeft middle={30} />
    <PlatformOne middle={-15} />
    <PlatformOne middle={15} />
              <Island setPreset={setPreset} shaded={shaded} />
              <mesh position={[-11.5, 15, -12]} rotation={[-Math.PI / 1.2, 0, -Math.PI]}>
          <Html distanceFactor={50}>
            <div className="chat-bubble">Take a look at my projects!</div>
          </Html>
        </mesh>
              <Bot position={[-10, 7, -12]} rotation={[0,0,0]} />
              <BotTwo position={[0, 7, 15]} rotation={[0,0,0]} />
    {/* <OrbitingMesh />
    <OrbitingMeshTwo /> */}
              <IslandTwo setPreset={setPreset} shaded={shaded} />  
              <IslandThree setPreset={setPreset} />
            </>
          )}
          </Suspense>
          <Preload all/>
          </mesh>
        {/* <Stats/> */}
        {/* <Debug/> */}
        {/* <PerfHook/> */}
      </Canvas>
      <Loader
        initialState={(active) => active}
        // barStyles={}
        dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`}
      />
    </div>
  );
}


export default StationOne;