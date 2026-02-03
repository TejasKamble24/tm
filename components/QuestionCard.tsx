
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { QuestionEntry } from '../types';

interface QuestionCardProps {
  entry: QuestionEntry;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ entry }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(entry.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      id={entry.id}
      className={`border rounded-xl transition-all duration-200 mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md scroll-mt-32 ${isExpanded ? 'ring-1 ring-blue-500 border-blue-100' : 'border-slate-200'}`}
    >
      <div 
        className="p-4 md:p-5 flex items-start justify-between cursor-pointer gap-4 group"
        onClick={toggleExpand}
      >
        <div className="flex-1">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mb-2 inline-block">
            {entry.id}
          </span>
          <h3 className="text-base md:text-lg font-semibold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors">
            {entry.question}
          </h3>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <button 
            onClick={handleCopy}
            title="Copy answer"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 transition-colors flex items-center justify-center"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
          <div className="p-1 rounded-lg text-slate-400 group-hover:text-blue-600">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 md:px-5 pb-5 animate-in slide-in-from-top-2 duration-200">
          <div className="h-px bg-slate-100 mb-4"></div>
          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Suggested Answer:</p>
            <div className="text-slate-700 leading-relaxed whitespace-pre-wrap border-l-4 border-blue-100 pl-4 py-1 italic">
              {entry.answer}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
