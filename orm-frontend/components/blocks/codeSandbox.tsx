import React from 'react';
import { Code, Send } from 'lucide-react';

export default function CodeSandbox({ section }: { section: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-surface-200 overflow-hidden mb-12">
      <div className="bg-surface-900 px-4 sm:px-6 py-4 flex items-center justify-between">
        <h3 className="text-white font-semibold flex items-center gap-2 text-sm sm:text-base"><Code size={20} className="text-brand-400"/> {section.heading}</h3>
        <div className="flex gap-2.5">
          <div className="w-3.5 h-3.5 rounded-full bg-error-500"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-warning-400"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-success-500"></div>
        </div>
      </div>
      <div className="p-4 sm:p-6 bg-surface-950">
        <p className="text-info-400 text-xs sm:text-sm mb-4 font-mono font-medium">{section.comment}</p>
        <textarea 
          className="w-full h-48 bg-surface-900 text-surface-100 font-mono text-[13px] sm:text-[15px] p-4 sm:p-5 rounded-xl border border-surface-700 focus:border-brand-500 outline-none resize-none leading-relaxed" 
          defaultValue={section.defaultCode} 
        />
        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-6 sm:px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95">
            <Send size={18} /> Run Code
          </button>
        </div>
      </div>
    </div>
  );
}