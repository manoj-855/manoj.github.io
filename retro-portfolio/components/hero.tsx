"use client"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import Typed from "typed.js"
import ThreeScene from "./three-scene"

// TypeScript interfaces
interface CommandEntry {
  command: string;
  response: string;
}

interface PlayerStats {
  level: number;
  xp: number;
  skills: string[];
  achievements: string[];
  commits: number;
  projects: number;
  uptime: number;
}

export default function Hero() {
  // Refs
  const terminalRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)
  
  // State
  const [bootSequence, setBootSequence] = useState<boolean>(true)
  const [commandHistory, setCommandHistory] = useState<CommandEntry[]>([])
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    level: 1,
    xp: 0,
    skills: ["React", "Next.js", "Node.js", "TypeScript", "FastAPI"],
    achievements: ["CS Graduate", "Math Expert", "Problem Solver"],
    commits: 847,
    projects: 23,
    uptime: 1095 // Days (3 years)
  })
  const [typingComplete, setTypingComplete] = useState<boolean>(false)
  const [loadingProgress, setLoadingProgress] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Boot sequence animation
  useEffect(() => {
    if (bootSequence) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => setBootSequence(false), 500)
            return 100
          }
          return prev + 5
        })
      }, 150)
      
      return () => clearInterval(interval)
    }
  }, [bootSequence])

  // Commands library
  const commands: Record<string, { response: string, xpGain: number }> = {
    "whoami": { 
      response: "Manoj Yadav - Full Stack Engineer\nGraduated from DTU (Mathematics & Computing 2020-2024)", 
      xpGain: 5 
    },
    "ls -la skills/": { 
      response: "drwxr-xr-x  frontend/\ndrwxr-xr-x  backend/\ndrwxr-xr-x  mathematics/\ndrwxr-xr-x  ai/", 
      xpGain: 10 
    },
    "cat skills/frontend/frameworks.txt": { 
      response: "React.js\nNext.js\nTypescript\nTailwind CSS\nFramer Motion", 
      xpGain: 15 
    },
    "cat skills/backend/technologies.txt": { 
      response: "Node.js\nFastAPI\nExpress\nMongoDB\nPostgreSQL", 
      xpGain: 15 
    },
    "nano projects.json": { 
      response: "{\n  \"total\": 23,\n  \"highlighted\": [\n    \"AI-Powered Dashboard\",\n    \"E-commerce Platform\",\n    \"Data Visualization Tool\"\n  ]\n}\n\n^G Help    ^O Write Out    ^W Where Is    ^K Cut Text", 
      xpGain: 20 
    },
    "./run-portfolio.sh": { 
      response: "Loading portfolio assets...\nInitializing projects database...\nCompiling experience...\n\nPortfolio ready! Use 'explore' command to navigate.", 
      xpGain: 25 
    },
    "git log --author=\"Manoj\" --oneline | wc -l": { 
      response: "847 commits found in public repositories", 
      xpGain: 10 
    },
    "top -u manoj": { 
      response: "PID USER     CPU  MEM   TIME COMMAND\n001 manoj    75%  64%  3y12d react-developer\n002 manoj    45%  32%  2y6m  node-engineer\n003 manoj    85%  78%  4y2m  problem-solver", 
      xpGain: 20 
    }
  }

  // Terminal command typing effect
  useEffect(() => {
    if (!bootSequence && terminalRef.current) {
      const commandList = Object.keys(commands)
      
      const typed = new Typed(terminalRef.current, {
        strings: commandList,
        typeSpeed: 25,  // Slowed down typing speed
        backSpeed: 15,
        backDelay: 2000, // Increased delay between commands
        loop: true,
        showCursor: false,
        onStringTyped: (arrayPos: number) => {
          setTypingComplete(true)
          setTimeout(() => {
            const currentCommand = commandList[arrayPos]
            const cmdInfo = commands[currentCommand]
            
            const newCommand: CommandEntry = {
              command: currentCommand,
              response: cmdInfo.response
            }
            
            // Keep only the last 3 commands on desktop, 2 on mobile
            const historyLimit = isMobile ? 1 : 2
            setCommandHistory(prev => [...prev.slice(-historyLimit), newCommand])
            
            // Update player stats
            setPlayerStats(prev => {
              const newXp = prev.xp + cmdInfo.xpGain
              const shouldLevelUp = newXp >= 100
              
              return {
                ...prev,
                level: shouldLevelUp ? prev.level + 1 : prev.level,
                xp: shouldLevelUp ? newXp - 100 : newXp
              }
            })
            
            setTypingComplete(false)
          }, 500)
        }
      })
      
      return () => {
        typed.destroy()
      }
    }
  }, [bootSequence, isMobile])

  // Blinking cursor effect
  useEffect(() => {
    if (cursorRef.current) {
      const interval = setInterval(() => {
        cursorRef.current!.style.opacity = cursorRef.current!.style.opacity === '0' ? '1' : '0'
      }, 500)
      return () => clearInterval(interval)
    }
  }, [bootSequence])

  // CPU and Memory usage simulation
  const [cpuUsage, setCpuUsage] = useState<number>(0)
  const [memUsage, setMemUsage] = useState<number>(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 60) // 60-90%
      setMemUsage(Math.floor(Math.random() * 25) + 55) // 55-80%
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  if (bootSequence) {
    return (
      <section className="h-screen bg-black text-green-400 font-mono flex items-center justify-center">
        <div className="w-full max-w-3xl p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <pre className="text-xs md:text-base text-center overflow-x-auto">
              {`
  _    _      _ _         __          __        _     _ _ 
 | |  | |    | | |        \\ \\        / /       | |   | | |
 | |__| | ___| | | ___     \\ \\  /\\  / /__  _ __| | __| | |
 |  __  |/ _ \\ | |/ _ \\     \\ \\/  \\/ / _ \\| '__| | / _\` | |
 | |  | |  __/ | | (_) |     \\  /\\  / (_) | |  | | (_| |_|
 |_|  |_|\___|_|_|\___( )     \/  \/ \___/|_|  |_|\__,_(_)
                     |/                                    
              
              DevOS v2.0.24 - Terminal Edition
              `}"
            </pre>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="mb-2 text-xs md:text-sm">
              <span className="text-cyan-400">BIOS</span> Version 4.7.5 - Systems Inc.
            </div>
            <div className="mb-1 text-xs md:text-sm">
              <span className="text-yellow-400">CPU:</span> BrainCore i9-12900K @ 5.2GHz
            </div>
            <div className="mb-1 text-xs md:text-sm">
              <span className="text-yellow-400">Memory:</span> 64GB DDR5 Neural RAM
            </div>
            <div className="mb-1 text-xs md:text-sm">
              <span className="text-yellow-400">Storage:</span> 2TB Knowledge SSD
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-6"
          >
            <div className="mb-2 text-xs md:text-sm">Loading Developer Profile...</div>
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div 
                className="bg-green-500 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>{loadingProgress}%</span>
              <span>{loadingProgress < 100 ? 'Loading skills and experience...' : 'Complete!'}</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loadingProgress === 100 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-pulsate">Press ENTER to access terminal...</p>
          </motion.div>
        </div>
      </section>
    )
  }

  // Calculate XP bar width percentage
  const xpPercentage = (playerStats.xp / 100) * 100

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black/90 z-10"></div>
      
      {/* CRT scan effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-10 z-10 animate-scan"></div>
      
      {/* Background video with reduced opacity */}
      <video autoPlay muted loop className="absolute w-full h-full object-cover">
        <source src="/grid.mp4" type="video/mp4" />
      </video>
      
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-5 z-10"></div>
      
      <div className="container relative z-20 px-2 md:px-4 max-w-5xl mx-auto">
        <div className="bg-black/95 border-2 border-green-500 rounded-md p-2 md:p-4 terminal-shadow">
          {/* Terminal top bar */}
          <div className="flex items-center justify-between bg-gray-900 px-2 md:px-3 py-1 mb-2 rounded">
            <div className="text-white font-mono text-xs md:text-base flex items-center">
              <span className="text-green-400 mr-1 md:mr-2">●</span>
              <span className="truncate">manoj@developer:~/portfolio</span>
            </div>
            <div className="flex space-x-1 md:space-x-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full cursor-pointer hover:brightness-125"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full cursor-pointer hover:brightness-125"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full cursor-pointer hover:brightness-125"></div>
            </div>
          </div>
          
          {/* System metrics row - Simplified for mobile */}
          {isMobile ? (
            <div className="grid grid-cols-2 gap-2 mb-3 bg-gray-900/60 p-2 rounded text-xs font-mono">
              <div className="flex items-center">
                <span className="text-gray-400 mr-1">CPU:</span>
                <div className="w-12 bg-gray-700 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${cpuUsage > 80 ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${cpuUsage}%` }}
                  ></div>
                </div>
                <span className="ml-1 text-gray-300">{cpuUsage}%</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-gray-400 mr-1">MEM:</span>
                <div className="w-12 bg-gray-700 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${memUsage > 75 ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${memUsage}%` }}
                  ></div>
                </div>
                <span className="ml-1 text-gray-300">{memUsage}%</span>
              </div>
              
              <div className="text-cyan-400 text-xs">
                <span className="mr-1">UP:</span>
                <span>{playerStats.uptime}d</span>
              </div>
              
              <div className="text-purple-400 text-xs flex items-center justify-between">
                <div>
                  <span className="mr-1">GIT:</span>
                  <span>{playerStats.commits}</span>
                </div>
                <div>
                  <span className="mr-1">PRJ:</span>
                  <span>{playerStats.projects}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-3 bg-gray-900/60 p-2 rounded text-xs md:text-sm font-mono">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">CPU:</span>
                <div className="w-20 bg-gray-700 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${cpuUsage > 80 ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${cpuUsage}%` }}
                  ></div>
                </div>
                <span className="ml-1 text-gray-300">{cpuUsage}%</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">MEM:</span>
                <div className="w-20 bg-gray-700 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${memUsage > 75 ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${memUsage}%` }}
                  ></div>
                </div>
                <span className="ml-1 text-gray-300">{memUsage}%</span>
              </div>
              
              <div className="text-cyan-400">
                <span className="mr-1">UPTIME:</span>
                <span>{playerStats.uptime} days</span>
              </div>
              
              <div className="text-purple-400">
                <span className="mr-1">COMMITS:</span>
                <span>{playerStats.commits}</span>
              </div>
              
              <div className="text-yellow-400">
                <span className="mr-1">PROJECTS:</span>
                <span>{playerStats.projects}</span>
              </div>
            </div>
          )}
          
          {/* Player stats row - Simplified for mobile */}
          {isMobile ? (
            <div className="grid grid-cols-2 gap-2 mb-3 bg-gray-900/60 p-2 rounded text-xs font-mono">
              <div>
                <span className="text-gray-400 mr-1">LVL:</span>
                <span className="text-green-400 font-bold">[{playerStats.level}]</span>
              </div>
              
              <div>
                <span className="text-gray-400 mr-1">XP:</span>
                <span className="text-yellow-400">{playerStats.xp}/100</span>
              </div>
              
              <div className="col-span-2">
                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-yellow-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${xpPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <span className="text-gray-400 mr-1">CLASS:</span>
                <span className="text-purple-400">Full-Stack</span>
              </div>
              
              <div>
                <span className="text-gray-400 mr-1">SKILLS:</span>
                <span className="text-cyan-400">{playerStats.skills.length}</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-4 bg-gray-900/60 p-2 rounded text-xs md:text-sm font-mono">
              <div>
                <span className="text-gray-400 mr-1">DEV LEVEL:</span>
                <span className="text-green-400 font-bold">[{playerStats.level}]</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">XP:</span>
                <div className="w-32 bg-gray-700 rounded-full h-1.5">
                  <div 
                    className="bg-yellow-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${xpPercentage}%` }}
                  ></div>
                </div>
                <span className="ml-1 text-gray-300">{playerStats.xp}/100</span>
              </div>
              
              <div>
                <span className="text-gray-400 mr-1">SKILLS:</span>
                <span className="text-cyan-400">{playerStats.skills.length}</span>
              </div>
              
              <div>
                <span className="text-gray-400 mr-1">CLASS:</span>
                <span className="text-purple-400">Full-Stack Engineer</span>
              </div>
            </div>
          )}
          
          {/* Command history - Adjust height for mobile */}
          <div className="font-mono text-xs md:text-base mb-3 terminal-text p-2 bg-black rounded border border-gray-800" style={{ height: isMobile ? '120px' : '180px' }}>
            {commandHistory.map((item, index) => (
              <div key={index} className="mb-3">
                <div className="flex text-green-400 items-center">
                  <span className="text-yellow-400 mr-1 md:mr-2 text-xs md:text-sm">manoj$</span>
                  <span className="text-xs md:text-sm">{item.command}</span>
                </div>
                <div className="text-gray-300 whitespace-pre-line pl-2 md:pl-4 mt-1 font-mono text-xs md:text-sm leading-tight md:leading-relaxed">
                  {item.response}
                </div>
              </div>
            ))}
          </div>
          
          {/* Current command line */}
          <div className="font-mono text-xs md:text-base flex items-center p-2 bg-gray-900/40 rounded">
            <span className="text-yellow-400 mr-1 md:mr-2 text-xs md:text-sm">manoj$</span>
            <span className={`text-green-400 text-xs md:text-sm ${typingComplete ? 'command-complete' : ''}`} ref={terminalRef}></span>
            <span className="text-white w-1 md:w-2 h-3 md:h-4 bg-white inline-block ml-1" ref={cursorRef}></span>
          </div>
          
          {/* Command help - Hide on mobile to save space */}
          {!isMobile && (
            <div className="mt-2 bg-gray-900/40 p-2 rounded text-xs text-gray-500 font-mono">
              Available commands: whoami, ls -la skills/, cat skills/frontend/frameworks.txt, ./run-portfolio.sh, git log...
            </div>
          )}
        </div>
        
        {/* Bio card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-4 md:mt-6 text-center"
        >
          <h1 className="text-xl md:text-3xl lg:text-5xl font-pressStart mb-2 md:mb-4 text-green-500 text-glow" data-text="MANOJ YADAV">
            MANOJ YADAV
          </h1>
          
          <div className="text-sm md:text-lg lg:text-xl font-mono text-green-300 mb-2 md:mb-4 bg-black/70 inline-block px-3 py-1 rounded-sm border-l-2 border-r-2 border-green-500">
            <span className="typing-indicator">Full Stack | TS Wizard | AI Explorer</span>
          </div>
          
          <a
            href="#about"
            className="inline-block py-1 md:py-2 px-4 md:px-6 bg-green-500 text-black font-pressStart text-xs md:text-sm crt-button hover:bg-green-400 transition-all"
          >
            [INITIALIZE] <span className="blink">_</span>
          </a>
        </motion.div>
        
        {/* 3D Scene - Only show on desktop */}
        {!isMobile && (
          <motion.div 
            className="absolute right-[100px] bottom-[150px] hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <ThreeScene />
          </motion.div>
        )}
      </div>
      
      {/* Custom CSS */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        .terminal-shadow {
          box-shadow: 0 0 10px #4ade80, 0 0 20px rgba(74, 222, 128, 0.2);
        }
        .terminal-text {
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #4ade80 #111;
        }
        .terminal-text::-webkit-scrollbar {
          width: 4px;
        }
        .terminal-text::-webkit-scrollbar-track {
          background: #111;
        }
        .terminal-text::-webkit-scrollbar-thumb {
          background-color: #4ade80;
          border-radius: 2px;
        }
        .crt-button {
          box-shadow: 0 4px 0 #2b8c46, inset 0 1px 0 rgba(255,255,255,0.2);
          border: 1px solid #2b8c46;
          border-radius: 2px;
          position: relative;
          transform: translateY(0);
          transition: all 0.1s;
        }
        .crt-button:hover {
          transform: translateY(2px);
          box-shadow: 0 2px 0 #2b8c46, inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .typing-indicator::after {
          content: '|';
          animation: blink 1s step-end infinite;
        }
        .command-complete {
          border-bottom: 1px solid #4ade80;
        }
        .text-pulsate {
          animation: pulsate 1.5s ease-out infinite;
        }
        @keyframes pulsate {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        .text-glow {
          text-shadow: 0 0 5px #4ade80, 0 0 10px rgba(74, 222, 128, 0.5);
        }
        .bg-noise {
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4d5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmsub2cDHs7iKWxjg6igP3pE/Ui1Kr5iXkYLLAjnpfZKFvE6YkRo2pZxBYj/emFAais1nPiV5aPJ7Myjc3n/tsvPRWPsA2cP2tz0VKgIBfQKhjLm7RR5+3YqhQAuO7q9SQnJfC8HVl5aWnvtgpPYSqFWsXbQZIexad7kS4jbIRGOQS/hgIBj1qtXQVUQlbASfRha/S+bhFgy+sXJJdPyatA/SngJ4sr5KNnFQ2kZTDPzuq5zPAjPb5AXrq8dXw7lQAIJ9sTUfCfkRdyURX9pkU54XCdq9RUqqkV2Or27u/YVNkModTkPU8f+xpaR/uE/y0FURMG/zsK/32jSxwQQR48kV8iWw1pkJKSQSRkVV1RJPbEDgmJggmCIjkAQQCwB5RS1K0iGZAMz5yjunkHYZlkHQax0YywxfIkB5kWXL7EtRi4eBcJgw8Qcy7+OmFdxbNxh0INoVMmYa2Zz0aW/rvT1QUYDXh0xe9Yv3u7pk6dPvwl3ZnbHDDj7m2fvj61Rzx4dVZ3TLfGg0T6fkZGR0ZH0CETftu8aNrFZGR+HgJIJxogjoJBOgYOC2hAFMYSEDELJPYDFbjYKdGlPDYD1UaAN0AN1mWgxIB8nI/OkQCZ/yY5M4a/wQZvYmwB4FkqCJFii1R/U0dU=');
        }
      `}</style>
    </section>
  )
}