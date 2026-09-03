import { CommunityIdea } from '../types/ideas';

/**
 * Community ideas are now loaded dynamically from the PostgreSQL database via GET /api/ideas.
 * Retained as empty exports for backwards typing compatibility.
 */
export const FEATURED_COMMUNITY_IDEA: CommunityIdea = {
  id: '',
  title: '',
  description: '',
  focusArea: 'Water Management',
  district: 'Khunti',
  author: '',
  supportersCount: 0,
  contributorsCount: 0,
  status: 'Community Supported',
  submittedDate: '',
};

export const INITIAL_COMMUNITY_IDEAS: CommunityIdea[] = [];
