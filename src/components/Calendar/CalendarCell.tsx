import React from 'react';
import clsx from 'clsx';
import { format } from 'date-fns';
import { DayCell } from '../../lib/types';

interface CalendarCellProps {
  cell: DayCell;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isHoverPreview: boolean;
  hasNote: boolean;
  onClick: (dateStr: string) => void;
  onMouseEnter: (dateStr: string) => void;
}

export function CalendarCell({
  cell, isStart, isEnd, isInRange, isHoverPreview, hasNote, onClick, onMouseEnter
}: CalendarCellProps) {
  const { date, isCurrentMonth, isPast } = cell;
  const dateStr = format(date, 'yyyy-MM-dd');
  
  if (!isCurrentMonth) {
    return (
      <div className="relative w-full h-10 md:h-12 flex items-center justify-center">
        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-[13px] md:text-[14px] text-gray-200 dark:text-[#555555] font-medium select-none pointer-events-none">
          {format(date, 'd')}
        </div>
      </div>
    );
  }

  const isToday = format(new Date(), 'yyyy-MM-dd') === dateStr;

  const innerStateClasses = clsx({
    'text-gray-300 dark:text-[#555555] cursor-not-allowed': isPast,
    'text-gray-700 dark:text-[#EAEAEA] hover:bg-gray-100 dark:hover:bg-[#333333] hover:scale-[1.05] hover:shadow-sm hover:z-20': !isPast && !isStart && !isEnd && !isInRange && !isHoverPreview,
    'bg-blue-500 text-white shadow-md z-20': isStart || isEnd,
    'text-blue-700 dark:text-blue-300': (isInRange || isHoverPreview) && !isStart && !isEnd,
    'ring-2 ring-gray-200 dark:ring-[#444444] ring-offset-1 dark:ring-offset-[#222222]': isToday && !isStart && !isEnd && !isInRange && !isHoverPreview,
  });

  return (
    <div 
      className="relative w-full h-10 md:h-12 flex items-center justify-center group cursor-pointer"
      onClick={() => !isPast && onClick(dateStr)}
      onMouseEnter={() => !isPast && onMouseEnter(dateStr)}
      title={isPast ? "Past dates cannot be selected" : ""}
      role="gridcell"
      aria-selected={isStart || isEnd || isInRange}
      aria-disabled={isPast}
    >
      {/* Background connector for range when start or end is selected */}
      {(isInRange || isStart || isEnd || isHoverPreview) && (
        <div className={clsx(
          "absolute top-1/2 -translate-y-1/2 h-8 md:h-9 -z-10 transition-all duration-300",
          (isHoverPreview && !isInRange) ? "bg-blue-50/50 dark:bg-blue-900/40" : "bg-blue-50/80 dark:bg-blue-900/70",
          {
            'left-1/2 right-0 rounded-l-full': isStart && !isEnd && (isInRange || isHoverPreview),
            'left-0 right-1/2 rounded-r-full': isEnd && !isStart,
            'left-0 right-0': (isInRange || isHoverPreview) && !isStart && !isEnd,
            'inset-0 bg-transparent': isStart && isEnd
          }
        )} />
      )}
      
      {/* Circle Container for hover/active/today states */}
      <div className={clsx("flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full transition-all duration-200 ease-out font-bold", innerStateClasses)}>
        <span>{format(date, 'd')}</span>
        
        {hasNote && (
          <div className={clsx(
            "absolute bottom-0 w-1.5 h-1.5 rounded-full z-20 shadow-sm",
            (isStart || isEnd) ? "bg-white" : "bg-blue-500 shadow-blue-500/50"
          )} />
        )}
      </div>
    </div>
  );
}
