import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-700 focus-visible:ring-primary/30 active:bg-primary-800',
  secondary:
    'bg-secondary text-white hover:bg-secondary-700 focus-visible:ring-secondary/30 active:bg-secondary-800',
  outline:
    'border border-ink-300 bg-white text-ink-700 hover:bg-ink-50 focus-visible:ring-primary/20 active:bg-ink-100',
  ghost:
    'text-ink-600 hover:bg-ink-100 focus-visible:ring-primary/20 active:bg-ink-200',
  danger:
    'bg-danger text-white hover:bg-danger-700 focus-visible:ring-danger/30 active:bg-danger-700',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-10 px-5 text-base gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
        'disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {rightIcon}
    </button>
  );
}
