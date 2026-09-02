import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant =
  | 'neutral'
  | 'purple'
  | 'apricot'
  | 'khaki'
  | 'coral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  // Neutral Gray
  neutral: 'bg-neutral-100 text-neutral-800 border border-neutral-200',
  // Brand Deep Purple / Info
  purple: 'bg-brand-purple-subtle text-brand-purple border border-brand-purple-border/20',
  // Brand Soft Apricot
  apricot: 'bg-brand-apricot-surface text-neutral-900 border border-brand-apricot-border',
  // Brand Khaki
  khaki: 'bg-brand-khaki-subtle text-neutral-800 border border-brand-khaki-border/30',
  // Brand Action Coral
  coral: 'bg-brand-coral-subtle text-neutral-900 border border-brand-coral/30',
  // Semantic Success
  success: 'bg-status-success-subtle text-status-success border border-status-success-border',
  // Semantic Warning
  warning: 'bg-status-warning-subtle text-status-warning border border-status-warning-border',
  // Semantic Critical / Danger
  danger: 'bg-status-danger-subtle text-status-danger border border-status-danger-border',
  // Neutral Outline
  outline: 'bg-neutral-0 text-neutral-600 border border-neutral-200',
};

const dotColors: Record<BadgeVariant, string> = {
  neutral: 'bg-neutral-400',
  purple: 'bg-brand-purple',
  apricot: 'bg-neutral-800',
  khaki: 'bg-brand-khaki',
  coral: 'bg-brand-coral',
  success: 'bg-status-success',
  warning: 'bg-status-warning',
  danger: 'bg-status-danger',
  outline: 'bg-neutral-400',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-caption tracking-tight',
  md: 'px-2.5 py-0.5 text-small font-medium',
};

export function Badge({ variant = 'neutral', size = 'sm', children, className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill font-medium whitespace-nowrap select-none leading-none',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
}
