"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, 
  BarChart, BookOpen, Star, CheckCircle2, 
  PlayCircle, MonitorPlay, Code2, Cpu, 
  ChevronDown, ChevronRight, ShieldCheck, Zap
} from 'lucide-react';
import TopHeader from '@/components/layout/topHeader';
import FooterSection from '@/components/blocks/footer';

// --- MOCK COURSE DATA ---
const courseDetails = {
  id: "c_3",
  title: "Advanced System Design & LLD",
  subtitle: "Crack the SDE interview. Master High-Level Design (HLD) trade-offs and Low-Level Design (LLD) object-oriented principles with real-world scale problems.",
  category: "Interview Prep",
  level: "Advanced",
  duration: "15 Hours",
  modulesCount: 12,
  rating: 4.9,
  students: "12,450",
  instructor: {
    name: "Alex Developer",
    role: "Ex-Stripe Staff Engineer",
    avatar: "A"
  },
  whatYouWillLearn: [
    "Design highly scalable, distributed architectures from scratch.",
    "Master caching strategies, database sharding, and replication.",
    "Apply Gang of Four (GoF) design patterns to solve LLD rounds.",
    "Handle concurrent requests and mitigate race conditions.",
    "Implement rate limiters, message queues, and API gateways.",
    "Pass the FAANG system design rubric with flying colors."
  ],
  syllabus: [
    {
      id: "m1", title: "Module 1: Foundations of Distributed Systems",
      lessons: [
        { title: "Networking & Protocols (TCP/UDP, HTTP/3)", type: "video", duration: "18 min" },
        { title: "The CAP Theorem & Eventual Consistency", type: "reading", duration: "10 min" },
        { title: "Consistent Hashing Implementation", type: "code", duration: "25 min" }
      ]
    },
    {
      id: "m2", title: "Module 2: Scalable Databases",
      lessons: [
        { title: "Relational vs NoSQL Decision Matrix", type: "video", duration: "22 min" },
        { title: "Database Sharding & Replication Strategies", type: "reading", duration: "15 min" },
        { title: "Interactive Sandbox: Query Optimization", type: "code", duration: "30 min" }
      ]
    },
    {
      id: "m3", title: "Module 3: Caching & Message Queues",
      lessons: [
        { title: "Redis, Memcached, and Eviction Policies", type: "video", duration: "20 min" },
        { title: "Kafka vs RabbitMQ in Event-Driven Architecture", type: "video", duration: "25 min" },
        { title: "Build a Rate Limiter (Token Bucket)", type: "code", duration: "45 min" }
      ]
    },
    {
      id: "m4", title: "Module 4: Low-Level Design (LLD) Patterns",
      lessons: [
        { title: "SOLID Principles in Practice", type: "reading", duration: "12 min" },
        { title: "Factory, Strategy, & Observer Patterns", type: "video", duration: "28 min" },
        { title: "Design a Parking Lot System", type: "code", duration: "50 min" }
      ]
    }
  ]
};

export default function CourseOverviewPage() {
  const [expandedModules, setExpandedModules] = useState<string[]>(['m1', 'm2']);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-surface-50 text-surface-800 font-sans">
      
      {/* 1. PUBLIC NAVBAR */}
      <TopHeader/>

      {/* 2. COURSE HERO SECTION */}
      <header className="pt-32 pb-16 px-4 sm:px-6 bg-surface-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-600 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-20 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8">
            <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-bold text-surface-400 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to courses
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-widest rounded-lg">
                {courseDetails.category}
              </span>
              <span className="px-3 py-1 bg-error-500/20 text-error-300 border border-error-500/30 text-xs font-bold uppercase tracking-widest rounded-lg">
                {courseDetails.level}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
              {courseDetails.title}
            </h1>
            
            <p className="text-lg text-surface-300 font-medium leading-relaxed max-w-2xl mb-8">
              {courseDetails.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-surface-300 mb-8">
              <div className="flex items-center gap-1.5 text-warning-400">
                <Star className="w-4 h-4 fill-warning-400" /> {courseDetails.rating} Rating
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> {courseDetails.students} Students
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {courseDetails.duration}
              </div>
              <div className="flex items-center gap-1.5">
                <BarChart className="w-4 h-4" /> {courseDetails.modulesCount} Modules
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-surface-800 rounded-full flex items-center justify-center text-white font-black text-xl border border-surface-700">
                {courseDetails.instructor.avatar}
              </div>
              <div>
                <p className="font-bold text-white">Instructed by {courseDetails.instructor.name}</p>
                <p className="text-sm font-medium text-surface-400">{courseDetails.instructor.role}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. TWO-COLUMN LAYOUT (Content & Sticky Card) */}
      <main className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 relative">
          
          {/* LEFT COLUMN: Main Course Content */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* What you'll learn */}
            <section>
              <h2 className="text-2xl font-extrabold text-surface-950 mb-6">What you&apos;ll learn</h2>
              <div className="bg-white border border-surface-200 rounded-2xl p-6 sm:p-8 grid sm:grid-cols-2 gap-4 shadow-sm">
                {courseDetails.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success-500 shrink-0 mt-0.5" />
                    <span className="text-surface-700 font-medium text-sm sm:text-base leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Platform Advantage Callout */}
            <section className="bg-brand-50 border border-brand-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                <Cpu className="w-8 h-8 text-brand-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-900 mb-2">Powered by Local AI Execution</h3>
                <p className="text-brand-700 font-medium leading-relaxed">
                  This isn&apos;t just a video course. Every module connects to your local <strong>inteleek.ai</strong> engine. You will write actual code, configure databases, and receive real-time AI architectural reviews right on your machine.
                </p>
              </div>
            </section>

            {/* Syllabus Accordion */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-surface-950">Course Syllabus</h2>
                <span className="text-sm font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                  {courseDetails.modulesCount} Modules
                </span>
              </div>
              
              <div className="space-y-4">
                {courseDetails.syllabus.map((module) => (
                  <div key={module.id} className="bg-white border border-surface-200 rounded-2xl overflow-hidden shadow-sm hover:border-surface-300 transition-colors">
                    <button 
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 bg-surface-50/50 hover:bg-surface-50 transition-colors"
                    >
                      <h3 className="text-base sm:text-lg font-bold text-surface-900 text-left">
                        {module.title}
                      </h3>
                      <div className="flex items-center gap-4 shrink-0 ml-4">
                        <span className="text-sm font-semibold text-surface-500 hidden sm:block">
                          {module.lessons.length} lessons
                        </span>
                        {expandedModules.includes(module.id) ? <ChevronDown className="w-5 h-5 text-surface-400" /> : <ChevronRight className="w-5 h-5 text-surface-400" />}
                      </div>
                    </button>
                    
                    {expandedModules.includes(module.id) && (
                      <div className="border-t border-surface-200 bg-white">
                        {module.lessons.map((lesson, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 sm:px-6 border-b border-surface-100 last:border-0 hover:bg-surface-50 transition-colors group">
                            <div className="flex items-center gap-3">
                              {lesson.type === 'video' && <PlayCircle className="w-5 h-5 text-info-500" />}
                              {lesson.type === 'reading' && <BookOpen className="w-5 h-5 text-surface-400" />}
                              {lesson.type === 'code' && <Code2 className="w-5 h-5 text-warning-500" />}
                              <span className="text-sm sm:text-base font-medium text-surface-700 group-hover:text-surface-950 transition-colors">
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-surface-400 shrink-0 ml-4">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN: Sticky Enrollment Card */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 bg-white border border-surface-200 rounded-3xl p-6 shadow-xl flex flex-col">
              
              {/* Card Header / Graphic */}
              <div className="h-40 bg-gradient-to-br from-brand-500/20 to-brand-700/5 rounded-2xl flex items-center justify-center mb-6 border border-surface-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center relative z-10 text-brand-600">
                  <MonitorPlay className="w-8 h-8" />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-3xl font-black text-surface-950 mb-2">Free</h3>
                <p className="text-sm font-medium text-surface-500">Includes complete access to modules, local sandboxes, and AI interviewer.</p>
              </div>

              <Link href="/signup" className="w-full flex items-center justify-center bg-brand-600 hover:bg-brand-500 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-500/20 active:scale-95 mb-4 text-lg">
                Start Learning Now
              </Link>
              <p className="text-center text-xs font-semibold text-surface-400 mb-6">No credit card required.</p>

              <div className="border-t border-surface-200 pt-6">
                <h4 className="text-sm font-bold text-surface-900 mb-4">This course includes:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-medium text-surface-600">
                    <MonitorPlay className="w-4 h-4 text-surface-400" /> {courseDetails.duration} of intensive training
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-surface-600">
                    <Code2 className="w-4 h-4 text-surface-400" /> Interactive local coding sandboxes
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-surface-600">
                    <Zap className="w-4 h-4 text-surface-400" /> Real-time AI architectural feedback
                  </li>
                  <li className="flex items-center gap-3 text-sm font-medium text-surface-600">
                    <ShieldCheck className="w-4 h-4 text-surface-400" /> Match Score validation for Jobs Board
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* 4. FOOTER */}
      <FooterSection/>
    </div>
  );
}
