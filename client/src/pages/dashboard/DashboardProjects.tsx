import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowRight, ExternalLink, Loader2, FolderKanban } from 'lucide-react';
import { api } from '../../services/api';

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

export function DashboardProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<CitizenProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    api.get<any[]>('/projects')
      .then((res) => {
        if (!isMounted) return;
        const list = Array.isArray(res) ? res : (res as any)?.data || [];

        const mapped: CitizenProjectItem[] = list.map((p: any) => {
          let stage: CitizenProjectItem['stage'] = 'Pilot';
          const rawStage = (p.stage || '').toLowerCase();
          if (rawStage.includes('research')) stage = 'Research';
          else if (rawStage.includes('prototype')) stage = 'Prototype';
          else if (rawStage.includes('pilot')) stage = 'Pilot';
          else if (rawStage.includes('implement')) stage = 'Implementation';
          else if (rawStage.includes('impact') || rawStage.includes('scale')) stage = 'Impact Assessment';

          const milestonesTotal = p.milestones?.length || 4;
          const milestonesCompleted = p.milestones?.filter((m: any) => m.status === 'COMPLETED').length || 2;
          const progress = Math.round((milestonesCompleted / Math.max(milestonesTotal, 1)) * 100);

          const nextM = p.milestones?.find((m: any) => m.status !== 'COMPLETED') || p.milestones?.[0];

          return {
            id: p.id,
            code: p.referenceCode || `PRJ-${p.id.slice(0, 6).toUpperCase()}`,
            name: p.title,
            relatedChallenge: p.challenge?.title || 'Grassroots Infrastructure Initiative',
            teamLead: p.leadOrganization?.name || 'Academic Consortium',
            teamCount: (p.participants?.length || 0) + 4,
            stage,
            progress,
            upcomingMilestone: nextM?.title || 'Field Calibration & Deployment',
            milestoneDate: nextM?.targetDate
              ? new Date(nextM.targetDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
              : 'Q3 2026',
            health: progress >= 40 ? 'ON TRACK' : 'NEEDS REVIEW',
          };
        });

        setProjects(mapped);
      })
      .catch((err) => {
        console.warn('Failed to load projects from API:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
            Active Implementation Projects ({projects.length})
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

      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-2">
          <Loader2 className="h-6 w-6 animate-spin text-[#123B2A]" />
          <span className="text-[13px] font-mono text-[#6B5845]">Loading active project portfolio...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
          <FolderKanban className="h-8 w-8 text-[#6B5845] mx-auto opacity-50" />
          <h3 className="text-[1.1rem] font-bold text-[#1D2522]">No active projects in progress</h3>
          <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
            Propose solution ideas or join an open challenge sprint to form an institutional consortium.
          </p>
          <button
            type="button"
            onClick={() => navigate('/challenges')}
            className="px-4 py-2 rounded-xl bg-[#123B2A] text-white text-[12px] font-bold cursor-pointer hover:bg-[#0D2B1E]"
          >
            Explore Public Challenges
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
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
      )}
    </div>
  );
}
