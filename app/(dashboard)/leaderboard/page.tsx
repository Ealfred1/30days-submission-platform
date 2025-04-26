"use client"

import { LeaderboardProvider } from "@/providers/leaderboard-provider"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"
import { LeaderboardFilters } from "@/components/leaderboard/leaderboard-filters"
import { LeaderboardStats } from "@/components/leaderboard/leaderboard-stats"

export default function LeaderboardPage() {
  return (
    <LeaderboardProvider>
      <div className="p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
        <LeaderboardStats />
        <div className="mt-8">
          <LeaderboardFilters />
          <LeaderboardTable />
        </div>
      </div>
    </LeaderboardProvider>
  )
}
