import { useState, useEffect } from "react"
import React from "react"

export default function ImageZoom(props) {
  
  const [background,setBackground] = useState(`url(${props.src})`)
  const [position, setPosition] = useState('0% 0%')

  

  function handleMouseMove (e){
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = ((e.pageX - left) / width * 100)
    const y = ((e.pageY - top) / height * 100) 
    setPosition(`${x}% ${y}%`) 
  }

  return(
    <figure onMouseMove={handleMouseMove} style={{backgroundImage: background, backgroundPosition: position }}>
      <img src={props.src}/>
    </figure>
  )
}