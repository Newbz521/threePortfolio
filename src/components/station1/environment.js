import { memo } from 'react'
import { AccumulativeShadows, RandomizedLight, Environment as EnvironmentImpl } from '@react-three/drei'

export const Environment = memo(({ direction = [5, 5, 5] }) => (
  <>
    
    <directionalLight position={direction} intensity={0.1} shadow-mapSize={1000} castShadow />
  
  </>
))