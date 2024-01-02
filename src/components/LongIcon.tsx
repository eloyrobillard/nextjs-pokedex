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
      <span className='text-white font-medium'>{type.replace(/\b\w/, c => c.toUpperCase())}</span>
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
