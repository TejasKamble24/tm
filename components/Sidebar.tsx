
import React from 'react';
import { Section } from '../types';
import { LayoutGrid, CheckCircle2, MessageCircleQuestion, Target } from 'lucide-react';

interface SidebarProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (id: string) => void;
  extraTitles: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ sections, activeSection, onSectionClick, extraTitles }) => {
  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen fixed top-0 left-0 bg-white border-r border-slate-200 z-20 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-bold text-xl leading-tight text-slate-900">
            KM Master <span className="text-blue-600">Bank</span>
          </h1>
        </div>

        <nav className="space-y-1">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-3 mb-2">Main Interview Sections</div>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                activeSection === section.id 
                  ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeSection === section.id ? 'bg-blue-600' : 'bg-slate-300'}`}></span>
              <span className="truncate">{section.title}</span>
            </button>
          ))}

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
      
      <div className="mt-auto p-6 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs text-slate-500 text-center">
            Designed for TM Interview Preparation
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
