import { useState } from 'react';
import {
  WorkspaceData,
  TeamRoleCategory,
} from '../../../types/workspace';
import { addTeamMember } from '../../../services/workspaceApi';
import { Users, UserPlus, Building2, X } from 'lucide-react';

interface TeamManagementTabProps {
  data: WorkspaceData;
  onRefresh: () => void;
}

const CATEGORY_TITLES: Record<TeamRoleCategory, string> = {
  LEADERSHIP: 'LEADERSHIP & GOVERNANCE',
  RESEARCH_DEV: 'RESEARCH & DEVELOPMENT',
  FIELD_IMPLEMENTATION: 'FIELD IMPLEMENTATION',
  PARTNER_CONTRIBUTORS: 'PARTNER & COMMUNITY CONTRIBUTORS',
};

export function TeamManagementTab({ data, onRefresh }: TeamManagementTabProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [roleCategory, setRoleCategory] = useState<TeamRoleCategory>('RESEARCH_DEV');
  const [roleTitle, setRoleTitle] = useState('');
  const [institution, setInstitution] = useState('');
  const [areaOfContribution, setAreaOfContribution] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !roleTitle.trim()) return;

    setSubmitting(true);
    try {
      const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

      await addTeamMember(data.context.projectId, {
        name: name.trim(),
        roleCategory,
        roleTitle: roleTitle.trim(),
        institution: institution.trim() || 'Consortium Partner',
        areaOfContribution: areaOfContribution.trim() || 'Domain Contributor',
        currentWorkload: 'Normal',
        avatarInitials: initials || 'TM',
      });

      setAddModalOpen(false);
      setName('');
      setRoleTitle('');
      setInstitution('');
      setAreaOfContribution('');
      onRefresh();
    } finally {
      setSubmitting(false);
    }
  };

  const groupedMembers = (['LEADERSHIP', 'RESEARCH_DEV', 'FIELD_IMPLEMENTATION', 'PARTNER_CONTRIBUTORS'] as TeamRoleCategory[]).map(
    (cat) => ({
      category: cat,
      title: CATEGORY_TITLES[cat],
      members: data.teamMembers.filter((m) => m.roleCategory === cat),
    })
  );

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <Users className="h-3.5 w-3.5 text-[#F5A623]" />
            <span>CONSORTIUM GOVERNANCE</span>
          </div>
          <h2 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Project Team & Collaborators
          </h2>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
            Faculty leads, research fellows, field coordinators, and industrial partners assigned to this project.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-xs transition-all active:scale-[0.98] shrink-0 cursor-pointer"
        >
          <UserPlus className="h-4 w-4 text-[#F5A623]" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* ── Grouped Team Sections ── */}
      <div className="space-y-6">
        {groupedMembers.map((group) => {
          if (group.members.length === 0) return null;

          return (
            <div key={group.category} className="space-y-3 text-left">
              <div className="flex items-center gap-2 text-[11.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
                <span className="h-2 w-2 rounded-full bg-[#123B2A]" />
                <span>{group.title}</span>
                <span className="text-[#6B5845]">({group.members.length})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {group.members.map((member) => (
                  <div
                    key={member.id}
                    className="p-5 rounded-2xl border border-[#EEEAE1] bg-white hover:border-[#123B2A]/40 transition-colors shadow-2xs space-y-3 flex flex-col justify-between text-left"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-[#123B2A] font-mono font-bold text-[12.5px] flex items-center justify-center shrink-0">
                          {member.avatarInitials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[14px] font-bold text-[#1D2522] truncate">
                            {member.name}
                          </h4>
                          <span className="text-[11.5px] font-semibold text-[#123B2A] block truncate">
                            {member.roleTitle}
                          </span>
                        </div>
                      </div>

                      <div className="text-[12px] text-[#6B5845] space-y-1 pt-1 border-t border-[#EEEAE1]/60">
                        <div className="flex items-center gap-1.5 truncate">
                          <Building2 className="h-3.5 w-3.5 text-[#123B2A] shrink-0" />
                          <span>{member.institution}</span>
                        </div>
                        <p className="text-[11.5px] text-[#6B5845]">
                          Focus: {member.areaOfContribution}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#EEEAE1]/60 text-[11px] font-mono">
                      <span className="text-[#6B5845]">Workload:</span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded ${
                          member.currentWorkload === 'High'
                            ? 'bg-[#FFF5F5] text-[#BE123C]'
                            : member.currentWorkload === 'Light'
                            ? 'bg-[#FAF9F5] text-[#6B5845]'
                            : 'bg-[#F0FDF4] text-[#15803D]'
                        }`}
                      >
                        {member.currentWorkload} Load
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Add Member Modal ── */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 text-left">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-[#EEEAE1] space-y-4">
            <button
              onClick={() => setAddModalOpen(false)}
              className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#123B2A]">
                CONSORTIUM ROSTER
              </span>
              <h3 className="text-[1.3rem] font-bold text-[#1D2522] font-sans">
                Onboard Team Contributor
              </h3>
            </div>

            <form onSubmit={handleAddMember} className="space-y-3 text-[13px]">
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Anand Kishor"
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Functional Category
                </label>
                <select
                  value={roleCategory}
                  onChange={(e) => setRoleCategory(e.target.value as TeamRoleCategory)}
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A] cursor-pointer"
                >
                  <option value="LEADERSHIP">Leadership & Governance</option>
                  <option value="RESEARCH_DEV">Research & Development</option>
                  <option value="FIELD_IMPLEMENTATION">Field Implementation</option>
                  <option value="PARTNER_CONTRIBUTORS">Partner & Community Contributors</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Role Title *
                </label>
                <input
                  type="text"
                  required
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  placeholder="e.g. Telemetry Firmware Fellow"
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Institution / Organization
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. BIT Mesra / Rural Innovation Lab"
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Area of Contribution
                </label>
                <input
                  type="text"
                  value={areaOfContribution}
                  onChange={(e) => setAreaOfContribution(e.target.value)}
                  placeholder="e.g. LoRa Mesh Testing & Solar Battery Sizing"
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EEEAE1]">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-[12.5px] font-semibold text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-[#123B2A] text-white text-[12.5px] font-bold shadow-xs cursor-pointer disabled:opacity-60"
                >
                  {submitting ? 'Onboarding...' : 'Add Contributor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
