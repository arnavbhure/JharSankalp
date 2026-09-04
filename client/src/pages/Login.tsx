import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Mail,
  Lock,
  User,
  MapPin,
  Building2,
  Phone,
  CheckCircle2,
  Eye,
  EyeOff,
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
    label: 'Citizen Innovator',
    name: 'Kavita Munda',
    email: 'kavita.munda@jharsankalp.in',
    role: 'CITIZEN',
    badge: 'Khunti District',
  },
  {
    label: 'Government Reviewer',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.ias@jharkhand.gov.in',
    role: 'GOVERNMENT',
    badge: 'BDO Murhu',
  },
  {
    label: 'University R&D Lead',
    name: 'Prof. Anand Verma',
    email: 'anand.verma@bitmesra.ac.in',
    role: 'UNIVERSITY',
    badge: 'BIT Mesra',
  },
  {
    label: 'Industry CSR Partner',
    name: 'Sanjay Oraon',
    email: 'sanjay.oraon@tatasteel.com',
    role: 'INDUSTRY',
    badge: 'Tata Steel TSRDS',
  },
];

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, verifyOtp, resendOtp, isAuthenticated, user, isAuthenticating } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup' | 'otp'>('signin');

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
    if (fromPath && fromPath !== '/login') return fromPath;
    const r = (role || user?.role || '').toUpperCase();
    if (r.includes('GOV') || r.includes('OFFICER') || r.includes('STATE')) {
      return '/government/dashboard';
    }
    if (r.includes('UNI') || r.includes('FACULTY') || r.includes('STUDENT')) {
      return '/university/dashboard';
    }
    if (r.includes('IND') || r.includes('STARTUP') || r.includes('MSME')) {
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
    setMode('signin');
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] flex flex-col justify-center py-10 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Institutional Branding Logo */}
        <Link to="/" className="inline-block transition-transform hover:scale-[1.02]">
          <img
            src="/web_logo.png"
            alt="JharSankalp — Societal Challenge-to-Impact Exchange"
            className="h-14 sm:h-16 w-auto mx-auto object-contain"
          />
        </Link>
        <p className="mt-2 text-[13px] font-semibold text-[#6B5845] uppercase tracking-wider">
          Government of Jharkhand · Innovation Ecosystem
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg px-4">
        <Card padding="lg" className="border-[#EEEAE1] shadow-md bg-white rounded-xl">
          {/* Navigation Tabs (only for Sign In / Sign Up) */}
          {mode !== 'otp' && (
            <div className="flex border-b border-[#EEEAE1] mb-6">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 py-3 text-center text-[14px] font-bold transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'border-b-2 border-[#123B2A] text-[#123B2A]'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-3 text-center text-[14px] font-bold transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'border-b-2 border-[#123B2A] text-[#123B2A]'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* ── Mode 1: Sign In ── */}
          {mode === 'signin' && (
            <div>
              <div className="mb-5 text-left">
                <h2 className="text-[1.35rem] font-bold text-[#1D2522] tracking-tight">
                  Welcome to JharSankalp
                </h2>
                <p className="text-[13px] text-neutral-600 mt-0.5">
                  Sign in with your verified institutional or citizen credentials.
                </p>
              </div>

              <form onSubmit={handleSignIn} className="space-y-4 text-left">
                <div>
                  <label className="block text-[13px] font-semibold text-[#1D2522] mb-1.5">
                    Official Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="user@jharsankalp.in"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-[#D5CFBF] focus:outline-none focus:ring-2 focus:ring-[#123B2A] focus:border-[#123B2A] text-[14px] text-[#1D2522] bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[13px] font-semibold text-[#1D2522]">Password</label>
                    <span className="text-[12px] text-[#123B2A] hover:underline cursor-pointer">
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
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[#D5CFBF] focus:outline-none focus:ring-2 focus:ring-[#123B2A] focus:border-[#123B2A] text-[14px] text-[#1D2522] bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer focus:outline-none"
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3 bg-[#123B2A] hover:bg-[#0D2B1E] text-white font-bold rounded-lg mt-2 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                >
                  {isAuthenticating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Demo Evaluation Credentials Helper */}
              <div className="mt-6 pt-5 border-t border-[#EEEAE1] text-left">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-[#6B5845] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#123B2A]" />
                    Evaluator Quick Fill (Seeded Accounts)
                  </span>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    pwd: password123
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DEMO_ACCOUNTS.map((demo) => (
                    <button
                      key={demo.role}
                      type="button"
                      onClick={() => fillDemoAccount(demo)}
                      className="text-left p-2.5 rounded-lg border border-[#EEEAE1] bg-[#FAF9F5] hover:bg-[#F0EBE0] hover:border-[#D5CFBF] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-bold text-[#123B2A] group-hover:underline">
                          {demo.label}
                        </span>
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-sm bg-white border border-[#EEEAE1] text-neutral-600">
                          {demo.badge}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-500 font-mono truncate mt-0.5">
                        {demo.email}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Mode 2: Create Account ── */}
          {mode === 'signup' && (
            <div>
              <div className="mb-5 text-left">
                <h2 className="text-[1.35rem] font-bold text-[#1D2522] tracking-tight">
                  Join JharSankalp
                </h2>
                <p className="text-[13px] text-neutral-600 mt-0.5">
                  Register as an innovator, institutional researcher, or government official.
                </p>
              </div>

              <form onSubmit={handleSignUp} className="space-y-3.5 text-left">
                <div>
                  <label className="block text-[13px] font-semibold text-[#1D2522] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Mahto"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2 rounded-lg border border-[#D5CFBF] focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13.5px] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#1D2522] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="ramesh@jharkhand.in"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2 rounded-lg border border-[#D5CFBF] focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13.5px] bg-white"
                    />
                  </div>
                  <p className="text-[11px] text-[#6B5845] mt-1">
                    A 6-digit OTP verification code will be dispatched to this address.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#1D2522] mb-1">
                      Platform Role
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                      <select
                        value={signupRole}
                        onChange={(e) => setSignupRole(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#D5CFBF] focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13px] bg-white cursor-pointer"
                      >
                        <option value="CITIZEN">Citizen / Innovator</option>
                        <option value="UNIVERSITY">University / Academic R&D</option>
                        <option value="INDUSTRY">Industry / CSR Partner</option>
                        <option value="GOVERNMENT">Government Officer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-[#1D2522] mb-1">
                      Jharkhand District
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[13px] font-semibold text-[#1D2522] mb-1">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2 rounded-lg border border-[#D5CFBF] focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13.5px] bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-semibold text-[#1D2522] mb-1">
                      Password (min 8 chars)
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                      <input
                        type={showSignupPassword ? 'text' : 'password'}
                        required
                        minLength={8}
                        placeholder="••••••••"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 rounded-lg border border-[#D5CFBF] focus:outline-none focus:ring-2 focus:ring-[#123B2A] text-[13.5px] bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1 cursor-pointer focus:outline-none"
                      >
                        {showSignupPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3 bg-[#123B2A] hover:bg-[#0D2B1E] text-white font-bold rounded-lg mt-3 flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                >
                  {isAuthenticating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Proceed to Verification</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}

          {/* ── Mode 3: OTP Verification ── */}
          {mode === 'otp' && (
            <div className="text-center py-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#123B2A]/10 text-[#123B2A] mx-auto mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <h2 className="text-[1.4rem] font-bold text-[#1D2522] tracking-tight">
                Enter Verification Code
              </h2>
              <p className="text-[13.5px] text-neutral-600 mt-1 max-w-sm mx-auto leading-relaxed">
                We sent a 6-digit one-time passcode to:
                <br />
                <strong className="text-[#123B2A] font-mono">{otpTargetEmail}</strong>
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
                    className="w-48 mx-auto text-center font-mono text-[2rem] tracking-[10px] font-extrabold py-2.5 px-4 rounded-xl border-2 border-[#123B2A] focus:outline-none focus:ring-4 focus:ring-[#123B2A]/20 bg-[#FAF9F5] text-[#123B2A]"
                  />
                  <span className="block text-[11px] text-neutral-500 mt-2">
                    Valid for 10 minutes · Powered by Brevo Transactional Email
                  </span>
                </div>

                <Button
                  type="submit"
                  disabled={isAuthenticating || otpCode.length !== 6}
                  className="w-full py-3 bg-[#123B2A] hover:bg-[#0D2B1E] text-white font-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                >
                  {isAuthenticating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Verifying Passcode...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Verify & Access Platform</span>
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-4 border-t border-[#EEEAE1] flex items-center justify-between text-[12.5px]">
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
        </Card>

        {/* Security & SIH Notice Footer */}
        <p className="mt-6 text-center text-[12px] text-[#6B5845]">
          🔒 End-to-end encrypted session with HttpOnly cookie protection.
          <br />
          Official Societal Impact Platform of the State of Jharkhand.
        </p>
      </div>
    </div>
  );
}
