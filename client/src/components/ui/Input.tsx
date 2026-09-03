import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  isRequired?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightElement, isRequired, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="space-y-1 w-full text-left">
        {label && (
          <label htmlFor={inputId} className="block text-small font-medium text-neutral-800">
            {label}
            {isRequired && (
              <span className="text-status-danger ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'block w-full rounded-sm border border-neutral-200 bg-neutral-0 px-3 py-2 text-body-sm text-neutral-900',
              'placeholder:text-neutral-400 placeholder:font-normal',
              'transition-colors duration-150',
              'focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple',
              'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400',
              error && 'border-status-danger focus:border-status-danger focus:ring-status-danger',
              leftIcon && 'pl-9',
              rightElement && 'pr-9',
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">{rightElement}</div>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-caption font-medium text-status-danger"
            role="alert"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-caption text-neutral-600">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
