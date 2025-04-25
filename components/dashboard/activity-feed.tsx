"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Code, MessageSquare, Star } from "lucide-react"
import { useDashboard } from "@/providers/dashboard-provider"

export function ActivityFeed() {
  const { stats, loading } = useDashboard()

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card className="glass-card h-full border-border/30">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats?.recent_activities.map((activity, index) => (
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

