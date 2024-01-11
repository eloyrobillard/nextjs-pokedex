import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Type } from '@sinclair/typebox';

import { Move as MoveParser, Pokemon as PokemonParser, PokemonSpecies } from '@/type-builders/pokemon.ts';
import fetcher from '@/libs/fetcher.ts';
import { sleep } from '@/utils/sleep.ts';
import prismadb from '@/libs/prismadb.ts';
import { Move, PokemonV2 } from '@/types/pokemon.ts';

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
 * Then specify a max number of entries. It should be above the actual number of entries
 * present in the APU to make sure we get all entries even if some get added
 * in the future.
 */
export async function populateWithPokemon(step: number, maxEntries: number) {
  // just in case the source gets updated with more than the current 1302 pokémon entries

  // start from where we left off
  const currentData = await prismadb.pokemon.findMany();

  const urls = await fetcher(`https://pokeapi.co/api/v2/pokemon?limit=${maxEntries}`)
    .then(({ results }) => results.map(({ url }: { url: string }) => url));

  if (!Array.isArray(urls)) {
    return [];
  }

  /* eslint-disable no-await-in-loop */
  for (let i = currentData.length; i < urls.length; i += step) {
    const pokemonEntries = (await Promise.all(
      urls.slice(i, i + step).map(fetcher),
    ))
      // make sure `this` is PokemonBuilder otherwise this fails
      .filter(PokemonParser.Check.bind(PokemonParser));

    // promise returns [pokemon, pokemonSpecies] tuples
    const pokemonAndSpeciesTuples = (
      await Promise.all(
        pokemonEntries.map(p => fetcher(p.species.url)
          .then(s => (PokemonSpecies.Check(s) ? [p, s] as const : []))),
      )
    ).filter(Boolean);

    await Promise.all(pokemonAndSpeciesTuples.map(([p, s]) => {
      // convert to format used in DB
      const pokemon: PokemonV2 = {
        id: p.id,
        abilities: p.abilities.map(({ ability }) => ability.name),
        baseExperience: p.base_experience,
        height: p.height,
        isDefault: p.is_default,
        name: p.name,
        order: p.order,
        species: p.species.name,
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

/**
 * Replace current DB data with entirely new data from the PokéAPI.
 * Specify a step to limit the number of 'move' queries
 * performed at any given time.
 * Then specify a max number of entries. It should be above the actual number of entries
 * present in the APU to make sure we get all entries even if some get added
 * in the future.
 */
export async function populateWithMoves(step: number, maxEntries: number) {
  // start from where we left off
  const currentData = await prismadb.move.findMany();

  const urls = await fetcher(`https://pokeapi.co/api/v2/move?limit=${maxEntries}`)
    .then(({ results }) => results.map(({ url }: { url: string }) => url));

  if (!Array.isArray(urls)) {
    return [];
  }

  /* eslint-disable no-await-in-loop */
  for (let i = currentData.length; i < urls.length; i += step) {
    const moveEntries = (await Promise.all(
      urls.slice(i, i + step).map(fetcher),
    ))
      // make sure `this` is PokemonBuilder otherwise this fails
      .filter(MoveParser.Check.bind(MoveParser));

    await Promise.all(moveEntries.map(m => {
      // convert to format used in DB
      const move: Move = {
        id: m.id,
        accuracy: m.accuracy,
        damageClassId: +(m.damage_class.url.split('/').slice(-2)[0] || 0),
        effectChance: m.effect_chance,
        generation: m.generation.name,
        learnedByPokemon: m.learned_by_pokemon.map(({ name }) => name),
        name: m.name,
        power: m.power,
        pp: m.pp,
        priority: m.priority,
        target: m.target.name,
        type: m.type.name,
        // meta
        ailmentId: +(m.meta.ailment.url.split('/').slice(-2)[0] || 0),
        ailmentChance: m.meta.ailment_chance,
        categoryId: +(m.meta.category.url.split('/').slice(-2)[0] || 0),
        critRate: m.meta.crit_rate,
        drain: m.meta.drain,
        flinchChance: m.meta.flinch_chance,
        healing: m.meta.healing,
        maxHits: m.meta.max_hits,
        maxTurns: m.meta.max_turns,
        minHits: m.meta.min_hits,
        minTurns: m.meta.min_turns,
        statChance: m.meta.stat_chance,
      };

      // forms, genera, names and stats are all related to the current pokemon
      // we use a transaction to make sure all the relevant data exist together in the DB
      return prismadb.$transaction([
        prismadb.move.create({ data: move }),
        prismadb.effectEntry.createMany({
          data: m.effect_entries.map(({ effect, language, short_effect: shortEffect }) => (
            {
              moveId: m.id, effect, language: language.name, shortEffect,
            }
          )),
        }),
        prismadb.flavorTextEntry.createMany({
          data: m.flavor_text_entries.map(({
            flavor_text: flavorText,
            language,
            version_group: versionGroup,
          }) => (
            {
              moveId: m.id, flavorText, language: language.name, versionGroup,
            }
          )),
        }),
        prismadb.moveName.createMany({
          data: m.names.map(({ name, language }) => (
            {
              moveId: m.id, name, language: language.name,
            }
          )),
        }),
      ]);
    }));

    // wait 10 seconds
    await sleep(10000);
  }

  // get all updated pokemon entries back
  return prismadb.move.findMany();
}
