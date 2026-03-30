"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BrainCircuit, ArrowRight, Terminal, 
  Mic, Video, Settings, Play, Code2, Network, 
  Cpu, Activity, CheckCircle2, ShieldAlert, Timer
} from 'lucide-react';
import TopHeader from '@/components/layout/topHeader';
import FooterSection from '@/components/blocks/footer';

const roles = ["SDE I", "SDE II", "Staff Engineer", "Frontend Specialist"];
const topics = [
  { id: "dsa", name: "Data Structures & Algorithms", icon: <Code2 className="w-5 h-5" /> },
  { id: "hld", name: "High-Level Design (HLD)", icon: <Network className="w-5 h-5" /> },
  { id: "lld", name: "Low-Level Design (LLD)", icon: <Cpu className="w-5 h-5" /> },
  { id: "db", name: "Database & ORM Optimization", icon: <Terminal className="w-5 h-5" /> }
];

export default function InterviewPage() {
  const [selectedRole, setSelectedRole] = useState("SDE II");
  const [selectedTopic, setSelectedTopic] = useState("hld");
  const [difficulty, setDifficulty] = useState("Hard");

  return (
    <div className="min-h-screen bg-surface-50 text-surface-800 font-sans">
      
      {/* 1. PUBLIC NAVBAR */}
      <TopHeader/>

      {/* 2. HERO / CONFIGURATOR SECTION */}
      <header className="pt-32 pb-16 px-4 sm:px-6 bg-white border-b border-surface-200 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Copy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-error-50 text-error-700 text-sm font-semibold rounded-full mb-6 border border-error-200">
              <ShieldAlert className="w-4 h-4" />
              Fail privately. Succeed publicly.
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-surface-950 tracking-tight mb-6 leading-[1.1]">
              The whiteboard, <br/>
              <span className="text-brand-600">without the judgment.</span>
            </h1>
            <p className="text-lg text-surface-600 font-medium leading-relaxed max-w-xl mb-8">
              Simulate the crushing pressure of a FAANG interview right on your local machine. Our AI interviewer adapts dynamically to your code, asks follow-up scale questions, and grades your communication.
            </p>
            <div className="flex items-center gap-6 text-sm font-bold text-surface-500">
              <div className="flex items-center gap-2"><Video className="w-5 h-5 text-surface-400"/> Video/Audio Enabled</div>
              <div className="flex items-center gap-2"><Timer className="w-5 h-5 text-surface-400"/> 45-Min Sessions</div>
            </div>
          </div>

          {/* Right: Interactive Configurator */}
          <div className="lg:col-span-6">
            <div className="bg-surface-50 border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-xl relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-surface-900 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-brand-600" /> Configure Session
                </h3>
                <span className="text-xs font-bold bg-brand-100 text-brand-700 px-3 py-1 rounded-full uppercase tracking-widest">
                  Local Engine Ready
                </span>
              </div>

              {/* Target Role */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-surface-500 uppercase tracking-widest mb-3">Target Role</label>
                <div className="flex flex-wrap gap-2">
                  {roles.map(role => (
                    <button key={role} onClick={() => setSelectedRole(role)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      selectedRole === role ? 'bg-surface-900 text-white shadow-md' : 'bg-white text-surface-600 border border-surface-200 hover:border-surface-400'
                    }`}>
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus Area */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-surface-500 uppercase tracking-widest mb-3">Focus Area</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {topics.map(topic => (
                    <button key={topic.id} onClick={() => setSelectedTopic(topic.id)} className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                      selectedTopic === topic.id ? 'bg-brand-50 border-brand-300 border text-brand-700 shadow-sm' : 'bg-white border border-surface-200 text-surface-700 hover:border-brand-200'
                    }`}>
                      <div className={selectedTopic === topic.id ? 'text-brand-600' : 'text-surface-400'}>{topic.icon}</div>
                      <span className="font-bold text-sm leading-tight">{topic.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty & Start */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-surface-200">
                <div className="w-full sm:w-auto flex bg-white border border-surface-200 rounded-xl p-1">
                  {["Medium", "Hard", "Extreme"].map(lvl => (
                    <button key={lvl} onClick={() => setDifficulty(lvl)} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                      difficulty === lvl ? 'bg-surface-100 text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-800'
                    }`}>
                      {lvl}
                    </button>
                  ))}
                </div>
                <Link href="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-brand-500/20 active:scale-95 group">
                  <Play className="w-4 h-4 fill-white" /> Start Interview
                </Link>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* 3. INTERVIEW ROOM PREVIEW (Dark Mode Mockup) */}
      <section className="py-24 px-4 sm:px-6 bg-surface-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-surface-950 mb-4">Inside the Interview Room</h2>
            <p className="text-lg text-surface-600 font-medium">An immersive, zero-latency environment powered by your local machine.</p>
          </div>

          <div className="bg-surface-950 rounded-3xl shadow-2xl overflow-hidden border border-surface-800 flex flex-col lg:flex-row max-w-6xl mx-auto h-auto lg:h-[600px]">
            
            {/* Left: Code Editor Mockup */}
            <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-surface-800">
              <div className="h-12 bg-surface-900 border-b border-surface-800 flex items-center px-4 gap-2">
                <div className="flex gap-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-error-500"></div>
                  <div className="w-3 h-3 rounded-full bg-warning-400"></div>
                  <div className="w-3 h-3 rounded-full bg-success-500"></div>
                </div>
                <div className="bg-surface-800 text-surface-300 text-xs font-mono px-3 py-1 rounded-md flex items-center gap-2">
                  <Code2 className="w-3 h-3"/> system_design.py
                </div>
              </div>
              <div className="flex-1 p-6 font-mono text-sm leading-relaxed overflow-hidden relative">
                <div className="text-surface-500 mb-4"># Task: Design a scalable URL shortener (e.g., bit.ly)</div>
                <div className="text-brand-400">class <span className="text-warning-300">URLShortener</span>:</div>
                <div className="pl-4 text-surface-300">
                  <span className="text-brand-400">def</span> <span className="text-info-300">__init__</span>(self):<br/>
                  <span className="pl-4 text-surface-500"># Using a distributed cache (Redis) for high read volume</span><br/>
                  <span className="pl-4">self.cache = RedisCluster(nodes=[...])</span><br/>
                  <span className="pl-4 text-error-400 border-b border-error-400">self.db = PostgreSQL() # Single node bottleneck?</span>
                </div>
                
                {/* AI Overlay pointing out mistake */}
                <div className="absolute top-32 right-8 bg-error-500/10 border border-error-500/30 text-error-200 p-3 rounded-xl text-xs max-w-[250px] backdrop-blur-md font-sans font-medium shadow-2xl">
                  <div className="flex items-center gap-2 mb-1 text-error-400 font-bold"><Activity className="w-4 h-4"/> Architecture Alert</div>
                  A single Postgres instance won&apos;t handle 10k writes/sec. Consider database sharding or a NoSQL store for the short-links.
                </div>
              </div>
            </div>

            {/* Right: AI Interviewer Video/Chat */}
            <div className="w-full lg:w-80 bg-surface-900 flex flex-col">
              {/* AI Video Feed Mockup */}
              <div className="h-48 sm:h-64 border-b border-surface-800 relative bg-surface-950 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-brand-900/20"></div>
                {/* Abstract AI Avatar */}
                <div className="w-24 h-24 rounded-full bg-brand-800/50 flex items-center justify-center border-4 border-brand-500/30 relative z-10 shadow-[0_0_50px_rgba(147,51,234,0.3)]">
                  <BrainCircuit className="w-10 h-10 text-brand-300" />
                </div>
                <div className="absolute bottom-3 left-3 bg-surface-900/80 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></div> dobit.ai Engine
                </div>
                <div className="absolute bottom-3 right-3 flex gap-2">
                  <div className="bg-surface-900/80 p-1.5 rounded-md text-surface-300"><Mic className="w-4 h-4"/></div>
                </div>
              </div>

              {/* Real-time Transcription/Chat */}
              <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
                <div className="bg-brand-900/30 border border-brand-500/20 p-3 rounded-xl rounded-tl-none text-sm text-surface-200 font-medium">
                  &quot;I see you&apos;ve initialized a standard PostgreSQL database. How are you planning to handle collision detection when generating the 7-character short links at massive scale?&quot;
                </div>
                <div className="bg-surface-800 border border-surface-700 p-3 rounded-xl rounded-tr-none text-sm text-surface-300 self-end max-w-[90%]">
                  &quot;I was thinking of using a Base62 encoding on a unique auto-incrementing ID...&quot;
                </div>
                <div className="bg-brand-900/30 border border-brand-500/20 p-3 rounded-xl rounded-tl-none text-sm text-surface-200 font-medium">
                  &quot;That works for a single machine. But how do you generate unique IDs across a distributed cluster without a single point of failure?&quot;
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. METRICS & GRADING SECTION */}
      <section className="py-24 px-4 sm:px-6 bg-white border-t border-surface-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-surface-950 tracking-tight mb-6">
              Get graded on what actually matters.
            </h2>
            <p className="text-lg text-surface-600 font-medium leading-relaxed mb-8">
              Code execution is only 30% of an SDE interview. Our local engine analyzes your voice transcripts, design choices, and problem-solving framework to give you a comprehensive FAANG-style rubric.
            </p>
            <ul className="space-y-5">
              <MetricItem title="Time & Space Complexity" desc="Did you brute-force it, or did you find the optimal O(N) solution?" />
              <MetricItem title="System Scalability" desc="Identification of bottlenecks, caching strategies, and database sharding." />
              <MetricItem title="Communication Clarity" desc="Did you think out loud? Did you clarify edge cases before coding?" />
            </ul>
          </div>

          <div className="bg-surface-50 border border-surface-200 rounded-3xl p-8 shadow-xl">
            <h3 className="font-bold text-surface-900 mb-6 text-xl">Post-Interview Analysis Card</h3>
            
            <div className="space-y-6">
              {/* Score Bar 1 */}
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-surface-800">Algorithm Design</span>
                  <span className="text-success-600">Strong Hire (92%)</span>
                </div>
                <div className="w-full bg-surface-200 rounded-full h-2.5">
                  <div className="bg-success-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              {/* Score Bar 2 */}
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-surface-800">Communication</span>
                  <span className="text-brand-600">Hire (85%)</span>
                </div>
                <div className="w-full bg-surface-200 rounded-full h-2.5">
                  <div className="bg-brand-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              {/* Score Bar 3 */}
              <div>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-surface-800">Edge Case Handling</span>
                  <span className="text-warning-600">Leaning No Hire (45%)</span>
                </div>
                <div className="w-full bg-surface-200 rounded-full h-2.5">
                  <div className="bg-warning-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-xs text-surface-500 font-medium mt-2 leading-relaxed">
                  * AI Note: Candidate failed to account for zero-byte inputs and negative integer overflows during the initial edge-case gathering phase.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA */}
      <section className="py-20 px-4 sm:px-6 bg-surface-50 border-t border-surface-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-surface-950 mb-6">Stop practicing in a vacuum.</h2>
          <p className="text-lg text-surface-600 font-medium mb-8">
            Take your first AI mock interview today. The setup takes 30 seconds, runs locally, and prepares you for the real thing.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full text-lg font-black transition-all shadow-xl shadow-brand-500/20 active:scale-95">
            Configure Your First Session <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <FooterSection/>

    </div>
  );
}

// --- HELPER COMPONENTS ---

function MetricItem({ title, desc }: { title: string, desc: string }) {
  return (
    <li className="flex gap-4">
      <div className="mt-1 w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-5 h-5 text-brand-600" />
      </div>
      <div>
        <h4 className="font-bold text-surface-900 text-lg mb-1">{title}</h4>
        <p className="text-surface-600 font-medium leading-relaxed">{desc}</p>
      </div>
    </li>
  );
}