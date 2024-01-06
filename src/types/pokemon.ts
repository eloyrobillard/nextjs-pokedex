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

export type Form = {
  id: number;
  pokemonId: number;
  name: string;
  url: string;
}

export type Genus = {
  id: number;
  pokemonId: number;
  genus: string;
  language: string;
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
  forms: Form[];
  genera: Genus[];
  height: number;
  isDefault: boolean;
  name: string;
  names: PokemonName[];
  order: number;
  sprite: string;
  type1: string;
  type2?: string,
  stats: Stat[],
  weight: number;
}
