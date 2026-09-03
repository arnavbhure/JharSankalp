import { useState } from 'react';
import { WorkspaceData, WorkspaceMilestone, MilestoneStatus } from '../../../types/workspace';
import { updateMilestone } from '../../../services/workspaceApi';
import {
  Calendar,
  CheckCircle2,
  Radio,
  Clock,
  AlertCircle,
  FileText,
  User,
  X,
  Edit3,
  Check,
} from 'lucide-react';

interface RoadmapTabProps {
  data: WorkspaceData;
  onRefresh: () => void;
}

export function RoadmapTab({ data, onRefresh }: RoadmapTabProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<WorkspaceMilestone | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editStatus, setEditStatus] = useState<MilestoneStatus>('IN_PROGRESS');
  const [editProgress, setEditProgress] = useState(0);
  const [saving, setSaving] = useState(false);

  const handleOpenDetail = (ms: WorkspaceMilestone) => {
    setSelectedMilestone(ms);
    setEditStatus(ms.status);
    setEditProgress(ms.progress);
    setIsEditing(false);
  };

  const handleSaveMilestone = async () => {
    if (!selectedMilestone) return;
    setSaving(true);
    try {
      await updateMilestone(data.context.projectId, selectedMilestone.id, {
        status: editStatus,
        progress: editProgress,
      });
      selectedMilestone.status = editStatus;
      selectedMilestone.progress = editProgress;
      setIsEditing(false);
      onRefresh();
    } finally {
      setSaving(false);
    }
  };

  const handleMarkCompleted = async (ms: WorkspaceMilestone) => {
    await updateMilestone(data.context.projectId, ms.id, {
      status: 'COMPLETED',
      progress: 100,
    });
    ms.status = 'COMPLETED';
    ms.progress = 100;
    if (selectedMilestone?.id === ms.id) {
      setSelectedMilestone({ ...ms });
    }
    onRefresh();
  };

  const getStatusBadge = (status: MilestoneStatus) => {
    switch (status) {
      case 'COMPLETED':
        return {
          icon: <CheckCircle2 className="h-4 w-4 text-[#15803D]" />,
          style: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
          label: 'Completed',
        };
      case 'IN_PROGRESS':
        return {
          icon: <Radio className="h-4 w-4 text-[#F5A623] animate-pulse" />,
          style: 'bg-[#FFFDF9] text-[#B45309] border-[#FDE68A]',
          label: 'In Progress',
        };
      case 'UNDER_REVIEW':
        return {
          icon: <Clock className="h-4 w-4 text-[#7E22CE]" />,
          style: 'bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]',
          label: 'Under Review',
        };
      case 'BLOCKED':
        return {
          icon: <AlertCircle className="h-4 w-4 text-[#BE123C]" />,
          style: 'bg-[#FFF5F5] text-[#BE123C] border-[#FECDD3]',
          label: 'Blocked',
        };
      case 'UPCOMING':
      case 'PLANNED':
      case 'NOT_STARTED':
      default:
        return {
          icon: <Clock className="h-4 w-4 text-[#6B5845]" />,
          style: 'bg-[#FAF9F5] text-[#6B5845] border-[#EEEAE1]',
          label: status.replace('_', ' '),
        };
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-2">
        <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Calendar className="h-3.5 w-3.5 text-[#F5A623]" />
          <span>ROADMAP GOVERNANCE</span>
        </div>
        <h2 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Project Milestones & Delivery Schedule
        </h2>
        <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
          Manage contractual, academic, and field pilot milestones. Click any milestone to update
          progress, inspect deliverables, or mark completed.
        </p>
      </div>

      {/* Milestone List Cards */}
      <div className="space-y-3.5">
        {data.milestones.map((ms) => {
          const badge = getStatusBadge(ms.status);

          return (
            <div
              key={ms.id}
              onClick={() => handleOpenDetail(ms)}
              className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left group shadow-2xs ${
                ms.status === 'IN_PROGRESS'
                  ? 'border-2 border-[#123B2A] bg-[#FFFDF9]'
                  : 'border-[#EEEAE1] bg-white hover:border-[#123B2A]/40'
              }`}
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="mt-0.5">{badge.icon}</div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B5845] flex-wrap">
                    <span className="font-bold text-[#123B2A]">{ms.phase}</span>
                    <span>·</span>
                    <span>{ms.period}</span>
                    <span>·</span>
                    <span>Target: {ms.targetDate}</span>
                  </div>

                  <h3 className="text-[15px] font-bold text-[#1D2522] group-hover:text-[#123B2A] transition-colors leading-snug">
                    {ms.title}
                  </h3>

                  <p className="text-[13px] text-[#6B5845] leading-relaxed line-clamp-1">
                    {ms.description}
                  </p>
                </div>
              </div>

              {/* Status & Progress Bar */}
              <div className="shrink-0 flex items-center gap-4 sm:border-l sm:border-[#EEEAE1] sm:pl-6">
                <div className="w-28 space-y-1 text-right">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#6B5845]">Progress:</span>
                    <strong className="text-[#123B2A]">{ms.progress}%</strong>
                  </div>
                  <div className="h-1.5 w-full bg-[#EEEAE1] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${ms.progress}%` }}
                      className="h-full bg-[#123B2A] rounded-full"
                    />
                  </div>
                </div>

                <span
                  className={`text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded-md border ${badge.style}`}
                >
                  {badge.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Interactive Milestone Detail Dialog ── */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 text-left">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#EEEAE1] space-y-5">
            <button
              onClick={() => setSelectedMilestone(null)}
              className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1 pr-6">
              <div className="flex items-center gap-2 text-[10.5px] font-mono text-[#6B5845]">
                <span className="font-bold text-[#123B2A]">{selectedMilestone.phase}</span>
                <span>·</span>
                <span>{selectedMilestone.period}</span>
              </div>
              <h3 className="text-[1.35rem] font-bold text-[#1D2522] font-sans leading-snug">
                {selectedMilestone.title}
              </h3>
            </div>

            <p className="text-[13px] text-[#6B5845] leading-relaxed">
              {selectedMilestone.description}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] text-[12px]">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#6B5845] block">
                  OWNER INSTITUTION
                </span>
                <span className="font-semibold text-[#1D2522] flex items-center gap-1 mt-0.5">
                  <User className="h-3 w-3 text-[#123B2A]" />
                  {selectedMilestone.owner}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#6B5845] block">
                  SCHEDULE WINDOW
                </span>
                <span className="font-semibold text-[#1D2522] block mt-0.5">
                  {selectedMilestone.startDate} → {selectedMilestone.targetDate}
                </span>
              </div>
            </div>

            {/* Deliverables List */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold uppercase text-[#123B2A] flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Required Milestone Deliverables:
              </span>
              <ul className="list-disc list-inside space-y-1 text-[12.5px] text-[#1D2522]">
                {selectedMilestone.deliverables.map((del, i) => (
                  <li key={i}>{del}</li>
                ))}
              </ul>
            </div>

            {/* Editing Controls */}
            {isEditing ? (
              <div className="p-4 rounded-2xl border border-[#FDE68A] bg-[#FFFDF9] space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                    Update Status:
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as MilestoneStatus)}
                    className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A] cursor-pointer"
                  >
                    <option value="NOT_STARTED">Not Started</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="BLOCKED">Blocked</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold text-[#123B2A]">Progress:</span>
                    <span>{editProgress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editProgress}
                    onChange={(e) => setEditProgress(Number(e.target.value))}
                    className="w-full cursor-pointer accent-[#123B2A]"
                  />
                </div>
              </div>
            ) : null}

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-[#EEEAE1]">
              {selectedMilestone.status !== 'COMPLETED' ? (
                <button
                  type="button"
                  onClick={() => handleMarkCompleted(selectedMilestone)}
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#15803D] hover:underline cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Mark Completed</span>
                </button>
              ) : (
                <span className="text-[11.5px] font-mono text-[#15803D] font-bold">
                  ✓ Milestone Completed
                </span>
              )}

              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 rounded-lg text-[12px] text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveMilestone}
                      disabled={saving}
                      className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-[#123B2A] text-white text-[12px] font-bold cursor-pointer"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#123B2A] text-white text-[12.5px] font-bold hover:bg-[#0D2B1E] transition-colors cursor-pointer"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>Update Milestone</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
