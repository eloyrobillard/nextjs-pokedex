export type Species = {
  id: number;
  baseHappiness: number | null;
  captureRate: number;
  color: string;
  eggGroups: string[];
  evolvesFromSpecies: string | null;
  genderRate: number;
  generation: string;
  growthRate: string;
  habitat: string | null;
  hasGenderDifferences: boolean;
  hatchCounter: number | null;
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
  name: string;
  order: number;
  shape: string | null;
}
