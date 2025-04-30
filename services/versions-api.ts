import api from '@/services/api'

export interface Version {
  id: number
  name: string
  number: number
  codename: string
  description: string
  start_date: string
  end_date: string
  is_active: boolean
  focus_area: string
  technologies: string[]
  participant_count: number
  submission_count: number
  status: 'upcoming' | 'active' | 'completed'
  days_remaining: number
  progress_percentage: number
  created_at: string
  updated_at: string
}

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface VersionComparison {
  version1: Version
  version2: Version
  participant_difference: number
  submission_difference: number
  technology_overlap: string[]
}

export const versionsApi = {
  getAll: async (): Promise<Version[]> => {
    console.log('Fetching versions from:', `${api.defaults.baseURL}/api/versions/versions/`)
    const response = await api.get<PaginatedResponse<Version>>('/api/versions/versions/')
    return response.data.results  // Return just the results array
  },

  getCurrent: async (): Promise<Version> => {
    const response = await api.get<Version>('/api/versions/versions/current/')
    return response.data
  },

  compare: async (version1Id: number, version2Id: number): Promise<VersionComparison> => {
    const response = await api.get<VersionComparison>(
      `/api/versions/versions/compare/?version1=${version1Id}&version2=${version2Id}`
    )
    return response.data
  },

  getById: async (id: number): Promise<Version> => {
    const response = await api.get<Version>(`/api/versions/versions/${id}/`)
    return response.data
  },
} 