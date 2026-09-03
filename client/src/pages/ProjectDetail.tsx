import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Project } from '../types/projects';
import { getProjectById } from '../services/projectsApi';
import { ProjectHealthIndicator } from '../components/projects/ProjectHealthIndicator';
import { ArrowLeft, MapPin, Building2, Target, Lightbulb, Users, Check, Sparkles, Radio } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      getProjectById(projectId).then((data) => {
        setProject(data);
        setLoading(false);
      });
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center text-[14px] text-[#6B5845]">
        Loading project case dossier...
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
          className="px-5 py-2.5 rounded-xl bg-[#123B2A] text-white text-[13px] font-bold"
        >
          Return to Projects Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col">
      {/* Top Breadcrumb Header */}
      <div className="border-b border-[#EEEAE1] bg-white py-4 text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#6B5845] hover:text-[#123B2A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects Portfolio</span>
          </button>

          <span className="text-[11.5px] font-mono text-[#6B5845]">
            DOSSIER: {project.projectCode}
          </span>
        </div>
      </div>

      {/* Project Hero */}
      <header className="border-b border-[#EEEAE1] bg-white py-10 text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider">
              <span className="text-[#123B2A] bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
                {project.domain}
              </span>
              <span className="text-[#6B5845]">·</span>
              <span className="text-[#6B5845] flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#BE123C]" />
                {project.location}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-lg bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
                <Radio className="h-3 w-3 animate-pulse text-[#15803D]" />
                {project.stageLabel}
              </span>
              <ProjectHealthIndicator health={project.health} label={project.healthLabel} />
            </div>
          </div>

          <h1 className="text-[2.2rem] sm:text-[3rem] font-extrabold text-[#1D2522] tracking-tight leading-tight font-sans">
            {project.title}
          </h1>

          <p className="text-[15px] sm:text-[16.5px] text-[#6B5845] max-w-3xl leading-relaxed font-normal">
            {project.summary}
          </p>

          <div className="flex items-center gap-6 pt-2 text-[13px] font-mono text-[#123B2A]">
            <span>Lead: <strong>{project.leadInstitution}</strong></span>
            <span>·</span>
            <span>Impact: <strong>{project.impactMetric}</strong></span>
            <span>·</span>
            <span>Started: <strong>{project.startedAt}</strong></span>
          </div>
        </div>
      </header>

      {/* Main Dossier Content */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Anchored Entities Interlinks */}
            <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-7 shadow-2xs space-y-4 text-left">
              <h3 className="text-[1.2rem] font-bold text-[#1D2522]">
                Ecosystem Provenance & Lineage
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => navigate(`/challenges/${project.relatedChallengeId}`)}
                  className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] hover:border-[#123B2A]/40 transition-colors cursor-pointer space-y-1"
                >
                  <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase text-[#123B2A]">
                    <Target className="h-3.5 w-3.5 text-[#F5A623]" />
                    <span>TARGET CHALLENGE</span>
                  </div>
                  <h4 className="text-[13.5px] font-bold text-[#1D2522] leading-snug">
                    {project.relatedChallengeTitle}
                  </h4>
                  <span className="text-[11.5px] font-mono text-[#6B5845] block">
                    ID: {project.relatedChallengeId} →
                  </span>
                </div>

                {project.relatedIdeaId ? (
                  <div
                    onClick={() => navigate(`/ideas/${project.relatedIdeaId}`)}
                    className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] hover:border-[#123B2A]/40 transition-colors cursor-pointer space-y-1"
                  >
                    <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase text-[#123B2A]">
                      <Lightbulb className="h-3.5 w-3.5 text-[#F5A623]" />
                      <span>ORIGINATING IDEA</span>
                    </div>
                    <h4 className="text-[13.5px] font-bold text-[#1D2522] leading-snug">
                      Low-Cost IoT Sensor Network Prototyping
                    </h4>
                    <span className="text-[11.5px] font-mono text-[#6B5845] block">
                      ID: {project.relatedIdeaId} →
                    </span>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase text-[#6B5845]">
                      <Users className="h-3.5 w-3.5" />
                      <span>CONSORTIUM INCEPTION</span>
                    </div>
                    <p className="text-[12.5px] text-[#6B5845]">
                      Direct institutional partnership initiated under State Innovation Mission.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Consortium Partners Breakdown */}
            <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-7 shadow-2xs space-y-4 text-left">
              <h3 className="text-[1.2rem] font-bold text-[#1D2522]">
                Active Consortium Partners
              </h3>

              <div className="space-y-3">
                {project.partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-center justify-between gap-4 text-left"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-[#123B2A]" />
                        <h4 className="text-[14px] font-bold text-[#1D2522]">
                          {partner.name}
                        </h4>
                        {partner.lead && (
                          <span className="text-[10px] font-mono font-bold bg-[#123B2A] text-white px-2 py-0.5 rounded">
                            LEAD
                          </span>
                        )}
                      </div>
                      {partner.role && (
                        <p className="text-[12.5px] text-[#6B5845]">
                          Role: {partner.role}
                        </p>
                      )}
                    </div>

                    <span className="text-[11px] font-mono text-[#6B5845] uppercase shrink-0">
                      {partner.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Context Image (if present) */}
            {project.imageUrl && (
              <div className="rounded-3xl border border-[#EEEAE1] bg-white overflow-hidden shadow-2xs">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-4 text-[12.5px] font-mono text-[#6B5845]">
                  Field Station Deployment · {project.location}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Collaboration Vacancy */}
            {project.collaborationNeeds && project.collaborationNeeds.length > 0 && (
              <div className="rounded-3xl border-2 border-[#F5A623]/60 bg-[#FFFDF9] p-6 shadow-xs space-y-3 text-left">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#B45309]">
                  <Sparkles className="h-4 w-4 text-[#F5A623]" />
                  <span>PARTNERSHIP VACANCY</span>
                </div>

                <h4 className="text-[1.1rem] font-bold text-[#1D2522]">
                  {project.collaborationNeeds[0].type}
                </h4>

                <p className="text-[13px] text-[#6B5845] leading-relaxed">
                  {project.collaborationNeeds[0].description}
                </p>

                <button
                  type="button"
                  onClick={() => alert(`Partner inquiry submitted for ${project.title}`)}
                  className="w-full py-3 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-2xs transition-colors cursor-pointer"
                >
                  Apply to Join Consortium →
                </button>
              </div>
            )}

            {/* Milestone Summary */}
            <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-3 text-left">
              <h4 className="text-[14px] font-bold text-[#1D2522]">
                Current Milestone Status
              </h4>
              <div className="space-y-2 text-[12.5px] text-[#6B5845]">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-[#15803D]" />
                  <span>Bench lab acoustic vibration validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-[#15803D]" />
                  <span>Panchayat Jal Samiti site agreement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Radio className="h-3.5 w-3.5 text-[#F5A623] animate-pulse" />
                  <span className="text-[#1D2522] font-semibold">12 handpump field telemetry telemetry active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
