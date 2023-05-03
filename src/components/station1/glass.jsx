import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

function GlassMaterial() {
  const envMap = useLoader(THREE.TextureLoader, 'path/to/environment-map.jpg');
  return (
    <meshPhysicalMaterial
      metalness={1}
      roughness={0}
      transparent={true}
      opacity={0.9}
      envMap={envMap}
    />
  );
}

export default GlassMaterial;