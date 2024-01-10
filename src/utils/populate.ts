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

/**
 * Replace current DB data with entirely new data from the PokéAPI.
 * Specify a step to limit the number of 'pokemon' and 'pokemon-species' queries
 * performed at any given time.
 */
export async function populateWithPokemon(step: number) {
  // just in case the source gets updated with more than the current 1302 pokémon entries
  const ALL_POKEMON_WITH_LEEWAY = 2000;

  // start from where we left off
  const currentData = await prismadb.pokemon.findMany();

  const pokemonURLs = await fetcher(`https://pokeapi.co/api/v2/pokemon?limit=${ALL_POKEMON_WITH_LEEWAY}`)
    .then(({ results }) => results.map(({ url }: { url: string }) => url));

  if (!Array.isArray(pokemonURLs)) {
    return [];
  }

  /* eslint-disable no-await-in-loop */
  for (let i = currentData.length; i < pokemonURLs.length; i += step) {
    const pokemonEntries = (await Promise.all(
      pokemonURLs.slice(i, i + step).map(fetcher),
    ))
      // make sure `this` is PokemonBuilder otherwise this fails
      .filter(PokemonBuilder.Check.bind(PokemonBuilder));

    // promise returns [pokemon, pokemonSpecies] tuples
    const pokemonAndSpeciesTuples = (
      await Promise.all(
        pokemonEntries.map(p => fetcher(p.species.url)
          .then(s => (PokemonSpecies.Check(s) ? [p, s] as const : []))),
      )
    ).filter(Boolean);

    await Promise.all(pokemonAndSpeciesTuples.map(([p, s]) => {
      // convert to format used in DB
      const pokemon = {
        id: p.id,
        abilities: p.abilities.map(({ ability }) => ability.name),
        baseExperience: p.base_experience,
        height: p.height,
        isDefault: p.is_default,
        name: p.name,
        order: p.order,
        sprite: p.sprites.front_default,
        type1: p.types[0]?.type.name || '',
        type2: p.types[1]?.type.name || '',
        weight: p.weight,
      };

      // forms, genera, names and stats are all related to the current pokemon
      // we use a transaction to make sure all the relevant data exist together in the DB
      return prismadb.$transaction([
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
      ]);
    }));

    // wait 10 seconds
    await sleep(10000);
  }

  // get all updated pokemon entries back
  return prismadb.pokemon.findMany();
}

export function populateWithMoves(step: number) {

}
