"use client";
import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, BrainCircuit, BookOpenText, Laptop, BriefcaseBusiness, Sparkles, Star,
  CheckCircle2, Code2, Database, Network, Quote, ShieldCheck, ChevronRight, User,
} from 'lucide-react';
import TopHeader from '@/components/layout/topHeader';
import HeroSection from '@/components/blocks/heroSection';
import FooterSection from '@/components/blocks/footer';


export default function LandingPage() {

  return (
    <div className="min-h-screen bg-white text-surface-800 font-sans overflow-x-hidden">
      <TopHeader></TopHeader>  {/* 1. TOP HEADER / NAVIGATION */}
      <HeroSection/> {/* 2. HERO SECTION */}
      <TrustedBySection /> {/* 3. TRUSTED BY SECTION */}

      {/* 4. CORE FEATURES GRID SECTION */}
      <section className="py-16 md:py-24 bg-surface-100 border-y border-surface-200 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-surface-950 leading-tight tracking-tighter mb-4">
              Your Entire Career Path, <br className="hidden sm:block"/><span className="text-brand-600">Elevated by AI.</span>
            </h2>
            <p className="text-base sm:text-lg text-surface-600 font-medium leading-relaxed">
              We&apos;ve consolidated the critical pillars of career growth into one powerful platform, using AI to personalize your experience locally.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <FeatureCard icon={<BookOpenText/>} title="Expert Courses" desc="Deep-dive technical paths curated by industry leads." link="/courses" />
            <FeatureCard icon={<Laptop/>} title="Mock Interviews" desc="Simulate real tech rounds with instant AI feedback." link="/interview" highlight />
            <FeatureCard icon={<BookOpenText/>} title="Tech Blog" desc="Stay ahead with original insights and trends." link="/blog" />
            <FeatureCard icon={<BriefcaseBusiness/>} title="Jobs Board" desc="Connect directly with verified hiring partners." link="/jobs" />
          </div>
        </div>
      </section>

      <RoadmapsSection />        {/* 5. ROADMAPS */}
      <AIDeepDiveSection />      {/* 6. AI DEEP DIVE */}
      <PipelineSection />        {/* 7. PIPELINE */}
      <TestimonialSection />     {/* 8. TESTIMONIALS */}
      <BottomCTASection />       {/* 9. BOTTOM CTA */}
      <FooterSection/>           {/* 10. FOOTER */}

    </div>
  );
}

// --- HELPER COMPONENTS ---

function FeatureCard({ icon, title, desc, link, highlight=false }: { icon: React.ReactNode, title: string, desc: string, link: string, highlight?: boolean }) {
  return (
    <div className={`bg-white p-6 sm:p-8 rounded-2xl border transition-all duration-300 group flex flex-col justify-between ${
      highlight ? 'border-brand-300 bg-brand-50 shadow-lg shadow-brand-500/10 lg:scale-105' : 'border-surface-200 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10'
    }`}>
      <div>
        <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-6 shadow-md ${
          highlight ? 'bg-brand-600 text-white shadow-brand-500/30' : 'bg-surface-100 text-surface-600 group-hover:bg-brand-100 group-hover:text-brand-600'
        }`}>
          {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6 sm:w-7 sm:h-7' })}
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-surface-950 mb-3 tracking-tight">{title}</h3>
        <p className="text-sm sm:text-base text-surface-700 leading-relaxed font-medium mb-8 sm:mb-12">{desc}</p>
      </div>
      <Link href={link} className={`flex items-center gap-2 text-sm font-black transition-colors mt-auto ${
        highlight ? 'text-brand-700 hover:text-brand-600' : 'text-brand-600 hover:text-brand-500'
      }`}>
        Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

function TrustedBySection() {
  return (
    <section className="py-10 md:py-12 bg-white border-b border-surface-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs sm:text-sm font-bold text-surface-400 uppercase tracking-widest mb-6 md:mb-8">
          Empowering engineers to land roles at top companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 font-black text-lg sm:text-xl md:text-2xl text-surface-800"><Code2 className="w-6 h-6 sm:w-8 sm:h-8"/> TechCorp</div>
          <div className="flex items-center gap-2 font-black text-lg sm:text-xl md:text-2xl text-surface-800"><Database className="w-6 h-6 sm:w-8 sm:h-8"/> DataSys</div>
          <div className="flex items-center gap-2 font-black text-lg sm:text-xl md:text-2xl text-surface-800"><Network className="w-6 h-6 sm:w-8 sm:h-8"/> CloudNet</div>
          <div className="flex items-center gap-2 font-black text-lg sm:text-xl md:text-2xl text-surface-800"><ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8"/> SecureFlow</div>
        </div>
      </div>
    </section>
  );
}

function RoadmapsSection() {
  const roadmaps = [
    {
      title: "Full-Stack Engineering",
      desc: "Stop building to-do apps. Architect production-grade platforms using Next.js, Django, and Docker.",
      tags: ["React", "Next.js", "Django ORM", "Docker"],
      icon: <Laptop className="w-6 h-6 text-brand-500" />
    },
    {
      title: "The SDE Interview",
      desc: "Master the patterns, not just the code. Intensive drills on Data Structures, Algorithms, and Low-Level Design.",
      tags: ["DSA", "High-Level Design", "Low-Level Design", "SQL"],
      icon: <BookOpenText className="w-6 h-6 text-brand-500" />
    },
    {
      title: "Applied AI Research",
      desc: "Move beyond basic API wrappers. Train object detection models and build advanced RAG pipelines from scratch.",
      tags: ["LLMs", "RAG Architecture", "Object Detection", "Python"],
      icon: <BrainCircuit className="w-6 h-6 text-brand-500" />
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-surface-950 tracking-tight mb-4">
              Curated <span className="text-brand-600">Learning Paths</span>
            </h2>
            <p className="text-base sm:text-lg text-surface-600 font-medium leading-relaxed">
              Don&apos;t guess what to learn next. Follow structured, industry-aligned roadmaps designed to take you from fundamentals to advanced engineering.
            </p>
          </div>
          <Link href="/courses" className="hidden lg:flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors">
            View all paths <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {roadmaps.map((map, idx) => (
            <div key={idx} className="bg-surface-50 border border-surface-200 p-6 sm:p-8 rounded-2xl hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10 transition-all group flex flex-col">
              <div className="bg-white w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-sm border border-surface-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {map.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-surface-900 mb-3">{map.title}</h3>
              <p className="text-sm sm:text-base text-surface-600 font-medium mb-6 flex-1">{map.desc}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {map.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 sm:px-3 sm:py-1 bg-surface-200 text-surface-700 text-[10px] sm:text-xs font-bold rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-brand-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Start Path <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center lg:hidden">
          <Link href="/courses" className="flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors border border-brand-200 px-6 py-3 rounded-full bg-brand-50">
            View all paths <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function AIDeepDiveSection() {
  return (
    <section className="py-16 md:py-24 bg-surface-950 text-white px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="order-2 lg:order-1 relative w-full max-w-md mx-auto lg:max-w-full mt-8 lg:mt-0">
          <div className="bg-surface-900 border border-surface-700 rounded-2xl p-5 sm:p-6 shadow-2xl relative z-10">
            <div className="flex gap-3 sm:gap-4 items-start mb-6 border-b border-surface-800 pb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
                <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-brand-300 mb-1 text-sm sm:text-base">inteleek.ai Consultant</p>
                <p className="text-xs sm:text-sm text-surface-300 leading-relaxed">
                  Your Django ORM query here is going to hit the database 50 separate times in this loop. Refactor this using <code className="bg-surface-800 px-1 py-0.5 rounded text-surface-100">select_related()</code> or <code className="bg-surface-800 px-1 py-0.5 rounded text-surface-100">prefetch_related()</code> before we move on to the system design round.
                </p>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-surface-300" />
              </div>
              <div className="bg-surface-800 p-3 sm:p-4 rounded-xl text-xs sm:text-sm text-surface-200 w-full border border-surface-700">
                Got it. Refactoring to optimize the backend query now.
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-600/20 blur-[60px] sm:blur-[100px] rounded-full z-0 pointer-events-none"></div>
        </div>
        
        <div className="order-1 lg:order-2 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-500/20 text-brand-300 text-xs sm:text-sm font-semibold rounded-full mb-6 border border-brand-500/30">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" /> Zero-Latency Local Execution
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            A Senior Engineer, living right on your local machine.
          </h2>
          <p className="text-base sm:text-lg text-surface-300 font-medium leading-relaxed mb-8">
            Forget waiting on cloud APIs or worrying about your code being used as training data. The inteleek.ai engine runs entirely on your local environment. It&apos;s an independent technical consultant that securely reviews your proprietary code, catches N+1 query bottlenecks, and pushes you to write cleaner architecture.
          </p>
          <ul className="space-y-3 sm:space-y-4 text-left inline-block lg:block">
            {['Private context-aware code reviews', 'System design critiques', 'Real-time mock interview feedback'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-surface-200 font-medium text-sm sm:text-base">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PipelineSection() {
  const steps = [
    { num: "01", title: "Audit", desc: "Our local engine analyzes your code to expose your hidden weaknesses in HLD and algorithms." },
    { num: "02", title: "Rebuild", desc: "No more copy-pasting. Write solutions in the interactive sandbox until your logic is bulletproof." },
    { num: "03", title: "Survive", desc: "Face high-pressure mock interviews that dynamically adapt to your answers in real-time." },
    { num: "04", title: "Conquer", desc: "Walk into your next technical interview over-prepared and ready to negotiate." }
  ];

  return (
    <section className="py-16 md:py-24 bg-surface-50 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-950 mb-12 md:mb-16">The complete pipeline to your next role</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 relative">
          <div className="hidden lg:block absolute top-10 left-24 right-24 h-0.5 bg-surface-200 z-0"></div>
          
          {/* Mobile vertical line connecting steps */}
          <div className="block lg:hidden absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-0.5 bg-surface-200 z-0 sm:hidden"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white border-4 border-surface-50 shadow-xl rounded-full flex items-center justify-center text-xl sm:text-2xl font-black text-brand-600 mb-4 sm:mb-6">
                {step.num}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-surface-900 mb-2 sm:mb-3 bg-surface-50 px-2">{step.title}</h3>
              <p className="text-sm sm:text-base text-surface-600 font-medium text-center max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="py-16 md:py-24 bg-white px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-surface-950 tracking-tight mb-4">
            Engineers love <span className="text-brand-600">inteleek.ai</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            { quote: "Having the AI run locally means I can bounce highly experimental RAG architectures off it without any data privacy concerns. It's the ultimate sparring partner.", author: "Alex T.", role: "Independent AI Researcher" },
            { quote: "I was failing every system design round because my knowledge was purely theoretical. The interactive sandbox forced me to actually implement the joins and caching layers. It got me the offer.", author: "Sam D.", role: "SDE 1" },
            { quote: "Standard courses hold your hand too much. inteleek.ai acts like a strict tech lead who refuses to approve your PR until your code is actually optimized.", author: "Jordan K.", role: "Fullstack Dev" }
          ].map((t, i) => (
            <div key={i} className="bg-surface-50 p-6 sm:p-8 rounded-2xl border border-surface-200 relative flex flex-col justify-between">
              <div>
                <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-12 sm:h-12 text-surface-200 rotate-180" />
                <div className="flex gap-1 mb-4 sm:mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 sm:w-5 sm:h-5 fill-warning-400 text-warning-400" />)}
                </div>
                <p className="text-surface-700 font-medium text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 relative z-10">&quot;{t.quote}&quot;</p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-base sm:text-lg shrink-0">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-surface-900 text-sm sm:text-base">{t.author}</p>
                  <p className="text-xs sm:text-sm text-surface-500 font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCTASection() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto bg-brand-600 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-10 md:p-16 text-center shadow-2xl shadow-brand-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-brand-500 rounded-full blur-[60px] sm:blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-brand-800 rounded-full blur-[60px] sm:blur-[80px] translate-y-1/2 -translate-x-1/2 opacity-50 pointer-events-none"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight">
            Ready to accelerate your career?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-brand-100 font-medium mb-8 sm:mb-10 max-w-2xl mx-auto">
            Join the next generation of engineers building the future. Start learning, practicing, and interviewing locally today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <Link href="/signup" className="bg-white text-brand-700 hover:bg-surface-50 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full text-base sm:text-lg font-black transition-all shadow-xl hover:scale-105 w-full sm:w-auto">
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}