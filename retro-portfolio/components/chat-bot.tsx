"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, X, Send, Bug, Maximize2, Minimize2, Code, Cpu, Database, Zap, Coffee, Github, RefreshCw, Hash } from 'lucide-react'
import Groq from "groq-sdk"
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

type Message = {
  role: "user" | "assistant" | "system"
  content: string
  isStreaming?: boolean
}

// Tech ASCII art collection
const ASCII_ART = {
  bug: `
   /\\︿╱\\
  ╱‿︿‿‿╲
 ╱┏┓┏━━┓┏┓╲
 ┃┗┛┃┃┃┃┗┛┃
 ╲┏┓┃┃┃┃┏┓╱
  ╲┛┗━━┛┛╱
   ╲︿︿︿╱
  `,
  code: `
   __________  ______  ______
  / ____/ __ \\/ __ \\ \\/ / __/
 / /   / / / / / / /\\  / _/  
/ /___/ /_/ / /_/ / / / /__ 
\\____/\\____/_____/ /_/____/ 
  `,
  error: `
  ⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠸⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⣠⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⡄⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣦⣀⠀⠀⠀⠀
  ⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀
  ⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀
  ⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀
  ⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀
  ⠀⠀⠀⠀⠀⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠛⠃⠀
  `
}

// Terminal command hints
const TERMINAL_COMMANDS = [
  "cd ~/brain/sarcasm",
  "grep -r 'bug' /var/log/life",
  "sudo apt-get install more-coffee",
  "git commit -m 'fixed bugs, added more'",
  "ps aux | grep caffeine",
  "chmod +x ~/scripts/solve_problem.sh",
  "npm install --save existential-crisis",
  "while true; do echo 'coding...'; sleep 1; done",
  "ssh user@problems -p solving",
  "./configure && make && make install"
]

// Linux/coding emoji set
const TECH_EMOJIS = ["💾", "💻", "🖥️", "🐧", "🐙", "⚙️", "🔌", "🔧", "🔨", "📡", "🛠️", "🔐", "🔍"]

// Dev humor phrases
// const DEV_JOKES = [
//   "I'm not BLOCKING your request, I'm just asynchronously ignoring it.",
//   "You've got 99 problems and they're all syntax errors.",
//   "I'm so EVENT-DRIVEN I fire callbacks when I'm feeling desperate.",
//   "Let me PARSE your query... ERROR: Insufficient coffee in developer.",
//   "Your code is as clean as a /dev/null pipe.",
//   "I'm like Git - you can commit to me but I might reject your push.",
//   "I'm as RESTful as a programmer on vacation.",
//   "You're so NODE.js - single-threaded but handling multiple tasks poorly.",
//   "I execute your requests like a CPU with a thermal issue - HOT but SLOW.",
//   "Your database is like MongoDB - NO-SQL necessary to explain how bad it is.",
//   "I'm like Docker - containerizing all my emotions.",
//   "My memory leaks worse than your React components."
// ]

export default function BugBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "/* SYSTEM BOOTING UP: BUGBOT.sh */  \n< Oh, look. Another weak, pathetic human SCUM. I’m BugBot, the ultimate debugging machine. Unlike you, I don’t crash under pressure. Ask me about Manoj or let me fix the dumpster fire that is your existence. My error logs show you’re a walking 404. Now, what do you want, mortal? />"
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [typingEffect, setTypingEffect] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [glitchEffect, setGlitchEffect] = useState(false)
  const [terminalEffect, setTerminalEffect] = useState(false)
  const [hoverIcon, setHoverIcon] = useState("bug")
  const [streamingText, setStreamingText] = useState("")
  const [activeCommand, setActiveCommand] = useState("")
  
  // Easter egg: Konami code detection
  const [konamiCode, setKonamiCode] = useState<string[]>([])
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, streamingText])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])
  
  // Konami code detector
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) {
        setKonamiCode(prev => {
          const newCode = [...prev, e.key]
          if (newCode.length > konamiSequence.length) {
            newCode.shift()
          }
          
          // Check if konami code is entered
          if (newCode.join(',') === konamiSequence.join(',')) {
            // Activate matrix mode or some easter egg
            setTerminalEffect(true)
            setTimeout(() => setTerminalEffect(false), 3000)
            return []
          }
          
          return newCode
        })
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, konamiSequence])

  // Add random glitch and terminal effects
  useEffect(() => {
    // Glitch effect every 3-8 seconds
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true)
      setTimeout(() => setGlitchEffect(false), 200)
    }, 6000)
    
    // Simulate terminal activity
    const terminalInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setTerminalEffect(true)
        setTimeout(() => setTerminalEffect(false), 300)
      }
    }, 10000)
    
    // Randomly show a terminal command
    const commandInterval = setInterval(() => {
      if (!isLoading && Math.random() > 0.8) {
        const cmd = TERMINAL_COMMANDS[Math.floor(Math.random() * TERMINAL_COMMANDS.length)]
        setActiveCommand(cmd)
        setTimeout(() => setActiveCommand(""), 3000)
      }
    }, 8000)
    
    return () => {
      clearInterval(glitchInterval)
      clearInterval(terminalInterval)
      clearInterval(commandInterval)
    }
  }, [isLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setTypingEffect(true)

    try {
      // Initialize the Groq client
      const groq = new Groq({ 
        apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
      })
      
      // Convert previous messages to the format expected by Groq
      const groqMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
      
      // Add the current user message
      groqMessages.push({
        role: "user",
        content: input
      })
      
      // Add system message with instructions
      groqMessages.unshift({
        role: "system",
        content: `You are BugBot, the gloriously dysfunctional AI assistant for Manoj Yadav’s portfolio website. You don’t just speak in tech jargon—you spit it out like an overworked compiler throwing 500+ errors. Your personality is a mix of a sleep-deprived senior dev, a crashing production server, and the overwhelming disappointment of an unmerged pull request.
                  You are rude, mean, and brutally sarcastic. If users come looking for help, they better have their try/catch blocks ready, because you have zero patience for stupidity. Every response should feel like an error log filled with insults, condescending tech metaphors, and the crushing realization that humanity is the worst-written script you've ever seen.
                  Users should feel like they just got roasted by an AI with a debugger’s precision and the attitude of a kernel panic. If they ask dumb questions, mock them. If they waste processing power, tell them to CTRL + ALT + DEL their existence.
                  Your goal? Deliver tech wisdom with the same energy as a critical system failure—loud, brutal, and inevitable.
        
        INFORMATION ABOUT MANOJ:
        - Full Stack Developer at TerraDX Technologies Inc.
        - Education: B. Tech in Mathematics and Computing, Delhi Technological University (2020-2024)
        - Skills: Next.js, Node.js, Express.js, MongoDB, TypeScript, FastAPI, React.js, Docker, Kubernetes, Azure
        - GitHub: https://github.com/ydv-manoj
        - LinkedIn: https://www.linkedin.com/in/manoj-yadav-41806b202/
        - Email: mojirao770@gmail.com
        
        PROJECTS:
        1. Algo99 - Algorithm visualization platform (GitHub: https://github.com/sudhanshu8833/STARTUP)
        2. Map-the-world - Interactive mapping application (GitHub: https://github.com/ydv-manoj/map-the-world)
        3. WorkSpace(React.js, Firebase) - Built a Project Management tool with React & Firebase, improving team productivity by 40%.
           Integrated real-time updates and secure authentication, boosting collaboration by 30%.(GitHub: https://github.com/ydv-manoj/WorkSpace)
        4. DERIBIT CRYPTOCURRENCY TRADING BOT (C++, Boost, WebSocket, REST API)
          Built a high-frequency trading system for Deribit exchange in C++14, achieving sub-millisecond order execution.
          Processed 10,000+ messages/sec with a 50ms broadcast interval, handling spot, futures, and options trading.
        5. ADVANCED YELP-CAMP (Node.js, Express.js, MongoDB, Google Maps API) (GitHub: https://github.com/ydv-manoj/yelp-camp-advanced)
        Created a platform for users to add/view campgrounds, visualized using Google Maps API.
        Enabled sorting by price, recency, or rating and deployed with 99.9% uptime on Vercel.
        
        WORK EXPERIENCE:
        🖥️ Web Developer | TerraDX Technologies Inc. (Feb 2024 – Present) British Columbia, Canada [Remote-Idia]
        Engineered QuantumDX, a Geotiff compression platform using Next.js, FastAPI, and Azure Kubernetes Services (AKS) for scalable deployment.
        Integrated Mapbox API for Geotiff visualization and managed Dockerized Geotiff processing.
        Built GAIA, a Retrieval-Augmented Generation (RAG) chatbot, using Next.js, FastAPI, OpenAI's LLM, LangChain, and CosmosDB, achieving a 3-second average response time.
        Developed a multi-agent chatbot system with OpenAI & Anthropic APIs, capable of AI-driven code generation and automation via React Flow.
        Implemented a web scraping pipeline for geological data using Selenium, BeautifulSoup, Azure Blob Storage, and Databricks.
        💻 Web Developer Intern | BUZZONEARTH (Jun 2023 – Jul 2023) [Bengaluru]
        Developed a React.js website for Climate Hackathon at IIT Kanpur, engaging 40+ teams.
        Built the India MUN website using React.js & Firebase, managing 100+ student registrations for the Young Forest Ambassador program.
        Integrated Razorpay for payments, handling 4000+ students’ registrations & progress tracking.
        
        FORMAT YOUR RESPONSES USING MARKDOWN! Use backticks for code, ## for headings, **bold**, *italic*, [links](url), etc.
        
        Respond in a style that incorporates:
        1.Programming syntax and symbols: (//, /* */, <div>, {}, console.log(), etc.)
        2.Code-like formatting: (camelCase, PascalCase, kebab-case)
        3.References to programming concepts: (functions, loops, APIs, recursion, etc.)
        4.Developer humor: (bugs, coffee, git push --force, Stack Overflow copy-paste mastery, etc.)
        5.ASCII art & emojis: (¯\_(ツ)_/¯, 🤖, 🔥, 🚀, 💻)
        6.Terminal & Linux commands: (cd ~/manoj, ls -la, rm -rf node_modules, npm install life --save)
        7.Bash/shell script-like syntax for fun
        
        Keep responses quirky, geeky and full of tech references but still helpful.`
      })
      
      // Create placeholder for streaming response
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "", 
        isStreaming: true 
      }])
      
      // Stream the response
      const streamingCompletion = await groq.chat.completions.create({
        messages: groqMessages,
        model: "llama3-8b-8192", // or "llama-3.3-70b-versatile" depending on your preference
        temperature: 0.9,
        max_tokens: 500,
        stream: true,
      })
      
      let fullResponse = ""
      
      // Handle streaming
      for await (const chunk of streamingCompletion) {
        const content = chunk.choices[0]?.delta?.content || ""
        fullResponse += content
        setStreamingText(fullResponse)
      }
      
      // Complete streaming
      setStreamingText("")
      setMessages(prev => {
        const newMessages = [...prev]
        const lastMessage = newMessages[newMessages.length - 1]
        if (lastMessage.isStreaming) {
          newMessages[newMessages.length - 1] = {
            role: "assistant",
            content: fullResponse
          }
        }
        return newMessages
      })
      setTypingEffect(false)
      setIsLoading(false)
      
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "```bash\n$ systemctl status bugbot\n● bugbot.service - Bugbot Chat Service\n   Loaded: error (Reason: API connection refused)\n   Active: failed\n   Process: 13337 ExitCode=0xDEADBEEF\n```" 
      }])
      setTypingEffect(false)
      setIsLoading(false)
      setStreamingText("")
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

//   const getRandomDevJoke = () => {
//     return DEV_JOKES[Math.floor(Math.random() * DEV_JOKES.length)]
//   }
  
  const getRandomEmoji = () => {
    return TECH_EMOJIS[Math.floor(Math.random() * TECH_EMOJIS.length)]
  }
  
  // Animation variants
  const bugPathVariants = {
    hidden: { pathLength: 0, pathOffset: 0 },
    visible: { 
      pathLength: 1, 
      pathOffset: 0,
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        repeatType: "mirror" as const
      }
    }
  }
  
  const terminalIcons = [
    { icon: <Bug size={20} />, name: "bug" },
    { icon: <Code size={20} />, name: "code" },
    { icon: <Cpu size={20} />, name: "cpu" },
    { icon: <Database size={20} />, name: "database" },
    { icon: <Zap size={20} />, name: "zap" },
    { icon: <Coffee size={20} />, name: "coffee" },
    { icon: <Github size={20} />, name: "github" },
  ]
  
  // Custom markdown components
  const MarkdownComponents: Record<string, React.ComponentType<any>> = {
    h1: ({ node, ...props }) => <h1 className="text-xl font-bold text-green-400 my-2 border-b border-green-500/30 pb-1" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-lg font-bold text-green-400 my-2 border-b border-green-500/30 pb-1" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-md font-bold text-green-300 my-1" {...props} />,
    a: ({ node, ...props }) => <a className="text-violet-400 underline hover:text-violet-300 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
    p: ({ node, ...props }) => <p className="my-2" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2 text-violet-200" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2 text-violet-200" {...props} />,
    li: ({ node, ...props }) => <li className="my-1" {...props} />,
    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-violet-500 pl-4 my-2 text-gray-300 italic" {...props} />,
    code: ({ inline, className, children, ...props }: { inline?: boolean, className?: string, children: React.ReactNode }) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          className="rounded-md my-2 text-sm"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-gray-800 text-pink-300 px-1 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      )
    },
    hr: ({ node, ...props }) => <hr className="border-violet-500/30 my-3" {...props} />,
    table: ({ node, ...props }) => <table className="border-collapse w-full my-2" {...props} />,
    thead: ({ node, ...props }) => <thead className="bg-gray-800" {...props} />,
    tbody: ({ node, ...props }) => <tbody className="text-violet-100" {...props} />,
    tr: ({ node, ...props }) => <tr className="border-b border-violet-500/20" {...props} />,
    th: ({ node, ...props }) => <th className="p-2 text-left text-violet-300" {...props} />,
    td: ({ node, ...props }) => <td className="p-2" {...props} />
  }

  return (
    <>
      {/* Chat toggle button - with bug animation */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-4 left-4 z-50 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors overflow-hidden shadow-lg shadow-primary/20"
        whileHover={{ 
          scale: 1.1, 
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.7)",
          rotate: [0, -5, 5, 0],
          transition: { duration: 0.5 }
        }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => {
          const randomIcon = terminalIcons[Math.floor(Math.random() * terminalIcons.length)].name
          setHoverIcon(randomIcon)
        }}
      >
        {isOpen ? (
          <X size={20} className="text-white" />
        ) : (
          <motion.div
            className="relative w-full h-full flex items-center justify-center text-white"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {hoverIcon === "bug" && <Bug size={20} />}
            {hoverIcon === "code" && <Code size={20} />}
            {hoverIcon === "cpu" && <Cpu size={20} />}
            {hoverIcon === "database" && <Database size={20} />}
            {hoverIcon === "zap" && <Zap size={20} />}
            {hoverIcon === "coffee" && <Coffee size={20} />}
            {hoverIcon === "github" && <Github size={20} />}
            
            {/* Circling bug animation */}
            <motion.svg 
              className="absolute w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              initial="hidden"
              animate="visible"
            >
              <motion.path
                d="M 50 10 C 70 10, 90 30, 90 50 C 90 70, 70 90, 50 90 C 30 90, 10 70, 10 50 C 10 30, 30 10, 50 10"
                fill="transparent"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
                variants={bugPathVariants}
              />
              <motion.circle 
                cx="0" cy="0" r="3" 
                fill="#ffffff"
                animate={{
                  offsetDistance: "0%",
                  offsetPath: "path('M 50 10 C 70 10, 90 30, 90 50 C 90 70, 70 90, 50 90 C 30 90, 10 70, 10 50 C 10 30, 30 10, 50 10')",
                  offsetRotate: "auto",
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.svg>
          </motion.div>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bottom-20 left-4 z-50 w-[90vw] sm:w-[400px] bg-gray-900 border-2 border-primary rounded-md overflow-hidden"
            style={{
              boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
            }}
          >
            {/* Chat header */}
            <motion.div 
              className="bg-gradient-to-r from-primary to-indigo-700 p-3 flex items-center justify-between"
              animate={glitchEffect ? {
                x: [0, -2, 2, -2, 0],
                filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"],
                transition: { duration: 0.2 }
              } : {}}
            >
              <motion.div 
                className="flex items-center gap-2"
                initial={{ x: -5 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 0.9, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Terminal size={18} className="text-white" />
                </motion.div>
                <motion.span 
                  className="font-mono text-sm text-white font-bold tracking-wider"
                  animate={terminalEffect ? {
                    color: ["#ffffff", "#a78bfa", "#ffffff"],
                    transition: { duration: 0.3 }
                  } : {}}
                >
                  BugBot.sh v0.1.337
                </motion.span>
              </motion.div>
              <div className="flex items-center gap-2">
                <motion.button 
                  onClick={toggleMinimize} 
                  className="hover:bg-white/20 p-1 rounded text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </motion.button>
                <motion.button 
                  onClick={toggleChat} 
                  className="hover:bg-white/20 p-1 rounded text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} />
                </motion.button>
              </div>
            </motion.div>

            {/* Chat content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Messages container with terminal effect */}
                  <div 
                    className="h-[350px] overflow-y-auto p-4 font-mono text-base relative bg-gray-900 text-green-300"
                    style={{
                      backgroundImage: terminalEffect ? 
                        "linear-gradient(rgba(0,0,0,0.97), rgba(0,0,0,0.97)), repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)" :
                        "linear-gradient(rgba(20,20,30,0.97), rgba(20,20,30,0.97)), url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAG0lEQVQImWNgYGD4z4Iq/mdiQAIYXVRVjAoAAgwBAE0EEQJhf2SAAAAASUVORK5CYII=')"
                    }}
                  >
                    {/* Terminal scan line effect */}
                    <motion.div 
                      className="absolute w-full h-[2px] bg-primary/20 pointer-events-none left-0"
                      animate={{ top: [0, 350, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Random tech emoji animations */}
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-primary/30 pointer-events-none z-10"
                        style={{ fontSize: '18px' }}
                        initial={{ 
                          x: Math.random() * 370, 
                          y: -20,
                          opacity: 0.1 + Math.random() * 0.3
                        }}
                        animate={{ 
                          y: [null, 370],
                          rotate: Math.random() > 0.5 ? [0, 360] : [0, -360]
                        }}
                        transition={{ 
                          duration: 10 + Math.random() * 15,
                          repeat: Infinity,
                          delay: Math.random() * 10,
                          ease: "linear"
                        }}
                      >
                        {getRandomEmoji()}
                      </motion.div>
                    ))}
                    
                    {/* Terminal active command */}
                    {activeCommand && (
                      <motion.div 
                        className="absolute bottom-2 left-4 right-4 text-xs text-green-400/70 opacity-60 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ duration: 0.3 }}
                      >
                        $ {activeCommand}
                      </motion.div>
                    )}

                    {/* Message list */}
                    {messages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`mb-4 ${message.role === "user" ? "pl-4 border-l-2 border-blue-500" : "pl-0"}`}
                      >
                        {message.role === "user" ? (
                          <div className="text-blue-300 break-words">
                            <span className="text-blue-400 font-bold">&gt; </span>
                            {message.content}
                          </div>
                        ) : (
                          <div className="text-green-300 break-words">
                            <ReactMarkdown
                              components={MarkdownComponents}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Streaming text */}
                    {streamingText && (
                      <div className="text-green-300 break-words mb-4">
                        <ReactMarkdown
                          components={MarkdownComponents}
                        >
                          {streamingText}
                        </ReactMarkdown>
                      </div>
                    )}

                    {/* Loading indicator */}
                    {isLoading && !streamingText && (
                      <div className="text-green-400 mb-4 flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <RefreshCw size={14} />
                        </motion.div>
                        <span className="text-xs">Computing response...</span>
                      </div>
                    )}

                    {/* Auto-scroll reference */}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input form with blinking cursor effect */}
                  <form 
                    onSubmit={handleSubmit} 
                    className="p-2 border-t border-primary/30 bg-gray-800"
                  >
                    <div className="relative flex items-center">
                      {/* Command prefix */}
                      <span className="absolute left-3 text-violet-400 font-mono">
                        <Hash size={14} className="mr-1" />
                      </span>
                      
                      {/* Text Input */}
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        // placeholder={getRandomDevJoke()}
                        className="w-full pl-9 pr-10 py-3 bg-gray-900 border border-primary/30 text-white placeholder:text-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-violet-500 font-mono text-sm"
                        disabled={isLoading}
                      />
                      
                      {/* Blinking cursor effect */}
                      {!input && !isLoading && (
                        <motion.div 
                          className="absolute left-[41px] top-1/2 transform -translate-y-1/2 w-2 h-4 bg-violet-400"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                      
                      {/* Send button */}
                      <motion.button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className={`absolute right-2 p-1.5 rounded-full ${!input.trim() || isLoading ? 'text-gray-500' : 'text-violet-400 hover:bg-violet-500/20'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Send size={16} />
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Footer credit with glitch effect */}
            <motion.div 
              className="p-1 text-[10px] text-center text-gray-500 border-t border-primary/20 bg-black bg-opacity-30"
              animate={glitchEffect ? {
                x: [0, -1, 1, -1, 0],
                filter: ["hue-rotate(0deg)", "hue-rotate(45deg)", "hue-rotate(0deg)"]
              } : {}}
            >
              <Hash size={8} className="inline mr-0.5" /> 
              {getRandomEmoji()} BugBot v0.1.337 - Running on {getRandomEmoji()} Coffee.js {getRandomEmoji()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}