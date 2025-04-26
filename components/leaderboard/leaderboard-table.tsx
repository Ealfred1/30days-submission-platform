"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Medal, Star } from "lucide-react"
import { useLeaderboard } from "@/providers/leaderboard-provider"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export function LeaderboardTable() {
  const { 
    participants, 
    loading, 
    sortBy, 
    setSortBy, 
    sortOrder, 
    setSortOrder 
  } = useLeaderboard()

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  if (loading) {
    return (
      <Card className="glass-card overflow-hidden border-border/30">
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-48" />
            </div>
          ))}
        </div>
      </Card>
    )
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
                  {sortBy === "rank" && (
                    sortOrder === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                  )}
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
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    index === 0 ? "bg-yellow-500/20" :
                    index === 1 ? "bg-gray-400/20" :
                    index === 2 ? "bg-amber-700/20" :
                    "bg-muted"
                  }`}>
                    {index <= 2 ? (
                      <Medal className={`h-4 w-4 ${
                        index === 0 ? "text-yellow-500" :
                        index === 1 ? "text-gray-400" :
                        "text-amber-700"
                      }`} />
                    ) : (
                      participant.rank
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <Link href={`/profile/${participant.id}`} className="flex items-center gap-3 hover:opacity-80">
                    <Avatar className="h-8 w-8 border border-primary/20">
                      <AvatarImage src={participant.user_avatar} alt={participant.user_name} />
                      <AvatarFallback>{participant.user_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{participant.user_name}</span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm">{participant.submissions_count}</td>
                <td className="px-4 py-3 text-sm font-medium">{participant.points}</td>
                <td className="px-4 py-3 text-sm">{participant.current_streak} days</td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span>{participant.average_rating.toFixed(1)}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {participant.badges.map((badge) => (
                      <Badge 
                        key={badge.id} 
                        variant="outline" 
                        className="text-xs badge-futuristic"
                        title={badge.badge_details.description}
                      >
                        {badge.badge_details.name}
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

