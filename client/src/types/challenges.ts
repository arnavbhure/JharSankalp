export type ChallengeCategory =
  | 'Water Management'
  | 'Agriculture'
  | 'Mining Safety'
  | 'Education'
  | 'Healthcare'
  | 'Environment'
  | 'Livelihoods'
  | 'Urban Development'
  | (string & {});

export type ChallengeStatusType =
  'Open for Collaboration' | 'In Discussion' | 'Solution in Development' | 'Implemented';

export type ImpactLevel = 'Critical' | 'High Impact' | 'Medium Impact';

export interface ChallengeMetric {
  label: string;
  value: string;
}

export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  district: string;
  block: string;
  locationDisplay: string;
  status: ChallengeStatusType;
  impactLevel: ImpactLevel;
  collaboratorsCount: number;
  ideasCount: number;
  metrics?: ChallengeMetric[];
  coordinates: { x: number; y: number }; // percentage on Jharkhand geodetic map
  dateReported: string;
  featured?: boolean;
}

export interface ChallengeFiltersState {
  search: string;
  focusArea: string;
  district: string;
  status: string;
  impactLevel: string;
  viewMode: 'grid' | 'map';
}
