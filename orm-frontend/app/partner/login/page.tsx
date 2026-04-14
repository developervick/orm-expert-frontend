"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BrainCircuit, ArrowLeft, Mail, Lock, 
  Building2, Users, Presentation,
  CheckCircle2, Sparkles, Target, Zap
} from 'lucide-react';

// Define the different partner types and their specific marketing copy
const partnerRoles = [
  {
    id: 'creator',
    label: 'Creator',
    icon: <Presentation className="w-4 h-4" />,
    title: "Monetize your technical expertise.",
    desc: "Build interactive courses, design custom coding sandboxes, and grow your audience of dedicated engineers.",
    stat1: "80% Revenue Share",
    stat2: "Built-in Sandbox UI"
  },
  {
    id: 'company',
    label: 'Company',
    icon: <Building2 className="w-4 h-4" />,
    title: "Upskill your entire engineering org.",
    desc: "Deploy private learning paths, track team progress, and ensure your engineers are using optimal architectural patterns.",
    stat1: "Enterprise Analytics",
    stat2: "Custom AI Constraints"
  },
  {
    id: 'recruiter',
    label: 'Recruiter',
    icon: <Users className="w-4 h-4" />,
    title: "Hire engineers with verified proof of work.",
    desc: "Bypass the resume noise. Connect directly with candidates who have cleared our grueling AI mock interviews and system design sandboxes.",
    stat1: "Pre-vetted Candidates",
    stat2: "0% Placement Fee"
  }
];

export default function PartnerLoginPage() {
  const [activeRole, setActiveRole] = useState(partnerRoles[2]); // Default to Recruiter
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Logging in as ${activeRole.id} with:`, email, password);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-surface-800 transition-colors duration-500">
      
      {/* LEFT COLUMN: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative">
        
        {/* Top Navigation */}
        <div className="p-6 sm:p-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-surface-950 p-2 rounded-xl text-white shadow-md">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-surface-950 tracking-tighter">
              inteleek<span className="text-brand-600">.partners</span>
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-surface-500 hover:text-surface-900 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Student Portal
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-16 md:px-24 lg:px-16 xl:px-32 pb-12">
          <div className="w-full max-w-sm mx-auto">
            
            <h1 className="text-3xl sm:text-4xl font-black text-surface-950 tracking-tight mb-2">
              Partner Portal
            </h1>
            <p className="text-surface-500 font-medium mb-8">
              Sign in to manage your <span className='text-brand-600'>{activeRole.label.toLowerCase()}</span> account.
            </p>

            {/* Role Switcher (Segmented Control) */}
            <div className="bg-surface-100 p-1.5 rounded-xl flex items-center mb-8 border border-surface-200">
              {partnerRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setActiveRole(role)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg teaccountxt-sm font-bold transition-all ${
                    activeRole.id === role.id 
                      ? 'bg-white text-surface-950 shadow-sm border border-surface-200' 
                      : 'text-surface-500 hover:text-surface-700'
                  }`}
                >
                  {role.icon} <span className="hidden sm:block">{role.label}</span>
                </button>
              ))}
            </div>

            {/* OAuth Buttons */}
            <div className="flex flex-col gap-3 mb-8">
              {/* <button className="w-full flex items-center justify-center gap-3 bg-[#0077b5] hover:bg-[#006396] text-white px-4 py-3 rounded-xl font-bold transition-all shadow-sm">
                <Linkedin className="w-5 h-5" />
                Continue with LinkedIn
              </button> */}
              <button className="w-full flex items-center justify-center gap-3 bg-white border border-surface-200 hover:bg-surface-50 hover:border-surface-300 text-surface-700 px-4 py-3 rounded-xl font-bold transition-all shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-surface-200"></div>
              <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">Or work email</span>
              <div className="flex-1 h-px bg-surface-200"></div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-surface-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-surface-700">Password</label>
                  <Link href="/forgot-password" className="text-xs font-bold text-brand-600 hover:text-brand-500">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-surface-400" />
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-surface-400"
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-surface-950 hover:bg-surface-800 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 mt-4 flex items-center justify-center gap-2">
                Sign In to Dashboard <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </form>

            <p className="text-center text-sm font-medium text-surface-500 mt-8">
              Interested in becoming a partner?{' '}
              <Link href="/contact-sales" className="font-bold text-brand-600 hover:text-brand-500">
                Contact Sales
              </Link>
            </p>
            <p className="text-center text-sm font-medium text-surface-500 mt-8">
              Don&apos;t have an account?{' '}
              <Link href="/partner/signin" className="font-bold text-brand-600 hover:text-brand-500">
                Signin Here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Dynamic Branding/Visual (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-surface-50 border-l border-surface-200 relative overflow-hidden flex-col justify-between p-12 transition-all duration-500">
        
        {/* Dynamic Abstract Background based on Role */}
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-30 pointer-events-none transition-colors duration-700 ${
          activeRole.id === 'creator' ? 'bg-brand-500' : activeRole.id === 'company' ? 'bg-info-500' : 'bg-success-500'
        }`}></div>
        
        {/* Top Tag */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-surface-200 rounded-full shadow-sm">
            <Sparkles className={`w-4 h-4 ${activeRole.id === 'creator' ? 'text-brand-500' : activeRole.id === 'company' ? 'text-info-500' : 'text-success-500'}`} />
            <span className="text-surface-800 text-sm font-bold">inteleek.ai for {activeRole.label}s</span>
          </div>
        </div>

        {/* Dynamic Center Copy */}
        <div className="relative z-10 max-w-lg">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-xl transition-colors duration-500 ${
            activeRole.id === 'creator' ? 'bg-brand-600' : activeRole.id === 'company' ? 'bg-info-600' : 'bg-success-600'
          }`}>
            {activeRole.id === 'creator' && <Presentation className="w-8 h-8" />}
            {activeRole.id === 'company' && <Building2 className="w-8 h-8" />}
            {activeRole.id === 'recruiter' && <Target className="w-8 h-8" />}
          </div>
          
          <h2 className="text-4xl xl:text-5xl font-black text-surface-950 leading-tight tracking-tight mb-6 transition-all">
            {activeRole.title}
          </h2>
          <p className="text-lg text-surface-600 font-medium leading-relaxed transition-all">
            {activeRole.desc}
          </p>
        </div>

        {/* Dynamic Bottom Metrics */}
        <div className="relative z-10 grid grid-cols-2 gap-6 pt-8 border-t border-surface-200 bg-white/50 backdrop-blur-sm p-6 rounded-2xl border">
          <div>
            <div className="flex items-center gap-2 text-surface-950 font-black text-xl mb-1">
              <CheckCircle2 className={`w-5 h-5 ${activeRole.id === 'creator' ? 'text-brand-500' : activeRole.id === 'company' ? 'text-info-500' : 'text-success-500'}`} /> 
              {activeRole.stat1}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-surface-950 font-black text-xl mb-1">
              <Zap className={`w-5 h-5 ${activeRole.id === 'creator' ? 'text-brand-500' : activeRole.id === 'company' ? 'text-info-500' : 'text-success-500'}`} /> 
              {activeRole.stat2}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}