import type React from "react"
import type { Metadata } from "next"
import { VT323, Press_Start_2P } from "next/font/google"
import "./globals.css"

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
})

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
})

export const metadata: Metadata = {
  title: "Manoj Yadav | Retro Futuristic Portfolio",
  description: "Full Stack Web Developer & Mathematics and Computing Engineering Student",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${vt323.variable} ${pressStart2P.variable} bg-black text-green-400`}>{children}</body>
    </html>
  )
}



import './globals.css'