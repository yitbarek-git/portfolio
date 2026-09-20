import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'neutral' | 'success' | 'warning' | 'info' | 'outline';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs tracking-wide',
    md: 'px-3 py-1 text-xs font-medium',
  };

  const variantStyles = {
    gold: 'bg-[#D4A72C]/15 text-[#B88A18] dark:text-[#E2B94A] border border-[#D4A72C]/30',
    neutral: 'bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] border border-[var(--color-border)]',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
    info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
    outline: 'bg-transparent text-[var(--color-muted)] border border-[var(--color-border)]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-medium rounded-full whitespace-nowrap select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
