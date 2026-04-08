import React from 'react';

export function HeroPanel({ month, year }: { month: number, year: number }) {
  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  return (
    <div className="relative w-full h-[250px] md:h-full overflow-hidden group bg-gray-100">
      {/* Background Image full height, soft zoom on hover */}
      <div className="absolute inset-0 w-full h-full bg-gray-100 transition-transform duration-1000 ease-in-out group-hover:scale-105">
        <img 
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=80" 
          alt="Hero"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
      </div>

      {/* The date block */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10 transition-all duration-500">
        <div className="text-white text-lg md:text-xl font-light tracking-widest opacity-90 drop-shadow-sm mb-1 uppercase">
          {year}
        </div>
        <div className="text-white text-3xl md:text-5xl font-extrabold tracking-tight leading-none drop-shadow-md">
          {monthNames[month]}
        </div>
      </div>
      
      {/* Accent color bar at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-blue-500" />
    </div>
  );
}
