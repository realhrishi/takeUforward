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
        <div className="text-blue-600 dark:text-blue-700 font-semibold tracking-widest text-sm md:text-base uppercase mb-1 transition-colors duration-300">
          {year}
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-[#222222] tracking-tight leading-none drop-shadow-sm dark:drop-shadow-none transition-colors duration-300" aria-live="polite">
          {monthName}
        </h2>
      </div>
      
      <div className="flex gap-3 items-center mb-1">
        <IconButton onClick={onPrev} aria-label="Previous month" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-200 dark:border-gray-300 bg-white dark:bg-[#F8F8F8] hover:bg-gray-50 dark:hover:bg-[#EAEAEA] text-gray-700 dark:text-[#333333] shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-300 focus:ring-2 focus:ring-blue-400">
          <ChevronLeft className="w-5 h-5 ml-[-2px]" />
        </IconButton>
        <IconButton onClick={onNext} aria-label="Next month" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-200 dark:border-gray-300 bg-white dark:bg-[#F8F8F8] hover:bg-gray-50 dark:hover:bg-[#EAEAEA] text-gray-700 dark:text-[#333333] shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-300 focus:ring-2 focus:ring-blue-400">
          <ChevronRight className="w-5 h-5 ml-[2px]" />
        </IconButton>
      </div>
    </div>
  );
}
