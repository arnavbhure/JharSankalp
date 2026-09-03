import { useState } from 'react';
import {
  WorkspaceData,
  WorkspaceDocument,
  DocumentCategory,
} from '../../../types/workspace';
import { uploadDocument } from '../../../services/workspaceApi';
import {
  FileText,
  Upload,
  Download,
  Eye,
  X,
  Check,
} from 'lucide-react';

interface DocumentsTabProps {
  data: WorkspaceData;
  onRefresh: () => void;
}

const CATEGORIES: DocumentCategory[] = [
  'Research',
  'Technical',
  'Field Operations',
  'Reports',
  'Data',
  'Administration',
];

export function DocumentsTab({ data, onRefresh }: DocumentsTabProps) {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedDoc, setSelectedDoc] = useState<WorkspaceDocument | null>(null);
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<DocumentCategory>('Technical');
  const [docType, setDocType] = useState<'PDF' | 'Technical Document' | 'Dataset'>('PDF');
  const [submitting, setSubmitting] = useState(false);

  const handleDownload = (doc: WorkspaceDocument) => {
    setDownloadMsg(`Downloading ${doc.title}...`);
    setTimeout(() => setDownloadMsg(null), 2500);
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;

    setSubmitting(true);
    try {
      await uploadDocument(data.context.projectId, {
        title: docTitle.trim(),
        category: docCategory,
        type: docType,
        uploadedBy: data.context.currentUserName,
        size: '2.4 MB',
      });
      setUploadOpen(false);
      setDocTitle('');
      onRefresh();
    } finally {
      setSubmitting(false);
    }
  };

  const filteredDocs =
    activeCategory === 'ALL'
      ? data.documents
      : data.documents.filter((d) => d.category === activeCategory);

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            <FileText className="h-3.5 w-3.5 text-[#F5A623]" />
            <span>KNOWLEDGE REPOSITORY</span>
          </div>
          <h2 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
            Structured Project Documentation
          </h2>
          <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
            Technical schematics, telemetry logs, SOPs, and administrative accords archived for long-term institutional provenance.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-xs transition-all active:scale-[0.98] shrink-0 cursor-pointer"
        >
          <Upload className="h-4 w-4 text-[#F5A623]" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Category Tabs Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none scrollbar-none">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#EEEAE1]">
          <button
            type="button"
            onClick={() => setActiveCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-[12px] font-mono font-bold transition-all cursor-pointer ${
              activeCategory === 'ALL'
                ? 'bg-[#123B2A] text-white'
                : 'text-[#6B5845] hover:text-[#1D2522]'
            }`}
          >
            All Categories ({data.documents.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = data.documents.filter((d) => d.category === cat).length;
            const isSelected = activeCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-mono font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#123B2A] text-white'
                    : 'text-[#6B5845] hover:text-[#1D2522]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {downloadMsg && (
        <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[12px] font-mono font-bold text-[#15803D] flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>{downloadMsg}</span>
        </div>
      )}

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-2xl border border-[#EEEAE1] bg-white hover:border-[#123B2A]/40 transition-colors shadow-2xs flex flex-col justify-between space-y-3 text-left"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10.5px] font-mono text-[#6B5845]">
                <span className="font-bold text-[#123B2A] bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#EEEAE1]">
                  {doc.category}
                </span>
                <span>{doc.size}</span>
              </div>

              <h4 className="text-[14px] font-bold text-[#1D2522] leading-snug">
                {doc.title}
              </h4>

              <div className="text-[11.5px] text-[#6B5845] font-mono">
                <span>Uploaded by {doc.uploadedBy}</span> · <span>{doc.uploadDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#EEEAE1] text-[12px]">
              <span className="font-mono text-[11px] text-[#123B2A] font-bold">
                {doc.type}
              </span>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(doc)}
                  className="p-1.5 rounded-lg hover:bg-[#FAF9F5] text-[#6B5845] hover:text-[#123B2A] cursor-pointer"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload(doc)}
                  className="p-1.5 rounded-lg hover:bg-[#FAF9F5] text-[#6B5845] hover:text-[#123B2A] cursor-pointer"
                  title="Download Document"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Document Details Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 text-left">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-[#EEEAE1] space-y-4">
            <button
              onClick={() => setSelectedDoc(null)}
              className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#123B2A]">
                DOCUMENT REPOSITORY
              </span>
              <h3 className="text-[1.3rem] font-bold text-[#1D2522] font-sans">
                {selectedDoc.title}
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-1 text-[12.5px] text-[#6B5845]">
              <p>Category: <strong className="text-[#1D2522]">{selectedDoc.category}</strong></p>
              <p>Format: <strong className="text-[#1D2522]">{selectedDoc.type} ({selectedDoc.size})</strong></p>
              <p>Archived by: <strong className="text-[#1D2522]">{selectedDoc.uploadedBy}</strong></p>
              <p>Timestamp: <strong className="text-[#1D2522]">{selectedDoc.uploadDate}</strong></p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EEEAE1]">
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-xl text-[12.5px] font-semibold text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownload(selectedDoc);
                  setSelectedDoc(null);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#123B2A] text-white text-[12.5px] font-bold shadow-xs cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {uploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 text-left">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-[#EEEAE1] space-y-4">
            <button
              onClick={() => setUploadOpen(false)}
              className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#123B2A]">
                ARCHIVE NEW ARTIFACT
              </span>
              <h3 className="text-[1.3rem] font-bold text-[#1D2522] font-sans">
                Upload Project Document
              </h3>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-[13px]">
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="e.g. India Mark II LoRa Transmitter Placement Report"
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                    Category
                  </label>
                  <select
                    value={docCategory}
                    onChange={(e) => setDocCategory(e.target.value as DocumentCategory)}
                    className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A] cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                    File Type
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A] cursor-pointer"
                  >
                    <option value="PDF">PDF Report</option>
                    <option value="Technical Document">Technical Document</option>
                    <option value="Dataset">Dataset (CSV / JSON)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl border-2 border-dashed border-[#EEEAE1] text-center space-y-1 bg-[#FAF9F5]">
                <Upload className="h-6 w-6 text-[#6B5845] mx-auto" />
                <span className="text-[12px] font-semibold text-[#1D2522] block">
                  Click to select file or drag and drop
                </span>
                <span className="text-[10.5px] font-mono text-[#6B5845] block">
                  PDF, DOCX, CSV up to 50MB
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EEEAE1]">
                <button
                  type="button"
                  onClick={() => setUploadOpen(false)}
                  className="px-4 py-2 rounded-xl text-[12.5px] font-semibold text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-[#123B2A] text-white text-[12.5px] font-bold shadow-xs cursor-pointer disabled:opacity-60"
                >
                  {submitting ? 'Archiving...' : 'Upload File'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
