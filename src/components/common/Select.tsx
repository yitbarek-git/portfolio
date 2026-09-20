import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  helperText,
  className = '',
  id,
  ...props
}, ref) => {
  const generatedId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={generatedId}
          className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1.5"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={generatedId}
          ref={ref}
          className={`w-full appearance-none bg-[var(--color-surface)] text-[var(--color-text)] border rounded-[var(--radius-md)] px-3.5 py-2.5 pr-10 text-sm transition-all duration-150 focus:border-[#D4A72C] focus:ring-1 focus:ring-[#D4A72C] focus:outline-none cursor-pointer disabled:opacity-50 disabled:bg-[var(--color-bg)] ${
            error
              ? 'border-red-500/70 focus:border-red-500'
              : 'border-[var(--color-border)] hover:border-[var(--color-muted)]/40'
          } ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${generatedId}-error` : helperText ? `${generatedId}-helper` : undefined}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[var(--color-surface)] text-[var(--color-text)] py-1">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-muted)]">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && (
        <p id={`${generatedId}-error`} className="mt-1.5 text-xs text-red-500 font-medium">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${generatedId}-helper`} className="mt-1.5 text-xs text-[var(--color-muted)]">
          {helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
