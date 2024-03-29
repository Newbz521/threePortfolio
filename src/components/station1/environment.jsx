import {
 
  Sky,
  Html
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
// import { useControls } from "leva";
import { ReactNode, useRef, useState, useEffect } from "react";
// import { Group } from "three";


function DayScene(props) {
  
  const [toggler, setToggler] = useState(false);
  const [planet, setPlanet] = useState("rgb(255, 244, 120)")
  const [sun,setSun] = useState("Go Night Mode")
  const [size,setSize] = useState(50)
  const dayRef = useRef()
  const nightRef = useRef()
  const sunRef = useRef()

  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])


  function handleShow(e) {
    if (toggler == true) {
      // setShow("");
      setPlanet("rgb(255, 244, 120)");
      setSize(50)
      setSun("Go Night Mode")
      props.setDay(true)
      // props.setColor({color:"grey"})
    } else {
      setPlanet("white");
      setSun("Go Day Mode")
      setSize(30)
      props.setDay(false)
      // props.setColor({color:"white"})
    }
    setToggler((prevCheck) => !prevCheck);
  }
  useFrame(() => {
    dayRef.current.position.y = 0

    
  
})
  return (
    <>
      
      <mesh ref={dayRef}>
        
        <mesh ref={sunRef} onClick={handleShow}  onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}  position={[200, 220, -150]}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshBasicMaterial color={planet} />
          <Html >
            <div style={{borderRadius: "5px", margin: "0", color: "white", fontWeight:"bolder", textShadow:"0 0 1px black", pointerEvents:"none" }}>{sun}</div>
          </Html>
        </mesh>
       
        
        {!toggler ? (
          <>
             <Sky sunPosition={[0, 1, .5]} distance={10000} inclination={0}
            azimuth={1} />
            <directionalLight castShadow intensity={.9} position={[200, 140, 50]} />
            <ambientLight intensity={.25} />
            
            </>
        ) : (
            <>
          <Sky sunPosition={[0, -.1, .5]} distance={10000} inclination={0}
              azimuth={1} />
              <directionalLight castShadow intensity={.1} position={[200, 140, 50]} />
              <ambientLight intensity={.15} />
              </>
        )}
 
        </mesh>
    </>
  );
}


export default DayScene;

