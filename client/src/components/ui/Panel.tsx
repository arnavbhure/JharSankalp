import React from 'react';
import { cn } from '../../lib/utils';

export interface PanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'inset' | 'ai';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles = {
  default: 'bg-neutral-0 border border-neutral-200',
  subtle: 'bg-neutral-25 border border-neutral-200',
  inset: 'bg-neutral-100 border border-neutral-200',
  ai: 'bg-neutral-0 border border-neutral-200 border-l-[3px] border-l-brand-purple',
};

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function Panel({
  children,
  className,
  variant = 'default',
  padding = 'md',
}: PanelProps) {
  return (
    <div
      className={cn(
        'rounded-sm text-left transition-colors',
        variantStyles[variant],
        paddingStyles[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PanelHeader({
  title,
  description,
  action,
  tag,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  tag?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-start justify-between gap-3 border-b border-neutral-200 pb-3 mb-3', className)}>
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <h3 className="text-body font-semibold text-neutral-900 tracking-tight">{title}</h3>
          {tag}
        </div>
        {description && (
          <p className="text-small text-neutral-600 leading-normal">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0 pt-0.5">{action}</div>}
    </div>
  );
}

export function PanelBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('space-y-3', className)}>{children}</div>;
}

export function PanelFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-small text-neutral-600', className)}>
      {children}
    </div>
  );
}
