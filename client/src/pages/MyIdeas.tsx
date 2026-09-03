import { useState, useEffect, useRef } from 'react';
import {
  MyIdeaItem,
  ContributorRequest,
  IdeaActivityItem,
  ProjectReadinessCriteria,
  ContributorOverviewStats,
} from '../types/myIdeas';
import {
  getMyIdeas,
  getContributorStats,
  getContributionRequests,
  respondToContributionRequest,
  respondToActionRequired,
  getIdeaActivities,
  getIdeaUpdates,
  getProjectReadiness,
} from '../services/myIdeasApi';
import { MyIdeasHeader } from '../components/my-ideas/MyIdeasHeader';
import { IdeaContributionOverview } from '../components/my-ideas/IdeaContributionOverview';
import { IdeaMomentumPanel } from '../components/my-ideas/IdeaMomentumPanel';
import { IdeaActionRequiredPanel } from '../components/my-ideas/IdeaActionRequiredPanel';
import { MyIdeasList } from '../components/my-ideas/MyIdeasList';
import { IdeaCollaborationRequests } from '../components/my-ideas/IdeaCollaborationRequests';
import { ProjectFormationReadiness } from '../components/my-ideas/ProjectFormationReadiness';
import { IdeaActivityTimeline } from '../components/my-ideas/IdeaActivityTimeline';
import { IdeaUpdatesPanel } from '../components/my-ideas/IdeaUpdatesPanel';
import { IdeaStatusGuide } from '../components/my-ideas/IdeaStatusGuide';
import { MyIdeasEmptyState } from '../components/my-ideas/MyIdeasEmptyState';
import { Footer } from '../components/layout/Footer';

export function MyIdeas() {
  const [ideas, setIdeas] = useState<MyIdeaItem[]>([]);
  const [stats, setStats] = useState<ContributorOverviewStats>({
    ideasSubmitted: 4,
    underReview: 1,
    openForCollaboration: 2,
    movingTowardProjectFormation: 1,
  });
  const [requests, setRequests] = useState<ContributorRequest[]>([]);
  const [activities, setActivities] = useState<IdeaActivityItem[]>([]);
  const [updates, setUpdates] = useState<
    Array<{ id: string; text: string; time: string; link?: string }>
  >([]);
  const [readinessCriteria, setReadinessCriteria] = useState<ProjectReadinessCriteria[]>([]);
  const [currentTab, setCurrentTab] = useState('All');
  const [loading, setLoading] = useState(true);

  const requestsRef = useRef<HTMLDivElement>(null);

  const loadDashboard = async () => {
    try {
      const [ideasData, statsData, requestsData, activitiesData, updatesData, readinessData] =
        await Promise.all([
          getMyIdeas(currentTab),
          getContributorStats(),
          getContributionRequests(),
          getIdeaActivities(),
          getIdeaUpdates(),
          getProjectReadiness('IDEA-2026-0001'),
        ]);

      setIdeas(ideasData);
      setStats(statsData);
      setRequests(requestsData);
      setActivities(activitiesData);
      setUpdates(updatesData);
      setReadinessCriteria(readinessData);
    } catch (err) {
      console.error('Failed to load contributor dashboard', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, [currentTab]);

  const handleRespondToRequest = async (requestId: string, action: 'ACCEPTED' | 'DECLINED') => {
    await respondToContributionRequest(requestId, action);
    await loadDashboard();
  };

  const handleRespondActionRequired = async (reply: string) => {
    const targetIdea = ideas.find((i) => i.hasActionRequired);
    if (targetIdea) {
      await respondToActionRequired(targetIdea.id, reply);
      await loadDashboard();
    }
  };

  const scrollToRequests = () => {
    if (requestsRef.current) {
      requestsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Find most active idea (momentum)
  const momentumIdea = ideas.find((i) => i.id === 'IDEA-2026-0001') || ideas[0];

  const actionRequiredIdea = ideas.find((i) => i.hasActionRequired);

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col">
      {/* ── Page Hero Header ── */}
      <MyIdeasHeader />

      {/* ── Horizontal Statistics Strip ── */}
      <IdeaContributionOverview stats={stats} />

      {/* ── Main Workspace Body ── */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        {loading ? (
          <div className="py-20 text-center text-[14px] text-[#6B5845]">
            Loading your innovation workspace...
          </div>
        ) : ideas.length === 0 ? (
          <MyIdeasEmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* ── Left Management Stream (8 Columns) ── */}
            <div className="lg:col-span-8 space-y-12">
              {/* Featured Idea Momentum Panel */}
              {momentumIdea && (
                <IdeaMomentumPanel idea={momentumIdea} onViewCollaboration={scrollToRequests} />
              )}

              {/* Action Required Banner */}
              <IdeaActionRequiredPanel
                hasAction={Boolean(actionRequiredIdea)}
                actionMessage={actionRequiredIdea?.actionMessage}
                relatedIdeaTitle={actionRequiredIdea?.title}
                relatedIdeaId={actionRequiredIdea?.id}
                onRespond={handleRespondActionRequired}
              />

              {/* All Your Ideas List */}
              <MyIdeasList ideas={ideas} currentTab={currentTab} onTabChange={setCurrentTab} />

              {/* Incoming Collaboration Requests Triage */}
              <div ref={requestsRef}>
                <IdeaCollaborationRequests requests={requests} onRespond={handleRespondToRequest} />
              </div>

              {/* Project Formation Signal */}
              {momentumIdea && (
                <ProjectFormationReadiness
                  criteria={readinessCriteria}
                  ideaTitle={momentumIdea.title}
                />
              )}
            </div>

            {/* ── Right Context Sidebar (4 Columns) ── */}
            <div className="lg:col-span-4 space-y-6">
              {/* Updates For You Panel */}
              <IdeaUpdatesPanel updates={updates} />

              {/* Chronological Activity Timeline */}
              <IdeaActivityTimeline activities={activities} />

              {/* 6-Stage Lifecycle Status Guide */}
              <IdeaStatusGuide />
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
