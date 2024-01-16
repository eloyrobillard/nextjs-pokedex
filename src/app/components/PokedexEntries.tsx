'use client';

import React, { useState } from 'react';

import { PokemonV2, Species } from '@/types/pokemon.ts';

type Props = {
  pokemon: PokemonV2;
  species: Species & {
    genera: {
      id: number;
      genus: string;
      language: string;
    }[];
    flavorTextEntries: {
      id: number;
      flavorText: string;
      language: string;
      version: string;
      speciesId: number;
    }[];
  };
}

export default function PokedexEntries({ pokemon, species }: Props) {
  const [display, setDisplay] = useState(false);

  return (
    <div>
      <button type='button' onClick={() => setDisplay(prev => !prev)}>
        <div className={`
          ${pokemon.type1}
          h-[30px]
          m-auto
          p-1
          flex
          justify-between
          rounded-md
          text-white
          `}
        >
          {species.genera.find(({ language }) => language.startsWith('en'))?.genus}
        </div>
      </button>
      <div className='absolute flex justify-center ml-auto mr-auto l-0 r-0 w-[90%]'>
        {display && (
        <div className='bg-white z-10 w-[30vw] p-[2rem] shadow-lg'>
          {species.flavorTextEntries.filter(({ language }) => language.startsWith('en')).map(entry => (
            <div key={entry.id} className='flex flex-col'>
              <div className={`
                ${pokemon.type1}
                h-[30px]
                m-auto
                p-1
                flex
                justify-between
                rounded-md
                text-white
                capitalize
                `}
              >
                {`Pokémon ${entry.version}`}

              </div>
              {entry.flavorText}
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
