import { useState, useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber"
import { useCursor, Cylinder, RoundedBox} from '@react-three/drei'
import * as THREE from 'three'
import { OrbitingMeshThree,OrbitingMeshFour } from "../station1/satelite";
import Grass from "./Grass.png"
import { act } from "react-dom/test-utils";
import Resume from "./Resume.pdf"

function Banners(props) {
  const loader = new THREE.TextureLoader();

  const grassTexture = loader.load(Grass)
  function ccccc(children, color) {
    const fontSize = 500
  
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
  
  function TextRing({ children, position }) {
  
    const canvas = useMemo(() => {
      return ccccc(children, "darkblue")
    }, [children])
  
  
    const texture = useRef()

    useFrame(({ clock }) => {
      texture.current.offset.x = clock.getElapsedTime() / 9
    })
  
    const cylArgs = [1, 1, 1, 64, 1, true]
  
    return (
      <group rotation-y={Math.PI / 4} scale={[5, 5, 5]} position={position}>
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
  const boardRef = useRef(null)
  const [git, setGit] = useState(false)
  const [linked, setLinked] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])
  
  useCursor(active)
  
    useFrame(() => {
      rise += risespeed
      boardRef.current.receiveShadow = true;
      boardRef.current.castShadow = true;
      // leftRef.current.position.y = 0;
      // leftRef.current.receiveShadow = true;
      // leftRef.current.castShadow = true;
      
   
    })
  
  

  
  
    return (
      <mesh >
        {/* <mesh ref={boardRef} scale={active ?[1.2,1.2,1]: [1,1,1] }onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)} rotation={[0, -Math.PI / 1.5, 0]} position={[460,-43,0]} >
          <RoundedBox  args={[15, 10, 2]} radius={1} >
          <meshStandardMaterial  attach="material" color={"lightgrey"} flatShading />
          </RoundedBox>
        </mesh> */}
          <mesh ref={boardRef} scale={active ? [1.2, 1.2, 1] : [1, 1, 1]} onClick={() => { window.open({Resume}, "_blank"); }} onPointerOver={() => { setActive(true); setHovered(true) }} onPointerOut={() => { setActive(false); setHovered(false)}} rotation={[0, -Math.PI / 2, 0]} position={[460,-43,0]}>
          <sphereGeometry  args={[4, 15, 15, 0]}  >
          </sphereGeometry>
            <meshStandardMaterial  attach="material" color={"white"} flatShading />
        </mesh>
        <mesh ref={boardRef} scale={linked ? [1.2, 1.2, 1] : [1, 1, 1]} onClick={() => { window.open("https://www.linkedin.com/in/lawrenceyee91/", "_blank"); }} onPointerOver={() => { setLinked(true); setHovered(true) }} onPointerOut={() => { setLinked(false); setHovered(false)}} rotation={[0, -Math.PI / 2, 0]} position={[455,-43,20]}>
          <sphereGeometry  args={[4, 15, 15, 0]}  >
          </sphereGeometry>
            <meshStandardMaterial  attach="material" color={"lightblue"} flatShading />
        </mesh>
        <mesh ref={boardRef} scale={git ? [1.2, 1.2, 1] : [1, 1, 1]} onClick={() => { window.open("https://github.com/Newbz521", "_blank"); }} onPointerOver={() => { setGit(true); setHovered(true) }} onPointerOut={() => { setGit(false);  setHovered(false)}} rotation={[0, Math.PI + .5, 0]} position={[474,-43,-12]}>
          <sphereGeometry  args={[4, 15, 15, 0]}  >
          </sphereGeometry>
            <meshStandardMaterial  attach="material" color={"grey"} flatShading />
        </mesh>
       
        
        <TextRing position={[455,-43,20]}>
          LinkedIn
        </TextRing>
        <TextRing position={[474,-43,-12]}>
          GitHub
        </TextRing>
        <TextRing position={[460,-43,0]}>
          Resume
        </TextRing>

        
      </mesh>
    )
  }




export default Banners;