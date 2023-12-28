import { NextResponse } from "next/server";

import prismadb from '@/libs/prismadb';

export async function GET(_req: Request) {
  try {
    const pokemonNames = await prismadb.pokemon.findMany({ select: { name: true }});

    return NextResponse.json(pokemonNames.map(({ name }) => name));
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' });
  }
}
