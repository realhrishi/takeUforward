import React from 'react';

export function HeroPanel() {
  return (
    <div className="relative w-full h-[250px] md:h-full overflow-hidden group bg-gray-100 flex-1">
      {/* Background Image full height, soft zoom on hover */}
      <div className="absolute inset-0 w-full h-full bg-gray-100 transition-transform duration-1000 ease-in-out group-hover:scale-105">
        <img 
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=80" 
          alt="Hero"
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay to attach the image to the layout aesthetically */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
      </div>
      
      {/* Thin line to unify with content seamlessly */}
      <div className="absolute bottom-0 md:bottom-auto md:right-0 w-full md:w-[1px] h-[1px] md:h-full bg-gray-200/50 shadow-md z-10" />
    </div>
  );
}
