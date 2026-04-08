import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarCell } from './CalendarCell';
import { useCalendar } from '../../hooks/useCalendar';
import { useDateRange } from '../../hooks/useDateRange';
import { toISODate, isDateInNoteRange } from '../../lib/dateUtils';
import { Note } from '../../lib/types';

export interface CalendarGridProps {
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

export interface CalendarGridHandle {
  goToMonth: (month: number, year: number) => void;
}

export const CalendarGrid = forwardRef<CalendarGridHandle, CalendarGridProps>(({
  initialMonth = new Date().getMonth(),
  initialYear = new Date().getFullYear(),
  notes,
  selectionStart,
  selectionEnd,
  onSelectionChange,
  onHoverChange,
  onMonthChange,
  hoverDate
}, ref) => {
  const { currentMonth, currentYear, days, nextMonth, prevMonth, goToMonth } = useCalendar(initialMonth, initialYear);

  useImperativeHandle(ref, () => ({
    goToMonth
  }));

  useEffect(() => {
    onMonthChange?.(currentMonth, currentYear);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, currentYear]);

  const { handleDateClick } = useDateRange(selectionStart, selectionEnd, onSelectionChange);

  const [animDirection, setAnimDirection] = useState<string | null>(null);
  const flipTimer = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTime = useRef(0);

  const onNext = () => {
    if (flipTimer.current) return;
    setAnimDirection('flipOutUp');
    flipTimer.current = setTimeout(() => {
      nextMonth();
      setAnimDirection('flipInUp');
      flipTimer.current = null;
    }, 150);
  };

  const onPrev = () => {
    if (flipTimer.current) return;
    setAnimDirection('flipOutDown');
    flipTimer.current = setTimeout(() => {
      prevMonth();
      setAnimDirection('flipInDown');
      flipTimer.current = null;
    }, 150);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 600 || flipTimer.current) return; 
    
    if (e.deltaY > 15) {
      onNext();
      lastScrollTime.current = now;
    } else if (e.deltaY < -15) {
      onPrev();
      lastScrollTime.current = now;
    }
  };

  useEffect(() => {
    if (animDirection && animDirection.startsWith('flipIn')) {
      const timer = setTimeout(() => setAnimDirection(null), 200);
      return () => clearTimeout(timer);
    }
  }, [animDirection]);

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
        monthIndex={currentMonth}
        year={currentYear} 
        onNext={onNext} 
        onPrev={onPrev} 
        onMonthSelect={(m) => goToMonth(m, currentYear)}
        onYearSelect={(y) => goToMonth(currentMonth, y)}
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
        <div className="grid grid-cols-7 mb-2 md:mb-4 relative z-10">
          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d, i) => (
            <div key={i} className={`flex justify-center text-[10px] md:text-xs font-semibold tracking-wider ${i >= 5 ? 'text-blue-600 dark:text-blue-700' : 'text-gray-500 dark:text-[#555]'}`}>
              {d}
            </div>
          ))}
        </div>

        {/* Grid Container with Vertical Slide Animation */}
        <div className="relative flex-1 min-h-[250px] md:min-h-[300px] w-full mt-1 md:mt-2 z-10">
          <div 
            key={`${currentYear}-${currentMonth}`}
            className="grid grid-cols-7 gap-y-1 md:gap-y-2 absolute inset-0"
            style={{
              animation: animDirection === 'flipOutUp' 
                ? 'flipOutUp 150ms cubic-bezier(0.4, 0, 1, 1) forwards' 
                : animDirection === 'flipInUp'
                  ? 'flipInUp 200ms cubic-bezier(0, 0, 0.2, 1) forwards'
                  : animDirection === 'flipOutDown'
                    ? 'flipOutDown 150ms cubic-bezier(0.4, 0, 1, 1) forwards'
                    : animDirection === 'flipInDown'
                      ? 'flipInDown 200ms cubic-bezier(0, 0, 0.2, 1) forwards'
                      : 'fadeIn 300ms ease-out forwards'
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
        @keyframes flipOutUp {
          0% { opacity: 1; transform: perspective(1000px) rotateX(0deg) scale(1); transform-origin: top; filter: brightness(1); }
          100% { opacity: 0; transform: perspective(1000px) rotateX(20deg) scale(0.95); transform-origin: top; filter: brightness(0.85); }
        }
        @keyframes flipInUp {
          0% { opacity: 0; transform: perspective(1000px) rotateX(-20deg) scale(0.95); transform-origin: top; filter: brightness(0.85); }
          100% { opacity: 1; transform: perspective(1000px) rotateX(0deg) scale(1); transform-origin: top; filter: brightness(1); }
        }
        @keyframes flipOutDown {
          0% { opacity: 1; transform: perspective(1000px) rotateX(0deg) scale(1); transform-origin: top; filter: brightness(1); }
          100% { opacity: 0; transform: perspective(1000px) rotateX(-20deg) scale(0.95); transform-origin: top; filter: brightness(0.85); }
        }
        @keyframes flipInDown {
          0% { opacity: 0; transform: perspective(1000px) rotateX(20deg) scale(0.95); transform-origin: top; filter: brightness(0.85); }
          100% { opacity: 1; transform: perspective(1000px) rotateX(0deg) scale(1); transform-origin: top; filter: brightness(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
});

CalendarGrid.displayName = 'CalendarGrid';
