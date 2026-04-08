import { isBefore, startOfDay } from 'date-fns';

export function useDateRange(
  selectionStart: string | null,
  selectionEnd: string | null,
  onSelectionChange: (start: string | null, end: string | null) => void
) {
  const handleDateClick = (dateStr: string) => {
    const clickedDate = startOfDay(new Date(dateStr));

    // Phase 3 (range complete) or Phase 1 (no start)
    if ((selectionStart && selectionEnd) || (!selectionStart)) {
      onSelectionChange(dateStr, null);
      return;
    }

    // Phase 2 (has start, no end)
    if (selectionStart && !selectionEnd) {
      const startDate = startOfDay(new Date(selectionStart));
      if (isBefore(clickedDate, startDate)) {
        onSelectionChange(dateStr, selectionStart);
      } else {
        onSelectionChange(selectionStart, dateStr);
      }
    }
  };

  return { handleDateClick };
}
