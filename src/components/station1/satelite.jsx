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
        <cylinderGeometry args={[7, 2, 5]}  />
      <meshStandardMaterial />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0,7,0]} >
          <sphereGeometry args={[7, 20,20, 0, Math.PI]} />
          <meshStandardMaterial color="blue"  transparent opacity={.1}/>
      </mesh>
      <spotLight castShadow ref={lightRef} angle={.4} position={[0,7,0]} color={"white"} intensity={1}  penumbra={0.5} />
        <mesh ref={targetRef} position={[0, 10, 0]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshBasicMaterial color="white" />
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
    const angle = clock.getElapsedTime() * speed;
    
    meshRef.current.position.set(Math.sin(angle) * radius, 10, Math.cos(angle) * radius);
  });

  return (
    <mesh ref={meshRef} {...props}>
      <mesh position={[0, 17.5, 0]}>
        <cylinderGeometry args={[7, 2, 5]} />
        <meshStandardMaterial />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 20, 0]} >
        <sphereGeometry args={[7, 20, 20, 0, Math.PI]} />
        <meshStandardMaterial color="blue" transparent opacity={.05} />
      </mesh>
      <spotLight castShadow ref={lightRef} angle={.4} position={[0, 20, 0]} color={"white"} intensity={1} penumbra={0.5} />
      <mesh ref={targetRef} position={[0, 23, 0]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </mesh>
  );
}

