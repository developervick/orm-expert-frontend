"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BrainCircuit, Search, MapPin, DollarSign, 
  Building2, Sparkles, CheckCircle2, Menu, X, 
  Briefcase, ArrowRight, Clock, Zap
} from 'lucide-react';

// --- MOCK JOB DATA ---
const jobsCatalog = [
  {
    id: "j_1",
    title: "AI Research Scientist (LLMs)",
    company: "NeuralNet Technologies",
    location: "Remote (Global)",
    salary: "$140k - $180k",
    type: "Full-time",
    matchScore: 98,
    requiredSkills: ["Python", "PyTorch", "RAG Architecture", "LLM Fine-tuning"],
    logo: "N",
    isPartner: true,
    postedAt: "2 hours ago"
  },
  {
    id: "j_2",
    title: "Senior Full-Stack Engineer",
    company: "FinEdge Platforms",
    location: "New York, NY (Hybrid)",
    salary: "$130k - $160k",
    type: "Full-time",
    matchScore: 92,
    requiredSkills: ["Next.js", "React", "Django ORM", "PostgreSQL"],
    logo: "F",
    isPartner: true,
    postedAt: "5 hours ago"
  },
  {
    id: "j_3",
    title: "Backend SDE II",
    company: "DataSync Cloud",
    location: "Remote (US/Canada)",
    salary: "$120k - $150k",
    type: "Full-time",
    matchScore: 85,
    requiredSkills: ["Python", "FastAPI", "Redis", "System Design"],
    logo: "D",
    isPartner: false,
    postedAt: "1 day ago"
  },
  {
    id: "j_4",
    title: "Computer Vision Engineer",
    company: "SightSense AI",
    location: "San Francisco, CA",
    salary: "$150k - $190k",
    type: "Full-time",
    matchScore: 88,
    requiredSkills: ["Object Detection", "YOLO", "C++", "OpenCV"],
    logo: "S",
    isPartner: true,
    postedAt: "1 day ago"
  },
  {
    id: "j_5",
    title: "Software Engineer (Founding Team)",
    company: "Stealth Startup",
    location: "Remote (Europe)",
    salary: "$90k - $120k + Equity",
    type: "Full-time",
    matchScore: 76,
    requiredSkills: ["JavaScript", "React", "Node.js", "Docker"],
    logo: "S",
    isPartner: false,
    postedAt: "2 days ago"
  }
];

const jobTypes = ["All Roles", "Full-Stack", "Backend", "AI / ML"];
const locations = ["Anywhere", "Remote", "Hybrid", "On-site"];

export default function JobsPage() {
  const [activeType, setActiveType] = useState("All Roles");
  const [activeLocation, setActiveLocation] = useState("Anywhere");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter Logic
  const filteredJobs = jobsCatalog.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Simplistic category matching for demo purposes
    let matchesType = true;
    if (activeType === "Full-Stack") matchesType = job.title.includes("Full-Stack");
    if (activeType === "Backend") matchesType = job.title.includes("Backend") || job.title.includes("SDE");
    if (activeType === "AI / ML") matchesType = job.title.includes("AI") || job.title.includes("Vision");

    let matchesLoc = true;
    if (activeLocation === "Remote") matchesLoc = job.location.includes("Remote");
    if (activeLocation === "Hybrid") matchesLoc = job.location.includes("Hybrid");
    if (activeLocation === "On-site") matchesLoc = !job.location.includes("Remote") && !job.location.includes("Hybrid");

    return matchesSearch && matchesType && matchesLoc;
  });

  return (
    <div className="min-h-screen bg-surface-50 text-surface-800 font-sans">
      
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
            <Link href="/login" className="text-sm font-semibold text-surface-700 hover:text-brand-600 transition-colors">
              Login
            </Link>
            <Link href="/signup" className="bg-surface-900 hover:bg-surface-800 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md active:scale-95">
              Sign Up
            </Link>
          </div>

          <button 
            className="md:hidden p-2 text-surface-600 hover:bg-surface-100 rounded-lg z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
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

      {/* 2. PAGE HEADER / AI HOOK */}
      <header className="pt-32 pb-12 px-4 sm:px-6 bg-white border-b border-surface-200">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full mb-6 border border-brand-200">
              <Sparkles className="w-4 h-4 text-warning-400" />
              Bypass the recruiter screen
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-surface-950 tracking-tight mb-4">
              Apply with your <span className="text-brand-600">Proof of Work.</span>
            </h1>
            <p className="text-lg text-surface-600 font-medium leading-relaxed max-w-2xl">
              Don't let your resume get lost in an ATS black hole. Our AI matches your completed sandboxes and interview scores directly with verified hiring partners.
            </p>
          </div>
          
          {/* AI Match Callout Box */}
          <div className="lg:col-span-4 bg-surface-950 rounded-2xl p-6 shadow-xl border border-surface-800 text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500 rounded-full blur-[40px] opacity-30 pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand-600 p-2 rounded-lg">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-lg">AI Match Profile</h3>
            </div>
            <p className="text-surface-300 text-sm font-medium mb-6 leading-relaxed">
              Create a free account to unlock your personalized Match Score based on your technical abilities.
            </p>
            <Link href="/signup" className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white py-3 rounded-xl font-bold transition-all shadow-md active:scale-95">
              Unlock My Match Score <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* 3. FILTERS & JOB LISTINGS */}
      <main className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
          
          {/* Left Column: Filters (Sticky on Desktop) */}
          <div className="lg:col-span-3">
            <div className="sticky top-28 bg-white p-6 rounded-2xl border border-surface-200 shadow-sm">
              <h3 className="font-bold text-surface-950 mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-surface-400" /> Find Roles
              </h3>
              
              <input
                type="text"
                placeholder="Job title or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 mb-6 bg-surface-50 border border-surface-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all"
              />

              <div className="mb-6">
                <h4 className="text-xs font-bold text-surface-400 uppercase tracking-widest mb-3">Role Type</h4>
                <div className="flex flex-col gap-2">
                  {jobTypes.map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="roleType" 
                        checked={activeType === type}
                        onChange={() => setActiveType(type)}
                        className="w-4 h-4 text-brand-600 border-surface-300 focus:ring-brand-500"
                      />
                      <span className={`text-sm font-semibold transition-colors ${activeType === type ? 'text-surface-900' : 'text-surface-600 group-hover:text-surface-900'}`}>
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-surface-400 uppercase tracking-widest mb-3">Location</h4>
                <div className="flex flex-col gap-2">
                  {locations.map(loc => (
                    <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="location" 
                        checked={activeLocation === loc}
                        onChange={() => setActiveLocation(loc)}
                        className="w-4 h-4 text-brand-600 border-surface-300 focus:ring-brand-500"
                      />
                      <span className={`text-sm font-semibold transition-colors ${activeLocation === loc ? 'text-surface-900' : 'text-surface-600 group-hover:text-surface-900'}`}>
                        {loc}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Job Cards */}
          <div className="lg:col-span-9 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-surface-900">
                Recommended Roles
              </h2>
              <span className="text-sm font-semibold text-surface-500 bg-surface-200 px-3 py-1 rounded-full">
                {filteredJobs.length} open positions
              </span>
            </div>

            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-surface-200 border-dashed">
                <Briefcase className="w-12 h-12 text-surface-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-surface-900 mb-2">No roles found</h3>
                <p className="text-surface-500 font-medium max-w-md mx-auto">
                  Try adjusting your filters or search query to find more open positions.
                </p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveType("All Roles"); setActiveLocation("Anywhere"); }}
                  className="mt-6 text-brand-600 font-bold hover:text-brand-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

    </div>
  );
}

// --- HELPER COMPONENTS ---

function JobCard({ job }: { job: any }) {
  return (
    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-surface-200 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 group relative">
      
      {/* "Hiring Partner" Badge */}
      {job.isPartner && (
        <div className="absolute top-0 right-6 -translate-y-1/2 bg-surface-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
          <CheckCircle2 className="w-3 h-3 text-brand-400" /> Verified Partner
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
        
        {/* Company Logo */}
        <div className="w-14 h-14 bg-surface-100 border border-surface-200 rounded-xl flex items-center justify-center font-black text-2xl text-surface-400 shrink-0 group-hover:bg-brand-50 group-hover:text-brand-600 group-hover:border-brand-200 transition-colors">
          {job.logo}
        </div>

        {/* Job Details */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xl font-bold text-surface-950 mb-1 group-hover:text-brand-700 transition-colors">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 text-surface-600 font-medium text-sm">
                <Building2 className="w-4 h-4" /> {job.company}
              </div>
            </div>
            
            {/* AI Match Score UI */}
            <div className="flex items-center gap-2 bg-success-50 border border-success-200 px-3 py-1.5 rounded-lg shrink-0 w-fit">
              <Zap className="w-4 h-4 text-success-600" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-success-800 leading-none">AI Match</span>
                <span className="text-sm font-black text-success-700 leading-tight">{job.matchScore}%</span>
              </div>
            </div>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-semibold text-surface-500 mb-5">
            <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</div>
            <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4" /> {job.salary}</div>
            <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.postedAt}</div>
          </div>

          {/* Skills Tags & Apply Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-surface-100">
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill: string, i: number) => (
                <span key={i} className="px-2.5 py-1 bg-surface-100 text-surface-700 text-xs font-bold rounded-md border border-surface-200">
                  {skill}
                </span>
              ))}
            </div>
            <Link href="/login" className="flex items-center justify-center gap-2 bg-surface-900 hover:bg-surface-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 shrink-0">
              1-Click Apply
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

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