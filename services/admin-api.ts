import api from './api'

export interface PlatformStats {
  total_users: number
  active_users: number
  total_points: number
  average_points: number
  submissions_count: number
  reviews_count: number
}

export interface PointsAdjustment {
  user_id: number
  points_delta: number
  reason: string
}

export const adminApi = {
  getPlatformStats: async (): Promise<PlatformStats> => {
    const response = await api.get('/api/admin/platform_stats/')
    return response.data
  },

  adjustUserPoints: async (userId: number, adjustment: PointsAdjustment) => {
    const response = await api.post(`/api/admin/${userId}/adjust_points/`, adjustment)
    return response.data
  },

  getPointsHistory: async () => {
    const response = await api.get('/api/admin/points_history/')
    return response.data
  },
} 