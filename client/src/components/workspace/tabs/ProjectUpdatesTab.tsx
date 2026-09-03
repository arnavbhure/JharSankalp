import { useState } from 'react';
import {
  WorkspaceData,
  UpdateType,
} from '../../../types/workspace';
import { createUpdate, resolveIssue } from '../../../services/workspaceApi';
import {
  MessageSquare,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Send,
  Flag,
  Sparkles,
} from 'lucide-react';

interface ProjectUpdatesTabProps {
  data: WorkspaceData;
  onRefresh: () => void;
}

export function ProjectUpdatesTab({ data, onRefresh }: ProjectUpdatesTabProps) {
  const [postType, setPostType] = useState<UpdateType>('field_observation');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handlePostUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsPosting(true);
    try {
      await createUpdate(data.context.projectId, {
        type: postType,
        title: title.trim(),
        content: content.trim(),
        authorName: data.context.currentUserName,
        authorRole: 'Project Lead',
        resolved: postType === 'issue' ? false : undefined,
      });
      setTitle('');
      setContent('');
      onRefresh();
    } finally {
      setIsPosting(false);
    }
  };

  const handleResolveIssue = async (updateId: string) => {
    await resolveIssue(data.context.projectId, updateId);
    onRefresh();
  };

  const getTypeBadge = (type: UpdateType, resolved?: boolean) => {
    switch (type) {
      case 'field_observation':
        return {
          label: 'FIELD OBSERVATION',
          style: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
          icon: <Radio className="h-3 w-3 text-[#F5A623] animate-pulse" />,
        };
      case 'decision':
        return {
          label: 'DECISION LOG',
          style: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
          icon: <CheckCircle2 className="h-3 w-3" />,
        };
      case 'issue':
        return {
          label: resolved ? 'ISSUE (RESOLVED)' : 'OPEN BLOCKER',
          style: resolved
            ? 'bg-[#FAF9F5] text-[#6B5845] border-[#EEEAE1]'
            : 'bg-[#FFF5F5] text-[#BE123C] border-[#FECDD3]',
          icon: <AlertTriangle className="h-3 w-3" />,
        };
      case 'announcement':
        return {
          label: 'ANNOUNCEMENT',
          style: 'bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]',
          icon: <Sparkles className="h-3 w-3" />,
        };
      case 'progress':
      default:
        return {
          label: 'PROGRESS UPDATE',
          style: 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]',
          icon: <Flag className="h-3 w-3" />,
        };
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header Banner */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-2">
        <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <MessageSquare className="h-3.5 w-3.5 text-[#F5A623]" />
          <span>CONSORTIUM COMMUNICATIONS</span>
        </div>
        <h2 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Project Updates & Field Dispatch
        </h2>
        <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
          Broadcast telemetry observations, governance decisions, and field obstacles directly to the project team.
        </p>
      </div>

      {/* ── Create Update Composer ── */}
      <div className="rounded-3xl border-2 border-[#123B2A]/30 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
        <span className="text-[11.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A] block">
          Share an update with the project team...
        </span>

        <form onSubmit={handlePostUpdate} className="space-y-3 text-[13px]">
          {/* Type Selector Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {(
              [
                'field_observation',
                'progress',
                'decision',
                'issue',
                'announcement',
              ] as UpdateType[]
            ).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setPostType(t)}
                className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  postType === t
                    ? 'bg-[#123B2A] text-white'
                    : 'bg-[#FAF9F5] text-[#6B5845] border border-[#EEEAE1] hover:bg-white'
                }`}
              >
                {t.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>

          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Update Headline (e.g. Siyankel water point telemetry synchronized)..."
            className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
          />

          <textarea
            rows={3}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Provide technical specifics, village context, or required action from other consortium members..."
            className="w-full p-3 rounded-xl border border-[#EEEAE1] text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A] leading-relaxed"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-mono text-[#6B5845]">
              Posting as <strong className="text-[#1D2522]">{data.context.currentUserName}</strong> ({data.context.currentUserRole})
            </span>

            <button
              type="submit"
              disabled={isPosting}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[12.5px] font-bold shadow-xs transition-all cursor-pointer disabled:opacity-60"
            >
              <Send className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>{isPosting ? 'Publishing...' : 'Broadcast Update'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* ── Updates Feed ── */}
      <div className="space-y-3.5">
        {data.updates.map((upd) => {
          const badge = getTypeBadge(upd.type, upd.resolved);

          return (
            <div
              key={upd.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all shadow-2xs space-y-3 text-left ${
                upd.type === 'issue' && !upd.resolved
                  ? 'border-2 border-[#BE123C]/50 bg-[#FFFDF9]'
                  : 'border-[#EEEAE1] bg-white'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EEEAE1]/80 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[10.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md border ${badge.style}`}
                  >
                    {badge.icon}
                    <span>{badge.label}</span>
                  </span>
                  <span className="text-[#EEEAE1]">·</span>
                  <span className="text-[11px] font-mono text-[#6B5845]">
                    {upd.createdAt}
                  </span>
                </div>

                <div className="text-[11.5px] font-mono text-[#6B5845]">
                  Posted by <strong className="text-[#1D2522]">{upd.authorName}</strong> ({upd.authorRole})
                </div>
              </div>

              <h3 className="text-[15px] font-bold text-[#1D2522]">
                {upd.title}
              </h3>

              <p className="text-[13.5px] text-[#1D2522] leading-relaxed">
                {upd.content}
              </p>

              {/* Issue Resolution Action */}
              {upd.type === 'issue' && !upd.resolved && (
                <div className="pt-2 border-t border-[#EEEAE1] flex items-center justify-between">
                  <span className="text-[11.5px] font-mono font-bold text-[#BE123C]">
                    Requires Technical Attention
                  </span>

                  <button
                    type="button"
                    onClick={() => handleResolveIssue(upd.id)}
                    className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#15803D] hover:underline cursor-pointer"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Mark Issue Resolved</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
