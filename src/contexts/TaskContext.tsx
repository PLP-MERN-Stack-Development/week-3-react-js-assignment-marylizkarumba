
import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'work' | 'personal' | 'shopping' | 'health';
  completed: boolean;
  dueDate?: string;
  createdAt: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

type TaskAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

interface TaskContextType extends TaskState {
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Review Component Architecture',
      description: 'Study React component patterns and best practices',
      priority: 'high',
      category: 'work',
      completed: false,
      dueDate: '2024-01-15',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Implement State Management',
      description: 'Set up context API and custom hooks',
      priority: 'medium',
      category: 'work',
      completed: true,
      createdAt: '2024-01-08'
    },
    {
      id: '3',
      title: 'Grocery Shopping',
      description: 'Buy ingredients for weekend cooking',
      priority: 'low',
      category: 'shopping',
      completed: false,
      dueDate: '2024-01-12',
      createdAt: '2024-01-09'
    }
  ];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      dispatch({ type: 'SET_TASKS', payload: mockTasks });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch tasks' });
    }
  };

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      dispatch({ type: 'ADD_TASK', payload: newTask });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add task' });
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      dispatch({ type: 'UPDATE_TASK', payload: task });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update task' });
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete task' });
    }
  };

  return (
    <TaskContext.Provider value={{
      ...state,
      addTask,
      updateTask,
      deleteTask,
      fetchTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};
