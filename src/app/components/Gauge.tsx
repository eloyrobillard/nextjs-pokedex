import React from 'react';

export default function Gauge({ color, max, stat }: { color: string, max: number, stat: number }) {
  return (
    // static gray background
    <div className='h-[17px] w-[80%] bg-gray-300 rounded-md'>
      <div
        // set width as percent of stat with highest value
        style={{ width: `${(stat / max) * 100}%`,
          background: `repeating-linear-gradient(45deg, ${color}, ${color} 6px, color-mix(in srgb, ${color}, white) 6px, color-mix(in srgb, ${color}, white) 12px)`,
          // once background is defined here, using background-size rule in a CSS file
          // doesn't work anymore(?), so I reproduced the rule here
          backgroundSize: '1rem 1.02rem' }}
        // leading-[1.1rem] is to center text inside the div
        className={`
          leading-[1.1rem]
          h-[17px]
          rounded-md
          text-right
          text-white
          font-medium
          stat-gauge-animation
        `}
      >
        <span className='mr-1'>{stat}</span>
      </div>
    </div>
  );
}
