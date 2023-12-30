export type MinimalPokemon = {
  id: number;
  name: string;
  url: string;
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  sprite: string;
  type1: string;
  type2?: string,
}
