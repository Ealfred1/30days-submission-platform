"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface KairosLogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

export function KairosLogo({ className, size = "md", animated = true }: KairosLogoProps) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div className={cn("relative", sizes[size], className)}>
      {animated ? (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("logo-animate", sizes[size])}
          >
            <motion.circle
              cx="20"
              cy="20"
              r="16"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M14 14L26 26M14 26L26 14"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.path
              d="M20 12V28"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
            <defs>
              <linearGradient id="gradient" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A78BFA" />
                <stop offset="1" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ) : (
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn(sizes[size])}>
          <circle cx="20" cy="20" r="16" stroke="url(#gradient)" strokeWidth="2" />
          <path d="M14 14L26 26M14 26L26 14" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 12V28" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" />
          <defs>
            <linearGradient id="gradient" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A78BFA" />
              <stop offset="1" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  )
}

