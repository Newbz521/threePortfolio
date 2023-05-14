import { useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber"
import { useCursor, Cylinder, RoundedBox} from '@react-three/drei'
import * as THREE from 'three'
import { OrbitingMeshThree,OrbitingMeshFour } from "../station1/satelite";
import Grass from "./Grass.png"
import { act } from "react-dom/test-utils";
import Banners from "./banners";
import Propel from "../station1/propel";

function IslandTwo(props) {
  // const loader = new THREE.TextureLoader();
  // const grassTexture = loader.load(Grass)
  function ccccc(children, color) {
    const fontSize = 200
  
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 2048
    const context = canvas.getContext('2d')
  
    context.fillStyle = "transparent"
    context.fillRect(0, 0, canvas.width, canvas.height)
  
    context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = color
    context.fillText(children, 1024, canvas.height / 2)
    return canvas
  
  }
  
  function TextRing({ children }) {
  
    const canvas = useMemo(() => {
      return ccccc(children, "white")
    }, [children])
  
    const backCanvas = useMemo(() => {
      return ccccc(children, "grey")
    }, [children])
  
    const texture = useRef()
    const texture2 = useRef()
    useFrame(({ clock }) => {
      texture.current.offset.x = clock.getElapsedTime() / 9
    })
  
    const cylArgs = [1, 1, 1, 64, 1, true]
  
    return (
      <group rotation-y={Math.PI / 4} scale={[80, 80, 80]} position={[450,-50,0]}>
        {/* <primitive object={target.texture} ref={texture} wrapS={THREE.RepeatWrapping} wrapT={THREE.RepeatWrapping} repeat={[1, 1]} /> */}
  
        <Cylinder args={cylArgs} side={THREE.FrontSide}>
          <meshStandardMaterial transparent attach="material">
            <canvasTexture
              attach="map"
              repeat={[4, 1]}
              image={canvas}
              premultiplyAlpha
              ref={texture}
              wrapS={THREE.RepeatWrapping}
              wrapT={THREE.RepeatWrapping}
              onUpdate={(s) => (s.needsUpdate = true)}
            />
          </meshStandardMaterial>
        </Cylinder>
  
       
      </group>
    )
  }

    let rise = 0;
    let risespeed = 0;
    const leftRef = useRef(null);
  const domeRef = useRef(null);
  const platRef = useRef(null)
  const [zoom, setZoom] = useState(false)
  const [active, setActive] = useState(false)
  const fenceRef = useRef(null)

  useCursor(active)
  
    useFrame(() => {
      rise += risespeed
      // leftRef.current.position.y = 0;
      leftRef.current.receiveShadow = true;
      // leftRef.current.castShadow = true;
      
      fenceRef.current.castShadow = true
      fenceRef.current.receiveShadow = true
      // platRef.current.receiveShadow = true;
      platRef.current.castShadow = true;
      domeRef.current.castShadow = true;
      domeRef.current.receiveShadow = true;
      domeRef.current.flatShading = true;
 
      // domeRef.current.castShadow = true;
      // domeRef.current.receiveShadow = true;
    })
  
  

  
  
    return (
      <mesh ref={leftRef}>
 
       <Banners/>
        <mesh ref={platRef} position={[450,-51,0]} onClick={() => {  props.setPreset(7)}} >
          <cylinderGeometry args={[60, 60, 2]} />
          <meshStandardMaterial color="lightgreen"  />
        </mesh>
        <Propel location={[450,-86,0]} />

        <mesh  position={[450,-68,0]} onClick={() => { props.setPreset(7) }} >
          <cylinderGeometry args={[70, 5, 30]} />
          <meshStandardMaterial color="lightgrey"  flatShading />
        </mesh>
        <mesh ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[450,-53,0]} >
          <sphereGeometry args={[70, 20,20, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="blue"  transparent opacity={.1} />
        </mesh>
        
        <mesh scale={[.9,.9,.5]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[450,-27,-20]}  >
          <sphereGeometry args={[20, 8,7, 40]} />
          <meshLambertMaterial side={THREE.DoubleSide} color="pink" flatShading/>
        </mesh>
        <mesh scale={[.4,.4,.2]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[450,-34,-7.5]}  >
          <sphereGeometry args={[20, 5,5, 0]} />
          <meshLambertMaterial side={THREE.DoubleSide} color="pink" flatShading/>
        </mesh>
        <mesh scale={[.2,.2,.1]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[455,-39,-28.5]}  >
          <sphereGeometry args={[20, 5,5, 0]} />
          <meshLambertMaterial side={THREE.DoubleSide} color="pink" flatShading/>
        </mesh>
        <mesh  ref={domeRef} rotation={[0, 0, 0]} position={[450,-43,-20]}  >
          <cylinderGeometry args={[2, 3, 17]}  />
          <meshLambertMaterial side={THREE.DoubleSide} color="rgb(193, 154, 107)" flatShading />
        </mesh>
        <mesh  ref={domeRef} rotation={[1, 0, 0]} position={[450,-40,-15]}  >
          <cylinderGeometry args={[.5, 2, 15]}  />
          <meshLambertMaterial side={THREE.DoubleSide} color="rgb(193, 154, 107)" flatShading />
        </mesh>

        <mesh  ref={domeRef} rotation={[-1, 0, -.5]} position={[453.5,-42,-25]}  >
          <cylinderGeometry args={[.3, 1, 10]}  />
          <meshLambertMaterial side={THREE.DoubleSide} color="rgb(193, 154, 107)" flatShading/>
        </mesh>
        <mesh ref={fenceRef} scale={[50,.5,50]} side={THREE.BackSide} position={[450,-47,0]}>
          <Cylinder args={[1, 1, 1, 64, 1, true]} >
          <meshLambertMaterial attach="material" color="rgb(193, 154, 107)" side={THREE.DoubleSide} receiveShadow castShadow/>
          </Cylinder>
        </mesh>
        <mesh ref={fenceRef} scale={[50,.5,50]} side={THREE.BackSide} position={[450,-48,0]}>
          <Cylinder args={[1, 1, 1, 64, 1, true]} color="brown">
          <meshLambertMaterial attach="material" color="rgb(193, 154, 107)" side={THREE.DoubleSide} receiveShadow castShadow/>
          </Cylinder>
        </mesh>
        <mesh ref={fenceRef} scale={[50,.5,50]} side={THREE.BackSide} position={[450,-49,0]}>
          <Cylinder args={[1, 1, 1, 64, 1, true]} color="brown">
          <meshLambertMaterial attach="material" color="rgb(193, 154, 107)" side={THREE.DoubleSide} receiveShadow castShadow/>
          </Cylinder>
        </mesh>
    
    
        {/* <OrbitingMeshFour /> */}
        <OrbitingMeshThree />
        
        <TextRing>
          ABOUT ME
        </TextRing>
      </mesh>
    )
  }




export default IslandTwo;