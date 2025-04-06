"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export function ProfileStats() {
  const stats = [
    { label: "Submissions", value: "24" },
    { label: "Points", value: "980" },
    { label: "Streak", value: "20" },
    { label: "Rating", value: "4.5" },
    { label: "Rank", value: "#5" },
    { label: "Badges", value: "8" },
  ]

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className="text-2xl font-bold">{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

