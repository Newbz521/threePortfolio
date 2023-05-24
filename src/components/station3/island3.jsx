import { useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber"
import { MeshReflectorMaterial,useCursor, Cylinder, RoundedBox, Text3D, Text, Html} from '@react-three/drei'
import * as THREE from 'three'
import { OrbitingMeshThree,OrbitingMeshFour } from "../station1/satelite";
import Propel from "../station1/propel";
import { act } from "react-dom/test-utils";
import { useControls } from "leva";
import Texter from "./texter.jsx"
import { Bot,BotTwo, Statue } from "./bot";
import { Arch } from "./arch";

function IslandThree(props) {
  // const loader = new THREE.TextureLoader();
  // const grassTexture = loader.load(Grass)
  function ccccc(children, color) {
    const fontSize = 400
  
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
      <group rotation-y={Math.PI / 4} scale={[80, 80, 80]} position={[300,0,-500]}>
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
  function TextRingTwo({ children }) {
  
    const canvas = useMemo(() => {
      return ccccc(children, "white")
    }, [children])
  
 
  
    const texture = useRef()

    useFrame(({ clock }) => {
      texture.current.offset.x = clock.getElapsedTime() / 9
    })
  
    const cylArgs = [1, 1, .5, 64, 1, true]
  
    return (
      <group rotation-y={Math.PI / 4} scale={[15, 20, 15]} position={[300, 55, -470]}>
        {/* <primitive object={target.texture} ref={texture} wrapS={THREE.RepeatWrapping} wrapT={THREE.RepeatWrapping} repeat={[1, 1]} /> */}
  
        <Cylinder args={cylArgs} side={THREE.FrontSide}>
          <meshStandardMaterial transparent opacity={1} attach="material">
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
  const textRef= useRef(null)
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
      // textRef.quaternion.copy(camera.quaternion)

      // platRef.current.receiveShadow = true;
      // platRef.current.castShadow = true;
      // domeRef.current.castShadow = true;
      // domeRef.current.receiveShadow = true;
      // domeRef.current.flatShading = true;
 
      // domeRef.current.castShadow = true;
      // domeRef.current.receiveShadow = true;
    })
  
  

  
  
    return (
      <mesh ref={leftRef}>
 
        <mesh ref={platRef} position={[300,48,-500]} onClick={() => {  props.setPreset(8)}} >
          <cylinderGeometry args={[65, 65, 2, 100]} />
          <meshStandardMaterial color="blue" transparent opacity={.6}  />
    
        </mesh>
       
        <mesh  position={[300,29,-500]} onClick={() => { props.setPreset(8) }} >
          <cylinderGeometry args={[67, 10, 36]} />
          <meshStandardMaterial color="lightgrey"  flatShading />
        </mesh>
        {/* <mesh ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[300,47,-500]} >
          <sphereGeometry args={[70, 20,20, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="blue"  transparent opacity={.03} />
        </mesh> */}
        <mesh position={[300, 105, -470]} rotation={[-Math.PI / 1.2, 0, -Math.PI]}>
          <Html distanceFactor={175}>
            <div className="chat-bubble">Hi, welcome to Lawrence's Land!</div>
          </Html>
        </mesh>

        <mesh position={[300, 51, -500]} rotation={[-Math.PI / 1.2, 0, -Math.PI]}>
          <Text
        scale={[3, 3, 3]}
            color="white" // default
            resolution={1000}
        >
           Software engineer with a background in architecture,
          </Text>
        </mesh>
        <mesh position={[300,51,-510]} rotation={[-Math.PI / 1.2,0,-Math.PI ]}>
          <Text
        scale={[3, 3, 3]}
            color="white" // default
            resolution={1000}
        >
            I have a foundation in mathematics, physics, and visualization approach
          </Text>
        </mesh>
        <mesh position={[300,51,-520]} rotation={[-Math.PI / 1.2,0,-Math.PI ]}>
          <Text
        scale={[3, 3, 3]}
            color="white" // default
            resolution={1000}
        >
             to software development from a rigorous and analytical perspective.
          </Text>
        </mesh>
        <mesh position={[300,51,-530]} rotation={[-Math.PI / 1.2,0,-Math.PI ]}>
          <Text
        scale={[3, 3, 3]}
            color="white" // default
            resolution={1000}
        >
             With a keen eye for design and an emphasis on user experience,
          </Text>
        </mesh>
        <mesh position={[300,51,-540]} rotation={[-Math.PI / 1.2,0,-Math.PI ]}>
          <Text
        scale={[3, 3, 3]}
            color="white" // default
            resolution={1000}
        >
              I strive to create elegant and intuitive software solutions
          </Text>
        </mesh>
        <mesh position={[300,51,-550]} rotation={[-Math.PI / 1.2,0,-Math.PI ]}>
          <Text
        scale={[3, 3, 3]}
            color="white" // default
            resolution={1000}
          
        >
            that meet the needs of clients and users alike.
          </Text>
       
        </mesh>
        
       
  
    
    
    
        {/* <OrbitingMeshFour /> */}
        {/* <OrbitingMeshThree /> */}
        <Propel location={[300, 9, -500]} />
        <BotTwo position={[332, 52, -470]} rotation={[0, Math.PI, 0]} />
        <Bot position={[329, 52, -473]} rotation={[0, Math.PI, 0]} />
        <BotTwo position={[326, 52, -470]} rotation={[0, Math.PI, 0]} />
        <Bot position={[323, 52, -473]} rotation={[0, Math.PI, 0]} />
        <BotTwo position={[320, 52, -470]} rotation={[0, Math.PI, 0]} />

        <Bot position={[283, 52, -473]} rotation={[0, Math.PI, 0]} />
        <BotTwo position={[280, 52, -470]} rotation={[0, Math.PI, 0]} />
        <Bot position={[277, 52, -473]} rotation={[0, Math.PI, 0]} />
        <BotTwo position={[274, 52, -470]} rotation={[0, Math.PI, 0]} />
        <Bot position={[271, 52, -473]} rotation={[0, Math.PI, 0]} />

        <Statue position={[300, 65, -470]} rotation={[0, Math.PI, 0]} />
        
        {/* <Arch position={[335, 47, -510]} />
        <Arch position={[265,47,-510]} /> */}
        <TextRing>
          BIO
        </TextRing>
        {/* <TextRingTwo>
          Lawrence
        </TextRingTwo> */}
      </mesh>
    )
  }




export default IslandThree;