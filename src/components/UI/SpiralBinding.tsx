import React from 'react';

export function SpiralBinding() {
  return (
    <div className="w-full h-8 bg-white border-b border-gray-100 flex justify-evenly items-center drop-shadow-sm z-30 relative pt-2">
      {Array.from({length: 28}).map((_, i) => (
        <div key={i} className="relative w-2 h-4">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300 shadow-inner absolute -bottom-1"></div>
          <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-gray-400 via-gray-300 to-gray-500 absolute -top-4 left-[2px] border border-gray-400 drop-shadow-md"></div>
        </div>
      ))}
    </div>
  );
}
