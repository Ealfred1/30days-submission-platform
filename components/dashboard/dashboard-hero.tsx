"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, ExternalLink, Sparkles } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import Link from "next/link"

export function DashboardHero() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>(
    [],
  )
  const { user } = useAuth()

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      color: [
        "rgba(167, 139, 250, 0.3)", // purple
        "rgba(96, 165, 250, 0.3)", // blue
        "rgba(139, 92, 246, 0.3)", // violet
      ][Math.floor(Math.random() * 3)],
    }))

    setParticles(newParticles)
  }, [])

  return (
    <Card className="relative overflow-hidden rounded-xl border-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-violet-500/10 p-8">
      {/* Animated particles */}
      <div className="particle-container">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="particle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            {user ? `Welcome back, ${user.name?.split(" ")[0] || "Coder"}` : "Welcome to Kairos"}
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          </h1>
          <p className="text-xl text-muted-foreground mb-6">30 Days of Code with VickyJay - Challenge Edition 7</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" className="btn-futuristic gap-2" asChild>
            <Link href="/submissions">
              <Code2 className="h-5 w-5" />
              Submit Project
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 border-primary/50 hover:bg-primary/10">
            <ExternalLink className="h-5 w-5" />
            View Challenge Details
          </Button>
        </motion.div>
      </div>
    </Card>
  )
}

