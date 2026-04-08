import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function LiveClock() {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const update = () => {
      setTimeStr(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeStr) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#F2F2F2] border border-gray-100 dark:border-[#DDDDDD] rounded-full shadow-sm text-gray-700 dark:text-[#333333] text-sm font-medium tracking-wide min-w-[110px] justify-center transition-colors">
      <Clock size={14} className="text-blue-500" />
      <span>{timeStr} IST</span>
    </div>
  );
}
