export const FIXED_HOLIDAYS: Record<string, string> = {
  '01-26': 'Republic Day',
  '08-15': 'Independence Day',
  '10-02': 'Gandhi Jayanti',
  '12-25': 'Christmas'
};

// Map of dynamic dates (YYYY-MM-DD) to Holiday names for recent/future years
export const DYNAMIC_HOLIDAYS: Record<string, string> = {
  // 2024
  '2024-03-25': 'Holi',
  '2024-08-19': 'Raksha Bandhan',
  '2024-08-26': 'Janmashtami',
  '2024-10-31': 'Diwali',
  '2024-11-03': 'Bhai Dooj',
  '2024-11-07': 'Chhath Puja',
  // 2025
  '2025-03-14': 'Holi',
  '2025-08-09': 'Raksha Bandhan',
  '2025-08-15': 'Janmashtami', // overlapping with independence day, usually shown
  '2025-10-20': 'Diwali',
  '2025-10-22': 'Bhai Dooj',
  '2025-10-26': 'Chhath Puja',
  // 2026
  '2026-03-03': 'Holi',
  '2026-08-28': 'Raksha Bandhan',
  '2026-09-04': 'Janmashtami',
  '2026-11-08': 'Diwali',
  '2026-11-10': 'Bhai Dooj',
  '2026-11-15': 'Chhath Puja',
  // 2027
  '2027-03-22': 'Holi',
  '2027-08-17': 'Raksha Bandhan',
  '2027-08-25': 'Janmashtami',
  '2027-10-29': 'Diwali',
  '2027-10-31': 'Bhai Dooj',
  '2027-11-04': 'Chhath Puja',
};

/**
 * Returns holiday name if it exists, otherwise null
 * @param dateStr Format: YYYY-MM-DD
 */
export function getHolidayName(dateStr: string): string | null {
  // Check dynamic
  if (DYNAMIC_HOLIDAYS[dateStr]) {
    return DYNAMIC_HOLIDAYS[dateStr];
  }
  
  // Check fixed (MM-DD)
  const monthDay = dateStr.substring(5);
  if (FIXED_HOLIDAYS[monthDay]) {
    return FIXED_HOLIDAYS[monthDay];
  }
  
  return null;
}
