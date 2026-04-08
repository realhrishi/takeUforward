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

  const label = selectionStart ? formatDateDisplay(selectionStart) : "Select a date";

  return (
    <div className="w-full flex-1 flex flex-col pt-1">
      <div className="text-[10px] md:text-xs font-bold text-gray-500 tracking-widest pl-1 mb-2">
        NOTES <span className="text-gray-400 font-normal ml-1 normal-case tracking-normal">({label})</span>
      </div>
      
      <textarea 
        disabled={!selectionStart}
        value={localContent}
        onChange={(e) => handleSave(e.target.value)}
        placeholder={selectionStart ? "Type here..." : ""}
        className="flex-1 w-full min-h-[160px] bg-transparent resize-none outline-none text-sm text-gray-800 disabled:opacity-50"
        style={{
          backgroundImage: "linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)",
          backgroundSize: "100% 32px",
          lineHeight: "32px",
          paddingTop: "6px" 
        }}
      />
    </div>
  );
}
