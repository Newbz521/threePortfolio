import { useLoader } from "@react-three/fiber";
import { lazy, Suspense, useMemo, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import {ImageZoom, MyImg} from "./zoom";

export default function ArchImage(props) {


  return (
   <>
    <div id={props.name} className="arch-img-container" ref={props.ref}>
      {/* <MyImg src={props.img} ></MyImg> */}
      {/* <ImageZoom src={props.img}></ImageZoom> */}
        <div className="arch-img" id="container">
        <img className="image-zoom" src={props.img} loading="lazy"></img>
          <a className="image-link" style={{textDecoration: "none", color: "white"}} href={props.img} target="_blank">Open Image in New Tab</a>
          <div style={{pointerEvents: "none"}} className="arch-name">{props.name}</div>

      </div>
      {/* <button className="img-button" onClick={window.open(props.img)}>download</button> */}
      </div>
      
  </>
  
)
}