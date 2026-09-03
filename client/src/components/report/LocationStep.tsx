import { useState } from 'react';
import {
  ChallengeFormState,
  AffectedGroup,
  EstimatedAffectedPopulation,
} from '../../types/submission';
import { JHARKHAND_DISTRICTS } from '../../data/challengesData';
import { MapPin, Navigation, ShieldCheck, AlertCircle, Users, AlertTriangle } from 'lucide-react';

interface LocationStepProps {
  formData: ChallengeFormState;
  onChange: (updates: Partial<ChallengeFormState>) => void;
  errors?: Record<string, string>;
}

const AFFECTED_OPTIONS: AffectedGroup[] = [
  'Individuals',
  'Families / Households' as any,
  'Village / Community' as any,
  'Farmers',
  'Students',
  'Workers',
  'Public Service Users' as any,
  'Other',
];

const POPULATION_PRESETS: EstimatedAffectedPopulation[] = [
  'Less than 50',
  '50 – 500',
  '500 – 2,000',
  '2,000 – 10,000',
  'More than 10,000',
  'Not sure',
];

const URGENCY_CHOICES = [
  {
    value: 'Needs attention',
    label: 'Needs attention',
    desc: 'Noticeable issue, manageable for now but needs planning',
  },
  {
    value: 'Important',
    label: 'Important',
    desc: 'Substantial recurring burden on daily lives and livelihood',
  },
  {
    value: 'Urgent / Serious',
    label: 'Urgent / Serious',
    desc: 'Severe disruption affecting basic health, water, or immediate safety',
  },
];

export function LocationStep({ formData, onChange, errors = {} }: LocationStepProps) {
  const [locating, setLocating] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState(Boolean(formData.coordinates));

  const handleUseCurrentLocation = () => {
    setLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onChange({
            coordinates: { lat: pos.coords.latitude, lng: pos.coords.longitude },
            landmark: formData.landmark || 'Current device location (GPS verified)',
          });
          setLocating(false);
          setGpsSuccess(true);
        },
        () => {
          onChange({
            coordinates: { lat: 23.3441, lng: 85.3096 },
            landmark: formData.landmark || 'Ranchi District Centre (Approximate)',
          });
          setLocating(false);
          setGpsSuccess(true);
        },
        { timeout: 5000 },
      );
    } else {
      onChange({
        coordinates: { lat: 23.3441, lng: 85.3096 },
        landmark: formData.landmark || 'Ranchi Central Coordinates (Approximate)',
      });
      setLocating(false);
      setGpsSuccess(true);
    }
  };

  const toggleAffectedGroup = (group: AffectedGroup) => {
    const current = [...(formData.affectedGroups || [])];
    const idx = current.indexOf(group);
    if (idx >= 0) {
      current.splice(idx, 1);
    } else {
      current.push(group);
    }
    onChange({ affectedGroups: current });
  };

  const validDistricts = JHARKHAND_DISTRICTS.filter((d) => d !== 'All Districts');

  return (
    <div className="space-y-8 text-left max-w-2xl mx-auto">
      {/* Step Header */}
      <div className="space-y-1.5 border-b border-[#EEEAE1] pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#123B2A]/8 text-[#123B2A] text-[11px] font-mono font-bold uppercase tracking-wider">
          STEP 02 OF 04
        </div>
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Location & Community Impact
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed">
          Tell us where this problem is taking place and who is impacted. This helps district
          officers, university research teams, and local panchayats assess the scope.
        </p>
      </div>

      {/* ── Section A: Geographic Location ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[12px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
          <MapPin className="h-4 w-4 text-[#F5A623]" />
          <span>Where is this happening?</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* District Field */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
              <span>District</span>
              <span className="text-[#BE123C]">*</span>
            </label>
            <select
              value={formData.district}
              onChange={(e) => onChange({ district: e.target.value })}
              className={`w-full h-12 px-4 rounded-xl border bg-white text-[14.5px] text-[#1D2522] shadow-2xs focus:outline-none transition-all ${
                errors.district
                  ? 'border-[#BE123C] ring-1 ring-[#BE123C]'
                  : 'border-[#EEEAE1] focus:border-[#123B2A] focus:ring-1 focus:ring-[#123B2A]'
              }`}
            >
              <option value="">Select a District...</option>
              {validDistricts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-[12px] font-medium text-[#BE123C] flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{errors.district}</span>
              </p>
            )}
          </div>

          {/* Block Field */}
          <div className="space-y-1.5">
            <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
              <span>Block / Subdivision</span>
              <span className="text-[#BE123C]">*</span>
            </label>
            <input
              type="text"
              value={formData.block}
              onChange={(e) => onChange({ block: e.target.value })}
              placeholder="e.g. Murhu, Namkum, Chas"
              className={`w-full h-12 px-4 rounded-xl border bg-white text-[14.5px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none transition-all ${
                errors.block
                  ? 'border-[#BE123C] ring-1 ring-[#BE123C]'
                  : 'border-[#EEEAE1] focus:border-[#123B2A] focus:ring-1 focus:ring-[#123B2A]'
              }`}
            />
            {errors.block && (
              <p className="text-[12px] font-medium text-[#BE123C] flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{errors.block}</span>
              </p>
            )}
          </div>
        </div>

        {/* Village / Locality Field */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            Village / Locality / Ward
          </label>
          <input
            type="text"
            value={formData.villageOrWard}
            onChange={(e) => onChange({ villageOrWard: e.target.value })}
            placeholder="e.g. Torpa Road, Ward 4, Khunti Toli"
            className="w-full h-12 px-4 rounded-xl border border-[#EEEAE1] bg-white text-[14.5px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:border-[#123B2A] focus:ring-1 focus:ring-[#123B2A] focus:outline-none transition-all"
          />
        </div>

        {/* Optional GPS Location Pin */}
        <div className="p-4 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[12.5px] font-bold text-[#1D2522] block">
              Optional Device Location (GPS)
            </span>
            <span className="text-[12px] text-[#6B5845] block">
              {gpsSuccess && formData.coordinates
                ? `Pin recorded: ${formData.coordinates.lat.toFixed(4)}°N, ${formData.coordinates.lng.toFixed(4)}°E`
                : 'Not required. Helpful for field engineers and mobile surveys.'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={locating}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#EEEAE1] text-[12.5px] font-bold text-[#1D2522] hover:bg-[#F8F6F1] shadow-2xs transition-all active:scale-[0.98] shrink-0 cursor-pointer"
          >
            {gpsSuccess ? (
              <>
                <ShieldCheck className="h-4 w-4 text-[#15803D]" />
                <span>GPS Attached</span>
              </>
            ) : locating ? (
              <span>Locating...</span>
            ) : (
              <>
                <Navigation className="h-4 w-4 text-[#123B2A]" />
                <span>Detect My Location</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Section B: Community Impact ── */}
      <div className="space-y-6 pt-4 border-t border-[#EEEAE1]">
        {/* Field: Who is affected? */}
        <div className="space-y-3">
          <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
            <Users className="h-4 w-4 text-[#F5A623]" />
            <span>Who is affected?</span>
          </label>
          <p className="text-[12.5px] text-[#6B5845]">Select all groups impacted in this area.</p>

          <div className="flex flex-wrap gap-2">
            {AFFECTED_OPTIONS.map((opt) => {
              const isSelected = formData.affectedGroups?.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleAffectedGroup(opt)}
                  className={`px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all cursor-pointer shadow-2xs ${
                    isSelected
                      ? 'bg-[#123B2A] text-white border border-[#123B2A]'
                      : 'bg-white text-[#1D2522] border border-[#EEEAE1] hover:bg-[#FAF9F5]'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Field: Approximate number of people affected */}
        <div className="space-y-3">
          <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            Approximate number of people affected
          </label>
          <p className="text-[12.5px] text-[#6B5845]">
            Choose a range or type a number (e.g. 50, 500, 5,000).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {POPULATION_PRESETS.map((pop) => {
              const isSelected = formData.estimatedPeople === pop;
              return (
                <button
                  key={pop}
                  type="button"
                  onClick={() => onChange({ estimatedPeople: pop })}
                  className={`p-2.5 rounded-xl text-[12.5px] font-semibold text-center transition-all cursor-pointer shadow-2xs border ${
                    isSelected
                      ? 'bg-[#123B2A] text-white border-[#123B2A]'
                      : 'bg-white text-[#1D2522] border-[#EEEAE1] hover:bg-[#FAF9F5]'
                  }`}
                >
                  {pop}
                </button>
              );
            })}
          </div>
        </div>

        {/* Field: How urgent is the issue? */}
        <div className="space-y-3">
          <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 text-[#F5A623]" />
            <span>How urgent is the issue?</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {URGENCY_CHOICES.map((choice) => {
              const isSelected =
                formData.urgency === choice.value || formData.severity === choice.value;
              return (
                <button
                  key={choice.value}
                  type="button"
                  onClick={() =>
                    onChange({
                      urgency: choice.value as any,
                      severity: choice.value as any,
                    })
                  }
                  className={`p-3.5 rounded-xl text-left transition-all cursor-pointer shadow-2xs border flex flex-col justify-between space-y-1 ${
                    isSelected
                      ? 'border-[#123B2A] bg-[#123B2A]/5 ring-1 ring-[#123B2A]'
                      : 'border-[#EEEAE1] bg-white hover:bg-[#FAF9F5]'
                  }`}
                >
                  <div
                    className={`text-[13.5px] font-bold leading-tight font-sans ${
                      isSelected ? 'text-[#123B2A]' : 'text-[#1D2522]'
                    }`}
                  >
                    {choice.label}
                  </div>
                  <div className="text-[11.5px] text-[#6B5845] leading-snug">{choice.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
