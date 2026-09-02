import { cn } from '../../lib/utils';

interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'purple' | 'white' | 'monochrome';
}

const sizeClasses = {
  sm: 'h-7 w-7',
  md: 'h-9 w-9',
  lg: 'h-11 w-11',
};

/**
 * JharSankalp Institutional Geometric Mark.
 * Symbolizes the tripartite convergence:
 * Community Challenge (Left) + Academic Research (Top) + Industry Deployment (Right)
 * converging into a unified, measurable Impact outcome.
 */
export function BrandMark({
  size = 'md',
  className,
  variant = 'purple',
}: BrandMarkProps) {
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
        {/* Foundation Base Node (Jharkhand Ground) */}
        <path
          d="M6 18C6 22.4183 9.58172 26 14 26H22C24.2091 26 26 24.2091 26 22V22C26 19.7909 24.2091 18 22 18H14"
          stroke={isWhite ? '#FFFFFF' : '#FEE1C7'}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Vertical Ascending Stem (Challenge to Intelligence) */}
        <path
          d="M14 26V6C14 6 18 6 22 6C24.2091 6 26 7.79086 26 10C26 12.2091 24.2091 14 22 14H14"
          stroke={isWhite ? '#FEE1C7' : '#FFFFFF'}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Innovation Focal Node */}
        <circle
          cx="22"
          cy="10"
          r="1.75"
          fill={isWhite ? '#FA7E61' : '#FA7E61'}
        />

        {/* Verification Impact Node */}
        <circle
          cx="14"
          cy="18"
          r="1.5"
          fill={isWhite ? '#FFFFFF' : '#B5A886'}
        />
      </svg>
    </div>
  );
}
