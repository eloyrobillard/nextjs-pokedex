import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Type } from '@sinclair/typebox';

export const Pokemon = TypeCompiler.Compile(Type.Object({
  id: Type.Number(),
  abilities: Type.Array(Type.Object({
    ability: Type.Object({ name: Type.String() }), is_hidden: Type.Boolean(), slot: Type.Number(),
  })),
  base_experience: Type.Number(),
  forms: Type.Array(Type.Object({ name: Type.String(), url: Type.String() })),
  height: Type.Number(),
  is_default: Type.Boolean(),
  name: Type.String(),
  order: Type.Number(),
  species: Type.Object({ name: Type.String(), url: Type.String() }),
  sprites: Type.Object({ front_default: Type.String() }),
  stats: Type.Array(Type.Object({
    base_stat: Type.Number(), effort: Type.Number(), stat: Type.Object({ name: Type.String() }),
  })),
  types: Type.Array(Type.Object({
    type: Type.Object({
      name: Type.String(),
      url: Type.String(),
    }),
  })),
  weight: Type.Number(),
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
