'use client';

import { debounce } from '@/utils/debounce.ts';
import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filterPokemon = debounce((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    filterPokemon(e.currentTarget.value);
  };

  return (
    <nav className='w-[100%] sticky top-0 flex justify-center bg-[#81C784] drop-shadow-md'>
      <input
        type='text'
        onChange={handleInput}
        defaultValue={searchParams.get('query')?.toString()}
        placeholder='Search pokémon...'
        className='text-black w-[30vw] h-[5vh] p-2'
      />
    </nav>
  );
}
