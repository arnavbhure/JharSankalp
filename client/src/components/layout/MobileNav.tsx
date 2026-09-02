import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../lib/utils';
import { Home, PlusCircle, FileText, Search, type LucideIcon } from 'lucide-react';

interface MobileNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export function MobileNav() {
  const { isCitizen } = useAuth();

  if (!isCitizen) return null;

  const items: MobileNavItem[] = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Report', href: '/report-challenge', icon: PlusCircle },
    { label: 'My Issues', href: '/my-challenges', icon: FileText },
    { label: 'Explore', href: '/challenges', icon: Search },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#EEEAE1] bg-white lg:hidden shadow-md">
      <div className="flex items-center justify-around">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center gap-1 py-2 text-caption font-medium transition-colors select-none',
                isActive
                  ? 'text-[#123B2A] font-bold border-t-2 border-[#123B2A] -mt-px'
                  : 'text-[#6B5845] hover:text-[#1D2522]',
              )
            }
          >
            <item.icon className="h-4.5 w-4.5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
