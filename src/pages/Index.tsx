
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Users, Zap, Shield, ArrowRight } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: CheckSquare,
      title: 'Smart Task Management',
      description: 'Organize, prioritize, and track your tasks with intelligent categorization and due date reminders.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with shared projects, real-time updates, and team insights.'
    },
    {
      icon: Zap,
      title: 'Productivity Insights',
      description: 'Get detailed analytics on your productivity patterns and optimize your workflow.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We prioritize your privacy and data protection.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckSquare className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Master Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Productivity
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              TaskFlow is a modern, responsive React application showcasing component architecture, 
              state management, custom hooks, and seamless API integration. Built with the latest 
              web technologies for optimal performance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
              
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 px-8">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Everything You Need to Stay Productive
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Built with React, TypeScript, and modern web standards to demonstrate 
              best practices in front-end development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-200 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-slate-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Built with Modern Technologies
            </h2>
            <p className="text-lg text-slate-600">
              Demonstrating React concepts and best practices
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[
              { name: 'React 18', description: 'Component Architecture' },
              { name: 'TypeScript', description: 'Type Safety' },
              { name: 'Tailwind CSS', description: 'Responsive Design' },
              { name: 'React Router', description: 'Navigation & Routing' },
              { name: 'Context API', description: 'State Management' },
              { name: 'Custom Hooks', description: 'Reusable Logic' },
              { name: 'Vite', description: 'Build Tool' },
              { name: 'Shadcn/UI', description: 'Component Library' }
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-slate-900 mb-1">{tech.name}</h3>
                  <p className="text-xs text-slate-600">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the power of modern React development with TaskFlow
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-50 px-8">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
