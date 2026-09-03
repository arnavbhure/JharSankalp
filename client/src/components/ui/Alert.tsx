import React from 'react';
import { cn } from '../../lib/utils';
import { Info, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<
  AlertVariant,
  { container: string; icon: React.ReactNode; text: string }
> = {
  info: {
    container: 'bg-brand-purple-subtle border-brand-purple-border/30 text-neutral-900',
    icon: <Info className="h-5 w-5 text-brand-purple shrink-0" />,
    text: 'text-brand-purple',
  },
  success: {
    container: 'bg-status-success-subtle border-status-success-border text-neutral-900',
    icon: <CheckCircle2 className="h-5 w-5 text-status-success shrink-0" />,
    text: 'text-status-success',
  },
  warning: {
    container: 'bg-status-warning-subtle border-status-warning-border text-neutral-900',
    icon: <AlertTriangle className="h-5 w-5 text-status-warning shrink-0" />,
    text: 'text-status-warning',
  },
  error: {
    container: 'bg-status-danger-subtle border-status-danger-border text-neutral-900',
    icon: <AlertOctagon className="h-5 w-5 text-status-danger shrink-0" />,
    text: 'text-status-danger',
  },
};

export function Alert({ variant = 'info', title, children, action, className }: AlertProps) {
  const current = variantStyles[variant];

  return (
    <div
      role="alert"
      className={cn(
        'rounded-sm border p-3.5 flex items-start gap-3 text-left transition-colors',
        current.container,
        className,
      )}
    >
      <div className="pt-0.5">{current.icon}</div>
      <div className="flex-1 min-w-0 space-y-0.5">
        {title && (
          <h4 className={cn('text-body-sm font-semibold leading-tight', current.text)}>{title}</h4>
        )}
        <div className="text-small text-neutral-700 leading-normal">{children}</div>
        {action && <div className="mt-2 pt-1">{action}</div>}
      </div>
    </div>
  );
}
