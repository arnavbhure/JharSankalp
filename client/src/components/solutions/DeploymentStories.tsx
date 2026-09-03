import { MapPin, Users, CheckCircle2 } from 'lucide-react';
import { DeploymentStory } from '../../types/solutions';

interface DeploymentStoriesProps {
  stories: DeploymentStory[];
}

export function DeploymentStories({ stories }: DeploymentStoriesProps) {
  return (
    <section className="space-y-6 text-left">
      <div className="space-y-1">
        <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#15803D]">
          GROUND ROLLOUT TELEMETRY
        </span>
        <h2 className="text-[1.5rem] sm:text-[1.8rem] font-bold text-[#1D2522]">
          Recently Reaching Communities
        </h2>
        <p className="text-[13.5px] text-[#6B5845] max-w-xl leading-relaxed">
          Real deployments actively serving villages, schools, and farmer collectives across Jharkhand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stories.map((story) => (
          <div
            key={story.id}
            className="rounded-3xl border border-[#EEEAE1] bg-white p-6 shadow-2xs hover:shadow-md hover:border-[#123B2A]/30 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header: Focus Area & Status */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10.5px] font-mono font-bold uppercase text-[#123B2A] bg-[#FAF9F5] px-2.5 py-0.5 rounded border border-[#EEEAE1]">
                  {story.focusArea}
                </span>

                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#15803D] font-bold bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#15803D] animate-pulse" />
                  {story.currentStatus}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h3 className="text-[1.2rem] font-bold text-[#1D2522]">
                  {story.title}
                </h3>
                <p className="text-[13px] text-[#6B5845] leading-relaxed">
                  {story.description}
                </p>
              </div>

              {/* Location & Coverage */}
              <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1.5 text-[12px]">
                <div className="flex items-center justify-between font-mono">
                  <span className="flex items-center gap-1 text-[#BE123C]">
                    <MapPin className="h-3.5 w-3.5" />
                    {story.district}
                  </span>
                  <span className="flex items-center gap-1 text-[#123B2A] font-bold">
                    <Users className="h-3.5 w-3.5" />
                    {story.communitiesReached}
                  </span>
                </div>
              </div>
            </div>

            {/* Metric Box */}
            <div className="pt-3 border-t border-[#EEEAE1] flex items-center justify-between">
              <span className="text-[12px] font-mono font-bold text-[#15803D] flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                {story.metric}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
