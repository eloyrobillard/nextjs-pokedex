import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Type } from '@sinclair/typebox';
import { NameAndUrl, Names } from '@/type-builders/common.ts';

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
