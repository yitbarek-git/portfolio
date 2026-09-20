import React from 'react';
import { Badge } from './Badge';

export interface SectionHeadingProps {
  badgeText?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badgeText,
  title,
  subtitle,
  align = 'left',
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 ${
        align === 'center' ? 'text-center items-center' : ''
      } ${className}`}
    >
      <div className={align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-3xl'}>
        {badgeText && (
          <div className="mb-2.5">
            <Badge variant="gold" size="sm">
              {badgeText}
            </Badge>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
