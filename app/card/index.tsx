import Image from 'next/image';
import React from 'react';

import { Pokemon } from '@/types/pokemon.ts';

function Icon({ type }: { type: string }) {
  return (
    // flex used to center the type icon inside the colored div
    <div className={`${type} h-[30px] w-[30px] flex rounded-full transition-all hover:saturate-200 hover:scale-110`}>
      <Image
        src={`type-icons/${type}.svg`}
        alt={type}
        title={type}
        width={30 * 0.6}
        height={30 * 0.6}
        className='m-[20%]'
      />
    </div>
  );
}

export default function Card({ pokemon }: { pokemon: Pokemon }) {
  const { id, name: n, sprite, type1, type2 } = pokemon;

  // names and extensions (like "mega") are provided in lower case
  // and separated by hyphens
  const [name, ...extensions] = n.split('-');

  return (
    <div className='h-[23vh] p-1 grid bg-white border-gray-200 border-[1px] hover:bg-gray-200 hover:cursor-pointer'>
      <div className='flex justify-around '>
        <div className='basis-20'>
          <p className='text-gray-600'>{id}</p>
          {/* Capitalize first letter of name */}
          <p className='text-gray-500'>{name?.replace(/\b\w/, c => c.toUpperCase())}</p>
          <p className='text-gray-300 text-xs'>{extensions.join(' ')}</p>
        </div>
        <div className='flex flex-col justify-between'>
          <Icon type={type1} />
          {type2 && <Icon type={type2} />}
        </div>
      </div>
      <img src={sprite} alt={name} className='m-auto' />
    </div>
  );
}
