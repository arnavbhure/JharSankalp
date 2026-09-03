import { WorkspaceTabId } from '../../types/workspace';
import {
  LayoutDashboard,
  Calendar,
  Layers,
  Users,
  FileCheck,
  FileText,
  MessageSquare,
  Target,
} from 'lucide-react';

interface WorkspaceSidebarProps {
  activeTab: WorkspaceTabId;
  onSelectTab: (tab: WorkspaceTabId) => void;
  deliverablesReviewCount?: number;
  openIssuesCount?: number;
}

interface NavItem {
  id: WorkspaceTabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  badgeColor?: string;
}

export function WorkspaceSidebar({
  activeTab,
  onSelectTab,
  deliverablesReviewCount = 2,
  openIssuesCount = 1,
}: WorkspaceSidebarProps) {
  const NAV_ITEMS: NavItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'roadmap',
      label: 'Roadmap',
      icon: Calendar,
    },
    {
      id: 'work',
      label: 'Work Management',
      icon: Layers,
    },
    {
      id: 'team',
      label: 'Team & Consortium',
      icon: Users,
    },
    {
      id: 'deliverables',
      label: 'Deliverables',
      icon: FileCheck,
      badge: deliverablesReviewCount > 0 ? deliverablesReviewCount : undefined,
      badgeColor: 'bg-[#B45309] text-white',
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
    },
    {
      id: 'updates',
      label: 'Project Updates',
      icon: MessageSquare,
      badge: openIssuesCount > 0 ? openIssuesCount : undefined,
      badgeColor: 'bg-[#BE123C] text-white',
    },
    {
      id: 'impact',
      label: 'Impact Reporting',
      icon: Target,
    },
  ];

  return (
    <>
      {/* ── Desktop Sidebar (lg:block) ── */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#1B112C] text-[#DDD6FE] border-r border-[#382657] shrink-0 min-h-[calc(100vh-8.5rem)] text-left select-none">
        <div className="p-4 space-y-1">
          <div className="px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#FFD8A8]">
            OPERATIONAL WORKSPACE
          </div>

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#281943] text-white font-bold border border-[#F5A623]/40 shadow-xs'
                      : 'text-[#DDD6FE]/80 hover:text-white hover:bg-[#281943]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 ${
                        isActive ? 'text-[#F5A623]' : 'text-[#DDD6FE]/60'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                        item.badgeColor || 'bg-[#15803D] text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Contributor Status Box */}
        <div className="mt-auto p-4 border-t border-[#382657] m-4 rounded-2xl bg-[#281943]/80 space-y-1 text-left">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#FFD8A8] uppercase">
            <span>Logged Contributor</span>
            <span className="text-[#4ADE80]">● Active</span>
          </div>
          <p className="text-[12.5px] font-bold text-white truncate">
            Dr. Ananya Singh
          </p>
          <p className="text-[11px] font-mono text-[#DDD6FE]/70 truncate">
            Lead Research Investigator
          </p>
        </div>
      </aside>

      {/* ── Mobile / Tablet Horizontal Navigation Bar (lg:hidden) ── */}
      <div className="lg:hidden border-b border-[#EEEAE1] bg-[#1B112C] px-4 py-2 overflow-x-auto scrollbar-none select-none text-left">
        <div className="flex items-center gap-1.5 min-w-max">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#F5A623] text-[#1B112C] font-bold shadow-2xs'
                    : 'text-[#DDD6FE] hover:bg-[#281943]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[9.5px] font-mono font-bold ${
                      isActive
                        ? 'bg-[#1B112C] text-white'
                        : item.badgeColor || 'bg-[#15803D] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
