import { clsx, type ClassValue } from 'clsx';

/**
 * Merge class names with clsx.
 * Provides Tailwind-friendly conditional class merging.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format a date string for display.
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  });
}

/**
 * Format a date relative to now (e.g. "2 hours ago").
 */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(d);
}

/**
 * Truncate text to a maximum length.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Generate a human-friendly challenge ID for display.
 */
export function formatChallengeId(publicId: string): string {
  return publicId;
}

/**
 * Format a number with Indian locale (e.g., 1,23,456).
 */
export function formatNumber(value: number): string {
  return value.toLocaleString('en-IN');
}
