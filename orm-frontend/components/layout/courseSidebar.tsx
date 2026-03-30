import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle, PlayCircle, Code, FileText, X } from 'lucide-react';

// --- TYPES ---
type ExerciseType = 'video' | 'reading' | 'code';
export interface Exercise { id: string; title: string; completed: boolean; type: ExerciseType; }
export interface Chapter { id: string; title: string; exercises: Exercise[]; }
export interface Module { id: string; title: string; progress: number; chapters: Chapter[]; }

interface CourseSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  syllabus: Module[];
  activeExerciseId: string;
  setActiveExerciseId: (id: string) => void;
}

export default function CourseSidebar({ 
  isOpen, 
  onClose, 
  syllabus, 
  activeExerciseId, 
  setActiveExerciseId 
}: CourseSidebarProps) {
  
  // Local Accordion State
  const [expandedModules, setExpandedModules] = useState<string[]>(['m2']);
  const [expandedChapters, setExpandedChapters] = useState<string[]>(['c2']);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const toggleChapter = (id: string) => {
    setExpandedChapters(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  return (
    <aside className={`absolute md:static inset-y-0 left-0 z-40 w-72 flex flex-col bg-surface-100 border-r border-surface-200 transition-transform duration-300 shadow-xl md:shadow-none ${
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    }`}>
      
      {/* Sidebar Header & Progress */}
      <div className="p-5 border-b border-surface-200 bg-surface-50 flex justify-between items-center shrink-0">
        <div className="w-full">
          <h2 className="text-xs font-bold text-surface-500 uppercase tracking-widest mb-3">Course Content</h2>
          <div className="w-full bg-surface-200 rounded-full h-2">
            <div className="bg-brand-500 h-2 rounded-full shadow-sm" style={{ width: '45%' }}></div>
          </div>
        </div>
        {/* Mobile Close Button */}
        <button 
          className="md:hidden ml-4 text-surface-400 hover:text-surface-800 transition-colors" 
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      {/* Scrollable Syllabus List */}
      <div className="flex-1 overflow-y-auto p-3">
        {syllabus.map(module => (
          <div key={module.id} className="mb-2">
            
            {/* Module Button */}
            <button 
              onClick={() => toggleModule(module.id)} 
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-surface-200 text-left transition-colors"
            >
              <div className="flex items-center gap-2">
                {expandedModules.includes(module.id) ? <ChevronDown size={18} className="text-surface-400" /> : <ChevronRight size={18} className="text-surface-400"/>}
                <span className="font-bold text-sm text-surface-900">{module.title}</span>
              </div>
            </button>
            
            {/* Chapters Accordion */}
            {expandedModules.includes(module.id) && (
              <div className="ml-5 border-l-2 border-surface-200 pl-3 mt-1 flex flex-col gap-1">
                {module.chapters.map(chapter => (
                  <div key={chapter.id}>
                    
                    {/* Chapter Button */}
                    <button 
                      onClick={() => toggleChapter(chapter.id)} 
                      className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-200 text-left transition-colors"
                    >
                      <span className="font-semibold text-sm text-surface-800">{chapter.title}</span>
                      {expandedChapters.includes(chapter.id) ? <ChevronDown size={16} className="text-surface-400"/> : <ChevronRight size={16} className="text-surface-400"/>}
                    </button>

                    {/* Exercises Accordion */}
                    {expandedChapters.includes(chapter.id) && (
                      <div className="ml-2 mt-1 flex flex-col gap-1 pb-2">
                        {chapter.exercises.map(exercise => (
                          <button
                            key={exercise.id}
                            onClick={() => {
                              setActiveExerciseId(exercise.id);
                              onClose(); // Automatically close the sidebar on mobile when a lesson is clicked
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
  );
}