export type MinimalPokemon = {
  id: number;
  name: string;
  url: string;
};

export type Stat = {
  base_stat: number;
  name: string;
}

export type Form = {
  name: string;
  url: string;
}

export type Pokemon = {
  id: number;
  base_experience: number;
  name: string;
  height: number;
  is_default: boolean;
  order: number;
  sprite: string;
  type1: string;
  type2?: string,
  weight: number;
}

export type PokemonV2 = {
  id: number;
  abilities: string[];
  base_experience: number;
  forms: Form[];
  height: number;
  is_default: boolean;
  name: string;
  order: number;
  sprite: string;
  type1: string;
  type2?: string,
  stats: Stat[],
  weight: number;
}
