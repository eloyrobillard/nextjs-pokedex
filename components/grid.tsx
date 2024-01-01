'use client';

import React from 'react';
import Link from 'next/link';

import { Pokemon } from '@/types/pokemon.ts';
import Card from '@/components/card.tsx';

export default function Grid({ pokemonList }: { pokemonList: Pokemon[] }) {
  return (
    <div className='grid grid-cols-10 ml-20 mr-20'>
      {pokemonList.map(pokemon => (
        <Link key={pokemon.id} href={`/details/${pokemon.id}`}>
          <Card pokemon={pokemon} />
        </Link>
      ))}
    </div>
  );
}
