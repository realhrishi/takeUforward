"use client";

import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Moon, Sun } from 'lucide-react';
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

export function CalendarHeader({
  monthIndex,
  year,
  onNext,
  onPrev,
  onMonthSelect,
  onYearSelect
}: CalendarHeaderProps) {

  // ✅ Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("wall-calendar:theme-dark");

    if (savedTheme === "true") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // ✅ Toggle theme
  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("wall-calendar:theme-dark", "false");
    } else {
      root.classList.add("dark");
      localStorage.setItem("wall-calendar:theme-dark", "true");
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center sm:items-end mb-4 md:mb-6 relative z-20 w-full px-1 md:px-2 gap-4">

      {/* LEFT: Month + Year */}
      <div className="flex flex-col relative group gap-1.5">
        <select 
          value={year}
          onChange={(e) => onYearSelect(Number(e.target.value))}
          className="appearance-none bg-white dark:bg-[#F5F5F5] border border-gray-200 dark:border-[#EAEAEA] text-gray-700 dark:text-[#333333] font-bold tracking-widest text-xs uppercase outline-none cursor-pointer hover:bg-[#F3F4F6] dark:hover:bg-[#EBEBEB] focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-100/50 rounded-xl px-3 py-1.5 shadow-sm transition-all focus:border-blue-300 w-fit"
        >
          {generateYears().map(y => (
            <option key={y} value={y} className="text-[#222222] bg-white dark:bg-[#F5F5F5]">
              {y}
            </option>
          ))}
        </select>

        <div className="relative flex items-center">
          <select 
            value={monthIndex}
            onChange={(e) => onMonthSelect(Number(e.target.value))}
            className="appearance-none bg-white dark:bg-[#F5F5F5] border border-gray-200 dark:border-[#EAEAEA] text-2xl md:text-3xl font-black text-[#222222] dark:text-[#111111] tracking-tight outline-none cursor-pointer hover:bg-[#F3F4F6] dark:hover:bg-[#EBEBEB] focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-100/50 rounded-xl px-4 py-2 shadow-sm transition-all pr-10"
          >
            {monthNames.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>

          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* RIGHT: Controls */}
      <div className="flex gap-3 items-center mb-1">

        {/* 🌙 THEME TOGGLE */}
        <IconButton
          onClick={toggleTheme}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-200 dark:border-gray-300 bg-white dark:bg-[#F8F8F8] hover:bg-gray-50 dark:hover:bg-[#EAEAEA] text-gray-700 dark:text-[#333333] shadow-sm hover:shadow-md transition-all"
        >
          <Moon className="w-4 h-4 dark:hidden" />
          <Sun className="w-4 h-4 hidden dark:block" />
        </IconButton>

        {/* PREV */}
        <IconButton onClick={onPrev} className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-200 dark:border-gray-300 bg-white dark:bg-[#F8F8F8] hover:bg-gray-50 dark:hover:bg-[#EAEAEA] text-gray-700 dark:text-[#333333] shadow-sm hover:shadow-md transition-all">
          <ChevronLeft className="w-5 h-5" />
        </IconButton>

        {/* NEXT */}
        <IconButton onClick={onNext} className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-200 dark:border-gray-300 bg-white dark:bg-[#F8F8F8] hover:bg-gray-50 dark:hover:bg-[#EAEAEA] text-gray-700 dark:text-[#333333] shadow-sm hover:shadow-md transition-all">
          <ChevronRight className="w-5 h-5" />
        </IconButton>

      </div>
    </div>
  );
}