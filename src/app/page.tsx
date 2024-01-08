'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { Pokemon } from '@/types/pokemon.ts';
import { usePokemonList } from '@/hooks/usePokemonList.ts';
import { debounce } from '@/utils/debounce.ts';

import SearchBar from '@/components/Search.tsx';
import Grid from '@/components/Grid.tsx';

export default function Home() {
  const { data: pokemonList = [], error, isLoading } = usePokemonList();

  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);

  const filterPokemon = useMemo(() => debounce((searchString: string) => {
    const filtered = pokemonList.filter(({ name }) => name.includes(searchString));

    setFilteredPokemon(filtered);
  }), [pokemonList, setFilteredPokemon]);

  useEffect(() => {
    setFilteredPokemon(pokemonList);
  }, [pokemonList]);

  if (isLoading) {
    return <div className='h-[100vh] cursor-wait'>Loading...</div>;
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  return (
    <div>
      <SearchBar filterPokemon={filterPokemon} />
      <Grid pokemonList={filteredPokemon} />
    </div>
  );
}
