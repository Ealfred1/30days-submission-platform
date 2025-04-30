"use client"

import { createContext, useContext, useState } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import api from '@/services/api'

interface PlatformStats {
  total_users: number
  active_users: number
  total_points: number
  average_points: number
  submissions_count: number
  reviews_count: number
}

interface AdminContextType {
  stats: PlatformStats | null
  setStats: (stats: PlatformStats | null) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  fetchStats: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<PlatformStats | null>(null)
  const [loading, setLoading] = useState(false)
  const { isAdmin } = useAuth()

  const fetchStats = async () => {
    if (!isAdmin) return
    setLoading(true)
    try {
      const response = await api.get('/api/admin/platform_stats/')
      setStats(response.data)
    } catch (error) {
      console.error('Failed to fetch admin stats:', error)
      setStats(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminContext.Provider value={{ stats, setStats, loading, setLoading, fetchStats }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
} 