"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Award, Clock, Code, Users } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Days Remaining",
      value: "18",
      icon: Clock,
      description: "12 days completed",
      color: "text-primary",
    },
    {
      title: "Your Submissions",
      value: "8",
      icon: Code,
      description: "Last submitted 2 days ago",
      color: "text-secondary",
    },
    {
      title: "Your Rank",
      value: "#12",
      icon: Award,
      description: "Top 15%",
      color: "text-accent",
    },
    {
      title: "Total Participants",
      value: "248",
      icon: Users,
      description: "From 32 countries",
      color: "text-orange-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="glass-card hover-scale border-border/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full bg-${stat.color.split("-")[1]}/10`}
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

