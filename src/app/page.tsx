"use client";

import React, { useState, useEffect, useRef } from 'react';
import { HeroPanel } from '../components/Hero/HeroPanel';
import { CalendarGrid, CalendarGridHandle } from '../components/Calendar/CalendarGrid';
import { usePersistence } from '../hooks/usePersistence';
import { SpiralBinding } from '../components/UI/SpiralBinding';
import { NotesPanel } from '../components/Notes/NotesPanel';
import { LiveClock } from '../components/UI/LiveClock';
import { Note } from '../lib/types';
import { Sun, Moon } from 'lucide-react';

export default function Home() {
  const [notes, setNotes] = usePersistence<Note[]>('wall-calendar:notes', []);
  const [selection, setSelection] = usePersistence<{start: string | null, end: string | null}>('wall-calendar:selection', { start: null, end: null });
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  
  const [displayedMonth, setDisplayedMonth] = usePersistence<number>('wall-calendar:month', new Date().getMonth());
  const [displayedYear, setDisplayedYear] = usePersistence<number>('wall-calendar:year', new Date().getFullYear());
  const [isDarkMode, setIsDarkMode] = usePersistence<boolean>('wall-calendar:theme-dark', false);

  const calendarRef = useRef<CalendarGridHandle>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-[100dvh] w-full bg-transparent" />;

  return (
    <main className="min-h-[100dvh] w-full flex items-start md:items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-x-hidden bg-[#F5F1E8] dark:bg-[#1E1B16]">
      {/* Dark Mode Toggle */}
      <button 
        onClick={() => {
          const next = !isDarkMode;
          setIsDarkMode(next);
          if (next) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2.5 rounded-full bg-white dark:bg-[#2A2622] shadow-sm border border-gray-200 dark:border-[#3A3632] text-gray-800 dark:text-[#EFE7DA] hover:scale-105 transition-all z-50 group"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <Sun size={18} className="group-hover:rotate-90 transition-transform duration-300" /> : <Moon size={18} className="group-hover:-rotate-12 transition-transform duration-300" />}
      </button>

      {/* GitHub Repository Link */}
      <a 
        href="https://github.com/realhrishi/takeUforward" 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 flex items-center justify-center p-2.5 md:px-4 md:py-2.5 rounded-full bg-white dark:bg-[#2A2622] shadow-sm hover:shadow-md border border-gray-200 dark:border-[#3A3632] text-gray-700 dark:text-[#EFE7DA] hover:text-black dark:hover:text-white transition-all duration-300 z-[60] group hover:-translate-y-1"
        aria-label="GitHub Repository"
      >
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 md:mr-2 shrink-0 group-hover:scale-110 transition-transform duration-300">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
        <span className="hidden md:block text-[13px] font-semibold tracking-wide">Repository</span>
      </a>

      {/* Main Calendar Card Entity */}
      <div className="w-full md:max-w-[900px] min-h-[100dvh] md:min-h-0 bg-[#FFFFFF] dark:bg-[#F5F5F5] rounded-[16px] flex flex-col relative overflow-hidden transition-colors duration-500 shadow-premium dark:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] border border-transparent dark:border-black/5 pb-2 md:pb-6">
        
        {/* Full-width continuous spiral binding at the top */}
        <SpiralBinding />
        
        <div className="flex flex-col md:flex-row w-full relative z-10 transition-colors duration-500">
          
          {/* Top/Left Side: Hero Image Section */}
          <div className="w-full h-[160px] md:h-auto md:w-[35%] flex flex-col z-10 bg-white dark:bg-[#F8F8F8] relative shrink-0">
            {/* Subtle dim overlay for the physical paper in dark mode */}
            {isDarkMode && <div className="absolute inset-0 bg-black/[0.03] z-[5] pointer-events-none" />}
            <HeroPanel />
          </div>
          
          {/* Bottom/Right Side: Calendar & Notes Container */}
          <div className="w-full md:w-[65%] flex flex-col p-4 md:p-6 md:px-8 bg-white dark:bg-[#EAEAEA] relative shadow-[0_0_30px_rgba(0,0,0,0.03)] dark:shadow-[-5px_0_20px_rgba(0,0,0,0.1)] z-20 md:rounded-l-[12px] border-t md:border-t-0 md:border-l border-gray-100 dark:border-[#E0E0E0] transition-colors duration-500">
            
            {/* Utilities Header: Clock and Selection Reset */}
            <div className="flex flex-wrap justify-between items-center w-full mb-4 md:mb-3 mt-[-4px] gap-3">
               <div className="flex items-center">
                  <button 
                    onClick={() => { setSelection({start: null, end: null}); setHoverDate(null); }} 
                    disabled={!selection.start}
                    className="px-3 py-1.5 text-[11px] md:text-sm font-medium border border-gray-200 dark:border-[#CCCCCC] rounded-full text-gray-500 dark:text-[#555555] hover:bg-gray-50 dark:hover:bg-[#DDDDDD] hover:text-red-500 dark:hover:text-red-600 transition-colors shadow-sm disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Clear Selection
                  </button>
               </div>
               <div className="flex items-center gap-2 md:gap-3">
                  <button 
                    onClick={() => {
                       const d = new Date();
                       calendarRef.current?.goToMonth(d.getMonth(), d.getFullYear());
                       const todayStr = d.toISOString().split('T')[0];
                       setSelection({ start: todayStr, end: null });
                       setHoverDate(null);
                    }}
                    className="px-3 py-1.5 text-[11px] md:text-sm font-semibold border border-blue-200 dark:border-blue-300 bg-blue-50 dark:bg-blue-100 text-blue-600 dark:text-blue-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-200 transition-colors shadow-sm"
                  >
                    Today
                  </button>
                  <LiveClock />
               </div>
            </div>

            <div className="w-full transition-all duration-500 flex flex-col min-h-[250px]">
              <CalendarGrid 
                ref={calendarRef}
                initialMonth={displayedMonth}
                initialYear={displayedYear}
                notes={notes}
                selectionStart={selection.start}
                selectionEnd={selection.end}
                onSelectionChange={(s, e) => setSelection({ start: s, end: e })}
                hoverDate={hoverDate}
                onHoverChange={setHoverDate}
                onMonthChange={(m, y) => { setDisplayedMonth(m); setDisplayedYear(y); }}
              />
            </div>

            {/* Static Notes Panel (No Layout Shift) */}
            <div className="mt-4 md:mt-4 transition-all duration-500 relative flex-shrink-0">
              <div className="w-full bg-[#FAFAFA] dark:bg-[#DFDFDF] rounded-[12px] p-3 md:p-5 border border-gray-100 dark:border-[#D5D5D5] shadow-[0_8px_30px_rgb(0,0,0,0.02)] h-[140px] md:h-[180px] flex flex-col overflow-hidden">
                <NotesPanel 
                  notes={notes}
                  setNotes={setNotes}
                  selectionStart={selection.start}
                  selectionEnd={selection.end}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
