export type Chain = {
  evolutionChainId: number;
  id: number;
  isBaby: boolean
  parentId: number | null;
  species: string
  // from `evolutionDetails` field
  // NOTE this field comes as an array from PokéAPI
  //      so there may be chains with several `evolutionDetails` items (haven't found one thus far)
  gender: number | null;
  heldItem: string | null;
  item: string | null;
  knownMove: string | null;
  knownMoveType: string | null;
  location: string | null;
  minAffection: number | null;
  minBeauty: number | null;
  minHappiness: number | null;
  minLevel: number;
  needsOverworldRain: boolean;
  partySpecies: string | null;
  partyType: string | null;
  relativePhysicalStats: number | null;
  timeOfDay: string;
  tradeSpecies: string;
  trigger: string;
  turnUpsideDown: boolean;
}

export type EvolutionChain = {
  id: number;
};
