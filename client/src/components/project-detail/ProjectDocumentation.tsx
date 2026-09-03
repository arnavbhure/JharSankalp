import { useState } from 'react';
import { ProjectDetail, ProjectDocument } from '../../types/projectDetail';
import { FileText, Download, Eye, Check, X, FolderOpen, Image as ImageIcon } from 'lucide-react';

interface ProjectDocumentationProps {
  project: ProjectDetail;
}

export function ProjectDocumentation({ project }: ProjectDocumentationProps) {
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [activeDoc, setActiveDoc] = useState<ProjectDocument | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const categories = [
    { key: 'ALL', label: 'All Artifacts' },
    { key: 'PROTOTYPE', label: 'Prototype Documentation' },
    { key: 'FIELD_REPORT', label: 'Field Reports' },
    { key: 'RESEARCH', label: 'Research Documents' },
    { key: 'MEDIA', label: 'Images & Media' },
  ];

  // Enhanced document records with category
  const allDocs = [
    ...project.documents.map((d, i) => ({
      ...d,
      category: i === 0 ? 'FIELD_REPORT' : i === 1 ? 'PROTOTYPE' : 'RESEARCH',
    })),
    {
      id: 'doc-media-1',
      title: 'Handpump Telemetry Sensor Collar Installation Photo',
      type: 'JPG Image',
      size: '1.2 MB',
      date: '10 Feb 2026',
      category: 'MEDIA',
    },
    {
      id: 'doc-media-2',
      title: 'Murhu Village Jal Sahiya Community Review Session',
      type: 'JPG Image',
      size: '2.8 MB',
      date: '18 Feb 2026',
      category: 'MEDIA',
    },
  ];

  const filteredDocs = activeTab === 'ALL' ? allDocs : allDocs.filter((d) => d.category === activeTab);

  const handleDownload = (doc: any) => {
    setDownloadNotice(`Downloading ${doc.title}...`);
    setTimeout(() => setDownloadNotice(null), 2500);
  };

  return (
    <section id="documents" className="scroll-mt-32 space-y-6 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#4C1E4F]">
              <FolderOpen className="h-4 w-4 text-[#FA7E61]" />
              <span>EVIDENCE & OPEN ARTIFACTS</span>
            </div>
            <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Documentation, Field Reports & Evidence
            </h3>
            <p className="text-[13.5px] text-[#6B5845] max-w-2xl leading-relaxed">
              Open technical blueprints, ground inspection datasets, and multi-media evidence published by the project team.
            </p>
          </div>

          {downloadNotice && (
            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-mono font-bold text-[#15803D] bg-[#F0FDF4] px-3 py-1 rounded-md border border-[#BBF7D0]">
              <Check className="h-3.5 w-3.5" />
              {downloadNotice}
            </span>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveTab(cat.key)}
              className={`px-3.5 py-1.5 rounded-xl text-[12px] font-mono font-bold transition-all cursor-pointer ${
                activeTab === cat.key
                  ? 'bg-[#4C1E4F] text-white shadow-xs'
                  : 'bg-[#FAF9F5] hover:bg-[#F8F6F1] text-[#6B5845] border border-[#EEEAE1]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Document Rows ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:border-[#123B2A]/40 transition-colors flex items-center justify-between gap-4 text-left"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-white border border-[#EEEAE1] text-[#123B2A] flex items-center justify-center shrink-0 shadow-2xs">
                  {doc.category === 'MEDIA' ? (
                    <ImageIcon className="h-5 w-5 text-[#FA7E61]" />
                  ) : (
                    <FileText className="h-5 w-5 text-[#4C1E4F]" />
                  )}
                </div>

                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-[13.5px] font-bold text-[#1D2522] truncate">
                    {doc.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#6B5845]">
                    <span className="font-semibold text-[#123B2A]">{doc.type}</span>
                    <span>·</span>
                    <span>{doc.size}</span>
                    <span>·</span>
                    <span>{doc.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveDoc(doc as any)}
                  className="p-2 rounded-lg hover:bg-white text-[#6B5845] hover:text-[#123B2A] transition-colors cursor-pointer"
                  title="View Document Summary"
                >
                  <Eye className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDownload(doc)}
                  className="p-2 rounded-lg hover:bg-white text-[#6B5845] hover:text-[#123B2A] transition-colors cursor-pointer"
                  title="Download File"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Preview Modal */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 text-left">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-[#EEEAE1] space-y-4">
            <button
              onClick={() => setActiveDoc(null)}
              className="absolute right-5 top-5 p-2 text-[#6B5845] hover:text-[#1D2522] rounded-lg transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1 pr-6">
              <span className="text-[11px] font-mono font-bold uppercase text-[#4C1E4F]">
                DOCUMENT PREVIEW
              </span>
              <h3 className="text-[1.35rem] font-bold text-[#1D2522] font-sans">
                {activeDoc.title}
              </h3>
              <p className="text-[12px] font-mono text-[#6B5845]">
                {activeDoc.type} · {activeDoc.size} · Published {activeDoc.date}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-2 text-[13px] text-[#1D2522]">
              <p className="leading-relaxed">
                This verified open-access dossier documents the engineering specifications, telemetry calibration logs, and local community review signatures recorded in {project.location}.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EEEAE1]">
              <button
                type="button"
                onClick={() => setActiveDoc(null)}
                className="px-4 py-2 rounded-xl text-[13px] font-semibold text-[#6B5845] hover:bg-[#FAF9F5] cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownload(activeDoc);
                  setActiveDoc(null);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-xs cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download Artifact</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
