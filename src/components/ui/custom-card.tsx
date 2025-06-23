
import React from 'react';
import { cn } from '@/lib/utils';

interface CustomCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const CustomCard: React.FC<CustomCardProps> = ({
  children,
  className,
  padding = 'md',
  shadow = 'md',
  onClick
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  };

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-slate-200',
        paddingClasses[padding],
        shadowClasses[shadow],
        'dark:bg-slate-800 dark:border-slate-700',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CustomCard;
