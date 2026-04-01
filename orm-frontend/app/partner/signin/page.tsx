"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BrainCircuit, ArrowLeft, Mail, Lock, 
  PenTool,
  CheckCircle2, Sparkles, Zap, User as UserIcon
} from 'lucide-react';

// --- THE EXTENSIBILITY ENGINE ---
// Matches your login page. Uncomment roles as your platform grows.
const portalRoles = [
  {
    id: 'creator',
    label: 'Creator',
    icon: <PenTool className="w-4 h-4" />,
    theme: 'brand', 
    title: "Monetize your technical expertise.",
    desc: "Build interactive courses, design custom coding sandboxes, and grow your audience of dedicated engineers.",
    stat1: "80% Revenue Share",
    stat2: "Built-in Sandbox UI",
    buttonText: "Create Creator Account"
  },
  /* // FUTURE EXPANSION
  {
    id: 'company',
    label: 'Company',
    icon: <Building2 className="w-4 h-4" />,
    theme: 'info', 
    title: "Upskill your engineering org.",
    desc: "Deploy private learning paths and track team progress.",
    stat1: "Enterprise Analytics",
    stat2: "Custom AI Constraints",
    buttonText: "Register Company Portal"
  },
  {
    id: 'recruiter',
    label: 'Recruiter',
    icon: <Users className="w-4 h-4" />,
    theme: 'success', 
    title: "Hire verified engineers.",
    desc: "Connect directly with candidates who have cleared our AI mock interviews.",
    stat1: "Pre-vetted Candidates",
    stat2: "0% Placement Fee",
    buttonText: "Apply as Recruiter"
  }
  */
];

export default function ExtensibleSignupPage() {
  const [activeRole, setActiveRole] = useState(portalRoles[0]); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the Partner Terms of Service.");
      return;
    }
    console.log(`Registering as [${activeRole.id}] with:`, { name, email, password });
  };

  // Dynamic color mapper based on the active role's theme
  const getThemeColors = () => {
    switch(activeRole.theme) {
      case 'info': return { bg: 'bg-info-600', text: 'text-info-600', border: 'focus:border-info-500 focus:ring-info-500', hover: 'hover:bg-info-700' };
      case 'success': return { bg: 'bg-success-600', text: 'text-success-600', border: 'focus:border-success-500 focus:ring-success-500', hover: 'hover:bg-success-700' };
      case 'brand': return { bg: 'bg-success-600', text: 'text-success-600', border: 'focus:border-success-500 focus:ring-success-500', hover: 'hover:bg-success-700' };
      default: return { bg: 'bg-brand-600', text: 'text-brand-600', border: 'focus:border-brand-500 focus:ring-brand-500', hover: 'hover:bg-brand-500' };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="min-h-screen flex bg-white font-sans text-surface-800 transition-colors duration-500">
      
      {/* LEFT COLUMN: Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto">
        
        {/* Top Navigation */}
        <div className="p-6 sm:p-8 flex items-center justify-between shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`${colors.bg} p-2 rounded-xl text-white shadow-md transition-colors duration-500`}>
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-surface-950 tracking-tighter">
              dobit<span className={colors.text}>.portal</span>
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-surface-500 hover:text-surface-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-16 md:px-24 lg:px-16 xl:px-32 pb-12 py-8">
          <div className="w-full max-w-sm mx-auto">
            
            <h1 className="text-3xl sm:text-4xl font-black text-surface-950 tracking-tight mb-2">
              Join as a Partner
            </h1>
            <p className="text-surface-500 font-medium mb-8">
              Create your {activeRole.label.toLowerCase()} account to get started.
            </p>

            {/* DYNAMIC ROLE SWITCHER */}
            {portalRoles.length > 1 && (
              <div className="bg-surface-100 p-1.5 rounded-xl flex items-center mb-8 border border-surface-200">
                {portalRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setActiveRole(role)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                      activeRole.id === role.id 
                        ? 'bg-white text-surface-950 shadow-sm border border-surface-200' 
                        : 'text-surface-500 hover:text-surface-700'
                    }`}
                  >
                    {role.icon} <span className="hidden sm:block">{role.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* OAuth Buttons */}
            <div className="flex flex-col gap-3 mb-8">
              {/* <button className="w-full flex items-center justify-center gap-3 bg-[#0077b5] hover:bg-[#006396] text-white px-4 py-3 rounded-xl font-bold transition-all shadow-sm">
                <Linkedin className="w-5 h-5" />
                Sign up with LinkedIn
              </button> */}
              <button className="w-full flex items-center justify-center gap-3 bg-white border border-surface-200 hover:bg-surface-50 hover:border-surface-300 text-surface-700 px-4 py-3 rounded-xl font-bold transition-all shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign up with Google
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-surface-200"></div>
              <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">Or register via email</span>
              <div className="flex-1 h-px bg-surface-200"></div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div className="space-y-1">
                <label className="text-sm font-bold text-surface-700">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-surface-400" />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className={`w-full pl-11 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 font-medium focus:outline-none focus:ring-2 transition-all placeholder:text-surface-400 ${colors.border}`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-surface-700">Work Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-surface-400" />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={`name@${activeRole.id === 'company' ? 'company' : 'domain'}.com`}
                    className={`w-full pl-11 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 font-medium focus:outline-none focus:ring-2 transition-all placeholder:text-surface-400 ${colors.border}`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-surface-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-surface-400" />
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className={`w-full pl-11 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 font-medium focus:outline-none focus:ring-2 transition-all placeholder:text-surface-400 ${colors.border}`}
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 mt-2">
                <div className="flex items-center h-5 mt-0.5">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-surface-600 border-surface-300 cursor-pointer"
                  />
                </div>
                <label htmlFor="terms" className="text-sm font-medium text-surface-600 leading-snug cursor-pointer">
                  I agree to the <Link href="/partner-terms" className={`font-bold ${colors.text} hover:opacity-80`}>Partner Terms of Service</Link> and <Link href="/privacy" className={`font-bold ${colors.text} hover:opacity-80`}>Privacy Policy</Link>.
                </label>
              </div>

              <button type="submit" className={`w-full ${colors.bg} ${colors.hover} text-white py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 mt-4`}>
                {activeRole.buttonText}
              </button>
            </form>

            <p className="text-center text-sm font-medium text-surface-500 mt-8">
              Already have a partner account?{' '}
              <Link href="/partner/login" className={`font-bold ${colors.text} hover:opacity-80`}>
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Dynamic Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-surface-50 border-l border-surface-200 relative overflow-hidden flex-col justify-between p-12 transition-all duration-500">
        
        {/* Dynamic Abstract Background based on Role */}
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none transition-colors duration-700 ${colors.bg}`}></div>
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 opacity-30 pointer-events-none transition-colors duration-700 ${colors.bg}`}></div>
        
        {/* Top Tag */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-surface-200 rounded-full shadow-sm">
            <Sparkles className={`w-4 h-4 ${colors.text}`} />
            <span className="text-surface-800 text-sm font-bold">dobit.ai for {activeRole.label}s</span>
          </div>
        </div>

        {/* Dynamic Center Copy */}
        <div className="relative z-10 max-w-lg">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-xl transition-colors duration-500 ${colors.bg}`}>
            {activeRole.icon}
          </div>
          
          <h2 className="text-4xl xl:text-5xl font-black text-surface-950 leading-tight tracking-tight mb-6 transition-all">
            {activeRole.title}
          </h2>
          <p className="text-lg text-surface-600 font-medium leading-relaxed transition-all">
            {activeRole.desc}
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3">
              <CheckCircle2 className={`w-5 h-5 ${colors.text}`} />
              <span className="text-surface-700 font-medium">Fast-tracked onboarding process</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className={`w-5 h-5 ${colors.text}`} />
              <span className="text-surface-700 font-medium">Dedicated partner support channel</span>
            </li>
          </ul>
        </div>

        {/* Dynamic Bottom Metrics */}
        <div className="relative z-10 grid grid-cols-2 gap-6 pt-8 border-t border-surface-200 bg-white/50 backdrop-blur-sm p-6 rounded-2xl border">
          <div>
            <div className="flex items-center gap-2 text-surface-950 font-black text-xl mb-1">
              <CheckCircle2 className={`w-5 h-5 ${colors.text}`} /> 
              {activeRole.stat1}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-surface-950 font-black text-xl mb-1">
              <Zap className={`w-5 h-5 ${colors.text}`} /> 
              {activeRole.stat2}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}