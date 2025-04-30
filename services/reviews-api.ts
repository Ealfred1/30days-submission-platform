import api from '@/services/api'

export interface Review {
  id: number
  user: {
    id: number
    name: string
    avatar: string
  }
  project: string
  rating: number
  comment: string
  helpful: number
  created_at: string
}

export interface CreateReviewData {
  project: string
  rating: number
  comment: string
}

interface PaginatedResponse {
  count: number
  next: string | null
  previous: string | null
  results: Review[]
}

export const reviewsApi = {
  create: async (data: CreateReviewData): Promise<Review> => {
    const response = await api.post<Review>('/api/reviews/', data)
    return response.data
  },

  getAll: async (): Promise<PaginatedResponse> => {
    const response = await api.get<PaginatedResponse>('/api/reviews/')
    return response.data
  },

  getByUser: async (userId: string): Promise<PaginatedResponse> => {
    const response = await api.get<PaginatedResponse>(`/api/reviews/?user=${userId}`)
    return response.data
  },

  getByProject: async (project: string): Promise<Review[]> => {
    const response = await api.get<Review[]>(`/api/reviews/?project=${project}`)
    return response.data
  },

  incrementHelpful: async (reviewId: number): Promise<Review> => {
    const response = await api.post<Review>(`/api/reviews/${reviewId}/mark_helpful/`)
    return response.data
  }
} 