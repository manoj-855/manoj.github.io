"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const internships = [
  {
    title: "IndiaMUN",
    role: "Full stack Web Development",
    period: "August 2023 - September 2023",
    description:
      "Developed the India MUN website using React.js and Firebase, providing an online platform for 100+ school and college students to register and complete the course as India's Young Forest Ambassador.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "BuzzOnEarth",
    role: "Front End Developer",
    period: "August 2023 - September 2023",
    description:
      "Created a website using React.js for the Climate Hackathon held at IIT Kanpur. Utilized React.js, Bootstrap library to create responsive user interfaces, ensuring an engaging and user-friendly UI experience.",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function Internships() {
  return (
    <section className="py-20 bg-card">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-pressStart mb-4">INTERNSHIPS</h2>
          <p className="text-xl font-vt323">Some of my recent Internships!</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        <div className="space-y-12">
          {internships.map((internship, index) => (
            <motion.div
              key={internship.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/20 rounded-lg blur-sm"></div>
                  <Image
                    src={internship.image || "/placeholder.svg"}
                    alt={internship.title}
                    width={600}
                    height={400}
                    className="relative w-full h-64 object-cover retro-border"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-pressStart mb-2">{internship.title}</h3>
                <div className="text-lg font-vt323 text-accent mb-2">{internship.role}</div>
                <div className="text-sm font-vt323 text-muted-foreground mb-4">{internship.period}</div>
                <p className="font-vt323 text-lg">{internship.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

