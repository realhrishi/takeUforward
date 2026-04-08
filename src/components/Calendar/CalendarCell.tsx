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
      <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] flex items-center justify-center text-[12px] md:text-[14px] text-gray-300 pointer-events-none select-none font-medium">
        {format(date, 'd')}
      </div>
    );
  }

  const baseClasses = "relative flex items-center justify-center w-[28px] h-[28px] md:w-[32px] md:h-[32px] text-[12px] md:text-[14px] transition-all duration-150 select-none cursor-pointer font-bold";
  
  const stateClasses = clsx({
    'text-gray-300 cursor-not-allowed': isPast,
    'text-gray-700 hover:bg-gray-100 hover:scale-105 rounded-full': !isPast && !isStart && !isEnd && !isInRange && !isHoverPreview,
    'bg-[#00A8E8] text-white z-10': isStart || isEnd,
    'rounded-l-full': isStart && !isEnd,
    'rounded-r-full': isEnd && !isStart,
    'rounded-full': isStart && isEnd,
    'bg-[#00A8E8]/10 text-[#0081d5]': (isInRange || isHoverPreview) && !isStart && !isEnd,
    'border-b border-dashed border-[#00A8E8]': isHoverPreview && !isStart && !isEnd && !isInRange,
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
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#00A8E8]/10 -z-10" />
      )}
      {(isEnd && !isStart) && (
        <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#00A8E8]/10 -z-10" />
      )}
      
      <span className="z-20 relative">{format(date, 'd')}</span>
      
      {hasNote && (
        <div className="absolute top-[2px] right-[2px] w-[5px] h-[5px] rounded-full bg-orange-400 z-20 shadow-sm" />
      )}
    </div>
  );
}
