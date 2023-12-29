'use client';

import React from 'react';

import { Pokemon } from '@/types/pokemon.ts';

function Card({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="h-[20vh] text-black bg-white border-black border-[1px] hover:bg-gray-200">
      {pokemon.id}
      {pokemon.name}
    </div>
  );
}

export default function Grid({ pokemon }: { pokemon: Pokemon[] }) {
  return (
    <div className="grid grid-cols-10">
      {pokemon.map(pok => (<Card key={pok.id} pokemon={pok} />))}
    </div>
  );
}
