'use client';

import React from 'react';

import { Pokemon } from '@/types/pokemon.ts';
import Card from '@/app/card/index.tsx';

export default function Grid({ pokemonList }: { pokemonList: Pokemon[] }) {
  return (
    <div className='grid grid-cols-10 ml-20 mr-20'>
      {pokemonList.map(pokemon => (<Card key={pokemon.id} pokemon={pokemon} />))}
    </div>
  );
}
