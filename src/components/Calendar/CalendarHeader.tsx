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
        <div className="text-blue-600 dark:text-[#A0A0A0] font-semibold tracking-widest text-sm md:text-base uppercase mb-1 transition-colors duration-300">
          {year}
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-[#EAEAEA] tracking-tight leading-none drop-shadow-sm dark:drop-shadow-none transition-colors duration-300" aria-live="polite">
          {monthName}
        </h2>
      </div>
      
      <div className="flex gap-2 items-center mb-1 bg-gray-50/80 dark:bg-[#2A2A2A] p-1 rounded-full shadow-inner-soft border border-gray-100 dark:border-[#333]">
        <IconButton onClick={onPrev} aria-label="Previous month" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-none bg-white dark:bg-[#1C1C1C] hover:bg-blue-50 dark:hover:bg-[#333] hover:text-blue-600 dark:hover:text-[#EAEAEA] text-gray-600 dark:text-[#a0a0a0] shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400">
          <ChevronLeft className="w-5 h-5 ml-[-2px]" />
        </IconButton>
        <IconButton onClick={onNext} aria-label="Next month" className="w-8 h-8 md:w-10 md:h-10 rounded-full border-none bg-white dark:bg-[#1C1C1C] hover:bg-blue-50 dark:hover:bg-[#333] hover:text-blue-600 dark:hover:text-[#EAEAEA] text-gray-600 dark:text-[#a0a0a0] shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400">
          <ChevronRight className="w-5 h-5 ml-[2px]" />
        </IconButton>
      </div>
    </div>
  );
}
