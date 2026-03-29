"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BrainCircuit, Menu, X, ArrowLeft, Clock, 
  Calendar, Share2, Bookmark, Network, Terminal,
  CheckCircle2, Copy, ArrowRight
} from 'lucide-react';

export default function BlogPost() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-surface-800 font-sans selection:bg-brand-200 selection:text-brand-900">
      
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
            <NavLink href="/blog" active>Blog</NavLink>
            <NavLink href="/jobs">Jobs Board</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-3">
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

      {/* 2. ARTICLE HEADER */}
      <header className="pt-32 pb-12 px-4 sm:px-6 bg-surface-50 border-b border-surface-200">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-surface-500 hover:text-brand-600 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-widest rounded-lg">
              System Design
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-surface-500">
              <Calendar className="w-4 h-4" /> March 24, 2026
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-surface-500">
              <Clock className="w-4 h-4" /> 12 min read
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-surface-950 tracking-tight leading-[1.1] mb-8">
            How to architect a scalable Rate Limiter (The Stripe Approach)
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-surface-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-200 rounded-full flex items-center justify-center text-brand-800 font-black text-xl">
                A
              </div>
              <div>
                <p className="font-bold text-surface-900 text-lg">Alex Developer</p>
                <p className="text-sm font-medium text-surface-500">Ex-Stripe Staff Engineer • Instructor at dobit.ai</p>
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-white border border-surface-200 flex items-center justify-center text-surface-500 hover:text-brand-600 hover:border-brand-200 transition-colors shadow-sm">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white border border-surface-200 flex items-center justify-center text-surface-500 hover:text-brand-600 hover:border-brand-200 transition-colors shadow-sm">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. ARTICLE CONTENT */}
      <main className="py-12 px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto">
          
          {/* Custom Markdown-style typography without needing external plugins */}
          <article className="prose-custom">
            <p className="text-xl text-surface-700 leading-relaxed font-medium mb-10">
              If you are interviewing for a Senior or Staff backend engineering role, you will almost certainly be asked to design an API rate limiter. It sounds simple on the surface—just count requests, right? Wrong. In a distributed system handling millions of requests per second, a naive counter will destroy your database and ruin your latency.
            </p>

            <h2 className="text-3xl font-extrabold text-surface-950 mt-12 mb-6 tracking-tight">The Naive Approach (And why it fails)</h2>
            <p className="text-lg text-surface-700 leading-relaxed mb-6">
              The most common junior mistake is suggesting an in-memory counter on the application server. The logic usually looks like this:
            </p>
            <ul className="list-disc list-inside text-lg text-surface-700 leading-relaxed mb-6 space-y-2 pl-4">
              <li>Store a <code>HashMap</code> where the key is the User ID.</li>
              <li>Increment the value on every request.</li>
              <li>If the value exceeds the limit, return HTTP 429 (Too Many Requests).</li>
            </ul>
            <p className="text-lg text-surface-700 leading-relaxed mb-8">
              <strong className="text-surface-900">The problem? State isn't shared.</strong> If you have 50 load-balanced application servers, a user could hit your API 50 times their limit simply by being routed to different instances. You need a centralized data store.
            </p>

            {/* Insight Block */}
            <div className="my-10 bg-brand-50 border-l-4 border-brand-500 p-6 sm:p-8 rounded-r-2xl">
              <div className="flex items-center gap-2 text-brand-800 font-bold mb-3">
                <Network className="w-5 h-5" /> Architectural Insight
              </div>
              <p className="text-brand-900 text-lg font-medium leading-relaxed m-0">
                When scaling rate limiters, your storage layer must be incredibly fast. A traditional relational database (like PostgreSQL) is too slow for per-request validation. This is where <strong className="text-brand-950 font-black">Redis</strong> becomes mandatory.
              </p>
            </div>

            <h2 className="text-3xl font-extrabold text-surface-950 mt-12 mb-6 tracking-tight">The Stripe Approach: Token Bucket via Redis</h2>
            <p className="text-lg text-surface-700 leading-relaxed mb-6">
              Stripe popularized a specific implementation of the <strong>Token Bucket</strong> algorithm using Redis. Imagine a bucket that holds a maximum number of tokens. Every request takes one token out. Tokens are refilled at a constant rate.
            </p>
            <p className="text-lg text-surface-700 leading-relaxed mb-8">
              To implement this atomically in a distributed environment (preventing race conditions where two concurrent requests read the same token count before decrementing), we use a <strong>Redis Lua Script</strong>. Lua scripts execute atomically in Redis.
            </p>

            {/* Code Block */}
            <div className="my-10 bg-surface-950 rounded-2xl shadow-xl overflow-hidden border border-surface-800">
              <div className="flex items-center justify-between px-4 py-3 bg-surface-900 border-b border-surface-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-brand-400" />
                  <span className="text-surface-300 text-sm font-mono font-medium">rate_limiter.lua</span>
                </div>
                <button 
                  onClick={handleCopy}
                  className="text-surface-400 hover:text-white transition-colors"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-success-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-6 overflow-x-auto text-sm sm:text-base font-mono leading-relaxed">
                <pre className="text-surface-300">
<span className="text-surface-500">-- KEYS[1]: User specific rate limit key</span><br/>
<span className="text-surface-500">-- ARGV[1]: Token refill rate</span><br/>
<span className="text-surface-500">-- ARGV[2]: Maximum bucket capacity</span><br/>
<span className="text-surface-500">-- ARGV[3]: Current timestamp</span><br/>
<br/>
<span className="text-brand-400">local</span> tokens_key = KEYS[<span className="text-warning-300">1</span>] .. <span className="text-success-300">":tokens"</span><br/>
<span className="text-brand-400">local</span> timestamp_key = KEYS[<span className="text-warning-300">1</span>] .. <span className="text-success-300">":ts"</span><br/>
<br/>
<span className="text-brand-400">local</span> rate = <span className="text-info-300">tonumber</span>(ARGV[<span className="text-warning-300">1</span>])<br/>
<span className="text-brand-400">local</span> capacity = <span className="text-info-300">tonumber</span>(ARGV[<span className="text-warning-300">2</span>])<br/>
<span className="text-brand-400">local</span> now = <span className="text-info-300">tonumber</span>(ARGV[<span className="text-warning-300">3</span>])<br/>
<br/>
<span className="text-brand-400">local</span> last_tokens = <span className="text-info-300">tonumber</span>(redis.call(<span className="text-success-300">"get"</span>, tokens_key))<br/>
<span className="text-brand-400">if</span> last_tokens == <span className="text-brand-400">nil</span> <span className="text-brand-400">then</span><br/>
&nbsp;&nbsp;last_tokens = capacity<br/>
<span className="text-brand-400">end</span><br/>
<br/>
<span className="text-surface-500">-- Calculate refilled tokens based on time elapsed...</span><br/>
<span className="text-brand-400">return</span> allowed
                </pre>
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-surface-950 mt-12 mb-6 tracking-tight">Handling the "Thundering Herd"</h2>
            <p className="text-lg text-surface-700 leading-relaxed mb-6">
              When a rate limit resets (e.g., at the top of the minute), millions of queued requests might hit your server simultaneously. This is the Thundering Herd problem. 
            </p>
            <p className="text-lg text-surface-700 leading-relaxed mb-10">
              To mitigate this, avoid exact resetting timestamps. Add a few milliseconds of random "jitter" to the TTL (Time To Live) of your Redis keys so they expire slightly out of sync.
            </p>

          </article>

          {/* Article Footer & Tags */}
          <div className="mt-16 pt-8 border-t border-surface-200">
            <h4 className="text-sm font-bold text-surface-900 uppercase tracking-widest mb-4">Related Topics</h4>
            <div className="flex flex-wrap gap-2">
              {['System Design', 'Redis', 'Backend Architecture', 'SDE Interviews'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-surface-100 text-surface-700 text-sm font-bold rounded-xl hover:bg-surface-200 cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* 4. CALL TO ACTION (Contextual to the article) */}
      <section className="py-16 px-4 sm:px-6 bg-white border-t border-surface-200">
        <div className="max-w-4xl mx-auto bg-surface-950 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-40 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Stop reading. Start building.</h2>
            <p className="text-lg text-surface-300 font-medium mb-8 max-w-2xl mx-auto">
              You know the theory of the Token Bucket. Now implement it. Open the dobit.ai local sandbox and try to write a thread-safe rate limiter in Python.
            </p>
            <Link href="/interview" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full text-lg font-black transition-all shadow-xl active:scale-95">
              Launch Local Sandbox <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-12 bg-surface-50 text-surface-500 px-4 sm:px-6 border-t border-surface-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-brand-600 p-2 rounded-xl text-white">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-surface-900 tracking-tighter">
              dobit<span className="text-brand-600">.ai</span>
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