import Image from 'next/image';
import React from 'react';

export default function Icon({ type }: { type: string }) {
  return (
    // flex used to center the type icon inside the colored div
    <div className={`${type} h-[30px] w-[30px] flex rounded-full transition-all hover:saturate-200 hover:scale-110`}>
      <Image
        src={`/type-icons/${type}.svg`}
        alt={type}
        title={type}
        width={30 * 0.6}
        height={30 * 0.6}
        className='m-[20%]'
      />
    </div>
  );
}
