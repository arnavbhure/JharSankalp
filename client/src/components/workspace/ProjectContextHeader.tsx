import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkspaceContext } from '../../types/workspace';
import { ProjectHealthIndicator } from '../projects/ProjectHealthIndicator';
import { ArrowLeft, ExternalLink, Settings, Radio, X, Check } from 'lucide-react';

interface ProjectContextHeaderProps {
  context: WorkspaceContext;
}

export function ProjectContextHeader({ context }: ProjectContextHeaderProps) {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [leadRole, setLeadRole] = useState(context.currentUserRole);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleSaveSettings = () => {
    setSettingsSaved(true);
    setTimeout(() => {
      setSettingsSaved(false);
      setSettingsOpen(false);
    }, 1200);
  };

  return (
    <header className="border-b border-[#EEEAE1] bg-white sticky top-16 z-20 shadow-2xs text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left Side: Back Link & Context Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => navigate(`/projects/${context.projectId}`)}
            className="inline-flex items-center gap-1.5 text-[12px] font-mono font-bold text-[#6B5845] hover:text-[#123B2A] transition-colors p-1.5 rounded-lg hover:bg-[#FAF9F5] shrink-0 cursor-pointer"
            title="Return to Public Project Detail"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back to Project</span>
          </button>

          <span className="text-[#EEEAE1] hidden sm:inline">|</span>

          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2 text-[10.5px] font-mono text-[#6B5845] flex-wrap">
              <span className="font-bold text-[#123B2A]">{context.projectCode}</span>
              <span>·</span>
              <span className="uppercase font-semibold">{context.domain}</span>
              <span>·</span>
              <span className="text-[#6B5845] truncate">{context.location}</span>
            </div>

            <h1 className="text-[1.1rem] sm:text-[1.25rem] font-extrabold text-[#1D2522] tracking-tight font-sans truncate leading-tight">
              {context.title}
            </h1>
          </div>
        </div>

        {/* Right Side: Badges & Operational Actions */}
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {/* Stage Pill */}
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
            <Radio className="h-3 w-3 animate-pulse" />
            {context.stageLabel}
          </span>

          {/* Health Pill */}
          <ProjectHealthIndicator health={context.health} label={context.healthLabel} />

          {/* Completion Meter */}
          <span className="text-[11px] font-mono font-extrabold text-[#123B2A] bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
            {context.progressPercentage}% COMPLETE
          </span>

          <span className="text-[#EEEAE1] hidden md:inline">|</span>

          {/* Public Project Link */}
          <button
            type="button"
            onClick={() => navigate(`/projects/${context.projectId}`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[12px] font-bold text-[#1D2522] transition-colors cursor-pointer"
          >
            <span className="hidden lg:inline">View Public Dossier</span>
            <span className="lg:hidden">Public View</span>
            <ExternalLink className="h-3 w-3 text-[#6B5845]" />
          </button>

          {/* Project Settings Trigger */}
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="p-1.5 rounded-lg border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#6B5845] hover:text-[#123B2A] transition-colors cursor-pointer"
            title="Workspace Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 text-left">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-[#EEEAE1] space-y-4">
            <button
              onClick={() => setSettingsOpen(false)}
              className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#123B2A]">
                WORKSPACE CONFIGURATION
              </span>
              <h3 className="text-[1.3rem] font-bold text-[#1D2522] font-sans">
                Project Operational Settings
              </h3>
            </div>

            <div className="space-y-3 text-[13px] text-[#1D2522]">
              <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase text-[#6B5845] block">
                  Lead Institution & Governance
                </span>
                <p className="font-semibold text-[#1D2522]">{context.leadInstitution}</p>
                <p className="text-[11.5px] text-[#6B5845]">
                  Governed under State Innovation Mission Consortium Charter.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Active Contributor Role (Simulation)
                </label>
                <select
                  value={leadRole}
                  onChange={(e) => setLeadRole(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A] cursor-pointer"
                >
                  <option value="project_lead">Project Lead (Full Permissions)</option>
                  <option value="faculty_mentor">Faculty Mentor</option>
                  <option value="researcher">Researcher / Hardware Engineer</option>
                  <option value="student_contributor">Student Contributor</option>
                  <option value="government_partner">District Administration Partner</option>
                  <option value="viewer">Viewer (Read Only)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EEEAE1]">
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="px-4 py-2 rounded-xl text-[12.5px] font-semibold text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSaveSettings}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#123B2A] text-white text-[12.5px] font-bold shadow-xs cursor-pointer"
              >
                {settingsSaved ? (
                  <>
                    <Check className="h-4 w-4 text-[#4ADE80]" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Apply Settings</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
