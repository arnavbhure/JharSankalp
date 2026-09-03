import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Compass,
  AlertCircle,
  Send,
} from 'lucide-react';
import { getChallengeDetail } from '../data/challengeDetailData';
import { useInnovationStore } from '../stores/innovationStore';
import { Footer } from '../components/layout/Footer';

const COLLAB_OPTIONS = [
  'Technical Expertise',
  'Research Support',
  'Funding',
  'Government Partnership',
  'Community Partners',
];

export function SubmitChallengeIdea() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const navigate = useNavigate();
  const challenge = useMemo(() => getChallengeDetail(challengeId), [challengeId]);

  const { submitIdea, saveDraftIdea } = useInnovationStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [draftSavedToast, setDraftSavedToast] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    title: '',
    summary: '',
    description: '',
    // Step 2
    problemPart: '',
    expectedImpact: '',
    beneficiaries: '',
    // Step 3
    approach: '',
    resources: '',
    complexity: 'Medium' as 'Low' | 'Medium' | 'High',
    // Step 4
    seekingCollaborators: true,
    collaborationNeeds: ['Technical Expertise', 'Government Partnership'] as string[],
    // Step 5
    confirmedOriginal: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Quick Demo Pre-fill for demonstration convenience
  const handlePreFillDemo = () => {
    setFormData({
      title: 'Solar-Powered Low-Frequency Acoustic Sensor Collar',
      summary:
        'Continuous vibration pulse telemetry mounted on the India Mark II handpump head to catch seal degradation 10 days before water failure.',
      description:
        'A weatherproof clamp-on collar containing a 3-axis piezoelectric vibration accelerometer and an ultra-low-power LoRaWAN transceiver. By analyzing stroke mechanical harmonics against normal baseline curves, the device autonomously flags plunger seal friction or cylinder cavitation.',
      problemPart:
        'Subterranean cylinder valve wear and sudden handpump failure without prior warning to rural hamlets.',
      expectedImpact:
        'Cut repair dispatch latency from 14 days down to 48 hours; reduces acute water distress for 1,200+ villagers per installation.',
      beneficiaries:
        'Women and adolescent girls responsible for daily water hauling in Murhu Block habitations.',
      approach:
        'Fabricated from local die-cast aluminum with tamper-resistant security bolts. Powered by a 2W micro solar panel and supercapacitor buffer.',
      resources:
        'Acoustic vibration sensors, STM32 MCU, LoRa transmitter, 3.6V LiFePO4 battery, CNC milled mounting brackets.',
      complexity: 'Medium',
      seekingCollaborators: true,
      collaborationNeeds: ['Technical Expertise', 'Research Support', 'Government Partnership'],
      confirmedOriginal: true,
    });
  };

  const steps = [
    { num: 1, title: 'The Idea', desc: 'Title & description' },
    { num: 2, title: 'Problem Fit', desc: 'Impact & beneficiaries' },
    { num: 3, title: 'Approach', desc: 'Resources & complexity' },
    { num: 4, title: 'Collaboration', desc: 'Partner requirements' },
    { num: 5, title: 'Review', desc: 'Summary & confirmation' },
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = 'Please enter an idea title';
      if (!formData.summary.trim()) newErrors.summary = 'Please provide a short summary';
      if (!formData.description.trim())
        newErrors.description = 'Please describe how your idea works';
    } else if (step === 2) {
      if (!formData.problemPart.trim())
        newErrors.problemPart = 'Please explain which part of the challenge this addresses';
      if (!formData.expectedImpact.trim())
        newErrors.expectedImpact = 'Please estimate the expected societal impact';
      if (!formData.beneficiaries.trim()) newErrors.beneficiaries = 'Please state who benefits';
    } else if (step === 3) {
      if (!formData.approach.trim())
        newErrors.approach = 'Please outline your implementation approach';
      if (!formData.resources.trim())
        newErrors.resources = 'Please list required materials or tools';
    } else if (step === 5) {
      if (!formData.confirmedOriginal)
        newErrors.confirmed = 'You must confirm that this is your original contribution';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => (prev < 5 ? ((prev + 1) as any) : prev));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => (prev > 1 ? ((prev - 1) as any) : prev));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveDraft = () => {
    saveDraftIdea({
      challengeId: challenge.id,
      challengeTitle: challenge.title,
      district: challenge.district,
      focusArea: challenge.category,
      title: formData.title || 'Untitled Draft Idea',
      summary: formData.summary,
      description: formData.description,
      problemPart: formData.problemPart,
      expectedImpact: formData.expectedImpact,
      beneficiaries: formData.beneficiaries,
      approach: formData.approach,
      resources: formData.resources,
      complexity: formData.complexity,
      seekingCollaborators: formData.seekingCollaborators,
      collaborationNeeds: formData.collaborationNeeds,
    });
    setDraftSavedToast(true);
    setTimeout(() => {
      setDraftSavedToast(false);
      navigate('/dashboard/ideas');
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    const newId = submitIdea({
      challengeId: challenge.id,
      challengeTitle: challenge.title,
      district: challenge.district,
      focusArea: challenge.category,
      title: formData.title,
      summary: formData.summary,
      description: formData.description,
      problemPart: formData.problemPart,
      expectedImpact: formData.expectedImpact,
      beneficiaries: formData.beneficiaries,
      approach: formData.approach,
      resources: formData.resources,
      complexity: formData.complexity,
      seekingCollaborators: formData.seekingCollaborators,
      collaborationNeeds: formData.collaborationNeeds,
      authorName: 'Arnab',
    });

    setSubmittedId(newId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCollabNeed = (item: string) => {
    setFormData((prev) => {
      const exists = prev.collaborationNeeds.includes(item);
      return {
        ...prev,
        collaborationNeeds: exists
          ? prev.collaborationNeeds.filter((n) => n !== item)
          : [...prev.collaborationNeeds, item],
      };
    });
  };

  // ════════════════════════════════════════════════════════════════════════
  // ── SUCCESS VIEW STATE (Step 4 from Prompt Requirements) ──
  // ════════════════════════════════════════════════════════════════════════
  if (submittedId) {
    const todayFormatted = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return (
      <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] min-h-screen flex flex-col justify-between">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8 w-full">
          {/* Main Success Hero Card */}
          <div className="rounded-[32px] bg-white border border-[#EEEAE1] p-8 sm:p-12 shadow-sm text-center space-y-6">
            <div className="h-16 w-16 rounded-3xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#15803D] bg-[#F0FDF4] px-3 py-1 rounded-full border border-[#BBF7D0] inline-block">
                CIVIC INNOVATION REGISTERED
              </span>
              <h1 className="text-[2.2rem] sm:text-[2.6rem] font-extrabold text-[#1D2522] tracking-tight">
                Idea Submitted
              </h1>
              <p className="text-[15px] text-[#6B5845] leading-relaxed">
                Your idea has entered the JharSankalp innovation pipeline. It is now queued for
                district triage and academic partner review.
              </p>
            </div>

            {/* Submission Metadata Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] text-left text-[12px]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                  SUBMISSION ID
                </span>
                <span className="font-mono font-bold text-[#123B2A]">{submittedId}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                  SUBMISSION DATE
                </span>
                <span className="font-semibold text-[#1D2522]">{todayFormatted}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                  STATUS
                </span>
                <span className="font-bold text-[#0284C7] flex items-center gap-1">
                  ● Submitted
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                  NEXT STAGE
                </span>
                <span className="font-semibold text-[#123B2A] truncate block">Initial Review</span>
              </div>
            </div>

            {/* Related Challenge Reference */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] text-left space-y-1">
              <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845]">
                IN RESPONSE TO CIVIC CHALLENGE
              </span>
              <div className="text-[14px] font-bold text-[#1D2522]">{challenge.title}</div>
              <div className="text-[12px] text-[#6B5845]">
                {challenge.district} District · Focus: {challenge.category}
              </div>
            </div>

            {/* Visual Next Steps Pipeline */}
            <div className="pt-6 border-t border-[#EEEAE1] space-y-3 text-left">
              <div className="text-[11px] font-mono font-bold uppercase text-[#123B2A] tracking-wider">
                INNOVATION PROGRESSION PIPELINE
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[11px] font-mono font-semibold">
                <div className="p-3 rounded-xl bg-[#123B2A] text-white space-y-1">
                  <div className="h-5 w-5 rounded-full bg-white/20 mx-auto flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  <span>1. Submitted</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F5] border-2 border-[#F5A623] text-[#1D2522] space-y-1">
                  <div className="h-5 w-5 rounded-full bg-[#F5A623] text-[#123B2A] font-bold mx-auto flex items-center justify-center text-[10px]">
                    2
                  </div>
                  <span className="font-bold text-[#B45309]">Initial Review</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-[#6B5845] space-y-1">
                  <div className="h-5 w-5 rounded-full bg-[#EEEAE1] text-[#6B5845] mx-auto flex items-center justify-center text-[10px]">
                    3
                  </div>
                  <span>Expert Review</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-[#6B5845] space-y-1">
                  <div className="h-5 w-5 rounded-full bg-[#EEEAE1] text-[#6B5845] mx-auto flex items-center justify-center text-[10px]">
                    4
                  </div>
                  <span>Collaboration</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-[#6B5845] space-y-1">
                  <div className="h-5 w-5 rounded-full bg-[#EEEAE1] text-[#6B5845] mx-auto flex items-center justify-center text-[10px]">
                    5
                  </div>
                  <span>Pilot Testbed</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate(`/dashboard/ideas/${submittedId}`)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13.5px] font-bold shadow-xs transition-all cursor-pointer"
              >
                <span>View My Idea Tracking Page</span>
                <ArrowRight className="h-4 w-4 text-[#F5A623]" />
              </button>

              <button
                type="button"
                onClick={() => navigate(`/challenges/${challenge.id}`)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#1D2522] text-[13px] font-semibold transition-all cursor-pointer"
              >
                <span>Back to Challenge Dossier</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/challenges')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-[#EEEAE1] bg-white hover:bg-[#FAF9F5] text-[#6B5845] text-[13px] font-semibold transition-all cursor-pointer"
              >
                <span>Explore More Challenges</span>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // ── MULTI-STEP SUBMISSION FORM (Steps 1 to 5) ──
  // ════════════════════════════════════════════════════════════════════════
  return (
    <div className="w-full text-left bg-[#F8F6F1] text-[#1D2522] min-h-screen flex flex-col justify-between">
      {/* Toast confirmation for Save Draft */}
      {draftSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#123B2A] text-white shadow-xl text-[13px] font-medium border border-[#1E5A3A]">
            <Bookmark className="h-4 w-4 text-[#F5A623]" />
            <span>Draft saved! Redirecting to your workspace...</span>
          </div>
        </div>
      )}

      {/* ── Breadcrumb & Top Bar ── */}
      <div className="border-b border-[#EEEAE1] bg-white py-3">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex items-center justify-between text-[12.5px] text-[#6B5845]">
          <Link
            to={`/challenges/${challenge.id}`}
            className="hover:text-[#123B2A] transition-colors flex items-center gap-1.5 font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Case Dossier</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePreFillDemo}
              className="text-[11px] font-mono font-bold text-[#B45309] bg-[#FFFBEB] hover:bg-[#FEF3C7] px-2.5 py-1 rounded-md border border-[#FDE68A] cursor-pointer flex items-center gap-1 transition-all"
              title="Quickly fill form with high-quality prototype data"
            >
              <Sparkles className="h-3 w-3 text-[#F5A623]" />
              <span>Auto-Fill Demo Idea</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 w-full">
        {/* ── Page Header ── */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#123B2A] text-white text-[11px] font-mono font-bold uppercase tracking-wider">
            <Compass className="h-3.5 w-3.5 text-[#F5A623]" />
            <span>STRUCTURED CIVIC PROPOSAL</span>
          </div>
          <h1 className="text-[2.2rem] sm:text-[2.75rem] font-extrabold text-[#1D2522] tracking-tight leading-tight font-sans">
            Turn an observation into an idea.
          </h1>
          <p className="text-[15.5px] text-[#6B5845] max-w-2xl leading-relaxed">
            Share a practical approach that could help address this challenge. Your submission will
            be matched with university labs, mentors, and field pilot resources.
          </p>
        </div>

        {/* ── Compact Challenge Context Card ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EEEAE1] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#6B5845] uppercase font-bold">RESPONDING TO CHALLENGE</span>
            <span className="text-[#123B2A] font-bold bg-[#FAF9F5] px-2 py-0.5 rounded border border-[#EEEAE1]">
              {challenge.id}
            </span>
          </div>
          <h3 className="text-[1.1rem] font-bold text-[#1D2522]">{challenge.title}</h3>
          <div className="flex items-center gap-4 text-[12px] font-mono text-[#6B5845]">
            <span>
              District: <strong className="text-[#1D2522]">{challenge.district}</strong>
            </span>
            <span>·</span>
            <span>
              Focus Area: <strong className="text-[#1D2522]">{challenge.category}</strong>
            </span>
          </div>
        </div>

        {/* ── Step Progress Indicator ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-[12px] font-mono">
            <span className="font-bold text-[#123B2A]">
              Step {currentStep} of 5 — {steps[currentStep - 1].title}
            </span>
            <span className="text-[#6B5845]">{currentStep * 20}% Completed</span>
          </div>

          <div className="h-2 w-full bg-[#EEEAE1] rounded-full overflow-hidden">
            <div
              style={{ width: `${currentStep * 20}%` }}
              className="h-full bg-[#123B2A] transition-all duration-300 rounded-full"
            />
          </div>

          {/* Stepper Tabs Bar */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-1 text-[11px] font-mono">
            {steps.map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num < currentStep) setCurrentStep(s.num as any);
                }}
                className={`py-2 px-1 rounded-xl text-center transition-all ${
                  currentStep === s.num
                    ? 'bg-[#123B2A] text-white font-bold shadow-xs'
                    : s.num < currentStep
                      ? 'bg-[#FAF9F5] text-[#123B2A] border border-[#EEEAE1] font-semibold cursor-pointer'
                      : 'bg-white/60 text-[#6B5845]/60 border border-transparent cursor-not-allowed'
                }`}
              >
                <span className="block text-[10px] opacity-75">0{s.num}</span>
                <span className="hidden sm:block truncate">{s.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Form Body Card ── */}
        <div className="rounded-3xl border border-[#EEEAE1] bg-white p-6 sm:p-9 shadow-xs space-y-6">
          {/* ── STEP 1: THE IDEA ── */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="border-b border-[#EEEAE1] pb-3">
                <h3 className="text-[1.3rem] font-bold text-[#1D2522]">
                  Step 1: The Core Solution Idea
                </h3>
                <p className="text-[13px] text-[#6B5845]">
                  Give your idea a clear name and explain what it does in simple terms.
                </p>
              </div>

              <div className="space-y-4 text-[13px]">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                    Idea Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Solar-Powered Acoustic Vibration Collar for India Mark II Pumps"
                    className={`w-full h-11 px-3.5 rounded-xl border text-[13.5px] focus:outline-none transition-colors ${
                      errors.title
                        ? 'border-[#BE123C] bg-[#FFF5F5]'
                        : 'border-[#EEEAE1] focus:border-[#123B2A]'
                    }`}
                  />
                  {errors.title && (
                    <span className="text-[11px] text-[#BE123C] flex items-center gap-1 font-mono">
                      <AlertCircle className="h-3 w-3" /> {errors.title}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                    Short Summary (1-2 sentences) *
                  </label>
                  <input
                    type="text"
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="e.g. A non-invasive sensor collar detecting pump mechanical wear before water failure."
                    className={`w-full h-11 px-3.5 rounded-xl border text-[13.5px] focus:outline-none transition-colors ${
                      errors.summary
                        ? 'border-[#BE123C] bg-[#FFF5F5]'
                        : 'border-[#EEEAE1] focus:border-[#123B2A]'
                    }`}
                  />
                  {errors.summary && (
                    <span className="text-[11px] text-[#BE123C] flex items-center gap-1 font-mono">
                      <AlertCircle className="h-3 w-3" /> {errors.summary}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                      Describe the Idea & Mechanism *
                    </label>
                    <span className="text-[11px] text-[#6B5845] font-mono">
                      What is your proposed solution and how would it work?
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe how the idea works mechanically, digitally, or through community operations. Explain the components and the step-by-step user interaction..."
                    className={`w-full p-3.5 rounded-xl border text-[13.5px] focus:outline-none transition-colors leading-relaxed ${
                      errors.description
                        ? 'border-[#BE123C] bg-[#FFF5F5]'
                        : 'border-[#EEEAE1] focus:border-[#123B2A]'
                    }`}
                  />
                  {errors.description && (
                    <span className="text-[11px] text-[#BE123C] flex items-center gap-1 font-mono">
                      <AlertCircle className="h-3 w-3" /> {errors.description}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: PROBLEM FIT ── */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="border-b border-[#EEEAE1] pb-3">
                <h3 className="text-[1.3rem] font-bold text-[#1D2522]">
                  Step 2: Problem Fit & Impact
                </h3>
                <p className="text-[13px] text-[#6B5845]">
                  Help reviewers understand which specific part of the challenge you solve.
                </p>
              </div>

              <div className="space-y-4 text-[13px]">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                    Which specific part of the challenge does this address? *
                  </label>
                  <input
                    type="text"
                    value={formData.problemPart}
                    onChange={(e) => setFormData({ ...formData, problemPart: e.target.value })}
                    placeholder="e.g. Subterranean cylinder valve seal wear and delayed reporting"
                    className={`w-full h-11 px-3.5 rounded-xl border text-[13.5px] focus:outline-none transition-colors ${
                      errors.problemPart
                        ? 'border-[#BE123C] bg-[#FFF5F5]'
                        : 'border-[#EEEAE1] focus:border-[#123B2A]'
                    }`}
                  />
                  {errors.problemPart && (
                    <span className="text-[11px] text-[#BE123C] flex items-center gap-1 font-mono">
                      <AlertCircle className="h-3 w-3" /> {errors.problemPart}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                    Expected Societal Impact *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.expectedImpact}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expectedImpact: e.target.value,
                      })
                    }
                    placeholder="Quantify or describe the difference: e.g. 40% reduction in breakdown duration, reliable drinking water for 15 villages..."
                    className={`w-full p-3.5 rounded-xl border text-[13.5px] focus:outline-none transition-colors ${
                      errors.expectedImpact
                        ? 'border-[#BE123C] bg-[#FFF5F5]'
                        : 'border-[#EEEAE1] focus:border-[#123B2A]'
                    }`}
                  />
                  {errors.expectedImpact && (
                    <span className="text-[11px] text-[#BE123C] flex items-center gap-1 font-mono">
                      <AlertCircle className="h-3 w-3" /> {errors.expectedImpact}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                    Who benefits directly? *
                  </label>
                  <input
                    type="text"
                    value={formData.beneficiaries}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        beneficiaries: e.target.value,
                      })
                    }
                    placeholder="e.g. 2,000+ tribal households, ASHA workers, local Jal Samiti mechanics"
                    className={`w-full h-11 px-3.5 rounded-xl border text-[13.5px] focus:outline-none transition-colors ${
                      errors.beneficiaries
                        ? 'border-[#BE123C] bg-[#FFF5F5]'
                        : 'border-[#EEEAE1] focus:border-[#123B2A]'
                    }`}
                  />
                  {errors.beneficiaries && (
                    <span className="text-[11px] text-[#BE123C] flex items-center gap-1 font-mono">
                      <AlertCircle className="h-3 w-3" /> {errors.beneficiaries}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: APPROACH ── */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="border-b border-[#EEEAE1] pb-3">
                <h3 className="text-[1.3rem] font-bold text-[#1D2522]">
                  Step 3: Implementation Approach
                </h3>
                <p className="text-[13px] text-[#6B5845]">
                  Describe how this idea would be brought to life and what materials are needed.
                </p>
              </div>

              <div className="space-y-4 text-[13px]">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                    Implementation Approach *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.approach}
                    onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                    placeholder="How will it be built, tested, and distributed? e.g. Assemble 10 units at university lab, run 3-month field test in Murhu..."
                    className={`w-full p-3.5 rounded-xl border text-[13.5px] focus:outline-none transition-colors ${
                      errors.approach
                        ? 'border-[#BE123C] bg-[#FFF5F5]'
                        : 'border-[#EEEAE1] focus:border-[#123B2A]'
                    }`}
                  />
                  {errors.approach && (
                    <span className="text-[11px] text-[#BE123C] flex items-center gap-1 font-mono">
                      <AlertCircle className="h-3 w-3" /> {errors.approach}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                    Key Resources Required *
                  </label>
                  <input
                    type="text"
                    value={formData.resources}
                    onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
                    placeholder="e.g. Microcontroller, vibration sensors, solar cells, local metal enclosure"
                    className={`w-full h-11 px-3.5 rounded-xl border text-[13.5px] focus:outline-none transition-colors ${
                      errors.resources
                        ? 'border-[#BE123C] bg-[#FFF5F5]'
                        : 'border-[#EEEAE1] focus:border-[#123B2A]'
                    }`}
                  />
                  {errors.resources && (
                    <span className="text-[11px] text-[#BE123C] flex items-center gap-1 font-mono">
                      <AlertCircle className="h-3 w-3" /> {errors.resources}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 pt-2">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                    Estimated Implementation Complexity
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Low', 'Medium', 'High'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setFormData({ ...formData, complexity: lvl })}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          formData.complexity === lvl
                            ? 'border-[#123B2A] bg-[#123B2A] text-white font-bold shadow-xs'
                            : 'border-[#EEEAE1] bg-[#FAF9F5] text-[#1D2522] hover:bg-white'
                        }`}
                      >
                        <span className="text-[13px] block">{lvl}</span>
                        <span className="text-[10px] font-mono opacity-70 block">
                          {lvl === 'Low'
                            ? '0-2 months'
                            : lvl === 'Medium'
                              ? '3-6 months'
                              : '6+ months'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4: COLLABORATION ── */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div className="border-b border-[#EEEAE1] pb-3">
                <h3 className="text-[1.3rem] font-bold text-[#1D2522]">
                  Step 4: Collaboration Preferences
                </h3>
                <p className="text-[13px] text-[#6B5845]">
                  JharSankalp connects individual innovators with university labs and institutions.
                </p>
              </div>

              <div className="space-y-5 text-[13px]">
                <div className="space-y-2">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                    Are you open to collaborating with other innovators?
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, seekingCollaborators: true })}
                      className={`px-5 py-2 rounded-xl text-[13px] font-bold border transition-all cursor-pointer ${
                        formData.seekingCollaborators
                          ? 'bg-[#123B2A] text-white border-[#123B2A]'
                          : 'bg-[#FAF9F5] text-[#6B5845] border-[#EEEAE1]'
                      }`}
                    >
                      Yes, open for collaboration
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          seekingCollaborators: false,
                        })
                      }
                      className={`px-5 py-2 rounded-xl text-[13px] font-bold border transition-all cursor-pointer ${
                        !formData.seekingCollaborators
                          ? 'bg-[#123B2A] text-white border-[#123B2A]'
                          : 'bg-[#FAF9F5] text-[#6B5845] border-[#EEEAE1]'
                      }`}
                    >
                      No, submit individually
                    </button>
                  </div>
                </div>

                {formData.seekingCollaborators && (
                  <div className="space-y-2.5 pt-2 border-t border-[#EEEAE1]">
                    <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                      What support or partners do you need? (Select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {COLLAB_OPTIONS.map((item) => {
                        const isSelected = formData.collaborationNeeds.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleCollabNeed(item)}
                            className={`px-3.5 py-2 rounded-xl text-[12.5px] font-mono font-bold transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#15803D]'
                                : 'bg-white border-[#EEEAE1] text-[#6B5845] hover:bg-[#FAF9F5]'
                            }`}
                          >
                            <span>{isSelected ? '✓ ' : '+ '}</span>
                            <span>{item}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── STEP 5: REVIEW & SUBMIT ── */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="border-b border-[#EEEAE1] pb-3">
                <h3 className="text-[1.3rem] font-bold text-[#1D2522]">
                  Step 5: Review Your Proposal
                </h3>
                <p className="text-[13px] text-[#6B5845]">
                  Please verify the details before final submission into the state pipeline.
                </p>
              </div>

              {/* Review Summary Dossier */}
              <div className="space-y-4 text-[13px]">
                <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#EEEAE1] space-y-2">
                  <span className="text-[10.5px] font-mono font-bold uppercase text-[#6B5845] block">
                    IDEA TITLE
                  </span>
                  <div className="text-[1.2rem] font-bold text-[#1D2522]">
                    {formData.title || 'Untitled Proposal'}
                  </div>
                  <p className="text-[#6B5845] leading-relaxed">{formData.summary}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
                  <div className="p-3.5 rounded-xl border border-[#EEEAE1] bg-white space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                      CHALLENGE PART ADDRESSED
                    </span>
                    <span className="font-semibold text-[#1D2522]">
                      {formData.problemPart || '—'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[#EEEAE1] bg-white space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                      ESTIMATED COMPLEXITY
                    </span>
                    <span className="font-semibold text-[#123B2A]">
                      {formData.complexity} Complexity
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-[#EEEAE1] bg-white space-y-1 text-[12.5px]">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#6B5845] block">
                    EXPECTED IMPACT & BENEFICIARIES
                  </span>
                  <p className="text-[#1D2522]">{formData.expectedImpact}</p>
                  <p className="text-[#6B5845] text-[11.5px]">
                    Beneficiaries: {formData.beneficiaries}
                  </p>
                </div>

                {formData.seekingCollaborators && (
                  <div className="p-3.5 rounded-xl border border-[#EEEAE1] bg-white space-y-1.5 text-[12.5px]">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#15803D] block">
                      COLLABORATION REQUESTS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.collaborationNeeds.map((need) => (
                        <span
                          key={need}
                          className="px-2.5 py-0.5 rounded-md bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-[11px] font-mono font-bold"
                        >
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Originality Confirmation Checkbox */}
                <div className="p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#123B2A]/40 space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.confirmedOriginal}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmedOriginal: e.target.checked,
                        })
                      }
                      className="mt-1 h-4 w-4 accent-[#123B2A] cursor-pointer"
                    />
                    <div className="text-[12.5px] text-[#1D2522]">
                      <strong className="block">
                        I confirm that this submission is based on my original contribution.
                      </strong>
                      <span className="text-[11.5px] text-[#6B5845]">
                        I understand this proposal will be reviewed by academic partners under
                        open-collaboration civic terms.
                      </span>
                    </div>
                  </label>
                  {errors.confirmed && (
                    <span className="text-[11px] text-[#BE123C] flex items-center gap-1 font-mono">
                      <AlertCircle className="h-3 w-3" /> {errors.confirmed}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Form Navigation Buttons Strip ── */}
          <div className="pt-4 border-t border-[#EEEAE1] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-xl border border-[#EEEAE1] hover:bg-[#FAF9F5] text-[#1D2522] text-[13px] font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2.5 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-white text-[#6B5845] text-[12.5px] font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Bookmark className="h-3.5 w-3.5 text-[#F5A623]" />
                <span>Save Draft</span>
              </button>
            </div>

            <div className="w-full sm:w-auto flex justify-end">
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Continue to Step {currentStep + 1}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[14px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  <Send className="h-4 w-4 text-[#F5A623]" />
                  <span>Submit Idea to JharSankalp</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
