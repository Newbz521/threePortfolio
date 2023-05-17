import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, AdaptiveDpr, AdaptiveEvents, useGLTF, useHelper } from '@react-three/drei/native'

import * as THREE from 'three'

export function OrbitingMesh(props) {
  const meshRef = useRef();
  const targetRef = useRef()
  const lightRef = useRef()

  const radius = 70;
  const speed = 0.08;

  useFrame(({ clock }) => {
    const angle = clock.getElapsedTime() * speed;
    meshRef.current.position.set(Math.cos(angle) * radius, 10, Math.sin(angle) * radius);
  });

  return (
    <mesh ref={meshRef} {...props}>
      <mesh position={[0,4.5,0]}>
        <cylinderGeometry args={[9, 2, 5]}  />
      <meshStandardMaterial  />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0,7,0]} >
          <sphereGeometry args={[9, 20,20, 0, Math.PI]} />
          <meshStandardMaterial color="blue"  transparent opacity={.1} />
      </mesh>
      <spotLight castShadow ref={lightRef} angle={.4} position={[0,1.5,0]} color={"white"} intensity={.4}  penumbra={0.2} />
        <mesh ref={targetRef} position={[0, 1, 0]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="white" />
        </mesh>
    </mesh>
  );
}

export function OrbitingMeshTwo(props) {
  const meshRef = useRef();
  const targetRef = useRef()
  const lightRef = useRef()

  const radius = 55;
  const speed = 0.1;

  useFrame(({ clock }) => {
    const angle =  clock.getElapsedTime() * - speed;
    
    meshRef.current.position.set(Math.cos(angle) * radius, 10, Math.sin(angle) * radius);
  });

  return (
    <mesh ref={meshRef} {...props}>
      <mesh position={[0, 17.5, 0]}>
        <cylinderGeometry args={[9, 2, 5]} />
        <meshStandardMaterial />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 20, 0]} >
        <sphereGeometry args={[9, 20, 20, 0, Math.PI]} />
        <meshStandardMaterial color="blue" transparent opacity={.05} />
      </mesh>
      <spotLight castShadow ref={lightRef} angle={.4} position={[0, 15, 0]} color={"white"} intensity={.8} penumbra={0.2} />
      <mesh ref={targetRef} position={[0, 15, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial attach="material"color="white"  />
      </mesh>
    </mesh>
  );
}


export function OrbitingMeshThree(props) {
  const meshRef = useRef();
  const targetRef = useRef()
  const lightRef = useRef()
  const middleRef = useRef()
  const radius = 120;
  const speed = 0.08;

  useFrame(({ clock }) => {
    const angle = clock.getElapsedTime() * speed;
    meshRef.current.position.set(Math.cos(angle) * radius, 10, Math.sin(angle) * radius);

    lightRef.current.target = middleRef.current
  });

  return (
    <>
    <mesh ref={meshRef} {...props}>
      <mesh position={[450,4.5,0]}>
        <cylinderGeometry args={[9, 2, 5]}  />
      <meshStandardMaterial color="rgb(255, 172, 28)" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[450,7,0]} >
          <sphereGeometry args={[9, 20,20, 0, Math.PI]} />
          <meshStandardMaterial color="blue"  transparent opacity={.1} />
      </mesh>
        <spotLight  castShadow ref={lightRef} angle={.2} position={[450, 1.5, 0]} color={"white"} intensity={.4} penumbra={0.1} >

      </spotLight>
        <mesh ref={targetRef} position={[450, 1.5, 0]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="white" />
      </mesh>
    </mesh>
      <mesh ref={middleRef} position={[450,-35,0]}></mesh>
    </>
  );
}

export function OrbitingMeshFour(props) {
  const meshRef = useRef();
  const targetRef = useRef()
  const lightRef = useRef()
  const middleRef = useRef()
  const radius = 20;
  const speed = 0.5;
  // useHelper(lightRef, THREE.SpotLightHelper, 'lightblue')

  useFrame(({ clock }) => {
    const angle = clock.getElapsedTime() * -speed;
    meshRef.current.position.set(Math.cos(angle) * radius, 10, Math.sin(angle) * radius);
    lightRef.current.target = middleRef.current
  });

  return (
    <>
    <mesh ref={meshRef} {...props}>
      <mesh position={[300,97.5,-470]}>
        <cylinderGeometry args={[9, 2, 5]}  />
      <meshStandardMaterial color="rgb(255, 172, 28)" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[300,100,-470]} >
          <sphereGeometry args={[9, 20,20, 0, Math.PI]} />
          <meshStandardMaterial color="blue"  transparent opacity={.1} />
      </mesh>
      <spotLight distance={63.5} ref={lightRef} angle={.35} position={[300,95,-470]} color={"white"} intensity={10}  penumbra={.5} />
        <mesh  position={[300, 95, -470]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="white" />
      </mesh>
    </mesh>
    <mesh ref={middleRef} position={[300,45,-470]}></mesh>
    </>
  );
}

