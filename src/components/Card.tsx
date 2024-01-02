import React from 'react';

import { Pokemon } from '@/types/pokemon.ts';
import Icon from '@/components/Icon.tsx';

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
