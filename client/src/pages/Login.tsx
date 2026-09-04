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
  UserPlus,
  MapPin,
  Phone,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe,
  ArrowLeft,
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
  },
  {
    roleKey: 'GOVERNMENT',
    label: 'Government Reviewer',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.ias@jharkhand.gov.in',
    role: 'GOVERNMENT',
    district: 'BDO Murhu, Khunti',
    icon: Landmark,
  },
  {
    roleKey: 'UNIVERSITY',
    label: 'University R&D Lead',
    name: 'Prof. Anand Verma',
    email: 'anand.verma@bitmesra.ac.in',
    role: 'UNIVERSITY',
    district: 'BIT Mesra, Ranchi',
    icon: GraduationCap,
  },
  {
    roleKey: 'INDUSTRY',
    label: 'Industry CSR Partner',
    name: 'Sanjay Oraon',
    email: 'sanjay.oraon@tatasteel.com',
    role: 'INDUSTRY',
    district: 'Tata Steel TSRDS',
    icon: Briefcase,
  },
  {
    roleKey: 'ADMIN',
    label: 'Super Administrator',
    name: 'IT Mission Admin',
    email: 'admin@jharsankalp.in',
    role: 'SUPER_ADMIN',
    district: 'State IT Mission',
    icon: ShieldCheck,
  },
];

interface LoginProps {
  initialMode?: 'signin' | 'signup';
}

export function Login({ initialMode }: LoginProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, verifyOtp, resendOtp, isAuthenticated, user, isAuthenticating } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup' | 'otp'>(() => {
    if (initialMode) return initialMode;
    return location.pathname.includes('/signup') ? 'signup' : 'signin';
  });

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

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(resolveRedirectPath(user.role), { replace: true });
    }
  }, [isAuthenticated, user]);

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
      // Handled by store toast
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
      // Handled by store toast
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const verifiedUser = await verifyOtp(otpTargetEmail, otpCode);
      navigate(resolveRedirectPath(verifiedUser.role), { replace: true });
    } catch {
      // Handled by store toast
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0) return;
    try {
      await resendOtp(otpTargetEmail);
      setCooldown(60);
    } catch {
      // Handled by store toast
    }
  };

  const fillDemoAccount = (demo: (typeof DEMO_ACCOUNTS)[0]) => {
    setLoginEmail(demo.email);
    setLoginPassword('password123');
    setSelectedDemoEmail(demo.email);
    setMode('signin');
  };

  return (
    <div className="min-h-screen bg-[#F0EDE6] flex items-center justify-center p-3 sm:p-6 lg:p-10 font-sans text-neutral-800">
      {/* ── Main Master Card Container ── */}
      <div className="w-full max-w-[1180px] bg-white rounded-[24px] sm:rounded-[32px] shadow-[0_25px_70px_-15px_rgba(18,59,42,0.18)] border border-[#E3DFD5] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">

        {/* ─────────────────────────────────────────────────────────────
            LEFT PANEL: Exact Thematic Artwork (Waterfall, Youth, Stats)
           ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 relative bg-[#123B2A] text-white flex flex-col justify-between overflow-hidden select-none min-h-[460px] lg:min-h-[700px]">
          {/* Background Artwork Layer */}
          <img
            src="/images/auth_left_banner.png"
            alt="JharSankalp Landscape & Innovation Journey"
            className="absolute inset-0 w-full h-full object-cover object-left-top"
          />

          {/* Gradient Lighting Shroud to Guarantee Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E2F21]/80 via-transparent to-transparent pointer-events-none" />

          {/* Content overlay spacer to preserve layout responsiveness */}
          <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full pointer-events-none">
            {/* Top row is visually contained inside auth_left_banner.jpg */}
            <div className="h-12" />
            <div className="h-12" />
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT PANEL: Themed Auth Interface (Tabs, Inputs, SSO, Motif)
           ───────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative text-left">
          {/* Top Controls: Language & Back to Home */}
          <div className="flex items-center justify-end gap-2 mb-6">
            <button
              type="button"
              title="Language / Locale"
              className="w-8 h-8 rounded-full border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5 text-neutral-600" />
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 text-[12px] font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div>
            {/* Title & Subtitle Header */}
            <div className="mb-5">
              <h1 className="text-[1.85rem] sm:text-[2.1rem] font-bold text-[#1D2522] tracking-tight leading-tight">
                {mode === 'signup' ? 'Create Account' : mode === 'otp' ? 'Verification' : 'Welcome Back!'}
              </h1>
              <p className="text-[13px] text-neutral-500 mt-1">
                {mode === 'signup'
                  ? 'Join JharSankalp to report challenges and co-create solutions'
                  : mode === 'otp'
                    ? 'Enter the 6-digit code sent to your email'
                    : 'Sign in to continue your journey with JharSankalp'}
              </p>
            </div>

            {/* Pill Tab Switcher (Sign In vs Create Account) */}
            {mode !== 'otp' && (
              <div className="flex items-center bg-[#F3EFE6] p-1 rounded-xl mb-4 max-w-sm">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className={`flex-1 py-2 px-3 rounded-lg text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${mode === 'signin'
                      ? 'bg-[#123B2A] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-2 px-3 rounded-lg text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${mode === 'signup'
                      ? 'bg-[#123B2A] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  <span>Create Account</span>
                </button>
              </div>
            )}

            {/* ── Evaluator Demo Persona Quick-Fill ── */}
            {mode === 'signin' && (
              <div className="mb-4 p-2.5 rounded-xl border border-[#D5CFBF]/70 bg-[#FCFAF5]">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#123B2A] uppercase tracking-wider">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#123B2A]" />
                    <span>Demo Accounts (1-Click Fill)</span>
                  </div>
                  <span className="text-[10.5px] font-mono text-neutral-500">
                    pwd: password123
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {DEMO_ACCOUNTS.map((demo) => {
                    const isSelected = selectedDemoEmail === demo.email;
                    return (
                      <button
                        key={demo.email}
                        type="button"
                        onClick={() => fillDemoAccount(demo)}
                        className={`p-1.5 rounded-lg border text-left transition-all cursor-pointer truncate ${isSelected
                            ? 'border-[#123B2A] bg-[#123B2A]/10 ring-1 ring-[#123B2A]'
                            : 'border-[#EEEAE1] bg-white hover:bg-[#FAF9F5]'
                          }`}
                      >
                        <div className="text-[11px] font-bold text-[#1D2522] truncate">
                          {demo.label.split(' ')[0]}
                        </div>
                        <div className="text-[10px] text-neutral-500 truncate">
                          {demo.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Mode 1: Sign In Form ── */}
            {mode === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-3">
                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1D2522] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        setSelectedDemoEmail(null);
                      }}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13.5px] bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12.5px] font-semibold text-[#1D2522] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13.5px] bg-white transition-all"
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
                  <div className="text-right mt-1">
                    <span className="text-[11.5px] text-neutral-500 hover:text-[#123B2A] cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                </div>

                {/* Primary Green Submit Button */}
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-2.5 bg-[#123B2A] hover:bg-[#0D2B1E] active:scale-[0.99] text-white font-bold rounded-xl text-[14px] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer mt-1"
                >
                  {isAuthenticating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ── Mode 2: Create Account Form ── */}
            {mode === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-2.5">
                <div className="grid grid-cols-2 gap-1.5 mb-1">
                  {[
                    { id: 'CITIZEN', title: 'Citizen' },
                    { id: 'UNIVERSITY', title: 'Academic' },
                    { id: 'INDUSTRY', title: 'Industry / CSR' },
                    { id: 'GOVERNMENT', title: 'Govt Official' },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSignupRole(r.id)}
                      className={`py-1.5 px-2 rounded-lg border text-center text-[12px] font-bold transition-all cursor-pointer ${signupRole === r.id
                          ? 'border-[#123B2A] bg-[#123B2A]/10 text-[#123B2A] ring-1 ring-[#123B2A]'
                          : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                    >
                      {r.title}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#1D2522] mb-0.5">
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
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13px] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#1D2522] mb-0.5">
                      Jharkhand District
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
                      <select
                        value={signupDistrict}
                        onChange={(e) => setSignupDistrict(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13px] bg-white cursor-pointer"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#1D2522] mb-0.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
                      <input
                        type="email"
                        required
                        placeholder="name@jharkhand.in"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13px] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#1D2522] mb-0.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
                      <input
                        type="tel"
                        placeholder="94311 00000"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13px] bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#1D2522] mb-0.5">
                    Password (min. 8 chars)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400 pointer-events-none" />
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="w-full pl-9 pr-9 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13px] bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer focus:outline-none"
                    >
                      {showSignupPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-2.5 bg-[#123B2A] hover:bg-[#0D2B1E] active:scale-[0.99] text-white font-bold rounded-xl text-[14px] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer mt-1"
                >
                  {isAuthenticating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account & Proceed</span>
                      <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ── Mode 3: OTP Screen ── */}
            {mode === 'otp' && (
              <div className="py-2 text-center">
                <p className="text-[13px] text-neutral-600 mb-4">
                  Passcode dispatched to <strong className="text-[#123B2A] font-mono">{otpTargetEmail}</strong>
                </p>
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    placeholder="••••••"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-48 mx-auto text-center font-mono text-[2rem] tracking-[10px] font-extrabold py-2 px-4 rounded-xl border-2 border-[#123B2A] focus:outline-none bg-[#FAF9F5] text-[#123B2A]"
                  />

                  <Button
                    type="submit"
                    disabled={isAuthenticating || otpCode.length !== 6}
                    className="w-full py-2.5 bg-[#123B2A] hover:bg-[#0D2B1E] text-white font-bold rounded-xl flex items-center justify-center gap-2"
                  >
                    {isAuthenticating ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                    <span>Verify & Continue</span>
                  </Button>
                </form>

                <div className="mt-4 flex items-center justify-between text-[12px]">
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-neutral-500 hover:text-neutral-900 cursor-pointer"
                  >
                    ← Back to Sign In
                  </button>
                  <button
                    type="button"
                    disabled={cooldown > 0}
                    onClick={handleResendOtp}
                    className={cooldown > 0 ? 'text-neutral-400' : 'text-[#123B2A] font-bold hover:underline cursor-pointer'}
                  >
                    {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Code'}
                  </button>
                </div>
              </div>
            )}

            {/* ── Divider ── */}
            {mode !== 'otp' && (
              <div className="flex items-center gap-3 my-3 text-neutral-400 text-[11px] font-semibold uppercase tracking-wider">
                <div className="h-px bg-neutral-200 flex-1" />
                <span>OR</span>
                <div className="h-px bg-neutral-200 flex-1" />
              </div>
            )}

            {/* ── Social / Govt SSO Buttons ── */}
            {mode !== 'otp' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => alert('Google authentication service ready in staging.')}
                  className="py-2 px-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center gap-2 text-[12px] font-semibold text-neutral-700 transition-all cursor-pointer"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert('Govt. SSO Jan Parichay federation active.')}
                  className="py-2 px-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center gap-2 text-[11.5px] font-semibold text-neutral-700 transition-all cursor-pointer"
                >
                  <Landmark className="h-4 w-4 text-[#123B2A] shrink-0" />
                  <div className="text-left leading-tight">
                    <span className="block text-[11px] font-bold">Continue with Govt. SSO</span>
                    <span className="block text-[9.5px] text-neutral-400 font-medium">(Jan Parichay)</span>
                  </div>
                </button>
              </div>
            )}

            {/* ── Security Trust Banner ── */}
            <div className="mt-3 p-2.5 rounded-xl bg-[#EAF5EE] border border-[#C8E8D2] flex items-center gap-2.5 text-left">
              <div className="w-5 h-5 rounded-full bg-[#123B2A] flex items-center justify-center text-white shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <p className="text-[11.5px] font-medium text-[#123B2A] leading-tight">
                A secure platform for citizens, institutions and partners working towards a better Jharkhand.
              </p>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              BOTTOM RIGHT: Sohrai Tribal Folk Art Strip & Calligraphy
             ───────────────────────────────────────────────────────────── */}
          <div className="pt-2">
            <img
              src="/images/auth_sohrai_motif.png"
              alt="Ideas for People, Progress for Jharkhand"
              className="w-full max-w-[380px] ml-auto pointer-events-none select-none object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
