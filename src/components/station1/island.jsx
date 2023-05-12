import {useState, useRef,useMemo } from "react";

import { useFrame } from "@react-three/fiber"
import {useCursor, Text3D, Text,  Cylinder, MeshWobbleMaterial, Icosahedron} from '@react-three/drei'

import * as THREE from 'three'


function Island(props) {

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
    useFrame(({ clock }) => {
      texture.current.offset.x = clock.getElapsedTime() / 9
    })
  
    const cylArgs = [1, 1, 1, 60, 1, true]
  
    return (
      <group rotation-y={Math.PI / 4} scale={[60, 60, 60]} >
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
    let risespeed = .005;

  const textRef = useRef()
    const leftRef = useRef(null);
    const domeRef = useRef(null);
  const platRef = useRef(null)
  const [zoom, setZoom] = useState(false)
  const [active, setActive] = useState(false)
  const radius = 70;
  const speed = 0.2;
  useCursor(active)
  



    useFrame(({ clock }) => {
      // rise += risespeed
      const angle = clock.getElapsedTime() * speed;
      // leftRef.current.position.y = 0;
      leftRef.current.receiveShadow = true;
      // leftRef.current.castShadow = true;
      // leftRef.current.position.y = 1.5 * Math.sin(rise) 
     
      // platRef.current.receiveShadow = true;
      platRef.current.castShadow = true;
      // textRef.current.position.set(Math.cos(angle) * radius, 10, Math.sin(angle) * radius);


      // domeRef.current.castShadow = true;
      // domeRef.current.receiveShadow = true;
    })
  
  

  
  
    return (
      <mesh ref={leftRef}>
 
      
        <mesh ref={platRef} position={[0,-1.5,0]} onClick={() => { if (!zoom) { props.setPreset(2) } else { props.setPreset(0) }; setZoom(!zoom) }} >
          <cylinderGeometry args={[48, 48, 3]} />
          <meshStandardMaterial color="darkgrey" />
        </mesh>
       
        <mesh  position={[0,-22,0]} onClick={() => { if (!zoom) { props.setPreset(2) } else { props.setPreset(0) }; setZoom(!zoom) }}>
          <cylinderGeometry args={[55, 5, 38]} />
          <meshStandardMaterial color="pink"  flatShading />
        </mesh>
        <mesh ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,-3,0]} >
          <sphereGeometry args={[55, 20,20, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="blue" transparent opacity={.1}/>
        </mesh>
        <TextRing>
          PROJECTS ISLAND
        </TextRing>
      </mesh>
    )
  }




export default Island;