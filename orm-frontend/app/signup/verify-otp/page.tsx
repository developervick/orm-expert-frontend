"use client";

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import Link from 'next/link';
import { BrainCircuit, ArrowLeft, Mail, RefreshCw, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/services/authservice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const auth = useAuth();
  const router = useRouter();

  // Handle countdown timer for Resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if a number is typed
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      // Focus the next empty input or the last one
      const focusIndex = pastedData.length < 4 ? pastedData.length : 3;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 4) return;
    
    setIsSubmitting(true);
    const result = await auth.verifyOTP(code, Cookies.get('verify_uuid') as string)
    console.log(result, "OTP verification result");
    if (!result.success) {
      toast.error(`${result.data?.error || 'OTP verification failed. Please try again.'}`);
      setIsSubmitting(false)
      return;
    } else {
      // Handle success (e.g., redirect to dashboard)
      Cookies.remove('verify_uuid');
      toast.success('OTP verified successfully!');
      router.push('/');
    }
    setIsSubmitting(false);
  };

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(30);
      // Trigger resend API here
      console.log("Resending OTP...");
    }
  };

  const isFormComplete = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 font-sans text-surface-800 p-4 relative overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-brand-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Top Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 p-6 sm:p-8 flex items-center justify-between z-10 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-brand-600 p-2 rounded-xl text-white shadow-md">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <span className="text-2xl font-black text-surface-950 tracking-tighter hidden sm:block">
            dobit<span className="text-brand-600">.ai</span>
          </span>
        </Link>
        <Link href="/signup" className="flex items-center gap-2 text-sm font-bold text-surface-500 hover:text-surface-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to signup
        </Link>
      </nav>

      {/* Main Verification Card */}
      <div className="w-full max-w-md bg-white border border-surface-200 rounded-3xl p-8 sm:p-10 shadow-xl relative z-10">
        
        <div className="w-16 h-16 bg-brand-50 border border-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Mail className="w-8 h-8 text-brand-600" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-center text-surface-950 tracking-tight mb-2">
          Check your email
        </h1>
        <p className="text-center text-surface-500 font-medium mb-8 leading-relaxed">
          We sent a 4-digit verification code to <br className="hidden sm:block"/>
          <strong className="text-surface-900">engineer@company.com</strong>
        </p>

        <form onSubmit={handleSubmit}>
          {/* OTP Input Group */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black rounded-xl border transition-all outline-none shadow-sm ${
                  digit 
                    ? 'border-brand-500 bg-brand-50 text-brand-700 focus:ring-2 focus:ring-brand-500/50' 
                    : 'border-surface-200 bg-surface-50 text-surface-900 focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20'
                }`}
              />
            ))}
          </div>

          <button 
            type="submit" 
            disabled={!isFormComplete || isSubmitting}
            className="w-full bg-brand-600 hover:bg-brand-500 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 mb-6"
          >
            {isSubmitting ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>Verify Account <ShieldCheck className="w-5 h-5" /></>
            )}
          </button>
        </form>

        {/* Resend Logic */}
        <div className="text-center">
          <p className="text-sm text-surface-500 font-medium">
            Didn&apos;t receive the code?{' '}
            {countdown > 0 ? (
              <span className="text-surface-400 font-semibold">
                Resend in <span className="text-surface-900 w-4 inline-block">{countdown}</span>s
              </span>
            ) : (
              <button 
                onClick={handleResend}
                className="text-brand-600 font-bold hover:text-brand-500 transition-colors"
              >
                Click to resend
              </button>
            )}
          </p>
        </div>

      </div>
    </div>
  );
}