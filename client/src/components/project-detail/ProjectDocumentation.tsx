import { useState } from 'react';
import { ProjectDetail, ProjectDocument } from '../../types/projectDetail';
import { FileText, Download, Eye, Check, X } from 'lucide-react';

interface ProjectDocumentationProps {
  project: ProjectDetail;
}

export function ProjectDocumentation({ project }: ProjectDocumentationProps) {
  const [activeDoc, setActiveDoc] = useState<ProjectDocument | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const handleDownload = (doc: ProjectDocument) => {
    setDownloadNotice(`Downloading ${doc.title}...`);
    setTimeout(() => setDownloadNotice(null), 2500);
  };

  return (
    <section className="space-y-6 text-left">
      <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="space-y-1 border-b border-[#EEEAE1] pb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
              <FileText className="h-4 w-4 text-[#F5A623]" />
              <span>OPEN RESEARCH REPOSITORY</span>
            </div>
            <h3 className="text-[1.5rem] sm:text-[1.75rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
              Knowledge & documentation
            </h3>
          </div>

          {downloadNotice && (
            <span className="inline-flex items-center gap-1.5 text-[11.5px] font-mono font-bold text-[#15803D] bg-[#F0FDF4] px-3 py-1 rounded-md border border-[#BBF7D0]">
              <Check className="h-3.5 w-3.5" />
              {downloadNotice}
            </span>
          )}
        </div>

        {/* ── Document Rows ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {project.documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] hover:border-[#123B2A]/40 transition-colors flex items-center justify-between gap-4 text-left"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-white border border-[#EEEAE1] text-[#123B2A] flex items-center justify-center shrink-0 shadow-2xs">
                  <FileText className="h-5 w-5 text-[#123B2A]" />
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
                  onClick={() => setActiveDoc(doc)}
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
              <span className="text-[11px] font-mono font-bold uppercase text-[#123B2A]">
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
                This document details the telemetry firmware benchmarks, sensor sensitivity thresholds, and mechanical mounting specifications established for India Mark II handpumps during the Murhu Block pilot.
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
