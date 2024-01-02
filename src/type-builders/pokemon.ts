import { TypeCompiler } from '@sinclair/typebox/compiler';
import { Type } from '@sinclair/typebox';

export const Pokemon = TypeCompiler.Compile(Type.Object({
  id: Type.Number(),
  name: Type.String(),
  base_experience: Type.Number(),
  height: Type.Number(),
  is_default: Type.Boolean(),
  order: Type.Number(),
  weight: Type.Number(),
  sprites: Type.Object({
    front_default: Type.String(),
  }),
  types: Type.Array(Type.Object({
    type: Type.Object({
      name: Type.String(),
      url: Type.String(),
    }),
  })),
}));
