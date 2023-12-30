import { NextResponse } from 'next/server';

import prismadb from '@/libs/prismadb.ts';
import fetcher from '@/libs/fetcher.ts';
import { Pokemon } from '@/type-builders/pokemon.ts';

export async function GET(req: Request) {
  const { name } = await req.json();

  try {
    const pokemon = await prismadb.pokemon.findUnique({ where: { name } });

    if (pokemon) {
      return NextResponse.json(pokemon);
    }

    const pokemonOriginal = await fetcher(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (Pokemon.Check(pokemonOriginal)) {
      // update Supabase with full pokémon data
      await prismadb.pokemon.update({ where: { name }, data: pokemonOriginal });

      return NextResponse.json(pokemonOriginal);
    }

    return NextResponse.json({ message: 'Pokemon parse error' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
