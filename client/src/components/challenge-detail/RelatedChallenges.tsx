import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChallengeCard } from '../challenges/ChallengeCard';
import { fetchChallenges } from '../../services/api/challenges';
import { ChallengeItem } from '../../types/challenges';

interface RelatedChallengesProps {
  currentChallengeId?: string;
  currentCategory?: string;
  currentId?: string;
}

export function RelatedChallenges({
  currentChallengeId,
  currentId,
  currentCategory,
}: RelatedChallengesProps) {
  const navigate = useNavigate();
  const targetId = currentChallengeId || currentId || '';
  const [related, setRelated] = useState<ChallengeItem[]>([]);

  useEffect(() => {
    fetchChallenges()
      .then((list) => {
        const filtered = (list || []).filter((c) => c.id !== targetId).slice(0, 3);
        setRelated(filtered);
      })
      .catch((err) => console.warn('Failed to load related challenges:', err));
  }, [targetId, currentCategory]);

  return (
    <section className="py-12 sm:py-16 border-b border-[#EEEAE1] text-left">
      <div className="space-y-1 mb-8">
        <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
          <span className="h-2 w-2 rounded-full bg-[#F5A623]" />
          CONNECTED CIVIC DOMAINS
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.25rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Related challenges
        </h2>
        <p className="text-[14px] text-[#6B5845] max-w-xl">
          Discover adjacent challenges spanning mining ecology, environmental containment, and
          regional water security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onViewDetails={(c) => {
              navigate(`/challenges/${c.id}`);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ))}
      </div>
    </section>
  );
}
