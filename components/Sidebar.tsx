
import React, { useState } from 'react';
import { Section } from '../types';
import { ChevronRight, ChevronDown, MessageCircleQuestion, Target, Hash } from 'lucide-react';

interface SidebarProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  extraTitles: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ sections, activeSection, onSectionClick, extraTitles }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'section-1': true // Default open the first one
  });

  const toggleSection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleQuestionClick = (questionId: string) => {
    const element = document.getElementById(questionId);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen fixed top-0 left-0 bg-white border-r border-slate-200 z-20 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg shadow-sm shadow-blue-200">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-bold text-xl leading-tight text-slate-900">
            KM Master <span className="text-blue-600">Bank</span>
          </h1>
        </div>

        <nav className="space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-3 mb-2">Main Interview Sections</div>
          
          <div className="space-y-1">
            {sections.map((section) => (
              <div key={section.id} className="group">
                <div 
                  onClick={() => onSectionClick(section.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${
                    activeSection === section.id 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeSection === section.id ? 'bg-blue-600' : 'bg-slate-300'}`}></span>
                    <span className="truncate">{section.title}</span>
                  </div>
                  <button 
                    onClick={(e) => toggleSection(section.id, e)}
                    className="p-1 rounded-md hover:bg-blue-100/50 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    {expandedSections[section.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>

                {expandedSections[section.id] && (
                  <div className="ml-7 mt-1 space-y-0.5 border-l border-slate-100 pl-2 animate-in slide-in-from-left-2 duration-200">
                    {section.questions.map((q) => (
                      <button
                        key={q.id}
                        onClick={() => handleQuestionClick(q.id)}
                        className="w-full text-left px-2 py-1.5 rounded-md text-[13px] text-slate-500 hover:text-blue-600 hover:bg-blue-50/30 transition-all flex items-center gap-2"
                      >
                        <Hash className="w-3 h-3 opacity-40 flex-shrink-0" />
                        <span className="truncate">{q.id}: {q.question}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-6 pb-2 text-[10px] uppercase font-bold text-slate-400 tracking-widest px-3">Extra Resources</div>
          {extraTitles.map((title) => (
            <button
              key={title}
              onClick={() => onSectionClick(title)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                activeSection === title 
                  ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <MessageCircleQuestion className="w-4 h-4 opacity-70" />
              <span className="truncate">{title}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
