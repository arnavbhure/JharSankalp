import { useState, useMemo } from 'react';
import { CollaborationsHero } from '../components/collaborations/CollaborationsHero';
import { FeaturedCollaboration } from '../components/collaborations/FeaturedCollaboration';
import { CollaborationFilters } from '../components/collaborations/CollaborationFilters';
import { CollaborationCard } from '../components/collaborations/CollaborationCard';
import { ActivityTimeline } from '../components/collaborations/ActivityTimeline';
import { HowCollaborationWorks } from '../components/collaborations/HowCollaborationWorks';
import { CollaborationsCTA } from '../components/collaborations/CollaborationsCTA';
import { StartProjectModal } from '../components/collaborations/StartProjectModal';
import { Footer } from '../components/layout/Footer';
import {
  FEATURED_COLLABORATION,
  INITIAL_COLLABORATION_PROJECTS,
  COLLABORATION_ACTIVITIES,
} from '../data/collaborationsData';
import { CollaborationProject, ActivityItem } from '../types/collaborations';
import { CheckCircle2, Bookmark } from 'lucide-react';

export function Collaborations() {
  const [projects, setProjects] = useState<CollaborationProject[]>(
    INITIAL_COLLABORATION_PROJECTS
  );
  const [featuredProject, setFeaturedProject] = useState<CollaborationProject>(
    FEATURED_COLLABORATION
  );
  const [activities, setActivities] = useState<ActivityItem[]>(
    COLLABORATION_ACTIVITIES
  );

  // Filters State
  const [search, setSearch] = useState('');
  const [focusArea, setFocusArea] = useState('All Focus Areas');
  const [district, setDistrict] = useState('All Districts');
  const [stage, setStage] = useState('All Stages');
  const [skill, setSkill] = useState('All Skills');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter Logic
  const filteredProjects = useMemo(() => {
    let list = [...projects];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q) ||
          p.focusArea.toLowerCase().includes(q) ||
          p.skillsNeeded.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (focusArea !== 'All Focus Areas') {
      list = list.filter(
        (p) => p.focusArea.toLowerCase() === focusArea.toLowerCase()
      );
    }

    if (district !== 'All Districts') {
      list = list.filter(
        (p) => p.district.toLowerCase() === district.toLowerCase()
      );
    }

    if (stage !== 'All Stages') {
      list = list.filter(
        (p) => p.stage.toLowerCase() === stage.toLowerCase()
      );
    }

    if (skill !== 'All Skills') {
      list = list.filter((p) =>
        p.skillsNeeded.some((s) => s.toLowerCase() === skill.toLowerCase())
      );
    }

    return list;
  }, [projects, search, focusArea, district, stage, skill]);

  const hasActiveFilters =
    search.trim() !== '' ||
    focusArea !== 'All Focus Areas' ||
    district !== 'All Districts' ||
    stage !== 'All Stages' ||
    skill !== 'All Skills';

  const handleClearFilters = () => {
    setSearch('');
    setFocusArea('All Focus Areas');
    setDistrict('All Districts');
    setStage('All Stages');
    setSkill('All Skills');
  };

  const handleJoinToggle = (id: string, isJoined: boolean) => {
    if (featuredProject.id === id) {
      setFeaturedProject((prev) => ({
        ...prev,
        isJoined,
        teamCount: isJoined ? prev.teamCount + 1 : prev.teamCount - 1,
      }));
    } else {
      setProjects((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isJoined,
              teamCount: isJoined ? item.teamCount + 1 : item.teamCount - 1,
            };
          }
          return item;
        })
      );
    }

    if (isJoined) {
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          actor: 'You',
          action: 'joined the collaboration sprint',
          project:
            id === featuredProject.id
              ? featuredProject.title
              : projects.find((p) => p.id === id)?.title || 'Project',
          time: 'Just now',
          type: 'member',
        },
        ...prev,
      ]);
    }

    setToastMessage(
      isJoined
        ? 'Welcome to the project! You are now connected to the collaboration sprint.'
        : 'You have left the project collaboration.'
    );
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateProject = (
    newProj: Omit<CollaborationProject, 'id' | 'teamCount' | 'progress' | 'stage'>
  ) => {
    const id = `PROJ-NEW-${Date.now().toString().slice(-4)}`;
    const created: CollaborationProject = {
      ...newProj,
      id,
      teamCount: 1,
      progress: 10,
      stage: 'Exploring',
      isJoined: true,
    };

    setProjects((prev) => [created, ...prev]);

    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        actor: newProj.leadOrg || 'You',
        action: 'initiated new collaboration workspace',
        project: newProj.title,
        time: 'Just now',
        type: 'milestone',
      },
      ...prev,
    ]);

    setToastMessage(
      `Project "${newProj.title}" created successfully! Contributors can now join.`
    );
    setTimeout(() => setToastMessage(null), 3500);
  };

  const scrollToDirectory = () => {
    const el = document.getElementById('project-directory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col justify-between relative">
      {/* ── Floating Notification Toast ── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#123B2A] text-white shadow-xl border border-[#1E5A3A] text-[13px] font-medium">
            <CheckCircle2 className="h-4 w-4 text-[#F5A623] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <div>
        {/* ── 1. Page Hero ── */}
        <CollaborationsHero
          onStartProjectClick={() => setModalOpen(true)}
          onExploreClick={scrollToDirectory}
        />

        {/* ── Main Content Area ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
          {/* ── 2. Featured Collaboration ── */}
          {!hasActiveFilters && (
            <FeaturedCollaboration
              project={featuredProject}
              onJoinToggle={handleJoinToggle}
            />
          )}

          {/* ── 3. Collaboration Discovery Controls ── */}
          <CollaborationFilters
            search={search}
            onSearchChange={setSearch}
            focusArea={focusArea}
            onFocusAreaChange={setFocusArea}
            district={district}
            onDistrictChange={setDistrict}
            stage={stage}
            onStageChange={setStage}
            skill={skill}
            onSkillChange={setSkill}
            totalCount={filteredProjects.length}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* ── 4. Active Projects Grid ── */}
          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
                <Bookmark className="h-8 w-8 text-[#6B5845] mx-auto opacity-50" />
                <h4 className="text-[1.15rem] font-bold text-[#1D2522]">
                  No projects match your filter criteria
                </h4>
                <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
                  Try adjusting your search terms or clearing the selected district, stage, or skill filters.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-4 py-2 rounded-xl bg-[#123B2A] text-white text-[12px] font-bold cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((project) => (
                  <CollaborationCard
                    key={project.id}
                    project={project}
                    onJoinToggle={handleJoinToggle}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── 5. Collaboration Activity Feed ── */}
          <ActivityTimeline activities={activities} />

          {/* ── 6. How Collaboration Works (Horizontal Lifecycle) ── */}
          <HowCollaborationWorks />

          {/* ── 7. Join / Create CTA ── */}
          <CollaborationsCTA
            onFindClick={scrollToDirectory}
            onStartClick={() => setModalOpen(true)}
          />
        </div>
      </div>

      {/* ── 8. Footer ── */}
      <Footer />

      {/* ── 9. Start Project Modal ── */}
      <StartProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
}
