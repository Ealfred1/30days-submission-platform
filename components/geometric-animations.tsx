"use client"

import React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

// Add error handling for animations to prevent potential issues
export function GeometricBackground({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.05] via-transparent to-blue-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ErrorBoundary>
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-purple-500/[0.15]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />

          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-blue-500/[0.15]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />

          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-violet-500/[0.15]"
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          />

          <ElegantShape
            delay={0.6}
            width={200}
            height={60}
            rotate={20}
            gradient="from-indigo-500/[0.15]"
            className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          />

          <ElegantShape
            delay={0.7}
            width={150}
            height={40}
            rotate={-25}
            gradient="from-cyan-500/[0.15]"
            className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
          />
        </ErrorBoundary>
      </div>

      <div className="relative z-10">{children}</div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 pointer-events-none" />
    </div>
  )
}

// Add ErrorBoundary component to catch and handle animation errors
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Animation error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return null // Render nothing if there's an error with animations
    }

    return this.props.children
  }
}

export function FadeUpAnimation({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          delay: 0.5 + delay * 0.2,
          ease: [0.25, 0.4, 0.25, 1],
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

