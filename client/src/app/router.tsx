import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { Login } from '../pages/Login';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { Landing } from '../pages/Landing';
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
import { GovernmentLayout } from '../layouts/GovernmentLayout';
import { GovernmentDashboard } from '../pages/government/GovernmentDashboard';
import { UniversityLayout } from '../layouts/UniversityLayout';
import { UniversityDashboard } from '../pages/university/UniversityDashboard';
import { IndustryLayout } from '../layouts/IndustryLayout';
import { IndustryDashboard } from '../pages/industry/IndustryDashboard';
import { NotFound } from '../pages/NotFound';

const GOV_ROLES = ['GOVERNMENT', 'GOVERNMENT_OFFICER', 'DISTRICT_OFFICER', 'STATE_ADMIN', 'SUPER_ADMIN', 'ADMIN'];
const UNI_ROLES = ['UNIVERSITY', 'UNIVERSITY_ADMIN', 'FACULTY', 'STUDENT'];
const IND_ROLES = ['INDUSTRY', 'STARTUP', 'MSME', 'CSR'];

/**
 * Application router.
 * Separated into:
 * 1. Public Platform (AppShell with top navbar, outlet, footer)
 * 2. Authenticated Citizen Innovator Workspace (Protected)
 * 3. Role-Protected Government, University, and Industry Portals
 */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute portalName="Innovator Workspace">
        <DashboardLayout />
      </ProtectedRoute>
    ),
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
    path: '/government',
    element: (
      <ProtectedRoute allowedRoles={GOV_ROLES} portalName="Government Portal">
        <GovernmentLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <GovernmentDashboard /> },
      { path: 'dashboard', element: <GovernmentDashboard /> },
    ],
  },
  {
    path: '/university',
    element: (
      <ProtectedRoute allowedRoles={UNI_ROLES} portalName="University Portal">
        <UniversityLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <UniversityDashboard /> },
      { path: 'dashboard', element: <UniversityDashboard /> },
    ],
  },
  {
    path: '/industry',
    element: (
      <ProtectedRoute allowedRoles={IND_ROLES} portalName="Industry Portal">
        <IndustryLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <IndustryDashboard /> },
      { path: 'dashboard', element: <IndustryDashboard /> },
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
      {
        path: 'challenges/:challengeId/submit-idea',
        element: (
          <ProtectedRoute portalName="Idea Submission">
            <SubmitChallengeIdea />
          </ProtectedRoute>
        ),
      },
      { path: 'ideas', element: <Ideas /> },
      { path: 'ideas/:ideaId', element: <IdeaDetail /> },
      { path: 'solutions', element: <Solutions /> },
      { path: 'collaborations', element: <Collaborations /> },
      { path: 'collaborators', element: <Collaborations /> },
      { path: 'impact', element: <Impact /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:projectId', element: <ProjectDetail /> },
      {
        path: 'workspace/projects/:projectId',
        element: (
          <ProtectedRoute portalName="Project Workspace">
            <ProjectWorkspace />
          </ProtectedRoute>
        ),
      },
      {
        path: 'workspace/projects/:projectId/:tab',
        element: (
          <ProtectedRoute portalName="Project Workspace">
            <ProjectWorkspace />
          </ProtectedRoute>
        ),
      },
      {
        path: 'report-challenge',
        element: (
          <ProtectedRoute portalName="Challenge Reporting">
            <ReportChallenge />
          </ProtectedRoute>
        ),
      },
      {
        path: 'report',
        element: (
          <ProtectedRoute portalName="Challenge Reporting">
            <ReportChallenge />
          </ProtectedRoute>
        ),
      },
      {
        path: 'submit-idea',
        element: (
          <ProtectedRoute portalName="Idea Submission">
            <SubmitIdea />
          </ProtectedRoute>
        ),
      },
      {
        path: 'my-challenges',
        element: (
          <ProtectedRoute portalName="My Challenges">
            <MyChallenges />
          </ProtectedRoute>
        ),
      },
      {
        path: 'my-ideas',
        element: (
          <ProtectedRoute portalName="My Ideas">
            <MyIdeas />
          </ProtectedRoute>
        ),
      },

      // ── Catch-all ─────────────────────────────────────
      { path: '*', element: <NotFound /> },
    ],
  },
]);
