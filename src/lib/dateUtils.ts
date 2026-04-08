import { isSameDay as fnsIsSameDay, startOfDay, isBefore, format, endOfMonth, eachDayOfInterval, getDay, subDays, addDays } from 'date-fns';
import { DayCell } from './types';

export const toISODate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const isSameDay = (date1: Date | string, date2: Date | string): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return fnsIsSameDay(d1, d2);
};

export const isInRange = (date: Date | string, start: string | null, end: string | null): boolean => {
  if (!start || !end) return false;
  const d = new Date(date);
  const s = new Date(start);
  const e = new Date(end);
  const dTime = startOfDay(d).getTime();
  const sTime = startOfDay(s).getTime();
  const eTime = startOfDay(e).getTime();
  return dTime >= sTime && dTime <= eTime;
};

export const isDateInNoteRange = (date: Date | string, noteStart: string, noteEnd: string): boolean => {
  return isInRange(date, noteStart, noteEnd);
};

export const generateMonthDays = (year: number, month: number): DayCell[] => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  
  let startingDayOfWeek = getDay(firstDayOfMonth) - 1; // 0 for Mon, 6 for Sun
  if (startingDayOfWeek === -1) startingDayOfWeek = 6; 

  const prevMonthDays = [];
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push(subDays(firstDayOfMonth, i + 1));
  }

  const nextMonthDays = [];
  const totalDaysSoFar = prevMonthDays.length + daysInMonth.length;
  const daysNeeded = 42 - totalDaysSoFar; // 6 rows of 7 days
  for (let i = 1; i <= daysNeeded; i++) {
      nextMonthDays.push(addDays(lastDayOfMonth, i));
  }

  const today = startOfDay(new Date());

  const mapToCell = (date: Date, isCurrentMonth: boolean): DayCell => ({
      date,
      isCurrentMonth,
      isToday: fnsIsSameDay(date, today),
      isPast: isBefore(startOfDay(date), today),
  });

  return [
      ...prevMonthDays.map(d => mapToCell(d, false)),
      ...daysInMonth.map(d => mapToCell(d, true)),
      ...nextMonthDays.map(d => mapToCell(d, false))
  ];
};

export const formatDateDisplay = (dateStr: string | null): string => {
  if (!dateStr) return '';
  return format(new Date(dateStr), 'MMM d');
};
