import { ProjectHealth } from '../../types/projects';

interface ProjectHealthIndicatorProps {
  health: ProjectHealth;
  label?: string;
  showText?: boolean;
}

export function ProjectHealthIndicator({
  health,
  label,
  showText = true,
}: ProjectHealthIndicatorProps) {
  const getStyles = () => {
    switch (health) {
      case 'ON_TRACK':
        return {
          dot: 'bg-[#15803D]',
          bg: 'bg-[#F0FDF4]',
          border: 'border-[#BBF7D0]',
          text: 'text-[#15803D]',
          defaultLabel: 'On Track',
        };
      case 'AT_RISK':
        return {
          dot: 'bg-[#F5A623]',
          bg: 'bg-[#FFFDF9]',
          border: 'border-[#FDE68A]',
          text: 'text-[#B45309]',
          defaultLabel: 'At Risk',
        };
      case 'NEEDS_ATTENTION':
        return {
          dot: 'bg-[#BE123C]',
          bg: 'bg-[#FFF5F5]',
          border: 'border-[#FECDD3]',
          text: 'text-[#BE123C]',
          defaultLabel: 'Needs Attention',
        };
    }
  };

  const style = getStyles();

  if (!showText) {
    return (
      <span
        title={label || style.defaultLabel}
        className={`inline-block h-2.5 w-2.5 rounded-full ${style.dot}`}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10.5px] font-mono font-bold uppercase tracking-wider border ${style.bg} ${style.border} ${style.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      <span>{label || style.defaultLabel}</span>
    </span>
  );
}
