"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function LeaderboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="glass-card overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-sm font-medium text-muted-foreground mb-2">Total Submissions</div>
            <motion.div
              className="text-4xl font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              3,248
            </motion.div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑ 12%</span> from last week
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-sm font-medium text-muted-foreground mb-2">Active Participants</div>
            <motion.div
              className="text-4xl font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              248
            </motion.div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑ 5%</span> from last week
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-sm font-medium text-muted-foreground mb-2">Average Rating</div>
            <motion.div
              className="text-4xl font-bold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              4.7
            </motion.div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑ 0.2</span> from last week
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

