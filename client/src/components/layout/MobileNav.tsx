import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../lib/utils';
import {
  Home,
  PlusCircle,
  FileText,
  Search,
  type LucideIcon,
} from 'lucide-react';

interface MobileNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/**
 * Bottom navigation bar for citizen mobile experience.
 * Only rendered when user role is CITIZEN.
 */
export function MobileNav() {
  const { isCitizen } = useAuth();

  if (!isCitizen) return null;

  const items: MobileNavItem[] = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Report', href: '/report', icon: PlusCircle },
    { label: 'My Issues', href: '/my-challenges', icon: FileText },
    { label: 'Explore', href: '/challenges', icon: Search },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-ink-200 bg-white lg:hidden">
      <div className="flex items-center justify-around">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center gap-0.5 py-2 text-2xs font-medium transition-colors',
                isActive ? 'text-primary' : 'text-ink-400',
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
