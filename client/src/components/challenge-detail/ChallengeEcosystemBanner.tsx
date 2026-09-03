import { Link } from 'react-router-dom';
import { getIdeasForChallenge, getProjectsForChallenge } from '../../services/ecosystemApi';
import { Lightbulb, Rocket, ArrowRight, GitCommit } from 'lucide-react';

interface ChallengeEcosystemBannerProps {
  challengeId: string;
}

export function ChallengeEcosystemBanner({ challengeId }: ChallengeEcosystemBannerProps) {
  const linkedIdeas = getIdeasForChallenge(challengeId);
  const linkedProjects = getProjectsForChallenge(challengeId);

  if (linkedIdeas.length === 0 && linkedProjects.length === 0) {
    return null;
  }

  return (
    <section className="bg-white border-y border-[#EEEAE1] py-4 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EEEAE1] pb-2.5">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
              <GitCommit className="h-3.5 w-3.5 text-[#FA7E61]" />
              <span>CONNECTED INNOVATION PIPELINE</span>
            </div>

            <span className="text-[11.5px] font-mono text-[#6B5845]">
              This challenge has generated <strong>{linkedIdeas.length} Idea(s)</strong> and{' '}
              <strong>{linkedProjects.length} Active Project(s)</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Connected Idea Card */}
            {linkedIdeas[0] && (
              <div className="p-3 rounded-xl bg-white border border-[#EEEAE1] hover:border-[#4C1E4F] transition-all flex items-center justify-between gap-3 group">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-[#FAF9F5] text-[#B45309] flex items-center justify-center shrink-0">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#B45309] block">
                      Proposed Solution Idea ({linkedIdeas[0].id})
                    </span>
                    <h5 className="text-[13px] font-bold text-[#1D2522] truncate group-hover:text-[#4C1E4F] transition-colors">
                      {linkedIdeas[0].title}
                    </h5>
                  </div>
                </div>

                <Link
                  to={`/ideas/${linkedIdeas[0].id}`}
                  className="inline-flex items-center gap-1 text-[11.5px] font-mono font-bold text-[#4C1E4F] hover:text-[#FA7E61] shrink-0"
                >
                  <span>Explore Idea</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}

            {/* Connected Project Card */}
            {linkedProjects[0] && (
              <div className="p-3 rounded-xl bg-white border border-[#BBF7D0] hover:border-[#15803D] transition-all flex items-center justify-between gap-3 group">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-[#F0FDF4] text-[#15803D] flex items-center justify-center shrink-0">
                    <Rocket className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#15803D] block">
                      Active Field Project ({linkedProjects[0].stageLabel})
                    </span>
                    <h5 className="text-[13px] font-bold text-[#1D2522] truncate group-hover:text-[#15803D] transition-colors">
                      {linkedProjects[0].title}
                    </h5>
                  </div>
                </div>

                <Link
                  to={`/projects/${linkedProjects[0].id}`}
                  className="inline-flex items-center gap-1 text-[11.5px] font-mono font-bold text-[#15803D] hover:text-[#0D2B1E] shrink-0"
                >
                  <span>Project Dossier</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
