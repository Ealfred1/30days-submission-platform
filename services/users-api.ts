import api from '@/services/api'

export interface User {
  id: number
  name: string
  email: string
  avatar: string
  points: number
  // ... add other user fields as needed
}

export const usersApi = {
  getById: async (id: number): Promise<User> => {
    const response = await api.get<User>(`/api/${id}/`)
    return response.data
  },

  getMe: async (): Promise<User> => {
    const response = await api.get<User>('/api/me/')
    return response.data
  },

  updateMe: async (data: Partial<User>): Promise<User> => {
    const response = await api.patch<User>('/api/update_me/', data)
    return response.data
  },

  getLeaderboard: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/api/leaderboard/')
    return response.data
  }
} 