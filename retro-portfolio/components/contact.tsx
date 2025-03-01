"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, Send, Loader2 } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null)
  const [typingEffect, setTypingEffect] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)

  const fullText = "I'm ready to collaborate on exciting projects! Drop me a message and let's create something awesome together."
  
  // Typing effect
  useEffect(() => {
    if (typingEffect.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypingEffect(fullText.substring(0, typingEffect.length + 1))
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [typingEffect])

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Play retro sound effect
    playTypingSound()
  }

  const playTypingSound = () => {
    // In a real implementation, you would use a sound library or the Web Audio API
    // This is just a placeholder for the concept
    console.log("Playing typing sound")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus(Math.random() > 0.1 ? "success" : "error") // Occasional error for demo

      // Reset form after success
      if (submitStatus === "success") {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }

      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 3000)
    }, 1500)
  }

  const inputClasses = "w-full p-3 bg-muted text-primary font-vt323 text-lg retro-border focus:border-accent outline-none transition-all hover:bg-muted/80 focus:bg-black/30"

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* CRT overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10 pointer-events-none"></div>
      {/* <div className="absolute inset-0 bg-[url('/crt-lines.png')] bg-repeat opacity-5 z-10 pointer-events-none"></div> */}

      {/* Background video */}
      {/* <video autoPlay muted loop className="absolute w-full h-full object-cover">
        <source src="/retro_city.mp4" type="video/mp4" />
      </video> */}

      <div className="container px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-pressStart mb-4 glitch" data-text="CONTACT">CONTACT</h2>
          <motion.div 
            className="flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xl font-vt323 inline">
              {typingEffect}
              <span className={`inline-block w-2 h-5 bg-primary ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
            </p>
          </motion.div>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        <div className="bg-card/80 backdrop-blur-sm p-8 retro-border shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-pressStart mb-6 text-primary">SEND ME A MESSAGE</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label className="font-vt323 text-lg mb-2 block text-primary/70">YOUR NAME</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name..."
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div className="group">
                  <label className="font-vt323 text-lg mb-2 block text-primary/70">YOUR EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email..."
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div className="group">
                  <label className="font-vt323 text-lg mb-2 block text-primary/70">SUBJECT</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What's this about?"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div className="group">
                  <label className="font-vt323 text-lg mb-2 block text-primary/70">MESSAGE</label>
                  <textarea
                    name="message"
                    placeholder="Type your message here..."
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-3 px-6 bg-primary text-black font-pressStart text-sm retro-shadow hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          SENDING...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          SEND MESSAGE
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-accent/80 translate-y-full group-hover:translate-y-0 transition-transform duration-200"></span>
                  </button>

                  {submitStatus === "success" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-green-900/50 border-l-4 border-green-400 text-green-400 font-vt323"
                    >
                      <span className="font-bold">[SUCCESS]</span> Your message has been sent successfully!
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-red-900/50 border-l-4 border-red-400 text-red-400 font-vt323"
                    >
                      <span className="font-bold">[ERROR]</span> There was an error sending your message. Please try again.
                    </motion.div>
                  )}
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary/50"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary/50"></div>
              
              <h3 className="text-2xl font-pressStart mb-6 text-primary">GET IN TOUCH</h3>

              <p className="font-vt323 text-lg mb-8 leading-relaxed">
                Ready to start a new quest together? Fill out this form or contact me directly through one of the channels below.
              </p>

              <div className="space-y-6 mb-8">
                <motion.div 
                  className="flex items-start gap-4 p-3 hover:bg-primary/10 transition-colors rounded"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-pressStart text-sm mb-1 text-primary/90">LOCATION</h4>
                    <p className="font-vt323 text-lg">Mahendragarh-123029, HARYANA</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 p-3 hover:bg-primary/10 transition-colors rounded"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-pressStart text-sm mb-1 text-primary/90">PHONE</h4>
                    <p className="font-vt323 text-lg">+91 9462229627</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start gap-4 p-3 hover:bg-primary/10 transition-colors rounded"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-pressStart text-sm mb-1 text-primary/90">EMAIL</h4>
                    <p className="font-vt323 text-lg">mojirao770@gmail.com</p>
                  </div>
                </motion.div>
              </div>

              <h3 className="text-xl font-pressStart mb-4 text-primary">SOCIAL LINKS</h3>

              <div className="flex gap-4">
                {[
                  { icon: Facebook, url: "https://www.facebook.com/moji.rao.338", label: "Facebook" },
                  { icon: Instagram, url: "https://www.instagram.com/byteofmanoj/", label: "Instagram" },
                  { icon: Twitter, url: "https://twitter.com/ManojYa82895275", label: "Twitter" },
                  { icon: Linkedin, url: "https://www.linkedin.com/in/manoj-yadav-41806b202/", label: "LinkedIn" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full text-primary hover:bg-primary hover:text-black transition-colors"
                    whileHover={{ y: -5, scale: 1.1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                    aria-label={social.label}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Add a pixel art footer decoration */}
        <div className="flex justify-center mt-12">
          <div className="pixel-art-spaceship w-16 h-16 animate-float"></div>
        </div>
      </div>

      {/* Add necessary CSS for additional effects */}
      <style jsx>{`
        .glitch {
          position: relative;
          text-shadow: 0.05em 0 0 rgba(255,0,0,0.75), -0.05em -0.025em 0 rgba(0,255,0,0.75), 0.025em 0.05em 0 rgba(0,0,255,0.75);
          animation: glitch 500ms infinite;
        }
        
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch::before {
          left: 2px;
          text-shadow: -2px 0 #ff00c1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        
        .glitch::after {
          left: -2px;
          text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
          animation: glitch-anim2 1s infinite linear alternate-reverse;
        }
        
        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(255,0,0,0.75), -0.05em -0.025em 0 rgba(0,255,0,0.75), 0.025em 0.05em 0 rgba(0,0,255,0.75);
          }
          14% {
            text-shadow: 0.05em 0 0 rgba(255,0,0,0.75), -0.05em -0.025em 0 rgba(0,255,0,0.75), 0.025em 0.05em 0 rgba(0,0,255,0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.75), 0.025em 0.025em 0 rgba(0,255,0,0.75), -0.05em -0.05em 0 rgba(0,0,255,0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.75), 0.025em 0.025em 0 rgba(0,255,0,0.75), -0.05em -0.05em 0 rgba(0,0,255,0.75);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255,0,0,0.75), 0.05em 0 0 rgba(0,255,0,0.75), 0 -0.05em 0 rgba(0,0,255,0.75);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255,0,0,0.75), 0.05em 0 0 rgba(0,255,0,0.75), 0 -0.05em 0 rgba(0,0,255,0.75);
          }
          100% {
            text-shadow: -0.025em 0 0 rgba(255,0,0,0.75), -0.025em -0.025em 0 rgba(0,255,0,0.75), -0.025em -0.05em 0 rgba(0,0,255,0.75);
          }
        }
        
        @keyframes glitch-anim {
          0% {
            clip: rect(40px, 9999px, 94px, 0);
          }
          5% {
            clip: rect(32px, 9999px, 18px, 0);
          }
          10% {
            clip: rect(54px, 9999px, 96px, 0);
          }
          15% {
            clip: rect(19px, 9999px, 20px, 0);
          }
          20% {
            clip: rect(16px, 9999px, 8px, 0);
          }
          25% {
            clip: rect(22px, 9999px, 35px, 0);
          }
          30% {
            clip: rect(58px, 9999px, 15px, 0);
          }
          100% {
            clip: rect(22px, 9999px, 35px, 0);
          }
        }

        @keyframes glitch-anim2 {
          0% {
            clip: rect(65px, 9999px, 119px, 0);
          }
          15% {
            clip: rect(25px, 9999px, 122px, 0);
          }
          30% {
            clip: rect(14px, 9999px, 56px, 0);
          }
          45% {
            clip: rect(64px, 9999px, 109px, 0);
          }
          50% {
            clip: rect(82px, 9999px, 97px, 0);
          }
          100% {
            clip: rect(82px, 9999px, 97px, 0);
          }
        }
        
        .pixel-art-spaceship {
          background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='14' y='6' width='4' height='4' fill='%23F5F5F5'/%3E%3Crect x='10' y='10' width='12' height='4' fill='%23F5F5F5'/%3E%3Crect x='6' y='14' width='20' height='4' fill='%23F5F5F5'/%3E%3Crect x='10' y='18' width='12' height='4' fill='%23F5F5F5'/%3E%3Crect x='10' y='22' width='4' height='4' fill='%23F5F5F5'/%3E%3Crect x='18' y='22' width='4' height='4' fill='%23F5F5F5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}