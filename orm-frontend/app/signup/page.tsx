"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BrainCircuit, ArrowLeft, Mail, Lock, User as UserIcon, CheckCircle2, ShieldCheck, Terminal, Network
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [mismatch, setMismatch] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    router.push('/signup/verify-otp');
    e.preventDefault();
    if (password !== confirmPassword) {
      setMismatch(true);
      return;
    }
    if (!agreeTerms) {
      alert("Please agree to the Terms of Service.");
      return;
    }
    // Add your registration logic here
    console.log("Signing up with:", { name, email, password });
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-surface-800">
      
      {/* LEFT COLUMN: Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto">
        
        {/* Top Navigation */}
        <div className="p-6 sm:p-8 flex items-center justify-between shrink-0">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-brand-600 p-2 rounded-xl text-white shadow-md">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-surface-950 tracking-tighter">
              dobit<span className="text-brand-600">.ai</span>
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
              Create your account
            </h1>
            <p className="text-surface-500 font-medium mb-8">
              Join thousands of engineers building scalable architectures and clearing technical interviews.
            </p>

            {/* OAuth Buttons */}
            <div className="flex flex-col gap-3 mb-8">
              <button className="w-full flex items-center justify-center gap-3 bg-white border border-surface-200 hover:bg-surface-50 hover:border-surface-300 text-surface-700 px-4 py-3 rounded-xl font-bold transition-all shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Sign up with Google
              </button>
              {/* <button className="w-full flex items-center justify-center gap-3 bg-surface-900 hover:bg-surface-800 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-sm">
                <Github className="w-5 h-5" />
                Sign up with GitHub
              </button> */}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-surface-200"></div>
              <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">Or register with email</span>
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
                    placeholder="Alex Developer"
                    className="w-full pl-11 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-surface-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-bold text-surface-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-surface-400" />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@company.com"
                    className="w-full pl-11 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-surface-400"
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
                    className="w-full pl-11 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-surface-400"
                  />
                </div>
                <p className="text-xs font-semibold text-surface-500 mt-1.5 ml-1">Must be at least 8 characters long.</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-surface-700">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-surface-400" />
                  </div>
                  <input 
                    type="password" 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full pl-11 pr-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all placeholder:text-surface-400"
                  />
                </div>
                <p className="text-xs font-semibold text-red-500 mt-1.5 ml-1">{mismatch ? "Passwords do not match." : ""}</p>
              </div>

              <div className="flex items-start gap-3 mt-2">
                <div className="flex items-center h-5 mt-0.5">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-600 border-surface-300 focus:ring-brand-500 cursor-pointer"
                  />
                </div>
                <label htmlFor="terms" className="text-sm font-medium text-surface-600 leading-snug cursor-pointer">
                  I agree to the <Link href="/terms" className="text-brand-600 font-bold hover:text-brand-500">Terms of Service</Link> and <Link href="/privacy" className="text-brand-600 font-bold hover:text-brand-500">Privacy Policy</Link>.
                </label>
              </div>

              <button type="submit" className="w-full bg-brand-600 hover:bg-brand-500 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-brand-500/20 active:scale-95 mt-4">
                Create Free Account
              </button>
            </form>

            <p className="text-center text-sm font-medium text-surface-500 mt-8">
              Already have an account?{' '}
              <Link href="/login" className="font-bold text-brand-600 hover:text-brand-500">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Value Proposition (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-surface-950 relative overflow-hidden flex-col justify-between p-12 lg:p-16 xl:p-24">
        
        {/* Abstract Glowing Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-800 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 opacity-30 pointer-events-none"></div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-800 border border-surface-700 mb-8 shadow-xl">
            <ShieldCheck className="w-8 h-8 text-brand-400" />
          </div>
          
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
            Unlock your engineering potential.
          </h2>
          <p className="text-lg text-surface-400 font-medium mb-12">
            Create a free account today to experience the platform that is changing how developers prepare for high-level technical roles.
          </p>

          {/* Checklist of what they get */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 bg-success-500/20 p-1 rounded-full shrink-0">
                <CheckCircle2 className="w-5 h-5 text-success-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Full Roadmap Access</h3>
                <p className="text-surface-400 text-sm font-medium leading-relaxed">Browse curated paths for Full-Stack, AI Research, and SDE Interviews.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 bg-brand-500/20 p-1 rounded-full shrink-0">
                <Terminal className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Local Sandbox Integration</h3>
                <p className="text-surface-400 text-sm font-medium leading-relaxed">Run our custom Python/Next.js evaluation environments directly on your machine.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 bg-warning-500/20 p-1 rounded-full shrink-0">
                <Network className="w-5 h-5 text-warning-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">1 Free AI Mock Interview</h3>
                <p className="text-surface-400 text-sm font-medium leading-relaxed">Experience a grueling 45-minute HLD/LLD technical round with real-time feedback.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom trust indicator */}
        <div className="relative z-10 pt-12 mt-12 border-t border-surface-800/50">
          <p className="text-surface-500 text-sm font-semibold mb-4 uppercase tracking-widest">
            Trusted by engineers at
          </p>
          <div className="flex items-center gap-6 opacity-50 grayscale">
            {/* Using text blocks as placeholder logos */}
            <span className="font-black text-xl text-white tracking-tight">TechCorp</span>
            <span className="font-black text-xl text-white tracking-tight">DataSys</span>
            <span className="font-black text-xl text-white tracking-tight">CloudNet</span>
          </div>
        </div>

      </div>

    </div>
  );
}