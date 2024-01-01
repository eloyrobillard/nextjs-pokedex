'use client';

import React from 'react';

import { usePokemon } from '@/hooks/usePokemon.ts';

function Details({ params }: { params: { id: string }}) {
  const { data: pokemon, error, isLoading } = usePokemon(params.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }
  return (
    <div className='h-[100vh] w-[100vw] bg-white'>
      <h1>{pokemon.name}</h1>
      <div className='grid grid-cols-2'>
        <div>
          <div>ID</div>
          <div>Height</div>
          <div>Weight</div>
          <div>Abilities</div>
          <div>Type</div>
          <div>Forms</div>
        </div>
        <div>
          <div>
            #
            {pokemon.id}
          </div>
          <div>
            {pokemon.height / 10}
            m
          </div>
          <div>
            {pokemon.weight / 10}
            kg
          </div>
          <div>TODO</div>
          <div>
            {pokemon.type1}
            ,
            {' '}
            {pokemon.type2}
          </div>
          <div>TODO</div>
        </div>
      </div>
    </div>
  );
}

export default Details;
