import React, { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface GlowingCardProps {
  children: React.ReactNode
  className?: string
}

export const GlowingCard: React.FC<GlowingCardProps> = ({ children, className }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl transition-all duration-300 ${className}`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10"
      >
        {children}
      </div>
      
      {/* Glow Effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        className="absolute inset-0 z-0 pointer-events-none rounded-2xl bg-indigo-500/10 blur-xl transition-opacity duration-500"
      />
      
      {/* Border Glow */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        className="absolute -inset-[1px] z-0 pointer-events-none rounded-2xl bg-gradient-to-br from-indigo-500/50 via-transparent to-emerald-500/50 opacity-0 transition-opacity duration-500"
      />
    </motion.div>
  )
}
