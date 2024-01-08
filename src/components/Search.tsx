'use client';

import React, { useState } from 'react';

type Props = {
  filterPokemon: (query: string) => void;
}

export default function SearchBar({ filterPokemon }: Props) {
  const [value, setValue] = useState('');

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
