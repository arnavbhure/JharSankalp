import React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  isRequired?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, isRequired, className, id, rows = 3, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="space-y-1 w-full text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-small font-medium text-neutral-800"
          >
            {label}
            {isRequired && <span className="text-status-danger ml-1" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'block w-full rounded-sm border border-neutral-200 bg-neutral-0 px-3 py-2 text-body-sm text-neutral-900',
            'placeholder:text-neutral-400 placeholder:font-normal',
            'transition-colors duration-150',
            'focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple',
            'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400',
            error && 'border-status-danger focus:border-status-danger focus:ring-status-danger',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="text-caption font-medium text-status-danger" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="text-caption text-neutral-600">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
