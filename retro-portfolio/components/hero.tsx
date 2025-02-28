"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import Typed from "typed.js"
import ThreeScene from "./three-scene"


export default function Hero() {
  const el = useRef<HTMLSpanElement>(null)
  const [showEmoji, setShowEmoji] = useState(false)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "CS Graduate from DTU (Mathematics and Computing 2020-2024)",
        "Full Stack Engineer",
        "AI Enthusiast",
        "React.js Developer | Next.js Developer",
        "Node.js Developer | FastAPI Developer",
        "Problem Solver",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
    })

    setTimeout(() => setShowEmoji(true), 2000)

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Background video */}
      <video autoPlay muted loop className="absolute w-full h-full object-cover">
        <source src="/grid.mp4" type="video/mp4" />
      </video>

      <div className="container relative z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-pressStart mb-4 text-primary glitch" data-text="I AM MANOJ YADAV">
            I AM MANOJ YADAV
          </h1>

          <div className="text-xl md:text-2xl font-vt323 text-white">
            <span ref={el}></span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
          <a
            href="#about"
            className="inline-block py-3 px-8 bg-primary text-black font-pressStart text-sm retro-shadow hover:translate-y-1 hover:shadow-none transition-all"
          >
            EXPLORE {showEmoji && "🚀"}
          </a>
        </motion.div>

        {/* Pixel art decorations */}
        {/* <motion.div
          className="absolute left-10 bottom-20 hidden md:block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        > */}
        {/* <div className="w-12 h-12 bg-secondary opacity-70"></div> */}
        {/* <ThreeScene/> */}
        {/* </motion.div> */}
        <motion.div
          className="absolute left-10 bottom-20 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <ThreeScene />
        </motion.div>
      </div>
    </section>
  )
}

