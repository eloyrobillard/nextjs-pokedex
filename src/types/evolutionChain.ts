export type EvolutionDetails = {
  gender: number | null;
  heldItem: string | null;
  item: string | null;
  knownMove: string | null;
  knownMoveType: string | null;
  location: string | null;
  minAffection: number | null;
  minBeauty: number | null;
  minHappiness: number | null;
  minLevel: number | null;
  needsOverworldRain: boolean;
  partySpecies: string | null;
  partyType: string | null;
  relativePhysicalStats: number | null;
  timeOfDay: string | null;
  tradeSpecies: string | null;
  turnUpsideDown: boolean;
}

export type Chain = {
  id: number;
  isBaby: boolean
  parentId: number | null;
  speciesId: number;
  trigger: string;
  // from `evolutionDetails` field
  // NOTE this field comes as an array from PokéAPI
  //      so there may be chains with several `evolutionDetails` items (haven't found one thus far)
  evolutionDetails: EvolutionDetails,
}

export type EvolutionChain = {
  id: number;
};
