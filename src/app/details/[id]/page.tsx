'use client';

import React from 'react';

import { usePokemon } from '@/hooks/usePokemon.ts';
import LongIcon from '@/components/LongIcon.tsx';

import './style.css';

function Details({ params }: { params: { id: string } }) {
  const { pokemon, error, isLoading } = usePokemon(params.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  return (
    <div className='bg-white text-black'>
      <div className='h-[100vh] grid grid-cols-3 items-center'>
        <div className='perspective'>
          <div className='grid grid-cols-2 rotateY-counterclockwise hover:rotate-0 transition'>
            <div className='leading-10 text-right mr-[1rem] font-medium '>
              <div>ID</div>
              <div>Height</div>
              <div>Weight</div>
              <div>Abilities</div>
              <div>Type</div>
              <div>Forms</div>
            </div>
            <div className='leading-10 font-extralight'>
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
              <div className='w-[11rem] flex justify-between'>
                <LongIcon type={pokemon.type1} />
                {pokemon.type2 && <LongIcon type={pokemon.type2} />}
              </div>
              <div>TODO</div>
            </div>
          </div>
        </div>
        <div className='h-[90%] text-center flex flex-col '>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprite} alt={pokemon.name} className='m-auto h-[35vh]' />
        </div>
        <div className='perspective'>
          <div className='grid grid-cols-2 rotateY-clockwise hover:rotate-0 transition'>
            <div className='leading-10 text-right mr-[1rem] font-medium'>
              <div>HP</div>
              <div>Attack</div>
              <div>Defence</div>
              <div>Sp. Attack</div>
              <div>Sp. Defence</div>
              <div>Speed</div>
              <div>Total</div>
            </div>
            <div className='leading-10 font-extralight'>
              <div>TODO</div>
              <div>TODO</div>
              <div>TODO</div>
              <div>TODO</div>
              <div>TODO</div>
              <div>TODO</div>
              <div>TODO</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
