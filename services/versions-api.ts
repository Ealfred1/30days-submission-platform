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

export interface VersionComparison {
  version1: Version
  version2: Version
  participant_difference: number
  submission_difference: number
  technology_overlap: string[]
}

export const versionsApi = {
  getAll: async () => {
    const response = await api.get<Version[]>('/api/versions/')
    return response.data
  },

  getCurrent: async () => {
    const response = await api.get<Version>('/api/versions/current/')
    return response.data
  },

  compare: async (version1Id: number, version2Id: number) => {
    const response = await api.get<VersionComparison>(
      `/api/versions/compare/?version1=${version1Id}&version2=${version2Id}`
    )
    return response.data
  }
} 