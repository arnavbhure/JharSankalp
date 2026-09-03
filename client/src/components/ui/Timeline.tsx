import React from 'react';
import { cn } from '../../lib/utils';
import { Check } from 'lucide-react';

export type TimelineStepState = 'completed' | 'current' | 'upcoming' | 'failed';

export interface TimelineStep {
  id: string;
  label: string;
  sublabel?: string;
  state: TimelineStepState;
  date?: string;
  metadata?: React.ReactNode;
}

export interface TimelineProps {
  steps: TimelineStep[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Timeline({ steps, orientation = 'horizontal', className }: TimelineProps) {
  if (orientation === 'horizontal') {
    return (
      <div className={cn('w-full py-3 overflow-x-auto scrollbar-custom', className)}>
        <ol className="flex items-center w-full min-w-[560px]">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;

            return (
              <li
                key={step.id}
                className={cn('flex items-center', !isLast ? 'flex-1' : 'flex-initial')}
              >
                <div className="flex flex-col items-center">
                  {/* Indicator Icon */}
                  <div
                    className={cn(
                      'flex items-center justify-center w-7 h-7 rounded-full border-2 text-caption font-semibold shrink-0 transition-colors',
                      step.state === 'completed' &&
                        'bg-brand-purple border-brand-purple text-neutral-0',
                      step.state === 'current' &&
                        'bg-neutral-0 border-brand-coral text-brand-coral ring-4 ring-brand-coral/20',
                      step.state === 'upcoming' &&
                        'bg-neutral-0 border-neutral-300 text-neutral-400',
                      step.state === 'failed' &&
                        'bg-status-danger border-status-danger text-neutral-0',
                    )}
                  >
                    {step.state === 'completed' ? (
                      <Check className="h-4 w-4 stroke-[2.5]" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  {/* Label */}
                  <div className="text-center mt-2 max-w-[100px]">
                    <p
                      className={cn(
                        'text-caption font-medium leading-tight',
                        step.state === 'current'
                          ? 'text-neutral-900 font-semibold'
                          : step.state === 'completed'
                            ? 'text-brand-purple'
                            : 'text-neutral-600',
                      )}
                    >
                      {step.label}
                    </p>
                    {step.sublabel && (
                      <p className="text-[11px] text-neutral-400 mt-0.5">{step.sublabel}</p>
                    )}
                  </div>
                </div>

                {/* Connecting Line */}
                {!isLast && (
                  <div
                    className={cn(
                      'h-0.5 flex-1 mx-2 -mt-5 transition-colors',
                      step.state === 'completed' ? 'bg-brand-purple' : 'bg-neutral-200',
                    )}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }

  // Vertical Timeline
  return (
    <div className={cn('relative pl-6 space-y-6', className)}>
      <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-neutral-200" />
      {steps.map((step, idx) => (
        <div key={step.id} className="relative flex items-start gap-4">
          <div
            className={cn(
              'absolute -left-6 top-1 flex items-center justify-center w-5 h-5 rounded-full border-2 text-[10px] font-bold bg-neutral-0 transition-colors',
              step.state === 'completed' && 'bg-brand-purple border-brand-purple text-neutral-0',
              step.state === 'current' &&
                'border-brand-coral bg-neutral-0 text-brand-coral ring-3 ring-brand-coral/20',
              step.state === 'upcoming' && 'border-neutral-300 text-neutral-400',
              step.state === 'failed' && 'bg-status-danger border-status-danger text-neutral-0',
            )}
          >
            {step.state === 'completed' ? (
              <Check className="h-3 w-3 stroke-[3]" />
            ) : (
              <span>{idx + 1}</span>
            )}
          </div>

          <div className="space-y-1 text-left min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="text-body-sm font-semibold text-neutral-900 leading-none">
                {step.label}
              </h4>
              {step.date && (
                <span className="text-caption text-neutral-400 font-mono shrink-0">
                  {step.date}
                </span>
              )}
            </div>
            {step.sublabel && <p className="text-small text-neutral-600">{step.sublabel}</p>}
            {step.metadata && <div className="mt-2">{step.metadata}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
