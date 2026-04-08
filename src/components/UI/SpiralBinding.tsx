import React from 'react';

export function SpiralBinding() {
  return (
    <div className="w-full h-8 bg-[#f8fafc] border-b border-gray-200 flex justify-evenly items-center drop-shadow-sm z-30 relative pt-2">
      {Array.from({length: 36}).map((_, i) => (
        <div key={i} className="relative w-2 h-4">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-400 shadow-inner absolute -bottom-1"></div>
          {/* Enhanced metallic spiral look */}
          <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-gray-300 via-gray-100 to-gray-400 absolute -top-4 left-[2px] border border-gray-400 drop-shadow-md"></div>
        </div>
      ))}
    </div>
  );
}
