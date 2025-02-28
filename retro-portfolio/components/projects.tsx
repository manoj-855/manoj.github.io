"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github, Tag, Filter, Code, Calendar } from "lucide-react"

const projects = [
  {
    title: "Financial AI agent",
    category: "AI & Machine Learning",
    date: "1 Feb 2025",
    image: "/ai_agent.png",
    description: "AI agent for financial trading advice",
    link: "https://github.com/ydv-manoj/financial_ai_agent",
    github: "https://github.com/ydv-manoj/financial_ai_agent",
    tags: ["AI", "Python", "Finance", "Machine Learning"],
    featured: true,
  },
  {
    title: "Algo99",
    category: "Web Development",
    date: "18 Sep. 2021",
    image: "/algo99.png",
    description: "Automated trading bots",
    link: "#",
    github: "https://github.com/sudhanshu8833/STARTUP",
    tags: ["Trading", "Automation", "JavaScript"],
    featured: false,
  },
  {
    title: "Map-the-world",
    category: "Web Development",
    date: "18 March 2022",
    image: "/map-the-world.png",
    description: "Interactive mapping application",
    link: "",
    github: "https://github.com/ydv-manoj/map-the-world",
    tags: ["Mapping", "React", "GeoJSON"],
    featured: false,
  },
  {
    title: "Advanced Yelp Camp",
    category: "Web Development",
    date: "10 Jan 2023",
    image: "/yelp.png",
    description: "Campground review and discovery platform",
    link: "https://yelp-camp-advanced-kpni.vercel.app/",
    github: "https://github.com/ydv-manoj/yelp-camp-advanced",
    tags: ["Node.js", "MongoDB", "Express"],
    featured: true,
  },
  {
    title: "WorkSpace",
    category: "Web Development",
    date: "15 July 2023",
    image: "/workspace.png",
    description: "Project management tool",
    link: "https://work-space-dusky.vercel.app/",
    github: "https://github.com/ydv-manoj/WorkSpace",
    tags: ["React", "Firebase", "Project Management"],
    featured: false,
  },
]

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [visibleProjects, setVisibleProjects] = useState(projects)

  const categories = [...new Set(projects.map(p => p.category))]
  const allTags = [...new Set(projects.flatMap(p => p.tags))]

  useEffect(() => {
    setIsAnimating(true)
    
    const filtered = projects.filter(project => {
      const matchesCategory = !selectedCategory || project.category === selectedCategory
      const matchesTag = !selectedTag || project.tags.includes(selectedTag)
      return matchesCategory && matchesTag
    })
    
    setTimeout(() => {
      setVisibleProjects(filtered)
      setIsAnimating(false)
    }, 300)
  }, [selectedCategory, selectedTag])

  const resetFilters = () => {
    setSelectedCategory(null)
    setSelectedTag(null)
  }

  return (
    <section id="work" className="py-20 bg-gradient-to-b from-card to-black">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-pressStart mb-4">DIGITAL CREATIONS</h2>
          <p className="text-xl font-vt323">Pixels with purpose</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        {/* Filter Section */}
        <div className="mb-8 p-4 bg-card retro-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Filter className="text-primary mr-2" size={18} />
              <span className="font-pressStart text-sm">FILTER:</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto">
              {/* Category Filter */}
              <div className="relative">
                <select 
                  className="w-full bg-black border-2 border-primary p-2 font-vt323 text-white appearance-none cursor-pointer retro-border"
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Code size={16} className="text-primary" />
                </div>
              </div>
              
              {/* Tag Filter */}
              <div className="relative">
                <select 
                  className="w-full bg-black border-2 border-secondary p-2 font-vt323 text-white appearance-none cursor-pointer retro-border"
                  value={selectedTag || ""}
                  onChange={(e) => setSelectedTag(e.target.value || null)}
                >
                  <option value="">All Tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Tag size={16} className="text-secondary" />
                </div>
              </div>
              
              {/* Reset Button */}
              <button 
                onClick={resetFilters}
                className="bg-red-500 hover:bg-red-600 text-white font-pressStart text-sm py-2 px-4 retro-border transition-colors"
              >
                RESET
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          animate={{ opacity: isAnimating ? 0.5 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {visibleProjects.map((project, index) => (
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
              {project.featured && (
                <div className="absolute -top-4 -right-4 z-10 bg-primary text-black font-pressStart text-xs py-1 px-3 rotate-6 retro-border shadow-lg">
                  FEATURED
                </div>
              )}
              
              <div className="relative overflow-hidden retro-border">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 font-vt323 text-sm flex items-center retro-border">
                  <Calendar size={14} className="mr-1 text-primary" />
                  {project.date}
                </div>

                <div
                  className={`absolute inset-0 bg-black/80 flex items-center justify-center transition-opacity duration-300 ${activeProject === index ? "opacity-100" : "opacity-0"}`}
                >
                  <div className="text-center p-4">
                    <h3 className="text-2xl font-pressStart mb-2 text-primary">{project.title}</h3>
                    <p className="font-vt323 text-lg mb-4">{project.description}</p>
                    <div className="flex justify-center gap-4 mb-4">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-primary text-black rounded-full hover:bg-primary/80 transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-secondary text-white rounded-full hover:bg-secondary/80 transition-colors"
                        >
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="bg-secondary/50 px-2 py-1 text-xs font-vt323 retro-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 retro-border border-t-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-pressStart">{project.title}</h3>
                    <div className="text-sm font-vt323 text-muted-foreground">
                      <span>{project.category}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center bg-primary text-black cursor-pointer hover:bg-primary/80 transition-colors">
                    <span>+</span>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.tags.slice(0, 2).map(tag => (
                    <span 
                      key={tag} 
                      className="inline-block bg-secondary/20 px-2 py-0.5 text-xs font-vt323 cursor-pointer hover:bg-secondary/40 transition-colors"
                      onClick={() => setSelectedTag(tag)}
                    >
                      #{tag}
                    </span>
                  ))}
                  {project.tags.length > 2 && (
                    <span className="inline-block bg-black px-2 py-0.5 text-xs font-vt323">
                      +{project.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {visibleProjects.length === 0 && (
          <div className="text-center p-8 border-2 border-dashed border-primary mt-8">
            <p className="font-pressStart text-lg text-primary">NO PROJECTS FOUND</p>
            <p className="font-vt323 mt-2">Try different filter options or reset filters</p>
          </div>
        )}
      </div>
    </section>
  )
}