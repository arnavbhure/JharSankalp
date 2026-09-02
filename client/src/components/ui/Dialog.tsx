import React, { useEffect } from 'react';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

const maxWidthStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'md',
}: DialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Restrained Backdrop - strictly no glassmorphism / no blur */}
      <div
        className="fixed inset-0 bg-neutral-900/50 transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'relative w-full rounded-sm border border-neutral-200 bg-neutral-0 shadow-medium z-10 overflow-hidden text-left',
          maxWidthStyles[maxWidth],
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-200 px-5 py-3.5 bg-neutral-25">
          <div>
            <h3 className="text-body font-semibold text-neutral-900 leading-snug">{title}</h3>
            {description && (
              <p className="mt-0.5 text-small text-neutral-600">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-900 rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-purple"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[calc(85vh-8rem)] overflow-y-auto scrollbar-custom text-body-sm text-neutral-800">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-neutral-200 bg-neutral-50 px-5 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
