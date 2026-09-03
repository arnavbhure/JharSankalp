import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  IdeaSubmissionFormData,
  IdeaSubmissionResult,
  SelectedChallenge,
  SupportingMaterial,
} from '../types/ideaSubmission';
import {
  saveDraft,
  loadDraft,
  clearDraft,
  submitIdea,
  SEED_CHALLENGES,
} from '../services/ideaSubmissionApi';
import { SubmissionProgress } from '../components/submit-idea/SubmissionProgress';
import { SelectedChallengeBadge } from '../components/submit-idea/SelectedChallengeBadge';
import { ChallengeSelector } from '../components/submit-idea/ChallengeSelector';
import { IdeaDetailsForm } from '../components/submit-idea/IdeaDetailsForm';
import { ApproachForm } from '../components/submit-idea/ApproachForm';
import { ReadinessSelector } from '../components/submit-idea/ReadinessSelector';
import { CollaborationNeedsForm } from '../components/submit-idea/CollaborationNeedsForm';
import { IdeaReview } from '../components/submit-idea/IdeaReview';
import { IdeaSubmissionSuccess } from '../components/submit-idea/IdeaSubmissionSuccess';
import { DraftRecoveryBanner } from '../components/submit-idea/DraftRecoveryBanner';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Footer } from '../components/layout/Footer';

const INITIAL_FORM_DATA: IdeaSubmissionFormData = {
  challenge: null,
  title: '',
  summary: '',
  coreIdea: '',
  whyThisHelps: '',
  problemGap: '',
  proposedApproach: '',
  expectedOutcome: '',
  stage: 'CONCEPT',
  supportingMaterials: [],
  collaborationNeeds: ['Technical Development', 'Field Testing'],
  additionalContext: '',
  contributorRole: 'Student',
  organization: '',
  contributorName: '',
  contributorContact: '',
};

export function SubmitIdea() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Current Step: 1-5 (Steps), 6 (Review), 7 (Success)
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepAllowed, setMaxStepAllowed] = useState(1);
  const [formData, setFormData] = useState<IdeaSubmissionFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<IdeaSubmissionResult | null>(null);
  const [savedDraftExists, setSavedDraftExists] = useState(false);

  // Check URL challengeId param or existing draft
  useEffect(() => {
    const paramChallengeId = searchParams.get('challengeId');
    if (paramChallengeId) {
      const match = SEED_CHALLENGES.find((c) => c.id === paramChallengeId);
      if (match) {
        setFormData((prev) => ({ ...prev, challenge: match }));
        setMaxStepAllowed((prev) => Math.max(prev, 2));
      }
    }

    const draft = loadDraft();
    if (draft && Object.keys(draft).length > 0 && !paramChallengeId) {
      setSavedDraftExists(true);
    }
  }, [searchParams]);

  // Auto-save draft on changes
  useEffect(() => {
    if (currentStep <= 5 && !submissionResult) {
      saveDraft(formData);
    }
  }, [formData, currentStep, submissionResult]);

  const handleApplyDraft = () => {
    const draft = loadDraft();
    if (draft) {
      setFormData((prev) => ({ ...prev, ...draft }));
      if (draft.challenge) {
        setMaxStepAllowed(5);
      }
    }
    setSavedDraftExists(false);
  };

  const handleDiscardDraft = () => {
    clearDraft();
    setSavedDraftExists(false);
  };

  // Validation per step
  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.challenge) {
        errs.challenge = 'Please select a challenge to connect your idea to.';
      }
    } else if (step === 2) {
      if (!formData.title.trim()) {
        errs.title = 'Idea title is required.';
      }
      if (!formData.summary.trim()) {
        errs.summary = 'Short summary is required.';
      }
      if (!formData.coreIdea.trim()) {
        errs.coreIdea = 'Please describe the core concept.';
      }
    } else if (step === 3) {
      if (!formData.proposedApproach.trim()) {
        errs.proposedApproach = 'Proposed approach is required.';
      }
      if (!formData.expectedOutcome.trim()) {
        errs.expectedOutcome = 'Expected outcome is required.';
      }
    } else if (step === 5) {
      if (!formData.contributorRole) {
        errs.contributorRole = 'Please select your role.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    const next = currentStep + 1;
    setCurrentStep(next);
    setMaxStepAllowed((prev) => Math.max(prev, next));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSelectChallenge = (c: SelectedChallenge) => {
    setFormData((prev) => ({ ...prev, challenge: c }));
    setErrors({});
    setCurrentStep(2);
    setMaxStepAllowed((prev) => Math.max(prev, 2));
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await submitIdea(formData);
      setSubmissionResult(result);
      setCurrentStep(7); // Success view
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] font-sans min-h-screen flex flex-col">
      {/* ── Page Header Introduction ── */}
      {currentStep <= 6 && (
        <header className="border-b border-[#EEEAE1] bg-white pt-10 pb-8 text-left">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-3">
            <div className="inline-flex items-center gap-2 text-caption font-mono uppercase tracking-widest text-[#123B2A] font-bold">
              <Sparkles className="h-3.5 w-3.5 text-[#F5A623]" />
              <span>CONTRIBUTE AN IDEA</span>
            </div>

            <h1 className="text-[2.2rem] sm:text-[2.8rem] font-extrabold text-[#1D2522] tracking-tight leading-tight font-sans">
              A good idea becomes stronger <br className="hidden sm:block" />
              when the right people can build on it.
            </h1>

            <p className="text-[15px] sm:text-[16.5px] text-[#6B5845] leading-relaxed max-w-2xl font-normal">
              Connect your solution approach to a real societal challenge and find the people, institutions and partners who can help move it forward.
            </p>
          </div>
        </header>
      )}

      {/* ── Top Progress Tracker (Steps 1-5) ── */}
      {currentStep <= 5 && (
        <SubmissionProgress
          currentStep={currentStep}
          onStepClick={(step) => {
            setCurrentStep(step);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          maxStepAllowed={maxStepAllowed}
        />
      )}

      {/* ── Main Form Body Container ── */}
      <main className="flex-1 mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 w-full space-y-6">
        {/* Draft Recovery Banner */}
        {savedDraftExists && currentStep === 1 && (
          <DraftRecoveryBanner
            onContinue={handleApplyDraft}
            onDiscard={handleDiscardDraft}
          />
        )}

        {/* Sticky Contextual Selected Challenge Strip (Steps 2-5) */}
        {formData.challenge && currentStep >= 2 && currentStep <= 5 && (
          <SelectedChallengeBadge
            challenge={formData.challenge}
            onChangeChallenge={() => setCurrentStep(1)}
          />
        )}

        {/* Step 1: Select Challenge */}
        {currentStep === 1 && (
          <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-9 shadow-2xs">
            <ChallengeSelector
              selectedChallenge={formData.challenge}
              onSelect={handleSelectChallenge}
            />
            {errors.challenge && (
              <p className="mt-3 text-[12.5px] text-[#BE123C] font-mono font-bold">
                {errors.challenge}
              </p>
            )}
          </div>
        )}

        {/* Step 2: The Idea */}
        {currentStep === 2 && (
          <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-9 shadow-2xs">
            <IdeaDetailsForm
              title={formData.title}
              summary={formData.summary}
              coreIdea={formData.coreIdea}
              whyThisHelps={formData.whyThisHelps}
              onChange={(updates) => setFormData((prev) => ({ ...prev, ...updates }))}
              errors={errors}
            />
          </div>
        )}

        {/* Step 3: The Approach */}
        {currentStep === 3 && (
          <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-9 shadow-2xs">
            <ApproachForm
              problemGap={formData.problemGap}
              proposedApproach={formData.proposedApproach}
              expectedOutcome={formData.expectedOutcome}
              onChange={(updates) => setFormData((prev) => ({ ...prev, ...updates }))}
              errors={errors}
            />
          </div>
        )}

        {/* Step 4: Idea Readiness */}
        {currentStep === 4 && (
          <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-9 shadow-2xs">
            <ReadinessSelector
              selectedStage={formData.stage}
              onSelectStage={(stage) => setFormData((prev) => ({ ...prev, stage }))}
              supportingMaterials={formData.supportingMaterials}
              onAddMaterial={(mat: SupportingMaterial) =>
                setFormData((prev) => ({
                  ...prev,
                  supportingMaterials: [...prev.supportingMaterials, mat],
                }))
              }
              onRemoveMaterial={(id) =>
                setFormData((prev) => ({
                  ...prev,
                  supportingMaterials: prev.supportingMaterials.filter((m) => m.id !== id),
                }))
              }
            />
          </div>
        )}

        {/* Step 5: Collaboration Needs */}
        {currentStep === 5 && (
          <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-9 shadow-2xs">
            <CollaborationNeedsForm
              collaborationNeeds={formData.collaborationNeeds}
              additionalContext={formData.additionalContext}
              contributorRole={formData.contributorRole}
              organization={formData.organization || ''}
              contributorName={formData.contributorName || ''}
              contributorContact={formData.contributorContact || ''}
              onChange={(updates) => setFormData((prev) => ({ ...prev, ...updates }))}
              errors={errors}
            />
          </div>
        )}

        {/* Step 6: Review & Final Submission */}
        {currentStep === 6 && (
          <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-9 shadow-2xs">
            <IdeaReview
              formData={formData}
              onEditStep={(step) => {
                setCurrentStep(step);
                window.scrollTo({ top: 120, behavior: 'smooth' });
              }}
              onSubmit={handleFinalSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        )}

        {/* Step 7: Success Page */}
        {currentStep === 7 && submissionResult && (
          <IdeaSubmissionSuccess
            result={submissionResult}
            challenge={formData.challenge}
          />
        )}

        {/* ── Guided Step Controls (Steps 1 to 5) ── */}
        {currentStep <= 5 && (
          <div className="flex items-center justify-between pt-2">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[13.5px] font-bold text-[#6B5845] transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate('/ideas')}
                className="text-[13px] font-bold text-[#6B5845] hover:text-[#1D2522] cursor-pointer"
              >
                Cancel & Exit
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[14.5px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer ml-auto"
            >
              <span>{currentStep === 5 ? 'Review Idea Dossier' : 'Continue'}</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
