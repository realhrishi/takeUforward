"use client";

import React, { useState, useEffect } from 'react';
import { HeroPanel } from '../components/Hero/HeroPanel';
import { CalendarGrid } from '../components/Calendar/CalendarGrid';
import { usePersistence } from '../hooks/usePersistence';
import { SpiralBinding } from '../components/UI/SpiralBinding';
import { NotesPanel } from '../components/Notes/NotesPanel';
import { Note } from '../lib/types';
import { Sun, Moon } from 'lucide-react';

export default function Home() {
  const [notes, setNotes] = usePersistence<Note[]>('wall-calendar:notes', []);
  const [selection, setSelection] = usePersistence<{start: string | null, end: string | null}>('wall-calendar:selection', { start: null, end: null });
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  
  const [displayedMonth, setDisplayedMonth] = useState(new Date().getMonth());
  const [displayedYear, setDisplayedYear] = useState(new Date().getFullYear());
  const [isDarkMode, setIsDarkMode] = usePersistence<boolean>('wall-calendar:theme-dark', false);

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

  const isNotesOpen = !!selection.start;

  return (
    <main className="min-h-[100dvh] w-full flex items-center justify-center p-4 sm:p-8 relative">
      {/* Dark Mode Toggle */}
      <button 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-4 sm:top-8 right-4 sm:right-8 p-3 rounded-full bg-white dark:bg-[#2A2A2A] shadow-sm border border-gray-200 dark:border-[#3A3A3A] text-gray-800 dark:text-[#EAEAEA] hover:scale-105 transition-all z-50 group"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <Sun size={20} className="group-hover:rotate-90 transition-transform duration-300" /> : <Moon size={20} className="group-hover:-rotate-12 transition-transform duration-300" />}
      </button>

      {/* Main Calendar Card Entity */}
      <div className="w-full max-w-5xl bg-white dark:bg-[#1C1C1C] rounded-[16px] flex flex-col relative overflow-hidden border border-gray-100/50 dark:border-[#2A2A2A] transition-colors duration-500 shadow-premium">
        
        {/* Full-width continuous spiral binding at the top */}
        <SpiralBinding />
        
        <div className="flex flex-col md:flex-row w-full relative z-10 transition-colors duration-500">
          
          {/* Left Side: Hero Image Section (40%) */}
          <div className="w-full md:w-[40%] flex flex-col z-10 bg-[#FAFAFA] dark:bg-[#1a1a1a]">
            <HeroPanel />
          </div>
          
          {/* Right Side: Calendar & Notes Container (60%) */}
          <div className="w-full md:w-[60%] flex flex-col p-6 lg:p-10 bg-white dark:bg-[#222222] relative shadow-[-5px_0_30px_rgba(0,0,0,0.02)] dark:shadow-[-5px_0_20px_rgba(0,0,0,0.2)] z-20 md:rounded-l-[12px] border-l border-white dark:border-[#2c2c2c] transition-colors duration-500">
            <div className="w-full transition-all duration-500">
              <CalendarGrid 
                notes={notes}
                selectionStart={selection.start}
                selectionEnd={selection.end}
                onSelectionChange={(s, e) => setSelection({ start: s, end: e })}
                hoverDate={hoverDate}
                onHoverChange={setHoverDate}
                onMonthChange={(m, y) => { setDisplayedMonth(m); setDisplayedYear(y); }}
              />
            </div>

            {/* Slide-in Notes Panel */}
            <div 
              className={`overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isNotesOpen ? 'max-h-[400px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0 pt-0'
              }`}
            >
              <div className="flex-1 bg-[#FAFAFA] dark:bg-[#1a1a1a] rounded-[12px] p-5 md:p-6 border border-gray-100 dark:border-[#2c2c2c] shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
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
