import { useState } from 'react';
import { isBefore, startOfDay } from 'date-fns';

export function useDateRange(
  initialStart: string | null = null,
  initialEnd: string | null = null,
  persistSelection?: (start: string | null, end: string | null) => void
) {
  const [selectionStart, setSelectionStart] = useState<string | null>(initialStart);
  const [selectionEnd, setSelectionEnd] = useState<string | null>(initialEnd);
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const handleDateClick = (dateStr: string) => {
    const clickedDate = startOfDay(new Date(dateStr));

    // Phase 3 (range complete) or Phase 1 (no start)
    if ((selectionStart && selectionEnd) || (!selectionStart)) {
      setSelectionStart(dateStr);
      setSelectionEnd(null);
      persistSelection?.(dateStr, null);
      return;
    }

    // Phase 2 (has start, no end)
    if (selectionStart && !selectionEnd) {
      const startDate = startOfDay(new Date(selectionStart));
      if (isBefore(clickedDate, startDate)) {
        setSelectionStart(dateStr);
        setSelectionEnd(selectionStart);
        persistSelection?.(dateStr, selectionStart);
      } else {
        setSelectionEnd(dateStr);
        persistSelection?.(selectionStart, dateStr);
      }
    }
  };

  const handleDateHover = (dateStr: string | null) => {
    if (selectionStart && !selectionEnd) {
      setHoverDate(dateStr);
    } else {
      setHoverDate(null);
    }
  };

  return {
    selectionStart,
    selectionEnd,
    hoverDate,
    handleDateClick,
    handleDateHover,
    setSelectionStart,
    setSelectionEnd
  };
}
