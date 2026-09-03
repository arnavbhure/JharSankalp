import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProjectDetail as ProjectDetailType } from '../types/projectDetail';
import { getProjectDetail, expressInterest } from '../services/projectsApi';
import { ProjectDetailHeader } from '../components/project-detail/ProjectDetailHeader';
import { ProjectMetaStrip } from '../components/project-detail/ProjectMetaStrip';
import { ProjectSectionNav } from '../components/project-detail/ProjectSectionNav';
import { ProjectLifecycle } from '../components/project-detail/ProjectLifecycle';
import { ProjectLineage } from '../components/project-detail/ProjectLineage';
import { ProjectMission } from '../components/project-detail/ProjectMission';
import { ProjectTeam } from '../components/project-detail/ProjectTeam';
import { ProjectRoadmap } from '../components/project-detail/ProjectRoadmap';
import { CurrentWorkstreams } from '../components/project-detail/CurrentWorkstreams';
import { ProjectDeliverables } from '../components/project-detail/ProjectDeliverables';
import { FieldImplementation } from '../components/project-detail/FieldImplementation';
import { ProjectDocumentation } from '../components/project-detail/ProjectDocumentation';
import { CollaborationNeeds } from '../components/project-detail/CollaborationNeeds';
import { ProjectImpact } from '../components/project-detail/ProjectImpact';
import { ProjectActivityTimeline } from '../components/project-detail/ProjectActivityTimeline';
import { ExpressInterestDialog } from '../components/project-detail/ExpressInterestDialog';
import { ExpressInterestFormData } from '../types/projectDetail';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [generalJoinOpen, setGeneralJoinOpen] = useState(false);

  useEffect(() => {
    if (projectId) {
      setLoading(true);
      getProjectDetail(projectId)
        .then((data) => {
          setProject(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [projectId]);

  const handleGeneralSubmit = async (data: ExpressInterestFormData) => {
    if (project) {
      await expressInterest(project.id, data);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center text-[14px] text-[#6B5845]">
        Loading project execution dossier...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-[1.8rem] font-bold text-[#1D2522]">Project Not Found</h2>
        <p className="text-[#6B5845]">The requested project dossier could not be located.</p>
        <button
          onClick={() => navigate('/projects')}
          className="px-5 py-2.5 rounded-xl bg-[#123B2A] text-white text-[13px] font-bold cursor-pointer"
        >
          Return to Projects Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col">
      {/* ── Top Breadcrumb Bar ── */}
      <div className="border-b border-[#EEEAE1] bg-white py-3.5 text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#6B5845] hover:text-[#123B2A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects Portfolio</span>
          </button>

          <span className="text-[11.5px] font-mono text-[#6B5845]">
            DOSSIER: {project.projectCode}
          </span>
        </div>
      </div>

      {/* ── 1. Project Header Section ── */}
      <ProjectDetailHeader
        project={project}
        onJoinClick={() => setGeneralJoinOpen(true)}
      />

      {/* ── 2. Project Meta Strip ── */}
      <ProjectMetaStrip project={project} />

      {/* ── 3. Sticky Local Section Navigation ── */}
      <ProjectSectionNav />

      {/* ── Main Workspace Body Stream ── */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full space-y-12">
        {/* Section 1: Lifecycle Progress */}
        <ProjectLifecycle project={project} />

        {/* Section 2: Lineage Pipeline */}
        <ProjectLineage project={project} />

        {/* Section 3: Mission & Charter */}
        <ProjectMission project={project} />

        {/* Section 4: Team & Partners */}
        <ProjectTeam project={project} />

        {/* Section 5: Milestone Roadmap */}
        <ProjectRoadmap project={project} />

        {/* Section 6: Current Workstreams */}
        <CurrentWorkstreams project={project} />

        {/* Section 7: Formal Deliverables Output Table */}
        <ProjectDeliverables project={project} />

        {/* Section 8: Field Implementation */}
        <FieldImplementation project={project} />

        {/* Section 9: Project Documentation */}
        <ProjectDocumentation project={project} />

        {/* Section 10: Collaboration Needs */}
        <CollaborationNeeds project={project} />

        {/* Section 11: Impact & Outcome Measurement */}
        <ProjectImpact project={project} />

        {/* Section 12: Project Activity Timeline */}
        <ProjectActivityTimeline project={project} />
      </main>

      {/* ── Modal Dialog for Header Join Action ── */}
      {generalJoinOpen && (
        <ExpressInterestDialog
          project={project}
          onClose={() => setGeneralJoinOpen(false)}
          onSubmit={handleGeneralSubmit}
        />
      )}

      {/* ── Institutional Footer ── */}
      <Footer />
    </div>
  );
}
