'use client';

import React, { useState } from 'react';

import { Pokemon } from '@/types/pokemon.ts';
import { usePokemonList } from '@/hooks/usePokemon.ts';

import SearchBar from '@/app/search/index.tsx';
import Grid from '@/app/grid/index.tsx';

export default function Home() {
  const { data: pokemon = [] } = usePokemonList();

  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>(pokemon);

  return (
    <div>
      <SearchBar pokemon={pokemon} setFilteredPokemon={setFilteredPokemon} />
      <Grid pokemon={filteredPokemon} />
    </div>
  );
}
