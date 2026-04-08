import React from 'react';

export function HeroPanel({ month, year }: { month: number, year: number }) {
  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  return (
    <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden bg-white group border-b-2 border-[#00A8E8]">
      {/* Background Image with angled cut */}
      <div 
        className="absolute inset-0 w-full h-full bg-gray-100 transition-transform duration-700 group-hover:scale-105"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 55% 100%, 30% 85%, 0 65%)" }}
      >
        <img 
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=80" 
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* The bright blue angled block for Date */}
      <div 
        className="absolute bottom-0 right-0 w-[60%] md:w-[45%] h-[120px] md:h-[150px] z-10"
        style={{ 
          background: "linear-gradient(135deg, #00A8E8, #0081D5)",
          clipPath: "polygon(100% 40%, 100% 100%, 0 100%, 25% 65%)" 
        }}
      >
        <div className="absolute right-6 bottom-4 text-right flex flex-col justify-end">
          <div className="text-white text-xl md:text-2xl font-light tracking-wide opacity-90">{year}</div>
          <div className="text-white text-2xl md:text-3xl font-extrabold tracking-widest leading-none mt-1">{monthNames[month]}</div>
        </div>
      </div>
    </div>
  );
}
