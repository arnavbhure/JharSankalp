import React from 'react';
import { cn } from '../../lib/utils';
import { FileText } from 'lucide-react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-10 px-6 text-center border border-neutral-200 border-dashed rounded-sm bg-neutral-0',
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-brand-apricot text-brand-purple mb-3.5">
        {icon || <FileText className="h-6 w-6 stroke-[1.75]" />}
      </div>
      <h3 className="text-body font-semibold text-neutral-900 tracking-tight">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-md text-small text-neutral-600 leading-normal text-balance">
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
