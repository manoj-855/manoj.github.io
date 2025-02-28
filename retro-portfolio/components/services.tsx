"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Code, 
  Smartphone, 
  Database, 
  Bot, 
  LineChart, 
  Cloud,
  Layers,
  Terminal,
  Cpu
} from "lucide-react"

const services = [
  {
    icon: <Code size={40} />,
    title: "Full-Stack Development",
    description: 
      "Creating responsive websites with React.js/Next.js frontend and Node/Express/MongoDB backend. Custom solutions for businesses of all sizes.",
    details: [
      "Frontend development with React.js, Next.js, and TypeScript",
      "Backend integration with Node.js, Express, and MongoDB/PostgreSQL",
      "RESTful API development and integration",
      "State management with Redux or Context API"
    ],
    tag: "Popular"
  },
  {
    icon: <Bot size={40} />,
    title: "AI & Chatbot Development",
    description: 
      "Building intelligent chatbots and AI-powered solutions using OpenAI and Anthropic APIs with RAG (Retrieval-Augmented Generation).",
    details: [
      "Custom chatbot development with GPT-4 and Claude integration",
      "Retrieval-Augmented Generation (RAG) systems",
      "Multi-agent chatbot architecture",
      "Natural language processing for task automation"
    ],
    tag: "New"
  },
  {
    icon: <Database size={40} />,
    title: "Data Engineering",
    description: 
      "Creating data pipelines, scraping solutions, and database architectures to transform raw data into valuable insights.",
    details: [
      "Web scraping with Selenium and BeautifulSoup",
      "ETL pipeline development",
      "Database design and optimization",
      "Cloud storage integration (Azure Blob, Firebase)"
    ]
  },
  {
    icon: <Smartphone size={40} />,
    title: "Responsive Design",
    description: 
      "Crafting fully responsive websites that work flawlessly across all devices, from desktops to mobile phones.",
    details: [
      "Mobile-first design approach",
      "Cross-browser compatibility",
      "Performance optimization for mobile devices",
      "Interactive UI components"
    ]
  },
  {
    icon: <Cloud size={40} />,
    title: "Cloud Solutions",
    description: 
      "Deploying and managing applications on cloud platforms with Docker, Kubernetes, and Azure services.",
    details: [
      "Azure Kubernetes Service (AKS) configuration",
      "Docker containerization",
      "Cloud database integration (CosmosDB)",
      "Serverless architecture implementation"
    ]
  },
  {
    icon: <LineChart size={40} />,
    title: "Trading Algorithms",
    description: 
      "Developing high-performance trading bots for cryptocurrency markets with low-latency execution and real-time data processing.",
    details: [
      "C++ trading system development",
      "Real-time market data processing",
      "WebSocket integration for live updates",
      "Performance optimization for trading systems"
    ],
    tag: "Advanced"
  }
]

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <section id="service" className="py-20 relative overflow-hidden">
      {/* Retro grid background */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border-2 border-primary/30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 border-2 border-accent/30 animate-pulse delay-1000"></div>
      
      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-pressStart mb-4 text-gradient">SERVICES</h2>
          <p className="text-xl font-vt323 max-w-2xl mx-auto leading-relaxed">
            Level up your digital presence with my specialized tech services.
            From responsive websites to AI-powered solutions, I've got the skills to bring your ideas to life.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-6 retro-border hover:border-accent transition-all hover:-translate-y-2 group relative overflow-hidden"
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
            >
              {service.tag && (
                <div className="absolute -right-8 top-4 bg-accent text-black font-pressStart text-xs py-1 px-8 transform rotate-45">
                  {service.tag}
                </div>
              )}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 flex items-center justify-center bg-muted/50 rounded-lg mb-6 text-primary group-hover:text-accent group-hover:scale-110 transition-all duration-300 retro-shadow">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-pressStart mb-4">{service.title}</h3>
                <p className="font-vt323 text-lg mb-4">{service.description}</p>
                
                {/* Service details with animation */}
                <div className={`mt-4 w-full transition-all duration-300 ${activeService === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <ul className="text-left font-vt323 text-lg space-y-2 border-t border-primary/30 pt-4 mt-2">
                    {service.details && service.details.map((detail, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: activeService === index ? 1 : 0, x: activeService === index ? 0 : -10 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">❯</span> {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <motion.div 
                  className="mt-4 font-vt323"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeService === index ? 0 : 1 }}
                >
                  <span className="text-primary cursor-pointer hover:text-accent">Hover for details...</span>
                </motion.div>
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all"></div>
              <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-all"></div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 max-w-2xl mx-auto bg-card/50 p-8 retro-border"
        >
          <h3 className="text-2xl font-pressStart mb-4">NEED A CUSTOM SOLUTION?</h3>
          <p className="font-vt323 text-lg mb-6">
            Let's discuss your project requirements and create a tailored solution that perfectly fits your needs.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 py-3 px-6 bg-primary text-black font-pressStart text-sm hover:bg-accent transition-colors retro-shadow"
          >
            <Terminal size={16} />
            START A PROJECT
          </a>
        </motion.div>
      </div>
      
      {/* CSS for additional effects */}
      <style jsx>{`
        .text-gradient {
          background: linear-gradient(to right, #64ffda, #00bcd4);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-floating {
          animation: floating 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}