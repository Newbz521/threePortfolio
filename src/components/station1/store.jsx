import React, { Component, useMemo } from "react";
import { useEffect, useState, useRef, Suspense } from "react";
import { useSpring, a, config } from "@react-spring/three";

import { Canvas, useFrame, useThree, PerspectiveCamera} from "@react-three/fiber"
import { Outline } from '@react-three/postprocessing'
import { BlendFunction, Resizer, KernelSize } from 'postprocessing'
import {PivotControls, MeshReflectorMaterial, orthographicCamera, OrthographicCamera, OrbitControls, RoundedBox, useCursor} from '@react-three/drei'
import Cutter from '@r3f-cutter/r3f-cutter';
import { useCSG, Geometry, Base, Subtraction } from '@react-three/csg'
import PlatformOne from "./platform1";
import DayScene from "./environment";
import { OrbitingMesh, OrbitingMeshTwo } from "./satelite";
import { useControls } from "leva";
import Island from "./island";
import * as THREE from 'three'

export function StoreOne({rise}) {
  const ref = useRef()
  const bounceRef = useRef()
  const [active, setActive] = useState(false)
  const [zoom, set] = useState(true)
  useCursor(active)
   

  useFrame((state) => {
    rise += .015
    state.camera.lookAt(zoom ? 0:-20,zoom ? 0: 9, zoom ? 0:-15)
    state.camera.position.lerp({ x: zoom ? -90 : -15, y: zoom ? 30 : 10, z: zoom ? 90 : 0 }, 0.05)
   
    state.camera.updateProjectionMatrix();
    bounceRef.current.position.y = 1.5 * Math.sin(rise) 
  })
  return (
    <mesh ref={bounceRef}>
    <mesh ref={ref} position={[-20,8,-15]} receiveShadow castShadow onClick={() => set(!zoom)} onPointerOver={() => setActive(true)} onPointerOut={() => setActive(false)}>
      <boxGeometry args={[8, 8, 5]} />
      <meshStandardMaterial color={active ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
    </mesh>
    </mesh>
  )
}


export function StoreTwo(rise, risespeed) {
  const ref = useRef()
  const bounceRef = useRef()
  const [active, setActive] = useState(false)
  const [zoom, set] = useState(true)
  useCursor(active)
  useFrame((state) => {
    rise += risespeed


    state.camera.lookAt(zoom ? 0:-20,zoom ? 0: 9, zoom ? 0:-15)
    state.camera.position.lerp({ x: zoom ? -90 : -15, y: zoom ? 30 : 10, z: zoom ? 90 : 0 }, 0.05)
   
    state.camera.updateProjectionMatrix();
    bounceRef.current.position.y = 1.5 * Math.sin(rise) 
  })
  return (
    <mesh ref={bounceRef}>
    <mesh ref={ref} position={[-20,8,-15]} receiveShadow castShadow onClick={() => set(!zoom)} >
      <boxGeometry args={[8, 8, 5]} />
      <meshStandardMaterial color={active ? 'hotpink' : 'lightblue'} clearcoat={1} clearcoatRoughness={0} roughness={0} metalness={0.25} />
    </mesh>
    </mesh>
  )
}
