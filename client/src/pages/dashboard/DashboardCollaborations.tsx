import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Check,
  X,
  UserPlus,
  ArrowRight,
} from 'lucide-react';

interface CollaborationRequest {
  id: string;
  senderName: string;
  senderRole: string;
  organization: string;
  category: 'University' | 'Industry' | 'Government' | 'Community';
  projectContext: string;
  date: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
}

const INITIAL_REQUESTS: CollaborationRequest[] = [
  {
    id: 'req-1',
    senderName: 'Prof. Alok Mukherjee',
    senderRole: 'Head of Embedded Systems Lab',
    organization: 'BIT Mesra',
    category: 'University',
    projectContext: 'Wants to collaborate on acoustic sensor algorithm validation for Murhu water pilot',
    date: 'Yesterday',
    status: 'PENDING',
  },
  {
    id: 'req-2',
    senderName: 'Manoj Tirkey',
    senderRole: 'Assistant District Program Officer',
    organization: 'Khunti District Collectorate',
    category: 'Government',
    projectContext: 'Requesting permission to add 5 new Gram Panchayat water points to sensor telemetry',
    date: '3 days ago',
    status: 'PENDING',
  },
];

const ACTIVE_PARTNERS = [
  {
    name: 'Dr. Ananya Singh',
    role: 'Project Lead',
    org: 'BIT Mesra',
    type: 'University Lab',
    project: 'Smart Rural Water Infrastructure Monitoring',
  },
  {
    name: 'Amit Kumar',
    role: 'Hardware Mentor',
    org: 'Jharkhand IoT Solutions',
    type: 'Industry Partner',
    project: 'Smart Rural Water Infrastructure Monitoring',
  },
  {
    name: 'Priya Verma',
    role: 'Field Coordinator',
    org: 'Rural Innovation Lab',
    type: 'Community NGO',
    project: 'Murhu Block Water Testbed',
  },
  {
    name: 'Sukhram Munda',
    role: 'Panchayat Representative',
    org: 'Murhu Jal Samiti',
    type: 'Gram Sabha',
    project: 'Water Infrastructure Governance',
  },
];

export function DashboardCollaborations() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<CollaborationRequest[]>(INITIAL_REQUESTS);

  const handleAction = (id: string, newStatus: 'ACCEPTED' | 'DECLINED') => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="space-y-6 text-left">
      {/* ── Subheader ── */}
      <div className="flex items-center justify-between border-b border-[#EEEAE1] pb-3">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            ECOSYSTEM NETWORKS
          </span>
          <h2 className="text-[1.3rem] font-bold text-[#1D2522]">
            Collaboration Network & Partner Requests
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigate('/collaborators')}
          className="text-[12.5px] font-bold text-[#123B2A] hover:underline cursor-pointer flex items-center gap-1"
        >
          <span>Explore Public Partner Directory</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── Pending Requests Section ── */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[1.1rem] font-bold text-[#1D2522] flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-[#F5A623]" />
            <span>Pending Collaboration Invitations</span>
          </h3>
          <span className="text-[11px] font-mono text-[#6B5845]">
            {requests.filter((r) => r.status === 'PENDING').length} Action Required
          </span>
        </div>

        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px]"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B5845]">
                  <span className="font-bold text-[#123B2A] bg-white px-2 py-0.5 rounded border border-[#EEEAE1]">
                    {req.category}
                  </span>
                  <span>·</span>
                  <span>{req.date}</span>
                </div>
                <div className="font-bold text-[#1D2522]">
                  {req.senderName} ({req.senderRole} · {req.organization})
                </div>
                <p className="text-[12.5px] text-[#6B5845]">
                  {req.projectContext}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="shrink-0 flex items-center gap-2">
                {req.status === 'PENDING' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleAction(req.id, 'ACCEPTED')}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-[12px] font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Accept</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(req.id, 'DECLINED')}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#EEEAE1] text-[#6B5845] hover:bg-white text-[12px] font-semibold transition-all cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>Decline</span>
                    </button>
                  </>
                ) : (
                  <span
                    className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg ${
                      req.status === 'ACCEPTED'
                        ? 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]'
                        : 'bg-[#FAF9F5] text-[#6B5845]'
                    }`}
                  >
                    {req.status === 'ACCEPTED' ? '✓ Accepted' : 'Declined'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Active Consortium Roster ── */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs space-y-4">
        <h3 className="text-[1.1rem] font-bold text-[#1D2522] flex items-center gap-2">
          <Users className="h-4 w-4 text-[#123B2A]" />
          <span>Active Institutional & Field Collaborators ({ACTIVE_PARTNERS.length})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {ACTIVE_PARTNERS.map((partner, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] space-y-2 text-[12.5px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-mono uppercase font-bold text-[#123B2A] bg-white px-2 py-0.5 rounded border border-[#EEEAE1]">
                  {partner.type}
                </span>
                <span className="text-[11px] font-mono text-[#15803D] font-bold">
                  ● Active
                </span>
              </div>

              <div>
                <strong className="text-[14px] text-[#1D2522] block font-sans">
                  {partner.name}
                </strong>
                <span className="text-[12px] text-[#6B5845]">
                  {partner.role} · {partner.org}
                </span>
              </div>

              <div className="text-[11.5px] text-[#6B5845] pt-1 border-t border-[#EEEAE1]">
                Focus Project: <strong className="text-[#1D2522]">{partner.project}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
