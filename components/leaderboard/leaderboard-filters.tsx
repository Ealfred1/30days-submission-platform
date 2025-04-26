"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { useLeaderboard } from "@/providers/leaderboard-provider"

export function LeaderboardFilters() {
  const { 
    searchTerm, 
    setSearchTerm, 
    filterValue, 
    setFilterValue,
    sortBy,
    setSortBy
  } = useLeaderboard()

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search participants..." 
          className="pl-9" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <Select value={filterValue} onValueChange={setFilterValue}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Participants</SelectItem>
            <SelectItem value="top10">Top 10</SelectItem>
            <SelectItem value="top25">Top 25</SelectItem>
            <SelectItem value="top50">Top 50</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="points">Points</SelectItem>
            <SelectItem value="submissions_count">Submissions</SelectItem>
            <SelectItem value="current_streak">Streak</SelectItem>
            <SelectItem value="average_rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

