import { Type } from '@sinclair/typebox';

export const NameAndUrl = Type.Object({
  name: Type.String(),
  url: Type.String(),
});

export const Names = Type.Array(Type.Object({
  language: NameAndUrl, name: Type.String(),
}));
