import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Note } from '../../lib/types';
import { formatDateDisplay } from '../../lib/dateUtils';
import { IconButton } from '../UI/IconButton';
import { Badge } from '../UI/Badge';

interface NoteCardProps {
  note: Note;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const isRange = note.startDate !== note.endDate;
  const dateLabel = isRange 
    ? `${formatDateDisplay(note.startDate)} - ${formatDateDisplay(note.endDate)}`
    : formatDateDisplay(note.startDate);

  return (
    <div className="group relative flex flex-col gap-2 p-4 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-md transition-all duration-200 hover:border-[var(--border-default)] shadow-[var(--shadow-card)]">
      <div className="flex justify-between items-start">
        <Badge className="bg-[var(--note-tag)] text-[var(--text-secondary)]">{dateLabel}</Badge>
        
        {/* Actions - visible on hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex gap-1 absolute top-3 right-3">
          <IconButton onClick={() => onEdit(note.id)} aria-label="Edit note" className="w-7 h-7 bg-transparent border-transparent hover:border-[var(--border-default)]">
            <Edit2 className="w-3.5 h-3.5" />
          </IconButton>
          <IconButton onClick={() => onDelete(note.id)} aria-label="Delete note" className="w-7 h-7 bg-transparent border-transparent hover:border-[var(--border-default)] hover:text-[var(--destructive)] group/delete">
            <Trash2 className="w-3.5 h-3.5 group-hover/delete:text-[var(--destructive)]" />
          </IconButton>
        </div>
      </div>
      
      <p className="text-[var(--text-sm)] text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap line-clamp-4 mt-1">
        {note.content}
      </p>
    </div>
  );
}
