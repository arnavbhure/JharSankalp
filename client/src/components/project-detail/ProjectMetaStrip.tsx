import { ProjectDetail } from '../../types/projectDetail';
import { Calendar, Building2, Layers, Radio, Users } from 'lucide-react';

interface ProjectMetaStripProps {
  project: ProjectDetail;
}

export function ProjectMetaStrip({ project }: ProjectMetaStripProps) {
  return (
    <div className="border-b border-[#EEEAE1] bg-[#FAF9F5] py-4 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#EEEAE1] gap-4 sm:gap-0">
          {/* 1. Started */}
          <div className="sm:pr-6 space-y-0.5">
            <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase text-[#6B5845]">
              <Calendar className="h-3.5 w-3.5 text-[#123B2A]" />
              <span>Started</span>
            </div>
            <div className="text-[13.5px] font-bold text-[#1D2522] font-sans">
              {project.startedAt}
            </div>
          </div>

          {/* 2. Lead Institution */}
          <div className="sm:px-6 space-y-0.5 pt-3 sm:pt-0">
            <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase text-[#6B5845]">
              <Building2 className="h-3.5 w-3.5 text-[#123B2A]" />
              <span>Lead Institution</span>
            </div>
            <div className="text-[13.5px] font-bold text-[#1D2522] font-sans truncate">
              {project.leadInstitution}
            </div>
          </div>

          {/* 3. Partners */}
          <div className="sm:px-6 space-y-0.5 pt-3 sm:pt-0">
            <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase text-[#6B5845]">
              <Layers className="h-3.5 w-3.5 text-[#123B2A]" />
              <span>Consortium Partners</span>
            </div>
            <div className="text-[13.5px] font-bold text-[#1D2522] font-sans">
              {project.partners.length} Organizations
            </div>
          </div>

          {/* 4. Current Stage */}
          <div className="sm:px-6 space-y-0.5 pt-3 sm:pt-0">
            <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase text-[#15803D]">
              <Radio className="h-3.5 w-3.5 text-[#15803D]" />
              <span>Current Stage</span>
            </div>
            <div className="text-[13.5px] font-extrabold text-[#15803D] font-mono">
              {project.stageLabel}
            </div>
          </div>

          {/* 5. Potential Impact */}
          <div className="sm:pl-6 space-y-0.5 pt-3 sm:pt-0 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase text-[#6B5845]">
              <Users className="h-3.5 w-3.5 text-[#123B2A]" />
              <span>Potential Impact</span>
            </div>
            <div className="text-[13.5px] font-extrabold text-[#123B2A] font-mono">
              {project.impactMetric}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
