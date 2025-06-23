
import React, { useState, useEffect } from 'react';
import { Task } from '@/contexts/TaskContext';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import CustomButton from '@/components/ui/custom-button';
import CustomCard from '@/components/ui/custom-card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type FilterType = 'all' | 'active' | 'completed';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskflow-tasks', []);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    category: 'work' as Task['category']
  });

  // Load initial tasks if localStorage is empty
  useEffect(() => {
    if (tasks.length === 0) {
      const initialTasks: Task[] = [
        {
          id: '1',
          title: 'Complete project documentation',
          description: 'Write comprehensive documentation for the TaskFlow project',
          priority: 'high',
          category: 'work',
          completed: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Review code with team',
          description: 'Schedule and conduct code review session',
          priority: 'medium',
          category: 'work',
          completed: true,
          createdAt: new Date().toISOString()
        }
      ];
      setTasks(initialTasks);
    }
  }, [tasks.length, setTasks]);

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const addTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a task title.',
        variant: 'destructive',
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      category: newTask.category,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [...prev, task]);
    setNewTask({ title: '', description: '', priority: 'medium', category: 'work' });
    setIsAdding(false);
    
    toast({
      title: 'Task added',
      description: 'Your new task has been created successfully.',
    });
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: 'Task deleted',
      description: 'The task has been removed successfully.',
    });
  };

  const taskStats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length
  };

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CustomCard padding="sm" className="text-center">
          <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Total Tasks</div>
        </CustomCard>
        <CustomCard padding="sm" className="text-center">
          <div className="text-2xl font-bold text-orange-600">{taskStats.active}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Active Tasks</div>
        </CustomCard>
        <CustomCard padding="sm" className="text-center">
          <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">Completed</div>
        </CustomCard>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
          <CustomButton
            key={filterType}
            variant={filter === filterType ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter(filterType)}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </CustomButton>
        ))}
        <CustomButton
          variant="primary"
          size="sm"
          onClick={() => setIsAdding(true)}
          className="ml-auto"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Task
        </CustomButton>
      </div>

      {/* Add task form */}
      {isAdding && (
        <CustomCard>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Add New Task</h3>
            <Input
              placeholder="Task title..."
              value={newTask.title}
              onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              placeholder="Task description..."
              value={newTask.description}
              onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
            <div className="flex gap-2">
              <CustomButton onClick={addTask}>
                <Check className="w-4 h-4 mr-1" />
                Add Task
              </CustomButton>
              <CustomButton variant="secondary" onClick={() => setIsAdding(false)}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </CustomButton>
            </div>
          </div>
        </CustomCard>
      )}

      {/* Tasks list */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <CustomCard className="text-center py-8">
            <p className="text-slate-600 dark:text-slate-400">
              {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
            </p>
          </CustomCard>
        ) : (
          filteredTasks.map((task) => (
            <CustomCard key={task.id} padding="sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      task.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-slate-300 hover:border-green-500'
                    }`}
                  >
                    {task.completed && <Check className="w-3 h-3" />}
                  </button>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      task.completed 
                        ? 'line-through text-slate-500 dark:text-slate-400' 
                        : 'text-slate-900 dark:text-white'
                    }`}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className={`text-sm ${
                        task.completed 
                          ? 'text-slate-400 dark:text-slate-500' 
                          : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
                <CustomButton
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                  className="p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </CustomButton>
              </div>
            </CustomCard>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager;
