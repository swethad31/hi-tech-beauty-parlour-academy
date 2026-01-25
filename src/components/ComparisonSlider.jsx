import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ComparisonSlider({ before, after }) {
  const [sliderPos, setSliderPos] = useState(50);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(x, 0), 100));
  };

  return (
    <div 
      className="relative w-full aspect-square md:aspect-video overflow-hidden rounded-lg border-2 border-gold/20 cursor-col-resize select-none"
      onMouseMove={handleMove}
      onTouchMove={(e) => handleMove(e.touches[0])}
    >
      {/* After Image (Background) */}
      <img src={after} className="absolute inset-0 w-full h-full object-cover" alt="After" />
      
      {/* Before Image (Foreground with Clip) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={before} className="absolute inset-0 w-full h-full object-cover" alt="Before" />
      </div>

      {/* The Gold Slider Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-gold z-30 shadow-[0_0_15px_rgba(212,175,55,1)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-black font-bold shadow-xl border-2 border-white">
          ↔
        </div>
      </div>
      
      {/* Labels */}
      <span className="absolute bottom-4 left-4 z-40 bg-black/60 px-3 py-1 text-[10px] uppercase text-white border border-white/20">Before</span>
      <span className="absolute bottom-4 right-4 z-40 bg-red-900/60 px-3 py-1 text-[10px] uppercase text-white border border-gold/20">After</span>
    </div>
  );
}