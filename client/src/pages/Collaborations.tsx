import { useState, useMemo, useEffect } from 'react';
import { CollaborationsHero } from '../components/collaborations/CollaborationsHero';
import { FeaturedCollaboration } from '../components/collaborations/FeaturedCollaboration';
import { CollaborationFilters } from '../components/collaborations/CollaborationFilters';
import { CollaborationCard } from '../components/collaborations/CollaborationCard';
import { ActivityTimeline } from '../components/collaborations/ActivityTimeline';
import { HowCollaborationWorks } from '../components/collaborations/HowCollaborationWorks';
import { CollaborationsCTA } from '../components/collaborations/CollaborationsCTA';
import { StartProjectModal } from '../components/collaborations/StartProjectModal';
import { Footer } from '../components/layout/Footer';
import { COLLABORATION_ACTIVITIES } from '../data/collaborationsData';
import { CollaborationProject, ActivityItem } from '../types/collaborations';
import { fetchCollaborations } from '../services/api/collaborations';
import { CheckCircle2, Bookmark, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

export function Collaborations() {
  const [projects, setProjects] = useState<CollaborationProject[]>([]);
  const [activities] = useState<ActivityItem[]>(COLLABORATION_ACTIVITIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [search, setSearch] = useState('');
  const [focusArea, setFocusArea] = useState('All Focus Areas');
  const [district, setDistrict] = useState('All Districts');
  const [stage, setStage] = useState('All Stages');
  const [skill, setSkill] = useState('All Skills');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCollaborations({
        domain: focusArea,
        district,
        stage,
      });
      setProjects(data || []);
    } catch (err: any) {
      setError(err?.message || 'Unable to connect to JharSankalp database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [focusArea, district, stage]);

  const featuredProject = useMemo(() => projects[0] || null, [projects]);

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
          p.skillsNeeded.some((s) => s.toLowerCase().includes(q)),
      );
    }

    if (skill !== 'All Skills') {
      list = list.filter((p) =>
        p.skillsNeeded.some((s) => s.toLowerCase().includes(skill.toLowerCase())),
      );
    }

    return list;
  }, [projects, search, skill]);

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

  const handleModalSubmit = (
    newProjectData: Omit<CollaborationProject, 'id' | 'teamCount' | 'progress' | 'stage'>,
  ) => {
    const createdProject: CollaborationProject = {
      ...newProjectData,
      id: `PROJ-${Date.now()}`,
      stage: 'Exploring',
      teamCount: 1,
      progress: 5,
      isJoined: true,
      leadOrg: newProjectData.leadOrg || 'Your Innovation Team',
      avatars: ['ME'],
    };

    setProjects((prev) => [createdProject, ...prev]);

    setToastMessage(`Project "${newProjectData.title}" formed! Team workspace initialized.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const scrollToDirectory = () => {
    const el = document.getElementById('collaborations-directory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col justify-between relative">
      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#123B2A] text-white shadow-xl border border-[#1E5A3A] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-[#F5A623] shrink-0" />
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      <div>
        {/* ── Page Hero ── */}
        <CollaborationsHero
          onExploreClick={scrollToDirectory}
          onStartProjectClick={() => setModalOpen(true)}
        />

        {/* ── Main Content Area ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
          {/* ── Featured Collaboration Section ── */}
          {!hasActiveFilters && featuredProject && (
            <FeaturedCollaboration project={featuredProject} />
          )}

          {/* ── Filters & Search Controls ── */}
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
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
          />

          {/* ── Loading State ── */}
          {loading && (
            <div className="py-20 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
              <Loader2 className="h-8 w-8 text-[#123B2A] animate-spin mx-auto" />
              <p className="text-[13.5px] font-mono text-[#6B5845]">
                Retrieving active collaborative projects from JharSankalp database...
              </p>
            </div>
          )}

          {/* ── Error State with Retry ── */}
          {!loading && error && (
            <div className="py-16 text-center rounded-3xl bg-[#FFF5F5] border border-[#FECDD3] p-8 space-y-3">
              <AlertCircle className="h-8 w-8 text-[#BE123C] mx-auto" />
              <h4 className="text-[1.1rem] font-bold text-[#BE123C]">
                Unable to load collaborative projects
              </h4>
              <p className="text-[13px] text-[#6B5845] max-w-md mx-auto">{error}</p>
              <button
                type="button"
                onClick={loadProjects}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#BE123C] text-white text-[12.5px] font-bold cursor-pointer hover:bg-[#9F1239]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* ── Projects Grid ── */}
          {!loading && !error && (
            <div className="space-y-4">
              {filteredProjects.length === 0 ? (
                <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
                  <Bookmark className="h-8 w-8 text-[#6B5845] mx-auto opacity-50" />
                  <h4 className="text-[1.15rem] font-bold text-[#1D2522]">
                    No collaborative projects match your filter criteria
                  </h4>
                  <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
                    Try adjusting your focus area or needed skills filters to discover active
                    sprints.
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
                    <CollaborationCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Live Activity Timeline ── */}
          <ActivityTimeline activities={activities} />

          {/* ── How Collaboration Works Pipeline ── */}
          <HowCollaborationWorks />

          {/* ── Bottom Call To Action ── */}
          <CollaborationsCTA
            onFindClick={scrollToDirectory}
            onStartClick={() => setModalOpen(true)}
          />
        </div>
      </div>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Start Project Modal ── */}
      <StartProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreateProject={handleModalSubmit}
      />
    </div>
  );
}
