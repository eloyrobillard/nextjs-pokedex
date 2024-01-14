import { Pokemon as PokemonParser } from '@/type-builders/pokemon.ts';
import fetcher from '@/libs/fetcher.ts';
import { sleep } from '@/utils/sleep.ts';
import prismadb from '@/libs/prismadb.ts';
import { Move, PokemonV2, Species } from '@/types/pokemon.ts';
import { TypeParser } from '@/type-builders/type.ts';
import { PokemonType } from '@/types/type.ts';
import { Species as SpeciesParser } from '@/type-builders/species.ts';
import { Move as MoveParser } from '@/type-builders/move.ts';

// ===================
// POKEMON
// ===================

const parseIdFromUrl = (url: string) => {
  const matches = url.match(/(\d+)\/?$/);

  return matches ? matches[1] : null;
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
          .then(s => {
            if (SpeciesParser.Check(s)) {
              return [p, s] as const;
            }

            console.error(SpeciesParser.Errors(s).First());
            return [];
          })),
      )
    );

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

      const species: Species = {
        id: s.id,
        baseHappiness: s.base_happiness,
        captureRate: s.capture_rate,
        color: s.color.name,
        eggGroups: s.egg_groups.map(({ name }) => name),
        evolutionChainId: +(parseIdFromUrl(s.evolution_chain.url) || 0),
        evolvesFromSpecies: s.evolves_from_species?.name || null,
        genderRate: s.gender_rate,
        genera: s.genera,
        generation: s.generation.name,
        growthRate: s.growth_rate.name,
        habitat: s.habitat?.name || null,
        hasGenderDifferences: s.has_gender_differences,
        hatchCounter: s.hatch_counter,
        isBaby: s.is_baby,
        isLegendary: s.is_legendary,
        isMythical: s.is_mythical,
        name: s.name,
        order: s.order,
        shape: s.shape.name,
      };

      // forms, genera, names and stats are all related to the current pokemon
      // we use a transaction to make sure all the relevant data exist together in the DB
      return prismadb.$transaction([
        prismadb.pokemon.upsert({
          where: { id: s.id }, update: {}, create: pokemon,
        }),
        prismadb.form.createMany({
          data: p.forms.map(({ name, url }) => ({
            pokemonId: p.id, name, url,
          })),
        }),
        prismadb.gameIndex.createMany({
          data: p.game_indices.map(({ game_index: gameIndex, version }) => ({
            pokemonId: p.id, gameIndex, version: version.name,
          })),
        }),
        prismadb.stat.createMany({
          data: p.stats.map(({ base_stat: baseStat, effort, stat: { name } }) => ({
            pokemonId: p.id, baseStat, effort, name,
          })),
        }),
        prismadb.species.upsert({
          where: { id: s.id }, update: {}, create: species,
        }),
        prismadb.genus.createMany({
          data: s.genera.map(({ genus, language: { name } }) => ({
            genus, language: name,
          })),
        }),
        prismadb.name.createMany({
          data: s.names.map(({ name, language }) => ({
            speciesId: s.id, name, language: language.name,
          })),
        }),
        prismadb.pokedexEntry.createMany({
          data: s.pokedex_numbers.map(({ entry_number: entry, pokedex }) => ({
            speciesId: s.id, entry, pokedex: pokedex.name,
          })),
        }),
        prismadb.speciesFlavorTextEntry.createMany({
          data: s.flavor_text_entries.map(({ flavor_text: flavorText, language, version }) => ({
            speciesId: s.id, flavorText, language: language.name, version: version.name,
          })),
        }),
        prismadb.variety.createMany({
          data: s.varieties.map(({ is_default: isDefault, pokemon: { name } }) => ({
            speciesId: s.id, isDefault, pokemon: name,
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
        damageClassId: +(parseIdFromUrl(m.damage_class.url) || 0),
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
        ailmentId: +(parseIdFromUrl(m.meta.ailment.url) || 0),
        ailmentChance: m.meta.ailment_chance,
        categoryId: +(parseIdFromUrl(m.meta.category.url) || 0),
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

/**
 * Replace current DB data with entirely new data from the PokéAPI.
 * Specify a step to limit the number of 'type' queries
 * performed at any given time.
 * Then specify a max number of entries. It should be above the actual number of entries
 * present in the APU to make sure we get all entries even if some get added
 * in the future.
 */
export async function populateWithTypes(step: number, maxEntries: number) {
  // start from where we left off
  const currentData = await prismadb.type.findMany();

  const urls = await fetcher(`https://pokeapi.co/api/v2/type?limit=${maxEntries}`)
    .then(({ results }) => results.map(({ url }: { url: string }) => url));

  if (!Array.isArray(urls)) {
    return [];
  }

  /* eslint-disable no-await-in-loop */
  for (let i = currentData.length; i < urls.length; i += step) {
    const typeEntries = (await Promise.all(
      urls.slice(i, i + step).map(fetcher),
    ))
      // make sure `this` is PokemonBuilder otherwise this line fails
      .filter(TypeParser.Check.bind(TypeParser));

    await Promise.all(typeEntries.map(t => {
      // convert to format used in DB
      const type: PokemonType = {
        id: t.id,
        doubleDamageFrom: t.damage_relations.double_damage_from.map(({ name }) => name),
        doubleDamageTo: t.damage_relations.double_damage_to.map(({ name }) => name),
        halfDamageFrom: t.damage_relations.half_damage_from.map(({ name }) => name),
        halfDamageTo: t.damage_relations.half_damage_to.map(({ name }) => name),
        noDamageFrom: t.damage_relations.no_damage_from.map(({ name }) => name),
        noDamageTo: t.damage_relations.no_damage_to.map(({ name }) => name),
        generation: t.generation.name,
        moveDamageClass: t.move_damage_class.name,
        moves: t.moves.map(({ name }) => name),
        name: t.name,
        pokemon: t.pokemon.map(({ pokemon }) => pokemon.name),
      };

      // we use a transaction to make sure all the relevant data exist together in the DB
      return prismadb.$transaction([
        prismadb.type.create({ data: type }),
        prismadb.typeGameIndex.createMany({
          data: t.game_indices.map(({ game_index: gameIndex, generation }) => (
            {
              typeId: t.id, gameIndex, generation: generation.name,
            }
          )),
        }),
        prismadb.typeName.createMany({
          data: t.names.map(({ language, name }) => (
            {
              typeId: t.id, language: language.name, name,
            }
          )),
        }),
      ]);
    }));

    // wait 10 seconds
    await sleep(10000);
  }

  // get all updated pokemon entries back
  return prismadb.type.findMany();
}
