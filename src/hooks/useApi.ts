
import { useState, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends ApiState<T> {
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>
): UseApiReturn<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const result = await apiFunction(...args);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setState({ data: null, loading: false, error: errorMessage });
        throw error;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return { ...state, execute, reset };
}

// Example API functions
export const mockApiService = {
  fetchUserStats: async (): Promise<{
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    productivity: number;
  }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      totalTasks: 24,
      completedTasks: 18,
      pendingTasks: 6,
      productivity: 75
    };
  },

  fetchNotifications: async (): Promise<Array<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success';
    timestamp: string;
  }>> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [
      {
        id: '1',
        title: 'Task Reminder',
        message: 'Review Component Architecture is due tomorrow',
        type: 'warning',
        timestamp: '2024-01-11T10:30:00Z'
      },
      {
        id: '2',
        title: 'Goal Achieved',
        message: 'You completed 5 tasks today!',
        type: 'success',
        timestamp: '2024-01-11T16:45:00Z'
      }
    ];
  }
};
