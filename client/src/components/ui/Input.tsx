import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-ink-700"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'block w-full rounded border border-ink-300 bg-white px-3 py-2 text-sm text-ink-900',
              'placeholder:text-ink-400',
              'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
              'disabled:cursor-not-allowed disabled:bg-ink-50 disabled:text-ink-500',
              error && 'border-danger focus:border-danger focus:ring-danger',
              leftIcon && 'pl-10',
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-danger" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-sm text-ink-500">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
