'use client';

import React, { useMemo, useState } from 'react';

import { debounce } from '@/utils/debounce.ts';
import { Pokemon } from '@/types/pokemon.ts';

type Props = {
  pokemon: Pokemon[],
  setFilteredPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>
}

export default function SearchBar({ pokemon, setFilteredPokemon }: Props) {
  const [value, setValue] = useState('');

  const filterPokemon = useMemo(() => debounce((searchString: string) => {
    const filteredPokemon = pokemon.filter(({ name }) => name.includes(searchString));

    setFilteredPokemon(filteredPokemon);
  }), [pokemon, setFilteredPokemon]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    setValue(e.currentTarget.value);
    filterPokemon(e.currentTarget.value);
  };

  return (
    <div className="w-[100%] flex justify-center bg-[#81C784]">
      <input type="text" value={value} onInput={handleInput} placeholder="Search pokémon..." className="text-black w-[30vw] h-[5vh] p-2" />
    </div>
  );
}
