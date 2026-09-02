import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  tag?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  tag,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('mb-6 pb-4 border-b border-neutral-200 text-left', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-2">
          <ol className="flex items-center gap-1.5 text-caption text-neutral-400">
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3 w-3 text-neutral-300" />}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="hover:text-neutral-900 transition-colors"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-neutral-700 font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-h2 font-bold text-neutral-900 tracking-tight leading-tight">
              {title}
            </h1>
            {tag}
          </div>
          {description && (
            <div className="mt-1 text-small text-neutral-600 max-w-3xl leading-normal">
              {description}
            </div>
          )}
        </div>

        {actions && (
          <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
