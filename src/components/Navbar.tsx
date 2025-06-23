
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import CustomButton from '@/components/ui/custom-button';
import { Home, BarChart3, CheckSquare, User, Sun, Moon, LogOut, FileText } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Posts', href: '/posts', icon: FileText },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <CheckSquare className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">TaskFlow</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/50 dark:text-blue-400'
                      : 'text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <CustomButton
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </CustomButton>

            {/* User actions */}
            {user && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {user.name}
                </span>
                <CustomButton
                  variant="danger"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </CustomButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
