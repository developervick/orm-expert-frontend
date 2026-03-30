import React, { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function MultipleChoice({ section }: { section: any }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selected === section.correctAnswer;

  return (
    <div className={`bg-white p-6 sm:p-8 rounded-2xl shadow-sm border mb-8 transition-colors duration-300 ${
      submitted ? (isCorrect ? 'border-success-400 bg-success-50/30' : 'border-error-400 bg-error-50/30') : 'border-surface-200'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-surface-900">{section.heading}</h3>
        {submitted && (
          <span className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 ${isCorrect ? 'bg-success-100 text-success-600' : 'bg-error-100 text-error-600'}`}>
            {isCorrect ? <CheckCircle size={14}/> : <AlertCircle size={14}/>}
            {isCorrect ? 'Correct' : 'Incorrect'}
          </span>
        )}
      </div>
      <p className="text-surface-700 mb-6 font-medium text-base sm:text-lg">{section.question}</p>
      
      <div className="flex flex-col gap-3">
        {section.options.map((option: string, i: number) => {
          const isSelected = selected === option;
          let optionClasses = "flex items-center p-3 sm:p-4 border rounded-xl cursor-pointer transition-all ";
          
          if (submitted) {
            if (option === section.correctAnswer) optionClasses += "border-success-400 bg-success-50 ";
            else if (isSelected && !isCorrect) optionClasses += "border-error-400 bg-error-50 ";
            else optionClasses += "border-surface-200 opacity-50 ";
          } else {
            optionClasses += isSelected ? "border-brand-500 bg-brand-50" : "border-surface-200 hover:bg-surface-50 hover:border-brand-300";
          }
          
          return (
            <label key={i} className={optionClasses}>
              <input type="radio" disabled={submitted} checked={isSelected} onChange={() => setSelected(option)} className="w-5 h-5 text-brand-600 border-surface-300 focus:ring-brand-500" />
              <span className={`ml-3 sm:ml-4 font-semibold text-base sm:text-lg ${submitted && option === section.correctAnswer ? 'text-success-700' : 'text-surface-800'}`}>
                <code>{option}</code>
              </span>
            </label>
          );
        })}
      </div>
      
      <div className="mt-8 flex justify-end">
        {!submitted ? (
          <button onClick={() => selected && setSubmitted(true)} disabled={!selected} className="bg-surface-900 disabled:opacity-50 text-white px-6 sm:px-8 py-3 rounded-xl font-bold transition-colors">Submit Answer</button>
        ) : (
          <button onClick={() => { setSubmitted(false); setSelected(null); }} className="bg-surface-200 text-surface-800 px-6 sm:px-8 py-3 rounded-xl font-bold transition-colors">Try Again</button>
        )}
      </div>
    </div>
  );
}