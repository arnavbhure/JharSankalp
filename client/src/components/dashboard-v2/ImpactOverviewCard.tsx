import { useState } from 'react';
import { ImpactOverviewData } from '../../types/dashboard';
import { TrendingUp, MoreVertical } from 'lucide-react';

interface ImpactOverviewCardProps {
  data: ImpactOverviewData;
}

export function ImpactOverviewCard({ data }: ImpactOverviewCardProps) {
  const [activeRange, setActiveRange] = useState<'1M' | '6M' | '1Y'>('6M');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const points = data.chartData;
  const maxVal = Math.max(...points.map((p) => p.value), 15);
  const minVal = 0;

  // Compute SVG coordinates (width 400, height 120)
  const width = 400;
  const height = 120;
  const paddingX = 20;
  const paddingY = 15;

  const getCoord = (idx: number, val: number) => {
    const x = paddingX + (idx / (points.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
    return { x, y };
  };

  const coords = points.map((p, i) => getCoord(i, p.value));

  // Build smooth bezier path
  let pathD = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const current = coords[i];
    const next = coords[i + 1];
    const cpX = (current.x + next.x) / 2;
    pathD += ` C ${cpX} ${current.y}, ${cpX} ${next.y}, ${next.x} ${next.y}`;
  }

  const areaD = `${pathD} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;

  return (
    <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-7 shadow-2xs space-y-5 text-left relative overflow-hidden flex flex-col justify-between group">
      {/* ── Top Strip: Title, Menu, and Period Toggle ── */}
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B5845]">
            CONTRIBUTION MOMENTUM
          </span>
          <h2 className="text-[1.25rem] sm:text-[1.4rem] font-extrabold text-[#1D2522] font-sans">
            {data.title}
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-[11px] font-mono">
            {(['1M', '6M', '1Y'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setActiveRange(r)}
                className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                  activeRange === r
                    ? 'bg-[#123B2A] text-white'
                    : 'text-[#6B5845] hover:text-[#1D2522]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="p-1.5 text-[#6B5845] hover:text-[#1D2522] rounded-lg hover:bg-[#FAF9F5] transition-colors cursor-pointer"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Main Stat & Growth Indicator ── */}
      <div className="flex items-baseline gap-3">
        <span className="text-[2.6rem] sm:text-[3rem] font-extrabold font-mono text-[#123B2A] leading-none">
          {data.mainCount}
        </span>
        <div className="space-y-0.5">
          <span className="text-[13.5px] font-bold text-[#1D2522] block font-sans">
            {data.mainLabel}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
            <TrendingUp className="h-3 w-3" />
            <span>{data.growth}</span>
          </span>
        </div>
      </div>

      {/* ── Smooth Activity Area & Line Chart ── */}
      <div className="relative pt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-24 sm:h-28 overflow-visible select-none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#123B2A" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#123B2A" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Fill under the curve */}
          <path d={areaD} fill="url(#areaGradient)" />

          {/* Smooth Line */}
          <path d={pathD} fill="none" stroke="#123B2A" strokeWidth="3" strokeLinecap="round" />

          {/* Interactive Data Points */}
          {coords.map((c, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <g key={i}>
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={isHovered ? 6 : 4}
                  fill={isHovered ? '#F5A623' : '#123B2A'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Preview */}
        {hoveredIdx !== null && (
          <div
            style={{
              left: `${(hoveredIdx / (points.length - 1)) * 100}%`,
            }}
            className="absolute top-0 -translate-x-1/2 -translate-y-4 pointer-events-none z-20"
          >
            <div className="rounded-xl bg-[#1D2522] text-white px-2.5 py-1 text-[11px] font-mono shadow-xl whitespace-nowrap">
              {points[hoveredIdx].month}: {points[hoveredIdx].value} contributions
            </div>
          </div>
        )}

        {/* Month Labels Axis */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#6B5845] pt-1">
          {points.map((p) => (
            <span key={p.month}>{p.month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
