import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export const Loader: React.FC<LoaderProps> = ({ size = 'md', className }) => {
  return (
    <Loader2
      className={cn(
        'animate-spin text-primary-600',
        sizes[size],
        className
      )}
    />
  );
};

export const LoadingSpinner: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Loader size="lg" />
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{text}</p>
    </div>
  );
};