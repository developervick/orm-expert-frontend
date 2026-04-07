"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BrainCircuit, ArrowLeft, Mail, Lock, Quote, CheckCircle2, Sparkles, RefreshCw} from 'lucide-react';
import { useAuth } from '@/services/authservice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAction } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await loginAction(email, password);
    setLoading(false);
    if (!result.success) {
      toast.error(result.data?.error || 'Login failed. Please try again.');
      console.error('Login failed:', result.data);
    } else {
      toast.success('Login successful!');
      router.push('/');
    }
  
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-surface-800">
      
      {/* LEFT COLUMN: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative">
        
        {/* Top Navigation */}
        <div className="p-6 sm:p-8 flex items-center justify-between">
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
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-16 md:px-24 lg:px-16 xl:px-32 pb-12">
          <div className="w-full max-w-sm mx-auto">
            <h1 className="text-3xl sm:text-4xl font-black text-surface-950 tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-surface-500 font-medium mb-8">
              Log in to access your local sandboxes, continue courses, and track interview progress.
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
                Continue with Google
              </button>
              {/* <button className="w-full flex items-center justify-center gap-3 bg-surface-900 hover:bg-surface-800 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-sm">
                <Github className="w-5 h-5" />
                Continue with GitHub
              </button> */}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-surface-200"></div>
              <span className="text-xs font-bold text-surface-400 uppercase tracking-widest">Or email</span>
              <div className="flex-1 h-px bg-surface-200"></div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

              <div className="flex items-center gap-2 mt-2">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 rounded text-brand-600 border-surface-300 focus:ring-brand-500"
                />
                <label htmlFor="remember" className="text-sm font-semibold text-surface-600 cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              <button disabled={loading} type="submit" className="flex justify-center w-full bg-brand-600 hover:bg-brand-500 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-brand-500/20 active:scale-95 mt-4">
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : "Log In"}
              </button>
            </form>

            <p className="text-center text-sm font-medium text-surface-500 mt-8">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-bold text-brand-600 hover:text-brand-500">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Branding/Visual (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-surface-950 relative overflow-hidden flex-col justify-between p-12">
        {/* Abstract Glowing Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-30 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-800 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 opacity-40 pointer-events-none"></div>

        {/* Top Feature Highlight */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/20 border border-brand-500/30 rounded-full">
            <Sparkles className="w-4 h-4 text-brand-300" />
            <span className="text-brand-100 text-sm font-bold">New: LLD Mock Interviews</span>
          </div>
        </div>

        {/* Center Testimonial */}
        <div className="relative z-10 max-w-lg">
          <Quote className="w-12 h-12 text-brand-500/50 mb-6 rotate-180" />
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight mb-8">
            &quot;The interactive local sandbox is a game-changer. It caught an N+1 query vulnerability in my code that I would have completely missed in a real interview.&quot;
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center text-white font-black text-xl border-2 border-brand-400">
              S
            </div>
            <div>
              <p className="font-bold text-white">Sarah Jenkins</p>
              <p className="text-brand-200 text-sm font-medium">Landed Backend Role @ Stripe</p>
            </div>
          </div>
        </div>

        {/* Bottom Metrics/Trust Badges */}
        <div className="relative z-10 grid grid-cols-2 gap-6 pt-8 border-t border-surface-800/50">
          <div>
            <div className="flex items-center gap-2 text-white font-black text-2xl mb-1">
              <CheckCircle2 className="w-5 h-5 text-success-500" /> 15k+
            </div>
            <p className="text-surface-400 text-sm font-medium">Engineers Upskilled</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-white font-black text-2xl mb-1">
              <CheckCircle2 className="w-5 h-5 text-success-500" /> 98%
            </div>
            <p className="text-surface-400 text-sm font-medium">Offer Success Rate</p>
          </div>
        </div>

      </div>

    </div>
  );
}