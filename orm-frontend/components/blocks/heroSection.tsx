import { ArrowRight, MessagesSquare, Laptop, Sparkles, Star} from "lucide-react";
import Link from "next/link";

export default function HeroSection() {

  return (
    <main className="pt-28 md:pt-40 pb-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        {/* Left Text Content */}
        <div className="md:col-span-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 text-brand-700 text-xs sm:text-sm font-semibold rounded-full mb-6 border border-brand-200">
            <Sparkles className="w-4 h-4 text-warning-400" />
            AI-Powered Career Accelerator
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-surface-950 leading-[1.05] lg:leading-[0.95] tracking-tighter mb-6">
            Learn<span className="text-brand-600">.</span> Prepare
            <span className="text-brand-600">.</span> Get Hired
            <span className="text-brand-600">.</span>
          </h1>
          <p className="text-lg sm:text-xl text-surface-600 mb-8 lg:mb-10 leading-relaxed font-medium max-w-2xl mx-auto md:mx-0">
            Watching videos won&apos;t get you hired.{" "}
            <strong className="text-brand-700">dobit.ai</strong> is your
            private, local coding companion that forces you to build, critiques
            designs in real-time, and simulates technical rounds.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link
              href="/courses"
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full text-base sm:text-lg font-black transition-all shadow-xl shadow-brand-500/30 active:scale-95 group"
            >
              Explore Courses{" "}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/interview"
              className="w-full sm:w-auto flex justify-center items-center gap-2 bg-white hover:bg-surface-100 text-brand-700 px-8 py-4 rounded-full text-base sm:text-lg font-bold transition-colors border-2 border-brand-100"
            >
              <Laptop className="w-5 h-5" /> Start Mock Interview
            </Link>
          </div>
        </div>

        {/* Right Visual "Abstract Coding/AI" Graphic */}
        <div className="md:col-span-6 relative flex justify-center items-center mt-12 md:mt-0 w-full max-w-lg mx-auto">
          {/* The primary graphic "Code Sandbox" window */}
          <div className="w-full sm:w-[450px] min-h-[250px] sm:min-h-[350px] bg-surface-950 rounded-2xl shadow-2xl p-4 sm:p-6 border-4 border-white relative z-10 rotate-[-2deg] scale-100 lg:scale-110">
            <div className="flex gap-2 sm:gap-2.5 mb-4 sm:mb-5 border-b border-surface-800 pb-3 sm:pb-4">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-error-500"></div>
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-warning-400"></div>
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-success-500"></div>
              <span className="text-surface-600 font-mono text-[10px] sm:text-xs ml-auto">
                dobit_ai_sandbox.py
              </span>
            </div>
            <div className="text-[#a78bfa] font-mono text-xs sm:text-sm leading-relaxed overflow-x-hidden break-words">
              <p># AI Interview Simulation</p>
              <p className="text-surface-400 mt-1 sm:mt-0">@dobit.ai/engine</p>
              <p className="mt-2 break-all">
                db_query = User.query.include(posts)
              </p>
              <p className="text-success-400 mt-2">✓ Optimization found</p>
              <p className="mt-2">result = &quot;Joins implemented.&quot;</p>
            </div>
          </div>

          {/* Floating context cards */}
          <div className="absolute -top-6 -right-2 sm:-top-12 sm:-right-8 bg-warning-400 text-white p-3 sm:p-4 rounded-xl shadow-xl z-20 rotate-[10deg] flex items-center gap-2 sm:gap-3">
            <Star className="w-6 h-6 sm:w-8 sm:h-8 fill-white" />
            <div className="text-right">
              <p className="text-xl sm:text-2xl font-black">9.8</p>
              <p className="text-[10px] sm:text-xs font-bold leading-tight">
                Offer Rate
              </p>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-2 sm:-bottom-10 sm:-left-10 bg-brand-100 p-2 sm:p-3 rounded-2xl shadow-xl z-0 border-2 border-white">
            <MessagesSquare className="w-12 h-12 sm:w-20 sm:h-20 text-brand-600 opacity-50" />
          </div>
        </div>
      </div>
    </main>
  );
}
