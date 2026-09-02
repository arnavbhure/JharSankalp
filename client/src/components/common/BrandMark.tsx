import { cn } from '../../lib/utils';

interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'forest' | 'purple' | 'white' | 'monochrome';
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

/**
 * JharSankalp Institutional Emblem.
 * Represents the Sacred Sal Tree of Jharkhand & Collective Innovation Convergence.
 */
export function BrandMark({
  size = 'md',
  className,
  variant = 'forest',
}: BrandMarkProps) {
  if (variant === 'forest') {
    return (
      <div
        className={cn(
          'relative inline-flex items-center justify-center rounded-full bg-[#163D2B] text-white shrink-0 select-none shadow-sm transition-transform',
          sizeClasses[size],
          className,
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5"
        >
          {/* Stylized Sal Tree / Growth Foliage */}
          <path
            d="M16 4L9 14H13L7 22H14V27H18V22H25L19 14H23L16 4Z"
            fill="#FFFFFF"
          />
          {/* Golden Sprout / Innovation Dot */}
          <circle cx="16" cy="11" r="2" fill="#F5A623" />
        </svg>
      </div>
    );
  }

  const isWhite = variant === 'white';

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-sm shrink-0 select-none transition-transform',
        isWhite ? 'bg-neutral-0/10' : 'bg-brand-purple',
        sizeClasses[size],
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4/5 h-4/5"
      >
        <path
          d="M6 18C6 22.4183 9.58172 26 14 26H22C24.2091 26 26 24.2091 26 22V22C26 19.7909 24.2091 18 22 18H14"
          stroke={isWhite ? '#FFFFFF' : '#FEE1C7'}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 26V6C14 6 18 6 22 6C24.2091 6 26 7.79086 26 10C26 12.2091 24.2091 14 22 14H14"
          stroke={isWhite ? '#FEE1C7' : '#FFFFFF'}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="22" cy="10" r="1.75" fill="#FA7E61" />
        <circle cx="14" cy="18" r="1.5" fill={isWhite ? '#FFFFFF' : '#B5A886'} />
      </svg>
    </div>
  );
}
