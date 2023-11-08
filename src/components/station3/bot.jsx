import { useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber"
import { useCursor, Cylinder, RoundedBox, Text3D, Text} from '@react-three/drei'
import * as THREE from 'three'
import { OrbitingMeshThree,OrbitingMeshFour } from "../station1/satelite";
import Propel from "../station1/propel";
import { act } from "react-dom/test-utils";
import Texter from "./texter.jsx"


export function Bot({position, rotation}) {
  // const loader = new THREE.TextureLoader();
  // const grassTexture = loader.load(Grass)
  

    let rise = 0;
    let risespeed = 0.05;
  const leftRef = useRef(null);
  const textRef= useRef(null)
  const domeRef = useRef(null);
  const platRef = useRef(null)
  const rightArmRef = useRef(null)
  const moveRef = useRef(null)
  const [zoom, setZoom] = useState(false)
  const [active, setActive] = useState(false)

  useCursor(active)
  
    useFrame(() => {
      rise += risespeed
      // leftRef.current.position.y = 0;
      leftRef.current.receiveShadow = true;
      // moveRef.current.position.x = 2 * Math.sin(rise)
      // moveRef.current.position.y = .2 * Math.sin(rise)
      
      
      // leftRef.current.castShadow = true;
      // textRef.quaternion.copy(camera.quaternion)

      // platRef.current.receiveShadow = true;
      platRef.current.castShadow = true;
      rightArmRef.current.rotation.z = .3 * Math.sin(rise) 
      // domeRef.current.castShadow = true;
      // domeRef.current.receiveShadow = true;
      // domeRef.current.flatShading = true;
 
      // domeRef.current.castShadow = true;
      // domeRef.current.receiveShadow = true;
    })
  
  

  
  
  return (
      <mesh ref={moveRef}>
      
      
      <mesh ref={leftRef} rotation={rotation} position={position}>

        {/* <mesh scale={[1,.75,1]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,2.75,0]} >
          <sphereGeometry args={[.85, 15,15, 1]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
        </mesh> */}
         <mesh scale={[1,.85,.6]} ref={domeRef} rotation={[0, 0, 0]} position={[0,2.75,0]} >
          <sphereGeometry args={[.85, 15,15, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
        </mesh>
        <mesh scale={[1,.85,1]} ref={domeRef} rotation={[0, Math.PI , 0]} position={[0,2.75,0]} >
          <sphereGeometry args={[.85, 15,15, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
        </mesh>
        <mesh scale={[.7,.6,.2]} ref={domeRef} rotation={[0, 0, 0]} position={[0,2.75,0.37]} >
          <sphereGeometry args={[.85, 15,15, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="black"  transparent opacity={1} />
        </mesh>
        
        <mesh ref={platRef} position={[0,0,0]}  >
          <cylinderGeometry args={[1, .5, 3]} />
          <meshStandardMaterial color="white"  />
        </mesh>
        <mesh scale={[1,1,.5]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,1.5,0]} >
          <sphereGeometry args={[1, 15,15, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
        </mesh>
        <mesh scale={[1,1,.75]} ref={domeRef} rotation={[Math.PI / 2, 0, 0]} position={[0,-1.5,0]} >
          <sphereGeometry args={[.5, 15,15, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
        </mesh>

        <mesh  scale={[.5,1,1]} position={[-1.15,.2,0]}>
          <mesh  ref={domeRef} rotation={[0, 0, 0]} position={[0,0,0]} >
            <cylinderGeometry args={[.3, .2, 2]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
          </mesh>
          <mesh scale={[1,1,.75]} ref={domeRef} rotation={[Math.PI / 2, 0, 0]} position={[0,-1,0]} >
            <sphereGeometry args={[.2, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
          </mesh>
          <mesh scale={[1,1,.75]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,1,0]} >
          <sphereGeometry args={[.3, 15,15, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
          </mesh>
        </mesh>
        

        <mesh ref={rightArmRef} scale={[.5,1,1]} position={[1.25,1.5,0]}>
          <mesh  ref={domeRef} rotation={[0, 0, 0]} position={[0,1,0]} >
            <cylinderGeometry args={[.2, .3, 2]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
          </mesh>
          <mesh scale={[1,1,.75]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,2,0]} >
            <sphereGeometry args={[.2, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
          </mesh>
          <mesh scale={[1,1,.75]} ref={domeRef} rotation={[Math.PI / 2, 0, 0]} position={[0,0,0]} >
          <sphereGeometry args={[.3, 15,15, 0, Math.PI]} />
          <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
          </mesh>
        </mesh>
        {/* <mesh  position={[0,0,0]}>
          <cylinderGeometry args={[73, 10, 36]} />
          <meshStandardMaterial color="lightgrey"  flatShading />
        </mesh> */}
  <mesh position={[0, 2.75, .55]} >
          <Text
        scale={[.5, .5, .5]}
        color="lightblue" // default
        >
            ^_^
          </Text>
            </mesh>
       
      </mesh>
      </mesh>
        
    )
  }

  export function BotTwo({position, rotation}) {
    // const loader = new THREE.TextureLoader();
    // const grassTexture = loader.load(Grass)
    
  
      let rise = 0;
      let risespeed = 0.05;
    const leftRef = useRef(null);
    const textRef= useRef(null)
    const domeRef = useRef(null);
    const platRef = useRef(null)
    const rightArmRef = useRef(null)
    const moveRef = useRef(null)
    const [zoom, setZoom] = useState(false)
    const [active, setActive] = useState(false)
  
    useCursor(active)
    
      useFrame(() => {
        rise += risespeed
        // leftRef.current.position.y = 0;
        leftRef.current.receiveShadow = true;
        // moveRef.current.position.x = 2 * Math.sin(rise)
        // moveRef.current.position.y = -.2 * Math.sin(rise)
        
        
        // leftRef.current.castShadow = true;
        // textRef.quaternion.copy(camera.quaternion)
  
        // platRef.current.receiveShadow = true;
        platRef.current.castShadow = true;
        rightArmRef.current.rotation.z = .3 * Math.sin(rise) 
        // domeRef.current.castShadow = true;
        // domeRef.current.receiveShadow = true;
        // domeRef.current.flatShading = true;
   
        // domeRef.current.castShadow = true;
        // domeRef.current.receiveShadow = true;
      })
    
    
  
    
    
    return (
        <mesh ref={moveRef}>
        
        
        <mesh ref={leftRef} rotation={rotation} position={position}>
  
          {/* <mesh scale={[1,.75,1]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,2.75,0]} >
            <sphereGeometry args={[.85, 15,15, 1]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
          </mesh> */}
           <mesh scale={[1,.85,.6]} ref={domeRef} rotation={[0, 0, 0]} position={[0,2.75,0]} >
            <sphereGeometry args={[.85, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
          </mesh>
          <mesh scale={[1,.85,1]} ref={domeRef} rotation={[0, Math.PI , 0]} position={[0,2.75,0]} >
            <sphereGeometry args={[.85, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
          </mesh>
          <mesh scale={[.7,.6,.2]} ref={domeRef} rotation={[0, 0, 0]} position={[0,2.75,0.37]} >
            <sphereGeometry args={[.85, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="black"  transparent opacity={1} />
          </mesh>
          
          <mesh ref={platRef} position={[0,0,0]}  >
            <cylinderGeometry args={[1, .5, 3]} />
            <meshStandardMaterial color="white"  />
          </mesh>
          <mesh scale={[1,1,.5]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,1.5,0]} >
            <sphereGeometry args={[1, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
          </mesh>
          <mesh scale={[1,1,.75]} ref={domeRef} rotation={[Math.PI / 2, 0, 0]} position={[0,-1.5,0]} >
            <sphereGeometry args={[.5, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
          </mesh>
  
          <mesh  scale={[.5,1,1]} position={[-1.15,.2,0]}>
            <mesh  ref={domeRef} rotation={[0, 0, 0]} position={[0,0,0]} >
              <cylinderGeometry args={[.3, .2, 2]} />
              <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
            </mesh>
            <mesh scale={[1,1,.75]} ref={domeRef} rotation={[Math.PI / 2, 0, 0]} position={[0,-1,0]} >
              <sphereGeometry args={[.2, 15,15, 0, Math.PI]} />
              <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
            </mesh>
            <mesh scale={[1,1,.75]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,1,0]} >
            <sphereGeometry args={[.3, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
            </mesh>
          </mesh>
          
  
          <mesh ref={rightArmRef} scale={[.5,1,1]} position={[1.25,1.5,0]}>
            <mesh  ref={domeRef} rotation={[0, 0, 0]} position={[0,1,0]} >
              <cylinderGeometry args={[.2, .3, 2]} />
              <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
            </mesh>
            <mesh scale={[1,1,.75]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,2,0]} >
              <sphereGeometry args={[.2, 15,15, 0, Math.PI]} />
              <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
            </mesh>
            <mesh scale={[1,1,.75]} ref={domeRef} rotation={[Math.PI / 2, 0, 0]} position={[0,0,0]} >
            <sphereGeometry args={[.3, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
            </mesh>
          </mesh>
          {/* <mesh  position={[0,0,0]}>
            <cylinderGeometry args={[73, 10, 36]} />
            <meshStandardMaterial color="lightgrey"  flatShading />
          </mesh> */}
    <mesh position={[0, 2.75, .55]} >
            <Text
          scale={[.5, .5, .5]}
          color="lightblue" // default
          >
              ^_^
            </Text>
              </mesh>
         
        </mesh>
        </mesh>
          
      )
  }
    
  export function Statue({position, rotation}) {
    // const loader = new THREE.TextureLoader();
    // const grassTexture = loader.load(Grass)
    
  
      let rise = 0;
      let risespeed = 0.05;
    const leftRef = useRef(null);
    const textRef= useRef(null)
    const domeRef = useRef(null);
    const platRef = useRef(null)
    const rightArmRef = useRef(null)
    const leftArmRef = useRef(null)
    const moveRef = useRef(null)
    const lightRef = useRef(null)
    const light2Ref = useRef(null)
    const light3Ref = useRef(null)
    const targetRef = useRef(null)
    const hatRef=useRef(null)

    const [zoom, setZoom] = useState(false)
    const [active, setActive] = useState(false)
  
    useCursor(active)
    
      useFrame(() => {
        rise += risespeed
  
        domeRef.current.castShadow = true;
        domeRef.current.receiveShadow = true;
        rightArmRef.current.rotation.x = - Math.PI * .7
        rightArmRef.current.rotation.z =  Math.PI * 2.2
        leftArmRef.current.rotation.z =  -Math.PI * 2.08
        hatRef.current.rotation.x = -Math.PI * .2

      })
    
    
  
    
    
    return (
        <mesh ref={moveRef} >
        
        
        <mesh scale={[6.5,6.5,6.5]} ref={leftRef} rotation={rotation} position={position}>
  
          {/* <mesh scale={[1,.75,1]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,2.75,0]} >
            <sphereGeometry args={[.85, 15,15, 1]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="white"  transparent opacity={1} />
          </mesh> */}
           <mesh scale={[1,.85,.6]} ref={domeRef} rotation={[0, 0, 0]} position={[0,2.75,0]} >
            <sphereGeometry args={[.85, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="lightgreen"  transparent opacity={1}  clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
          </mesh>
          <mesh scale={[1,.85,1]} ref={domeRef} rotation={[0, Math.PI , 0]} position={[0,2.75,0]} >
            <sphereGeometry args={[.85, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="lightgreen"  transparent opacity={1}  clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
          </mesh>
          <mesh scale={[.7,.6,.2]} ref={domeRef} rotation={[0, 0, 0]} position={[0,2.75,0.37]} >
            <sphereGeometry args={[.85, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="lightgreen"  transparent opacity={1} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
          </mesh>
          
          <mesh ref={domeRef} position={[0,0,0]}  >
            <cylinderGeometry args={[1, .5, 3]} />
            <meshStandardMaterial  color="lightgreen" clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5} />
          </mesh>
          <mesh scale={[1,1,.5]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,1.5,0]} >
            <sphereGeometry args={[1, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="lightgreen"  transparent opacity={1} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
          </mesh>
          <mesh scale={[1,1,.75]} ref={domeRef} rotation={[Math.PI / 2, 0, 0]} position={[0,-1.5,0]} >
            <sphereGeometry args={[.5, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="lightgreen"  transparent opacity={1} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
          </mesh>

          <mesh ref={leftArmRef} scale={[.5,1,1]} position={[-.9,2.1,0]}>
            <mesh  ref={domeRef} rotation={[0, 0, 0]} position={[0,-2,0]} >
              <cylinderGeometry args={[.3, .2, 2]} />
              <meshStandardMaterial side={THREE.DoubleSide} color="lightgreen"  transparent opacity={1} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5} />
            </mesh>
            <mesh scale={[1,1,.75]} ref={domeRef} rotation={[Math.PI / 2, 0, 0]} position={[0,-3,0]} >
              <sphereGeometry args={[.2, 15,15, 0, Math.PI]} />
              <meshStandardMaterial side={THREE.DoubleSide} color="lightgreen"  transparent opacity={1} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5} />
            </mesh>
            <mesh scale={[1,1,.75]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,-1,0]} >
            <sphereGeometry args={[.3, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="lightgreen"  transparent opacity={1} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
            </mesh>
          </mesh>
          
  
          <mesh ref={rightArmRef} scale={[.5,1,1]} position={[.6,1,-.5]}>
            <mesh  ref={domeRef} rotation={[0, 0, 0]} position={[0,-2,0]} >
              <cylinderGeometry args={[.3, .2, 2]} />
              <meshStandardMaterial side={THREE.DoubleSide} color="lightgreen"  transparent opacity={1} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
            </mesh>
            <mesh scale={[1,1,.75]} ref={domeRef} rotation={[Math.PI / 2, 0, 0]} position={[0,-3,0]} >
              <sphereGeometry args={[.2, 15,15, 0, Math.PI]} />
              <meshStandardMaterial side={THREE.DoubleSide} color="lightgreen"  transparent opacity={1}clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
            </mesh>
            <mesh scale={[1,1,.75]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,-1,0]} >
            <sphereGeometry args={[.3, 15,15, 0, Math.PI]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="lightgreen"  transparent opacity={1} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
            </mesh>
          </mesh>
          <mesh scale={[1,1,.75]} ref={domeRef} rotation={[0,0,0]} position={[2.25,2.5,1.75]} >
            <cylinderGeometry args={[.3,0,1]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="lightgreen"  transparent opacity={1} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
          </mesh>
          <mesh scale={[1,.75,1.2]} ref={domeRef} rotation={[0,0,0]} position={[-1,0,0]} >
            <boxGeometry args={[.3,1,1]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="lightgreen"  transparent opacity={1} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
          </mesh>
      
         <mesh position={[0, 2.75, .55]} >
            <Text
          scale={[.5, .5, .5]}
          color="lightblue" // default
          >
              ^_^
            </Text>
              </mesh>
          <mesh scale={[7,7,2]} ref={domeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0,-2.5,0]} >
            <sphereGeometry args={[.3, 0,3, 0, Math.PI]} />
            <meshStandardMaterial flatShading side={THREE.DoubleSide} emissive="#404057" transparent opacity={1} />
          </mesh>


          <mesh ref={hatRef} position={[0,-.07,2]}>
          <mesh ref={domeRef} position={[0,4,0]}  >
            <cylinderGeometry args={[.65, .65, .25, 64,1, true]} />
            <meshStandardMaterial color="lightgreen" side={THREE.DoubleSide} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
          </mesh>
          <mesh ref={domeRef} rotation={[Math.PI * 1.5,0,0]} position={[0,4,.77]}  >
            <cylinderGeometry args={[.1, 0, .25, 64,1, false]} />
            <meshStandardMaterial color="lightgreen" side={THREE.DoubleSide} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
          </mesh>

          
          <mesh ref={domeRef} rotation={[0,0,Math.PI * 1.5]} position={[-.77,4,0]}  >
            <cylinderGeometry args={[.1, 0, .25, 64,1, false]} />
            <meshStandardMaterial color="lightgreen" side={THREE.DoubleSide} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
          </mesh>
          <mesh ref={domeRef} rotation={[0,0,-Math.PI * 1.5]} position={[.77,4,0]}  >
            <cylinderGeometry args={[.1, 0, .25, 64,1, false]} />
            <meshStandardMaterial color="lightgreen" side={THREE.DoubleSide} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
          </mesh>
          <mesh ref={domeRef} rotation={[0,-Math.PI * 2.25,-Math.PI * 1.5]} position={[.55,4,.55]}  >
            <cylinderGeometry args={[.1, 0, .25, 64,1, false]} />
            <meshStandardMaterial color="lightgreen" side={THREE.DoubleSide} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
          </mesh>
          <mesh ref={domeRef} rotation={[0,Math.PI * 2.25,Math.PI * 1.5]} position={[-.55,4,.55]}  >
            <cylinderGeometry args={[.1, 0, .25, 64,1, false]} />
            <meshStandardMaterial  color="lightgreen" side={THREE.DoubleSide} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={.5}/>
            </mesh>
            </mesh>
        </mesh>
        {/* <OrbitingMeshFour /> */}
        


        </mesh>
          
      )
    }


// export default Bot;