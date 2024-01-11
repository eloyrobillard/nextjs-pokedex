import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Type } from '@sinclair/typebox';

export const NameAndUrl = Type.Object({
  name: Type.String(),
  url: Type.String(),
});

export const Names = Type.Array(Type.Object({ language: NameAndUrl, name: Type.String() }));

export const Pokemon = TypeCompiler.Compile(Type.Object({
  id: Type.Number(),
  abilities: Type.Array(Type.Object({
    ability: NameAndUrl, is_hidden: Type.Boolean(), slot: Type.Number(),
  })),
  base_experience: Type.Number(),
  forms: Type.Array(NameAndUrl),
  height: Type.Number(),
  is_default: Type.Boolean(),
  name: Type.String(),
  order: Type.Number(),
  species: NameAndUrl,
  sprites: Type.Object({ front_default: Type.String() }),
  stats: Type.Array(Type.Object({
    base_stat: Type.Number(), effort: Type.Number(), stat: Type.Object({ name: Type.String() }),
  })),
  types: Type.Array(Type.Object({ type: NameAndUrl })),
  weight: Type.Number(),
}));

export const Move = TypeCompiler.Compile(Type.Object({
  accuracy: Type.Number(),
  damage_class: NameAndUrl,
  effect_chance: Type.Number(),
  effect_entries: Type.Array(Type.Object({
    effect: Type.String(),
    language: Type.Object({ name: Type.String() }),
    short_effect: Type.String(),
  })),
  flavor_text_entries: Type.Array(Type.Object({
    flavor_text: Type.String(),
    language: Type.Object({ name: Type.String() }),
    version_group: Type.String(),
  })),
  generation: NameAndUrl,
  id: Type.Number(),
  learned_by_pokemon: Type.Array(NameAndUrl),
  machines: Type.Array(Type.Object({
    machine: Type.Object({ url: Type.String() }),
    version_group: NameAndUrl,
  })),
  meta: Type.Object({
    ailment: NameAndUrl,
    ailment_chance: Type.Number(),
    category: NameAndUrl,
    crit_rate: Type.Number(),
    drain: Type.Number(),
    flinch_chance: Type.Number(),
    healing: Type.Number(),
    max_hits: Type.Union([Type.Number(), Type.Null()]),
    max_turns: Type.Union([Type.Number(), Type.Null()]),
    min_hits: Type.Union([Type.Number(), Type.Null()]),
    min_turns: Type.Union([Type.Number(), Type.Null()]),
    stat_chance: Type.Number(),
  }),
  name: Type.String(),
  names: Names,
  power: Type.Number(),
  pp: Type.Number(),
  priority: Type.Number(),
  target: NameAndUrl,
  type: NameAndUrl,
}));

export const PokemonSpecies = TypeCompiler.Compile(Type.Object({
  genera: Type.Array(Type.Object({
    genus: Type.String(),
    language: Type.Object({ name: Type.String() }),
  })),
  id: Type.Number(),
  name: Type.String(),
  names: Type.Array(Type.Object({
    name: Type.String(),
    language: Type.Object({ name: Type.String() }),
  })),
}));
