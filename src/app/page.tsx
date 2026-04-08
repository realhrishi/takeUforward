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

  return (
    <main className="min-h-[100dvh] w-full flex items-center justify-center p-4 sm:p-8 relative">
      <div className="w-full max-w-5xl bg-white rounded-[20px] flex flex-col relative shadow-premium overflow-hidden border border-gray-100 transition-all duration-300">
        
        {/* Full-width continuous spiral binding at the top */}
        <SpiralBinding />
        
        <div className="flex flex-col md:flex-row w-full bg-white relative z-10">
          
          {/* Left Side: Hero Image Section */}
          <div className="w-full md:w-[42%] flex flex-col border-b md:border-b-0 md:border-r border-gray-100">
            <HeroPanel month={displayedMonth} year={displayedYear} />
          </div>
          
          {/* Right Side: Calendar & Notes Container */}
          <div className="w-full md:w-[58%] flex flex-col p-6 lg:p-10 bg-white relative">
            <div className="w-full">
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

            <div className="mt-8 border-t border-gray-100 pt-6 flex-1 min-h-[220px]">
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
    </main>
  );
}
