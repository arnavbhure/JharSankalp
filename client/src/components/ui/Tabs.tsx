import React from 'react';
import { cn } from '../../lib/utils';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn('border-b border-neutral-200 w-full', className)}>
      <nav className="flex space-x-6 -mb-px overflow-x-auto scrollbar-custom" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={cn(
                'group inline-flex items-center gap-2 py-3 border-b-2 text-body-sm font-medium whitespace-nowrap transition-colors select-none',
                isActive
                  ? 'border-brand-purple text-brand-purple'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.icon && <span className="text-current">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'ml-1 px-1.5 py-0.2 rounded-pill text-caption font-semibold',
                    isActive
                      ? 'bg-brand-purple text-neutral-0'
                      : 'bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200',
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
