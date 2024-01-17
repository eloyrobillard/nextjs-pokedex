'use client';

import React, { useRef, useState } from 'react';

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

  // keeping ref to popup div so that user can close modal when clicking outside of it
  // method taken from https://stackoverflow.com/a/68897737/17974838
  const popup = useRef<HTMLDivElement>(null);

  const closePopup = (e: MouseEvent) => {
    // casting due to poor typing (see: https://stackoverflow.com/a/61164277/17974838)
    if (display && !popup.current?.contains(e.target as Node)) {
      setDisplay(false);
    }
  };

  document.addEventListener('mousedown', closePopup);

  return (
    <>
      <button type='button' onClick={() => setDisplay(prev => !prev)}>
        <div style={{ backgroundColor: species.color }} className='h-[30px] m-auto p-1 flex justify-between rounded-md text-white'>
          {species.genera.find(({ language }) => language.startsWith('en'))?.genus}
        </div>
      </button>
      {/* `details pageで`items-center`を使っているので、ここで`align-middle`を使えばちゃんと中央に寄る */}
      {display && (
        <div ref={popup} className='align-middle flex justify-center'>
          <div className='absolute top-4 bg-white z-10 w-[40vw] h-[90%] p-[2rem] shadow-2xl rounded-md overflow-y-scroll'>
            <div className='flex flex-col gap-2'>
              <p className='uppercase text-[#6d6d6d] text-2xl'>{pokemon.name}</p>
              <div
                style={{ backgroundColor: species.color }}
                className='h-[30px] m-auto p-1 flex justify-between rounded-md text-white capitalize'
              >
                Pokédex Entries
              </div>
              <hr />
              {species.flavorTextEntries.filter(({ language }) => language.startsWith('en')).map(entry => (
                <div key={entry.id} className='flex flex-col mt-3'>
                  <div
                    style={{ backgroundColor: species.color }}
                    className='h-[30px] m-auto p-1 flex justify-between rounded-md text-white capitalize'
                  >
                    {`Pokémon ${entry.version}`}
                  </div>
                  {entry.flavorText}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
