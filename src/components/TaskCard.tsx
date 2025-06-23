
import React from 'react';
import { Task } from '@/contexts/TaskContext';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit2, Trash2, Calendar, Clock } from 'lucide-react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      case 'shopping': return 'bg-orange-100 text-orange-800';
      case 'health': return 'bg-green-100 text-green-800';
    }
  };

  const getDueDateStatus = (dueDate?: string) => {
    if (!dueDate) return null;
    
    const date = new Date(dueDate);
    if (isPast(date) && !isToday(date)) {
      return { text: 'Overdue', color: 'text-red-600', icon: '⚠️' };
    }
    if (isToday(date)) {
      return { text: 'Due Today', color: 'text-orange-600', icon: '🔥' };
    }
    if (isTomorrow(date)) {
      return { text: 'Due Tomorrow', color: 'text-blue-600', icon: '📅' };
    }
    return { text: format(date, 'MMM dd'), color: 'text-slate-600', icon: '📅' };
  };

  const dueDateStatus = getDueDateStatus(task.dueDate);

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg border-l-4 ${
      task.completed 
        ? 'border-l-green-500 bg-slate-50' 
        : getPriorityColor(task.priority).includes('red') 
          ? 'border-l-red-500' 
          : getPriorityColor(task.priority).includes('yellow')
            ? 'border-l-yellow-500'
            : 'border-l-green-500'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleComplete({ ...task, completed: !task.completed })}
              className="mt-1"
            />
            <div className="flex-1">
              <h3 className={`font-semibold text-slate-900 ${task.completed ? 'line-through text-slate-500' : ''}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${task.completed ? 'text-slate-400' : 'text-slate-600'}`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="w-8 h-8 p-0 hover:bg-blue-100"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="w-8 h-8 p-0 hover:bg-red-100"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
            <Badge variant="secondary" className={getCategoryColor(task.category)}>
              {task.category}
            </Badge>
          </div>
          
          {dueDateStatus && (
            <div className={`flex items-center text-xs ${dueDateStatus.color}`}>
              <Calendar className="w-3 h-3 mr-1" />
              <span>{dueDateStatus.text}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center text-xs text-slate-500 mt-2">
          <Clock className="w-3 h-3 mr-1" />
          Created {format(new Date(task.createdAt), 'MMM dd, yyyy')}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
