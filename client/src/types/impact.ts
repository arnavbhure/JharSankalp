export interface DistrictImpact {
  id: string;
  name: string;
  projectsCount: number;
  peopleReached: number;
  activeDeployments: number;
  primaryDomain: string;
  highlight: string;
}

export interface DomainImpactItem {
  id: string;
  name: string;
  projectsCount: number;
  peopleReached: number;
  highlightMetric: string;
  description: string;
  color: string;
  bg: string;
}

export interface CommunityQuote {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
}

export interface ImpactFeedItem {
  id: string;
  dateText: string;
  title: string;
  district: string;
  domain: string;
  stage: string;
  type: 'deployment' | 'testing' | 'milestone' | 'expansion';
}
