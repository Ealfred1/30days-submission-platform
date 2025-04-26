"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useLeaderboard } from "@/providers/leaderboard-provider"
import { Skeleton } from "@/components/ui/skeleton"

export function LeaderboardStats() {
  const { stats, loading } = useLeaderboard()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="glass-card overflow-hidden">
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

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
              {stats?.total_submissions.toLocaleString()}
            </motion.div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className={`text-${stats?.weekly_change.submissions >= 0 ? 'green' : 'red'}-500`}>
                {stats?.weekly_change.submissions >= 0 ? '↑' : '↓'} {Math.abs(stats?.weekly_change.submissions || 0)}%
              </span> from last week
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
              {stats?.active_participants.toLocaleString()}
            </motion.div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className={`text-${stats?.weekly_change.participants >= 0 ? 'green' : 'red'}-500`}>
                {stats?.weekly_change.participants >= 0 ? '↑' : '↓'} {Math.abs(stats?.weekly_change.participants || 0)}%
              </span> from last week
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
              {stats?.average_rating.toFixed(1)}
            </motion.div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className={`text-${stats?.weekly_change.rating >= 0 ? 'green' : 'red'}-500`}>
                {stats?.weekly_change.rating >= 0 ? '↑' : '↓'} {Math.abs(stats?.weekly_change.rating || 0).toFixed(2)}
              </span> from last week
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

