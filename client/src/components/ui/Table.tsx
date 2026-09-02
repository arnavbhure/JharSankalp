import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Table({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-sm border border-neutral-200 bg-neutral-0', className)}>
      <table className="w-full text-left border-collapse text-body-sm">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <thead className={cn('bg-neutral-50 border-b border-neutral-200 text-neutral-800 text-caption font-semibold uppercase tracking-wider', className)}>
      {children}
    </thead>
  );
}

export function TableBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <tbody className={cn('divide-y divide-neutral-200', className)}>{children}</tbody>;
}

export function TableRow({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        'transition-colors duration-75',
        onClick && 'cursor-pointer hover:bg-neutral-50 active:bg-neutral-100',
        !onClick && 'hover:bg-neutral-25',
        className,
      )}
    >
      {children}
    </tr>
  );
}

export function TableHead({
  children,
  className,
  align = 'left',
}: {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <th className={cn('px-3.5 py-2.5 font-semibold text-neutral-800', alignClass, className)}>
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className,
  align = 'left',
}: {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <td className={cn('px-3.5 py-3 text-neutral-900 align-middle', alignClass, className)}>
      {children}
    </td>
  );
}

export function TablePagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  className,
}: {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-between px-3.5 py-2.5 border-t border-neutral-200 bg-neutral-50 text-small text-neutral-600', className)}>
      <div>
        {totalItems !== undefined ? (
          <span>Showing page <strong className="text-neutral-900">{currentPage}</strong> of <strong className="text-neutral-900">{totalPages}</strong> ({totalItems} total items)</span>
        ) : (
          <span>Page <strong className="text-neutral-900">{currentPage}</strong> of <strong className="text-neutral-900">{totalPages}</strong></span>
        )}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1 rounded text-neutral-600 hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1 rounded text-neutral-600 hover:bg-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
