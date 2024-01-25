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
