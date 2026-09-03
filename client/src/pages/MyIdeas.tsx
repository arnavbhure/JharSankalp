import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMySubmittedIdeas } from '../services/ideaSubmissionApi';
import { Plus, Target, Clock, ArrowRight, Lightbulb } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

interface StoredIdea {
  referenceId: string;
  title: string;
  challengeTitle: string;
  submittedDate: string;
  status: string;
  formData: {
    category?: string;
    stage?: string;
    summary?: string;
  };
}

export function MyIdeas() {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState<StoredIdea[]>([]);

  useEffect(() => {
    const list = getMySubmittedIdeas();
    setIdeas(list);
  }, []);

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[#EEEAE1] bg-white py-12 text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
                <Lightbulb className="h-4 w-4 text-[#F5A623]" />
                <span>MY CONTRIBUTION · INNOVATOR DOSSIER</span>
              </div>
              <h1 className="text-[2.2rem] sm:text-[2.8rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
                My Proposed Ideas
              </h1>
              <p className="text-[15px] text-[#6B5845] max-w-xl leading-relaxed">
                Track review status, peer evaluations, and collaborator interest for solution ideas you submitted to JharSankalp.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/submit-idea')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <Plus className="h-4 w-4 text-[#F5A623] stroke-[3]" />
              <span>Submit Another Idea</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full space-y-6">
        {ideas.length === 0 ? (
          <div className="rounded-3xl border border-[#EEEAE1] bg-white p-12 text-center space-y-4 shadow-2xs">
            <div className="h-14 w-14 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] flex items-center justify-center text-[#123B2A] mx-auto">
              <Lightbulb className="h-7 w-7 text-[#F5A623]" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-[1.3rem] font-bold text-[#1D2522]">
                No ideas submitted yet.
              </h3>
              <p className="text-[13.5px] text-[#6B5845] leading-relaxed">
                Have a hypothesis or prototype that could solve an open societal challenge in Jharkhand? Submit it to connect with labs and collaborators.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/submit-idea')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#123B2A] text-white text-[13.5px] font-bold shadow-xs cursor-pointer"
              >
                <span>Propose an Idea</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-[12px] font-mono text-[#6B5845]">
              Showing {ideas.length} proposal docket(s):
            </div>

            <div className="space-y-3">
              {ideas.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-3xl border border-[#EEEAE1] bg-white shadow-2xs hover:border-[#123B2A]/40 transition-all space-y-3 text-left"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[11px] font-mono font-bold uppercase text-[#123B2A]">
                      REFERENCE: {item.referenceId}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#B45309] bg-[#FFFBEB] px-2.5 py-1 rounded-md border border-[#FDE68A]">
                      <Clock className="h-3 w-3" />
                      Under Peer Review
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-[1.3rem] font-bold text-[#1D2522]">
                      {item.title}
                    </h3>
                    {item.formData?.summary && (
                      <p className="text-[13.5px] text-[#6B5845] leading-relaxed">
                        {item.formData.summary}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#EEEAE1] flex items-center justify-between flex-wrap gap-2 text-[12px] text-[#6B5845]">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Target className="h-3.5 w-3.5 text-[#F5A623]" />
                      <span>Solving: <strong>{item.challengeTitle}</strong></span>
                    </div>

                    <span className="font-mono">
                      Registered: {item.submittedDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
