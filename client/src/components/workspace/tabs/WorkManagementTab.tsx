import { useState } from 'react';
import {
  WorkspaceData,
  WorkspaceWorkstream,
  WorkItem,
  WorkStatus,
} from '../../../types/workspace';
import {
  updateWorkItemStatus,
  addWorkItem,
} from '../../../services/workspaceApi';
import {
  Layers,
  CheckCircle2,
  Radio,
  Clock,
  AlertCircle,
  Plus,
  ChevronDown,
  ChevronUp,
  X,
  MessageSquare,
  Send,
} from 'lucide-react';

interface WorkManagementTabProps {
  data: WorkspaceData;
  onRefresh: () => void;
}

export function WorkManagementTab({ data, onRefresh }: WorkManagementTabProps) {
  const [expandedStreams, setExpandedStreams] = useState<Record<string, boolean>>({
    'ws-field': true,
    'ws-data': true,
    'ws-maint': true,
  });
  const [activeItem, setActiveItem] = useState<WorkItem | null>(null);
  const [newComment, setNewComment] = useState('');
  const [addModalStreamId, setAddModalStreamId] = useState<string | null>(null);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemOwner, setNewItemOwner] = useState('Hardware Team');
  const [newItemDue, setNewItemDue] = useState('Next Week');

  const toggleStream = (id: string) => {
    setExpandedStreams((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStatusChange = async (item: WorkItem, newStatus: WorkStatus) => {
    await updateWorkItemStatus(data.context.projectId, item.id, newStatus);
    item.status = newStatus;
    if (newStatus === 'COMPLETED') item.progress = 100;
    if (activeItem?.id === item.id) {
      setActiveItem({ ...item });
    }
    onRefresh();
  };

  const handleAddComment = () => {
    if (!activeItem || !newComment.trim()) return;
    activeItem.comments.push({
      id: `c-${Date.now()}`,
      authorName: data.context.currentUserName,
      authorRole: 'Project Lead',
      content: newComment.trim(),
      createdAt: 'Just now',
    });
    setNewComment('');
    setActiveItem({ ...activeItem });
    onRefresh();
  };

  const handleCreateWorkItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addModalStreamId || !newItemTitle.trim()) return;

    await addWorkItem(data.context.projectId, addModalStreamId, {
      title: newItemTitle.trim(),
      description: newItemDesc.trim(),
      status: 'NOT_STARTED',
      progress: 0,
      ownerName: newItemOwner,
      ownerRole: 'Contributor',
      dueDate: newItemDue,
    });

    setAddModalStreamId(null);
    setNewItemTitle('');
    setNewItemDesc('');
    onRefresh();
  };

  const getStatusBadge = (status: WorkStatus) => {
    switch (status) {
      case 'COMPLETED':
        return {
          icon: <CheckCircle2 className="h-3.5 w-3.5 text-[#15803D]" />,
          style: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
          label: 'Completed',
        };
      case 'IN_PROGRESS':
        return {
          icon: <Radio className="h-3.5 w-3.5 text-[#F5A623] animate-pulse" />,
          style: 'bg-[#FFFDF9] text-[#B45309] border-[#FDE68A]',
          label: 'In Progress',
        };
      case 'IN_REVIEW':
        return {
          icon: <Clock className="h-3.5 w-3.5 text-[#7E22CE]" />,
          style: 'bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]',
          label: 'In Review',
        };
      case 'BLOCKED':
        return {
          icon: <AlertCircle className="h-3.5 w-3.5 text-[#BE123C]" />,
          style: 'bg-[#FFF5F5] text-[#BE123C] border-[#FECDD3]',
          label: 'Blocked',
        };
      case 'NOT_STARTED':
      default:
        return {
          icon: <Clock className="h-3.5 w-3.5 text-[#6B5845]" />,
          style: 'bg-[#FAF9F5] text-[#6B5845] border-[#EEEAE1]',
          label: 'Not Started',
        };
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-2">
        <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <Layers className="h-3.5 w-3.5 text-[#F5A623]" />
          <span>WORKSTREAM ARCHITECTURE</span>
        </div>
        <h2 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Work Management & Task Allocation
        </h2>
        <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
          Structured workstreams aligned to research, prototype fabrication, and gram panchayat installation.
        </p>
      </div>

      {/* ── Workstreams Accordion List ── */}
      <div className="space-y-4">
        {data.workstreams.map((stream: WorkspaceWorkstream) => {
          const isExpanded = expandedStreams[stream.id] ?? true;

          return (
            <div
              key={stream.id}
              className="rounded-3xl border border-[#EEEAE1] bg-white overflow-hidden shadow-2xs text-left"
            >
              {/* Stream Header */}
              <div
                onClick={() => toggleStream(stream.id)}
                className="p-5 sm:p-6 bg-[#FAF9F5] border-b border-[#EEEAE1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[1.1rem] font-extrabold font-mono uppercase text-[#123B2A] tracking-wider">
                      {stream.title}
                    </h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-[#6B5845] border border-[#EEEAE1]">
                      {stream.status}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#6B5845]">
                    {stream.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-[12px] font-mono font-bold text-[#1D2522] block">
                      {stream.progressText}
                    </span>
                    <span className="text-[10.5px] font-mono text-[#15803D] block">
                      {stream.metric}
                    </span>
                  </div>

                  <div className="p-1 text-[#6B5845]">
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Stream Items List */}
              {isExpanded && (
                <div className="p-5 sm:p-6 space-y-3 bg-white">
                  <div className="space-y-2.5">
                    {stream.items.map((item) => {
                      const badge = getStatusBadge(item.status);

                      return (
                        <div
                          key={item.id}
                          onClick={() => setActiveItem(item)}
                          className="p-4 rounded-2xl border border-[#EEEAE1] hover:border-[#123B2A]/40 bg-white hover:bg-[#FAF9F5]/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left group"
                        >
                          <div className="space-y-1 min-w-0">
                            <h4 className="text-[13.5px] font-bold text-[#1D2522] group-hover:text-[#123B2A] transition-colors leading-snug">
                              {item.title}
                            </h4>
                            <div className="flex items-center gap-3 text-[11px] font-mono text-[#6B5845]">
                              <span>Owner: <strong className="text-[#1D2522]">{item.ownerName}</strong></span>
                              <span>·</span>
                              <span>Due: {item.dueDate}</span>
                              {item.comments.length > 0 && (
                                <>
                                  <span>·</span>
                                  <span className="flex items-center gap-1 text-[#123B2A]">
                                    <MessageSquare className="h-3 w-3" />
                                    {item.comments.length}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-3">
                            <span
                              className={`inline-flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md border ${badge.style}`}
                            >
                              {badge.icon}
                              <span>{badge.label}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Item Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setAddModalStreamId(stream.id)}
                      className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#123B2A] hover:bg-[#FAF9F5] px-3 py-1.5 rounded-lg border border-dashed border-[#123B2A]/30 transition-colors cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add Work Item to {stream.title}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Work Item Detail / Status Modal ── */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 text-left">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-[#EEEAE1] space-y-4">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1 pr-6">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#123B2A]">
                WORK ITEM DOSSIER
              </span>
              <h3 className="text-[1.3rem] font-bold text-[#1D2522] font-sans leading-snug">
                {activeItem.title}
              </h3>
            </div>

            <p className="text-[13px] text-[#6B5845] leading-relaxed">
              {activeItem.description || 'Operating under active consortium sprint plan.'}
            </p>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] text-[12px]">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#6B5845] block">
                  ASSIGNED OWNER
                </span>
                <span className="font-semibold text-[#1D2522] block mt-0.5">
                  {activeItem.ownerName} ({activeItem.ownerRole})
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#6B5845] block">
                  DUE DATE
                </span>
                <span className="font-semibold text-[#1D2522] block mt-0.5">
                  {activeItem.dueDate}
                </span>
              </div>
            </div>

            {/* Change Status Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                Workflow Status:
              </label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['NOT_STARTED', 'IN_PROGRESS', 'IN_REVIEW', 'COMPLETED', 'BLOCKED'] as WorkStatus[]).map(
                  (st) => {
                    const isCurrent = activeItem.status === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusChange(activeItem, st)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-[#123B2A] text-white shadow-2xs'
                            : 'bg-[#FAF9F5] text-[#6B5845] border border-[#EEEAE1] hover:bg-white'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Comments Thread */}
            <div className="space-y-2 pt-2 border-t border-[#EEEAE1]">
              <span className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                Internal Sprint Notes ({activeItem.comments.length})
              </span>

              <div className="max-h-32 overflow-y-auto space-y-2 pr-1">
                {activeItem.comments.map((c) => (
                  <div
                    key={c.id}
                    className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-[12px] space-y-0.5"
                  >
                    <div className="flex items-center justify-between font-mono text-[10.5px] text-[#6B5845]">
                      <strong className="text-[#123B2A]">{c.authorName}</strong>
                      <span>{c.createdAt}</span>
                    </div>
                    <p className="text-[#1D2522]">{c.content}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Post brief update or observation..."
                  className="flex-1 h-9 px-3 rounded-xl border border-[#EEEAE1] text-[12.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <button
                  type="button"
                  onClick={handleAddComment}
                  className="h-9 px-3 rounded-xl bg-[#123B2A] text-white text-[12px] font-bold inline-flex items-center justify-center cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Work Item Modal ── */}
      {addModalStreamId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 text-left">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-[#EEEAE1] space-y-4">
            <button
              onClick={() => setAddModalStreamId(null)}
              className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#123B2A]">
                NEW WORKSTREAM ITEM
              </span>
              <h3 className="text-[1.3rem] font-bold text-[#1D2522] font-sans">
                Add Operational Task
              </h3>
            </div>

            <form onSubmit={handleCreateWorkItem} className="space-y-3 text-[13px]">
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  placeholder="e.g. Conduct second-round ultrasonic sensor test"
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  placeholder="Specific requirements, test locations, or lab equipment needed..."
                  className="w-full p-2.5 rounded-xl border border-[#EEEAE1] text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                    Owner
                  </label>
                  <input
                    type="text"
                    value={newItemOwner}
                    onChange={(e) => setNewItemOwner(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] text-[12.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                    Due Date
                  </label>
                  <input
                    type="text"
                    value={newItemDue}
                    onChange={(e) => setNewItemDue(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] text-[12.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EEEAE1]">
                <button
                  type="button"
                  onClick={() => setAddModalStreamId(null)}
                  className="px-4 py-2 rounded-xl text-[12.5px] font-semibold text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#123B2A] text-white text-[12.5px] font-bold shadow-xs cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
