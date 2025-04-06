"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Calendar, Check, Users } from "lucide-react"

export function VersionTimeline() {
  const versions = [
    {
      version: "7",
      title: "Kairos",
      date: "April 2023",
      participants: 248,
      status: "current",
      description: "The current version with enhanced UI and new leaderboard features.",
    },
    {
      version: "6",
      title: "Chronos",
      date: "January 2023",
      participants: 215,
      status: "completed",
      description: "Focused on time management and productivity tracking.",
    },
    {
      version: "5",
      title: "Helios",
      date: "October 2022",
      participants: 189,
      status: "completed",
      description: "Emphasized UI/UX design and visual aesthetics.",
    },
    {
      version: "4",
      title: "Atlas",
      date: "July 2022",
      participants: 156,
      status: "completed",
      description: "Centered around data visualization and analytics.",
    },
    {
      version: "3",
      title: "Poseidon",
      date: "April 2022",
      participants: 132,
      status: "completed",
      description: "Focused on backend development and API integration.",
    },
  ]

  return (
    <div className="space-y-6">
      {versions.map((version, index) => (
        <motion.div
          key={version.version}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card
            className={`glass-card glass-card-hover relative overflow-hidden ${
              version.status === "current" ? "border-primary/50" : ""
            }`}
          >
            {version.status === "current" && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                Current
              </div>
            )}

            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center justify-center md:justify-start">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${
                      version.status === "current" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className="text-2xl font-bold">v{version.version}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold">{version.title}</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{version.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{version.participants}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground">{version.description}</p>

                  {version.status === "completed" && (
                    <div className="flex items-center gap-1 text-sm text-green-500">
                      <Check className="h-4 w-4" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

