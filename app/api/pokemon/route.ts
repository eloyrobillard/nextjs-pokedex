import { NextResponse } from 'next/server';

import prismadb from '@/libs/prismadb.ts';

export async function GET(_req: Request) {
  try {
    const pokemonList = await prismadb.pokemon.findMany({ orderBy: [{ id: 'asc' }] });

    return NextResponse.json(pokemonList);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
