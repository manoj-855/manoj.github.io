"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCheck, Calendar, Users, Award } from "lucide-react"

const stats = [
  { icon: <CheckCheck size={30} />, value: 4, label: "WORKS COMPLETED" },
  { icon: <Calendar size={30} />, value: 1.5, label: "YEARS OF EXPERIENCE" },
  { icon: <Users size={30} />, value: 3, label: "TOTAL CLIENTS" },
  { icon: <Award size={30} />, value: 0, label: "AWARD WON" },
]

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="py-16 bg-black relative">
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Background video */}
      <video autoPlay muted loop className="absolute w-full h-full object-cover opacity-30">
        <source src="/matrix-code.mp4" type="video/mp4" />
      </video>

      <div ref={ref} className="container px-4 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-primary/20 rounded-full text-primary">
                  {stat.icon}
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="text-4xl font-pressStart mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm font-vt323">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

