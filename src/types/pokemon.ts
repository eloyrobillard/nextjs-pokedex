export type MinimalPokemon = {
  id: number;
  name: string;
  url: string;
};

export type Stat = {
  id: number
  baseStat: number;
  name: string;
  pokemonId: number;
}

export type DamageClass = {
  id: number;
  name: string;
}

export type EffectEntry = {
  effect: string;
  language: string;
  shortEffect: string;
  moveId: number;
}

export type FlavorTextEntry = {
  flavorText: string;
  language: string;
  moveId: number;
  versionGroup: string;
}

export type Form = {
  id: number;
  pokemonId: number;
  name: string;
  url: string;
}

export type GameIndex = {
  id: number;
  pokemonId: number;
  version: string;
}

export type Genus = {
  id: number;
  pokemonId: number;
  genus: string;
  language: string;
}

export type Machine = {
  id: number;
  item: string;
  moveName: string;
  moveId: number;
  versionGroup: string;
}

export type MoveName = {
  language: string;
  name: string;
  moveId: number;
}

export type Move = {
  id: number;
  accuracy: number;
  damageClassId: number;
  effectChance: number;
  generation: string;
  learnedByPokemon: string[];
  name: string;
  power: number;
  pp: number;
  priority: number;
  target: string;
  type: string;
  // move meta
  ailmentId: number;
  ailmentChance: number;
  categoryId: number;
  critRate: number;
  drain: number;
  flinchChance: number;
  healing: number;
  maxHits: number | null;
  maxTurns: number | null;
  minHits: number | null;
  minTurns: number | null;
  statChance: number;
}

export type PokemonName = {
  id: number;
  pokemonId: number;
  name: string;
  language: string;
}

export type Pokemon = {
  id: number;
  base_experience: number;
  height: number;
  is_default: boolean;
  name: string;
  order: number;
  sprite: string;
  type1: string;
  type2?: string,
  weight: number;
}

export type PokemonV2 = {
  id: number;
  abilities: string[];
  baseExperience: number;
  height: number;
  isDefault: boolean;
  name: string;
  order: number;
  species: string;
  sprite: string;
  type1: string;
  type2: string | null;
  weight: number;
}

export type Species = {
  id: number;
  baseHappiness: number;
  captureRate: number;
  color: string;
  eggGroups: string[];
  evolutionChainId: number;
  evolvesFromSpecies: string | null;
  genderRate: number;
  generation: string;
  growthRate: string;
  habitat: string | null;
  hasGenderDifferences: boolean;
  hatchCounter: number;
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
  name: string;
  order: number;
  shape: string;
}
