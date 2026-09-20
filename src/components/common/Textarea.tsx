import React, { forwardRef } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  className = '',
  id,
  rows = 4,
  ...props
}, ref) => {
  const generatedId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

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
      <textarea
        id={generatedId}
        ref={ref}
        rows={rows}
        className={`w-full bg-[var(--color-surface)] text-[var(--color-text)] border rounded-[var(--radius-md)] px-3.5 py-2.5 text-sm transition-all duration-150 placeholder:text-[var(--color-muted)] focus:border-[#D4A72C] focus:ring-1 focus:ring-[#D4A72C] focus:outline-none resize-y disabled:opacity-50 disabled:bg-[var(--color-bg)] ${
          error
            ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500'
            : 'border-[var(--color-border)] hover:border-[var(--color-muted)]/40'
        } ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${generatedId}-error` : helperText ? `${generatedId}-helper` : undefined}
        {...props}
      />
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

Textarea.displayName = 'Textarea';
