import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Type as T } from '@sinclair/typebox';
import { NameAndUrl, Names } from '@/type-builders/common.ts';

const FlavorTextEntry =
  T.Object({
    flavor_text: T.String(),
    language: NameAndUrl,
    version: NameAndUrl,
  });

export const Species = TypeCompiler.Compile(T.Object({
  base_happiness: T.Number(),
  capture_rate: T.Number(),
  color: NameAndUrl,
  egg_groups: T.Array(NameAndUrl),
  evolution_chain: T.Object({ url: T.String() }),
  evolves_from_species: T.Union([NameAndUrl, T.Null()]),
  flavor_text_entries: T.Array(FlavorTextEntry),
  gender_rate: T.Number(),
  genera: T.Array(T.Object({
    genus: T.String(),
    language: NameAndUrl,
  })),
  generation: NameAndUrl,
  growth_rate: NameAndUrl,
  habitat: T.Union([NameAndUrl, T.Null()]),
  has_gender_differences: T.Boolean(),
  hatch_counter: T.Number(),
  id: T.Number(),
  is_baby: T.Boolean(),
  is_legendary: T.Boolean(),
  is_mythical: T.Boolean(),
  name: T.String(),
  names: Names,
  order: T.Number(),
  pokedex_numbers: T.Array(T.Object({
    entry_number: T.Number(),
    pokedex: NameAndUrl,
  })),
  shape: NameAndUrl,
  varieties: T.Array(T.Object({
    is_default: T.Boolean(),
    pokemon: NameAndUrl,
  })),
}));
