import api from './api';

export interface DashboardStats {
  days_remaining: number;
  days_completed: number;
  submission_count: number;
  last_submission_date: string;
  rank: number;
  rank_percentile: number;
  total_participants: number;
  progress_percentage: number;
  timeline: Array<{
    day: number;
    completed: boolean;
  }>;
  recent_activities: Array<{
    id: number;
    user: {
      name: string;
      avatar: string;
    };
    activity_type: 'submission' | 'review' | 'rating';
    description: string;
    created_at: string;
  }>;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get('/api/dashboard/stats/');
  return response.data;
}; 