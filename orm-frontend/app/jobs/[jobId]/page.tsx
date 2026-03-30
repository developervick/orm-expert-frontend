"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BrainCircuit, Menu, X, ArrowLeft, MapPin, 
  DollarSign, Clock, Building2, Zap, Share2, 
  Bookmark, CheckCircle2, ShieldCheck, ArrowRight,
  Terminal
} from 'lucide-react';

// --- MOCK JOB DATA ---
const jobDetails = {
  id: "j_1",
  title: "AI Research Scientist (LLMs)",
  company: "NeuralNet Technologies",
  location: "Remote (Global)",
  salary: "$140k - $180k + Equity",
  type: "Full-time",
  postedAt: "2 hours ago",
  matchScore: 98,
  logo: "N",
  isPartner: true,
  aboutRole: "NeuralNet Technologies is seeking a Senior AI Research Scientist to lead our efforts in optimizing local inference and building highly specialized RAG architectures. You will bypass traditional API wrappers and work directly with open-weights models (Llama 3, DeepSeek) to build production-grade, privacy-first AI agents.",
  responsibilities: [
    "Design and implement advanced Retrieval-Augmented Generation (RAG) pipelines for enterprise clients.",
    "Fine-tune and quantize open-source LLMs for deployment on edge devices and local hardware.",
    "Optimize inference latency using vLLM, TensorRT, and custom CUDA kernels.",
    "Collaborate with the backend team to integrate AI agents into existing distributed systems."
  ],
  requirements: [
    "Deep understanding of Transformer architectures and self-attention mechanisms.",
    "Production experience with PyTorch, Hugging Face, and vector databases (Milvus, Pinecone).",
    "Strong proficiency in Python and systems-level programming (C++ or Rust is a plus).",
    "Ability to architect fault-tolerant, highly scalable backend services."
  ],
  matchedSkills: [
    { name: "RAG Architecture", source: "Course: Applied AI Research" },
    { name: "Python / PyTorch", source: "Local Sandbox Diagnostics" },
    { name: "System Scalability", source: "Mock Interview: HLD (Strong Hire)" }
  ]
};

export default function JobListingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50 text-surface-800 font-sans relative">
      
      {/* 1. PUBLIC NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group z-50">
            <div className="bg-brand-600 p-2 sm:p-2.5 rounded-xl text-white shadow-lg shadow-brand-500/30">
              <BrainCircuit className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-surface-950 tracking-tighter">
              dobit<span className="text-brand-600">.ai</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/interview">Interview Prep</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/jobs" active>Jobs Board</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Using the user's nickname 'Vicky' if logged in, otherwise standard Auth links */}
            <Link href="/login" className="text-sm font-semibold text-surface-700 hover:text-brand-600 transition-colors">Login</Link>
            <Link href="/signup" className="bg-surface-900 hover:bg-surface-800 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md active:scale-95">Sign Up</Link>
          </div>

          <button className="md:hidden p-2 text-surface-600 hover:bg-surface-100 rounded-lg z-50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-surface-200 shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-4 gap-2">
            <MobileNavLink href="/courses">Courses</MobileNavLink>
            <MobileNavLink href="/interview">Interview Prep</MobileNavLink>
            <MobileNavLink href="/blog">Blog</MobileNavLink>
            <MobileNavLink href="/jobs">Jobs Board</MobileNavLink>
            <div className="h-px w-full bg-surface-200 my-2"></div>
            <Link href="/login" className="text-center w-full py-3 text-sm font-semibold text-surface-700 bg-surface-50 rounded-xl">Login</Link>
          </div>
        </div>
      </nav>

      {/* 2. JOB HEADER */}
      <header className="pt-32 pb-12 px-4 sm:px-6 bg-surface-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link href={`/jobs#${jobDetails.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-surface-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all jobs
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-6">
              {/* Company Logo */}
              <div className="hidden sm:flex w-20 h-20 bg-surface-800 border-2 border-surface-700 rounded-2xl items-center justify-center font-black text-3xl text-surface-300 shrink-0 shadow-xl">
                {jobDetails.logo}
              </div>
              
              <div>
                {jobDetails.isPartner && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                    <ShieldCheck className="w-4 h-4" /> Verified Hiring Partner
                  </div>
                )}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                  {jobDetails.title}
                </h1>
                <div className="flex items-center gap-2 text-surface-300 font-medium text-lg mb-6">
                  <Building2 className="w-5 h-5" /> {jobDetails.company}
                </div>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-semibold text-surface-400">
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-surface-500" /> {jobDetails.location}</div>
                  <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-surface-500" /> {jobDetails.salary}</div>
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-surface-500" /> Posted {jobDetails.postedAt}</div>
                </div>
              </div>
            </div>

            {/* Actions (Desktop) */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <button className="w-12 h-12 rounded-full bg-surface-800 border border-surface-700 flex items-center justify-center text-surface-300 hover:text-white hover:border-surface-500 transition-colors shadow-sm">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-surface-800 border border-surface-700 flex items-center justify-center text-surface-300 hover:text-white hover:border-surface-500 transition-colors shadow-sm">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. TWO-COLUMN LAYOUT */}
      {/* Notice the pb-32 on mobile to prevent content from hiding behind the floating pill */}
      <main className="py-12 px-4 sm:px-6 relative pb-32 lg:pb-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Job Description */}
          <div className="lg:col-span-8 space-y-12">
            
            <section>
              <h2 className="text-2xl font-extrabold text-surface-950 mb-4">About the Role</h2>
              <p className="text-lg text-surface-700 leading-relaxed font-medium">
                {jobDetails.aboutRole}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-surface-950 mb-4">What You'll Do</h2>
              <ul className="space-y-4">
                {jobDetails.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-surface-200 shadow-sm">
                    <div className="mt-1 bg-brand-100 p-1 rounded-full shrink-0">
                      <Terminal className="w-4 h-4 text-brand-600" />
                    </div>
                    <span className="text-surface-700 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-surface-950 mb-4">What We're Looking For</h2>
              <ul className="space-y-4">
                {jobDetails.requirements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-surface-200 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-success-500 shrink-0 mt-1" />
                    <span className="text-surface-700 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Platform Trust Callout */}
            <section className="bg-surface-900 border border-surface-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-16 h-16 bg-brand-600 rounded-2xl shadow-lg flex items-center justify-center shrink-0">
                <BrainCircuit className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Bypass the ATS Black Hole</h3>
                <p className="text-surface-300 font-medium leading-relaxed text-sm sm:text-base">
                  NeuralNet Technologies is a verified <strong>dobit.ai</strong> partner. When you apply using your AI Match Score, your completed local sandboxes and mock interview transcripts are submitted as your Proof of Work, allowing you to skip the initial technical phone screen.
                </p>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Sticky Application Card (Desktop) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              
              {/* AI Match Card */}
              <div className="bg-white border-2 border-success-400 rounded-3xl p-6 shadow-[0_0_40px_rgba(16,185,129,0.15)] flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-success-400 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 opacity-20 pointer-events-none"></div>
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-2 text-success-700 font-black text-xl uppercase tracking-tight">
                    <Zap className="w-6 h-6 fill-success-500 text-success-500" /> AI Match
                  </div>
                  <div className="text-4xl font-black text-success-600 tracking-tighter">
                    {jobDetails.matchScore}%
                  </div>
                </div>

                <p className="text-sm font-semibold text-surface-600 mb-6 relative z-10 leading-relaxed">
                  You are a top candidate for this role based on your recent activity on the platform.
                </p>

                <div className="space-y-3 mb-8 relative z-10">
                  <p className="text-xs font-bold text-surface-400 uppercase tracking-widest">Match Evidence</p>
                  {jobDetails.matchedSkills.map((skill, i) => (
                    <div key={i} className="bg-surface-50 p-3 rounded-xl border border-surface-200">
                      <p className="font-bold text-surface-900 text-sm">{skill.name}</p>
                      <p className="text-xs font-semibold text-brand-600 mt-0.5">{skill.source}</p>
                    </div>
                  ))}
                </div>

                {/* This button shows on Desktop only. The floating pill handles Mobile. */}
                <Link href="/login" className="hidden lg:flex w-full items-center justify-center gap-2 bg-success-600 hover:bg-success-500 text-white py-4 rounded-xl font-black transition-all shadow-lg shadow-success-500/30 active:scale-95 text-lg relative z-10">
                  1-Click Apply
                </Link>
                <p className="hidden lg:flex justify-center items-center gap-1 text-center text-xs font-bold text-surface-400 mt-4 relative z-10">
                  <ShieldCheck className="w-4 h-4"/> Your data is sent securely.
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* 4. MOBILE FLOATING ACTION PILL */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50">
        <div className="bg-surface-900 p-2 rounded-2xl shadow-2xl flex items-center gap-2 border border-surface-800">
          <Link href="/login" className="flex-1 flex items-center justify-center gap-2 bg-success-500 hover:bg-success-400 text-surface-950 py-3.5 rounded-xl font-black transition-all active:scale-95 text-base shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Zap className="w-5 h-5 fill-surface-950" /> 1-Click Apply
          </Link>
          <button className="w-14 h-14 shrink-0 flex items-center justify-center rounded-xl bg-surface-800 text-white hover:bg-surface-700 transition-colors border border-surface-700">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="w-14 h-14 shrink-0 flex items-center justify-center rounded-xl bg-surface-800 text-white hover:bg-surface-700 transition-colors border border-surface-700">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 5. FOOTER */}
      <footer className="py-12 bg-surface-950 text-surface-300 px-4 sm:px-6 border-t border-surface-800 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-white/10 p-2.5 rounded-xl text-white">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">
              dobit<span className="text-brand-400">.ai</span>
            </span>
          </Link>
          <p className="text-sm font-medium">© 2026 Dobit Technologies. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

// --- HELPER COMPONENTS ---

function NavLink({ href, active=false, children }: { href: string, active?: boolean, children: React.ReactNode }) {
  return (
    <Link href={href} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
      active ? 'bg-brand-50 text-brand-700' : 'text-surface-800 hover:text-brand-700 hover:bg-brand-50'
    }`}>
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="px-4 py-3 rounded-xl text-base font-semibold text-surface-800 hover:text-brand-700 hover:bg-brand-50 transition-all w-full">
      {children}
    </Link>
  );
}