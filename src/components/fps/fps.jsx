import { useState, useEffect, RefObject } from "react"
import { useFrame, addEffect, addAfterEffect } from "@react-three/fiber"
// @ts-ignore
import StatsImpl from "stats.js"
import { frameLoop } from "@react-spring/shared"

export default function Stats({ showPanel = 0, className, parent }) {
  const [stats] = useState(() => new StatsImpl())
  useEffect(() => {
    const node = (parent && parent.current) || document.body

    stats.showPanel(showPanel)
    node.appendChild(stats.dom)

    if (className) stats.dom.classList.add(className)

    const begin = addEffect(() => stats.begin())
    const end = addAfterEffect(() => stats.end())

    return () => {
      node.removeChild(stats.dom)
      begin()
      end()
    }
  }, [parent])
  return null
}