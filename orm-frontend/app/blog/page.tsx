"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BrainCircuit, Menu, X, ArrowRight, Calendar, 
  Clock, Mail, Network, Cpu, Code2, Database, Terminal, Zap
} from 'lucide-react';

// --- MOCK BLOG DATA ---
const featuredPost = {
  id: "post_0",
  title: "How to architect a scalable Rate Limiter (The Stripe Approach)",
  excerpt: "A deep dive into the Token Bucket algorithm, Redis sorted sets, and handling race conditions in distributed systems. Perfect for your next Staff Engineer system design round.",
  category: "System Design",
  author: "Alex Developer",
  role: "Ex-Stripe Staff Engineer",
  date: "March 24, 2026",
  readTime: "12 min read",
  icon: <Network className="w-12 h-12 text-brand-600" />,
  gradient: "from-brand-500/20 to-brand-700/5"
};

const blogPosts = [
  {
    id: "post_1",
    title: "Fine-tuning DeepSeek-R1 for local code generation",
    excerpt: "Stop paying for cloud inference. Here is a step-by-step guide to quantizing and fine-tuning reasoning models on your local RTX 4090.",
    category: "AI & ML",
    author: "Sarah J.",
    date: "March 20, 2026",
    readTime: "8 min read",
    icon: <BrainCircuit className="w-6 h-6 text-success-600" />,
    gradient: "from-success-500/20 to-success-700/5"
  },
  {
    id: "post_2",
    title: "Why your Next.js App Router is slow (and how to fix it)",
    excerpt: "Caching strategies, React Server Components, and the exact `fetch` configurations you need to hit perfect Lighthouse scores.",
    category: "Frontend",
    author: "David M.",
    date: "March 18, 2026",
    readTime: "6 min read",
    icon: <Code2 className="w-6 h-6 text-info-600" />,
    gradient: "from-info-500/20 to-info-700/5"
  },
  {
    id: "post_3",
    title: "The exact LLD pattern that got me an offer at Meta",
    excerpt: "Stop over-engineering. How applying the Strategy and Factory patterns correctly can solve 90% of object-oriented design interviews.",
    category: "Interview Prep",
    author: "Priya K.",
    date: "March 15, 2026",
    readTime: "10 min read",
    icon: <Cpu className="w-6 h-6 text-warning-600" />,
    gradient: "from-warning-500/20 to-warning-700/5"
  },
  {
    id: "post_4",
    title: "Stop using PostgreSQL for everything: A guide to NoSQL",
    excerpt: "Relational databases are great, until they aren't. When to reach for MongoDB, Cassandra, or Redis based on your read/write ratios.",
    category: "Backend",
    author: "Jordan K.",
    date: "March 10, 2026",
    readTime: "9 min read",
    icon: <Database className="w-6 h-6 text-error-600" />,
    gradient: "from-error-500/20 to-error-700/5"
  },
  {
    id: "post_5",
    title: "How to negotiate your SDE II compensation package",
    excerpt: "Equity, sign-on bonuses, and the psychological levers you need to pull to increase your total compensation by 20%.",
    category: "Career",
    author: "Alex Developer",
    date: "March 5, 2026",
    readTime: "5 min read",
    icon: <Zap className="w-6 h-6 text-brand-500" />,
    gradient: "from-brand-400/20 to-brand-600/5"
  },
  {
    id: "post_6",
    title: "Building a highly-available WebSocket server in Go",
    excerpt: "Handling 1 million concurrent connections using Go routines, epoll, and smart memory management.",
    category: "Backend",
    author: "Michael T.",
    date: "March 1, 2026",
    readTime: "14 min read",
    icon: <Terminal className="w-6 h-6 text-surface-600" />,
    gradient: "from-surface-400/20 to-surface-600/5"
  }
];

const categories = ["All Posts", "System Design", "AI & ML", "Backend", "Frontend", "Interview Prep", "Career"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter Logic
  const filteredPosts = blogPosts.filter(post => 
    activeCategory === "All Posts" || post.category === activeCategory
  );

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
            <NavLink href="/blog" active>Blog</NavLink>
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

      {/* 2. BLOG HEADER */}
      <header className="pt-32 pb-12 px-4 sm:px-6 bg-white border-b border-surface-200">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-surface-950 tracking-tight mb-6">
            High-signal engineering insights.<br/>
            <span className="text-brand-600">Zero fluff.</span>
          </h1>
          <p className="text-lg md:text-xl text-surface-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Deep technical breakdowns on system architecture, AI research, and actionable strategies to ace the FAANG interview.
          </p>
        </div>
      </header>

      {/* 3. FEATURED POST (Only show on 'All Posts') */}
      {activeCategory === "All Posts" && (
        <section className="py-12 px-4 sm:px-6 bg-surface-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm font-bold text-surface-400 uppercase tracking-widest mb-6">Featured Article</h2>
            
            <Link href={`/blog/${featuredPost.id}`} className="group grid lg:grid-cols-2 bg-white rounded-3xl border border-surface-200 overflow-hidden hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300">
              
              {/* Featured Abstract Art */}
              <div className={`h-64 lg:h-full min-h-[300px] bg-gradient-to-br ${featuredPost.gradient} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
                <div className="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  {featuredPost.icon}
                </div>
              </div>

              {/* Featured Content */}
              <div className="p-8 sm:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-surface-100 text-surface-800 text-xs font-bold rounded-lg uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-1 text-surface-500 text-sm font-semibold">
                    <Clock className="w-4 h-4" /> {featuredPost.readTime}
                  </div>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-black text-surface-950 mb-4 leading-tight group-hover:text-brand-700 transition-colors">
                  {featuredPost.title}
                </h3>
                
                <p className="text-lg text-surface-600 font-medium leading-relaxed mb-8">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-surface-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-surface-900">{featuredPost.author}</p>
                      <p className="text-xs font-semibold text-surface-500">{featuredPost.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-brand-600 font-bold group-hover:gap-3 transition-all">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* 4. BLOG GRID & FILTERS */}
      <section className="py-12 px-4 sm:px-6 bg-white border-t border-surface-200">
        <div className="max-w-7xl mx-auto">
          
          {/* Categories */}
          <div className="flex overflow-x-auto pb-6 mb-8 gap-2 hide-scrollbar border-b border-surface-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-surface-900 text-white shadow-md' 
                    : 'bg-surface-50 text-surface-600 border border-surface-200 hover:bg-surface-100 hover:text-surface-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-24">
              <BookOpenText className="w-12 h-12 text-surface-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-surface-900 mb-2">No articles found</h3>
              <p className="text-surface-500 font-medium">Check back soon for new content in this category.</p>
            </div>
          )}

        </div>
      </section>

      {/* 5. NEWSLETTER CTA */}
      <section className="py-24 px-4 sm:px-6 bg-surface-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-brand-600/20 blur-[100px] rounded-full z-0 pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-brand-500/30">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Level up your inbox.
          </h2>
          <p className="text-lg text-surface-300 font-medium mb-10 max-w-xl mx-auto">
            Join 15,000+ engineers receiving our weekly deep-dives on system architecture, database optimization, and interview strategies.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="engineer@company.com" 
              required
              className="flex-1 bg-surface-900 border border-surface-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-surface-500"
            />
            <button type="submit" className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 whitespace-nowrap">
              Subscribe Free
            </button>
          </form>
          <p className="text-xs text-surface-500 mt-4 font-medium">No spam. Unsubscribe at any time.</p>
        </div>
      </section>

    </div>
  );
}

// --- HELPER COMPONENTS ---

function BlogCard({ post }: { post: any }) {
  return (
    <Link href={`/blog/${post.id}`} className="bg-white rounded-2xl border border-surface-200 overflow-hidden hover:shadow-xl hover:shadow-surface-900/5 hover:border-brand-300 transition-all duration-300 hover:-translate-y-1 group flex flex-col h-full">
      
      {/* Thumbnail Area */}
      <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative overflow-hidden`}>
        <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10">
          {post.icon}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2.5 py-1 bg-surface-100 text-surface-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-surface-200">
            {post.category}
          </span>
          <span className="text-xs text-surface-500 font-semibold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {post.date}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-surface-950 mb-3 leading-snug group-hover:text-brand-700 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-sm text-surface-600 font-medium line-clamp-3 mb-6 flex-1 leading-relaxed">
          {post.excerpt}
        </p>
        
        {/* Author Row */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-surface-100 rounded-full flex items-center justify-center text-surface-600 font-bold text-xs">
              {post.author.charAt(0)}
            </div>
            <span className="text-sm font-bold text-surface-900">{post.author}</span>
          </div>
          <div className="flex items-center gap-1 text-surface-400 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </div>
        </div>
      </div>
    </Link>
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