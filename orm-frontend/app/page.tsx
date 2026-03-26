"use client";

import React, { useState } from 'react';
import { 
  Home, BookOpen, User, Settings, Layout, 
  ChevronDown, ChevronRight, CheckCircle, 
  PlayCircle, Code, FileText, Send, AlertCircle, Menu, List, X
} from 'lucide-react';
import { courseSyllabus, exerciseContent } from './data'; // Import dynamic data

export default function CourseApp() {
  // Mobile Sidebar Toggles
  const [isPrimaryOpen, setIsPrimaryOpen] = useState(false);
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);

  // Accordion & Active State
  const [expandedModules, setExpandedModules] = useState<string[]>(['m2']);
  const [expandedChapters, setExpandedChapters] = useState<string[]>(['c2']);
  const [activeExerciseId, setActiveExerciseId] = useState<string>('e4');

  // Quiz State
  const [blankAnswer, setBlankAnswer] = useState('');
  const [mcqSelected, setMcqSelected] = useState<string | null>(null);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);

  // Handlers
  const toggleModule = (id: string) => setExpandedModules(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  const toggleChapter = (id: string) => setExpandedChapters(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

  const handleMcqSubmit = () => { if (mcqSelected) setMcqSubmitted(true); };

  // Fetch dynamic data for the current active exercise
  const activeData = exerciseContent[activeExerciseId as keyof typeof exerciseContent];

  return (
    <div className="flex h-screen w-full bg-surface-50 font-sans text-surface-800 overflow-hidden relative">
      
      {/* MOBILE OVERLAYS */}
      {(isPrimaryOpen || isSecondaryOpen) && (
        <div className="fixed inset-0 bg-surface-900/50 z-40 lg:hidden backdrop-blur-sm" 
             onClick={() => { setIsPrimaryOpen(false); setIsSecondaryOpen(false); }} />
      )}

      {/* 1. PRIMARY SIDEBAR (Togglable on Mobile) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-20 lg:w-64 bg-surface-900 flex flex-col items-center lg:items-start transition-transform duration-300 shadow-xl ${
        isPrimaryOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } lg:static`}>
        <div className="h-16 flex items-center justify-between lg:justify-start px-4 w-full border-b border-surface-800 text-white">
          <div className="flex items-center">
            <Layout className="w-8 h-8 text-brand-400" />
            <span className="ml-3 font-bold text-xl hidden lg:block tracking-wide">ORM Expert</span>
          </div>
          {/* Mobile Close Button */}
          <button className="lg:hidden text-surface-400 hover:text-white" onClick={() => setIsPrimaryOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 w-full py-6 flex flex-col gap-2 px-3">
          <NavItem icon={<Home />} label="Home" />
          <NavItem icon={<BookOpen />} label="My Courses" active />
          <NavItem icon={<User />} label="Profile" />
        </nav>
        <div className="w-full pb-6 px-3 border-t border-surface-800 pt-4">
          <NavItem icon={<Settings />} label="Local Setup" />
        </div>
      </aside>

      {/* RIGHT SIDE (Header + Content Area) */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        
        {/* 2. HEADER */}
        <header className="h-16 bg-white border-b border-surface-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-30 shadow-sm relative">
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger Menu */}
            <button className="lg:hidden p-2 text-surface-600 hover:bg-surface-100 rounded-lg" onClick={() => setIsPrimaryOpen(true)}>
              <Menu size={24} />
            </button>
            
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-surface-900 truncate">Mastering Database Queries</h1>
              <p className="text-xs lg:text-sm text-surface-500 font-medium hidden sm:block">Backend Architecture Path</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             {/* Mobile Course Nav Toggle */}
             <button className="md:hidden p-2 text-brand-600 hover:bg-brand-50 rounded-lg mr-2" onClick={() => setIsSecondaryOpen(true)}>
              <List size={24} />
            </button>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-surface-900">Vicky</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center border border-brand-200 text-brand-700 font-bold shrink-0">
              V
            </div>
          </div>
        </header>

        {/* BOTTOM SECTION */}
        <div className="flex flex-1 overflow-hidden relative">
          
          {/* 3. NESTED COURSE NAVIGATION (Togglable on Mobile) */}
          <aside className={`absolute md:static inset-y-0 left-0 z-40 w-72 bg-surface-100 border-r border-surface-200 overflow-y-auto transition-transform duration-300 shadow-xl md:shadow-none ${
            isSecondaryOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}>
            <div className="p-5 border-b border-surface-200 bg-surface-50 flex justify-between items-center">
              <div className="w-full">
                <h2 className="text-xs font-bold text-surface-500 uppercase tracking-widest mb-3">Course Content</h2>
                <div className="w-full bg-surface-200 rounded-full h-2">
                  <div className="bg-brand-500 h-2 rounded-full shadow-sm" style={{ width: '45%' }}></div>
                </div>
              </div>
              {/* Mobile Close Button for Secondary Sidebar */}
              <button className="md:hidden ml-4 text-surface-400 hover:text-surface-800" onClick={() => setIsSecondaryOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="p-3">
              {courseSyllabus.map(module => (
                <div key={module.id} className="mb-2">
                  <button onClick={() => toggleModule(module.id)} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-surface-200 text-left transition-colors">
                    <div className="flex items-center gap-2">
                      {expandedModules.includes(module.id) ? <ChevronDown size={18} className="text-surface-400" /> : <ChevronRight size={18} className="text-surface-400"/>}
                      <span className="font-bold text-sm text-surface-900">{module.title}</span>
                    </div>
                  </button>
                  
                  {expandedModules.includes(module.id) && (
                    <div className="ml-5 border-l-2 border-surface-200 pl-3 mt-1 flex flex-col gap-1">
                      {module.chapters.map(chapter => (
                        <div key={chapter.id}>
                          <button onClick={() => toggleChapter(chapter.id)} className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-200 text-left transition-colors">
                            <span className="font-semibold text-sm text-surface-800">{chapter.title}</span>
                            {expandedChapters.includes(chapter.id) ? <ChevronDown size={16} className="text-surface-400"/> : <ChevronRight size={16} className="text-surface-400"/>}
                          </button>

                          {expandedChapters.includes(chapter.id) && (
                            <div className="ml-2 mt-1 flex flex-col gap-1 pb-2">
                              {chapter.exercises.map(exercise => (
                                <button
                                  key={exercise.id}
                                  onClick={() => {
                                    setActiveExerciseId(exercise.id);
                                    setIsSecondaryOpen(false); // Auto-close on mobile selection
                                  }}
                                  className={`w-full flex items-start gap-3 p-2.5 rounded-lg text-left text-sm transition-all ${
                                    activeExerciseId === exercise.id 
                                      ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200 shadow-sm' 
                                      : 'text-surface-600 hover:bg-surface-200 font-medium'
                                  }`}
                                >
                                  <div className="mt-0.5 shrink-0">
                                    {exercise.completed ? <CheckCircle size={16} className="text-success-500" />
                                    : exercise.type === 'video' ? <PlayCircle size={16} className="text-info-500" />
                                    : exercise.type === 'code' ? <Code size={16} className="text-warning-500" />
                                    : <FileText size={16} className="text-surface-400" />}
                                  </div>
                                  <span className="leading-tight">{exercise.title}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* 4. MAIN CONTENT AREA (DYNAMIC RENDERING) */}
          <main className="flex-1 overflow-y-auto bg-surface-50 relative w-full">
            <div className="max-w-4xl mx-auto p-4 sm:p-8 lg:p-12">
              
              {activeData ? (
                <>
                  <div className="mb-10">
                    <div className="inline-block px-4 py-1.5 bg-warning-50 text-warning-600 text-xs font-bold rounded-full mb-4 uppercase tracking-widest border border-warning-200">
                      {activeData.badge}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4 tracking-tight">{activeData.title}</h2>
                    <p className="text-base sm:text-lg text-surface-700 leading-relaxed font-medium">
                      {activeData.description}
                    </p>
                  </div>

                  {/* DYNAMIC SECTIONS LOOP */}
                  {activeData.sections.map((section: any) => {
                    
                    if (section.type === "fill_in_blank") {
                      const isCorrect = blankAnswer.toLowerCase().trim() === section.correctAnswer.toLowerCase();
                      return (
                        <div key={section.id} className={`bg-white p-6 sm:p-8 rounded-2xl shadow-sm border mb-8 text-surface-800 leading-relaxed transition-colors duration-300 ${isCorrect ? 'border-success-400 bg-success-50/30' : 'border-surface-200'}`}>
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl sm:text-2xl font-bold text-surface-900">{section.heading}</h3>
                            {isCorrect && <span className="bg-success-100 text-success-600 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"><CheckCircle size={14}/> Correct</span>}
                          </div>
                          <div className="bg-surface-50 p-4 sm:p-5 rounded-xl border border-surface-200 flex flex-wrap items-center gap-3 text-base sm:text-lg font-medium">
                            <span>{section.textBefore}</span>
                            <input 
                              type="text" 
                              value={blankAnswer}
                              onChange={(e) => setBlankAnswer(e.target.value)}
                              placeholder="Type answer..." 
                              className={`border-b-2 bg-white px-3 py-1 outline-none font-bold w-32 sm:w-40 transition-colors shadow-sm ${
                                isCorrect ? 'border-success-500 text-success-600' : 'border-surface-300 text-brand-600 focus:border-brand-500'
                              }`}
                            />
                            <span>{section.textAfter}</span>
                          </div>
                        </div>
                      );
                    }

                    if (section.type === "mcq") {
                      const isCorrect = mcqSelected === section.correctAnswer;
                      return (
                        <div key={section.id} className={`bg-white p-6 sm:p-8 rounded-2xl shadow-sm border mb-8 transition-colors duration-300 ${
                          mcqSubmitted ? (isCorrect ? 'border-success-400 bg-success-50/30' : 'border-error-400 bg-error-50/30') : 'border-surface-200'
                        }`}>
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg sm:text-xl font-bold text-surface-900">{section.heading}</h3>
                            {mcqSubmitted && (
                              <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${isCorrect ? 'bg-success-100 text-success-600' : 'bg-error-100 text-error-600'}`}>
                                {isCorrect ? <CheckCircle size={14}/> : <AlertCircle size={14}/>}
                                {isCorrect ? 'Correct' : 'Incorrect'}
                              </span>
                            )}
                          </div>
                          <p className="text-surface-700 mb-6 font-medium text-base sm:text-lg">{section.question}</p>
                          <div className="flex flex-col gap-3">
                            {section.options.map((option: string, i: number) => {
                              const isSelected = mcqSelected === option;
                              let optionClasses = "flex items-center p-3 sm:p-4 border rounded-xl cursor-pointer transition-all ";
                              if (mcqSubmitted) {
                                if (option === section.correctAnswer) optionClasses += "border-success-400 bg-success-50 ";
                                else if (isSelected && !isCorrect) optionClasses += "border-error-400 bg-error-50 ";
                                else optionClasses += "border-surface-200 opacity-50 ";
                              } else {
                                optionClasses += isSelected ? "border-brand-500 bg-brand-50" : "border-surface-200 hover:bg-surface-50 hover:border-brand-300";
                              }
                              return (
                                <label key={i} className={optionClasses}>
                                  <input type="radio" disabled={mcqSubmitted} checked={isSelected} onChange={() => setMcqSelected(option)} className="w-5 h-5 text-brand-600 border-surface-300 focus:ring-brand-500" />
                                  <span className={`ml-3 sm:ml-4 font-semibold text-base sm:text-lg ${mcqSubmitted && option === section.correctAnswer ? 'text-success-700' : 'text-surface-800'}`}>
                                    <code>{option}</code>
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                          <div className="mt-8 flex justify-end">
                            {!mcqSubmitted ? (
                              <button onClick={handleMcqSubmit} disabled={!mcqSelected} className="bg-surface-900 disabled:opacity-50 text-white px-6 sm:px-8 py-3 rounded-xl font-bold transition-colors">Submit Answer</button>
                            ) : (
                              <button onClick={() => { setMcqSubmitted(false); setMcqSelected(null); }} className="bg-surface-200 text-surface-800 px-6 sm:px-8 py-3 rounded-xl font-bold transition-colors">Try Again</button>
                            )}
                          </div>
                        </div>
                      );
                    }

                    if (section.type === "code_sandbox") {
                      return (
                        <div key={section.id} className="bg-white rounded-2xl shadow-lg border border-surface-200 overflow-hidden mb-12">
                          <div className="bg-surface-900 px-4 sm:px-6 py-4 flex items-center justify-between">
                            <h3 className="text-white font-semibold flex items-center gap-2 text-sm sm:text-base"><Code size={20} className="text-brand-400"/> {section.heading}</h3>
                            <div className="flex gap-2.5">
                              <div className="w-3.5 h-3.5 rounded-full bg-error-500"></div><div className="w-3.5 h-3.5 rounded-full bg-warning-400"></div><div className="w-3.5 h-3.5 rounded-full bg-success-500"></div>
                            </div>
                          </div>
                          <div className="p-4 sm:p-6 bg-surface-950">
                            <p className="text-info-400 text-xs sm:text-sm mb-4 font-mono font-medium">{section.comment}</p>
                            <textarea className="w-full h-48 bg-surface-900 text-surface-100 font-mono text-[13px] sm:text-[15px] p-4 sm:p-5 rounded-xl border border-surface-700 focus:border-brand-500 outline-none resize-none leading-relaxed" defaultValue={section.defaultCode} />
                            <div className="mt-6 flex justify-end">
                              <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 sm:px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"><Send size={18} /> Run Code</button>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </>
              ) : (
                <div className="text-center py-20 text-surface-500">
                  <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Select a lesson from the sidebar to begin.</p>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center justify-center lg:justify-start gap-4 p-3.5 rounded-xl transition-all ${active ? 'bg-brand-600 text-white shadow-md' : 'text-surface-400 hover:bg-surface-800 hover:text-white'}`}>
      <div className={`${active ? 'text-white' : 'text-surface-400'}`}>{icon}</div>
      <span className="font-semibold hidden lg:block tracking-wide">{label}</span>
    </button>
  );
}