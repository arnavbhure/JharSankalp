import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Cpu, Rocket, UserPlus, Check, X } from 'lucide-react';

export function UniversityQuickActions() {
  const navigate = useNavigate();
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [teamSuccess, setTeamSuccess] = useState<string | null>(null);

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    setTeamSuccess('New Project Team initialized and registered with University Innovation Cell!');
    setTimeout(() => {
      setTeamModalOpen(false);
      setTeamSuccess(null);
    }, 2500);
  };

  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-[#FAF9F5] p-6 sm:p-7 shadow-2xs text-left space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEEAE1] pb-3">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
            CAMPUS INNOVATION ACTIONS
          </span>
          <h4 className="text-[1.2rem] font-bold text-[#1D2522]">Academic Fast-Track Console</h4>
        </div>

        <span className="text-[11px] font-mono text-[#6B5845]">Faculty & Student Operations</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Action 1 */}
        <button
          type="button"
          onClick={() => navigate('/challenges')}
          className="p-3.5 rounded-2xl bg-white border border-[#EEEAE1] hover:border-[#4C1E4F] hover:shadow-xs transition-all text-left space-y-2 cursor-pointer group"
        >
          <div className="h-8 w-8 rounded-xl bg-[#FAF9F5] group-hover:bg-[#4C1E4F] text-[#4C1E4F] group-hover:text-white flex items-center justify-center transition-colors">
            <Target className="h-4 w-4" />
          </div>
          <div className="text-[13px] font-bold text-[#1D2522] group-hover:text-[#4C1E4F] transition-colors leading-snug">
            Explore Challenges
          </div>
          <div className="text-[10.5px] font-mono text-[#6B5845]">18 matched to BIT Mesra →</div>
        </button>

        {/* Action 2 */}
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('capabilities');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="p-3.5 rounded-2xl bg-white border border-[#EEEAE1] hover:border-[#123B2A] hover:shadow-xs transition-all text-left space-y-2 cursor-pointer group"
        >
          <div className="h-8 w-8 rounded-xl bg-[#FAF9F5] group-hover:bg-[#123B2A] text-[#123B2A] group-hover:text-white flex items-center justify-center transition-colors">
            <Cpu className="h-4 w-4" />
          </div>
          <div className="text-[13px] font-bold text-[#1D2522] group-hover:text-[#123B2A] transition-colors leading-snug">
            Manage Capabilities
          </div>
          <div className="text-[10.5px] font-mono text-[#6B5845]">6 declared research labs →</div>
        </button>

        {/* Action 3 */}
        <button
          type="button"
          onClick={() => navigate('/projects')}
          className="p-3.5 rounded-2xl bg-white border border-[#EEEAE1] hover:border-[#FA7E61] hover:shadow-xs transition-all text-left space-y-2 cursor-pointer group"
        >
          <div className="h-8 w-8 rounded-xl bg-[#FAF9F5] group-hover:bg-[#FA7E61] text-[#FA7E61] group-hover:text-white flex items-center justify-center transition-colors">
            <Rocket className="h-4 w-4" />
          </div>
          <div className="text-[13px] font-bold text-[#1D2522] group-hover:text-[#FA7E61] transition-colors leading-snug">
            View Active Projects
          </div>
          <div className="text-[10.5px] font-mono text-[#6B5845]">
            4 in execution across state →
          </div>
        </button>

        {/* Action 4 */}
        <button
          type="button"
          onClick={() => setTeamModalOpen(true)}
          className="p-3.5 rounded-2xl bg-white border border-[#EEEAE1] hover:border-[#15803D] hover:shadow-xs transition-all text-left space-y-2 cursor-pointer group"
        >
          <div className="h-8 w-8 rounded-xl bg-[#FAF9F5] group-hover:bg-[#15803D] text-[#15803D] group-hover:text-white flex items-center justify-center transition-colors">
            <UserPlus className="h-4 w-4" />
          </div>
          <div className="text-[13px] font-bold text-[#1D2522] group-hover:text-[#15803D] transition-colors leading-snug">
            Create Project Team
          </div>
          <div className="text-[10.5px] font-mono text-[#6B5845]">Mobilize student fellows →</div>
        </button>
      </div>

      {/* Modal Dialog */}
      {teamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs text-left animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-[#EEEAE1] space-y-4">
            <button
              onClick={() => setTeamModalOpen(false)}
              className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase text-[#4C1E4F]">
                TEAM MOBILIZATION CONSOLE
              </span>
              <h3 className="text-[1.35rem] font-bold text-[#1D2522]">
                Form New Multidisciplinary Squad
              </h3>
              <p className="text-[12.5px] text-[#6B5845]">
                Assign faculty mentors and student fellows to an active civic challenge.
              </p>
            </div>

            {teamSuccess ? (
              <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-[13px] font-mono flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0" />
                <span>{teamSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleCreateTeam} className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11.5px] font-mono uppercase font-bold text-[#6B5845] mb-1">
                    Team Designation
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Rural Aquifer Diagnostics Squad"
                    className="w-full px-3 py-2 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] text-[13px] font-medium text-[#1D2522] focus:outline-none focus:border-[#4C1E4F]"
                  />
                </div>

                <div>
                  <label className="block text-[11.5px] font-mono uppercase font-bold text-[#6B5845] mb-1">
                    Department / Laboratory
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Civil & Environmental Engineering"
                    className="w-full px-3 py-2 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] text-[13px] font-medium text-[#1D2522] focus:outline-none focus:border-[#4C1E4F]"
                  />
                </div>

                <div>
                  <label className="block text-[11.5px] font-mono uppercase font-bold text-[#6B5845] mb-1">
                    Target Challenge / Project
                  </label>
                  <select className="w-full px-3 py-2 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] text-[13px] font-medium text-[#1D2522] focus:outline-none focus:border-[#4C1E4F]">
                    <option>JS-2026-00024 · Rural Water Pump Reliability</option>
                    <option>JS-2024-00003 · Mine Subsidence Early Warning</option>
                    <option>JS-2026-00015 · Accessible Public Transport</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#EEEAE1]">
                  <button
                    type="button"
                    onClick={() => setTeamModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-[12.5px] font-bold text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#4C1E4F] hover:bg-[#3A143D] text-white text-[12.5px] font-bold shadow-xs cursor-pointer"
                  >
                    Mobilize Team →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
