
import React, { useState, useMemo, useEffect } from 'react';
import { MASTER_DATA } from './constants';
import Sidebar from './components/Sidebar';
import QuestionCard from './components/QuestionCard';
import SearchBar from './components/SearchBar';
import { Menu, X, BookOpen, Quote, Info } from 'lucide-react';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('section-1');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(288); // Default 288px (w-72)

  // Filter logic
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return MASTER_DATA.sections;

    const query = searchQuery.toLowerCase();
    return MASTER_DATA.sections.map(section => ({
      ...section,
      questions: section.questions.filter(q => 
        q.question.toLowerCase().includes(query) || 
        q.answer.toLowerCase().includes(query) ||
        section.title.toLowerCase().includes(query)
      )
    })).filter(section => section.questions.length > 0);
  }, [searchQuery]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  // Intersection observer for active section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    MASTER_DATA.sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    MASTER_DATA.extraSections.forEach(s => {
      const el = document.getElementById(s.title);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <Sidebar 
        sections={MASTER_DATA.sections} 
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        extraTitles={MASTER_DATA.extraSections.map(s => s.title)}
        width={sidebarWidth}
        onWidthChange={setSidebarWidth}
      />

      {/* Main Content Area */}
      <main 
        className="flex-1 min-h-screen relative flex flex-col transition-[margin] duration-0"
        style={{ marginLeft: window.innerWidth >= 1024 ? `${sidebarWidth}px` : '0px' }}
      >
        {/* Header / Search bar Container */}
        <header className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-md px-4 py-4 md:px-8 md:py-6 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4 lg:hidden">
            <h1 className="font-bold text-lg text-slate-900">TM <span className="text-blue-600 text-sm">KM Master</span></h1>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-white rounded-lg border border-slate-200 shadow-sm"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </header>

        {/* Content Container */}
        <div className="px-4 pb-20 md:px-8 max-w-4xl mx-auto w-full flex-1">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mb-4">
              {MASTER_DATA.masterTitle}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto lg:mx-0">
              Hardcoded precisely according to instructions. Use this master guide to ace the KM interview at TM.
            </p>
          </div>

          {searchQuery && filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No results found for "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')} 
                className="mt-4 text-blue-600 font-semibold hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <>
              {filteredData.map((section) => (
                <section 
                  key={section.id} 
                  id={section.id} 
                  className="mb-16 scroll-mt-32"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-blue-600 w-1.5 h-8 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                  </div>
                  <div className="space-y-4">
                    {section.questions.map((q) => (
                      <QuestionCard key={q.id} entry={q} />
                    ))}
                  </div>
                </section>
              ))}

              {!searchQuery && MASTER_DATA.extraSections.map((extra) => (
                <section 
                  key={extra.title} 
                  id={extra.title} 
                  className="mb-16 scroll-mt-32 pt-10 border-t border-slate-200"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-emerald-500 w-1.5 h-8 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-slate-900">{extra.title}</h2>
                  </div>
                  
                  {extra.items && (
                    <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                      <ul className="space-y-4">
                        {extra.items.map((item, idx) => (
                          <li key={idx} className="flex gap-4 items-start">
                            <span className="bg-emerald-200 text-emerald-700 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                              {idx + 1}
                            </span>
                            <p className="text-slate-700 italic font-medium">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {extra.content && (
                    <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
                      <Quote className="absolute top-4 right-4 w-20 h-20 text-blue-500 opacity-20" />
                      <div className="relative z-10">
                        <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-2">Final Closing Impression</p>
                        <p className="text-xl md:text-2xl font-medium leading-relaxed italic">
                          {extra.content}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-auto py-10 px-8 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
            <Info className="w-4 h-4" /> 
            TM KM Interview Master Question Bank. Strictly confidential preparation material.
          </p>
        </footer>

        {/* Floating Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            <div className="relative bg-white w-4/5 max-w-xs h-full shadow-2xl overflow-y-auto p-6 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-bold text-xl">Menu</h2>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-2">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest px-3 mb-2">Main Sections</div>
                {MASTER_DATA.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeSection === section.id 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-slate-600'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
                <div className="pt-6 pb-2 text-[10px] uppercase font-bold text-slate-400 tracking-widest px-3">Extra Resources</div>
                {MASTER_DATA.extraSections.map((s) => (
                  <button
                    key={s.title}
                    onClick={() => scrollToSection(s.title)}
                    className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                      activeSection === s.title 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-slate-600'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
