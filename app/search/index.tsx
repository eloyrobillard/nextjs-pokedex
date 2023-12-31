'use client';

import React, { useMemo, useState } from 'react';

import { debounce } from '@/utils/debounce.ts';
import { Pokemon } from '@/types/pokemon.ts';

type Props = {
  pokemonList: Pokemon[],
  setFilteredPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>
}

export default function SearchBar({ pokemonList, setFilteredPokemon }: Props) {
  const [value, setValue] = useState('');

  const filterPokemon = useMemo(() => debounce((searchString: string) => {
    const filteredPokemon = pokemonList.filter(({ name }) => name.includes(searchString));

    setFilteredPokemon(filteredPokemon);
  }), [pokemonList, setFilteredPokemon]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    setValue(e.currentTarget.value);
    filterPokemon(e.currentTarget.value);
  };

  return (
    <nav className='w-[100%] sticky top-0 flex justify-center bg-[#81C784] drop-shadow-md'>
      <input
        type='text'
        value={value}
        onInput={handleInput}
        placeholder='Search pokémon...'
        className='text-black w-[30vw] h-[5vh] p-2'
      />
    </nav>
  );
}
