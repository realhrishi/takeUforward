"use client";

import React, { useState, useEffect } from 'react';
import { HeroPanel } from '../components/Hero/HeroPanel';
import { CalendarGrid } from '../components/Calendar/CalendarGrid';
import { usePersistence } from '../hooks/usePersistence';
import { SpiralBinding } from '../components/UI/SpiralBinding';
import { NotesPanel } from '../components/Notes/NotesPanel';
import { Note } from '../lib/types';

export default function Home() {
  const [notes, setNotes] = usePersistence<Note[]>('wall-calendar:notes', []);
  const [selection, setSelection] = usePersistence<{start: string | null, end: string | null}>('wall-calendar:selection', { start: null, end: null });
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  
  const [displayedMonth, setDisplayedMonth] = useState(new Date().getMonth());
  const [displayedYear, setDisplayedYear] = useState(new Date().getFullYear());

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-transparent" />;

  const isNotesOpen = !!selection.start;

  return (
    <main className="min-h-[100dvh] w-full flex items-center justify-center p-4 sm:p-8 relative">
      <div className="w-full max-w-5xl bg-white rounded-[24px] flex flex-col relative shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100/50 transition-all duration-300">
        
        {/* Full-width continuous spiral binding at the top */}
        <SpiralBinding />
        
        <div className="flex flex-col md:flex-row w-full bg-slate-50/30 relative z-10">
          
          {/* Left Side: Hero Image Section (40%) */}
          <div className="w-full md:w-[40%] flex flex-col z-10">
            <HeroPanel />
          </div>
          
          {/* Right Side: Calendar & Notes Container (60%) */}
          <div className="w-full md:w-[60%] flex flex-col p-6 lg:p-10 bg-white/95 backdrop-blur-xl relative shadow-[-15px_0_30px_rgba(0,0,0,0.03)] z-20 md:rounded-l-2xl border-l border-white">
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
              <div className="flex-1 bg-white/60 backdrop-blur-2xl rounded-2xl p-5 md:p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/[0.02]">
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
