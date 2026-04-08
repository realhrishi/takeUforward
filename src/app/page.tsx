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
  if (!mounted) return <div className="min-h-screen bg-[#f3f4f6]" />;

  return (
    <main className="min-h-[100dvh] w-full flex items-center justify-center p-4 sm:p-8 bg-[#f3f4f6] relative">
      <div className="w-full max-w-[700px] bg-white rounded-sm flex flex-col relative drop-shadow-[0_25px_35px_rgba(0,0,0,0.1)] mb-10">
        
        <SpiralBinding />
        
        <HeroPanel month={displayedMonth} year={displayedYear} />
        
        <div className="flex flex-col md:flex-row w-full p-4 md:p-8 gap-6 md:gap-8 min-h-[350px]">
          {/* Notes Section - visually matching the horizontal ruled lines */}
          <div className="w-full md:w-[35%] flex flex-col border-b border-gray-100 md:border-b-0 pb-4 md:pb-0">
            <NotesPanel 
              notes={notes}
              setNotes={setNotes}
              selectionStart={selection.start}
              selectionEnd={selection.end}
            />
          </div>
          
          {/* Calendar Grid Section */}
          <div className="w-full md:w-[65%] flex flex-col">
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
        </div>
      </div>
    </main>
  );
}
