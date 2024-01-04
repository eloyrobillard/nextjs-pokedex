import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Type } from '@sinclair/typebox';
import { Pokemon as PokemonBuilder, PokemonSpecies } from '@/type-builders/pokemon.ts';
import fetcher from '@/libs/fetcher.ts';
import { sleep } from '@/utils/sleep.ts';
import prismadb from '@/libs/prismadb.ts';

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

export async function populateWithFullPokemonDetails(step: number) {
  const TOTAL_POKEMON = 1302;

  // reset DB
  prismadb.pokemon.deleteMany();

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < TOTAL_POKEMON; i += step) {
    const pokemonNames = await fetcher(`https://pokeapi.co/api/v2/pokemon?limit=${step}&offset=${i}`)
      .then(({ results }) => results.map(({ name }: { name: string }) => name));
    console.log(pokemonNames);
    // return [pokemon, pokemonSpecies] tuples
    const pokemonList = await Promise.all(
      pokemonNames.map((name: string) => Promise.all([
        fetcher(`https://pokeapi.co/api/v2/pokemon/${name}`),
        fetcher(`https://pokeapi.co/api/v2/pokemon-species/${name}`)])),
    );

    await Promise.all(pokemonList.map(([p, s]) => {
      if (PokemonBuilder.Check(p) && PokemonSpecies.Check(s)) {
        // convert to supabase form
        const pokemon = {
          id: p.id,
          abilities: p.abilities.map(({ ability }) => ability.name),
          baseExperience: p.base_experience,
          // forms: ,
          // genera: ,
          height: p.height,
          isDefault: p.is_default,
          name: p.name,
          order: p.order,
          sprite: p.sprites.front_default,
          // stats: ,
          type1: p.types[0]?.type.name || '',
          type2: p.types[1]?.type.name || '',
          weight: p.weight,
        };

        return [
          prismadb.pokemon.create({ data: pokemon }),
          prismadb.form.createMany({
            data: p.forms.map(({ name, url }) => ({
              pokemonId: p.id, name, url,
            })),
          }),
          prismadb.genus.createMany({
            data: s.genera.map(({ genus, language: { name } }) => ({
              pokemonId: p.id, genus, language: name,
            })),
          }),
          prismadb.name.createMany({
            data: s.names.map(({ name, language }) => ({
              pokemonId: p.id, name, language: language.name,
            })),
          }),
          prismadb.stat.createMany({
            data: p.stats.map(({ base_stat: baseStat, effort, stat: { name } }) => ({
              pokemonId: p.id, baseStat, effort, name,
            })),
          }),
        ];
      }

      return prismadb.pokemon.findUnique({ where: { name: '' } });
    }));

    await sleep(10000);
  }

  return prismadb.pokemon.findMany();
}
