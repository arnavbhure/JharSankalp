import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Users, Clock, MapPin, FileDown, Check, X } from 'lucide-react';

interface QuickActionsToolbarProps {
  onExportReport: () => void;
  exporting: boolean;
}

export function QuickActionsToolbar({ onExportReport, exporting }: QuickActionsToolbarProps) {
  const navigate = useNavigate();
  const [allocationModalOpen, setAllocationModalOpen] = useState(false);
  const [allocationStatus, setAllocationStatus] = useState<string | null>(null);

  const scrollToMap = () => {
    const el = document.getElementById('map-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSimulatedAllocation = (university: string) => {
    setAllocationStatus(`12 unassigned rural sanitation challenges routed to ${university}`);
    setTimeout(() => {
      setAllocationModalOpen(false);
      setAllocationStatus(null);
    }, 2500);
  };

  return (
    <section className="rounded-3xl border border-[#EEEAE1] bg-[#FAF9F5] p-6 sm:p-7 shadow-2xs text-left space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEEAE1] pb-3">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
            DIRECTORATE FAST-TRACK ACTIONS
          </span>
          <h4 className="text-[1.2rem] font-bold text-[#1D2522]">
            Ecosystem Command Shortcuts
          </h4>
        </div>

        <span className="text-[11px] font-mono text-[#6B5845]">
          Administrative Dispatch Console
        </span>
      </div>

      {/* 5 Quick Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
            Review New Challenges
          </div>
          <div className="text-[10.5px] font-mono text-[#6B5845]">
            386 in evaluation queue →
          </div>
        </button>

        {/* Action 2 */}
        <button
          type="button"
          onClick={() => setAllocationModalOpen(true)}
          className="p-3.5 rounded-2xl bg-white border border-[#EEEAE1] hover:border-[#4C1E4F] hover:shadow-xs transition-all text-left space-y-2 cursor-pointer group"
        >
          <div className="h-8 w-8 rounded-xl bg-[#FAF9F5] group-hover:bg-[#123B2A] text-[#123B2A] group-hover:text-white flex items-center justify-center transition-colors">
            <Users className="h-4 w-4" />
          </div>
          <div className="text-[13px] font-bold text-[#1D2522] group-hover:text-[#123B2A] transition-colors leading-snug">
            Manage Allocation
          </div>
          <div className="text-[10.5px] font-mono text-[#6B5845]">
            University matching cell →
          </div>
        </button>

        {/* Action 3 */}
        <button
          type="button"
          onClick={() => navigate('/projects')}
          className="p-3.5 rounded-2xl bg-white border border-[#EEEAE1] hover:border-[#DC2626] hover:shadow-xs transition-all text-left space-y-2 cursor-pointer group"
        >
          <div className="h-8 w-8 rounded-xl bg-[#FAF9F5] group-hover:bg-[#DC2626] text-[#DC2626] group-hover:text-white flex items-center justify-center transition-colors">
            <Clock className="h-4 w-4" />
          </div>
          <div className="text-[13px] font-bold text-[#1D2522] group-hover:text-[#DC2626] transition-colors leading-snug">
            View Delayed Projects
          </div>
          <div className="text-[10.5px] font-mono text-[#6B5845]">
            Latehar cold hub & mining →
          </div>
        </button>

        {/* Action 4 */}
        <button
          type="button"
          onClick={scrollToMap}
          className="p-3.5 rounded-2xl bg-white border border-[#EEEAE1] hover:border-[#FA7E61] hover:shadow-xs transition-all text-left space-y-2 cursor-pointer group"
        >
          <div className="h-8 w-8 rounded-xl bg-[#FAF9F5] group-hover:bg-[#FA7E61] text-[#FA7E61] group-hover:text-white flex items-center justify-center transition-colors">
            <MapPin className="h-4 w-4" />
          </div>
          <div className="text-[13px] font-bold text-[#1D2522] group-hover:text-[#FA7E61] transition-colors leading-snug">
            District Insights
          </div>
          <div className="text-[10.5px] font-mono text-[#6B5845]">
            24-district telemetry map →
          </div>
        </button>

        {/* Action 5 */}
        <button
          type="button"
          onClick={onExportReport}
          disabled={exporting}
          className="p-3.5 rounded-2xl bg-white border border-[#EEEAE1] hover:border-[#15803D] hover:shadow-xs transition-all text-left space-y-2 cursor-pointer group"
        >
          <div className="h-8 w-8 rounded-xl bg-[#FAF9F5] group-hover:bg-[#15803D] text-[#15803D] group-hover:text-white flex items-center justify-center transition-colors">
            {exporting ? <Check className="h-4 w-4" /> : <FileDown className="h-4 w-4" />}
          </div>
          <div className="text-[13px] font-bold text-[#1D2522] group-hover:text-[#15803D] transition-colors leading-snug">
            {exporting ? 'Report Ready' : 'Export Report'}
          </div>
          <div className="text-[10.5px] font-mono text-[#6B5845]">
            State Innovation Briefing →
          </div>
        </button>
      </div>

      {/* Allocation Modal Dialog */}
      {allocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs text-left animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-[#EEEAE1] space-y-5">
            <button
              onClick={() => setAllocationModalOpen(false)}
              className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold uppercase text-[#4C1E4F]">
                INSTITUTIONAL ALLOCATION CONSOLE
              </span>
              <h3 className="text-[1.35rem] font-bold text-[#1D2522]">
                Assign Unmatched Civic Challenges
              </h3>
              <p className="text-[12.5px] text-[#6B5845]">
                12 verified challenges currently await assignment to academic research innovation cells.
              </p>
            </div>

            {allocationStatus ? (
              <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-[13px] font-mono flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0" />
                <span>{allocationStatus}</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="text-[11.5px] font-mono uppercase font-bold text-[#6B5845]">
                  Select Target University Innovation Cell:
                </div>

                {[
                  { name: 'BIT Mesra Innovation Cell', domain: 'Water, IoT & Sensor Telemetry' },
                  { name: 'Birsa Agricultural University (BAU)', domain: 'Soil Acidity & Agro-Forestry' },
                  { name: 'BIT Sindri Mining Research Cell', domain: 'Strata Mechanics & Geo-safety' },
                  { name: 'IIT (ISM) Dhanbad Centre of Excellence', domain: 'Deep Earth Sensing & Remote Sensing' },
                ].map((uni) => (
                  <button
                    key={uni.name}
                    type="button"
                    onClick={() => handleSimulatedAllocation(uni.name)}
                    className="w-full p-3 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-[#F8F6F1] hover:border-[#4C1E4F] transition-all text-left flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="text-[13px] font-bold text-[#1D2522] group-hover:text-[#4C1E4F]">
                        {uni.name}
                      </div>
                      <div className="text-[11px] font-mono text-[#6B5845]">
                        Specialty: {uni.domain}
                      </div>
                    </div>
                    <span className="text-[11.5px] font-mono font-bold text-[#4C1E4F]">
                      Assign →
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-[#EEEAE1] flex justify-end">
              <button
                type="button"
                onClick={() => setAllocationModalOpen(false)}
                className="px-4 py-2 rounded-xl text-[12.5px] font-bold text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
              >
                Close Console
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
