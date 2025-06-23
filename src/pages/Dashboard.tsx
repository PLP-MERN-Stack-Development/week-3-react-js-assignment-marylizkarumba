
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTask } from '@/contexts/TaskContext';
import { useApi, mockApiService } from '@/hooks/useApi';
import Layout from '@/components/Layout';
import StatsCard from '@/components/StatsCard';
import TaskCard from '@/components/TaskCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckSquare, Clock, TrendingUp, Calendar, Plus, Bell } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { user, login } = useAuth();
  const { tasks, loading: tasksLoading, updateTask, deleteTask } = useTask();
  const { data: stats, loading: statsLoading, execute: fetchStats } = useApi(mockApiService.fetchUserStats);
  const { data: notifications, execute: fetchNotifications } = useApi(mockApiService.fetchNotifications);

  useEffect(() => {
    if (!user) {
      // Auto-login for demo purposes
      login('demo@taskflow.com', 'password');
    }
  }, [user, login]);

  useEffect(() => {
    if (user) {
      fetchStats();
      fetchNotifications();
    }
  }, [user, fetchStats, fetchNotifications]);

  const recentTasks = tasks.slice(0, 5);
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;

  const handleToggleComplete = async (task: any) => {
    try {
      await updateTask(task);
      toast({
        title: task.completed ? 'Task completed!' : 'Task marked as pending',
        description: `"${task.title}" has been updated.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      toast({
        title: 'Task deleted',
        description: 'The task has been removed successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete task.',
        variant: 'destructive',
      });
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-slate-600 mt-2">
            Here's an overview of your productivity today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsLoading ? (
            <>
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </Card>
              ))}
            </>
          ) : (
            <>
              <StatsCard
                title="Total Tasks"
                value={stats?.totalTasks || tasks.length}
                description="All your tasks"
                icon={CheckSquare}
                trend={{ value: 12, isPositive: true }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
              />
              <StatsCard
                title="Completed"
                value={stats?.completedTasks || completedTasks}
                description="Tasks finished"
                icon={TrendingUp}
                trend={{ value: 8, isPositive: true }}
                className="bg-gradient-to-br from-green-50 to-green-100 border-green-200"
              />
              <StatsCard
                title="Pending"
                value={stats?.pendingTasks || pendingTasks}
                description="Tasks remaining"
                icon={Clock}
                className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200"
              />
              <StatsCard
                title="Productivity"
                value={`${stats?.productivity || Math.round((completedTasks / tasks.length) * 100) || 0}%`}
                description="Completion rate"
                icon={Calendar}
                trend={{ value: 15, isPositive: true }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Tasks */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">Recent Tasks</CardTitle>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </CardHeader>
              <CardContent>
                {tasksLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="p-4 border rounded-lg">
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-3" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentTasks.length > 0 ? (
                  <div className="space-y-4">
                    {recentTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={() => {}}
                        onDelete={handleDeleteTask}
                        onToggleComplete={handleToggleComplete}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CheckSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No tasks yet</h3>
                    <p className="text-slate-500 mb-4">Get started by creating your first task!</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Task
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Notifications */}
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {notifications ? (
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border-l-4 ${
                          notification.type === 'success'
                            ? 'border-l-green-500 bg-green-50'
                            : notification.type === 'warning'
                            ? 'border-l-yellow-500 bg-yellow-50'
                            : 'border-l-blue-500 bg-blue-50'
                        }`}
                      >
                        <h4 className="font-medium text-slate-900 text-sm">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="p-3 border rounded-lg">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
