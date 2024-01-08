import React from 'react';

export default function Gauge({ max, stat }: { max: number, stat: number }) {
  return (
    // static gray background
    <div className='h-[17px] w-[80%] bg-gray-300 rounded-md'>
      <div
        // set width as percent of stat with highest value
        style={{ width: `${(stat / max) * 100}%` }}
        // leading-[1.1rem] is to center text inside the div
        className={`
        leading-[1.1rem]
          h-[17px]
          rounded-md
          text-right
          text-white
          stat-gauge-bg
          stat-gauge-animation
          `}
      >
        <span className='mr-1'>{stat}</span>
      </div>
    </div>
  );
}
