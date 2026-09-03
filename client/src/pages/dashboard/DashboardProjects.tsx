import { useNavigate } from 'react-router-dom';
import { Users, ArrowRight, ExternalLink } from 'lucide-react';

interface CitizenProjectItem {
  id: string;
  code: string;
  name: string;
  relatedChallenge: string;
  teamLead: string;
  teamCount: number;
  stage: 'Research' | 'Prototype' | 'Pilot' | 'Implementation' | 'Impact Assessment';
  progress: number;
  upcomingMilestone: string;
  milestoneDate: string;
  health: 'ON TRACK' | 'NEEDS REVIEW';
}

const MY_PROJECTS: CitizenProjectItem[] = [
  {
    id: 'PROJECT-2026-0012',
    code: 'PROJECT-2026-0012',
    name: 'Smart Rural Water Infrastructure Monitoring',
    relatedChallenge: 'Frequent Breakdown of Drinking Water Pumps in Murhu Block',
    teamLead: 'Dr. Ananya Singh (BIT Mesra)',
    teamCount: 6,
    stage: 'Pilot',
    progress: 68,
    upcomingMilestone: 'Field Deployment Phase 2 & Telemetry Validation',
    milestoneDate: 'July 15, 2026',
    health: 'ON TRACK',
  },
  {
    id: 'PROJECT-2026-0009',
    code: 'PROJECT-2026-0009',
    name: 'Solar Evaporative Cooling Chambers for Tribal NTFP',
    relatedChallenge: 'Improving Post-Harvest Storage & Market Access for Lac Collectors',
    teamLead: 'Prof. S. Soren (IIT ISM Dhanbad)',
    teamCount: 5,
    stage: 'Prototype',
    progress: 42,
    upcomingMilestone: 'Phase-Change Material Chamber Thermal Stress Test',
    milestoneDate: 'July 28, 2026',
    health: 'ON TRACK',
  },
  {
    id: 'PROJECT-2026-0005',
    code: 'PROJECT-2026-0005',
    name: 'Portable Blood Diagnostic Box for Remote ASHA Workers',
    relatedChallenge: 'Rural Healthcare Accessibility Initiative in Dumka',
    teamLead: 'Dr. Priya Verma (Rural Health Mission)',
    teamCount: 4,
    stage: 'Research',
    progress: 25,
    upcomingMilestone: 'Microfluidic Test Strip Chemical Validation',
    milestoneDate: 'August 10, 2026',
    health: 'NEEDS REVIEW',
  },
];

export function DashboardProjects() {
  const navigate = useNavigate();

  const getStageBadge = (stage: CitizenProjectItem['stage']) => {
    switch (stage) {
      case 'Pilot':
        return 'text-[#15803D] bg-[#F0FDF4] border-[#BBF7D0]';
      case 'Prototype':
        return 'text-[#0284C7] bg-[#F0F9FF] border-[#BAE6FD]';
      case 'Implementation':
        return 'text-[#7E22CE] bg-[#FAF5FF] border-[#E9D5FF]';
      case 'Impact Assessment':
        return 'text-[#B45309] bg-[#FFFBEB] border-[#FDE68A]';
      case 'Research':
      default:
        return 'text-[#6B5845] bg-[#FAF9F5] border-[#EEEAE1]';
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* ── Subheader ── */}
      <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            COLLABORATIVE SPRINT TEAMS
          </span>
          <h2 className="text-[1.3rem] font-bold text-[#1D2522]">
            Active Implementation Projects ({MY_PROJECTS.length})
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigate('/projects')}
          className="text-[12.5px] font-bold text-[#123B2A] hover:underline cursor-pointer flex items-center gap-1"
        >
          <span>Explore All Public Projects</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── Project Cards Grid ── */}
      <div className="space-y-4">
        {MY_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-7 shadow-2xs hover:shadow-md transition-all space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#6B5845]">{project.code}</span>
                  <span
                    className={`text-[10.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${getStageBadge(
                      project.stage,
                    )}`}
                  >
                    {project.stage} Stage
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      project.health === 'ON TRACK'
                        ? 'bg-[#F0FDF4] text-[#15803D]'
                        : 'bg-[#FFF5F5] text-[#BE123C]'
                    }`}
                  >
                    ● {project.health}
                  </span>
                </div>

                <h3 className="text-[1.35rem] font-bold text-[#1D2522]">{project.name}</h3>

                <p className="text-[12.5px] text-[#6B5845]">
                  Responding to:{' '}
                  <strong className="text-[#1D2522]">{project.relatedChallenge}</strong>
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => navigate(`/workspace/projects/${project.id}`)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[12.5px] font-bold shadow-xs transition-all shrink-0 cursor-pointer"
              >
                <span>Open Workspace</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#F5A623]" />
              </button>
            </div>

            {/* Progress Bar & Milestone Info */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pt-2 border-t border-[#EEEAE1]/80 text-[12.5px]">
              <div className="sm:col-span-5 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#6B5845]">Milestone Progress:</span>
                  <strong className="text-[#123B2A]">{project.progress}% Complete</strong>
                </div>
                <div className="h-2 w-full bg-[#EEEAE1] rounded-full overflow-hidden">
                  <div
                    style={{ width: `${project.progress}%` }}
                    className="h-full bg-[#123B2A] rounded-full"
                  />
                </div>
              </div>

              <div className="sm:col-span-4 p-2.5 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-0.5">
                <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                  UPCOMING MILESTONE
                </span>
                <span className="font-bold text-[#1D2522] block truncate">
                  {project.upcomingMilestone}
                </span>
                <span className="text-[10.5px] font-mono text-[#15803D]">
                  Due {project.milestoneDate}
                </span>
              </div>

              <div className="sm:col-span-3 text-left sm:text-right font-mono text-[11.5px] text-[#6B5845]">
                <div className="flex items-center sm:justify-end gap-1 text-[#1D2522] font-semibold">
                  <Users className="h-3.5 w-3.5 text-[#123B2A]" />
                  <span>{project.teamCount} Active Members</span>
                </div>
                <span className="text-[11px] text-[#6B5845] truncate block">
                  {project.teamLead}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
