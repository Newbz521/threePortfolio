import { useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber"
import { useCursor, Cylinder, RoundedBox} from '@react-three/drei'
import * as THREE from 'three'
import { OrbitingMeshThree,OrbitingMeshFour } from "../station1/satelite";
import Propel from "../station1/propel";
import { act } from "react-dom/test-utils";


function IslandThree(props) {
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
      <group rotation-y={Math.PI / 4} scale={[80, 80, 80]} position={[300,50,-500]}>
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

  useCursor(active)
  
    useFrame(() => {
      rise += risespeed
      // leftRef.current.position.y = 0;
      leftRef.current.receiveShadow = true;
      
      // leftRef.current.castShadow = true;
      

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

      
        <mesh ref={platRef} position={[300,48,-500]} onClick={() => {  props.setPreset(8)}} >
          <cylinderGeometry args={[65, 65, 2]} />
          <meshStandardMaterial color="lightgreen"  />
        </mesh>
       
        <mesh  position={[300,32,-500]} onClick={() => { props.setPreset(8) }} >
          <cylinderGeometry args={[70, 10, 30]} />
          <meshStandardMaterial color="lightgrey"  flatShading />
        </mesh>
        <mesh ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[300,47,-500]} >
          <sphereGeometry args={[70, 20,20, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="blue"  transparent opacity={.03} />
        </mesh>
        
       
  
    
    
    
        {/* <OrbitingMeshFour /> */}
        {/* <OrbitingMeshThree /> */}
        <Propel location={[300,14,-500]} />

        <TextRing>
          BIO
        </TextRing>
      </mesh>
    )
  }




export default IslandThree;