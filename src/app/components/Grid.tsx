import React from 'react';
import Link from 'next/link';

import Card from '@/app/components/Card.tsx';

export default async function Grid({ filter }: { filter: string }) {
  const pokemonList = await prismadb.pokemon.findMany({ where: { name: { contains: filter } }, orderBy: [{ id: 'asc' }] });

  if (!pokemonList) {
    return <div className='h-[100vh] cursor-wait'>Loading...</div>;
  }

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
