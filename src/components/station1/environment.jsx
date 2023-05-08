import {
 
  Sky
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
// import { useControls } from "leva";
import { ReactNode, useRef, useState, useEffect } from "react";
// import { Group } from "three";


function DayScene() {
  
  const [toggler, setToggler] = useState(false);
  const [planet, setPlanet] = useState("rgb(255, 244, 120)")
  const [size,setSize] = useState(40)
  const dayRef = useRef()
  const nightRef = useRef()

  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])


  function handleShow(e) {
    if (toggler == true) {
      // setShow("");
      setPlanet("rgb(255, 244, 120)");
      setSize(40)
    } else {
      setPlanet("white");
      setSize(20)
    }
    setToggler((prevCheck) => !prevCheck);
  }
  useFrame(() => {
    dayRef.current.position.y = 0
  
})
  return (
    <>
      <mesh ref={dayRef}>
        
        <mesh onClick={handleShow}  onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}  position={[200, 140, 50]}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshBasicMaterial  color={planet} />
        </mesh>
        
        {!toggler ? (
          <>
             <Sky sunPosition={[0, 1, .5]} distance={10000} inclination={0}
            azimuth={1} />
            <directionalLight castShadow intensity={.9} position={[200, 140, 50]} />
            <ambientLight intensity={.2} />
            </>
            //  <directionalLight castShadow intensity={.7} position={[20, 70, 20]} shadow-mapSize={[1024, 1024]}/>
            //  <ambientLight intensity={.4} />
        ) : (
            <>
          <Sky sunPosition={[0, -.1, .5]} distance={10000} inclination={0}
              azimuth={1} />
              <directionalLight castShadow intensity={.1} position={[200, 140, 50]} />
              <ambientLight intensity={.2} />
              </>
        )}
 
        </mesh>
    </>
  );
}


export default DayScene;

