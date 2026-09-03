import { UniversityTeam } from '../../types/university';
import { Users } from 'lucide-react';

interface TeamsParticipationSectionProps {
  teams: UniversityTeam[];
}

export function TeamsParticipationSection({ teams }: TeamsParticipationSectionProps) {
  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-xs text-left space-y-6">
      {/* Header */}
      <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Users className="h-4 w-4 text-[#F5A623]" />
            <span>ACADEMIC INVESTIGATOR COHORTS</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Research Teams & Student Fellowships
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl">
            Departmental squads deployed across societal problem statements with direct community
            immersion.
          </p>
        </div>

        {/* Summary Pill */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B5845] bg-[#FAF9F5] px-3 py-1 rounded-full border border-[#EEEAE1] flex-wrap">
          <span>
            <strong>6</strong> Active Teams
          </span>
          <span>·</span>
          <span>
            <strong>42</strong> Students
          </span>
          <span>·</span>
          <span>
            <strong>11</strong> Faculty
          </span>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {teams.map((team) => (
          <div
            key={team.id}
            className="p-4 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white hover:border-[#123B2A] transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <h4 className="text-[14.5px] font-bold text-[#1D2522]">{team.name}</h4>
                <div className="text-[11.5px] font-mono text-[#4C1E4F]">{team.department}</div>
              </div>

              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0] shrink-0">
                ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[12px] font-mono pt-2 border-t border-[#EEEAE1]">
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#6B5845] block">Principal Investigator</span>
                <strong className="text-[#1D2522]">{team.lead}</strong>
                <span className="text-[10px] text-[#6B5845] block">{team.leadRole}</span>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] text-[#6B5845] block">Student Fellows</span>
                <strong className="text-[#15803D]">{team.studentsCount} Active Students</strong>
                <span className="text-[10px] text-[#6B5845] block">Assigned Project:</span>
                <span className="text-[10px] text-[#4C1E4F] font-bold truncate block">
                  {team.activeProject}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
