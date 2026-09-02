import { useState } from 'react';
import { ChallengeFormState } from '../../types/submission';
import { JHARKHAND_DISTRICTS } from '../../data/challengesData';
import { MapPin, Navigation, ShieldCheck, AlertCircle } from 'lucide-react';

interface LocationStepProps {
  formData: ChallengeFormState;
  onChange: (updates: Partial<ChallengeFormState>) => void;
  errors?: Record<string, string>;
}

export function LocationStep({ formData, onChange, errors = {} }: LocationStepProps) {
  const [locating, setLocating] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState(false);

  // Simulated GPS / Current Location grab
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
          // Fallback simulation for Ranchi coordinates
          onChange({
            coordinates: { lat: 23.3441, lng: 85.3096 },
            landmark: formData.landmark || 'Ranchi District Centre',
          });
          setLocating(false);
          setGpsSuccess(true);
        },
        { timeout: 5000 }
      );
    } else {
      onChange({
        coordinates: { lat: 23.3441, lng: 85.3096 },
        landmark: formData.landmark || 'Ranchi Central Coordinates',
      });
      setLocating(false);
      setGpsSuccess(true);
    }
  };

  const validDistricts = JHARKHAND_DISTRICTS.filter((d) => d !== 'All Districts');

  return (
    <div className="space-y-8 text-left max-w-2xl mx-auto">
      {/* Step Header */}
      <div className="space-y-1.5 border-b border-[#EEEAE1] pb-5">
        <h2 className="text-[1.85rem] sm:text-[2.2rem] font-extrabold text-[#1D2522] tracking-tight font-sans">
          Where is this happening?
        </h2>
        <p className="text-[14.5px] text-[#6B5845] leading-relaxed">
          Location helps us understand the local context and connect the challenge with relevant institutions, local panchayats, and university research hubs.
        </p>
      </div>

      {/* District & Block Grid */}
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

        {/* Block / Subdivision Field */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
            <span>Block / Subdivision</span>
            <span className="text-[#BE123C]">*</span>
          </label>
          <input
            type="text"
            value={formData.block}
            onChange={(e) => onChange({ block: e.target.value })}
            placeholder="e.g. Kanke Block / Jharia Sector"
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

      {/* Village / Ward & Landmark Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Village / Ward Field */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            Village / Municipal Ward
          </label>
          <input
            type="text"
            value={formData.villageOrWard}
            onChange={(e) => onChange({ villageOrWard: e.target.value })}
            placeholder="e.g. Murhu Village / Ward 12"
            className="w-full h-12 px-4 rounded-xl border border-[#EEEAE1] bg-white text-[14.5px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none focus:border-[#123B2A] focus:ring-1 focus:ring-[#123B2A] transition-all"
          />
        </div>

        {/* Landmark or Area */}
        <div className="space-y-1.5">
          <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A]">
            Landmark or Specific Spot
          </label>
          <input
            type="text"
            value={formData.landmark}
            onChange={(e) => onChange({ landmark: e.target.value })}
            placeholder="e.g. Near Panchayat Bhavan / Main Culvert"
            className="w-full h-12 px-4 rounded-xl border border-[#EEEAE1] bg-white text-[14.5px] text-[#1D2522] placeholder:text-[#6B5845]/50 shadow-2xs focus:outline-none focus:border-[#123B2A] focus:ring-1 focus:ring-[#123B2A] transition-all"
          />
        </div>
      </div>

      {/* Geographic Map Pin Canvas */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-[13px] font-mono font-bold uppercase tracking-wider text-[#123B2A] flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-[#F5A623]" />
            <span>Interactive Map & Pin Placement</span>
          </label>

          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={locating}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#123B2A] hover:underline cursor-pointer"
          >
            <Navigation className={`h-3.5 w-3.5 ${locating ? 'animate-spin' : ''}`} />
            <span>{locating ? 'Acquiring GPS...' : 'Use Current Location'}</span>
          </button>
        </div>

        {/* Geographic Canvas Placeholder */}
        <div className="relative aspect-[16/9] w-full rounded-2xl border border-[#EEEAE1] bg-[#FAF9F5] overflow-hidden flex flex-col items-center justify-center p-6 shadow-inner text-center">
          {/* Topographic Lines */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 w-full h-full stroke-[#EEEAE1] fill-none"
            strokeWidth="0.8"
          >
            <circle cx="50%" cy="50%" r="60" strokeDasharray="3 3" />
            <circle cx="50%" cy="50%" r="120" />
            <circle cx="50%" cy="50%" r="180" strokeDasharray="4 4" />
          </svg>

          {/* Jharkhand Silhouette Outline */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full stroke-[#123B2A] fill-[#EEEAE1]/50 opacity-40">
            <polygon points="18,32 30,16 54,12 70,22 84,24 88,40 82,54 84,72 70,86 52,90 32,88 22,76 14,56 12,42" strokeWidth="1.2" />
          </svg>

          {/* Central Pin */}
          <div className="relative z-10 flex flex-col items-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#123B2A] text-[#F5A623] shadow-md ring-4 ring-white animate-bounce">
              <MapPin className="h-6 w-6" />
            </div>

            <div className="bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-[#EEEAE1] shadow-xs text-[12.5px] font-mono">
              {formData.district ? (
                <span className="font-bold text-[#123B2A]">
                  {formData.district} {formData.block ? `· ${formData.block}` : ''}
                </span>
              ) : (
                <span className="text-[#6B5845]">Select a district above or tap Use Location</span>
              )}
            </div>

            {gpsSuccess && (
              <span className="text-[11px] font-mono text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded border border-[#BBF7D0]">
                GPS Coordinates Locked
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FAF9F5] border border-[#EEEAE1] text-[12.5px] text-[#6B5845]">
        <ShieldCheck className="h-4 w-4 text-[#15803D] shrink-0" />
        <span>Your exact location coordinates will only be used to understand and validate the challenge.</span>
      </div>
    </div>
  );
}
