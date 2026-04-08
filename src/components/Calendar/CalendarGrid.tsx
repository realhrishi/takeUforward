import React, { useEffect, useState, useRef } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarCell } from './CalendarCell';
import { useCalendar } from '../../hooks/useCalendar';
import { useDateRange } from '../../hooks/useDateRange';
import { toISODate, isDateInNoteRange } from '../../lib/dateUtils';
import { Note } from '../../lib/types';

interface CalendarGridProps {
  initialMonth?: number;
  initialYear?: number;
  onMonthChange?: (month: number, year: number) => void;
  notes: Note[];
  selectionStart: string | null;
  selectionEnd: string | null;
  onSelectionChange: (start: string | null, end: string | null) => void;
  onHoverChange: (date: string | null) => void;
  hoverDate: string | null;
}

export function CalendarGrid({
  initialMonth = new Date().getMonth(),
  initialYear = new Date().getFullYear(),
  notes,
  selectionStart,
  selectionEnd,
  onSelectionChange,
  onHoverChange,
  onMonthChange,
  hoverDate
}: CalendarGridProps) {
  const { currentMonth, currentYear, days, nextMonth, prevMonth } = useCalendar(initialMonth, initialYear);

  useEffect(() => {
    onMonthChange?.(currentMonth, currentYear);
  }, [currentMonth, currentYear, onMonthChange]);

  const { handleDateClick } = useDateRange(selectionStart, selectionEnd, onSelectionChange);

  const [animDirection, setAnimDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollTime = useRef(0);

  const onNext = () => {
    setAnimDirection('up');
    nextMonth();
  };

  const onPrev = () => {
    setAnimDirection('down');
    prevMonth();
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 600) return; // Wait 600ms between scrolls to prevent hyper-scrolling
    
    // Some trackpads send small deltas, require a reasonable threshold
    if (e.deltaY > 15) {
      onNext();
      lastScrollTime.current = now;
    } else if (e.deltaY < -15) {
      onPrev();
      lastScrollTime.current = now;
    }
  };

  useEffect(() => {
    if (animDirection) {
      const timer = setTimeout(() => setAnimDirection(null), 400);
      return () => clearTimeout(timer);
    }
  }, [animDirection, currentMonth]);

  const monthNames = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  return (
    <div 
      className="flex flex-col w-full h-full relative pt-1 md:pt-0" 
      onWheel={handleWheel}
    >
      <CalendarHeader 
        monthName={monthNames[currentMonth]} 
        year={currentYear} 
        onNext={onNext} 
        onPrev={onPrev} 
      />
      
      <div 
        className="overflow-hidden flex-1 flex flex-col relative w-full h-full pb-2 select-none group"
        onMouseLeave={() => onHoverChange(null)}
      >
        {/* Subtle scroll hint appears on hover over the grid area */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-5 pointer-events-none transition-opacity duration-1000 flex flex-col items-center z-0">
          <span className="text-4xl text-gray-400 font-bold tracking-widest uppercase">Scroll</span>
        </div>

        {/* Day of Week Headers */}
        <div className="grid grid-cols-7 mb-4 relative z-10">
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d, i) => (
            <div key={i} className={`flex justify-center text-[10px] md:text-xs font-semibold tracking-wider ${i >= 5 ? 'text-blue-600 dark:text-blue-700' : 'text-gray-500 dark:text-[#555]'}`}>
              {d}
            </div>
          ))}
        </div>

        {/* Grid Container with Vertical Slide Animation */}
        <div className="relative flex-1 min-h-[260px] md:min-h-[300px] w-full mt-2 z-10">
          <div 
            key={`${currentYear}-${currentMonth}`}
            className="grid grid-cols-7 gap-y-2 absolute inset-0"
            style={{
              animation: animDirection === 'up' 
                ? 'slideUp 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards' 
                : animDirection === 'down' 
                  ? 'slideDown 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards' 
                  : 'fadeIn 400ms ease-out forwards'
            }}
            role="grid"
          >
            {days.map((cell, i) => {
              const dateStr = toISODate(cell.date);
              const isStart = dateStr === selectionStart;
              const isEnd = dateStr === selectionEnd;
              
              let isInRange = false;
              let isHoverPreview = false;

              if (selectionStart && selectionEnd) {
                const s = new Date(selectionStart).getTime();
                const e = new Date(selectionEnd).getTime();
                const d = cell.date.getTime();
                isInRange = d >= s && d <= e;
              }

              if (selectionStart && !selectionEnd && hoverDate) {
                const s = new Date(selectionStart).getTime();
                const h = new Date(hoverDate).getTime();
                const d = cell.date.getTime();
                const min = Math.min(s, h);
                const max = Math.max(s, h);
                isHoverPreview = d >= min && d <= max;
              }

              const hasNote = notes.some(n => isDateInNoteRange(dateStr, n.startDate, n.endDate));

              return (
                <CalendarCell
                  key={i}
                  cell={cell}
                  isStart={isStart}
                  isEnd={isEnd}
                  isInRange={isInRange}
                  isHoverPreview={isHoverPreview}
                  hasNote={hasNote}
                  onClick={(d) => {
                    handleDateClick(d);
                    onHoverChange(null);
                  }}
                  onMouseEnter={(d) => {
                    if (selectionStart && !selectionEnd) {
                      onHoverChange(d);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(20px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-20px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}
