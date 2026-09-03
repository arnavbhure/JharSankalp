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
import { RelatedEntities } from '../components/project-detail/RelatedEntities';
import { ExpressInterestDialog } from '../components/project-detail/ExpressInterestDialog';
import { ExpressInterestFormData } from '../types/projectDetail';
import { ArrowLeft, SearchX, RotateCcw } from 'lucide-react';
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
      <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center text-center p-6 space-y-3">
        <div className="h-10 w-10 border-3 border-[#4C1E4F] border-t-transparent rounded-full animate-spin" />
        <span className="text-[14px] font-mono text-[#6B5845]">
          Loading project execution dossier...
        </span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <SearchX className="h-12 w-12 text-[#6B5845] opacity-40" />
        <h2 className="text-[1.8rem] font-bold text-[#1D2522]">Project Not Found</h2>
        <p className="text-[#6B5845] max-w-md">
          The requested project dossier could not be located. It may have been archived or moved.
        </p>
        <button
          type="button"
          onClick={() => navigate('/projects')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4C1E4F] text-white text-[13px] font-bold cursor-pointer shadow-xs"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Return to Projects Portfolio</span>
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
            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#6B5845] hover:text-[#4C1E4F] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects Portfolio</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1] text-[#6B5845]">
              STAGE: {project.stageLabel}
            </span>
            <span className="text-[11.5px] font-mono text-[#6B5845]">
              DOSSIER: <strong>{project.projectCode}</strong>
            </span>
          </div>
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
        {/* Section 1: Lifecycle Progress (8 Stages) */}
        <ProjectLifecycle project={project} />

        {/* Section 2: Origin Lineage Pipeline (Challenge → Idea → Project) */}
        <ProjectLineage project={project} />

        {/* Section 3: Problem, Approach & Expected Outcome */}
        <ProjectMission project={project} />

        {/* Section 4: Milestones Roadmap */}
        <ProjectRoadmap project={project} />

        {/* Sections 5 & 6: Partners Ecosystem & Project Team */}
        <ProjectTeam project={project} />

        {/* Field Implementation & Active Workstreams */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            <CurrentWorkstreams project={project} />
          </div>
          <div className="lg:col-span-6">
            <FieldImplementation project={project} />
          </div>
        </div>

        {/* Deliverables Output Table */}
        <ProjectDeliverables project={project} />

        {/* Section 7: Project Activity Timeline (Field Updates) */}
        <ProjectActivityTimeline project={project} />

        {/* Section 8: Evidence & Open Documentation (Categorized) */}
        <ProjectDocumentation project={project} />

        {/* Collaboration Opportunities */}
        <CollaborationNeeds project={project} />

        {/* Section 9: Impact Tracking & Outcome Auditing */}
        <ProjectImpact project={project} />

        {/* Section 10: Related Entities (Challenge, Idea, Same Domain Projects) */}
        <RelatedEntities project={project} />
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
