import React, { useState, useEffect } from 'react';
import { usePersistence } from '../../hooks/usePersistence';
import { Note } from '../../lib/types';
import { v4 as uuidv4 } from 'uuid';
import { formatDateDisplay } from '../../lib/dateUtils';

interface NotesPanelProps {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  selectionStart: string | null;
  selectionEnd: string | null;
}

export function NotesPanel({ notes, setNotes, selectionStart, selectionEnd }: NotesPanelProps) {
  // Find note that intersects selection
  const currentNote = notes.find(n => n.startDate === selectionStart) || null;
  const [localContent, setLocalContent] = useState('');

  // Sync to local component state when selection changes
  useEffect(() => {
    if (currentNote) {
      setLocalContent(currentNote.content);
    } else {
      setLocalContent('');
    }
  }, [selectionStart, currentNote]);

  const handleSave = (val: string) => {
    setLocalContent(val);
    
    // Auto-save logic
    if (!selectionStart) return;

    if (currentNote) {
      if (val.trim() === '') {
        setNotes(notes.filter(n => n.id !== currentNote.id));
      } else {
        setNotes(notes.map(n => n.id === currentNote.id ? { ...n, content: val } : n));
      }
    } else if (val.trim() !== '') {
      const newNote: Note = {
        id: uuidv4(),
        content: val,
        startDate: selectionStart,
        endDate: selectionEnd || selectionStart,
        createdAt: Date.now()
      };
      setNotes([...notes, newNote]);
    }
  };

  const label = selectionStart 
    ? selectionEnd && selectionStart !== selectionEnd 
      ? `${formatDateDisplay(selectionStart)} - ${formatDateDisplay(selectionEnd)}`
      : formatDateDisplay(selectionStart) 
    : "Select a date";

  return (
    <div className="w-full flex-1 flex flex-col pt-1">
      <div className="flex flex-col mb-4 pl-1 border-l-2 border-blue-500">
        <span className="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 tracking-widest pl-2">
          NOTES
        </span>
        <span className="text-sm md:text-base font-medium text-gray-800 dark:text-[#333333] pl-2 mt-0.5">
          {label}
        </span>
      </div>
      
      <textarea 
        disabled={!selectionStart}
        value={localContent}
        onChange={(e) => handleSave(e.target.value)}
        placeholder={selectionStart ? "Write your notes here..." : "Select a date or range to add notes."}
        className="flex-1 w-full min-h-[160px] bg-transparent resize-none outline-none text-sm md:text-base text-gray-700 dark:text-[#333333] disabled:opacity-40 transition-opacity duration-300 custom-scrollbar notes-lines"
        style={{
          backgroundSize: "100% 32px",
          lineHeight: "32px",
          paddingTop: "6px" 
        }}
      />
    </div>
  );
}
