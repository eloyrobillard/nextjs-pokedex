import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Type as T } from '@sinclair/typebox';
import { NameAndUrl, Names } from '@/type-builders/common.ts';

export const TypeParser = TypeCompiler.Compile(T.Object({
  damage_relations: T.Object({
    double_damage_from: T.Array(NameAndUrl),
    double_damage_to: T.Array(NameAndUrl),
    half_damage_from: T.Array(NameAndUrl),
    half_damage_to: T.Array(NameAndUrl),
    no_damage_from: T.Array(NameAndUrl),
    no_damage_to: T.Array(NameAndUrl),
  }),
  game_indices: T.Array(T.Object({
    game_index: T.Number(),
    generation: NameAndUrl,
  })),
  generation: NameAndUrl,
  id: T.Number(),
  move_damage_class: NameAndUrl,
  moves: T.Array(NameAndUrl),
  name: T.String(),
  names: Names,
  pokemon: T.Array(T.Object({
    pokemon: NameAndUrl,
    slot: T.Number(),
  })),
}));
