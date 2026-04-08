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
    <div className="flex justify-end items-center mb-4 md:mb-6 mt-[-10px] md:mt-[-20px] relative z-20 gap-1 opacity-60 hover:opacity-100 transition-opacity">
      <h2 className="sr-only" aria-live="polite">{monthName} {year}</h2>
      <IconButton onClick={onPrev} aria-label="Previous month" className="w-6 h-6 border-transparent bg-transparent hover:bg-gray-100 text-gray-500 shadow-none hover:border-transparent cursor-pointer !transform-none !transition-none">
        <ChevronLeft className="w-4 h-4" />
      </IconButton>
      <IconButton onClick={onNext} aria-label="Next month" className="w-6 h-6 border-transparent bg-transparent hover:bg-gray-100 text-gray-500 shadow-none hover:border-transparent cursor-pointer !transform-none !transition-none">
        <ChevronRight className="w-4 h-4" />
      </IconButton>
    </div>
  );
}
