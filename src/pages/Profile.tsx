
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTask } from '@/contexts/TaskContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { User, Mail, Calendar, TrendingUp, Target, Award, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const { tasks } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const tasksByCategory = tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tasksByPriority = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const handleSave = () => {
    // In a real app, this would make an API call to update the user profile
    toast({
      title: 'Profile updated',
      description: 'Your profile has been updated successfully.',
    });
    setIsEditing(false);
  };

  const achievements = [
    {
      title: 'First Task',
      description: 'Created your first task',
      earned: totalTasks > 0,
      icon: '🎯'
    },
    {
      title: 'Task Master',
      description: 'Completed 10 tasks',
      earned: completedTasks >= 10,
      icon: '🏆'
    },
    {
      title: 'Productivity Pro',
      description: 'Achieved 80% completion rate',
      earned: completionRate >= 80,
      icon: '⚡'
    },
    {
      title: 'Week Warrior',
      description: 'Used the app for 7 days',
      earned: true, // This would be calculated based on usage data
      icon: '🗓️'
    }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-slate-900">{user?.name}</h1>
                  <p className="text-slate-600">{user?.email}</p>
                  <div className="flex items-center mt-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined January 2024
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="self-start"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Edit Profile Form */}
          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTasks}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
                <p className="text-xs text-muted-foreground">Tasks finished</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{completionRate}%</div>
                <Progress value={completionRate} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Task Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
                <CardDescription>Your tasks organized by category and priority</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">By Category</h4>
                  <div className="space-y-2">
                    {Object.entries(tasksByCategory).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{category}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-3">By Priority</h4>
                  <div className="space-y-2">
                    {Object.entries(tasksByPriority).map(([priority, count]) => (
                      <div key={priority} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{priority}</span>
                        <Badge 
                          variant="outline" 
                          className={
                            priority === 'high' ? 'border-red-200 text-red-800' :
                            priority === 'medium' ? 'border-yellow-200 text-yellow-800' :
                            'border-green-200 text-green-800'
                          }
                        >
                          {count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your productivity milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-3 rounded-lg border ${
                        achievement.earned
                          ? 'bg-green-50 border-green-200'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          achievement.earned ? 'text-green-900' : 'text-slate-600'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm ${
                          achievement.earned ? 'text-green-700' : 'text-slate-500'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <Badge className="bg-green-600 hover:bg-green-700">
                          Earned
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900">Achievement Progress</h4>
                      <p className="text-sm text-blue-700">
                        {earnedAchievements.length} of {achievements.length} unlocked
                      </p>
                    </div>
                    <div className="text-2xl">🎖️</div>
                  </div>
                  <Progress 
                    value={(earnedAchievements.length / achievements.length) * 100} 
                    className="mt-3"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
