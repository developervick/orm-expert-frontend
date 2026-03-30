"use client";

import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { courseSyllabus, exerciseContent } from '../data';

// Layout Imports
import TopHeader from '@/components/layout/topHeader';
import PrimarySidebar from '@/components/layout/primarySidebar';
import CourseSidebar from '@/components/layout/courseSidebar';

// Content Block Imports
import FillInBlank from '@/components/blocks/fillInBlanks';
import MultipleChoice from '@/components/blocks/multipleChoice';
import CodeSandbox from '@/components/blocks/codeSandbox';

export default function CourseApp() {
  // Mobile Toggles
  const [isPrimaryOpen, setIsPrimaryOpen] = useState(false);
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);

  // Active Exercise State
  const [activeExerciseId, setActiveExerciseId] = useState<string>('e4');
  const activeData = exerciseContent[activeExerciseId as keyof typeof exerciseContent];

  return (
    <div className="flex h-screen w-full bg-surface-50 font-sans text-surface-800 overflow-hidden relative">
      
      {/* Mobile Overlays */}
      {(isPrimaryOpen || isSecondaryOpen) && (
        <div className="fixed inset-0 bg-surface-900/50 z-40 lg:hidden backdrop-blur-sm" 
             onClick={() => { setIsPrimaryOpen(false); setIsSecondaryOpen(false); }} />
      )}

      {/* Sidebars */}
      <PrimarySidebar isOpen={isPrimaryOpen} onClose={() => setIsPrimaryOpen(false)} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        <TopHeader 
          onOpenPrimary={() => setIsPrimaryOpen(true)} 
          onOpenSecondary={() => setIsSecondaryOpen(true)} 
        />

        <div className="flex flex-1 overflow-hidden relative">
          <CourseSidebar 
            isOpen={isSecondaryOpen} 
            onClose={() => setIsSecondaryOpen(false)}
            syllabus={courseSyllabus}
            activeExerciseId={activeExerciseId}
            setActiveExerciseId={setActiveExerciseId}
          />

          {/* MAIN CONTENT AREA */}
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

                  {/* Dynamic Component Rendering */}
                  {activeData.sections.map((section: any) => {
                    if (section.type === "fill_in_blank") return <FillInBlank key={section.id} section={section} />;
                    if (section.type === "mcq") return <MultipleChoice key={section.id} section={section} />;
                    if (section.type === "code_sandbox") return <CodeSandbox key={section.id} section={section} />;
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