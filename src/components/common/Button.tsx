import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-[var(--radius-sm)] gap-1.5',
    md: 'px-4 py-2 text-sm rounded-[var(--radius-md)] gap-2',
    lg: 'px-6 py-3 text-base rounded-[var(--radius-md)] gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-[#D4A72C] hover:bg-[#B88A18] text-[#0B0B0C] font-semibold shadow-xs hover:shadow-sm active:translate-y-px',
    secondary: 'bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] border border-[var(--color-border)] shadow-2xs',
    outline: 'bg-transparent border border-[#D4A72C]/40 text-[#D4A72C] hover:bg-[#D4A72C]/10 active:translate-y-px',
    ghost: 'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]',
    danger: 'bg-red-600 hover:bg-red-700 text-white font-medium shadow-xs',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
