"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "HOME", href: "#home" },
  { name: "ABOUT", href: "#about" },
  { name: "SERVICES", href: "#service" },
  { name: "WORK", href: "#work" },
  { name: "GITHUB", href: "#github" },
  { name: "CONTACT", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-sm" : "bg-transparent"}`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="#home" className="text-2xl font-pressStart text-primary flex items-center">
          <span className="mr-2">{">"}</span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            MANOJ_YDV
          </motion.span>
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
            _
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="text-primary hover:text-accent transition-colors font-pressStart text-sm"
              >
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="md:hidden bg-card border-t border-primary"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <ul className="py-4 px-4 space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-primary hover:text-accent transition-colors block py-2 font-pressStart text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {`> ${item.name}`}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  )
}

