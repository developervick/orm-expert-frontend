import React from 'react';
import { useState } from 'react';
import { 
  ArrowRight, BrainCircuit, LogIn, Menu, X
} from 'lucide-react';
import {NavLink, MobileNavLink} from '../ui/navLink';
import Link from 'next/link';


export default function TopHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink href='/'>Home</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/interview">Interview Prep</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/jobs">Jobs Board</NavLink>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-surface-700 hover:text-brand-600 transition-colors">
              Login
            </Link>
            <Link href="/signup" className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-brand-500/20 active:scale-95 group">
              Start Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/partner/login" className="flex items-center gap-2 text-surface-700 px-6 py-2.5 transition-all group">
              Partners Logins <LogIn className='w-4 h-4 group-hover:translate-x-1 transition-transform'></LogIn>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-surface-600 hover:bg-surface-100 rounded-lg z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-surface-200 shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-4 gap-2">
            <MobileNavLink href="/courses" onClick={() => setIsMobileMenuOpen(false)}>Courses</MobileNavLink>
            <MobileNavLink href="/interview" onClick={() => setIsMobileMenuOpen(false)}>Interview Prep</MobileNavLink>
            <MobileNavLink href="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</MobileNavLink>
            <MobileNavLink href="/jobs" onClick={() => setIsMobileMenuOpen(false)}>Jobs Board</MobileNavLink>
            <MobileNavLink href="/partner/login" onClick={() => setIsMobileMenuOpen(false)}>Partners Login</MobileNavLink>
            <div className="h-px w-full bg-surface-200 my-2"></div>
            <div className="flex flex-col gap-3 pt-2">
              <Link href="/login" className="text-center w-full py-3 text-sm font-semibold text-surface-700 bg-surface-50 rounded-xl">
                 Login
              </Link>
              <Link href="/signup" className="flex justify-center items-center gap-2 w-full bg-brand-600 text-white py-3 rounded-xl font-bold shadow-md">
                Start Learning Free
              </Link>
              
            </div>
          </div>
        </div>
      </nav>
  );
}