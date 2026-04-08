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
      <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-[13px] md:text-[14px] text-gray-200 pointer-events-none select-none font-medium">
        {format(date, 'd')}
      </div>
    );
  }

  const isToday = format(new Date(), 'yyyy-MM-dd') === dateStr;

  const baseClasses = "relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-[13px] md:text-[14px] transition-all duration-200 select-none cursor-pointer font-bold z-10";
  
  const stateClasses = clsx({
    'text-gray-300 cursor-not-allowed': isPast,
    'text-gray-700 hover:bg-gray-100/80 hover:scale-[1.05] hover:shadow-sm rounded-full': !isPast && !isStart && !isEnd && !isInRange && !isHoverPreview,
    'bg-blue-500 text-white shadow-md': isStart || isEnd,
    'rounded-l-full': isStart && !isEnd,
    'rounded-r-full': isEnd && !isStart,
    'rounded-full': (isStart && isEnd) || (!isStart && !isEnd && !isInRange && !isHoverPreview),
    'bg-blue-50 text-blue-700': (isInRange || isHoverPreview) && !isStart && !isEnd,
    'border-b-2 border-dashed border-blue-400': isHoverPreview && !isStart && !isEnd && !isInRange,
    'ring-2 ring-gray-200 ring-offset-2 rounded-full': isToday && !isStart && !isEnd && !isInRange && !isHoverPreview,
  });

  return (
    <div 
      className={clsx(baseClasses, stateClasses)}
      onClick={() => !isPast && onClick(dateStr)}
      onMouseEnter={() => !isPast && onMouseEnter(dateStr)}
      title={isPast ? "Past dates cannot be selected" : ""}
      role="gridcell"
      aria-selected={isStart || isEnd || isInRange}
      aria-disabled={isPast}
    >
      {/* Background connector for range when start or end is selected */}
      {(isStart && !isEnd && (isInRange || isHoverPreview)) && (
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-blue-50 -z-10" />
      )}
      {(isEnd && !isStart) && (
        <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-blue-50 -z-10" />
      )}
      
      <span className="z-20 relative">{format(date, 'd')}</span>
      
      {hasNote && (
        <div className={clsx(
          "absolute bottom-1 w-1 h-1 rounded-full z-20 shadow-sm",
          (isStart || isEnd) ? "bg-white" : "bg-blue-500"
        )} />
      )}
    </div>
  );
}
