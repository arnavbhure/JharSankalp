import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'attention' | 'critical';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  // Primary: Deep Purple background, white text
  primary:
    'bg-brand-purple text-neutral-0 hover:bg-brand-purple-hover active:bg-neutral-900 border border-transparent shadow-subtle',
  // Secondary: Neutral surface, Deep Purple text, neutral border
  secondary:
    'bg-neutral-0 text-brand-purple border border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300 active:bg-neutral-200',
  // Tertiary: Transparent background, Deep Purple text, subtle hover
  tertiary:
    'bg-transparent text-brand-purple hover:bg-neutral-100 active:bg-neutral-200 border border-transparent',
  // Attention: Vibrant Coral (secondary calls to action, attention states)
  attention:
    'bg-brand-coral text-neutral-0 hover:bg-brand-coral-hover active:opacity-90 border border-transparent shadow-subtle',
  // Critical: Wild Strawberry (strict high-attention critical actions)
  critical:
    'bg-brand-strawberry text-neutral-0 hover:bg-brand-strawberry-hover active:opacity-90 border border-transparent shadow-subtle',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-small gap-1.5 rounded-sm',
  md: 'h-9 px-4 text-body-sm gap-2 rounded-sm',
  lg: 'h-10 px-5 text-body gap-2 rounded-md font-medium',
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
        'inline-flex items-center justify-center font-medium transition-colors select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-1',
        'disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-current" />
      ) : (
        leftIcon
      )}
      {children}
      {rightIcon}
    </button>
  );
}
