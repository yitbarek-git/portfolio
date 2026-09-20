import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  bordered?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  bordered = true,
  padding = 'md',
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`bg-[var(--color-surface)] rounded-[var(--radius-lg)] transition-all duration-200 ${
        bordered ? 'border border-[var(--color-border)]' : ''
      } ${
        hoverEffect
          ? 'hover:border-[#D4A72C]/40 hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5'
          : 'shadow-[var(--shadow-card)]'
      } ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
