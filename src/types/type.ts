export type TypeGameIndex = {
  id: number;
  typeId: number;
  version: string;
}

export type TypeName = {
  language: string;
  name: string;
  typeId: number;
}

export type PokemonType = {
  id: number;
  doubleDamageFrom: string[];
  doubleDamageTo: string[];
  halfDamageFrom: string[];
  halfDamageTo: string[];
  noDamageFrom: string[];
  noDamageTo: string[];
  generation: string;
  moveDamageClass: string;
  moves: string[];
  name: string;
  pokemon: string[];
}
