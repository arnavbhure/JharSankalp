import { ChallengeItem, ChallengeCategory } from '../types/challenges';

export interface CategoryMeta {
  name: ChallengeCategory;
  accent: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  hoverBorder: string;
}

export const CATEGORY_METADATA: Record<ChallengeCategory, CategoryMeta> = {
  'Water Management': {
    name: 'Water Management',
    accent: '#0284C7',
    badgeBg: 'bg-[#F0F7FF]',
    badgeText: 'text-[#0284C7]',
    borderColor: 'border-[#CCE2FF]',
    iconBg: 'bg-[#E0F2FE]',
    iconColor: 'text-[#0284C7]',
    hoverBorder: 'hover:border-[#0284C7]/50',
  },
  Agriculture: {
    name: 'Agriculture',
    accent: '#15803D',
    badgeBg: 'bg-[#F0FDF4]',
    badgeText: 'text-[#15803D]',
    borderColor: 'border-[#BBF7D0]',
    iconBg: 'bg-[#DCFCE7]',
    iconColor: 'text-[#15803D]',
    hoverBorder: 'hover:border-[#15803D]/50',
  },
  'Mining Safety': {
    name: 'Mining Safety',
    accent: '#B45309',
    badgeBg: 'bg-[#FEF6E9]',
    badgeText: 'text-[#B45309]',
    borderColor: 'border-[#F8CCA5]',
    iconBg: 'bg-[#FEE1C7]',
    iconColor: 'text-[#B45309]',
    hoverBorder: 'hover:border-[#B45309]/50',
  },
  Education: {
    name: 'Education',
    accent: '#1F5A3D',
    badgeBg: 'bg-[#F2FBF5]',
    badgeText: 'text-[#1F5A3D]',
    borderColor: 'border-[#D2F2DD]',
    iconBg: 'bg-[#E0F5E6]',
    iconColor: 'text-[#1F5A3D]',
    hoverBorder: 'hover:border-[#1F5A3D]/50',
  },
  Healthcare: {
    name: 'Healthcare',
    accent: '#BE123C',
    badgeBg: 'bg-[#FFF2F4]',
    badgeText: 'text-[#BE123C]',
    borderColor: 'border-[#FDD3D9]',
    iconBg: 'bg-[#FFE2E6]',
    iconColor: 'text-[#BE123C]',
    hoverBorder: 'hover:border-[#BE123C]/50',
  },
  Environment: {
    name: 'Environment',
    accent: '#123B2A',
    badgeBg: 'bg-[#EBF3EE]',
    badgeText: 'text-[#123B2A]',
    borderColor: 'border-[#25593F]/20',
    iconBg: 'bg-[#EBF5ED]',
    iconColor: 'text-[#123B2A]',
    hoverBorder: 'hover:border-[#123B2A]/50',
  },
  Livelihoods: {
    name: 'Livelihoods',
    accent: '#6B5845',
    badgeBg: 'bg-[#FAF5EF]',
    badgeText: 'text-[#6B5845]',
    borderColor: 'border-[#E7DEC8]',
    iconBg: 'bg-[#EEEAE1]',
    iconColor: 'text-[#6B5845]',
    hoverBorder: 'hover:border-[#6B5845]/50',
  },
  'Urban Development': {
    name: 'Urban Development',
    accent: '#0284C7',
    badgeBg: 'bg-[#F0F7FF]',
    badgeText: 'text-[#0284C7]',
    borderColor: 'border-[#CCE2FF]',
    iconBg: 'bg-[#E0F2FE]',
    iconColor: 'text-[#0284C7]',
    hoverBorder: 'hover:border-[#0284C7]/50',
  },
};

export const DEFAULT_CATEGORY_META: CategoryMeta = {
  name: 'Water Management',
  accent: '#123B2A',
  badgeBg: 'bg-[#EBF3EE]',
  badgeText: 'text-[#123B2A]',
  borderColor: 'border-[#25593F]/20',
  iconBg: 'bg-[#EBF5ED]',
  iconColor: 'text-[#123B2A]',
  hoverBorder: 'hover:border-[#123B2A]/50',
};

export function getCategoryMeta(category?: string): CategoryMeta {
  if (!category) return DEFAULT_CATEGORY_META;
  return (CATEGORY_METADATA as Record<string, CategoryMeta>)[category] || DEFAULT_CATEGORY_META;
}

export const JHARKHAND_DISTRICTS = [
  'All Districts',
  'Ranchi',
  'Dhanbad',
  'Hazaribagh',
  'West Singhbhum',
  'East Singhbhum',
  'Palamu',
  'Khunti',
  'Gumla',
  'Simdega',
  'Bokaro',
  'Deoghar',
  'Dumka',
  'Giridih',
  'Latehar',
  'Ramgarh',
  'Jamtara',
  'Godda',
  'Sahibganj',
  'Pakur',
  'Koderma',
  'Chatra',
  'Garhwa',
  'Lohardaga',
  'Saraikela Kharsawan',
] as const;
/**
 * CHALLENGES_DATA is now loaded dynamically from the PostgreSQL database via GET /api/challenges.
 * Retained as an empty array for static typing compatibility with legacy imports.
 */
export const CHALLENGES_DATA: ChallengeItem[] = [];
