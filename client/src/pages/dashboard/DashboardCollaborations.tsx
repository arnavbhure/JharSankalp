import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, ArrowRight, Loader2, Handshake } from 'lucide-react';
import { api } from '../../services/api';

interface PartnerItem {
  id: string;
  name: string;
  role: string;
  org: string;
  type: string;
  project: string;
}

interface CollabRequest {
  id: string;
  senderName: string;
  senderRole: string;
  organization: string;
  category: string;
  projectContext: string;
  date: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
}

export function DashboardCollaborations() {
  const navigate = useNavigate();
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [requests, setRequests] = useState<CollabRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    api.get<any[]>('/collaborations')
      .then((res) => {
        if (!isMounted) return;
        const list = Array.isArray(res) ? res : (res as any)?.data || [];

        const partnerList: PartnerItem[] = [];
        const reqList: CollabRequest[] = [];

        list.forEach((c: any) => {
          const members = c.members || [];
          members.forEach((m: any) => {
            partnerList.push({
              id: m.id,
              name: m.memberName,
              role: m.role || 'Consortium Member',
              org: m.institution || 'Jharkhand Institutional Partner',
              type: m.role?.includes('Lead') ? 'University Lead' : 'Technical Partner',
              project: c.title || 'Civic Innovation Consortium',
            });
          });

          if (c.stage === 'TEAM_FORMING' || c.stage === 'PROPOSAL') {
            reqList.push({
              id: c.id,
              senderName: members[0]?.memberName || 'Institutional Coordinator',
              senderRole: members[0]?.role || 'R&D Lead',
              organization: members[0]?.institution || 'Academic Institute',
              category: 'University',
              projectContext: c.title,
              date: new Date(c.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
              status: 'PENDING',
            });
          }
        });

        setPartners(partnerList);
        setRequests(reqList);
      })
      .catch((err) => {
        console.warn('Failed to load collaborations from API:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAction = (id: string, newStatus: 'ACCEPTED' | 'DECLINED') => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
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
            Active Consortium Partners & Requests
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

      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-2">
          <Loader2 className="h-6 w-6 animate-spin text-[#123B2A]" />
          <span className="text-[13px] font-mono text-[#6B5845]">Loading collaboration telemetry...</span>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Section 1: Inbound Partnership Requests */}
          {requests.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[1.05rem] font-bold text-[#1D2522] flex items-center gap-2">
                <span>Inbound Collaboration Invitations</span>
                <span className="text-[10.5px] font-mono px-2 py-0.5 rounded-full bg-[#123B2A] text-white">
                  {requests.filter((r) => r.status === 'PENDING').length} Pending
                </span>
              </h3>

              <div className="space-y-3">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="p-5 rounded-3xl border border-[#EEEAE1] bg-white shadow-2xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B5845]">
                          <span>{req.category}</span>
                          <span>•</span>
                          <span>{req.date}</span>
                        </div>
                        <h4 className="text-[1.05rem] font-bold text-[#1D2522] mt-0.5">
                          {req.senderName} — {req.senderRole}
                        </h4>
                        <span className="text-[12px] text-[#123B2A] font-semibold">
                          {req.organization}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {req.status === 'PENDING' ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleAction(req.id, 'ACCEPTED')}
                              className="px-3.5 py-1.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[12px] font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                            >
                              <Check className="h-3.5 w-3.5" />
                              <span>Accept</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAction(req.id, 'DECLINED')}
                              className="px-3.5 py-1.5 rounded-xl bg-white border border-[#EEEAE1] hover:bg-[#FAF9F5] text-[#6B5845] text-[12px] font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                            >
                              <X className="h-3.5 w-3.5" />
                              <span>Decline</span>
                            </button>
                          </>
                        ) : (
                          <span
                            className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border ${
                              req.status === 'ACCEPTED'
                                ? 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]'
                                : 'bg-[#FFF5F5] text-[#BE123C] border-[#FECDD3]'
                            }`}
                          >
                            {req.status}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-[13px] text-[#3D4C44] leading-relaxed pt-1 border-t border-[#EEEAE1]">
                      Project context: <strong className="text-[#1D2522]">{req.projectContext}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Active Multi-Stakeholder Working Group */}
          <div className="space-y-3">
            <h3 className="text-[1.05rem] font-bold text-[#1D2522]">
              Active Consortium Members ({partners.length})
            </h3>

            {partners.length === 0 ? (
              <div className="py-16 text-center rounded-3xl bg-white border border-[#EEEAE1] p-8 space-y-3">
                <Handshake className="h-8 w-8 text-[#6B5845] mx-auto opacity-50" />
                <h3 className="text-[1.1rem] font-bold text-[#1D2522]">No active consortiums yet</h3>
                <p className="text-[13px] text-[#6B5845] max-w-sm mx-auto">
                  Browse open public challenges and join multidisciplinary squads with academic researchers and CSR partners.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/collaborations')}
                  className="px-4 py-2 rounded-xl bg-[#123B2A] text-white text-[12px] font-bold cursor-pointer hover:bg-[#0D2B1E]"
                >
                  Explore Public Collaborations
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="p-5 rounded-3xl border border-[#EEEAE1] bg-white shadow-2xs space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-[1.05rem] font-bold text-[#1D2522]">{partner.name}</h4>
                        <span className="text-[12px] text-[#6B5845]">{partner.role}</span>
                      </div>
                      <span className="text-[10.5px] font-mono px-2 py-0.5 rounded-md bg-[#FAF9F5] border border-[#EEEAE1] text-[#123B2A]">
                        {partner.type}
                      </span>
                    </div>

                    <div className="text-[12px] text-[#123B2A] font-semibold">{partner.org}</div>

                    <div className="pt-2 border-t border-[#EEEAE1] text-[11.5px] text-[#6B5845]">
                      Project: <strong className="text-[#1D2522]">{partner.project}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
