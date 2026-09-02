import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-sm bg-neutral-200', className)}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-3.5', i === lines - 1 ? 'w-3/5' : 'w-full')}
        />
      ))}
    </div>
  );
}

export function SkeletonPanel() {
  return (
    <div className="rounded-sm border border-neutral-200 bg-neutral-0 p-4 space-y-3" aria-hidden="true">
      <Skeleton className="h-5 w-1/3" />
      <SkeletonText lines={2} />
      <div className="flex gap-2 pt-2 border-t border-neutral-100">
        <Skeleton className="h-6 w-20 rounded-pill" />
        <Skeleton className="h-6 w-24 rounded-pill" />
      </div>
    </div>
  );
}

export function ContextualLoader({
  message = 'Processing request...',
  submessage,
  className,
}: {
  message?: string;
  submessage?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center space-y-3', className)}>
      <Loader2 className="h-7 w-7 animate-spin text-brand-purple" />
      <div className="space-y-1">
        <p className="text-body-sm font-medium text-neutral-900">{message}</p>
        {submessage && (
          <p className="text-caption text-neutral-600">{submessage}</p>
        )}
      </div>
    </div>
  );
}
