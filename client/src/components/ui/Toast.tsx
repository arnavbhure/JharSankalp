import { useToastStore, type ToastType } from '../../stores/toastStore';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

const iconMap: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const styleMap: Record<ToastType, { bg: string; border: string; text: string; iconColor: string }> = {
  success: {
    bg: 'bg-[#F0FDF4]',
    border: 'border-[#BBF7D0]',
    text: 'text-[#166534]',
    iconColor: 'text-[#16A34A]',
  },
  error: {
    bg: 'bg-[#FEF2F2]',
    border: 'border-[#FECACA]',
    text: 'text-[#991B1B]',
    iconColor: 'text-[#DC2626]',
  },
  warning: {
    bg: 'bg-[#FFFBEB]',
    border: 'border-[#FDE68A]',
    text: 'text-[#92400E]',
    iconColor: 'text-[#D97706]',
  },
  info: {
    bg: 'bg-[#F0FDF4]',
    border: 'border-[#123B2A]/20',
    text: 'text-[#123B2A]',
    iconColor: 'text-[#123B2A]',
  },
};

/**
 * Global Toast Notification Container
 * Renders in a fixed position at the top-right of the viewport.
 */
export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type];
        const styles = styleMap[toast.type];

        return (
          <div
            key={toast.id}
            role="alert"
            className={cn(
              'pointer-events-auto flex items-start gap-3 rounded-lg border p-3.5 shadow-lg backdrop-blur-xs transition-all duration-300 animate-in fade-in slide-in-from-top-3',
              styles.bg,
              styles.border,
            )}
          >
            <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', styles.iconColor)} />
            <div className="flex-1 text-[13.5px] font-medium leading-snug">
              <span className={styles.text}>{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="shrink-0 rounded-md p-1 text-neutral-400 hover:text-neutral-600 hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
