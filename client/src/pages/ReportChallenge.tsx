import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChallengeFormState, SubmissionResponse } from '../types/submission';
import {
  submitChallenge,
  saveDraftLocal,
  loadDraftLocal,
} from '../services/challengeSubmissionApi';
import { cleanupOrphanedEvidence } from '../services/evidenceStorageService';
import { SubmissionProgress } from '../components/report/SubmissionProgress';
import { ProblemStep } from '../components/report/ProblemStep';
import { LocationStep } from '../components/report/LocationStep';
import { EvidenceStep } from '../components/report/EvidenceStep';
import { ReviewStep } from '../components/report/ReviewStep';
import { SubmissionSuccess } from '../components/report/SubmissionSuccess';
import { Footer } from '../components/layout/Footer';
import { ArrowLeft, ArrowRight, Save, Check, Sparkles } from 'lucide-react';

const INITIAL_STATE: ChallengeFormState = {
  title: '',
  description: '',
  category: 'Not sure — Help me identify it',
  affectedGroups: ['Village / Community' as any],
  firstNoticed: 'A few months ago',
  district: '',
  block: '',
  villageOrWard: '',
  landmark: '',
  coordinates: null,
  evidenceFiles: [],
  evidenceContext: '',
  estimatedPeople: '500 – 2,000',
  frequency: 'Frequent',
  severity: 'Important',
  urgency: 'Important',
  hasPreviousAttempts: 'No',
  previousAttemptsDetail: '',
  aiSuggestions: null,
  declarationAccepted: false,
};

export function ReportChallenge() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ChallengeFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionResponse, setSubmissionResponse] = useState<SubmissionResponse | null>(null);
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  // Restore draft from localStorage if present
  useEffect(() => {
    const saved = loadDraftLocal();
    if (saved && Object.keys(saved).length > 0) {
      setFormData((prev) => ({ ...prev, ...saved }));
    }
  }, []);

  const updateFormData = (updates: Partial<ChallengeFormState>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates };
      saveDraftLocal(next);
      return next;
    });
    // Clear errors for touched fields
    setErrors({});
  };

  const handleManualSaveDraft = () => {
    saveDraftLocal(formData);
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 2500);
  };

  // Validate current step before proceeding
  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) {
        errs.title = 'Please provide a short title for the challenge.';
      }
      if (!formData.description.trim() || formData.description.trim().length < 10) {
        errs.description = 'Please describe the problem in a bit more detail (at least 10 characters).';
      }
    } else if (step === 2) {
      if (!formData.district) {
        errs.district = 'Please select a district in Jharkhand.';
      }
      if (!formData.block.trim()) {
        errs.block = 'Please specify the block or subdivision.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const canNavigateToStep = (stepNum: number) => {
    return stepNum <= currentStep;
  };

  const handleCancelAndBack = async () => {
    const paths = formData.evidenceFiles
      ?.map((f) => f.storagePath)
      .filter((p): p is string => Boolean(p)) || [];
    if (paths.length > 0) {
      const confirmLeave = window.confirm(
        'Exit challenge report? Any unsubmitted uploaded files will be discarded from storage.'
      );
      if (!confirmLeave) return;
      await cleanupOrphanedEvidence(paths);
    }
    navigate('/challenges');
  };

  const handleSubmit = async () => {
    if (!formData.declarationAccepted) {
      setErrors({ submit: 'Please accept the declaration checkbox before submitting.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitChallenge(formData);
      setSubmissionResponse(res);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Submission failed', err);
      setErrors({
        submit:
          err?.message ||
          'Submission failed. Please check your internet connection and try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col">
      {/* ── Focused Application Top Bar ── */}
      <div className="border-b border-[#EEEAE1] bg-white py-3.5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={handleCancelAndBack}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-[#6B5845] hover:text-[#123B2A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Cancel & Back</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleManualSaveDraft}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white text-[12px] font-mono font-semibold text-[#1D2522] transition-colors cursor-pointer"
            >
              {draftSavedToast ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#15803D]" />
                  <span className="text-[#15803D]">Draft Saved!</span>
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5 text-[#6B5845]" />
                  <span>Save Draft</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Form Container ── */}
      <main className="flex-1 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
        {!submissionResponse ? (
          <>
            {/* ── Top Narrative Reassurance ── */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-[#123B2A]/8 px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase text-[#123B2A]">
                <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>REPORT A CHALLENGE</span>
              </div>

              <h1 className="text-[2rem] sm:text-[2.6rem] font-extrabold text-[#1D2522] tracking-tight leading-tight font-sans">
                Tell us about a problem <br className="hidden sm:inline" />
                that needs to be solved.
              </h1>

              <p className="text-[14.5px] sm:text-[15.5px] text-[#6B5845] leading-relaxed">
                You do not need to have the solution. Tell us what you are seeing, who it affects, and where it is happening. JharSankalp will help connect the challenge with the right people and institutions.
              </p>
            </div>

            {/* ── Progress Indicator (4 Steps) ── */}
            <div className="pt-2">
              <SubmissionProgress
                currentStep={currentStep}
                totalSteps={4}
                onStepClick={(num) => setCurrentStep(num)}
                canNavigateToStep={canNavigateToStep}
              />
            </div>

            {/* ── Dynamic Step Body ── */}
            <div className="pt-4">
              {currentStep === 1 && (
                <ProblemStep
                  formData={formData}
                  onChange={updateFormData}
                  errors={errors}
                />
              )}

              {currentStep === 2 && (
                <LocationStep
                  formData={formData}
                  onChange={updateFormData}
                  errors={errors}
                />
              )}

              {currentStep === 3 && (
                <EvidenceStep
                  formData={formData}
                  onChange={updateFormData}
                />
              )}

              {currentStep === 4 && (
                <ReviewStep
                  formData={formData}
                  onEditStep={(stepNum) => setCurrentStep(stepNum)}
                  onDeclarationChange={(accepted) =>
                    updateFormData({ declarationAccepted: accepted })
                  }
                  onApplyAISuggestion={(sug) =>
                    updateFormData({
                      aiSuggestions: sug,
                      category: sug.suggestedCategory,
                    })
                  }
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  error={errors.submit}
                />
              )}
            </div>

            {/* ── Step Bottom Navigation Buttons ── */}
            {currentStep < 4 && (
              <div className="pt-8 border-t border-[#EEEAE1] flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-[#EEEAE1] bg-white text-[14px] font-bold text-[#1D2522] hover:bg-[#FAF9F5] transition-all cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>
            )}
          </>
        ) : (
          /* ── Submission Confirmation Experience ── */
          <SubmissionSuccess response={submissionResponse} />
        )}
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
