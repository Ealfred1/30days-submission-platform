"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle2, Circle } from "lucide-react"

export function ChallengeTimeline() {
  // Mock data for the timeline
  const days = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    completed: i < 12,
    current: i === 12,
  }))

  return (
    <Card className="glass-card h-full border-border/30">
      <CardHeader>
        <CardTitle>Challenge Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-muted-foreground" />
              <span>Upcoming</span>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-2">
            {days.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.01 }}
                className={`flex h-10 w-full items-center justify-center rounded-md text-sm font-medium transition-colors ${
                  day.completed
                    ? "bg-primary/20 text-primary"
                    : day.current
                      ? "bg-secondary/20 text-secondary border border-secondary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {day.day}
              </motion.div>
            ))}
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">40%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <motion.div
                className="h-2 rounded-full bg-gradient-to-r from-primary via-secondary to-primary"
                initial={{ width: 0 }}
                animate={{ width: "40%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

