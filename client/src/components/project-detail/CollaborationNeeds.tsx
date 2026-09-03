import { useState } from 'react';
import { ProjectDetail } from '../../types/projectDetail';
import { ExpressInterestDialog } from './ExpressInterestDialog';
import { expressInterest } from '../../services/projectsApi';
import { ExpressInterestFormData } from '../../types/projectDetail';
import { Sparkles, ArrowRight, Handshake } from 'lucide-react';

interface CollaborationNeedsProps {
  project: ProjectDetail;
}

export function CollaborationNeeds({ project }: CollaborationNeedsProps) {
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = (needType: string) => {
    setSelectedNeed(needType);
    setDialogOpen(true);
  };

  const handleFormSubmit = async (data: ExpressInterestFormData) => {
    await expressInterest(project.id, data);
  };

  const needs = project.collaborationNeeds || [];

  return (
    <section id="needs" className="scroll-mt-32 space-y-6 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Handshake className="h-4 w-4 text-[#F5A623]" />
            <span>PARTNERSHIP VACANCIES</span>
          </div>
          <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Where this project needs support
          </h3>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
            Active calls for academic specialists, industrial fabrication hubs, and district testing partners.
          </p>
        </div>

        {/* ── Open Opportunities ── */}
        <div className="space-y-3.5">
          {needs.length > 0 ? (
            needs.map((cn) => (
              <div
                key={cn.id}
                className="p-5 sm:p-6 rounded-2xl border-2 border-[#F5A623]/40 bg-[#FFFDF9] hover:border-[#123B2A]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left shadow-2xs"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-mono font-bold uppercase text-[#B45309] bg-[#FFFBEB] px-2.5 py-0.5 rounded border border-[#FDE68A]">
                      <Sparkles className="h-3 w-3 text-[#F5A623]" />
                      OPEN OPPORTUNITY
                    </span>
                    <span className="text-[11px] font-mono text-[#6B5845]">
                      Stage: {project.stageLabel}
                    </span>
                  </div>

                  <h4 className="text-[15px] font-bold text-[#1D2522]">
                    {cn.type}
                  </h4>

                  <p className="text-[13px] text-[#6B5845] leading-relaxed max-w-2xl">
                    {cn.description ||
                      'The project requires specialized partner support to accelerate development and field verification.'}
                  </p>
                </div>

                <div className="shrink-0 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleOpenDialog(cn.type)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <span>Express Interest</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] text-center text-[13px] text-[#6B5845]">
              No public partner vacancies currently open. You can still reach out to the lead institution directly.
            </div>
          )}
        </div>
      </div>

      {/* Dialog Modal */}
      {dialogOpen && (
        <ExpressInterestDialog
          project={project}
          initialNeed={selectedNeed || undefined}
          onClose={() => setDialogOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </section>
  );
}
