'use client';

import React, { useEffect, useState } from 'react';

import { Pokemon } from '@/types/pokemon.ts';
import { usePokemonList } from '@/hooks/usePokemonList.ts';

import SearchBar from '@/app/search/index.tsx';
import Grid from '@/app/grid/index.tsx';

export default function Home() {
  const { data: pokemonList = [] } = usePokemonList();

  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    setFilteredPokemon(pokemonList);
  }, [pokemonList]);

  return (
    <div>
      <SearchBar pokemonList={pokemonList} setFilteredPokemon={setFilteredPokemon} />
      <Grid pokemonList={filteredPokemon} />
    </div>
  );
}
