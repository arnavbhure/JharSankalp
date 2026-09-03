import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  isRequired?: boolean;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, isRequired, options, children, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="space-y-1 w-full text-left">
        {label && (
          <label htmlFor={selectId} className="block text-small font-medium text-neutral-800">
            {label}
            {isRequired && (
              <span className="text-status-danger ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'block w-full appearance-none rounded-sm border border-neutral-200 bg-neutral-0 px-3 py-2 pr-8 text-body-sm text-neutral-900',
              'transition-colors duration-150 cursor-pointer',
              'focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple',
              'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400',
              error && 'border-status-danger focus:border-status-danger focus:ring-status-danger',
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-neutral-400">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {error && (
          <p
            id={`${selectId}-error`}
            className="text-caption font-medium text-status-danger"
            role="alert"
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${selectId}-hint`} className="text-caption text-neutral-600">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
