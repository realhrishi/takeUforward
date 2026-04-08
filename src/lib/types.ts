export interface Note {
  id: string;          // uuid
  content: string;
  startDate: string;   // ISO date string "YYYY-MM-DD"
  endDate: string;     // ISO date string "YYYY-MM-DD"
  createdAt: number;   // timestamp
}

export interface DayCell {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
}

export interface CalendarState {
  currentMonth: number;         // 0–11
  currentYear: number;
  selectionStart: string | null; // ISO date
  selectionEnd: string | null;   // ISO date
  hoverDate: string | null;      // for live range preview
  notes: Note[];
  editingNoteId: string | null;
  isAddingNote: boolean;
}
