import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';
import {
  Home,
  FileText,
  PlusCircle,
  Search,
  BarChart3,
  MapPin,
  Building2,
  GraduationCap,
  Factory,
  Users,
  FolderKanban,
  Target,
  Lightbulb,
  Shield,
  Wrench,
  Settings,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function getNavigation(role: {
  isCitizen: boolean;
  isGovernment: boolean;
  isUniversity: boolean;
  isIndustry: boolean;
  isAdmin: boolean;
}): NavSection[] {
  if (role.isCitizen) {
    return [
      {
        items: [
          { label: 'Home', href: '/', icon: Home },
          { label: 'Report Challenge', href: '/report', icon: PlusCircle },
          { label: 'My Challenges', href: '/my-challenges', icon: FileText },
          { label: 'Explore', href: '/challenges', icon: Search },
        ],
      },
    ];
  }

  if (role.isGovernment) {
    return [
      {
        items: [
          { label: 'Dashboard', href: '/government', icon: BarChart3 },
        ],
      },
      {
        title: 'Challenge Management',
        items: [
          { label: 'All Challenges', href: '/government/challenges', icon: FileText },
          { label: 'District View', href: '/government/districts', icon: MapPin },
        ],
      },
      {
        title: 'Ecosystem',
        items: [
          { label: 'Projects', href: '/government/projects', icon: FolderKanban },
          { label: 'Missions', href: '/government/missions', icon: Target },
          { label: 'Impact', href: '/government/impact', icon: Lightbulb },
          { label: 'Insights', href: '/government/insights', icon: BarChart3 },
        ],
      },
    ];
  }

  if (role.isUniversity) {
    return [
      {
        items: [
          { label: 'Dashboard', href: '/university', icon: GraduationCap },
        ],
      },
      {
        title: 'Challenges',
        items: [
          { label: 'Browse Challenges', href: '/university/challenges', icon: Search },
        ],
      },
      {
        title: 'Institution',
        items: [
          { label: 'Capabilities', href: '/university/capabilities', icon: Wrench },
          { label: 'Teams', href: '/university/teams', icon: Users },
          { label: 'Projects', href: '/university/projects', icon: FolderKanban },
        ],
      },
    ];
  }

  if (role.isIndustry) {
    return [
      {
        items: [
          { label: 'Dashboard', href: '/industry', icon: Factory },
        ],
      },
      {
        title: 'Opportunities',
        items: [
          { label: 'Browse', href: '/industry/opportunities', icon: Search },
        ],
      },
      {
        title: 'Organization',
        items: [
          { label: 'Capabilities', href: '/industry/capabilities', icon: Wrench },
          { label: 'Commitments', href: '/industry/commitments', icon: Shield },
          { label: 'Partnerships', href: '/industry/partnerships', icon: Users },
        ],
      },
    ];
  }

  if (role.isAdmin) {
    return [
      {
        items: [
          { label: 'Dashboard', href: '/government', icon: BarChart3 },
          { label: 'All Challenges', href: '/challenges', icon: FileText },
          { label: 'Organizations', href: '/admin/organizations', icon: Building2 },
          { label: 'Users', href: '/admin/users', icon: Users },
          { label: 'Settings', href: '/admin/settings', icon: Settings },
        ],
      },
    ];
  }

  // Fallback
  return [
    {
      items: [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Explore', href: '/challenges', icon: Search },
      ],
    },
  ];
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const auth = useAuth();
  const sections = getNavigation(auth);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-900/30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-ink-200 bg-white transition-transform duration-200',
          'lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Mobile close */}
        <div className="flex h-14 items-center justify-between border-b border-ink-200 px-4 lg:hidden">
          <span className="text-sm font-semibold text-ink-900">Navigation</span>
          <button onClick={onClose} className="rounded p-1 text-ink-500 hover:bg-ink-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation sections */}
        <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className={cn(sIdx > 0 && 'mt-4')}>
              {section.title && (
                <div className="px-4 pb-1.5 text-2xs font-medium uppercase tracking-wider text-ink-400">
                  {section.title}
                </div>
              )}
              <div className="space-y-0.5 px-2">
                {section.items.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={item.href === '/' || item.href === '/government' || item.href === '/university' || item.href === '/industry'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2.5 rounded px-2.5 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900',
                      )
                    }
                  >
                    <item.icon className="h-4.5 w-4.5 shrink-0" />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-ink-200 px-4 py-3">
          <div className="text-2xs text-ink-400">
            JharSankalp v0.1.0
          </div>
        </div>
      </aside>
    </>
  );
}
