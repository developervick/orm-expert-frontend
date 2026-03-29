import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function FillInBlank({ section }: { section: any }) {
  const [answer, setAnswer] = useState('');
  const isCorrect = answer.toLowerCase().trim() === section.correctAnswer.toLowerCase();

  return (
    <div className={`bg-white p-6 sm:p-8 rounded-2xl shadow-sm border mb-8 text-surface-800 leading-relaxed transition-colors duration-300 ${isCorrect ? 'border-success-400 bg-success-50/30' : 'border-surface-200'}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl sm:text-2xl font-bold text-surface-900">{section.heading}</h3>
        {isCorrect && <span className="bg-success-100 text-success-600 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"><CheckCircle size={14}/> Correct</span>}
      </div>
      <div className="bg-surface-50 p-4 sm:p-5 rounded-xl border border-surface-200 flex flex-wrap items-center gap-3 text-base sm:text-lg font-medium">
        <span>{section.textBefore}</span>
        <input 
          type="text" 
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
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