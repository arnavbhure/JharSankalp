import { useState, useEffect } from 'react';
import { SelectedChallenge } from '../../types/ideaSubmission';
import { searchChallenges } from '../../services/ideaSubmissionApi';
import { Search, MapPin, Users, Check, ArrowRight, Target } from 'lucide-react';
import { JHARKHAND_DISTRICTS } from '../../data/challengesData';

interface ChallengeSelectorProps {
  selectedChallenge: SelectedChallenge | null;
  onSelect: (challenge: SelectedChallenge) => void;
}

const DOMAINS = [
  'All Domains',
  'Water Management',
  'Agriculture',
  'Mining Safety',
  'Digital Infrastructure',
  'Environment',
  'Healthcare',
  'Education',
];

const PRIORITIES = ['All Priorities', 'Critical', 'High', 'Medium'];

export function ChallengeSelector({
  selectedChallenge,
  onSelect,
}: ChallengeSelectorProps) {
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState('All Domains');
  const [district, setDistrict] = useState('All Districts');
  const [priority, setPriority] = useState('All Priorities');
  const [challenges, setChallenges] = useState<SelectedChallenge[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    searchChallenges(query, { domain, district, priority }).then((res) => {
      if (!cancelled) {
        setChallenges(res);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [query, domain, district, priority]);

  return (
    <div className="space-y-6 text-left">
      {/* ── Step Intro ── */}
      <div className="space-y-1.5 border-b border-[#EEEAE1] pb-4">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Target className="h-4 w-4 text-[#F5A623]" />
          <span>STEP 01 · PROBLEM GROUNDING</span>
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          What challenge does your idea address?
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed max-w-2xl">
          Every idea on JharSankalp begins with a real problem identified by a community, local body, or public institution across Jharkhand.
        </p>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5845]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search challenges by title, district, or domain..."
            className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#EEEAE1] bg-white text-[14px] text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] transition-all"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="h-11 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] font-semibold text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] cursor-pointer"
          >
            {DOMAINS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="h-11 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] font-semibold text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] cursor-pointer"
          >
            {JHARKHAND_DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="h-11 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[13px] font-semibold text-[#1D2522] shadow-2xs focus:outline-none focus:border-[#123B2A] cursor-pointer"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Challenge Selection List ── */}
      <div className="space-y-3">
        <div className="text-[12px] font-mono text-[#6B5845]">
          Found {challenges.length} active societal challenges:
        </div>

        {loading ? (
          <div className="py-12 text-center text-[13px] text-[#6B5845]">
            Searching active challenges...
          </div>
        ) : challenges.length === 0 ? (
          <div className="p-8 rounded-2xl border border-[#EEEAE1] bg-white text-center space-y-1">
            <p className="text-[14px] font-bold text-[#1D2522]">
              No matching challenges found.
            </p>
            <p className="text-[12.5px] text-[#6B5845]">
              Try adjusting your search terms or clearing the domain filters.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
            {challenges.map((c) => {
              const isSelected = selectedChallenge?.id === c.id;

              return (
                <div
                  key={c.id}
                  onClick={() => onSelect(c)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left group ${
                    isSelected
                      ? 'border-2 border-[#123B2A] bg-[#FFFDF9] shadow-xs'
                      : 'border-[#EEEAE1] bg-white hover:border-[#123B2A]/40 shadow-2xs'
                  }`}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider">
                      <span className="text-[#123B2A]">{c.category}</span>
                      <span className="text-[#6B5845]">·</span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                          c.priority === 'Critical'
                            ? 'bg-[#FEF2F2] text-[#BE123C]'
                            : c.priority === 'High'
                            ? 'bg-[#FFFBEB] text-[#B45309]'
                            : 'bg-[#F0FDF4] text-[#15803D]'
                        }`}
                      >
                        {c.priority} Priority
                      </span>
                    </div>

                    <h3 className="text-[1.1rem] font-bold text-[#1D2522] font-sans group-hover:text-[#123B2A] transition-colors leading-snug">
                      {c.title}
                    </h3>

                    <div className="flex items-center gap-3 text-[12px] text-[#6B5845]">
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="h-3 w-3 text-[#123B2A]" />
                        {c.district} {c.block ? `(${c.block})` : ''}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {c.affectedPopulation}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-end">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#123B2A] text-white text-[12px] font-bold shadow-2xs">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                        <span>Selected</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[13px] font-bold text-[#123B2A] group-hover:translate-x-0.5 transition-transform">
                        <span>Select Challenge</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
