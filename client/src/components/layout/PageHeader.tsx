import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, breadcrumbs, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-2">
          <ol className="flex items-center gap-1 text-sm text-ink-500">
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-ink-400" />}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-ink-700 transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-ink-700 font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-ink-900">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-ink-500">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
