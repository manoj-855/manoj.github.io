"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll } from "framer-motion"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import GithubProjects from "@/components/github-projects"
import AudioPlayer from "@/components/audio-player"
import CursorTrail from "@/components/cursor-trail"
import ThreeScene from "@/components/three-scene"
import Services from "@/components/services"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const updateProgressBar = () => {
      if (progressRef.current) {
        progressRef.current.style.width = `${scrollYProgress.get() * 100}%`
      }
    }

    const unsubscribe = scrollYProgress.onChange(updateProgressBar)
    return () => unsubscribe()
  }, [scrollYProgress])

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-black text-primary font-pressStart">
        <div className="text-2xl mb-8 crt-flicker">INITIALIZING...</div>
        <div className="w-64 h-4 bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
          />
        </div>
        <div className="mt-4 text-sm">LOADING RETRO FUTURE</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen font-vt323 relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full scanline pointer-events-none z-50 opacity-20"></div>
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div ref={progressRef} className="h-full bg-primary"></div>
      </div>
      <CursorTrail />
      <AudioPlayer />
      <Navbar />
      <Hero />
      {/* <ThreeScene /> */}
      <About />
      <Skills />
      <Projects />
      <GithubProjects />
      <Services />
      <Contact />
      <footer className="bg-card py-4 text-center text-sm">
        <div className="container">
          <p>© {new Date().getFullYear()} Manoj Yadav | Crafted with 💚 and Next.js</p>
          <p className="text-muted-foreground mt-1">
            <span className="inline-block animate-blink">█</span> PRESS ANY KEY TO CONTINUE
          </p>
        </div>
      </footer>
    </main>
  )
}

