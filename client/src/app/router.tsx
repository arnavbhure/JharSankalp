import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { NotFound } from '../pages/NotFound';

/**
 * Application router.
 * Phase 1: Landing, Login, 404 with role-aware AppShell.
 * Each subsequent phase will add feature routes.
 */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <AppShell />,
    children: [
      // ── Public / Citizen ──────────────────────────────
      { index: true, element: <Landing /> },
      // Phase 3: { path: 'report', element: <ReportChallenge /> },
      // Phase 3: { path: 'my-challenges', element: <MyChallenges /> },
      // Phase 3: { path: 'my-challenges/:id', element: <ChallengeDetail /> },
      // Phase 3: { path: 'challenges', element: <ChallengeList /> },
      // Phase 3: { path: 'challenges/:id', element: <ChallengeDetail /> },

      // ── Ecosystem ─────────────────────────────────────
      // Phase 6: { path: 'discover', element: <Discover /> },
      // Phase 7: { path: 'consortiums/:id', element: <ConsortiumDetail /> },
      // Phase 8: { path: 'projects/:id', element: <ProjectDetail /> },
      // Phase 10: { path: 'missions', element: <MissionList /> },
      // Phase 10: { path: 'missions/:id', element: <MissionDetail /> },

      // ── Government ────────────────────────────────────
      // Phase 10: { path: 'government', element: <GovDashboard /> },
      // Phase 10: { path: 'government/challenges', element: <GovChallenges /> },
      // Phase 10: { path: 'government/districts', element: <GovDistricts /> },
      // Phase 10: { path: 'government/missions', element: <GovMissions /> },
      // Phase 10: { path: 'government/projects', element: <GovProjects /> },
      // Phase 10: { path: 'government/impact', element: <GovImpact /> },
      // Phase 10: { path: 'government/insights', element: <GovInsights /> },

      // ── University ────────────────────────────────────
      // Phase 6: { path: 'university', element: <UniDashboard /> },
      // Phase 6: { path: 'university/challenges', element: <UniChallenges /> },
      // Phase 6: { path: 'university/capabilities', element: <UniCapabilities /> },
      // Phase 6: { path: 'university/teams', element: <UniTeams /> },
      // Phase 8: { path: 'university/projects', element: <UniProjects /> },

      // ── Industry ──────────────────────────────────────
      // Phase 6: { path: 'industry', element: <IndustryDashboard /> },
      // Phase 6: { path: 'industry/opportunities', element: <IndustryOpps /> },
      // Phase 6: { path: 'industry/capabilities', element: <IndustryCaps /> },
      // Phase 7: { path: 'industry/commitments', element: <IndustryCommitments /> },
      // Phase 7: { path: 'industry/partnerships', element: <IndustryPartnerships /> },

      // ── Catch-all ─────────────────────────────────────
      { path: '*', element: <NotFound /> },
    ],
  },
]);
