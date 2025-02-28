"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Algo99",
    category: "Web Development",
    date: "18 Sep. 2021",
    image: "/placeholder.svg?height=400&width=600",
    description: "An algorithm visualization platform",
    link: "#",
    github: "#",
  },
  {
    title: "Map-the-world",
    category: "Web Development",
    date: "18 March 2022",
    image: "/placeholder.svg?height=400&width=600",
    description: "Interactive mapping application",
    link: "#",
    github: "#",
  },
  {
    title: "Advanced Yelp Camp",
    category: "Web Development",
    date: "10 Jan 2023",
    image: "/placeholder.svg?height=400&width=600",
    description: "Campground review and discovery platform",
    link: "#",
    github: "#",
  },
  {
    title: "WorkSpace",
    category: "Web Development",
    date: "15 July 2023",
    image: "/placeholder.svg?height=400&width=600",
    description: "Project management tool",
    link: "#",
    github: "#",
  },
]

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<number | null>(null)

  return (
    <section id="work" className="py-20 bg-card">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-pressStart mb-4">PORTFOLIO</h2>
          <p className="text-xl font-vt323">Some of my Project works!</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="relative overflow-hidden retro-border">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div
                  className={`absolute inset-0 bg-black/80 flex items-center justify-center transition-opacity duration-300 ${activeProject === index ? "opacity-100" : "opacity-0"}`}
                >
                  <div className="text-center p-4">
                    <h3 className="text-2xl font-pressStart mb-2 text-primary">{project.title}</h3>
                    <p className="font-vt323 text-lg mb-4">{project.description}</p>
                    <div className="flex justify-center gap-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-primary text-black rounded-full hover:bg-primary/80 transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-secondary text-white rounded-full hover:bg-secondary/80 transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 retro-border border-t-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-pressStart">{project.title}</h3>
                    <div className="text-sm font-vt323 text-muted-foreground">
                      <span>{project.category}</span> / <span>{project.date}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center bg-primary text-black">
                    <span>+</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

