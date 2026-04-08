import { useState, useEffect } from 'react';
import { generateMonthDays } from '../lib/dateUtils';
import { DayCell } from '../lib/types';

export function useCalendar(initialMonth: number, initialYear: number) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [days, setDays] = useState<DayCell[]>([]);

  useEffect(() => {
    setDays(generateMonthDays(currentYear, currentMonth));
  }, [currentMonth, currentYear]);

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const goToMonth = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  }

  return { currentMonth, currentYear, days, nextMonth, prevMonth, goToMonth };
}
