import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { Landing } from '../pages/Landing';
import { Login } from '../pages/Login';
import { Challenges } from '../pages/Challenges';
import { ChallengeDetail } from '../pages/ChallengeDetail';
import { ReportChallenge } from '../pages/ReportChallenge';
import { MyChallenges } from '../pages/MyChallenges';
import { Ideas } from '../pages/Ideas';
import { IdeaDetail } from '../pages/IdeaDetail';
import { SubmitIdea } from '../pages/SubmitIdea';
import { MyIdeas } from '../pages/MyIdeas';
import { Projects } from '../pages/Projects';
import { ProjectDetail } from '../pages/ProjectDetail';
import { ProjectWorkspace } from '../pages/ProjectWorkspace';
import { Solutions } from '../pages/public/Solutions';
import { Collaborations } from '../pages/Collaborations';
import { Impact } from '../pages/public/Impact';
import { About } from '../pages/public/About';
import { SubmitChallengeIdea } from '../pages/SubmitChallengeIdea';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { DashboardOverview } from '../pages/dashboard/DashboardOverview';
import { DashboardChallenges } from '../pages/dashboard/DashboardChallenges';
import { DashboardIdeas } from '../pages/dashboard/DashboardIdeas';
import { DashboardIdeaDetail } from '../pages/dashboard/DashboardIdeaDetail';
import { DashboardProjects } from '../pages/dashboard/DashboardProjects';
import { DashboardSolutions } from '../pages/dashboard/DashboardSolutions';
import { DashboardCollaborations } from '../pages/dashboard/DashboardCollaborations';
import { DashboardNotifications } from '../pages/dashboard/DashboardNotifications';
import { DashboardImpact } from '../pages/dashboard/DashboardImpact';
import { DashboardSettings } from '../pages/dashboard/DashboardSettings';
import { NotFound } from '../pages/NotFound';

/**
 * Application router.
 * Separated into:
 * 1. Public Platform (AppShell with top navbar, outlet, footer)
 * 2. Authenticated Citizen Innovator Workspace (DashboardLayout with persistent sidebar, topbar, outlet)
 */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: 'challenges', element: <DashboardChallenges /> },
      { path: 'ideas', element: <DashboardIdeas /> },
      { path: 'ideas/:id', element: <DashboardIdeaDetail /> },
      { path: 'projects', element: <DashboardProjects /> },
      { path: 'solutions', element: <DashboardSolutions /> },
      { path: 'collaborations', element: <DashboardCollaborations /> },
      { path: 'notifications', element: <DashboardNotifications /> },
      { path: 'impact', element: <DashboardImpact /> },
      { path: 'settings', element: <DashboardSettings /> },
    ],
  },
  {
    path: '/',
    element: <AppShell />,
    children: [
      // ── Public Platform Routes ──────────────────────────────
      { index: true, element: <Landing /> },
      { path: 'challenges', element: <Challenges /> },
      { path: 'challenges/:challengeId', element: <ChallengeDetail /> },
      { path: 'challenges/:challengeId/submit-idea', element: <SubmitChallengeIdea /> },
      { path: 'ideas', element: <Ideas /> },
      { path: 'ideas/:ideaId', element: <IdeaDetail /> },
      { path: 'solutions', element: <Solutions /> },
      { path: 'collaborations', element: <Collaborations /> },
      { path: 'collaborators', element: <Collaborations /> },
      { path: 'impact', element: <Impact /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:projectId', element: <ProjectDetail /> },
      { path: 'workspace/projects/:projectId', element: <ProjectWorkspace /> },
      { path: 'workspace/projects/:projectId/:tab', element: <ProjectWorkspace /> },
      { path: 'report-challenge', element: <ReportChallenge /> },
      { path: 'report', element: <ReportChallenge /> },
      { path: 'submit-idea', element: <SubmitIdea /> },
      { path: 'my-challenges', element: <MyChallenges /> },
      { path: 'my-ideas', element: <MyIdeas /> },
      // Phase 3: { path: 'my-challenges/:id', element: <ChallengeDetail /> },

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
