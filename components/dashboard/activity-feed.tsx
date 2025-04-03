"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Code, MessageSquare, Star } from "lucide-react"

export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: "submission",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      project: "Task Manager App",
      time: "2 hours ago",
      icon: Code,
      iconColor: "text-primary",
    },
    {
      id: 2,
      type: "review",
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      project: "Weather Dashboard",
      time: "4 hours ago",
      icon: MessageSquare,
      iconColor: "text-secondary",
    },
    {
      id: 3,
      type: "rating",
      user: {
        name: "Olivia Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      project: "E-commerce UI",
      rating: 5,
      time: "6 hours ago",
      icon: Star,
      iconColor: "text-yellow-500",
    },
    {
      id: 4,
      type: "submission",
      user: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      project: "Portfolio Website",
      time: "8 hours ago",
      icon: Code,
      iconColor: "text-primary",
    },
  ]

  return (
    <Card className="glass-card h-full border-border/30">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Avatar className="h-10 w-10 border border-primary/20">
              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
              <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{activity.user.name}</span>
                <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>

              <p className="text-sm">
                {activity.type === "submission" && (
                  <>
                    Submitted <span className="font-medium">{activity.project}</span>
                  </>
                )}
                {activity.type === "review" && (
                  <>
                    Reviewed <span className="font-medium">{activity.project}</span>
                  </>
                )}
                {activity.type === "rating" && (
                  <>
                    Rated <span className="font-medium">{activity.project}</span> with {activity.rating} stars
                  </>
                )}
              </p>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}

