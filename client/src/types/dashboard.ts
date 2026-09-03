export type DashboardRole = 'citizen' | 'institution' | 'expert' | 'admin';

export interface ContributionDataPoint {
  month: string;
  value: number;
}

export interface ImpactOverviewData {
  title: string;
  mainCount: number;
  mainLabel: string;
  growth: string;
  chartData: ContributionDataPoint[];
}

export interface DashboardMetricCard {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  icon: string;
  bgTint: string;
  borderTint: string;
  iconColor: string;
}

export interface ActiveChallengeItem {
  id: string;
  domain: string;
  title: string;
  location: string;
  contributorsCount: number;
  daysLeft: number;
  status: string;
  domainColor: string;
  iconType: string;
}

export interface FeaturedChallengeData {
  id: string;
  title: string;
  district: string;
  contributorsCount: number;
  ideasCount: number;
  targetDate: string;
  domain: string;
}

export interface DashboardActivityItem {
  id: string;
  title: string;
  target: string;
  timestamp: string;
  type: 'shortlist' | 'comment' | 'badge' | 'pilot' | 'evaluation';
}

export interface DashboardRoleData {
  role: DashboardRole;
  roleLabel: string;
  userName: string;
  greeting: string;
  subtitle: string;
  impact: ImpactOverviewData;
  metrics: DashboardMetricCard[];
  challengesTitle: string;
  challenges: ActiveChallengeItem[];
  featured: FeaturedChallengeData;
  activities: DashboardActivityItem[];
}
