import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5 sm:p-6',
};

/**
 * Card is reserved for discrete conceptual entities (e.g., Challenge, Organization, Project).
 * For generic grouping or dashboard sections, prefer `Panel` or structured rows.
 */
export function Card({
  children,
  className,
  padding = 'md',
  hoverable = false,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-sm border border-neutral-200 bg-neutral-0 text-left',
        paddingStyles[padding],
        hoverable &&
          'transition-all duration-150 hover:border-neutral-300 hover:shadow-subtle cursor-pointer',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
  action,
}: {
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={cn('flex items-start justify-between gap-3', className)}>
      <div className="space-y-0.5 min-w-0 flex-1">{children}</div>
      {action && <div className="shrink-0 pt-0.5">{action}</div>}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  as: Tag = 'h3',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}) {
  return (
    <Tag className={cn('text-body font-semibold text-neutral-900 leading-snug', className)}>
      {children}
    </Tag>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('text-small text-neutral-600 line-clamp-2 mt-1 leading-normal', className)}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('mt-3', className)}>{children}</div>;
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-caption text-neutral-600',
        className,
      )}
    >
      {children}
    </div>
  );
}
