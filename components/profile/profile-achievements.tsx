"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Award, Clock, Code, Flame, Star, Zap } from "lucide-react"

export function ProfileAchievements() {
  const achievements = [
    {
      icon: Flame,
      title: "Perfect Streak",
      description: "Maintained a 20-day streak",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      earned: true,
    },
    {
      icon: Code,
      title: "Code Master",
      description: "Submitted 20+ projects",
      color: "text-primary",
      bgColor: "bg-primary/10",
      earned: true,
    },
    {
      icon: Star,
      title: "Top Rated",
      description: "Received 4.5+ average rating",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      earned: true,
    },
    {
      icon: Award,
      title: "Top 10",
      description: "Reached top 10 on leaderboard",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      earned: false,
    },
    {
      icon: Zap,
      title: "Fast Learner",
      description: "Completed 5 submissions in first week",
      color: "text-accent",
      bgColor: "bg-accent/10",
      earned: true,
    },
    {
      icon: Clock,
      title: "Early Bird",
      description: "Submitted within first 24 hours",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      earned: true,
    },
  ]

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex flex-col items-center p-3 rounded-lg text-center ${achievement.bgColor} ${achievement.earned ? "" : "opacity-50"}`}
            >
              <achievement.icon className={`h-8 w-8 mb-2 ${achievement.color}`} />
              <div className="text-sm font-medium">{achievement.title}</div>
              <div className="text-xs text-muted-foreground">{achievement.description}</div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

