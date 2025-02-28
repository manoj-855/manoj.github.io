"use client"

import { useRef,useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

// Updated skills based on your resume
const skills = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", category: "frontend" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", category: "frontend" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", category: "language" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", category: "language" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", category: "frontend" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", category: "frontend" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg", category: "backend" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", category: "backend" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg", category: "database" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", category: "database" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", category: "database" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", category: "language" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", category: "language" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", category: "language" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg", category: "backend" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", category: "frontend" },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg", category: "frontend" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", category: "tool" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", category: "devops" },
  { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg", category: "devops" },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg", category: "cloud" },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-line-wordmark.svg", category: "cloud" },
  { name: "OpenAI", icon: "/openai-old-logo.webp", category: "ai" },
  { name: "LangChain", icon: "/langchain.webp", category: "ai" },
]

// Group skills by category
const categories = [
  { id: "all", name: "ALL WEAPONS" },
  { id: "frontend", name: "FRONTEND" },
  { id: "backend", name: "BACKEND" },
  { id: "language", name: "LANGUAGES" },
  { id: "database", name: "DATABASES" },
  { id: "devops", name: "DEVOPS" },
  { id: "cloud", name: "CLOUD" },
  { id: "ai", name: "AI/ML" },
  { id: "tool", name: "TOOLS" },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const containerRef = useRef(null)
  const containerInView = useInView(containerRef, { once: true })
  
  const [activeCategory, setActiveCategory] = useState("all")
  
  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory)

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-black to-card" ref={containerRef}>
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={containerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-pressStart mb-4">TECH ARSENAL</h2>
          <p className="text-xl font-vt323">Weapons of mass creation</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" ref={ref}>
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`px-3 py-2 text-xs font-pressStart retro-border ${
                activeCategory === category.id 
                  ? "bg-primary text-black" 
                  : "bg-card hover:bg-card/70"
              }`}
              onClick={() => setActiveCategory(category.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid with Hover Effects */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                type: "spring", 
                stiffness: 100 
              }}
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 mb-4 relative">
                <div className="absolute -inset-1 bg-primary/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-primary/30 p-3 rounded-lg retro-border transition-all duration-300 group-hover:translate-y-1 group-hover:shadow-lg w-16 h-16 flex items-center justify-center">
                  <Image
                    src={skill.icon || `/icons/placeholder.svg`}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/icons/placeholder.svg";
                    }}
                  />
                </div>
              </div>
              <p className="font-vt323 text-sm text-center group-hover:text-primary transition-colors">{skill.name}</p>
              <span className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {skill.category}
              </span>
            </motion.div>
          ))}
        </div>
        
        {/* Skill Stats Section */}
        <motion.div 
          className="mt-16 bg-black/30 p-6 retro-border"
          initial={{ opacity: 0, y: 30 }}
          animate={containerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-pressStart mb-4 text-primary">SYSTEM PROFICIENCY</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-1 font-vt323">
                <span>Frontend Development</span>
                <span className="text-green-400">95%</span>
              </div>
              <div className="w-full bg-gray-800 h-3">
                <div className="h-full bg-gradient-to-r from-primary to-green-500" style={{ width: "95%" }}>
                  <div className="flex h-full justify-end">
                    <div className="w-1 h-full bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 font-vt323">
                <span>Backend Development</span>
                <span className="text-green-400">90%</span>
              </div>
              <div className="w-full bg-gray-800 h-3">
                <div className="h-full bg-gradient-to-r from-primary to-green-500" style={{ width: "90%" }}>
                  <div className="flex h-full justify-end">
                    <div className="w-1 h-full bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 font-vt323">
                <span>Database Management</span>
                <span className="text-green-400">85%</span>
              </div>
              <div className="w-full bg-gray-800 h-3">
                <div className="h-full bg-gradient-to-r from-primary to-green-500" style={{ width: "85%" }}>
                  <div className="flex h-full justify-end">
                    <div className="w-1 h-full bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 font-vt323">
                <span>DevOps & Cloud</span>
                <span className="text-yellow-400">80%</span>
              </div>
              <div className="w-full bg-gray-800 h-3">
                <div className="h-full bg-gradient-to-r from-primary to-yellow-500" style={{ width: "80%" }}>
                  <div className="flex h-full justify-end">
                    <div className="w-1 h-full bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 font-vt323">
                <span>AI & Machine Learning</span>
                <span className="text-yellow-400">75%</span>
              </div>
              <div className="w-full bg-gray-800 h-3">
                <div className="h-full bg-gradient-to-r from-primary to-yellow-500" style={{ width: "75%" }}>
                  <div className="flex h-full justify-end">
                    <div className="w-1 h-full bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 font-vt323">
                <span>Problem Solving</span>
                <span className="text-green-400">95%</span>
              </div>
              <div className="w-full bg-gray-800 h-3">
                <div className="h-full bg-gradient-to-r from-primary to-green-500" style={{ width: "95%" }}>
                  <div className="flex h-full justify-end">
                    <div className="w-1 h-full bg-white"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-6 font-vt323 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Advanced</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Intermediate</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Learning</span>
            </div>
          </div>
        </motion.div>
        
        {/* Latest Tech Interests */}
        <motion.div 
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 text-center"
          initial={{ opacity: 0 }}
          animate={containerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="font-pressStart text-sm">CURRENTLY UPGRADING:</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <span className="px-3 py-1 bg-primary/20 border border-primary text-primary rounded-full text-sm font-vt323">RAG Architecture</span>
            <span className="px-3 py-1 bg-blue-500/20 border border-blue-500 text-blue-400 rounded-full text-sm font-vt323">Azure Kubernetes</span>
            <span className="px-3 py-1 bg-green-500/20 border border-green-500 text-green-400 rounded-full text-sm font-vt323">LangChain</span>
            <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500 text-yellow-400 rounded-full text-sm font-vt323">System Design</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}