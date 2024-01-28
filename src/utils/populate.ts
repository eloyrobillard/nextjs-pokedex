import { PokemonSchema } from '@/type-builders/pokemon.ts';
import fetcher from '@/libs/fetcher.ts';
import { sleep } from '@/utils/sleep.ts';
import prismadb from '@/libs/prismadb.ts';
import { Move, PokemonV2 } from '@/types/pokemon.ts';
import { TypeParser } from '@/type-builders/type.ts';
import { PokemonType } from '@/types/type.ts';
import { SpeciesSchema } from '@/type-builders/species.ts';
import { Move as MoveParser } from '@/type-builders/move.ts';
import { ChainSchema, EvolutionChainSchema } from '@/type-builders/evolutionChain.ts';
import { Chain, EvolutionChain } from '@/types/evolutionChain.ts';
import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Static, Type } from '@sinclair/typebox';

import pokemonData from '@/api-data/pokemon.json';
import speciesData from '@/api-data/pokemon-species.json';
import evolutionChainData from '@/api-data/evolution-chain.json';
import { Species } from '@/types/species.ts';
import { Prisma } from '@prisma/client';

const parseIdFromUrl = (url: string, def: number = 0) => {
  const matches = url.match(/(\d+)\/?$/);

  return matches ? Number(matches[1]) : def;
};

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
    .then(({
      results,
    }) => results.map(({
      url,
    }: { url: string }) => url));

  if (!Array.isArray(urls)) {
    return [];
  }

  /* eslint-disable no-await-in-loop */
  for (let i = currentData.length; i < urls.length; i += step) {
    const moveEntries = (await Promise.all(urls.slice(i,
      i + step).map(fetcher)))
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
        learnedByPokemon: m.learned_by_pokemon.map(({
          name,
        }) => name),
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
        prismadb.move.create({
          data: move,
        }),
        prismadb.effectEntry.createMany({
          data: m.effect_entries.map(({
            effect, language, short_effect: shortEffect,
          }) => (
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
          data: m.names.map(({
            name, language,
          }) => (
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
    .then(({
      results,
    }) => results.map(({
      url,
    }: { url: string }) => url));

  if (!Array.isArray(urls)) {
    return [];
  }

  /* eslint-disable no-await-in-loop */
  for (let i = currentData.length; i < urls.length; i += step) {
    const typeEntries = (await Promise.all(urls.slice(i,
      i + step).map(fetcher)))
      // make sure `this` is PokemonBuilder otherwise this line fails
      .filter(TypeParser.Check.bind(TypeParser));

    await Promise.all(typeEntries.map(t => {
      // convert to format used in DB
      const type: PokemonType = {
        id: t.id,
        doubleDamageFrom: t.damage_relations.double_damage_from.map(({
          name,
        }) => name),
        doubleDamageTo: t.damage_relations.double_damage_to.map(({
          name,
        }) => name),
        halfDamageFrom: t.damage_relations.half_damage_from.map(({
          name,
        }) => name),
        halfDamageTo: t.damage_relations.half_damage_to.map(({
          name,
        }) => name),
        noDamageFrom: t.damage_relations.no_damage_from.map(({
          name,
        }) => name),
        noDamageTo: t.damage_relations.no_damage_to.map(({
          name,
        }) => name),
        generation: t.generation.name,
        moveDamageClass: t.move_damage_class.name,
        moves: t.moves.map(({
          name,
        }) => name),
        name: t.name,
        pokemon: t.pokemon.map(({
          pokemon,
        }) => pokemon.name),
      };

      // we use a transaction to make sure all the relevant data exist together in the DB
      return prismadb.$transaction([
        prismadb.type.create({
          data: type,
        }),
        prismadb.typeGameIndex.createMany({
          data: t.game_indices.map(({
            game_index: gameIndex, generation,
          }) => (
            {
              typeId: t.id, gameIndex, generation: generation.name,
            }
          )),
        }),
        prismadb.typeName.createMany({
          data: t.names.map(({
            language, name,
          }) => (
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

// 進化の仕組み：１か２段階、それとも１段階で複数の可能な進化
const flattenChain = (() => {
  let id = 0;

  return (initialChain: Static<typeof ChainSchema>,
    parentId: number | null = null): Chain[] => {
    id += 1;

    const details = initialChain.evolution_details[0];

    const chain = {
      id,
      isBaby: initialChain.is_baby,
      parentId,
      speciesId: parseIdFromUrl(initialChain.species.url),
      trigger: details?.trigger?.name || '',
      // evolution details
      evolutionDetails: {
        gender: details?.gender || null,
        heldItem: details?.held_item?.name || null,
        item: details?.item?.name || null,
        knownMove: details?.known_move?.name || null,
        knownMoveType: details?.known_move_type?.name || null,
        location: details?.location?.name || null,
        minAffection: details?.min_affection || null,
        minBeauty: details?.min_beauty || null,
        minHappiness: details?.min_happiness || null,
        minLevel: details?.min_level || null,
        needsOverworldRain: details?.needs_overworld_rain || false,
        partySpecies: details?.party_species?.name || null,
        partyType: details?.party_type?.name || null,
        relativePhysicalStats: details?.relative_physical_stats || null,
        timeOfDay: details?.time_of_day || null,
        tradeSpecies: details?.trade_species?.name || null,
        turnUpsideDown: details?.turn_upside_down || false,
      },
    };

    const evolutions = initialChain.evolves_to.flatMap(ch => flattenChain(ch,
      id));

    return [chain].concat(evolutions);
  };
})();

export function transformPokemonList() {
  const PokemonListParser = TypeCompiler.Compile(Type.Array(PokemonSchema));

  if (Array.isArray(pokemonData) && PokemonListParser.Check(pokemonData)) {
    return pokemonData.map(({
      id,
      abilities,
      base_experience: baseExperience,
      forms,
      game_indices: gameIndices,
      height,
      is_default: isDefault,
      name,
      order,
      sprites,
      stats,
      types,
      weight,
    }) => {
      const pokemon: PokemonV2 = {
        id,
        abilities: abilities.map(({
          ability,
        }) => ability.name),
        baseExperience,
        height,
        isDefault,
        name,
        order,
        sprite: sprites.other['official-artwork'].front_default || '',
        type1: types[0]?.type.name || '',
        type2: types[1]?.type.name || '',
        weight,
      };

      return {
        pokemon,
        forms: forms.map(({
          name, url,
        }) => ({
          name, url,
        })),
        gameIndices: gameIndices.map(({
          game_index: gameIndex, version,
        }) => ({
          gameIndex, version: version.name,
        })),
        stats: stats.map(({
          base_stat: baseStat, effort, stat: {
            name,
          },
        }) => ({
          baseStat, effort, name,
        })),
      };
    });
  }

  console.error(...PokemonListParser.Errors(pokemonData));

  return [];
}

export const prismaifyPokemonList = (list: {
  pokemon: PokemonV2;
  forms: {
    name: string;
    url: string;
  }[];
  gameIndices: {
    gameIndex: number;
    version: string;
  }[];
  stats: {
    baseStat: number;
    effort: number;
    name: string;
  }[];
}[]) => list.map<Prisma.PokemonCreateInput>(({
  pokemon, forms, gameIndices, stats,
}) => ({
  ...pokemon,
  forms: {
    create: forms,
  },
  gameIndices: {
    create: gameIndices,
  },
  stats: {
    create: stats,
  },
}));

export function transformSpeciesList() {
  const SpeciesListParser = TypeCompiler.Compile(Type.Array(SpeciesSchema));

  if (SpeciesListParser.Check(speciesData)) {
    return speciesData.map(({
      id,
      base_happiness: baseHappiness,
      capture_rate: captureRate,
      color,
      egg_groups: eggGroups,
      evolution_chain: evolutionChain,
      evolves_from_species: evolvesFromSpecies,
      flavor_text_entries: flavorTextEntries,
      gender_rate: genderRate,
      genera,
      generation,
      growth_rate: growthRate,
      habitat,
      has_gender_differences: hasGenderDifferences,
      hatch_counter: hatchCounter,
      is_baby: isBaby,
      is_legendary: isLegendary,
      is_mythical: isMythical,
      name,
      names,
      pokedex_numbers: pokedexNumbers,
      order,
      shape,
      varieties,
    }) => {
      const species: Species = {
        id,
        baseHappiness,
        captureRate,
        color: color.name,
        eggGroups: eggGroups.map(({
          name,
        }) => name),
        evolvesFromSpecies: evolvesFromSpecies?.name || null,
        genderRate,
        generation: generation.name,
        growthRate: growthRate.name,
        habitat: habitat?.name || null,
        hasGenderDifferences,
        hatchCounter,
        isBaby,
        isLegendary,
        isMythical,
        name,
        order,
        shape: shape?.name || null,
      };

      return {
        species,
        evolutionChainId: parseIdFromUrl(evolutionChain.url),
        pokemonId: id,
        flavorTextEntries: flavorTextEntries.map(({
          flavor_text: flavorText,
          language,
          version,
        }) => ({
          flavorText,
          language: language.name,
          version: version.name,
        })),
        genera: genera.map(({
          genus, language,
        }) => ({
          genus, language: language.name,
        })),
        names: names.map(({
          name, language,
        }) => ({
          name, language: language.name,
        })),
        pokedexNumbers: pokedexNumbers.map(({
          entry_number: entry, pokedex,
        }) => ({
          entry, pokedex: pokedex.name,
        })),
        varieties: varieties.map(({
          is_default: isDefault, pokemon: {
            name,
          },
        }) => ({
          isDefault, pokemon: name,
        })),
      };
    });
  }

  console.error(SpeciesListParser.Errors(speciesData).First());

  return [];
}

export const prismaifySpeciesList = (list: {
  species: Species;
  evolutionChainId: number;
  pokemonId: number;
  flavorTextEntries: {
    flavorText: string;
    language: string;
    version: string;
  }[];
  genera: {
    genus: string;
    language: string;
  }[];
  names: {
    name: string;
    language: string;
  }[];
  pokedexNumbers: {
    entry: number;
    pokedex: string;
  }[];
  varieties: {
    isDefault: boolean;
    pokemon: string;
  }[];
}[]) => list.map(({
  species,
  evolutionChainId,
  pokemonId,
  flavorTextEntries,
  genera,
  names,
  pokedexNumbers,
  varieties,
}) => ({
  ...species,
  evolutionChainId,
  pokemonId,
  flavorTextEntries: {
    create: flavorTextEntries,
  },
  genera: {
    create: genera,
  },
  names: {
    create: names,
  },
  pokedexNumbers: {
    create: pokedexNumbers,
  },
  varieties: {
    create: varieties,
  },
}));

export function transformEvolutionChainList() {
  const EvolutionChainListParser = TypeCompiler.Compile(Type.Array(EvolutionChainSchema));

  if (EvolutionChainListParser.Check(evolutionChainData)) {
    return evolutionChainData.map(({
      id,
      chain,
    }) => {
      const chains = flattenChain(chain,
        id);

      const evolutionChain: EvolutionChain = {
        id,
      };

      return {
        evolutionChain,
        chains,
      };
    });
  }

  console.error(EvolutionChainListParser.Errors(evolutionChainData).First());

  return [];
}

const prismaifyEvolutionChainList = (list: {
  evolutionChain: EvolutionChain;
  chains: Chain[];
}[]) => list.map(({
  evolutionChain,
  chains,
}) => ({
  ...evolutionChain,
  chain: {
    create: chains.map(ch => ({
      ...ch,
      evolutionDetails: {
        create: ch.evolutionDetails,
      },
    })),
  },
}));

const populate = async <T, U extends { [key: string]: unknown, id: number }>(
  getList: () => T[],
  prismaify: (tl: T[]) => U[],
  storeToDB: (u: U) => void,
) => {
  const list = getList();
  const prismaList = prismaify(list);

  // eslint-disable-next-line no-restricted-syntax
  for (const el of prismaList) {
    await storeToDB(el);
  }
};

export const populateWithPokemon = () => populate(
  transformPokemonList,
  prismaifyPokemonList,
  el => prismadb.pokemon.upsert({
    where: {
      id: el.id,
    },
    update: {},
    create: el,
  }),
);

export const populateWithSpecies = () => populate(
  transformSpeciesList,
  prismaifySpeciesList,
  el => prismadb.species.upsert({
    where: {
      id: el.id,
    },
    update: {},
    create: el,
  }),
);

export const populateWithEvolutionChain = () => populate(
  transformEvolutionChainList,
  prismaifyEvolutionChainList,
  el => prismadb.evolutionChain.upsert({
    where: {
      id: el.id,
    },
    update: {
      chain: el.chain,
    },
    create: el,
  }),
);
