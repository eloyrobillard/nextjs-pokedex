import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Type as T } from '@sinclair/typebox';
import { NameAndUrl } from '@/type-builders/common.ts';

export const PokemonSchema = T.Object({
  abilities: T.Array(T.Object({
    ability: NameAndUrl,
    is_hidden: T.Boolean(),
    slot: T.Number(),
  })),
  base_experience: T.Union([T.Number(), T.Null()]),
  forms: T.Array(NameAndUrl),
  game_indices: T.Array(T.Object({
    game_index: T.Number(),
    version: NameAndUrl,
  })),
  height: T.Number(),
  id: T.Number(),
  is_default: T.Boolean(),
  moves: T.Array(T.Object({
    move: NameAndUrl,
    version_group_details: T.Array(T.Object({
      level_learned_at: T.Number(),
      move_learn_method: NameAndUrl,
      version_group: NameAndUrl,
    })),
  })),
  name: T.String(),
  order: T.Number(),
  species: NameAndUrl,
  sprites: T.Object({
    front_default: T.Union([T.String(), T.Null()]),
    other: T.Object({
      'official-artwork': T.Object({
        front_default: T.Union([T.String(), T.Null()]),
        front_shiny: T.Union([T.String(), T.Null()]),
      }),
    }),
  }),
  stats: T.Array(T.Object({
    base_stat: T.Number(),
    effort: T.Number(),
    stat: T.Object({
      name: T.String(),
    }),
  })),
  types: T.Array(T.Object({
    slot: T.Number(), type: NameAndUrl,
  })),
  weight: T.Number(),
});

export const PokemonParser = TypeCompiler.Compile(PokemonSchema);
