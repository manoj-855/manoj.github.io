"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"

// Define interfaces
interface Skill {
  name: string;
  icon: string;
  category: string;
  level: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Upgrade {
  name: string;
  description: string;
  color: string;
}

// Type the existing arrays
const skills: Skill[] = [
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", category: "frontend", level: 95 },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", category: "frontend", level: 90 },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", category: "language", level: 95 },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", category: "language", level: 85 },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", category: "frontend", level: 95 },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", category: "frontend", level: 90 },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg", category: "backend", level: 85 },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", category: "backend", level: 85 },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg", category: "database", level: 80 },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", category: "database", level: 85 },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", category: "database", level: 80 },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", category: "language", level: 80 },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", category: "language", level: 75 },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", category: "language", level: 85 },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg", category: "backend", level: 75 },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", category: "frontend", level: 90 },
  { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg", category: "frontend", level: 85 },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", category: "tool", level: 90 },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", category: "devops", level: 80 },
  { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg", category: "devops", level: 75 },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg", category: "cloud", level: 80 },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-line-wordmark.svg", category: "cloud", level: 85 },
  { name: "OpenAI", icon: "/openai-old-logo.webp", category: "ai", level: 75 },
  { name: "LangChain", icon: "/langchain.webp", category: "ai", level: 70 },
]

const categories: Category[] = [
  { id: "all", name: "FULL ARSENAL", icon: "🎮" },
  { id: "frontend", name: "FRONT LINES", icon: "🛡️" },
  { id: "backend", name: "COMMAND CENTER", icon: "⚙️" },
  { id: "language", name: "POWER LANGUAGES", icon: "📜" },
  { id: "database", name: "DATA VAULTS", icon: "💾" },
  { id: "devops", name: "DEPLOYMENT UNITS", icon: "🚀" },
  { id: "cloud", name: "CLOUD KINGDOM", icon: "☁️" },
  { id: "ai", name: "AI SENTINELS", icon: "🤖" },
  { id: "tool", name: "POWER TOOLS", icon: "🔧" },
]

const currentUpgrades: Upgrade[] = [
  { name: "RAG Architecture", description: "Building advanced retrieval systems for AI", color: "primary" },
  { name: "Azure Kubernetes", description: "Orchestrating cloud-native applications", color: "blue" },
  { name: "LangChain", description: "Creating powerful AI conversation systems", color: "green" },
  { name: "System Design", description: "Architecting scalable distributed systems", color: "yellow" },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const containerInView = useInView(containerRef, { once: true });
  
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [typewriterText, setTypewriterText] = useState<string>("");
  const [typewriterComplete, setTypewriterComplete] = useState<boolean>(false);
  
  // Terminal typing effect
  useEffect(() => {
    const text = "SCANNING TECH DATABASE... LOADING SKILL MODULES..."
    let i = 0
    setTypewriterComplete(false)
    
    const typing = setInterval(() => {
      if (i < text.length) {
        setTypewriterText(prev => prev + text.charAt(i))
        i++
      } else {
        clearInterval(typing)
        setTypewriterComplete(true)
      }
    }, 50)
    
    return () => clearInterval(typing)
  }, [])
  
  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory)

  // Get skill level description
  const getSkillLevel = (level: number): string => {
    if (level >= 90) return "MASTER"
    if (level >= 80) return "ADVANCED"
    if (level >= 70) return "SKILLED"
    if (level >= 60) return "COMPETENT"
    return "NOVICE"
  }
  
  // Get color based on skill level
  const getLevelColor = (level: number): string => {
    if (level >= 90) return "text-green-400"
    if (level >= 80) return "text-green-300"
    if (level >= 70) return "text-yellow-400"
    if (level >= 60) return "text-yellow-300"
    return "text-red-400"
  }

  // Fix image error handler type
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/icons/placeholder.svg";
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-black to-card relative overflow-hidden" ref={containerRef}>
      {/* Retro grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#111_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"></div>
      
      {/* Scanline effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="scanlines w-full h-full"></div>
      </div>
      
      <div className="container px-4 relative z-10">
        {/* Header with terminal effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={containerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-pressStart mb-4 text-primary inline-block p-2 retro-border bg-black/50">TECH ARSENAL</h2>
          
          <div className="max-w-2xl mx-auto mt-4 bg-black/80 retro-border p-4 terminal-window">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-4 text-xs text-gray-500 font-vt323">system_terminal</div>
            </div>
            <div className="font-vt323 text-green-400 text-lg">
              <span className="text-primary">$</span> {typewriterText}
              <span className={`cursor ${typewriterComplete ? 'hidden' : 'blink'}`}>▋</span>
            </div>
            {typewriterComplete && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-vt323 text-green-200 mt-2"
              >
                SYSTEM READY. SELECT MODULE TO INITIALIZE.
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Category Filter Buttons as "Game Cartridges" */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" ref={ref}>
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              className={`px-4 py-3 text-sm font-pressStart retro-border flex items-center ${
                activeCategory === category.id 
                  ? "bg-primary text-black shadow-lg shadow-primary/30" 
                  : "bg-card hover:bg-card/70 hover:translate-y-1 hover:shadow-md transition-all"
              }`}
              onClick={() => setActiveCategory(category.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid with improved hover effects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8"
          >
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
                onClick={() => setSelectedSkill(skill)}
              >
                <div className="w-20 h-20 mb-4 relative cursor-pointer">
                  <div className="absolute -inset-1 bg-primary/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative bg-black/50 p-3 rounded-lg retro-border transition-all duration-300 group-hover:translate-y-1 group-hover:shadow-lg group-hover:shadow-primary/30 w-20 h-20 flex items-center justify-center">
                    <Image
                      src={skill.icon || `/icons/placeholder.svg`}
                      alt={skill.name}
                      width={48}
                      height={48}
                      className="transition-transform duration-300 group-hover:scale-110 drop-shadow-glow"
                      onError={handleImageError}
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="absolute top-0 right-0 translate-x-1 -translate-y-1">
                    <span className={`text-xs ${getLevelColor(skill.level)} bg-black/70 px-1 rounded font-vt323`}>
                      Lv.{Math.floor(skill.level/10)}
                    </span>
                  </div>
                </div>
                <p className="font-vt323 text-base text-center group-hover:text-primary transition-colors">{skill.name}</p>
                <div className="w-full mt-1 bg-gray-800/50 h-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${skill.level >= 90 ? 'bg-green-400' : skill.level >= 80 ? 'bg-green-300' : skill.level >= 70 ? 'bg-yellow-400' : 'bg-red-400'}`} 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {/* Skill Details Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div 
                className="bg-card retro-border max-w-md w-full p-6 relative"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center retro-border bg-red-500 text-black font-pressStart"
                  onClick={() => setSelectedSkill(null)}
                >
                  X
                </button>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 retro-border bg-black/50 p-2 flex items-center justify-center">
                    <Image
                      src={selectedSkill.icon}
                      alt={selectedSkill.name}
                      width={40}
                      height={40}
                      className="drop-shadow-glow"
                      onError={handleImageError}
                    />
                  </div>
                  <div>
                    <h3 className="font-pressStart text-primary text-lg">{selectedSkill.name}</h3>
                    <p className="font-vt323 text-sm uppercase">{categories.find(c => c.id === selectedSkill.category)?.name}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between font-vt323 mb-1">
                    <span>SKILL LEVEL</span>
                    <span className={getLevelColor(selectedSkill.level)}>{getSkillLevel(selectedSkill.level)} ({selectedSkill.level}%)</span>
                  </div>
                  <div className="w-full bg-gray-800 h-4 retro-border overflow-hidden">
                    <div 
                      className={`h-full ${
                        selectedSkill.level >= 90 ? 'bg-gradient-to-r from-green-600 to-green-400' : 
                        selectedSkill.level >= 80 ? 'bg-gradient-to-r from-green-500 to-green-300' : 
                        selectedSkill.level >= 70 ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' : 
                        'bg-gradient-to-r from-red-600 to-red-400'
                      }`}
                      style={{ width: `${selectedSkill.level}%` }}
                    >
                      <div className="w-full h-full opacity-30 bg-pattern-diagonal"></div>
                    </div>
                  </div>
                </div>
                
                <div className="font-vt323 text-sm space-y-2 mb-4">
                  <p><span className="text-primary">CATEGORY:</span> {selectedSkill.category.toUpperCase()}</p>
                  <p><span className="text-primary">SPECIALIZATION:</span> {categories.find(c => c.id === selectedSkill.category)?.name}</p>
                  <p><span className="text-primary">STATUS:</span> ACTIVE</p>
                </div>
                
                <div className="retro-border bg-black/50 p-3 font-vt323">
                  <p className="text-green-400 mb-2">// SKILL DESCRIPTION</p>
                  <p>{selectedSkill.name} is a {selectedSkill.level >= 90 ? 'mastered' : selectedSkill.level >= 80 ? 'advanced' : selectedSkill.level >= 70 ? 'intermediate' : 'developing'} skill in the {selectedSkill.category} domain.</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Skill Stats Section with improved visuals */}
        <motion.div 
          className="mt-16 bg-black/50 p-6 retro-border"
          initial={{ opacity: 0, y: 30 }}
          animate={containerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center mb-4">
            <div className="w-3 h-6 bg-primary mr-2"></div>
            <h3 className="text-2xl font-pressStart text-primary">DEVELOPER STATS</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-1 font-vt323">
                <span>Frontend Development</span>
                <span className="text-green-400">95%</span>
              </div>
              <div className="w-full bg-gray-800 h-4 retro-border overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-green-500 relative" style={{ width: "95%" }}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
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
              <div className="w-full bg-gray-800 h-4 retro-border overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-green-500 relative" style={{ width: "90%" }}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
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
              <div className="w-full bg-gray-800 h-4 retro-border overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-green-500 relative" style={{ width: "85%" }}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
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
              <div className="w-full bg-gray-800 h-4 retro-border overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-yellow-500 relative" style={{ width: "80%" }}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
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
              <div className="w-full bg-gray-800 h-4 retro-border overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-yellow-500 relative" style={{ width: "75%" }}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
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
              <div className="w-full bg-gray-800 h-4 retro-border overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-green-500 relative" style={{ width: "95%" }}>
                  <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
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
              <span>MASTERED</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>SKILLED</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>DEVELOPING</span>
            </div>
          </div>
        </motion.div>
        
        {/* Latest Tech Interests as "Skill Trees" */}
        <motion.div 
          className="mt-10 bg-black/50 p-6 retro-border"
          initial={{ opacity: 0 }}
          animate={containerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <div className="w-3 h-6 bg-primary mr-2"></div>
            <h3 className="text-xl font-pressStart text-primary">SKILL TREE UPGRADES</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {currentUpgrades.map((upgrade, index) => (
              <motion.div
                key={upgrade.name}
                className={`p-4 bg-${upgrade.color}/10 border border-${upgrade.color}-500 rounded-lg`}
                initial={{ opacity: 0, x: -20 }}
                animate={containerInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-pressStart text-sm text-${upgrade.color}-400`}>{upgrade.name}</h4>
                  <div className={`h-4 w-4 retro-border bg-${upgrade.color}-500 animate-pulse`}></div>
                </div>
                <p className="font-vt323 text-sm">{upgrade.description}</p>
                <div className="mt-2 w-full bg-black/50 h-2 rounded-full overflow-hidden">
                  <div className={`h-full bg-${upgrade.color}-500`} style={{ width: `${25 + (index * 10)}%` }}></div>
                </div>
                <p className="text-right font-vt323 text-xs mt-1">{25 + (index * 10)}% complete</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 p-3 bg-black/70 retro-border border-primary">
            <p className="font-vt323 text-center text-primary">
              <span className="animate-pulse">▶</span> NEXT LEVEL UNLOCKS AT EXPERIENCE POINTS: 7,500/10,000
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Add custom CSS for scanlines and other effects */}
      <style jsx>{`
        .scanlines::before {
          content: " ";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 51%
          );
          background-size: 100% 4px;
          pointer-events: none;
        }
        
        .cursor.blink {
          animation: blink 1s step-end infinite;
        }
        
        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 10px 10px;
        }
        
        .bg-pattern-diagonal {
          background-image: repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.1) 10px,
            transparent 10px,
            transparent 20px
          );
        }
        
        .drop-shadow-glow {
          filter: drop-shadow(0 0 5px rgba(74, 222, 128, 0.5));
        }
        
        .terminal-window {
          position: relative;
          box-shadow: 0 0 20px rgba(74, 222, 128, 0.2);
        }
      `}</style>
    </section>
  )
}