import { NextResponse } from 'next/server';

import prismadb from '@/libs/prismadb.ts';

export async function GET() {
  try {
    const pokemonNames = await prismadb.pokemon.findMany({ select: { name: true } });

    return NextResponse.json(pokemonNames.map(({ name }) => name));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
