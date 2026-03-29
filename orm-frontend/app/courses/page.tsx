"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, BrainCircuit, Search, BookOpen, Clock, 
  BarChart, Filter, Laptop, Database, Network, 
  Menu, X, Code2, Server, Eye
} from 'lucide-react';

// --- MOCK COURSE DATA ---
const courseCatalog = [
  {
    id: "c_1",
    title: "Applied AI: LLMs & RAG Architectures",
    description: "Build production-ready Retrieval-Augmented Generation pipelines. Learn to integrate vector databases, optimize prompts, and deploy local LLM agents.",
    category: "AI Research",
    level: "Advanced",
    duration: "12 Hours",
    modules: 8,
    icon: <BrainCircuit className="w-8 h-8 text-brand-600" />,
    gradient: "from-brand-500/20 to-brand-700/5"
  },
  {
    id: "c_2",
    title: "Mastering Django ORM & Advanced SQL",
    description: "Stop writing N+1 queries. Dive deep into select_related, subqueries, database indexing, and complex joins to build lightning-fast backends.",
    category: "Full-Stack",
    level: "Intermediate",
    duration: "8 Hours",
    modules: 6,
    icon: <Database className="w-8 h-8 text-info-600" />,
    gradient: "from-info-500/20 to-info-700/5"
  },
  {
    id: "c_3",
    title: "Advanced System Design & LLD",
    description: "Crack the SDE interview. Master High-Level Design (HLD) trade-offs and Low-Level Design (LLD) object-oriented principles with real-world scale problems.",
    category: "Interview Prep",
    level: "Advanced",
    duration: "15 Hours",
    modules: 12,
    icon: <Network className="w-8 h-8 text-warning-600" />,
    gradient: "from-warning-500/20 to-warning-700/5"
  },
  {
    id: "c_4",
    title: "Computer Vision & Object Detection",
    description: "Train and deploy state-of-the-art vision models. Master YOLO architectures for real-time inference and build edge-deployed tracking applications.",
    category: "AI Research",
    level: "Intermediate",
    duration: "10 Hours",
    modules: 7,
    icon: <Eye className="w-8 h-8 text-success-600" />,
    gradient: "from-success-500/20 to-success-700/5"
  },
  {
    id: "c_5",
    title: "Data Structures & Algorithms in Python",
    description: "A rigorous, pattern-based approach to DSA. Stop memorizing LeetCode and start recognizing the underlying patterns needed for technical interviews.",
    category: "Interview Prep",
    level: "Intermediate",
    duration: "20 Hours",
    modules: 15,
    icon: <Code2 className="w-8 h-8 text-error-600" />,
    gradient: "from-error-500/20 to-error-700/5"
  },
  {
    id: "c_6",
    title: "Next.js & React Full-Stack Architecture",
    description: "Architect modern, server-rendered applications. Learn advanced state management, Server Components, and secure API route design.",
    category: "Full-Stack",
    level: "Beginner",
    duration: "14 Hours",
    modules: 10,
    icon: <Laptop className="w-8 h-8 text-brand-500" />,
    gradient: "from-brand-400/20 to-brand-600/5"
  }
];

const categories = ["All Paths", "Full-Stack", "AI Research", "Interview Prep"];

export default function CoursesGallery() {
  const [activeCategory, setActiveCategory] = useState("All Paths");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter Logic
  const filteredCourses = courseCatalog.filter(course => {
    const matchesCategory = activeCategory === "All Paths" || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-surface-50 text-surface-800 font-sans">
      
      {/* 1. PUBLIC NAVBAR (Consistent with Landing Page) */}
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
            <NavLink href="/courses" active>Courses</NavLink>
            <NavLink href="/interview">Interview Prep</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/jobs">Jobs Board</NavLink>
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

      {/* 2. PAGE HEADER / SEARCH */}
      <header className="pt-32 pb-16 px-4 sm:px-6 bg-white border-b border-surface-200">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-surface-950 tracking-tight mb-4">
              Explore Learning Paths
            </h1>
            <p className="text-lg text-surface-600 font-medium leading-relaxed">
              Master complex architecture, crack technical interviews, and build production-ready AI applications with our locally-executed sandboxes.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Pills */}
            <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 gap-2 hide-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeCategory === cat 
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20' 
                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200 hover:text-surface-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-surface-400" />
              </div>
              <input
                type="text"
                placeholder="Search paths or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-surface-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all shadow-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* 3. COURSE GRID */}
      <main className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-surface-900">
              {activeCategory === "All Paths" ? "All Available Paths" : `${activeCategory} Paths`}
            </h2>
            <span className="text-sm font-semibold text-surface-500 bg-surface-200 px-3 py-1 rounded-full">
              {filteredCourses.length} results
            </span>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-surface-200 border-dashed">
              <Search className="w-12 h-12 text-surface-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-surface-900 mb-2">No courses found</h3>
              <p className="text-surface-500 font-medium max-w-md mx-auto">
                We couldn't find any learning paths matching "{searchQuery}" in the {activeCategory} category.
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveCategory("All Paths"); }}
                className="mt-6 text-brand-600 font-bold hover:text-brand-700"
              >
                Clear filters
              </button>
            </div>
          )}

        </div>
      </main>

      {/* 4. BOTTOM CTA */}
      <section className="py-20 px-4 sm:px-6 bg-white border-t border-surface-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-surface-950 mb-6">Can't decide where to start?</h2>
          <p className="text-lg text-surface-600 font-medium mb-8">
            Create a free account to take our AI-driven technical diagnostic. We'll instantly generate a custom roadmap targeting your specific knowledge gaps.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full text-lg font-black transition-all shadow-xl shadow-brand-500/20 active:scale-95">
            Take Diagnostic Test <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}

// --- HELPER COMPONENTS ---

function CourseCard({ course }: { course: any }) {
  // Determine badge colors based on difficulty
  const levelColors = {
    Beginner: "bg-success-50 text-success-700 border-success-200",
    Intermediate: "bg-warning-50 text-warning-700 border-warning-200",
    Advanced: "bg-error-50 text-error-700 border-error-200"
  }[course.level as "Beginner" | "Intermediate" | "Advanced"];

  return (
    <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden hover:shadow-xl hover:shadow-surface-900/5 hover:border-brand-300 transition-all duration-300 group flex flex-col h-full">
      
      {/* Thumbnail Area */}
      <div className={`h-40 bg-gradient-to-br ${course.gradient} flex items-center justify-center relative`}>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-surface-800 text-xs font-bold rounded-lg shadow-sm">
            {course.category}
          </span>
        </div>
        <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {course.icon}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-0.5 text-[10px] sm:text-xs font-bold rounded-md border uppercase tracking-wider ${levelColors}`}>
            {course.level}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-surface-950 mb-2 leading-tight group-hover:text-brand-700 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-sm text-surface-600 font-medium line-clamp-3 mb-6 flex-1">
          {course.description}
        </p>
        
        {/* Stats Row */}
        <div className="flex items-center gap-4 text-surface-500 text-sm font-semibold mb-6 pt-4 border-t border-surface-100 mt-auto">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {course.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> {course.modules} Modules
          </div>
        </div>

        {/* Action Button */}
        <Link 
          href={`/courses/${course.id}`} 
          className="w-full flex items-center justify-center gap-2 bg-surface-100 hover:bg-brand-50 text-surface-900 hover:text-brand-700 font-bold py-3 rounded-xl transition-colors border border-transparent hover:border-brand-200"
        >
          View Syllabus <ArrowRight className="w-4 h-4" />
        </Link>
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