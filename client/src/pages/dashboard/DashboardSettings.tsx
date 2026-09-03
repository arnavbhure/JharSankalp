import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DashboardOutletContext } from '../../layouts/DashboardLayout';
import { User, Bell, Check } from 'lucide-react';

export function DashboardSettings() {
  const { currentRole, userName } = useOutletContext<DashboardOutletContext>();
  const [name, setName] = useState(userName);
  const [district, setDistrict] = useState('Khunti');
  const [emailDigest, setEmailDigest] = useState(true);
  const [smsUrgent, setSmsUrgent] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 text-left max-w-3xl">
      {saved && (
        <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-[13px] font-mono font-bold flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>Innovator preferences updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* ── Profile Information ── */}
        <div className="p-6 rounded-3xl border border-[#EEEAE1] bg-white shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase text-[#123B2A] border-b border-[#EEEAE1] pb-2">
            <User className="h-4 w-4 text-[#F5A623]" />
            <span>INNOVATOR PROFILE</span>
          </div>

          <div className="space-y-3 text-[13px]">
            <div className="space-y-1">
              <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3.5 rounded-xl border border-[#EEEAE1] text-[13px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#123B2A] block">
                  Primary District Focus
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#EEEAE1] bg-white text-[12.5px] text-[#1D2522] focus:outline-none focus:border-[#123B2A]"
                >
                  <option value="Khunti">Khunti</option>
                  <option value="Ranchi">Ranchi</option>
                  <option value="Dhanbad">Dhanbad</option>
                  <option value="Latehar">Latehar</option>
                  <option value="Dumka">Dumka</option>
                  <option value="Gumla">Gumla</option>
                  <option value="Simdega">Simdega</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono font-bold uppercase text-[#6B5845] block">
                  Active Role Perspective
                </label>
                <input
                  type="text"
                  disabled
                  value={currentRole.toUpperCase()}
                  className="w-full h-10 px-3.5 rounded-xl border border-[#EEEAE1] bg-[#FAF9F5] text-[12px] font-mono text-[#6B5845] cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Notification Preferences ── */}
        <div className="p-6 rounded-3xl border border-[#EEEAE1] bg-white shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase text-[#123B2A] border-b border-[#EEEAE1] pb-2">
            <Bell className="h-4 w-4 text-[#F5A623]" />
            <span>COMMUNICATION & ALERTS</span>
          </div>

          <div className="space-y-3 text-[13px]">
            <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF9F5] cursor-pointer">
              <input
                type="checkbox"
                checked={smsUrgent}
                onChange={(e) => setSmsUrgent(e.target.checked)}
                className="mt-1 accent-[#123B2A] cursor-pointer"
              />
              <div>
                <strong className="text-[#1D2522] block">
                  Urgent Field Telemetry SMS Alerts
                </strong>
                <span className="text-[12px] text-[#6B5845]">
                  Instant notification when a monitored drinking water pump triggers a breakdown alert.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF9F5] cursor-pointer">
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="mt-1 accent-[#123B2A] cursor-pointer"
              />
              <div>
                <strong className="text-[#1D2522] block">
                  Weekly Civic Innovation Digest
                </strong>
                <span className="text-[12px] text-[#6B5845]">
                  Summary of newly posted challenges, collaborator invitations, and university prototype updates.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#123B2A] hover:bg-[#0D2B1E] text-white text-[13px] font-bold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
