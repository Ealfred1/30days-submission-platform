"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/services/api";

type Submission = {
  id: number;
  title: string;
  description: string;
  repository_url: string;
  live_demo_url?: string;
  preview_image: string;
  day_number: number;
  technologies: string[];
  additional_images: string[];
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  branch: string;
};

type SubmissionContextType = {
  submissions: Submission[];
  loading: boolean;
  error: string | null;
  fetchSubmissions: () => Promise<void>;
  createSubmission: (data: FormData) => Promise<void>;
  getSubmission: (id: number) => Promise<Submission | undefined>;
};

const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);

export function SubmissionProvider({ children }: { children: React.ReactNode }) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/submissions/submissions/my_submissions/');
      setSubmissions(response.data);
    } catch (error) {
      setError('Failed to fetch submissions');
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSubmission = async (id: number) => {
    try {
      const response = await api.get(`/api/submissions/submissions/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching submission:', error);
      return undefined;
    }
  };

  // Fetch submissions on mount
  useEffect(() => {
    fetchSubmissions();
  }, []);

  const createSubmission = async (data: FormData) => {
    try {
      setLoading(true);
      await api.post('/api/submissions/submissions/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      await fetchSubmissions();
    } catch (error) {
      setError('Failed to create submission');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SubmissionContext.Provider value={{
      submissions,
      loading,
      error,
      fetchSubmissions,
      createSubmission,
      getSubmission
    }}>
      {children}
    </SubmissionContext.Provider>
  );
}

export const useSubmissions = () => {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error('useSubmissions must be used within a SubmissionProvider');
  }
  return context;
}; 