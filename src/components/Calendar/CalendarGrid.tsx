import React, { useEffect, useState } from 'react';
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

  const { 
    handleDateClick, handleDateHover 
  } = useDateRange(selectionStart, selectionEnd, onSelectionChange);

  const [animDirection, setAnimDirection] = useState<'left' | 'right' | null>(null);

  const onNext = () => {
    setAnimDirection('right');
    nextMonth();
  };

  const onPrev = () => {
    setAnimDirection('left');
    prevMonth();
  };

  useEffect(() => {
    if (animDirection) {
      const timer = setTimeout(() => setAnimDirection(null), 250);
      return () => clearTimeout(timer);
    }
  }, [animDirection, currentMonth]);

  const monthNames = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  return (
    <div className="flex flex-col w-full h-full bg-white relative pt-1 md:pt-0">
      <CalendarHeader 
        monthName={monthNames[currentMonth]} 
        year={currentYear} 
        onNext={onNext} 
        onPrev={onPrev} 
      />
      
      <div className="overflow-hidden flex-1 flex flex-col relative w-full h-full">
        {/* Day of Week Headers */}
        <div className="grid grid-cols-7 mb-2">
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d, i) => (
            <div key={i} className={`flex justify-center text-[9px] md:text-[10px] font-bold tracking-wider ${i >= 5 ? 'text-[#00A8E8]' : 'text-gray-500'}`}>
              {d}
            </div>
          ))}
        </div>

        {/* Grid Container with Slide Animation */}
        <div className="relative flex-1 min-h-[200px] w-full mt-2">
          <div 
            key={`${currentYear}-${currentMonth}`}
            className="grid grid-cols-7 gap-y-2 md:gap-y-3 justify-items-center absolute inset-0 transition-all duration-250 ease-out"
            style={{
              animation: animDirection === 'right' 
                ? 'flipRight 400ms ease-out forwards' 
                : animDirection === 'left' 
                  ? 'flipLeft 400ms ease-out forwards' 
                  : 'none'
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
                  onClick={(d) => handleDateClick(d)}
                  onMouseEnter={(d) => {
                    handleDateHover(d);
                    onHoverChange(d);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flipRight {
          0% { opacity: 0; transform: perspective(800px) rotateY(-90deg); transform-origin: left; }
          100% { opacity: 1; transform: perspective(800px) rotateY(0deg); transform-origin: left; }
        }
        @keyframes flipLeft {
          0% { opacity: 0; transform: perspective(800px) rotateY(90deg); transform-origin: right; }
          100% { opacity: 1; transform: perspective(800px) rotateY(0deg); transform-origin: right; }
        }
      `}} />
    </div>
  );
}
