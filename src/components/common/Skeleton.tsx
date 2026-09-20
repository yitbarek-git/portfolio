import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantStyles = {
    text: 'h-4 w-full rounded-[var(--radius-sm)]',
    rectangular: 'rounded-[var(--radius-md)]',
    circular: 'rounded-full',
  };

  return (
    <div
      className={`animate-pulse bg-[var(--color-surface-hover)] border border-[var(--color-border)]/50 ${variantStyles[variant]} ${className}`}
      style={{
        width,
        height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
};
