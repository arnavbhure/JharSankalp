import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  UserChallenge,
  ActivityItem,
  CitizenNotification,
  DashboardStats,
} from '../types/citizenDashboard';
import {
  getUserChallenges,
  getDashboardStats,
  getRecentActivity,
  getNotifications,
  submitReviewerResponse,
} from '../services/citizenDashboardApi';
import { CitizenDashboardHeader } from '../components/dashboard/CitizenDashboardHeader';
import { ContributionOverview } from '../components/dashboard/ContributionOverview';
import { ActionRequiredPanel } from '../components/dashboard/ActionRequiredPanel';
import { MyChallengeList } from '../components/dashboard/MyChallengeList';
import { RecentActivityTimeline } from '../components/dashboard/RecentActivityTimeline';
import { NotificationPreview } from '../components/dashboard/NotificationPreview';
import { ChallengeStatusGuide } from '../components/dashboard/ChallengeStatusGuide';
import { AdditionalInfoModal } from '../components/dashboard/AdditionalInfoModal';
import { Footer } from '../components/layout/Footer';

export function MyChallenges() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<UserChallenge[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalSubmitted: 3,
    underReview: 1,
    inCollaboration: 2,
    actionRequired: 1,
  });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [notifications, setNotifications] = useState<CitizenNotification[]>([]);
  const [activeModalChallenge, setActiveModalChallenge] = useState<UserChallenge | null>(null);

  const loadData = async () => {
    try {
      const [chData, statsData, actData, notifData] = await Promise.all([
        getUserChallenges(),
        getDashboardStats(),
        getRecentActivity(),
        getNotifications(),
      ]);
      setChallenges(chData);
      setStats(statsData);
      setActivities(actData);
      setNotifications(notifData);
    } catch (err) {
      console.error('Failed loading citizen dashboard data', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenResponseModal = (challenge: UserChallenge) => {
    setActiveModalChallenge(challenge);
  };

  const handleSubmitResponse = async (challengeId: string, responseText: string) => {
    await submitReviewerResponse(challengeId, responseText);
    await loadData();
  };

  const displayName = user?.name ? user.name.split(' ')[0] : 'Arnav';

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col">
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
        {/* ── Dashboard Top Header ── */}
        <CitizenDashboardHeader userName={displayName} />

        {/* ── Horizontal Editorial Overview ── */}
        <ContributionOverview stats={stats} />

        {/* ── High-Priority Action Needed Callout ── */}
        <ActionRequiredPanel
          challenges={challenges}
          onOpenResponseModal={handleOpenResponseModal}
        />

        {/* ── Main Content Grid: Challenges + Sidebar Activity ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Challenges Feed (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            <MyChallengeList
              challenges={challenges}
              onOpenResponseModal={handleOpenResponseModal}
            />
          </div>

          {/* Right Column: Notifications & Recent Activity (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <NotificationPreview notifications={notifications} />
            <RecentActivityTimeline activities={activities} />
          </div>
        </div>

        {/* ── Full Width: How Challenge Progress Works Guide ── */}
        <div className="pt-6">
          <ChallengeStatusGuide />
        </div>
      </main>

      {/* ── Interactive Additional Info Dialog ── */}
      {activeModalChallenge && (
        <AdditionalInfoModal
          challenge={activeModalChallenge}
          isOpen={Boolean(activeModalChallenge)}
          onClose={() => setActiveModalChallenge(null)}
          onSubmitResponse={handleSubmitResponse}
        />
      )}

      {/* ── Institutional Footer ── */}
      <Footer />
    </div>
  );
}
