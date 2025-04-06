"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Medal, Star } from "lucide-react"

export function LeaderboardTable() {
  const [sortBy, setSortBy] = useState("rank")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Mock data for the leaderboard
  const participants = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      submissions: 28,
      points: 1240,
      streak: 28,
      rating: 4.9,
      badges: ["Early Bird", "Perfect Streak"],
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      submissions: 27,
      points: 1180,
      streak: 27,
      rating: 4.8,
      badges: ["Code Master"],
    },
    {
      id: 3,
      name: "Olivia Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      submissions: 26,
      points: 1120,
      streak: 24,
      rating: 4.7,
      badges: ["UI Wizard"],
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      submissions: 25,
      points: 1050,
      streak: 25,
      rating: 4.6,
      badges: ["Bug Hunter"],
    },
    {
      id: 5,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      submissions: 24,
      points: 980,
      streak: 20,
      rating: 4.5,
      badges: ["Fast Learner"],
    },
  ]

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  return (
    <Card className="glass-card overflow-hidden border-border/30">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 -ml-3 font-medium"
                  onClick={() => handleSort("rank")}
                >
                  Rank
                  {sortBy === "rank" &&
                    (sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </Button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Participant</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 -ml-3 font-medium"
                  onClick={() => handleSort("submissions")}
                >
                  Submissions
                  {sortBy === "submissions" &&
                    (sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </Button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 -ml-3 font-medium"
                  onClick={() => handleSort("points")}
                >
                  Points
                  {sortBy === "points" &&
                    (sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </Button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 -ml-3 font-medium"
                  onClick={() => handleSort("streak")}
                >
                  Streak
                  {sortBy === "streak" &&
                    (sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </Button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 -ml-3 font-medium"
                  onClick={() => handleSort("rating")}
                >
                  Rating
                  {sortBy === "rating" &&
                    (sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </Button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Badges</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <motion.tr
                key={participant.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b border-border/30 last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      index === 0
                        ? "bg-yellow-500/20"
                        : index === 1
                          ? "bg-gray-400/20"
                          : index === 2
                            ? "bg-amber-700/20"
                            : "bg-muted"
                    }`}
                  >
                    {index === 0 ? (
                      <Medal className="h-4 w-4 text-yellow-500" />
                    ) : index === 1 ? (
                      <Medal className="h-4 w-4 text-gray-400" />
                    ) : index === 2 ? (
                      <Medal className="h-4 w-4 text-amber-700" />
                    ) : (
                      index + 1
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-primary/20">
                      <AvatarImage src={participant.avatar} alt={participant.name} />
                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{participant.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{participant.submissions}</td>
                <td className="px-4 py-3 text-sm font-medium">{participant.points}</td>
                <td className="px-4 py-3 text-sm">{participant.streak} days</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span>{participant.rating}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {participant.badges.map((badge) => (
                      <Badge key={badge} variant="outline" className="text-xs badge-futuristic">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

