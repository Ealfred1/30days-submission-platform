"use client"

import { createContext, useContext, useState, useEffect } from "react"
import api from "@/services/api"

type LeaderboardStats = {
  total_submissions: number
  active_participants: number
  average_rating: number
  weekly_change: {
    submissions: number
    participants: number
    rating: number
  }
}

type Participant = {
  id: number
  user_name: string
  user_avatar: string
  submissions_count: number
  points: number
  current_streak: number
  average_rating: number
  badges: Array<{
    id: number
    badge_details: {
      name: string
      description: string
      icon: string
    }
    earned_at: string
  }>
  rank: number
}

type LeaderboardResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Participant[]
}

type LeaderboardContextType = {
  stats: LeaderboardStats | null
  participants: Participant[]
  loading: boolean
  error: string | null
  searchTerm: string
  setSearchTerm: (term: string) => void
  sortBy: string
  setSortBy: (field: string) => void
  sortOrder: "asc" | "desc"
  setSortOrder: (order: "asc" | "desc") => void
  filterValue: string
  setFilterValue: (value: string) => void
  fetchLeaderboard: () => Promise<void>
}

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined)

export function LeaderboardProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<LeaderboardStats | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("points")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filterValue, setFilterValue] = useState("all")

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      const [statsResponse, participantsResponse] = await Promise.all([
        api.get('/api/leaderboards/leaderboard/overview/'),
        api.get<LeaderboardResponse>('/api/leaderboards/leaderboard/')
      ])

      setStats(statsResponse.data)
      setParticipants(participantsResponse.data.results)
    } catch (error) {
      setError('Failed to fetch leaderboard data')
      console.error('Error fetching leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const filteredAndSortedParticipants = participants
    .filter(p => {
      if (searchTerm) {
        return p.user_name.toLowerCase().includes(searchTerm.toLowerCase())
      }
      return true
    })
    .filter(p => {
      switch (filterValue) {
        case 'top10':
          return p.rank <= 10
        case 'top25':
          return p.rank <= 25
        case 'top50':
          return p.rank <= 50
        default:
          return true
      }
    })
    .sort((a, b) => {
      const compareValue = (field: keyof Participant) => {
        if (sortOrder === 'asc') {
          return a[field] > b[field] ? 1 : -1
        }
        return a[field] < b[field] ? 1 : -1
      }

      return compareValue(sortBy as keyof Participant)
    })

  return (
    <LeaderboardContext.Provider
      value={{
        stats,
        participants: filteredAndSortedParticipants,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        filterValue,
        setFilterValue,
        fetchLeaderboard
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  )
}

export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext)
  if (!context) {
    throw new Error('useLeaderboard must be used within a LeaderboardProvider')
  }
  return context
} 