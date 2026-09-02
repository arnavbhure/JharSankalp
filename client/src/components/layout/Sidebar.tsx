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
  Briefcase,
  Users,
  FolderKanban,
  Target,
  Sparkles,
  ShieldCheck,
  Wrench,
  Settings,
  BookOpen,
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
  // ── Citizen: Minimal & Direct ───────────────────────────────
  if (role.isCitizen) {
    return [
      {
        items: [
          { label: 'Home', href: '/', icon: Home },
          { label: 'Report Challenge', href: '/report', icon: PlusCircle },
          { label: 'My Challenges', href: '/my-challenges', icon: FileText },
          { label: 'Explore Challenges', href: '/challenges', icon: Search },
        ],
      },
    ];
  }

  // ── Government: Information-Dense, Editorial, Administrative ───
  if (role.isGovernment) {
    return [
      {
        items: [
          { label: 'State Overview', href: '/government', icon: BarChart3 },
        ],
      },
      {
        title: 'Triage & Pipeline',
        items: [
          { label: 'Challenges', href: '/government/challenges', icon: FileText },
          { label: 'Districts', href: '/government/districts', icon: MapPin },
          { label: 'Missions', href: '/government/missions', icon: Target },
        ],
      },
      {
        title: 'Execution & Evidence',
        items: [
          { label: 'Projects', href: '/government/projects', icon: FolderKanban },
          { label: 'Impact', href: '/government/impact', icon: ShieldCheck },
          { label: 'Insights', href: '/government/insights', icon: Sparkles },
        ],
      },
    ];
  }

  // ── University: Academic, Research, Capability-Oriented ──────
  if (role.isUniversity) {
    return [
      {
        items: [
          { label: 'Overview', href: '/university', icon: GraduationCap },
        ],
      },
      {
        title: 'Opportunities',
        items: [
          { label: 'Challenges', href: '/university/challenges', icon: Search },
          { label: 'Research Areas', href: '/university/research', icon: BookOpen },
        ],
      },
      {
        title: 'Institutional Capacity',
        items: [
          { label: 'Capabilities', href: '/university/capabilities', icon: Wrench },
          { label: 'Teams', href: '/university/teams', icon: Users },
          { label: 'Projects', href: '/university/projects', icon: FolderKanban },
        ],
      },
    ];
  }

  // ── Industry: Resource Publication, Commitments & Consortiums ─
  if (role.isIndustry) {
    return [
      {
        items: [
          { label: 'Overview', href: '/industry', icon: Briefcase },
        ],
      },
      {
        title: 'Exchange',
        items: [
          { label: 'Opportunities', href: '/industry/opportunities', icon: Search },
          { label: 'Capabilities', href: '/industry/capabilities', icon: Wrench },
          { label: 'Commitments', href: '/industry/commitments', icon: ShieldCheck },
          { label: 'Partnerships', href: '/industry/partnerships', icon: Users },
        ],
      },
    ];
  }

  // ── Super Admin ─────────────────────────────────────────────
  if (role.isAdmin) {
    return [
      {
        items: [
          { label: 'Dashboard', href: '/government', icon: BarChart3 },
          { label: 'All Challenges', href: '/challenges', icon: FileText },
          { label: 'Organizations', href: '/admin/organizations', icon: Building2 },
          { label: 'Users', href: '/admin/users', icon: Users },
          { label: 'System Settings', href: '/admin/settings', icon: Settings },
        ],
      },
    ];
  }

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
          className="fixed inset-0 z-40 bg-neutral-900/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-neutral-200 bg-neutral-0 transition-transform duration-200',
          'lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Mobile Header */}
        <div className="flex h-14 items-center justify-between border-b border-neutral-200 px-4 lg:hidden bg-neutral-25">
          <span className="text-body-sm font-semibold text-neutral-900">Navigation Menu</span>
          <button
            onClick={onClose}
            className="rounded-sm p-1 text-neutral-400 hover:text-neutral-900"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto py-3.5 scrollbar-custom text-left">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className={cn(sIdx > 0 && 'mt-4 pt-3 border-t border-neutral-100')}>
              {section.title && (
                <div className="px-4 pb-1.5 text-caption font-semibold uppercase tracking-wider text-neutral-400">
                  {section.title}
                </div>
              )}
              <div className="space-y-0.5 px-2">
                {section.items.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    end={
                      item.href === '/' ||
                      item.href === '/government' ||
                      item.href === '/university' ||
                      item.href === '/industry'
                    }
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-2.5 rounded-sm px-3 py-2 text-body-sm font-medium transition-colors select-none',
                        isActive
                          ? 'bg-neutral-100 text-brand-purple border-l-[3px] border-l-brand-purple font-semibold rounded-l-none'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
                      )
                    }
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Institutional Footer */}
        <div className="border-t border-neutral-200 bg-neutral-25 px-4 py-3 text-left">
          <div className="text-[11px] font-medium text-neutral-600">
            Govt. of Jharkhand
          </div>
          <div className="text-[10px] text-neutral-400 mt-0.5">
            Dept. of Higher & Technical Education
          </div>
        </div>
      </aside>
    </>
  );
}
