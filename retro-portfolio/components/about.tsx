"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [showError, setShowError] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [batteryLevel, setBatteryLevel] = useState(Math.floor(Math.random() * 30) + 70)
  
  // Scroll terminal to bottom when new lines are added
  useEffect(() => {
    if (terminalRef.current && terminalLines.length > 0) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines])

  const handleDangerClick = () => {
    setShowError(true)
    setTerminalLines([])
    
    // Simulate terminal output with more Linux commands and errors
    const lines = [
      "🔍 Scanning system resources...",
      "$ uname -a",
      "Brain-OS 5.16.0-3-retro #1 SMP PREEMPT_DYNAMIC Manoj 6.1.21-1 (2025-02-15)",
      "$ top -bn1 | grep 'Cpu(s)'",
      "Cpu(s): 87.5% usr, 12.3% sys, 0.0% nice, 0.2% idle",
      "⚠️ WARNING: Process 'creativity' consuming excessive CPU!",
      "$ journalctl -xe",
      "Feb 28 15:43:22 brain systemd[1]: manoj_brain.service: Main process exited, code=killed, status=11/SEGV",
      "Feb 28 15:43:22 brain systemd[1]: manoj_brain.service: Failed with result 'signal'",
      "🛑 Error: Critical process 'manoj_brain.service' failed!",
      "$ dmesg | tail",
      "[14728.167732] general protection fault, probably for non-canonical address 0x8badf00d",
      "[14728.167745] RIP: 0033:0x7f81c5a92577",
      "[14728.167749] Code: Unable to access memory at address 0x7f81c5a92577",
      "🔄 Attempting to restart neural network...",
      "$ sudo systemctl restart manoj_brain",
      "Job for manoj_brain.service failed because the control process exited with error code.",
      "See 'systemctl status manoj_brain.service' for details.",
      "❌ FAILED! Segmentation fault (core dumped)",
      "$ sudo gdb -c /var/crash/core.manoj.1234",
      "Program terminated with signal SIGSEGV, Segmentation fault.",
      "#0  0x00005555555a7d32 in ThinkCreative()",
      "$ cat /var/log/syslog | grep -i error",
      "Feb 28 15:43:28 brain kernel: [ERROR] Memory corruption detected in caffeine subsystem",
      "$ sudo su",
      "Password: ********",
      "# whoami",
      "root",
      "💻 root@manoj:~# sudo rm -rf /brain/*",
      "💣 Initiating system meltdown in 3...2...1..."
    ]
    
    // Add lines with increasing delay for more realistic typing effect
    let delay = 100
    lines.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line])
      }, delay)
      
      // Vary the delay between lines for more realism
      delay += line.startsWith("$") || line.startsWith("#") ? 300 : 150
    })
    
    setTimeout(() => {
      setShowError(false)
      setTerminalLines([])
    }, 7000)
  }

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-card to-black" ref={ref}>
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-pressStart mb-4">SYSTEM PROFILE</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <div className="relative flex-grow">
              <div className="absolute -inset-2 bg-primary/20 rounded-lg blur-sm"></div>
              <div className="relative bg-card p-6 retro-border h-full">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative w-full sm:w-1/3 aspect-square">
                    <Image
                      src="/profile_pic.png"
                      alt="Manoj Yadav"
                      width={300}
                      height={300}
                      className="object-cover retro-border bg-primary"
                    />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-primary"></div>
                    
                    {/* Battery Indicator */}
                    <div className="absolute top-2 right-2 flex items-center bg-black/70 px-2 py-1 rounded-md">
                      <div className="w-6 h-3 border border-white relative mr-1">
                        <div 
                          className={`h-full ${batteryLevel > 50 ? 'bg-green-500' : batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ width: `${batteryLevel}%` }}
                        ></div>
                        <div className="absolute -right-1 top-0 bottom-0 w-1 h-full border-r border-t border-b border-white"></div>
                      </div>
                      <span className="text-xs text-white font-vt323">{batteryLevel}%</span>
                    </div>
                  </div>
                  <div className="w-full sm:w-2/3">
                    <h3 className="text-2xl font-vt323 mb-2">PERSONAL DATA</h3>
                    <ul className="space-y-2 font-vt323 text-lg">
                      <li className="flex">
                        <span className="w-24 text-muted-foreground">NAME:</span>
                        <span>Manoj Yadav</span>
                      </li>
                      <li className="flex">
                        <span className="w-24 text-muted-foreground">ROLE:</span>
                        <span>Full Stack Developer</span>
                      </li>
                      <li className="flex">
                        <span className="w-24 text-muted-foreground">EMAIL:</span>
                        <span>mojirao770@gmail.com</span>
                      </li>
                      <li className="flex">
                        <span className="w-24 text-muted-foreground">LOCATION:</span>
                        <span>Haryana, India</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 font-vt323">
                  <div className="p-4 bg-black/50 retro-border mb-4">
                    <h4 className="text-xl text-yellow-400 mb-2">🖥️ SYSTEM STATUS</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex justify-between">
                        <span>CPU LOAD:</span>
                        <span className="text-green-400">87%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>MEMORY:</span>
                        <span className="text-green-400">64%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CREATIVITY:</span>
                        <span className="text-green-400">OPTIMAL</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CAFFEINE:</span>
                        <span className="text-yellow-400">73%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>UPTIME:</span>
                        <span className="text-green-400">23.7 DAYS</span>
                      </div>
                      <div className="flex justify-between">
                        <span>OS:</span>
                        <span className="text-green-400">BRAIN.js v4.2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SLEEP:</span>
                        <span className="text-red-400">32%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>BUG COUNT:</span>
                        <span className="text-yellow-400">42</span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span>MOOD:</span>
                        <span className="text-green-400">🤓 NERDY EXCITEMENT</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-black/50 retro-border mb-4">
                    <h4 className="text-xl text-yellow-400 mb-2">🚀 SKILL METRICS</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <span className="text-xl mr-1">⚛️</span> React.js:
                          </span>
                          <span className="text-green-400">92%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 mt-1">
                          <div className="h-full bg-green-500 relative" style={{ width: "92%" }}>
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <span className="text-xl mr-1">🟢</span> Node.js:
                          </span>
                          <span className="text-green-400">85%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 mt-1">
                          <div className="h-full bg-green-500 relative" style={{ width: "85%" }}>
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <span className="text-xl mr-1">🍃</span> MongoDB:
                          </span>
                          <span className="text-green-400">88%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 mt-1">
                          <div className="h-full bg-green-500 relative" style={{ width: "88%" }}>
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <span className="text-xl mr-1">🔥</span> Firebase:
                          </span>
                          <span className="text-yellow-400">78%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 mt-1">
                          <div className="h-full bg-yellow-500 relative" style={{ width: "78%" }}>
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <span className="text-xl mr-1">🎨</span> UI/UX:
                          </span>
                          <span className="text-green-400">86%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 mt-1">
                          <div className="h-full bg-green-500 relative" style={{ width: "86%" }}>
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white"></div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center">
                            <span className="text-xl mr-1">☕</span> Coffee Consumption:
                          </span>
                          <span className="text-red-400">99%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 mt-1">
                          <div className="h-full bg-red-500 relative" style={{ width: "99%" }}>
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      onClick={handleDangerClick}
                      className="py-2 px-4 bg-red-600 text-white font-pressStart text-sm retro-border border-2 border-red-400 animate-pulse hover:bg-red-700 transition-colors relative group"
                    >
                      <span className="absolute -top-10 left-0 right-0 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-300">
                        SERIOUSLY, DON'T!
                      </span>
                      ⚠️ DANGER ! DO NOT CLICK ! 💀
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Section */}
          {/* Right Section */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
  className="bg-card p-6 retro-border h-full"
>
  <h3 className="text-2xl font-pressStart mb-6">SYSTEM SPECS</h3>
  
  {/* Education Section */}
  <div className="mb-6 font-vt323">
    <div className="flex items-center mb-2">
      <div className="w-2 h-6 bg-primary mr-2"></div>
      <h4 className="text-xl text-yellow-400">EDUCATION_MODULE</h4>
    </div>
    <div className="pl-4 border-l border-primary/30">
      <p className="flex justify-between">
        <span className="text-white">Delhi Technological University</span>
        <span className="text-accent">2020-2024</span>
      </p>
      <p className="text-muted-foreground">B.Tech in Mathematics and Computing Engineering</p>
      <p className="text-green-400">CGPA: 8.6 <span className="text-xs">[STATUS: OPTIMAL]</span></p>
    </div>
  </div>
  
  {/* Work Experience */}
  <div className="mb-6 font-vt323">
    <div className="flex items-center mb-2">
      <div className="w-2 h-6 bg-primary mr-2"></div>
      <h4 className="text-xl text-yellow-400">EXPERIENCE_LOG</h4>
    </div>
    
    <div className="pl-4 border-l border-primary/30 mb-4">
      <p className="flex justify-between">
        <span className="text-white">TerraDX Technologies Inc.</span>
        <span className="text-accent">Feb 2024-Present</span>
      </p>
      <p className="text-muted-foreground">Web Developer <span className="text-xs text-green-400 ml-2">[ONLINE]</span></p>
      <ul className="list-disc list-inside text-sm mt-1 space-y-1">
        <li className="text-green-300">Engineered QuantumDX: Next.js + FastAPI + Mapbox + Azure K8s</li>
        <li className="text-green-300">Built GAIA (RAG chatbot): Next.js + TypeScript + OpenAI + LangChain</li>
        <li className="text-green-300">Developed multi-agent system for automated code generation</li>
        <li className="text-green-300">Created geological data scraping pipeline with Selenium + Azure</li>
      </ul>
    </div>
    
    <div className="pl-4 border-l border-primary/30">
      <p className="flex justify-between">
        <span className="text-white">BUZZONEARTH</span>
        <span className="text-accent">Jun 2023-Jul 2023</span>
      </p>
      <p className="text-muted-foreground">Web Developer Intern <span className="text-xs text-blue-400 ml-2">[ARCHIVED]</span></p>
      <ul className="list-disc list-inside text-sm mt-1 space-y-1">
        <li className="text-blue-300">Climate Hackathon website (IIT Kanpur): React.js</li>
        <li className="text-blue-300">India MUN platform: React.js + Firebase + Razorpay</li>
        <li className="text-blue-300">Supported 4000+ student registrations and progress tracking</li>
      </ul>
    </div>
  </div>
  
  {/* Projects */}
  <div className="mb-6 font-vt323">
    <div className="flex items-center mb-2">
      <div className="w-2 h-6 bg-primary mr-2"></div>
      <h4 className="text-xl text-yellow-400">PROJECT_DATABASE</h4>
    </div>
    
    <div className="grid grid-cols-1 gap-3">
      <div className="bg-black/30 p-3 retro-border">
        <div className="flex justify-between items-center">
          <h5 className="text-white">DERIBIT CRYPTO TRADING BOT</h5>
          <span className="text-xs px-2 py-1 bg-red-900/50 text-red-400 retro-border">C++</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">High-performance trading system with sub-ms latency, processing 10K+ msgs/sec</p>
      </div>
      
      <div className="bg-black/30 p-3 retro-border">
        <div className="flex justify-between items-center">
          <h5 className="text-white">WORKSPACE</h5>
          <span className="text-xs px-2 py-1 bg-blue-900/50 text-blue-400 retro-border">React</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">Project management tool with Firebase, improved team productivity by 40%</p>
      </div>
      
      <div className="bg-black/30 p-3 retro-border">
        <div className="flex justify-between items-center">
          <h5 className="text-white">ADVANCED YELP-CAMP</h5>
          <span className="text-xs px-2 py-1 bg-green-900/50 text-green-400 retro-border">Node.js</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">Campground discovery platform with Google Maps API and 99.9% uptime</p>
      </div>
    </div>
  </div>
  
  {/* Tech Stack */}
  <div className="font-vt323">
    <div className="flex items-center mb-2">
      <div className="w-2 h-6 bg-primary mr-2"></div>
      <h4 className="text-xl text-yellow-400">TECH_STACK</h4>
    </div>
    
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div className="flex items-center">
        <span className="w-4 h-4 bg-primary/30 mr-2 flex items-center justify-center text-xs">►</span>
        <span className="text-white">Next.js/React</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4 bg-primary/30 mr-2 flex items-center justify-center text-xs">►</span>
        <span className="text-white">Node.js/Express</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4 bg-primary/30 mr-2 flex items-center justify-center text-xs">►</span>
        <span className="text-white">TypeScript</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4 bg-primary/30 mr-2 flex items-center justify-center text-xs">►</span>
        <span className="text-white">MongoDB/Firebase</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4 bg-primary/30 mr-2 flex items-center justify-center text-xs">►</span>
        <span className="text-white">C++/Python</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4 bg-primary/30 mr-2 flex items-center justify-center text-xs">►</span>
        <span className="text-white">Docker/K8s</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4 bg-primary/30 mr-2 flex items-center justify-center text-xs">►</span>
        <span className="text-white">FastAPI</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4 bg-primary/30 mr-2 flex items-center justify-center text-xs">►</span>
        <span className="text-white">Azure/Vercel</span>
      </div>
    </div>
    
    <div className="mt-4 p-2 bg-accent/10 retro-border border-accent">
      <p className="text-accent text-sm">
        <span className="animate-pulse inline-block mr-1">●</span> 
        SYSTEM SPECIALIZATION: RAG Chatbots, Data Pipeline Engineering, Full Stack Development
      </p>
    </div>
  </div>
  
  <div className="mt-8 flex gap-4">
    <a
      href="/resume.pdf"
      target="_blank"
      className="py-2 px-4 bg-primary text-black font-pressStart text-sm retro-shadow hover:translate-y-1 hover:shadow-none transition-all"
      rel="noreferrer"
    >
      DOWNLOAD SPECS 📄
    </a>
    <a
      href="https://www.linkedin.com/in/manoj-yadav-41806b202/"
      target="_blank"
      rel="noopener noreferrer"
      className="py-2 px-4 bg-secondary text-white font-pressStart text-sm retro-shadow hover:translate-y-1 hover:shadow-none transition-all"
    >
      CONNECT 🔗
    </a>
  </div>
</motion.div>
        </div>
      </div>

      {/* Error Message Animation */}
      <AnimatePresence>
        {showError && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 bg-red-500/30 rounded-lg blur-md"></div>
              <div className="relative bg-black p-6 retro-border border-2 border-red-500">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-red-600 mr-3 animate-pulse"></div>
                  <h3 className="text-2xl font-pressStart text-red-500">SYSTEM ERROR</h3>
                </div>
                
                <div className="font-vt323 text-lg">
                  {/* Terminal with proper scrolling */}
                  <div 
                    ref={terminalRef}
                    className="bg-black/80 p-2 mb-3 font-mono text-green-400 h-48 retro-border border-green-800 overflow-y-auto text-sm"
                    style={{ scrollBehavior: 'smooth' }}
                  >
                    <p className="mb-1 opacity-70">Last login: Fri Feb 28 15:42:13 on ttys001</p>
                    <p className="mb-1 opacity-70">manoj@brain:~$ sudo systemctl status brain</p>
                    {terminalLines.map((line, index) => (
                      <p 
                        key={index} 
                        className={`mb-1 ${
                          line.includes("ERROR") || line.includes("FAILED") || line.includes("failed") || line.includes("meltdown") 
                            ? "text-red-500" 
                            : line.startsWith("$") || line.startsWith("#") 
                              ? "text-blue-300"
                              : line.includes("WARNING") 
                                ? "text-yellow-300" 
                                : ""
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                    <motion.span 
                      className="inline-block w-2 h-4 bg-green-500"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    ></motion.span>
                  </div>
                  
                  <p className="text-white">🚨 CRITICAL FAILURE DETECTED 🚨</p>
                  <p className="text-red-400">ERROR CODE: XZ-42069-SEGFAULT</p>
                  <p className="text-white">🔥 Self-destruct sequence initialized... 🔥</p>
                  <div className="w-full bg-gray-800 h-4 mt-2 overflow-hidden">
                    <motion.div 
                      className="h-full bg-red-600 relative"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5 }}
                    >
                      <motion.div
                        className="absolute top-0 right-0 bottom-0 w-4 bg-red-300"
                        animate={{ 
                          x: [0, 5, 0],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{ repeat: Infinity, duration: 0.3 }}
                      />
                    </motion.div>
                  </div>
                  <p className="text-red-300 animate-pulse mt-2">😅 Just kidding! Your system is safe. 🛡️</p>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <motion.div 
                    className="w-20 h-20"
                    animate={{ 
                      rotate: [0, 15, -15, 15, -15, 0],
                      scale: [1, 1.2, 0.9, 1.1, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <div className="relative">
                      <Image
                        src="/error-monster.png"
                        alt="Error Monster"
                        width={80}
                        height={80}
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='%23ff0000' stroke='%23ff0000' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z'/%3E%3Ccircle cx='9' cy='9' r='1'/%3E%3Ccircle cx='15' cy='9' r='1'/%3E%3Cpath d='M8 15h8M12 12v3'/%3E%3C/svg%3E";
                        }}
                      />
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold border border-white"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        !
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}