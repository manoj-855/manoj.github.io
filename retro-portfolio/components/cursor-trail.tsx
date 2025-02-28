"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CursorPosition {
  x: number
  y: number
}

export default function CursorTrail() {
  const [mousePosition, setMousePosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [trail, setTrail] = useState<CursorPosition[]>([])

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  useEffect(() => {
    const trailLength = 10

    setTrail((prevTrail) => {
      const newTrail = [...prevTrail, mousePosition]
      if (newTrail.length > trailLength) {
        return newTrail.slice(newTrail.length - trailLength)
      }
      return newTrail
    })
  }, [mousePosition])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* {trail.map((position, index) => (
        <motion.div
          key={index}
          className="absolute w-3 h-3 rounded-full bg-primary"
          style={{
            left: position.x,
            top: position.y,
            opacity: (index + 1) / trail.length,
            scale: 1 - (index / trail.length) * 0.8,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: (index + 1) / trail.length }}
          transition={{ duration: 0.2 }}
        />
      ))} */}
    </div>
  )
}

