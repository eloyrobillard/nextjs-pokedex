import Image from 'next/image';
import React from 'react';

export default function LongIcon({ type }: { type: string }) {
  return (
    // flex used to center the type icon inside the colored div
    <div className={`
      ${type}
      h-[30px]
      w-[80px]
      p-1
      flex
      justify-between
      rounded-md
      transition-all
      hover:saturate-200
      hover:scale-110`}
    >
      {/* Capitalize type */}
      <span className='leading-6 text-white font-medium capitalize'>{type}</span>
      <Image
        src={`/type-icons/${type}.svg`}
        alt={type}
        title={type}
        width={30 * 0.6}
        height={30 * 0.6}
      />
    </div>
  );
}
