"use client";

import { createContext, useContext, useState } from "react";
import api from "@/services/api";

type Submission = {
  id: number;
  title: string;
  description: string;
  // ... other fields
};

type SubmissionContextType = {
  submissions: Submission[];
  loading: boolean;
  error: string | null;
  fetchSubmissions: () => Promise<void>;
  createSubmission: (data: FormData) => Promise<void>;
};

const SubmissionContext = createContext<SubmissionContextType | undefined>(undefined);

export function SubmissionProvider({ children }: { children: React.ReactNode }) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/submissions/submissions/');
      setSubmissions(response.data);
    } catch (error) {
      setError('Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

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
    }}> 
      {children}
    </SubmissionContext.Provider>
  );
}

export const useSubmissions = () => {
  const context = useContext(SubmissionContext);
  if (context === undefined) {
    throw new Error('useSubmissions must be used within a SubmissionProvider');
  }
  return context;
}; 