"use client"

import { createContext, useContext, useState } from 'react'
import { useAuth } from '@/components/auth/auth-provider'

interface AdminContextType {
  stats: any
  setStats: (stats: any) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  fetchStats: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const { isAdmin } = useAuth()

  const fetchStats = async () => {
    if (!isAdmin) return
    setLoading(true)
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch admin stats:', error)
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