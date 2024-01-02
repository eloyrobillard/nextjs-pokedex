import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Type } from '@sinclair/typebox';
import { Pokemon } from '@/type-builders/pokemon.ts';

// ===================
// POKEMON
// ===================

const PokemonBatch = TypeCompiler.Compile(Type.Object({
  count: Type.Number(),
  results: Type.Array(Type.Object({
    name: Type.String(),
    url: Type.String(),
  })),
}));

const parsePokemonBatch = (input: unknown) => (PokemonBatch.Check(input) ? input : null);

export const getPokemons = async (count: number): Promise<{ name: string, url: string }[]> => {
  const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}`)
    .then(res => res.json())
    .then(data => parsePokemonBatch(data));

  return pokemons?.results ?? [];
};

export async function populateWithFullPokemon(step: number) {
  for (let i = 0; i < 1302; i += step) {
    const pokemonNames = await fetcher(`https://pokeapi.co/api/v2/pokemon?limit=${step}&offset=${step}`)
      .then(({ results }) => results.map(({ name }: { name: string }) => name));

    const pokemonList = await Promise.all(
      pokemonNames.map((name: string) => fetcher(`https://pokeapi.co/api/v2/pokemon/${name}`)),
    );

    await Promise.all(pokemonList.map(p => {
      if (Pokemon.Check(p)) {
        // supabase ポケモンに変換
        const pokemon: PokemonType = {
          id: p.id,
          name: p.name,
          base_experience: p.base_experience,
          height: p.height,
          is_default: p.is_default,
          order: p.order,
          weight: p.weight,
          sprite: p.sprites.front_default,
          type1: p.types[0]?.type.name || '',
          type2: p.types[1]?.type.name || '',
        };

        return prismadb.pokemon.create({ data: pokemon });
      }

      return prismadb.pokemon.findUnique({ where: { name: '' } });
    }));

    await sleep(10000);
  }
}