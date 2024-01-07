'use client';

import React from 'react';

import { usePokemon } from '@/hooks/usePokemon.ts';
import LongIcon from '@/components/LongIcon.tsx';
import WithTypeColorBg from '@/components/WithTypeColorBg.tsx';

// used for perspective effect
import './style.css';

function Details({ params }: { params: { id: string } }) {
  // request pokémon data by ID
  const { pokemon, error, isLoading } = usePokemon(params.id);

  if (isLoading) {
    return <div className='h-[100vh] cursor-wait'>Loading...</div>;
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  return (
    <div className='bg-white text-black'>
      <div className='h-[100vh] grid grid-cols-3 items-center'>
        {/* various details (left side) */}
        <div className='perspective'>
          <div className='grid grid-cols-2 h-[250px] rotateY-counterclockwise hover:rotate-0 transition'>
            <div className='grid grid-rows-6 items-end text-right mr-[1rem] font-medium '>
              <div>ID</div>
              <div>Height</div>
              <div>Weight</div>
              <div>Abilities</div>
              <div>Type</div>
              <div>Forms</div>
            </div>
            <div className='grid grid-rows-6 items-end font-extralight'>
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
              <div className='flex'>
                {pokemon.abilities.map(ability => (
                  <div
                    key={ability}
                    className={`
                    ${pokemon.type1}
                    h-[30px]
                    mr-[10px]
                    p-1
                    items-start
                    rounded-md
                    text-white
                    font-medium
                    uppercase
                    `}
                  >
                    {ability}
                  </div>
                ))}
              </div>
              <div className='flex'>
                <LongIcon type={pokemon.type1} />
                {pokemon.type2 && <LongIcon type={pokemon.type2} />}
              </div>
              <div className='flex'>
                {pokemon.forms.map(({ name }) => (
                  <div key={name} className='font-medium uppercase'>
                    <WithTypeColorBg type={pokemon.type1}>{name}</WithTypeColorBg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* name, genus (top side) */}
        <div className='h-[90%] text-center flex flex-col '>
          <h1 className='uppercase text-[#6d6d6d] text-5xl'>{pokemon.name}</h1>
          <WithTypeColorBg type={pokemon.type1}>{pokemon.genera.find(({ language }) => language.startsWith('en'))?.genus}</WithTypeColorBg>
          <img src={pokemon.sprite} alt={pokemon.name} className='m-auto h-[75vh]' />
        </div>
        {/* pokemon stats (right side) */}
        <div className='perspective'>
          <div className='grid grid-cols-2 h-[250px] rotateY-clockwise hover:rotate-0 transition'>
            <div className='grid grid-rows-7 items-end text-right mr-[1rem] font-medium'>
              <div>HP</div>
              <div>Attack</div>
              <div>Defence</div>
              <div>Sp. Attack</div>
              <div>Sp. Defence</div>
              <div>Speed</div>
              <div>Total</div>
            </div>
            <div className='grid grid-rows-7 items-end font-extralight'>
              {pokemon.stats.map(({ id, baseStat }) => (
                <div key={id}>
                  {baseStat}
                </div>
              ))}
              {/* base stats total */}
              <div>
                {pokemon.stats.reduce((acc, { baseStat }) => acc + baseStat, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
