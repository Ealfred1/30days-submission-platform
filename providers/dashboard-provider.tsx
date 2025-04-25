"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { getDashboardStats } from '@/services/dashboard'
import type { DashboardStats } from '@/services/dashboard'
import { useAuth } from '@/components/auth/auth-provider'
import { toast } from '@/components/ui/use-toast'

interface DashboardContextType {
  stats: DashboardStats | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType>({
  stats: null,
  loading: true,
  error: null,
  refetch: async () => {},
})

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { userInfo } = useAuth()

  const fetchStats = async () => {
    try {
      setLoading(true)
      const data = await getDashboardStats()
      setStats(data)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err)
      setError(err as Error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userInfo) {
      fetchStats()
    }
  }, [userInfo])

  return (
    <DashboardContext.Provider
      value={{
        stats,
        loading,
        error,
        refetch: fetchStats,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = () => useContext(DashboardContext) 