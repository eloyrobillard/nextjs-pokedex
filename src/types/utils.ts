// LINK https://zenn.dev/lollipop_onl/articles/eoz-ts-non-nullable
export const nonNullable = <T>(value: T): value is NonNullable<T> => value !== null;

export type PropUnion<T> = {
  [K in keyof T]: T[K]
}[keyof T]
