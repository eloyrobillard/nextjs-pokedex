import { NextRequest, NextResponse } from 'next/server';

import prismadb from '@/libs/prismadb.ts';

export async function GET(_req: NextRequest, { params }: {params: {id: string}}) {
  const { id } = params;

  try {
    const pokemon = await prismadb.pokemon.findUnique({
      where: { id: Number(id) },
      include: {
        forms: true, stats: true,
      },
    });

    return NextResponse.json(pokemon);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
