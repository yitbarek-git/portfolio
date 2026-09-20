import React from 'react';
import { Spinner } from './Spinner';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading technical data...',
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
      role="status"
    >
      <Spinner size="lg" className="mb-4" />
      <p className="text-sm font-medium text-[var(--color-muted)] tracking-wide font-mono">
        {message}
      </p>
    </div>
  );
};
