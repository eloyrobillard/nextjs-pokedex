'use client';

import React from 'react';

import { Pokemon } from '@/types/pokemon.ts';

function Card({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="h-[20vh] text-black bg-white border-black border-[1px] hover:bg-gray-200">
      <p>{pokemon.id}</p>
      <p>{pokemon.name.split('-').join(' ')}</p>
      <img src={pokemon.sprite} alt={pokemon.name} />
    </div>
  );
}

export default function Grid({ pokemonList }: { pokemonList: Pokemon[] }) {
  return (
    <div className="grid grid-cols-10">
      {pokemonList.map(pokemon => (<Card key={pokemon.id} pokemon={pokemon} />))}
    </div>
  );
}
