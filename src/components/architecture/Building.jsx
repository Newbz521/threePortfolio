import { useLoader } from "@react-three/fiber";
import { lazy, Suspense, useMemo, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export default function ArchImage(props) {
  return (
   
    <div id={props.name} className="arch-img-container" ref={props.ref}>
      
        <div className="arch-img" >
        <img className="image-zoom" src={props.img} loading="lazy"></img>
        <div className="arch-name">{props.name}</div>
        </div>
        </div>
  
)
}