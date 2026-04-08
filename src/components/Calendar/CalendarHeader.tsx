import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '../UI/IconButton';

interface CalendarHeaderProps {
  monthName: string;
  year: number;
  onNext: () => void;
  onPrev: () => void;
}

export function CalendarHeader({ monthName, year, onNext, onPrev }: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-end mb-6 relative z-20 w-full px-2">
      <div className="flex flex-col">
        <div className="text-blue-500 font-semibold tracking-widest text-sm uppercase mb-1">
          {year}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight leading-none" aria-live="polite">
          {monthName}
        </h2>
      </div>
      
      <div className="flex gap-2 items-center mb-1 bg-gray-50/80 p-1 rounded-full shadow-inner-soft border border-gray-100">
        <IconButton onClick={onPrev} aria-label="Previous month" className="w-8 h-8 rounded-full border-none bg-white hover:bg-blue-50 hover:text-blue-600 text-gray-500 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400">
          <ChevronLeft className="w-4 h-4 ml-[-2px]" />
        </IconButton>
        <IconButton onClick={onNext} aria-label="Next month" className="w-8 h-8 rounded-full border-none bg-white hover:bg-blue-50 hover:text-blue-600 text-gray-500 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400">
          <ChevronRight className="w-4 h-4 ml-[2px]" />
        </IconButton>
      </div>
    </div>
  );
}
