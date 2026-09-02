import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({ children, className, padding = 'md', hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded border border-ink-200 bg-white',
        paddingStyles[padding],
        hover && 'transition-shadow hover:shadow-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export function CardHeader({ children, className, action }: CardHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div>{children}</div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}

export function CardTitle({ children, className, as: Tag = 'h3' }: CardTitleProps) {
  return (
    <Tag className={cn('text-base font-semibold text-ink-900', className)}>
      {children}
    </Tag>
  );
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('mt-0.5 text-sm text-ink-500', className)}>
      {children}
    </p>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mt-3', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mt-4 flex items-center gap-2 border-t border-ink-100 pt-3', className)}>
      {children}
    </div>
  );
}
