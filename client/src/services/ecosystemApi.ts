import {
  CANONICAL_CHALLENGES,
  CANONICAL_IDEAS,
  CANONICAL_PROJECTS,
  UnifiedChallenge,
  UnifiedIdea,
  UnifiedProject,
} from '../data/ecosystem';

export interface EcosystemSearchResult {
  id: string;
  type: 'CHALLENGE' | 'IDEA' | 'PROJECT';
  title: string;
  domain: string;
  district: string;
  url: string;
  subtitle: string;
}

export function getChallengeById(id?: string): UnifiedChallenge | undefined {
  if (!id) return undefined;
  return CANONICAL_CHALLENGES.find(
    (c) => c.id.toLowerCase() === id.toLowerCase() || c.challengeCode.toLowerCase() === id.toLowerCase()
  );
}

export function getIdeaById(id?: string): UnifiedIdea | undefined {
  if (!id) return undefined;
  return CANONICAL_IDEAS.find(
    (i) => i.id.toLowerCase() === id.toLowerCase() || i.referenceId?.toLowerCase() === id.toLowerCase()
  );
}

export function getProjectById(id?: string): UnifiedProject | undefined {
  if (!id) return undefined;
  return CANONICAL_PROJECTS.find(
    (p) => p.id.toLowerCase() === id.toLowerCase() || p.projectCode.toLowerCase() === id.toLowerCase()
  );
}

export function getIdeasForChallenge(challengeId: string): UnifiedIdea[] {
  return CANONICAL_IDEAS.filter((i) => i.challengeId.toLowerCase() === challengeId.toLowerCase());
}

export function getProjectsForChallenge(challengeId: string): UnifiedProject[] {
  return CANONICAL_PROJECTS.filter((p) => p.challengeId.toLowerCase() === challengeId.toLowerCase());
}

export function getProjectsForIdea(ideaId: string): UnifiedProject[] {
  return CANONICAL_PROJECTS.filter((p) => p.ideaId?.toLowerCase() === ideaId.toLowerCase());
}

export function searchEcosystem(query: string): EcosystemSearchResult[] {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();

  const results: EcosystemSearchResult[] = [];

  // Search Challenges
  for (const c of CANONICAL_CHALLENGES) {
    if (
      c.title.toLowerCase().includes(q) ||
      c.domain.toLowerCase().includes(q) ||
      c.district.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    ) {
      results.push({
        id: c.id,
        type: 'CHALLENGE',
        title: c.title,
        domain: c.domain,
        district: c.district,
        url: `/challenges/${c.id}`,
        subtitle: `${c.id} · ${c.district} · ${c.status}`,
      });
    }
  }

  // Search Ideas
  for (const i of CANONICAL_IDEAS) {
    if (
      i.title.toLowerCase().includes(q) ||
      i.domain.toLowerCase().includes(q) ||
      i.district.toLowerCase().includes(q) ||
      i.id.toLowerCase().includes(q)
    ) {
      results.push({
        id: i.id,
        type: 'IDEA',
        title: i.title,
        domain: i.domain,
        district: i.district,
        url: `/ideas/${i.id}`,
        subtitle: `${i.id} · ${i.domain} · ${i.stageLabel}`,
      });
    }
  }

  // Search Projects
  for (const p of CANONICAL_PROJECTS) {
    if (
      p.title.toLowerCase().includes(q) ||
      p.domain.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    ) {
      results.push({
        id: p.id,
        type: 'PROJECT',
        title: p.title,
        domain: p.domain,
        district: p.district,
        url: `/projects/${p.id}`,
        subtitle: `${p.projectCode} · ${p.district} · ${p.stageLabel}`,
      });
    }
  }

  return results.slice(0, 8);
}

export const ecosystemApi = {
  getChallengeById,
  getIdeaById,
  getProjectById,
  getIdeasForChallenge,
  getProjectsForChallenge,
  getProjectsForIdea,
  searchEcosystem,
};
