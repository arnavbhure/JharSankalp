import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WorkspaceData, WorkspaceTabId } from '../types/workspace';
import { getWorkspace } from '../services/workspaceApi';
import { ProjectContextHeader } from '../components/workspace/ProjectContextHeader';
import { WorkspaceSidebar } from '../components/workspace/WorkspaceSidebar';
import { WorkspaceOverviewTab } from '../components/workspace/tabs/WorkspaceOverviewTab';
import { RoadmapTab } from '../components/workspace/tabs/RoadmapTab';
import { WorkManagementTab } from '../components/workspace/tabs/WorkManagementTab';
import { TeamManagementTab } from '../components/workspace/tabs/TeamManagementTab';
import { DeliverablesTab } from '../components/workspace/tabs/DeliverablesTab';
import { DocumentsTab } from '../components/workspace/tabs/DocumentsTab';
import { ProjectUpdatesTab } from '../components/workspace/tabs/ProjectUpdatesTab';
import { ImpactWorkspaceTab } from '../components/workspace/tabs/ImpactWorkspaceTab';
import { Footer } from '../components/layout/Footer';

const VALID_TABS: WorkspaceTabId[] = [
  'overview',
  'roadmap',
  'work',
  'team',
  'deliverables',
  'documents',
  'updates',
  'impact',
];

export function ProjectWorkspace() {
  const { projectId, tab } = useParams<{ projectId: string; tab?: string }>();
  const navigate = useNavigate();

  const currentTab: WorkspaceTabId =
    tab && VALID_TABS.includes(tab as WorkspaceTabId)
      ? (tab as WorkspaceTabId)
      : 'overview';

  const [activeTab, setActiveTab] = useState<WorkspaceTabId>(currentTab);
  const [data, setData] = useState<WorkspaceData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadWorkspace = useCallback(() => {
    if (projectId) {
      getWorkspace(projectId)
        .then((res) => {
          setData(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [projectId]);

  useEffect(() => {
    loadWorkspace();
  }, [loadWorkspace]);

  useEffect(() => {
    if (tab && VALID_TABS.includes(tab as WorkspaceTabId)) {
      setActiveTab(tab as WorkspaceTabId);
    }
  }, [tab]);

  const handleTabChange = (newTab: WorkspaceTabId) => {
    setActiveTab(newTab);
    if (projectId) {
      if (newTab === 'overview') {
        navigate(`/workspace/projects/${projectId}`);
      } else {
        navigate(`/workspace/projects/${projectId}/${newTab}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center text-[14px] text-[#6B5845]">
        Initializing operational consortium workspace...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-[1.8rem] font-bold text-[#1D2522]">
          Workspace Not Available
        </h2>
        <p className="text-[#6B5845]">
          Could not locate operational data for project ID {projectId}.
        </p>
        <button
          onClick={() => navigate('/projects')}
          className="px-5 py-2.5 rounded-xl bg-[#123B2A] text-white text-[13px] font-bold cursor-pointer"
        >
          Return to Projects Portfolio
        </button>
      </div>
    );
  }

  const reviewDeliverablesCount = data.deliverables.filter(
    (d) => d.status === 'UNDER_REVIEW'
  ).length;

  const openIssuesCount = data.updates.filter(
    (u) => u.type === 'issue' && !u.resolved
  ).length;

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col">
      {/* ── 1. Compact Project Context Header ── */}
      <ProjectContextHeader context={data.context} />

      {/* ── 2. Workspace Body with Sidebar & Content ── */}
      <div className="flex-1 flex flex-col lg:flex-row w-full">
        {/* Workspace Sidebar (Desktop & Mobile Nav) */}
        <WorkspaceSidebar
          activeTab={activeTab}
          onSelectTab={handleTabChange}
          deliverablesReviewCount={reviewDeliverablesCount}
          openIssuesCount={openIssuesCount}
        />

        {/* Workspace Main Active View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-6xl w-full min-w-0">
          {activeTab === 'overview' && (
            <WorkspaceOverviewTab
              data={data}
              onNavigateTab={handleTabChange}
            />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapTab data={data} onRefresh={loadWorkspace} />
          )}

          {activeTab === 'work' && (
            <WorkManagementTab data={data} onRefresh={loadWorkspace} />
          )}

          {activeTab === 'team' && (
            <TeamManagementTab data={data} onRefresh={loadWorkspace} />
          )}

          {activeTab === 'deliverables' && (
            <DeliverablesTab data={data} onRefresh={loadWorkspace} />
          )}

          {activeTab === 'documents' && (
            <DocumentsTab data={data} onRefresh={loadWorkspace} />
          )}

          {activeTab === 'updates' && (
            <ProjectUpdatesTab data={data} onRefresh={loadWorkspace} />
          )}

          {activeTab === 'impact' && (
            <ImpactWorkspaceTab data={data} onRefresh={loadWorkspace} />
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
