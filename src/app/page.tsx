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
  
  const [displayedMonth, setDisplayedMonth] = useState(new Date().getMonth());
  const [displayedYear, setDisplayedYear] = useState(new Date().getFullYear());
  const [isDarkMode, setIsDarkMode] = usePersistence<boolean>('wall-calendar:theme-dark', false);

  const calendarRef = useRef<CalendarGridHandle>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Sync dark mode purely on mount and state change
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (!mounted) return <div className="min-h-screen bg-transparent" />;

  return (
    <main className="h-[100dvh] w-full flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
      {/* Dark Mode Toggle */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2.5 rounded-full bg-white dark:bg-[#2A2622] shadow-sm border border-gray-200 dark:border-[#3A3632] text-gray-800 dark:text-[#EFE7DA] hover:scale-105 transition-all z-50 group"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <Sun size={18} className="group-hover:rotate-90 transition-transform duration-300" /> : <Moon size={18} className="group-hover:-rotate-12 transition-transform duration-300" />}
      </button>

      {/* Main Calendar Card Entity */}
      <div className="w-full max-w-[900px] max-h-[96vh] bg-white dark:bg-[#F5F5F5] rounded-[16px] flex flex-col relative overflow-hidden transition-colors duration-500 shadow-premium dark:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.4)] border border-transparent dark:border-black/5">
        
        {/* Full-width continuous spiral binding at the top */}
        <SpiralBinding />
        
        <div className="flex flex-col md:flex-row w-full flex-1 relative z-10 transition-colors duration-500 h-full max-h-full">
          
          {/* Left Side: Hero Image Section (35%) */}
          <div className="w-full md:w-[35%] flex flex-col z-10 bg-white dark:bg-[#F8F8F8] relative">
            {/* Subtle dim overlay for the physical paper in dark mode */}
            {isDarkMode && <div className="absolute inset-0 bg-black/[0.03] z-[5] pointer-events-none" />}
            <HeroPanel />
          </div>
          
          {/* Right Side: Calendar & Notes Container (65%) */}
          <div className="w-full md:w-[65%] flex flex-col p-4 lg:p-6 lg:px-8 bg-white dark:bg-[#EAEAEA] relative shadow-[0_0_30px_rgba(0,0,0,0.03)] dark:shadow-[-5px_0_20px_rgba(0,0,0,0.1)] z-20 md:rounded-l-[12px] border-l border-gray-50 dark:border-[#E0E0E0] transition-colors duration-500">
            
            {/* Utilities Header: Clock and Selection Reset */}
            <div className="flex justify-between items-center w-full mb-3 mt-[-4px]">
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

            <div className="w-full transition-all duration-500 flex-1 flex flex-col min-h-[250px]">
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
            <div className="mt-3 md:mt-4 transition-all duration-500 relative flex-shrink-0">
              <div className="w-full bg-[#FAFAFA] dark:bg-[#DFDFDF] rounded-[12px] p-4 md:p-5 border border-gray-100 dark:border-[#D5D5D5] shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[160px] md:min-h-[180px]">
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
