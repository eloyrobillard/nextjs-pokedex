import React from 'react';
import Link from 'next/link';

import prismadb from '@/libs/prismadb.ts';
import Card from '@/app/components/Card.tsx';

export default async function Grid({
  query,
}: { query: string }) {
  const pokemonList = await prismadb.pokemon.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    orderBy: [{
      id: 'asc',
    }],
  });

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
