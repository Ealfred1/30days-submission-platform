import api from './api'

export interface PlatformStats {
  total_users: number
  active_users: number
  total_points: number
  average_points: number
  submissions_count: number
  reviews_count: number
}

export interface User {
  id: number
  name: string
  email: string
  points: number
  is_active: boolean
  is_staff: boolean
  avatar: string
  provider: string
}

export interface Version {
  id: number
  title: string
  description: string
  status: 'draft' | 'published' | 'archived'
  created_at: string
  submissions_count: number
}

export const adminApi = {
  // Stats
  getPlatformStats: async (): Promise<PlatformStats> => {
    const response = await api.get('/api/admin/platform_stats/')
    return response.data
  },

  // Users
  getUsers: async () => {
    const response = await api.get('/api/admin/users/')
    return response.data
  },

  updateUser: async (userId: number, data: Partial<User>) => {
    const response = await api.patch(`/api/admin/users/${userId}/`, data)
    return response.data
  },

  adjustUserPoints: async (userId: number, points: number, reason: string) => {
    const response = await api.post(`/api/admin/${userId}/adjust_points/`, {
      points_delta: points,
      reason
    })
    return response.data
  },

  // Versions
  getVersions: async () => {
    const response = await api.get('/api/admin/versions/')
    return response.data
  },

  createVersion: async (data: Partial<Version>) => {
    const response = await api.post('/api/admin/versions/', data)
    return response.data
  },

  updateVersion: async (versionId: number, data: Partial<Version>) => {
    const response = await api.patch(`/api/admin/versions/${versionId}/`, data)
    return response.data
  },

  deleteVersion: async (versionId: number) => {
    await api.delete(`/api/admin/versions/${versionId}/`)
  }
} 