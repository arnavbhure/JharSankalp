import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import {
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Mail,
  Lock,
  User,
  MapPin,
  Phone,
  CheckCircle2,
  Eye,
  EyeOff,
  Sparkles,
  GraduationCap,
  Briefcase,
  Landmark,
} from 'lucide-react';

const JHARKHAND_DISTRICTS = [
  'Bokaro',
  'Chatra',
  'Deoghar',
  'Dhanbad',
  'Dumka',
  'East Singhbhum',
  'Garhwa',
  'Giridih',
  'Godda',
  'Gumla',
  'Hazaribagh',
  'Jamtara',
  'Khunti',
  'Koderma',
  'Latehar',
  'Lohardaga',
  'Pakur',
  'Palamu',
  'Ramgarh',
  'Ranchi',
  'Sahebganj',
  'Seraikela-Kharsawan',
  'Simdega',
  'West Singhbhum',
];

const DEMO_ACCOUNTS = [
  {
    roleKey: 'CITIZEN',
    label: 'Citizen Innovator',
    name: 'Kavita Munda',
    email: 'kavita.munda@jharsankalp.in',
    role: 'CITIZEN',
    district: 'Khunti District',
    icon: User,
    color: 'border-emerald-600/30 bg-emerald-50/50 text-emerald-950',
    tagBg: 'bg-emerald-100 text-emerald-800',
  },
  {
    roleKey: 'GOVERNMENT',
    label: 'Government Reviewer',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.ias@jharkhand.gov.in',
    role: 'GOVERNMENT',
    district: 'BDO Murhu, Khunti',
    icon: Landmark,
    color: 'border-blue-600/30 bg-blue-50/50 text-blue-950',
    tagBg: 'bg-blue-100 text-blue-800',
  },
  {
    roleKey: 'UNIVERSITY',
    label: 'University R&D Lead',
    name: 'Prof. Anand Verma',
    email: 'anand.verma@bitmesra.ac.in',
    role: 'UNIVERSITY',
    district: 'BIT Mesra, Ranchi',
    icon: GraduationCap,
    color: 'border-amber-600/30 bg-amber-50/50 text-amber-950',
    tagBg: 'bg-amber-100 text-amber-800',
  },
  {
    roleKey: 'INDUSTRY',
    label: 'Industry CSR Lead',
    name: 'Sanjay Oraon',
    email: 'sanjay.oraon@tatasteel.com',
    role: 'INDUSTRY',
    district: 'Tata Steel TSRDS',
    icon: Briefcase,
    color: 'border-purple-600/30 bg-purple-50/50 text-purple-950',
    tagBg: 'bg-purple-100 text-purple-800',
  },
  {
    roleKey: 'ADMIN',
    label: 'Super Administrator',
    name: 'IT Mission Admin',
    email: 'admin@jharsankalp.in',
    role: 'SUPER_ADMIN',
    district: 'State IT Mission',
    icon: ShieldCheck,
    color: 'border-rose-600/30 bg-rose-50/50 text-rose-950',
    tagBg: 'bg-rose-100 text-rose-800',
  },
];

interface LoginProps {
  initialMode?: 'signin' | 'signup';
}

export function Login({ initialMode }: LoginProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, verifyOtp, resendOtp, isAuthenticated, user, isAuthenticating } = useAuth();

  // Mode defaults to initialMode, or checks pathname
  const [mode, setMode] = useState<'signin' | 'signup' | 'otp'>(() => {
    if (initialMode) return initialMode;
    return location.pathname.includes('/signup') ? 'signup' : 'signin';
  });

  // Track active selected demo account for visual feedback
  const [selectedDemoEmail, setSelectedDemoEmail] = useState<string | null>(null);

  // Sign In state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Sign Up state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupRole, setSignupRole] = useState('CITIZEN');
  const [signupDistrict, setSignupDistrict] = useState('Ranchi');
  const [signupPhone, setSignupPhone] = useState('');

  // OTP state
  const [otpTargetEmail, setOtpTargetEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [cooldown, setCooldown] = useState(0);

  // Redirection target
  const fromPath = (location.state as any)?.from?.pathname;

  const resolveRedirectPath = (role?: string) => {
    if (fromPath && fromPath !== '/login' && fromPath !== '/signup') return fromPath;
    const r = (role || user?.role || '').toUpperCase();
    if (r.includes('GOV') || r.includes('OFFICER') || r.includes('STATE')) {
      return '/government/dashboard';
    }
    if (r.includes('UNI') || r.includes('FACULTY') || r.includes('STUDENT')) {
      return '/university/dashboard';
    }
    if (r.includes('IND') || r.includes('STARTUP') || r.includes('MSME') || r.includes('CSR')) {
      return '/industry/dashboard';
    }
    return '/dashboard';
  };

  // Auto redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(resolveRedirectPath(user.role), { replace: true });
    }
  }, [isAuthenticated, user]);

  // Resend cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(loginEmail, loginPassword);
      if (result.requiresVerification) {
        setOtpTargetEmail(result.email || loginEmail);
        setMode('otp');
        setCooldown(60);
      }
    } catch {
      // Handled by authStore toasts
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signup({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        role: signupRole,
        district: signupDistrict,
        phone: signupPhone,
      });

      setOtpTargetEmail(result.email || signupEmail);
      setMode('otp');
      setCooldown(60);
    } catch {
      // Handled by authStore toasts
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const verifiedUser = await verifyOtp(otpTargetEmail, otpCode);
      navigate(resolveRedirectPath(verifiedUser.role), { replace: true });
    } catch {
      // Handled by authStore toasts
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0) return;
    try {
      await resendOtp(otpTargetEmail);
      setCooldown(60);
    } catch {
      // Handled by authStore toasts
    }
  };

  const fillDemoAccount = (demo: (typeof DEMO_ACCOUNTS)[0]) => {
    setLoginEmail(demo.email);
    setLoginPassword('password123');
    setSelectedDemoEmail(demo.email);
    setMode('signin');
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* ── Outer Shell Container ── */}
      <div className="max-w-6xl w-full mx-auto">
        {/* Top Minimal Branding on Mobile */}
        <div className="lg:hidden text-center mb-6">
          <Link to="/" className="inline-block transition-transform hover:scale-[1.02]">
            <img
              src="/web_logo.png"
              alt="JharSankalp"
              className="h-12 w-auto mx-auto object-contain"
            />
          </Link>
          <p className="mt-1 text-[12px] font-semibold text-[#6B5845] uppercase tracking-wider">
            Government of Jharkhand · Innovation Ecosystem
          </p>
        </div>

        {/* Dual Panel Card Layout */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_-15px_rgba(18,59,42,0.15)] border border-[#EEEAE1] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN: Editorial Jharkhand Identity & Mission Showcase
             ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#123B2A] via-[#174632] to-[#0A2218] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Topographic Background Overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.07] pattern-topography"
            />

            {/* Glowing Accent Orbs */}
            <div
              aria-hidden="true"
              className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-[#F5A623]/20 blur-3xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#1F5A3D]/40 blur-3xl pointer-events-none"
            />

            {/* Top Identity Header */}
            <div className="relative z-10 space-y-4">
              <Link to="/" className="inline-flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
                  <img src="/web_logo.png" alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
                </div>
                <div className="text-left">
                  <div className="text-[17px] font-extrabold tracking-tight text-white leading-tight">
                    JharSankalp
                  </div>
                  <div className="text-[10.5px] font-semibold text-[#F5A623] uppercase tracking-wider">
                    Govt of Jharkhand
                  </div>
                </div>
              </Link>

              <div className="pt-4 text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold text-[#F5A623] mb-3">
                  <Sparkles className="h-3 w-3" />
                  <span>Statewide Innovation Exchange</span>
                </div>
                <h2 className="text-[1.8rem] sm:text-[2.1rem] font-extrabold text-white leading-[1.18] tracking-tight">
                  Local Challenges.
                  <br />
                  <span className="text-[#F5A623]">Collective Action.</span>
                </h2>
                <p className="mt-3 text-[13.5px] text-white/80 leading-relaxed max-w-sm">
                  Connecting citizens, grassroots caretakers, universities, and CSR partners to engineer verifiable solutions for Jharkhand.
                </p>
              </div>
            </div>

            {/* Middle: 4 Ecosystem Pillars */}
            <div className="relative z-10 py-6 my-auto space-y-3.5 text-left">
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] shrink-0 mt-0.5">
                  <User className="h-4 w-4" />
                </div>
                <div className="text-[12.5px]">
                  <span className="font-bold text-white block">Grassroots Citizens & Sahiyas</span>
                  <span className="text-white/70 text-[11.5px]">Identify authentic water, health, and agricultural issues with geo-evidence.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-[#4CAF50]/20 flex items-center justify-center text-[#81C784] shrink-0 mt-0.5">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div className="text-[12.5px]">
                  <span className="font-bold text-white block">Academic R&D Institutions</span>
                  <span className="text-white/70 text-[11.5px]">Deploy IoT telemetry, spectrometers, and engineering prototypes.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-[#90CAF9]/20 flex items-center justify-center text-[#90CAF9] shrink-0 mt-0.5">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div className="text-[12.5px]">
                  <span className="font-bold text-white block">Industry & CSR Partners</span>
                  <span className="text-white/70 text-[11.5px]">Provide catalytic co-funding and scalable field deployment.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-xs">
                <div className="w-8 h-8 rounded-lg bg-[#CE93D8]/20 flex items-center justify-center text-[#CE93D8] shrink-0 mt-0.5">
                  <Landmark className="h-4 w-4" />
                </div>
                <div className="text-[12.5px]">
                  <span className="font-bold text-white block">District & State Administration</span>
                  <span className="text-white/70 text-[11.5px]">Validate citizen evidence and sanction field implementation pilots.</span>
                </div>
              </div>
            </div>

            {/* Bottom: Verified Ticker */}
            <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-white/70 font-medium">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#4CAF50] animate-pulse" />
                <span>24 Districts Connected</span>
              </div>
              <div>7 Active Field Pilots</div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: Interactive Authentication & Demo Selector
             ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between text-left">
            <div>
              {/* Mode Selector Tabs (Sign In / Sign Up) */}
              {mode !== 'otp' && (
                <div className="flex p-1 bg-[#F5F2EB] rounded-xl mb-6 max-w-sm">
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className={`flex-1 py-2 text-center text-[13.5px] font-bold rounded-lg transition-all cursor-pointer ${
                      mode === 'signin'
                        ? 'bg-white text-[#123B2A] shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className={`flex-1 py-2 text-center text-[13.5px] font-bold rounded-lg transition-all cursor-pointer ${
                      mode === 'signup'
                        ? 'bg-white text-[#123B2A] shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              )}

              {/* ── MODE 1: SIGN IN ── */}
              {mode === 'signin' && (
                <div>
                  <div className="mb-4">
                    <h2 className="text-[1.5rem] font-extrabold text-[#1D2522] tracking-tight">
                      Sign In to Platform
                    </h2>
                    <p className="text-[13px] text-neutral-600 mt-0.5">
                      Access your role-specific dashboard, project milestones, and notifications.
                    </p>
                  </div>

                  {/* ── EVALUATOR DEMO QUICK-FILL PANEL (Key Demonstration Feature) ── */}
                  <div className="mb-5 p-3 sm:p-3.5 rounded-xl border border-[#D5CFBF]/70 bg-[#FCFBF8] shadow-2xs">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-[#123B2A] uppercase tracking-wider">
                        <ShieldCheck className="h-4 w-4 text-[#123B2A]" />
                        <span>Demo Evaluator Quick-Fill</span>
                      </div>
                      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-[#EEEAE1] text-neutral-700">
                        Default: password123
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {DEMO_ACCOUNTS.map((demo) => {
                        const IconComponent = demo.icon;
                        const isSelected = selectedDemoEmail === demo.email;
                        return (
                          <button
                            key={demo.email}
                            type="button"
                            onClick={() => fillDemoAccount(demo)}
                            className={`p-2 rounded-lg border text-left transition-all cursor-pointer group ${
                              isSelected
                                ? 'border-[#123B2A] bg-[#123B2A]/5 ring-2 ring-[#123B2A]/20'
                                : 'border-[#EEEAE1] bg-white hover:bg-[#F8F6F1] hover:border-[#D5CFBF]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-[11.5px] font-bold text-[#1D2522] truncate group-hover:text-[#123B2A] flex items-center gap-1">
                                <IconComponent className="h-3 w-3 shrink-0 text-[#123B2A]" />
                                <span>{demo.label.split(' ')[0]}</span>
                              </span>
                              <span className={`text-[9.5px] font-semibold px-1 py-0.2 rounded ${demo.tagBg}`}>
                                {demo.roleKey}
                              </span>
                            </div>
                            <div className="text-[11px] font-medium text-neutral-600 truncate">
                              {demo.name}
                            </div>
                            <div className="text-[10px] text-neutral-400 font-mono truncate">
                              {demo.district}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {selectedDemoEmail && (
                      <div className="mt-2 text-[11px] font-medium text-[#123B2A] flex items-center gap-1.5 pt-1 border-t border-[#EEEAE1]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#123B2A]" />
                        <span>Credentials loaded. Click &quot;Sign In&quot; below to access dashboard.</span>
                      </div>
                    )}
                  </div>

                  {/* Standard Sign In Form */}
                  <form onSubmit={handleSignIn} className="space-y-3.5">
                    <div>
                      <label className="block text-[13px] font-semibold text-[#1D2522] mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                        <input
                          type="email"
                          required
                          placeholder="name@jharsankalp.in"
                          value={loginEmail}
                          onChange={(e) => {
                            setLoginEmail(e.target.value);
                            setSelectedDemoEmail(null);
                          }}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#D5CFBF] focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13.5px] text-[#1D2522] bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[13px] font-semibold text-[#1D2522]">Password</label>
                        <span className="text-[11.5px] text-[#123B2A] hover:underline cursor-pointer">
                          Forgot password?
                        </span>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[#D5CFBF] focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13.5px] text-[#1D2522] bg-white transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer focus:outline-none"
                        >
                          {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isAuthenticating}
                      className="w-full py-3 bg-[#123B2A] hover:bg-[#0D2B1E] text-white font-bold rounded-lg mt-2 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-[0.99]"
                    >
                      {isAuthenticating ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Verifying Credentials...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to Dashboard</span>
                          <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}

              {/* ── MODE 2: CREATE ACCOUNT (SIGN UP) ── */}
              {mode === 'signup' && (
                <div>
                  <div className="mb-4">
                    <h2 className="text-[1.5rem] font-extrabold text-[#1D2522] tracking-tight">
                      Create Your Account
                    </h2>
                    <p className="text-[13px] text-neutral-600 mt-0.5">
                      Join Jharkhand&apos;s state multi-stakeholder innovation registry.
                    </p>
                  </div>

                  <form onSubmit={handleSignUp} className="space-y-3">
                    {/* Visual Role Picker Cards */}
                    <div>
                      <label className="block text-[12.5px] font-semibold text-[#1D2522] mb-1.5">
                        Select Your Platform Role
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'CITIZEN', title: 'Citizen Innovator', desc: 'Report issues & propose local solutions' },
                          { id: 'UNIVERSITY', title: 'Academic / R&D', desc: 'Deploy research & prototypes' },
                          { id: 'INDUSTRY', title: 'Industry / CSR', desc: 'Co-sponsor & scale field pilots' },
                          { id: 'GOVERNMENT', title: 'Govt Official', desc: 'Review & sanction district pilots' },
                        ].map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setSignupRole(r.id)}
                            className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                              signupRole === r.id
                                ? 'border-[#123B2A] bg-[#123B2A]/5 ring-2 ring-[#123B2A]/20'
                                : 'border-[#EEEAE1] bg-white hover:bg-[#FAF9F5]'
                            }`}
                          >
                            <div className="text-[12px] font-bold text-[#1D2522]">{r.title}</div>
                            <div className="text-[10px] text-neutral-500 leading-tight mt-0.5">{r.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Full Name & District */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[12.5px] font-semibold text-[#1D2522] mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Birsa Soren"
                            value={signupName}
                            onChange={(e) => setSignupName(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#D5CFBF] focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13px] bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[12.5px] font-semibold text-[#1D2522] mb-1">
                          Jharkhand District
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
                          <select
                            value={signupDistrict}
                            onChange={(e) => setSignupDistrict(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#D5CFBF] focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13px] bg-white cursor-pointer"
                          >
                            {JHARKHAND_DISTRICTS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[12.5px] font-semibold text-[#1D2522] mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
                          <input
                            type="email"
                            required
                            placeholder="user@jharkhand.in"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#D5CFBF] focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13px] bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[12.5px] font-semibold text-[#1D2522] mb-1">
                          Phone (Optional)
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
                          <input
                            type="tel"
                            placeholder="94311 00000"
                            value={signupPhone}
                            onChange={(e) => setSignupPhone(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#D5CFBF] focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13px] bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-[12.5px] font-semibold text-[#1D2522] mb-1">
                        Password (min. 8 characters)
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
                        <input
                          type={showSignupPassword ? 'text' : 'password'}
                          required
                          minLength={8}
                          maxLength={72}
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="w-full pl-9 pr-9 py-2 rounded-lg border border-[#D5CFBF] focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13px] bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                          aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer focus:outline-none"
                        >
                          {showSignupPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isAuthenticating}
                      className="w-full py-2.5 bg-[#123B2A] hover:bg-[#0D2B1E] text-white font-bold rounded-lg mt-2 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                    >
                      {isAuthenticating ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Submitting Registration...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Account & Send OTP</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}

              {/* ── MODE 3: OTP VERIFICATION ── */}
              {mode === 'otp' && (
                <div className="text-center py-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#123B2A]/10 text-[#123B2A] mx-auto mb-4 border border-[#123B2A]/20">
                    <ShieldCheck className="h-7 w-7" />
                  </div>

                  <h2 className="text-[1.5rem] font-extrabold text-[#1D2522] tracking-tight">
                    Verify Your Account
                  </h2>
                  <p className="text-[13px] text-neutral-600 mt-1 max-w-sm mx-auto leading-relaxed">
                    A 6-digit verification code has been dispatched to:
                    <br />
                    <strong className="text-[#123B2A] font-mono text-[14px]">{otpTargetEmail}</strong>
                  </p>

                  <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
                    <div>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        autoFocus
                        placeholder="••••••"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-48 mx-auto text-center font-mono text-[2.2rem] tracking-[10px] font-extrabold py-2 px-4 rounded-xl border-2 border-[#123B2A] focus:outline-none focus:ring-4 focus:ring-[#123B2A]/20 bg-[#FAF9F5] text-[#123B2A]"
                      />
                      <span className="block text-[11px] text-neutral-500 mt-2">
                        Valid for 10 minutes · Check spam folder if not received
                      </span>
                    </div>

                    <Button
                      type="submit"
                      disabled={isAuthenticating || otpCode.length !== 6}
                      className="w-full py-3 bg-[#123B2A] hover:bg-[#0D2B1E] text-white font-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
                    >
                      {isAuthenticating ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Verifying Passcode...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Verify & Proceed to Dashboard</span>
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 pt-4 border-t border-[#EEEAE1] flex items-center justify-between text-[12.5px]">
                    <button
                      type="button"
                      onClick={() => setMode('signin')}
                      className="text-neutral-500 hover:text-neutral-900 cursor-pointer font-medium"
                    >
                      ← Back to Sign In
                    </button>

                    <button
                      type="button"
                      disabled={cooldown > 0}
                      onClick={handleResendOtp}
                      className={`font-semibold cursor-pointer transition-colors ${
                        cooldown > 0
                          ? 'text-neutral-400 cursor-not-allowed'
                          : 'text-[#123B2A] hover:underline'
                      }`}
                    >
                      {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend Code'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Institutional Security Notice */}
            <div className="mt-8 pt-4 border-t border-[#EEEAE1] text-[11.5px] text-[#6B5845] flex items-center justify-between">
              <span>🔒 Encrypted TLS Session · HttpOnly Cookie Security</span>
              <span className="hidden sm:inline">Official State Innovation Exchange</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
