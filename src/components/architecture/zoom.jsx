import { useState, useEffect, useCallback } from "react"
import React from "react"
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export function ImageZoom(props) {
  
  const [background,setBackground] = useState(`url(${props.src})`)
  const [position, setPosition] = useState('0% 0%')
const [zoom, setZoom] = useState('0%')
  

  function handleMouseMove (e){
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = ((e.pageX - left) / width * 100)
    const y = ((e.pageY - top) / height * 100) 
    setPosition(`${x}% ${y}%`) 
    // setZoom('500%')
  }

  return(
    <figure onMouseMove={handleMouseMove} style={{ backgroundImage: background, backgroundPosition: position, left: 0 }}>
      <img src={props.src}/>
    </figure>
  )
}


export function MyImg(props) {
  const [isZoomed, setIsZoomed] = useState(false)

  const handleZoomChange = useCallback(shouldZoom => {
    setIsZoomed(shouldZoom)
  }, [])

  return (
    <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
    <img
      alt="That wanaka tree, alone in the water near mountains"
      src={props.src}
      width="500"
    />
  </ControlledZoom>
  )
}