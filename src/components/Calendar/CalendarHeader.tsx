import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { IconButton } from '../UI/IconButton';

interface CalendarHeaderProps {
  monthName: string;
  monthIndex: number;
  year: number;
  onNext: () => void;
  onPrev: () => void;
  onMonthSelect: (m: number) => void;
  onYearSelect: (y: number) => void;
}

const generateYears = () => {
    const start = 1900;
    const end = 2100;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const monthNames = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

export function CalendarHeader({ monthIndex, year, onNext, onPrev, onMonthSelect, onYearSelect }: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-end mb-6 relative z-20 w-full px-2">
      <div className="flex flex-col relative group gap-1.5">
        <select 
           value={year}
           onChange={(e) => onYearSelect(Number(e.target.value))}
           className="appearance-none bg-white dark:bg-[#F5F5F5] border border-gray-200 dark:border-[#EAEAEA] text-gray-700 dark:text-[#333333] font-bold tracking-widest text-xs uppercase outline-none cursor-pointer hover:bg-[#F3F4F6] dark:hover:bg-[#EBEBEB] focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-100/50 rounded-xl px-3 py-1.5 shadow-sm transition-all focus:border-blue-300 w-fit"
           aria-label="Select Year"
        >
           {generateYears().map(y => <option key={y} value={y} className="text-[#222222] bg-white dark:bg-[#F5F5F5] font-sans font-medium">{y}</option>)}
        </select>
        <div className="relative flex items-center">
          <select 
             value={monthIndex}
             onChange={(e) => onMonthSelect(Number(e.target.value))}
             className="appearance-none bg-white dark:bg-[#F5F5F5] border border-gray-200 dark:border-[#EAEAEA] text-2xl md:text-3xl font-black text-[#222222] dark:text-[#111111] tracking-tight leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.02)] outline-none cursor-pointer hover:bg-[#F3F4F6] dark:hover:bg-[#EBEBEB] focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-100/50 rounded-xl px-4 py-2 shadow-sm transition-all pr-10"
             aria-label="Select Month"
          >
             {monthNames.map((m, i) => <option key={i} value={i} className="text-[#222222] bg-white dark:bg-[#F5F5F5] font-sans font-semibold text-lg">{m}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
        </div>
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
