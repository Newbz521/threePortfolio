import { useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber"
import { useCursor, Cylinder} from '@react-three/drei'
import * as THREE from 'three'
import { OrbitingMeshThree,OrbitingMeshFour } from "../station1/satelite";


function IslandTwo(props) {

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
      texture.current.offset.x = clock.getElapsedTime() / 2
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
    let risespeed = .015;
    const [hovered, setHover] = useState(false)
    const loader = new THREE.TextureLoader();
    const volumeRef = useRef(null);
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
      leftRef.current.position.y = 1.5 * Math.sin(rise) 
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
 
      
        <mesh ref={platRef} position={[450,-51,0]} onClick={() => {  props.setPreset(7)}} >
          <cylinderGeometry args={[60, 60, 2]} />
          <meshStandardMaterial color="green" />
        </mesh>
       
        <mesh  position={[450,-68,0]} onClick={() => { props.setPreset(7) }} >
          <cylinderGeometry args={[70, 10, 30]} />
          <meshStandardMaterial color="lightgrey"  flatShading clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25}/>
        </mesh>
        <mesh ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[450,-53,0]} >
          <sphereGeometry args={[70, 20,20, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="blue" clearcoat={1} transparent opacity={.1} clearcoatRoughness={0} roughness={0} metalness={0.25}/>
        </mesh>
        
        <mesh scale={[.9,.9,.5]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[450,-27,0]}  >
          <sphereGeometry args={[20, 8,7, 40]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="pink" flatShading/>
        </mesh>
        <mesh scale={[.4,.4,.2]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[450,-34,12.5]}  >
          <sphereGeometry args={[20, 5,5, 0]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="pink" flatShading/>
        </mesh>
        <mesh scale={[.2,.2,.1]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[455,-39,-8.5]}  >
          <sphereGeometry args={[20, 5,5, 0]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="pink" flatShading/>
        </mesh>
        <mesh  ref={domeRef} rotation={[0, 0, 0]} position={[450,-43,0]}  >
          <cylinderGeometry args={[2, 3, 17]}  />
          <meshStandardMaterial side={THREE.DoubleSide} color="rgb(193, 154, 107)" flatShading />
        </mesh>
        <mesh  ref={domeRef} rotation={[1, 0, 0]} position={[450,-40,5]}  >
          <cylinderGeometry args={[.5, 2, 15]}  />
          <meshStandardMaterial side={THREE.DoubleSide} color="rgb(193, 154, 107)" flatShading />
        </mesh>

        <mesh  ref={domeRef} rotation={[-1, 0, -.5]} position={[453.5,-42,-5]}  >
          <cylinderGeometry args={[.3, 1, 10]}  />
          <meshStandardMaterial side={THREE.DoubleSide} color="rgb(193, 154, 107)" flatShading/>
        </mesh>
        <mesh ref={fenceRef} scale={[50,.5,50]} side={THREE.BackSide} position={[450,-47,0]}>
          <Cylinder args={[1, 1, 1, 64, 1, true]} >
          <meshStandardMaterial attach="material" color="rgb(193, 154, 107)" side={THREE.DoubleSide} receiveShadow castShadow/>
          </Cylinder>
        </mesh>
        <mesh ref={fenceRef} scale={[50,.5,50]} side={THREE.BackSide} position={[450,-48,0]}>
          <Cylinder args={[1, 1, 1, 64, 1, true]} color="brown">
          <meshStandardMaterial attach="material" color="rgb(193, 154, 107)" side={THREE.DoubleSide} receiveShadow castShadow/>
          </Cylinder>
        </mesh>
        <mesh ref={fenceRef} scale={[50,.5,50]} side={THREE.BackSide} position={[450,-49,0]}>
          <Cylinder args={[1, 1, 1, 64, 1, true]} color="brown">
          <meshStandardMaterial attach="material" color="rgb(193, 154, 107)" side={THREE.DoubleSide} receiveShadow castShadow/>
          </Cylinder>
        </mesh>
    
    
        <OrbitingMeshFour />
        <OrbitingMeshThree />
        
        <TextRing>
          ABOUT ME
        </TextRing>
      </mesh>
    )
  }




export default IslandTwo;