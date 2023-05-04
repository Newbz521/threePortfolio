import { useRef } from 'react';
import { useFrame} from '@react-three/fiber';
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
      <meshStandardMaterial />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0,7,0]} >
          <sphereGeometry args={[9, 20,20, 0, Math.PI]} />
          <meshStandardMaterial color="blue"  transparent opacity={.1} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25}/>
      </mesh>
      <spotLight castShadow ref={lightRef} angle={.4} position={[0,1.5,0]} color={"white"} intensity={.5}  penumbra={0.2} />
        <mesh ref={targetRef} position={[0, 1.5, 0]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="white" clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25}/>
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
        <meshStandardMaterial color="blue" transparent opacity={.05} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25}/>
      </mesh>
      <spotLight castShadow ref={lightRef} angle={.4} position={[0, 15, 0]} color={"white"} intensity={.5} penumbra={0.2} />
      <mesh ref={targetRef} position={[0, 15, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial attach="material"color="white" clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
      </mesh>
    </mesh>
  );
}

